// components/SpotifyLoginButton.jsx

"use client";

import { getSpotifyAuthUrl } from "@/libs/spotify";

const SpotifyLoginButton = () => {
  const handleConnect = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      Connect with Spotify
    </button>
  );
};

export default SpotifyLoginButton;
