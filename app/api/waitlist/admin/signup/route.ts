import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

const ADMIN_USERS_SET_KEY = 'admin_users';
const ADMIN_PENDING_REQUESTS_LIST_KEY = 'admin_pending_requests';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    if (password.length < 8) {
        return NextResponse.json({ message: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    const lowercasedEmail = email.toLowerCase();
    
    // Check if user already exists (approved or pending)
    const userExists = await kv.sismember(ADMIN_USERS_SET_KEY, lowercasedEmail);
    if (userExists) {
        return NextResponse.json({ message: 'An admin with this email already exists or is pending approval.' }, { status: 409 });
    }

    const totalAdmins = await kv.scard(ADMIN_USERS_SET_KEY);
    const isFirstAdmin = totalAdmins === 0;
    const status = isFirstAdmin ? 'approved' : 'pending';

    const passwordHash = await bcrypt.hash(password, 10);

    const adminData = {
      name,
      email: lowercasedEmail,
      passwordHash,
      status,
      createdAt: new Date().toISOString(),
    };
    
    // Use a transaction to ensure atomicity
    const multi = kv.multi();
    multi.hset(`admin:${lowercasedEmail}`, adminData);
    multi.sadd(ADMIN_USERS_SET_KEY, lowercasedEmail); // Add to master set of all users
    
    if (status === 'pending') {
        multi.lpush(ADMIN_PENDING_REQUESTS_LIST_KEY, lowercasedEmail);
    }
    await multi.exec();
    
    const message = isFirstAdmin 
        ? 'Account created successfully. You are the first admin and have been auto-approved.'
        : 'Sign-up successful. Your account is pending approval from an existing administrator.';

    return NextResponse.json({ message, status }, { status: 201 });

  } catch (error) {
    console.error('Admin Signup Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
