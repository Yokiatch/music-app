import { cookies } from "next/headers";

const getSongs = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  if (!accessToken) {
    console.log("No Spotify access token available");
    return [];
  }

  try {
    // Example: Fetch New Releases (albums)
    const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=20", {
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

    // Return an array of tracks extracted from albums (or return albums only)
    // Here, return albums for display; you may choose to further fetch tracks per album
    return data.albums.items;
  } catch (error) {
    console.error("Failed to fetch songs from Spotify:", error.message);
    return [];
  }
};

export default getSongs;
