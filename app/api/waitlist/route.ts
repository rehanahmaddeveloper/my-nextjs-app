import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path to the data file
const dataFilePath = path.join((process as any).cwd(), 'data', 'waitlist.json');

// Ensure the data directory and file exist
async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.access(dataFilePath);
  } catch (error) {
    // If the file doesn't exist, create it with an empty array
    await fs.writeFile(dataFilePath, JSON.stringify([]));
  }
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
    
    await ensureDataFile();

    // Read the existing data
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const waitlist = JSON.parse(fileContent);

    // Check for duplicates
    const isDuplicate = waitlist.some((entry: any) => entry.email.toLowerCase() === email.toLowerCase());
    if (isDuplicate) {
        return NextResponse.json({ message: 'This email is already on the waitlist.' }, { status: 409 });
    }

    // Add new entry with a timestamp
    const newEntry = {
      name,
      email,
      country,
      intent,
      submittedAt: new Date().toISOString(),
    };
    waitlist.push(newEntry);

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(waitlist, null, 2));
    
    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });

  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// Handler for GET requests to retrieve the waitlist
export async function GET() {
  try {
    await ensureDataFile();

    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const waitlist = JSON.parse(fileContent);

    return NextResponse.json(waitlist, { status: 200 });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}