"use client";
import { getSpotifyAuthUrl } from "@/libs/spotify";

export default function SpotifyLoginButton() {
  const onClick = () => window.location.href = getSpotifyAuthUrl();
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      Connect with Spotify
    </button>
  );
}
