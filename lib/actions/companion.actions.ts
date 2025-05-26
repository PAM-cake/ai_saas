'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

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

export const getAllCompanions = async ({limit = 10 , page = 1, subject, topic}: GetAllCompanions) => {
    try {
        const supabase = createSupabaseClient();
        
        let query = supabase.from("companions").select();
        
        if (subject && subject !== 'all') {
            query = query.ilike("subject", `%${subject}%`);
        }
        
        if (topic) {
            query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
        }

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

export const getRecentSessions = async(limit=10)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', {ascending:false})
        .limit(limit)

        if(error) throw new Error(error.message)

        return data.map(({companions}) => companions)
}

export const getUserSessions = async(userId:string, limit=10)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id',userId)
        .order('created_at', {ascending:false})
        .limit(limit)

        if(error) throw new Error(error.message)

        return data.map(({companions}) => companions)
}

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


export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if(has({ plan: 'pro' })) {
        return true;
    } else if(has({ feature: "3_companion_limit" })) {
        limit = 3;
    } else if(has({ feature: "10_companion_limit" })) {
        limit = 10;
    } 

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount >= limit) {
        return false
    } else {
        return true;
    }
}
