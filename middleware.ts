import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'souldeeds-auth';

export function middleware(request: NextRequest) {
  // Check for the authentication cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

  // If the user is trying to access the waitlist page without a valid cookie,
  // redirect them to the login page.
  if (!authCookie || authCookie.value !== 'true') {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the cookie is present and valid, allow the request to proceed.
  return NextResponse.next();
}

// Specify which paths this middleware should apply to.
export const config = {
  matcher: '/admin/waitlist',
};
