import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DarkMeshBackground } from '../components/DarkMeshBackground';

const inter = Inter({
  subsets: ['latin'],
  fallback: ['system-ui', 'Arial']
})

export const metadata: Metadata = {
  title: 'Beautiful Dark Mode App',
  description: 'A Next.js app with a unique dark mode background',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <DarkMeshBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}