import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
