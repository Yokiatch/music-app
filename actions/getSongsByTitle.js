import { createSupabaseServerClient } from "@/libs/supabase";
import { cookies } from "next/headers";

const getSongsByTitle = async (title) => {
  const supabase = createSupabaseServerClient(cookies);

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return data || [];
};

export default getSongsByTitle;
