import type { Metadata } from 'next';
import { AuthProvider } from '@/components/AuthProvider';
import MobileGuard from '@/components/MobileGuard';
import './globals.css';

export const metadata: Metadata = {
  title: 'PEWPEW 스토리보드 - 동영상 스토리보드 작성 도구',
  description: '전문적인 동영상 스토리보드를 쉽게 만들어보세요',
  icons: {
    icon: '🎬',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-md-background text-md-on-surface font-body antialiased">
        <AuthProvider>
          <MobileGuard />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
