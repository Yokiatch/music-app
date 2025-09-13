// hooks/useUser.jsx

import { createContext, useContext } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

export const UserContext = createContext(undefined);

export const MyUserContextProvider = ({ children }) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;

  const value = {
    accessToken,
    user,
    isLoading: isLoadingUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within MyUserContextProvider");
  }
  return context;
};
