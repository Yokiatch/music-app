import { getAccessToken } from '@/libs/spotify';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (code) {
    try {
      const tokenData = await getAccessToken(code);
      // Store token in localStorage or database
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?spotify_token=${tokenData.access_token}`);
    } catch (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=spotify_auth_failed`);
    }
  }
  
  return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL);
}
