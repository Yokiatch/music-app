import { createSupabaseServerClient } from "@/libs/supabase";
import { cookies } from "next/headers";

const getSongs = async () => {
  const supabase = createSupabaseServerClient(cookies);

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return data || [];
};

export default getSongs;
