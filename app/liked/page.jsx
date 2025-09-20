import { cookies } from "next/headers";

const getLikedSongs = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("spotify_access_token");

  if (!accessToken) {
    console.log("No Spotify access token available");
    return [];
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Spotify API error:", errorData);
      return [];
    }

    const data = await response.json();
    return data.items.map((item) => item.track);
  } catch (error) {
    console.error("Failed to fetch liked songs:", error.message);
    return [];
  }
};

export default getLikedSongs;
