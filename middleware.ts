import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey || '');

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read cookies directly from NextRequest (Edge compatible)
  const token = request.cookies.get('souldeeds-session')?.value;
  const session = token ? await verifyToken(token) : null;

  // If logged in but visiting login/signup → redirect to dashboard
  if (session && (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/signup'))) {
    return NextResponse.redirect(new URL('/admin/waitlist', request.url));
  }

  // If not logged in and visiting protected admin routes → redirect to login
  if (!session && pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/signup')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
