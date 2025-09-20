"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function MyUserContextProvider({ children }) {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to get token from server
  const getTokenFromServer = async () => {
    try {
      const response = await fetch('/api/auth/token');
      if (response.ok) {
        const data = await response.json();
        return data.access_token;
      }
    } catch (error) {
      console.error("Failed to get token:", error);
    }
    return null;
  };

  // Function to fetch Spotify user profile
  const fetchSpotifyUser = async (token) => {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSpotifyUser(data);
        return true;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
    return false;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const token = await getTokenFromServer();
      
      if (token) {
        const userFetched = await fetchSpotifyUser(token);
        if (userFetched) {
          setSpotifyToken(token);
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ 
      spotifyToken, 
      spotifyUser, 
      setSpotifyToken,
      isLoading,
      user: spotifyUser // for compatibility
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within MyUserContextProvider");
  return ctx;
};
