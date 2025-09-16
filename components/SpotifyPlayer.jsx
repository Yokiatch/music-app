// components/SpotifyPlayer.jsx

import React, { useEffect, useState } from "react";
import { useSpotifyAuth } from "../providers/SpotifyAuthProvider";

export default function SpotifyPlayer() {
  const { accessToken } = useSpotifyAuth();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Music App Player",
        getOAuthToken: cb => { cb(accessToken); }
      });

      player.connect();
      setPlayer(player);

      // Add player event listeners here!
    };

    return () => {
      window.onSpotifyWebPlaybackSDKReady = null;
    };
  }, [accessToken]);

  return (
    <div>
      <h2>Spotify Player</h2>
      {/* Add UI controls */}
    </div>
  );
}
