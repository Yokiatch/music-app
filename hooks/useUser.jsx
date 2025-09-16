"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function MyUserContextProvider({ children }) {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [spotifyUser, setSpotifyUser] = useState(null);

  // Function to fetch Spotify user profile with token
  const fetchSpotifyUser = async (token) => {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch Spotify user");
      const data = await res.json();
      setSpotifyUser(data);
    } catch (err) {
      console.error(err);
      setSpotifyUser(null);
      setSpotifyToken(null);
      localStorage.removeItem("spotify_access_token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      setSpotifyToken(token);
      fetchSpotifyUser(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ spotifyToken, spotifyUser, setSpotifyToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within MyUserContextProvider");
  return ctx;
};
