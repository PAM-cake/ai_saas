'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { Companion, CreateCompanion, GetAllCompanions } from "@/types";

/**
 * Creates a new companion in the database
 * @param formData - The companion data to create
 * @returns The created companion object
 */
export const createCompanion = async (formData: CreateCompanion) => {
    try {
        const { userId: author } = await auth();
        if (!author) throw new Error("Unauthorized");

        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from("companions")
            .insert({ ...formData, author })
            .select()
            .single();

        if (error) throw new Error(error.message);
        if (!data) throw new Error("Failed to create companion");
        
        return data;
    } catch (error) {
        console.error("Error in createCompanion:", error);
        throw error;
    }
}

/**
 * Retrieves a paginated list of companions with optional filtering
 * @param params - Query parameters including limit, page, subject, and topic
 * @returns Array of matching companions
 */
export const getAllCompanions = async ({limit = 10 , page = 1, subject, topic}: GetAllCompanions) => {
    try {
        const supabase = createSupabaseClient();
        
        let query = supabase.from("companions").select();
        
        // Apply subject filter if specified
        if (subject && subject !== 'all') {
            query = query.ilike("subject", `%${subject}%`);
        }
        
        // Apply topic filter if specified
        if (topic) {
            query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
        }

        // Apply pagination and sorting
        query = query.order('created_at', { ascending: false })
                    .range((page - 1) * limit, page * limit - 1);
        
        const { data: companions, error } = await query;

        if (error) throw new Error(error.message);
        return companions || [];
    } catch (error) {
        console.error('Error fetching companions:', error);
        return [];
    }
}

/**
 * Retrieves a single companion by ID
 * @param id - The companion ID to fetch
 * @returns The companion object or null if not found
 */
export const getCompanion = async (id: string) => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from("companions")
            .select()
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);
        if (!data) throw new Error(`No companion found with id: ${id}`);

        return data;
    } catch (error) {
        console.error("Error in getCompanion:", error);
        return null;
    }
}

/**
 * Records a new session in the session history
 * @param companionId - The ID of the companion used in the session
 * @returns The created session record
 */
export const addToSessionHistory = async(companionId:string)=>{
    const {userId} = await auth()
    const supabase = createSupabaseClient()
    const {data,error} = await supabase.from('session_history').insert({
        companion_id: companionId,
        user_id: userId,
    })

    if(error) throw new Error(error.message);

    return data
}

/**
 * Retrieves recent sessions for the current user
 * @param limit - Maximum number of sessions to return
 * @returns Array of unique companions from recent sessions
 */
export const getRecentSessions = async(limit=10)=>{
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient()
    const {data,error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', {ascending:false})
        .limit(limit)

        if(error) throw new Error(error.message)

        // Deduplicate companions using a Map
        const uniqueCompanions = new Map<string, Companion>();
        data.forEach(({companions}: {companions: Companion}) => {
            if (!uniqueCompanions.has(companions.id)) {
                uniqueCompanions.set(companions.id, companions);
            }
        });
        return Array.from(uniqueCompanions.values());
}

/**
 * Retrieves sessions for a specific user
 * @param userId - The user ID to fetch sessions for
 * @param limit - Maximum number of sessions to return
 * @returns Array of unique companions from user's sessions
 */
export const getUserSessions = async(userId:string, limit=10)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id',userId)
        .order('created_at', {ascending:false})
        .limit(limit)

        if(error) throw new Error(error.message)

        // Deduplicate companions using a Map
        const uniqueCompanions = new Map<string, Companion>();
        data.forEach(({companions}: {companions: Companion}) => {
            if (!uniqueCompanions.has(companions.id)) {
                uniqueCompanions.set(companions.id, companions);
            }
        });
        return Array.from(uniqueCompanions.values());
}

/**
 * Retrieves all companions created by a specific user
 * @param userId - The user ID to fetch companions for
 * @returns Array of companions created by the user
 */
export const getUserCompanions = async(userId:string)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase
        .from('companions')
        .select()
        .eq('author',userId)
        .order('created_at', {ascending:false})

        if(error) throw new Error(error.message)

        return data || []
}

/**
 * Checks if a user can create a new companion based on their subscription plan
 * @returns Boolean indicating if user can create a new companion
 */
export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    // Set companion limit based on subscription plan
    if(has({ plan: 'pro' })) {
        return true;
    } else if(has({ feature: "3_companion_limit" })) {
        limit = 3;
    } else if(has({ feature: "10_companion_limit" })) {
        limit = 10;
    } 

    // Check current companion count
    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    return companionCount < limit;
}

/**
 * Deletes a companion after verifying ownership
 * @param id - The ID of the companion to delete
 * @returns Boolean indicating success
 */
export const deleteCompanion = async (id: string) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const supabase = createSupabaseClient();
        
        // Verify companion ownership
        const { data: companion, error: fetchError } = await supabase
            .from("companions")
            .select("author")
            .eq("id", id)
            .single();

        if (fetchError) throw new Error(fetchError.message);
        if (!companion) throw new Error("Companion not found");
        if (companion.author !== userId) throw new Error("Unauthorized");

        // Delete the companion
        const { error: deleteError } = await supabase
            .from("companions")
            .delete()
            .eq("id", id);

        if (deleteError) throw new Error(deleteError.message);
        
        return true;
    } catch (error) {
        console.error("Error in deleteCompanion:", error);
        throw error;
    }
}
