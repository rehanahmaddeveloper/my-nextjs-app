  import { NextResponse } from 'next/server';
  import { kv } from '@vercel/kv';

  export const dynamic = 'force-dynamic';

  // NOTE: This interface is implicitly used by kv.lpush/lrange but not explicitly typed in the function signatures.
  interface WaitlistEntry {
    name: string;
    email: string;
    country: string;
    intent?: string;
    submittedAt: string;
  }

  const WAITLIST_ENTRIES_KEY = 'waitlist_entries';
  const WAITLIST_EMAILS_KEY = 'waitlist_emails';

  // Handler for POST requests to add a user to the waitlist
  export async function POST(request: Request) {
    try {
      const data = await request.json();
      const { name, email, country, intent } = data;

      // Basic Validation
      if (!name || !email || !country) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
      }

      const lowercasedEmail = email.toLowerCase();

      // Use a Set for atomic and efficient duplicate checking.
      // sadd returns the number of elements added (1 if new, 0 if already exists).
      const wasAdded = await kv.sadd(WAITLIST_EMAILS_KEY, lowercasedEmail);

      if (!wasAdded) {
        return NextResponse.json({ message: 'This email is already on the waitlist.' }, { status: 409 });
      }

      // If the email was new, add the full entry to a List.
      const newEntry: WaitlistEntry = {
        name,
        email,
        country,
        intent,
        submittedAt: new Date().toISOString(),
      };

      // lpush prepends the new entry, making it easy to retrieve in chronological order.
      await kv.lpush(WAITLIST_ENTRIES_KEY, newEntry);

      return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });

    } catch (error) {
      console.error('Waitlist API Error:', error);
      // Check for a specific error message from @vercel/kv when environment variables are missing.
      if (error instanceof Error && (error.message.includes('Missing required environment variables') || error.message.includes('KV_URL'))) {
          return NextResponse.json({ message: 'KV Storage is not configured on the server.' }, { status: 500 });
      }
      return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
  }

  // Handler for GET requests to retrieve the waitlist
  export async function GET() {
    try {
      // Retrieve all entries from the list.
      // lrange returns an array of WaitlistEntry objects.
      const waitlist = await kv.lrange(WAITLIST_ENTRIES_KEY, 0, -1) || [];

      return NextResponse.json(waitlist, { status: 200 });
    } catch (error) {
      console.error('Waitlist API Error:', error);
      if (error instanceof Error && (error.message.includes('Missing required environment variables') || error.message.includes('KV_URL'))) {
          return NextResponse.json({ message: 'KV Storage is not configured on the server.' }, { status: 500 });
      }
      return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
  }