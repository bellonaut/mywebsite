import type { Metadata } from 'next';
import { Manrope, Newsreader } from 'next/font/google';
import './globals.css';
import { FlowBackground } from '@/components/background/FlowBackground';
import { Providers } from '@/components/providers';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/interactive/CustomCursor';
import { baseMetadata } from '@/lib/seo';

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[var(--bg)] text-[var(--text)]">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        <Providers>
          <FlowBackground />
          <CustomCursor />
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
