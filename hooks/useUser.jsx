// hooks/useUser.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/libs/supabase";

const UserContext = createContext();

export function MyUserContextProvider({ children }) {
  const { session } = useSessionContext();
  const supaUser = useSupaUser();
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      if (supaUser) {
        const { data } = await supabase
          .from("users")
          .select("spotify_access_token, spotify_expires_at, spotify_refresh_token")
          .eq("id", supaUser.id)
          .single();

        if (data && data.spotify_access_token && Date.now() < data.spotify_expires_at) {
          setSpotifyToken(data.spotify_access_token);
        } else if (data && data.spotify_refresh_token) {
          // Optionally refresh token here
        }
      }
    }
    fetchToken();
  }, [supaUser]);

  return (
    <UserContext.Provider value={{ session, user: supaUser, spotifyToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within MyUserContextProvider");
  return ctx;
};
