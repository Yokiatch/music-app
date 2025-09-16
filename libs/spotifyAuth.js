// libs/spotifyAuth.js

export async function exchangeCodeForToken(code) {
  const res = await fetch('/api/auth/spotify?code=' + code);
  return res.json();
}
