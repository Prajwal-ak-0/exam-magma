import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { DarkMeshBackground } from '../components/DarkMeshBackground';

const inter = Inter({
  subsets: ['latin'],
  fallback: ['system-ui', 'Arial']
})

export const metadata: Metadata = {
  title: 'Ramiah CodeLab',
  description: 'A Next.js app with a unique dark mode background',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <DarkMeshBackground />
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}