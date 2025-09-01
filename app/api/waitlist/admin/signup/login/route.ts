import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }
    
    const lowercasedEmail = email.toLowerCase();
    const adminData: any = await kv.hgetall(`admin:${lowercasedEmail}`);

    if (!adminData || !adminData.passwordHash) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    if (adminData.status !== 'approved') {
        return NextResponse.json({ message: 'Your account has not been approved yet.' }, { status: 403 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, adminData.passwordHash);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Create session
    await createSession({ email: adminData.email, name: adminData.name });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
