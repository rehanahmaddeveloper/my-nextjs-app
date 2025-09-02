'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message);
        setFormData({ name: '', email: '', password: '' }); // Clear form
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#87127C]">SoulDeeds Admin</h1>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900">
            Create a new admin account
          </h2>
        </div>
        
        {successMessage ? (
           <div className="bg-white p-8 shadow-lg rounded-lg text-center">
             <p className="text-green-600">{successMessage}</p>
             <Link href="/admin/login" className="mt-4 inline-block font-medium text-[#87127C] hover:text-[#6c0e63]">
               Proceed to Login
             </Link>
           </div>
        ) : (
            <form className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#87127C] focus:border-[#87127C] sm:text-sm" placeholder="Full Name" />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input id="email-address" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#87127C] focus:border-[#87127C] sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="password-input" className="sr-only">Password</label>
                  <input id="password-input" name="password" type="password" required value={formData.password} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#87127C] focus:border-[#87127C] sm:text-sm" placeholder="Password (min. 8 characters)" />
                </div>
              </div>

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <div>
                <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#87127C] hover:bg-[#6c0e63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#87127C] disabled:bg-gray-400">
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/admin/login" className="font-medium text-[#87127C] hover:text-[#6c0e63]">
                  Sign in
                </Link>
              </p>
            </form>
        )}
      </div>
    </div>
  );
}
