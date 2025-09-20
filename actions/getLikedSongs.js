// In getLikedSongs.js, getSongs.js, etc.
import { cookies } from "next/headers";

const getSongs = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("spotify_access_token");

  if (!accessToken) {
    console.log("No Spotify access token available");
    return [];
  }

  // Rest of your API call logic...
};
