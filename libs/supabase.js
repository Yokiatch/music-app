import { createClient } from "@supabase/supabase-js";

// Direct Supabase client with correct credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single client instance
export const supabase =  createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wrapper functions for compatibility
export const createSupabaseServerClient = (cookies) => {
  return supabase;
};

export const createSupabaseClient = () => {
  return supabase;
};