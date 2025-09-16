// app/api/auth/spotify/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
