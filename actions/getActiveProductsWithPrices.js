import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/libs/supabase";

const getActiveProductsWithPrices = async () => {
  const supabase = createSupabaseServerClient(cookies);

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) console.log(error);

  return data || [];
};

export default getActiveProductsWithPrices;
