// providers/SpotifyAuthProvider.jsx

'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { exchangeCodeForToken, refreshToken } from "../libs/spotifyAuth";

const SpotifyAuthContext = createContext(null);

export function SpotifyAuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function login() {
      if(code) {
        const tokens = await exchangeCodeForToken(code);
        setAccessToken(tokens.access_token);
        window.history.replaceState({}, document.title, "/");
      }
    }
    login();
  }, []);

  // Handle refreshing token periodically...

  return (
    <SpotifyAuthContext.Provider value={{ accessToken }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
}

export function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
