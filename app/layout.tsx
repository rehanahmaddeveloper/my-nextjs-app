import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
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

export const metadata: Metadata = {
  title: 'SoulDeeds - Connect Deeply',
  description: 'A visually stunning landing page for SoulDeeds, a Muslim matrimonial platform that combines faith, service, and meaningful connection. This page is designed to attract users and encourage them to join the waitlist.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
