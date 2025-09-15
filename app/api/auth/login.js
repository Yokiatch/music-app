// pages/api/auth/login.js
import { getSpotifyAuthUrl } from '@/libs/spotify';

export default function handler(req, res) {
  const url = getSpotifyAuthUrl();
  res.redirect(url);
}
