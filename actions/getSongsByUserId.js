import { createSupabaseServerClient } from "@/libs/supabase";
import { cookies } from "next/headers";

const getSongsByUserId = async () => {
  const supabase = createSupabaseServerClient(cookies);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.log(userError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", userData?.user.id)
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return data || [];
};

export default getSongsByUserId;
