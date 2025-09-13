import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import toast from "react-hot-toast";

const useGetSongById = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState(undefined);

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data);
      setIsLoading(false);
    };

    fetchData();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song,
  }), [isLoading, song]);
};

export default useGetSongById;
