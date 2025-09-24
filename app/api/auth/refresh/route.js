import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("spotify_refresh_token");

    if (!refreshToken || !refreshToken.value) {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 });
    }

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken.value,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || "Failed to refresh token");
    }

    // Update access token
    const expiresAt = Date.now() + (tokens.expires_in * 1000);
    
    cookieStore.set("spotify_access_token", tokens.access_token, {
      maxAge: tokens.expires_in,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookieStore.set("spotify_token_expires_at", expiresAt.toString(), {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ access_token: tokens.access_token });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  }
}
