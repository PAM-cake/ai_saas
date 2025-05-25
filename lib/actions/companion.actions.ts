'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
    const {userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
    .from("companions")
    .insert({...formData, author})
    .select()

    if (error || !data) 
        throw new Error(error.message);
    return data[0];
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

        if (error) {
            console.error('Error fetching companion:', error);
            return null;
        }
        
        if (!data) {
            console.error('No companion found with id:', id);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getCompanion:', error);
        return null;
    }
}