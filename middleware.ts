import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isPublicAdminPath =
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/admin/signup');

  // If user is logged in and tries to access login/signup, redirect to dashboard
  if (session && isPublicAdminPath) {
    return NextResponse.redirect(new URL('/admin/waitlist', request.url));
  }

  // If user is not logged in and tries to access a protected admin route, redirect to login
  if (!session && pathname.startsWith('/admin') && !isPublicAdminPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Protect all routes under /admin, including the root /admin page
  matcher: ['/admin/:path*'],
};
