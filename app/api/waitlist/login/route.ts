import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'souldeeds-auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials are not set in environment variables.');
      return NextResponse.json({ message: 'Authentication is not configured.' }, { status: 500 });
    }

    // Perform a case-insensitive match for the username for a better user experience,
    // but keep the password check case-sensitive for security.
    const isUsernameMatch = username?.toLowerCase() === adminUsername.toLowerCase();
    const isPasswordMatch = password === adminPassword;

    if (isUsernameMatch && isPasswordMatch) {
      // Set a secure, HTTP-only cookie to maintain the session
      cookies().set(AUTH_COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return NextResponse.json({ message: 'Login successful.' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}