/**
 * Supabase client configuration and setup
 * Creates an authenticated Supabase client instance for database operations
 */

import { auth } from '@clerk/nextjs/server';
import {createClient} from '@supabase/supabase-js';

/**
 * Creates and returns a Supabase client instance with authentication
 * Uses environment variables for Supabase URL and anonymous key
 * Automatically handles authentication token management
 * @returns Authenticated Supabase client instance
 */
export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            async accessToken(){
                return ((await auth()).getToken())
            }
        }
    )
}