import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // If user is trying to access login/signup but is already logged in,
  // redirect them to the admin dashboard.
  if (session && (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/signup'))) {
    return NextResponse.redirect(new URL('/admin/waitlist', request.url));
  }

  // If user is not logged in and trying to access a protected admin route,
  // redirect them to the login page.
  if (!session && pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/signup')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};