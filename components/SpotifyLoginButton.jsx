// components/ConnectSpotifyButton.jsx
"use client";

export default function SpotifyLoginButton() {
  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={() => (window.location.href = '/api/auth/login')}
    >
      Connect Spotify
    </button>
  );
}
