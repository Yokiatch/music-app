import { createClient } from "@supabase/supabase-js";

// Direct Supabase client with correct credentials
const SUPABASE_URL = "https://wbeigmmiojkicvxsaisw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZWlnbW1pb2praWN2eHNhaXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjUwODIsImV4cCI6MjA3MzEwMTA4Mn0.zx51czwLczpWI3YQq226sTci0mmruuzkYfZ2_YycoQw";

// Create a single client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wrapper functions for compatibility
export const createSupabaseServerClient = (cookies) => {
  return supabase;
};

export const createSupabaseClient = () => {
  return supabase;
};