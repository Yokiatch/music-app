import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  
  // Temporarily disabled until environment variables are properly configured
  // This allows the app to run while the Replit environment variables are sorted out
  // const supabase = createMiddlewareClient({ req, res });
  // await supabase.auth.getSession();
  
  return res;
}
