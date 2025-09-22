import Link from 'next/link';
import { getSession } from '@/lib/session';
import { Poppins } from 'next/font/google';
import '../globals.css';
// FIX: Import 'React' to resolve 'Cannot find namespace React' error.
import React from 'react';

// FIX: Add global JSX namespace declaration to fix errors with intrinsic elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50 min-h-screen font-sans`}>
        {session ? (
            <div >
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <nav className="flex items-center space-x-6">
                        <span className="text-xl font-bold text-[#87127C]">SoulDeeds Admin</span>
                        <Link href="/admin/waitlist" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Waitlist
                        </Link>
                        <Link href="/admin/management" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Manage Admins
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 hidden sm:block">{session.name} ({session.email})</span>
                        <form action="/api/admin/logout" method="POST">
                            <button type="submit" className="text-sm text-white bg-[#87127C] hover:bg-[#6c0e63] font-semibold py-2 px-4 rounded-lg transition-colors">
                                Logout
                            </button>
                        </form>
                    </div>
                    </div>
                </header>
                <main>{children}</main>
            </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}