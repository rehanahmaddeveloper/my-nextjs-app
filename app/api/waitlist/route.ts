import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface WaitlistEntry {
  name: string;
  email: string;
  country: string;
  intent?: string;
  submittedAt: string;
}

// Handler for POST requests to add a user to the waitlist
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, country, intent } = data;

    // Basic Validation
    if (!name || !email || !country) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Get the current waitlist from Vercel KV
    const waitlist: WaitlistEntry[] = (await kv.get('waitlist')) || [];

    // Check for duplicates
    const isDuplicate = waitlist.some((entry) => entry.email.toLowerCase() === email.toLowerCase());
    if (isDuplicate) {
        return NextResponse.json({ message: 'This email is already on the waitlist.' }, { status: 409 });
    }

    // Add new entry with a timestamp
    const newEntry: WaitlistEntry = {
      name,
      email,
      country,
      intent,
      submittedAt: new Date().toISOString(),
    };

    // Add the new entry to the list
    waitlist.push(newEntry);

    // Save the updated list back to Vercel KV
    await kv.set('waitlist', waitlist);

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });

  } catch (error) {
    console.error('Waitlist API Error:', error);
    if (error instanceof Error && error.message.includes('Missing required environment variables')) {
        return NextResponse.json({ message: 'KV Storage is not configured on the server.' }, { status: 500 });
    }
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// Handler for GET requests to retrieve the waitlist
export async function GET() {
  try {
    // Get the waitlist from Vercel KV
    const waitlist = (await kv.get('waitlist')) || [];

    return NextResponse.json(waitlist, { status: 200 });
  } catch (error) {
    console.error('Waitlist API Error:', error);
     if (error instanceof Error && error.message.includes('Missing required environment variables')) {
        return NextResponse.json({ message: 'KV Storage is not configured on the server.' }, { status: 500 });
    }
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}