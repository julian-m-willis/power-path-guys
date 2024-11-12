import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token');

  if (pathname.startsWith('/main') && !accessToken) {
    // Redirect unauthenticated users to the sign-in page
    return NextResponse.redirect(new URL('/landing', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/main/:path*'],
};
