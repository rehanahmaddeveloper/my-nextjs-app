import 'server-only';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';

// Define the structure of our session payload for type safety
interface SessionPayload extends JWTPayload {
  email: string;
  name: string;
}

const secretKey = process.env.JWT_SECRET_KEY;

// Ensure the secret key is defined to prevent runtime errors.
if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not set in the environment variables.');
}

const key = new TextEncoder().encode(secretKey);

/**
 * Encrypts the user's session data into a JWT.
 * @param payload The user data to store in the session.
 * @returns An encrypted JWT string.
 */
export async function encrypt(payload: { email: string; name: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Session expires in one day
    .sign(key);
}

/**
 * Decrypts the JWT and returns the session payload, or null if invalid/expired.
 * @param input The JWT string from the cookie.
 * @returns The session payload or null.
 */
export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // This can happen if the token is expired, malformed, etc.
    console.error('Failed to verify session token:', error);
    return null;
  }
}

/**
 * Creates a new session and sets it as an HTTP-only cookie.
 * @param payload The user data to store in the session.
 */
export async function createSession(payload: { email: string; name: string }) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  const session = await encrypt(payload);

  cookies().set('souldeeds-session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    path: '/',
    sameSite: 'lax',
  });
}

/**
 * Retrieves the current session from the cookie.
 * @returns The current session payload or null if not logged in.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get('souldeeds-session')?.value;
  if (!sessionCookie) return null;

  return await decrypt(sessionCookie);
}

/**
 * Deletes the session cookie, effectively logging the user out.
 */
export async function deleteSession() {
  // Set the cookie with an expiration date in the past to delete it.
  cookies().set('souldeeds-session', '', { expires: new Date(0), path: '/' });
}
