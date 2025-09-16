import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";

const useGetSongById = (id, accessToken) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState(undefined);

  useEffect(() => {
    if (!id || !accessToken) return;

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error.message || "Failed to fetch song");
        }

        const data = await res.json();
        setSong(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, accessToken]);

  return useMemo(() => ({
    isLoading,
    song,
  }), [isLoading, song]);
};

export default useGetSongById;
