import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getSession } from '@/lib/session';

const ADMIN_PENDING_REQUESTS_LIST_KEY = 'admin_pending_requests';

// Get all pending admin requests
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pendingEmails = await kv.lrange(ADMIN_PENDING_REQUESTS_LIST_KEY, 0, -1);
    const pendingAdmins = [];

    for (const email of pendingEmails) {
      const adminData: any = await kv.hgetall(`admin:${email}`);
      if (adminData) {
        pendingAdmins.push({
          name: adminData.name,
          email: adminData.email,
          createdAt: adminData.createdAt,
        });
      }
    }
    
    // Sort by newest first
    pendingAdmins.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(pendingAdmins, { status: 200 });
  } catch (error) {
    console.error('Get Pending Admins Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// Approve a pending admin
export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const { email } = await request.json();
  
      if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
      }
      
      const lowercasedEmail = email.toLowerCase();
      
      // Update the user's status to 'approved'
      await kv.hset(`admin:${lowercasedEmail}`, { status: 'approved' });
      
      // Remove the user from the pending list
      await kv.lrem(ADMIN_PENDING_REQUESTS_LIST_KEY, 0, lowercasedEmail);
  
      return NextResponse.json({ message: 'Admin approved successfully' }, { status: 200 });
    } catch (error) {
      console.error('Approve Admin Error:', error);
      return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
