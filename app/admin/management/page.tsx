'use client';

import React, { useState, useEffect } from 'react';

interface PendingAdmin {
  name: string;
  email: string;
  createdAt: string;
}

const AdminManagementPage: React.FC = () => {
  const [pendingAdmins, setPendingAdmins] = useState<PendingAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null); // Store email of admin being approved

  const fetchPendingAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/management');
      if (!response.ok) {
        throw new Error('Failed to fetch pending requests.');
      }
      const data = await response.json();
      setPendingAdmins(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAdmins();
  }, []);

  const handleApprove = async (email: string) => {
    setApproving(email);
    setError(null);
    try {
        const res = await fetch('/api/admin/management', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if(!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to approve admin.');
        }
        // Refresh the list after approval
        fetchPendingAdmins();
    } catch (err: any) {
        setError(err.message);
    } finally {
        setApproving(null);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#87127C]">Admin Management</h1>
            <p className="text-gray-600 mt-1">Review and approve new admin sign-up requests.</p>
        </div>

        {loading ? (
            <div className="text-center py-20"><p className="text-gray-500">Loading requests...</p></div>
        ) : error ? (
            <div className="text-center py-20 bg-red-50 text-red-600 p-4 rounded-lg"><p><strong>Error:</strong> {error}</p></div>
        ) : (
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {pendingAdmins.length > 0 ? (
                    pendingAdmins.map((admin) => (
                    <tr key={admin.email}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(admin.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            onClick={() => handleApprove(admin.email)}
                            disabled={approving === admin.email}
                            className="text-white bg-green-600 hover:bg-green-700 font-semibold py-1 px-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-wait"
                        >
                            {approving === admin.email ? 'Approving...' : 'Approve'}
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No pending admin requests.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        )}
    </div>
  );
};

export default AdminManagementPage;
