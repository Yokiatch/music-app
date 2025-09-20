"use client";

import { SpotifyAuthProvider } from "../providers/SpotifyAuthProvider";
import { MyUserContextProvider } from "@/hooks/useUser";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SpotifyAuthProvider>
          <MyUserContextProvider>
            {children}
          </MyUserContextProvider>
        </SpotifyAuthProvider>
      </body>
    </html>
  );
}
