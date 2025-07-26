import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nafis Azizi Riza',
  description: 'Software engineer, learner, and explorer.',
  metadataBase: new URL('https://nafisazizi.com'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <main className="container mx-auto max-w-6xl flex-grow px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
