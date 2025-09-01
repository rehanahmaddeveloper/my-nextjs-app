import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'souldeeds-auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  const isLoggedIn = authCookie && authCookie.value === 'true';

  // If trying to access the protected waitlist page and not logged in,
  // redirect to the login page.
  if (pathname.startsWith('/admin/waitlist') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access the login page but already logged in,
  // redirect to the waitlist page.
  if (pathname.startsWith('/admin/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/waitlist', request.url));
  }

  // Otherwise, allow the request to proceed.
  return NextResponse.next();
}

// Specify which paths this middleware should apply to.
export const config = {
  matcher: ['/admin/waitlist', '/admin/login'],
};