// hooks/useUser.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

export const UserContext = createContext(undefined);

export const MyUserContextProvider = ({ children }) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;

  const [spotifyToken, setSpotifyToken] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (user && !loadingDetails) {
      setLoadingDetails(true);
      supabase
        .from("users")
        .select("spotify_access_token")
        .eq("id", user.id)
        .single()
        .then(({ data }) => setSpotifyToken(data?.spotify_access_token ?? null))
        .catch(console.error)
        .finally(() => setLoadingDetails(false));
    }
  }, [user, loadingDetails, supabase]);

  const value = {
    accessToken,
    user,
    spotifyToken,
    isLoading: isLoadingUser || loadingDetails,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("useUser must be used within MyUserContextProvider");
  return context;
};
