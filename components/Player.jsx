"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser"; // Should provide spotifyToken

export default function Player() {
  const { spotifyToken } = useUser(); // Spotify access token
  const playerRef = useRef(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!spotifyToken) return;

    // Dynamically load Spotify Web Playback SDK script
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Web Playback SDK Player",
        getOAuthToken: (cb) => {
          cb(spotifyToken);
        },
        volume: 0.5,
      });

      playerRef.current = player;

      // Ready event returns device ID
      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        setError(null);
      });

      // Player state change listener
      player.addListener("player_state_changed", (state) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);
      });

      // Error handling events
      player.addListener("initialization_error", ({ message }) => {
        setError(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        setError(message);
      });
      player.addListener("account_error", ({ message }) => {
        setError(message);
      });

      player.connect();
    };

    return () => {
      playerRef.current?.disconnect();
      window.onSpotifyWebPlaybackSDKReady = null;
      document.body.removeChild(script);
    };
  }, [spotifyToken]);

  return (
    <div className="fixed bottom-0 w-full bg-neutral-900 p-4 text-white flex items-center gap-x-4">
      {error && <p className="text-red-600">Error: {error}</p>}
      {!error && (
        <>
          {deviceId ? (
            <>
              <div>
                <p className="font-semibold">{currentTrack?.name || "No Track Playing"}</p>
                <p className="text-sm text-gray-400">
                  {currentTrack?.artists?.map((artist) => artist.name).join(", ") || "Unknown Artist"}
                </p>
              </div>
              <div>{isPaused ? "Paused" : "Playing"}</div>
            </>
          ) : (
            <p>Loading Spotify Player...</p>
          )}
        </>
      )}
    </div>
  );
}
