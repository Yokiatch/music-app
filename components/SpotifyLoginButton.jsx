// components/SpotifyLoginButton.jsx

import React from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "streaming",
  "user-modify-playback-state",
  "user-read-playback-state",
].join(" ");
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

export default function SpotifyLoginButton() {
  return (
    <a href={AUTH_URL}>
      <button className="btn btn-primary">
        Login with Spotify
      </button>
    </a>
  );
}
