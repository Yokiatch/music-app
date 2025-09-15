// components/Player.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";

export default function Player() {
  const { spotifyToken } = useUser();
  const playerRef = useRef(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (!spotifyToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Web Playback SDK Player",
        getOAuthToken: cb => cb(spotifyToken),
        volume: 0.5,
      });

      playerRef.current = player;

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
      });

      player.connect();
    };

    return () => {
      playerRef.current?.disconnect();
    };
  }, [spotifyToken]);

  return (
    <div className="fixed bottom-0 w-full bg-neutral-900 p-4">
      {deviceId ? (
        <p>Connected to device: {deviceId}</p>
      ) : (
        <p>Loading Spotify Player...</p>
      )}
    </div>
  );
}
