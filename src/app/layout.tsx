import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import GoogleAnalytics from '@/components/analytics/google-analytics';
import { PageAnalytics } from '@/components/analytics/page-analytics';
import { PostHogProvider } from '@/components/analytics/posthog-provider';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { CommandPalette, SearchProvider } from '@/components/search';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

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
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className={`flex min-h-screen flex-col`}>
        <GoogleAnalytics />
        <PageAnalytics pageTitle="Nafis Azizi Riza" />
        <PostHogProvider>
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
        </PostHogProvider>
      </body>
    </html>
  );
}
