// pages/api/auth/callback/spotify.js
import { getAccessToken } from '@/libs/spotify';
import { supabase } from '@/libs/supabase';

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  const tokenResponse = await getAccessToken(code);
  if (tokenResponse.error) {
    return res.status(400).json(tokenResponse);
  }

  const { access_token, refresh_token, expires_in } = tokenResponse;

  // Save tokens in Supabase
  const { error } = await supabase
    .from('users')
    .upsert(
      { id: req.cookies['sb-user-id'], spotify_access_token: access_token, spotify_refresh_token: refresh_token, spotify_expires_at: Date.now() + expires_in * 1000 },
      { onConflict: ['id'] }
    );

  if (error) {
    console.error(error);
    return res.status(500).send('Database error');
  }

  // Redirect back to your app
  res.redirect('/');
}
