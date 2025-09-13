// app/api/auth/callback/spotify/route.js

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getAccessToken } from "@/libs/spotify";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect("/?error=spotify_no_code");
  }

  // Initialize Supabase server client
  const supabase = createServerComponentClient({ req: request, res: NextResponse.next() });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { access_token } = await getAccessToken(code);

    // Persist Spotify token on this user
    await supabase
      .from("users")
      .update({ spotify_access_token: access_token })
      .eq("id", user.id);

    return NextResponse.redirect("/");
  } catch (err) {
    console.error("Spotify token error", err);
    return NextResponse.redirect("/?error=spotify_token_failed");
  }
}
