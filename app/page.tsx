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
import { Film, ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin mb-4">
            <Film size={48} />
          </div>
          <p>로딩 중...</p>
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
      const result = await signInWithPopup(auth, provider);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-4xl font-bold text-white mb-2">스토리프레임</h1>
            <p className="text-indigo-100 text-lg">전문적인 동영상 스토리보드를 쉽게 만들어보세요</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-center text-white">
            <div>
              <Sparkles size={24} className="mx-auto mb-2 text-indigo-200" />
              <p className="text-sm font-medium">직관적 편집</p>
            </div>
            <div>
              <Zap size={24} className="mx-auto mb-2 text-indigo-200" />
              <p className="text-sm font-medium">빠른 협업</p>
            </div>
            <div>
              <Users size={24} className="mx-auto mb-2 text-indigo-200" />
              <p className="text-sm font-medium">팀 작업</p>
            </div>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {isSignup ? '계정 만들기' : '로그인'}
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full mb-4 px-4 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition disabled:opacity-50"
            >
              {isLoading ? '처리 중...' : '구글로 시작하기'}
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              {isSignup && (
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? '처리 중...' : isSignup ? '계정 만들기' : '로그인'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError('');
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  {isSignup ? '로그인' : '계정 만들기'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-indigo-100 text-sm">
            <p>© 2024 스토리프레임. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
