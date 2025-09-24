import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("spotify_access_token");
    const expiresAt = cookieStore.get("spotify_token_expires_at");
    const refreshToken = cookieStore.get("spotify_refresh_token");

    if (!accessToken || !accessToken.value) {
      return NextResponse.json({ error: "No access token found" }, { status: 401 });
    }

    // Check if token is expired or expiring soon (5 minutes buffer)
    if (expiresAt && expiresAt.value) {
      const expiryTime = parseInt(expiresAt.value);
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (now >= (expiryTime - fiveMinutes)) {
        // Token expired or expiring soon, try to refresh
        if (refreshToken && refreshToken.value) {
          try {
            const refreshResponse = await fetch(
              `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
              { method: "POST" }
            );
            
            if (refreshResponse.ok) {
              const { access_token } = await refreshResponse.json();
              return NextResponse.json({ access_token });
            }
          } catch (error) {
            console.error("Failed to refresh token:", error);
          }
        }
        
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
    }

    return NextResponse.json({ access_token: accessToken.value });
  } catch (error) {
    console.error("Token retrieval error:", error);
    return NextResponse.json({ error: "Failed to retrieve token" }, { status: 500 });
  }
}
