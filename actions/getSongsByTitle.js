import { cookies } from "next/headers";

const getSongsByTitle = async (title) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  if (!accessToken) {
    console.log("No Spotify access token available");
    return [];
  }

  try {
    // Spotify Search API - searching tracks by title
    const params = new URLSearchParams({
      q: title,
      type: "track",
      limit: "20",
    });

    const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Spotify API error:", errorData);
      return [];
    }

    const data = await response.json();

    // Return array of track objects from search results
    return data.tracks.items;
  } catch (error) {
    console.error("Failed to search songs by title:", error.message);
    return [];
  }
};

export default getSongsByTitle;
