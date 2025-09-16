import { cookies } from "next/headers";

const getLikedSongs = async () => {
  // Extract Spotify access token from cookies or headers
  const cookieStore = cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  if (!accessToken) {
    console.log("No Spotify access token available");
    return [];
  }

  try {
    // Spotify Get User's Saved Tracks API endpoint (paginated)
    const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
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

    // Returning array of track objects from saved tracks
    return data.items.map((item) => item.track);
  } catch (error) {
    console.error("Failed to fetch liked songs:", error.message);
    return [];
  }
};

export default getLikedSongs;
