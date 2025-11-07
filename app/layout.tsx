import './globals.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creator Agent HQ',
  description:
    'Agentic workspace to plan, optimize, and scale your YouTube channel with data-backed insights.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
