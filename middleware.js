import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("spotify_access_token");

  // For protected paths (adjust as needed)
  const protectedPaths = ["/account", "/player", "/library"];
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/player/:path*", "/library/:path*"],
};
