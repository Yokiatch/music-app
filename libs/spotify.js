// lib/spotify.js
const CLIENT_ID     = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI  = process.env.NEXT_PUBLIC_APP_URL + '/api/auth/callback/spotify';
const scopes = [ 'streaming','user-read-email','user-read-private',
  'user-library-read','user-library-modify','user-read-playback-state','user-modify-playback-state'
].join(',');

export const getSpotifyAuthUrl = () =>
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}` +
  `&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(scopes)}`;

export const getAccessToken = async (code) => {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic '+Buffer.from(CLIENT_ID+':'+CLIENT_SECRET).toString('base64')
    },
    body: `grant_type=authorization_code&code=${code}` +
          `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  });
  return res.json();
};
