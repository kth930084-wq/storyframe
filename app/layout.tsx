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
    <html lang="ko">
      <body>
        <AuthProvider>
          <MobileGuard />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
