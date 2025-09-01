import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'souldeeds-auth';

export async function POST() {
  try {
    // Clear the authentication cookie
    cookies().set(AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: -1, // Expire the cookie immediately
    });
    return NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
