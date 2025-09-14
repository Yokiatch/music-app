"use client";
  import { createContext, useContext, useEffect, useState } from "react";
  import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

  export const UserContext = createContext();

  export const MyUserContextProvider = ({ children }) => {
    const { session, isLoading: supaLoading, supabaseClient: supabase } = useSessionContext();
    const user = useSupaUser();
    const [spotifyToken, setSpotifyToken] = useState(null);

    useEffect(() => {
      if (user) {
        supabase
          .from("users")
          .select("spotify_access_token")
          .eq("id", user.id)
          .single()
          .then(({ data }) => setSpotifyToken(data?.spotify_access_token ?? null))
          .catch(console.error);
      }
    }, [user, supabase]);

    return (
      <UserContext.Provider value={{ user, spotifyToken, isLoading: supaLoading }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within MyUserContextProvider");
    return ctx;
  };
