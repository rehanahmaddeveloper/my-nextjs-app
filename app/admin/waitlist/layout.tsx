import Link from 'next/link';
import { getSession } from '@/lib/session';
import { Poppins } from 'next/font/google';
import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
    title: 'SoulDeeds Admin',
    description: 'Admin dashboard for SoulDeeds.',
};

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
            <div>
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <nav className="flex items-center space-x-6">
                        <Link href="/admin/waitlist" className="text-xl font-bold text-[#87127C]">SoulDeeds Admin</Link>
                        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                        <Link href="/admin/waitlist" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">
                        Waitlist
                        </Link>
                        <Link href="/admin/management" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">
                        Manage Admins
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 hidden sm:block" title={session.email}>{session.name}</span>
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
