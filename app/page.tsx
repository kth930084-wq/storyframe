'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Film, ArrowRight, Sparkles, Zap, Users, Layers, Camera, MonitorPlay } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-300 text-center">
          <div className="animate-pulse mb-4">
            <Film size={48} className="mx-auto text-neutral-400" />
          </div>
          <p className="text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || '구글 로그인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (name && result.user) {
          await updateProfile(result.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || '인증 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <Film size={20} className="text-neutral-400" />
          <span className="text-sm font-medium tracking-wider uppercase text-neutral-300">StoryFrame</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left - Copy */}
          <div>
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">Video Storyboard Builder</p>
              <h1 className="text-5xl font-bold leading-tight mb-4">
                <span className="text-white">영상 기획,</span>
                <br />
                <span className="text-neutral-400">프레임 단위로</span>
                <br />
                <span className="text-white">완성하다.</span>
              </h1>
              <p className="text-neutral-500 text-base leading-relaxed mt-6">
                카메라 앵글, 조명, 트랜지션까지 —
                한 곳에서 전문적인 스토리보드를 만드세요.
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { icon: Camera, label: '카메라 설정' },
                { icon: Layers, label: '씬 관리' },
                { icon: MonitorPlay, label: '프레젠테이션' },
                { icon: Zap, label: '빠른 편집' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-400 text-xs">
                  <Icon size={12} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Auth Card */}
          <div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-white mb-1">
                {isSignup ? '계정 만들기' : '시작하기'}
              </h2>
              <p className="text-neutral-500 text-sm mb-6">
                {isSignup ? '새 계정을 만들어 시작하세요' : '로그인하고 스토리보드를 만들어보세요'}
              </p>

              {error && (
                <div className="bg-red-950/50 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full mb-4 px-4 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {isLoading ? '처리 중...' : 'Google로 시작하기'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-neutral-900 text-neutral-600">또는 이메일로</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-3">
                {isSignup && (
                  <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-neutral-500 placeholder-neutral-500 text-sm"
                  />
                )}
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-neutral-500 placeholder-neutral-500 text-sm"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none focus:border-neutral-500 placeholder-neutral-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-neutral-100 text-neutral-900 font-medium rounded-lg hover:bg-white transition disabled:opacity-50 text-sm"
                >
                  {isLoading ? '처리 중...' : isSignup ? '계정 만들기' : '로그인'}
                </button>
              </form>

              <div className="mt-5 text-center">
                <p className="text-neutral-500 text-xs">
                  {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
                  <button
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setError('');
                      setEmail('');
                      setPassword('');
                      setName('');
                    }}
                    className="text-white hover:underline"
                  >
                    {isSignup ? '로그인' : '계정 만들기'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-neutral-900">
        <div className="flex items-center justify-between text-xs text-neutral-600">
          <p>© 2024 StoryFrame by PEWPEW Studio</p>
          <p>Built for creators</p>
        </div>
      </footer>
    </div>
  );
}
