import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("spotify_access_token");

    if (!accessToken || !accessToken.value) {
      return NextResponse.json({ error: "No access token found" }, { status: 401 });
    }

    return NextResponse.json({ access_token: accessToken.value });
  } catch (error) {
    console.error("Token retrieval error:", error);
    return NextResponse.json({ error: "Failed to retrieve token" }, { status: 500 });
  }
}
