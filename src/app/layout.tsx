import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';

import GoogleAnalytics from '@/components/analytics/google-analytics';
import { PageAnalytics } from '@/components/analytics/page-analytics';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { CommandPalette, SearchProvider } from '@/components/search';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className={`flex min-h-screen flex-col`}>
        <GoogleAnalytics />
        <PageAnalytics pageTitle="Nafis Azizi Riza" />
        <SearchProvider>
          <CommandPalette />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container mx-auto max-w-6xl flex-grow px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
