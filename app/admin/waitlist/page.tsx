'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface WaitlistEntry {
  name: string;
  email: string;
  country: string;
  intent?: string;
  submittedAt: string;
}

const WaitlistAdminPage: React.FC = () => {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/waitlist');
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist data.');
        }
        const data = await response.json();
        // Sort by most recent submission first
        setWaitlist(data.sort((a: WaitlistEntry, b: WaitlistEntry) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#87127C]">Waitlist Submissions</h1>
            <p className="text-gray-600 mt-1">A total of {waitlist.length} users have joined the waitlist.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-[#87127C] hover:text-[#6c0e63] font-semibold py-2 px-4 rounded-lg transition-colors border border-[#87127C]">
              &larr; Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-white bg-[#87127C] hover:bg-[#6c0e63] font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 text-red-600 p-4 rounded-lg">
            <p><strong>Error:</strong> {error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Intent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {waitlist.length > 0 ? (
                  waitlist.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(entry.submittedAt).toLocaleString(undefined, {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <a href={`mailto:${entry.email}`} className="text-[#87127C] hover:underline">{entry.email}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.country}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <p className="max-w-xs truncate" title={entry.intent}>{entry.intent || 'N/A'}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default WaitlistAdminPage;
