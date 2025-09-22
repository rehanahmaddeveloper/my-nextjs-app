import 'server-only';
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET_KEY;

// Added a check to ensure the secret key is defined.
// This prevents runtime errors if the environment variable is missing.
if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not set in the environment variables.');
}

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Set session to expire in one day
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // Handle specific errors if needed, e.g., token expired
    console.error('JWT Verification Error:', error);
    return null;
  }
}

export async function createSession(payload: any) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const session = await encrypt(payload);

  cookies().set('souldeeds-session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    path: '/',
    sameSite: 'lax',
  });
}

export async function getSession() {
  const sessionCookie = cookies().get('souldeeds-session')?.value;
  if (!sessionCookie) return null;

  return await decrypt(sessionCookie);
}

export async function deleteSession() {
  cookies().set('souldeeds-session', '', { expires: new Date(0) });
}