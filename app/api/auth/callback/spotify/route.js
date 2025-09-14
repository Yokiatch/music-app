// app/api/auth/callback/spotify/route.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getAccessToken } from "@/libs/spotify";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect("/?error=spotify_no_code");

  const resNext = NextResponse.next();
  const supabase = createServerComponentClient({ req: request, res: resNext });
  const { data: { user } } = await supabase.auth.getUser();

  try {
    const { access_token } = await getAccessToken(code);
    await supabase
      .from("users")
      .update({ spotify_access_token: access_token })
      .eq("id", user.id);
    return NextResponse.redirect("/");
  } catch {
    return NextResponse.redirect("/?error=spotify_token_failed");
  }
}
