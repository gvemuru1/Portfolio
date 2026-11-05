import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guru Charan — Software Engineer',
  description: 'An interactive workspace of projects, experience, and ideas by Guru Charan, a software engineer in Milwaukee.'
};

export const viewport: Viewport = {
  themeColor: '#fafbf8',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
