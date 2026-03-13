'use client';

import React, { useState, useEffect } from 'react';
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
import { Film, Camera, Layers, MonitorPlay, Zap, ArrowRight, Play, Clock, Clapperboard, Sparkles, ChevronDown } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-300 text-center">
          <div className="animate-pulse mb-4"><Film size={48} className="mx-auto text-neutral-400" /></div>
          <p className="text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!user;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true); setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) { setError(error.message || '구글 로그인 실패'); }
    finally { setIsLoading(false); }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true); setError('');
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (name && result.user) await updateProfile(result.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error: any) { setError(error.message || '인증 실패'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-x-hidden">

      {/* ===== 배경 효과 ===== */}
      <div className="fixed inset-0 pointer-events-none">
        {/* 그리드 패턴 */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        {/* 그라디언트 오브 */}
        <div className="absolute top-[-30%] left-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-neutral-800/40 to-transparent blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-neutral-700/30 to-transparent blur-[120px]" />
        {/* 상단 그라디언트 라인 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
      </div>

      {/* ===== 네비게이션 ===== */}
      <nav className="relative z-20 flex items-center justify-between px-8 lg:px-16 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
            <Film size={17} className="text-neutral-900" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-wider uppercase text-white">PEWPEW</span>
            <span className="text-sm font-light tracking-wider uppercase text-neutral-500 ml-1.5">스토리보드</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-xs text-neutral-500 hover:text-neutral-300 transition">기능</a>
          <a href="#workflow" className="text-xs text-neutral-500 hover:text-neutral-300 transition">워크플로우</a>
          {isLoggedIn
            ? <a href="/dashboard" className="text-xs px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-neutral-300 hover:bg-white/15 transition">대시보드</a>
            : <a href="#login" className="text-xs px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-neutral-300 hover:bg-white/15 transition">시작하기</a>
          }
        </div>
      </nav>

      {/* ===== 히어로 섹션 ===== */}
      <section className="relative z-10 pt-12 lg:pt-20 pb-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* 왼쪽 - 카피 */}
          <div className={`lg:col-span-7 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* 배지 */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm mb-8">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute inset-0 animate-ping opacity-40" />
              </div>
              <span className="text-[11px] tracking-widest uppercase text-neutral-400 font-medium">Video Storyboard Builder</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 tracking-tight">
              <span className="text-white">영상 기획,</span>
              <br />
              <span className="bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">프레임 단위로</span>
              <br />
              <span className="text-white">완성하다.</span>
            </h1>

            <p className="text-neutral-500 text-lg leading-relaxed max-w-xl mb-12">
              카메라 앵글, 샷 사이즈, 조명, 트랜지션부터 타임테이블, 예산까지 —
              <span className="text-neutral-300 font-medium"> 하나의 도구로 전문 스토리보드를 완성</span>하세요.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4 mb-16">
              <a href={isLoggedIn ? '/dashboard' : '#login'} className="group flex items-center gap-3 px-7 py-4 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-all text-sm shadow-lg shadow-white/10">
                {isLoggedIn ? '대시보드로 가기' : '무료로 시작하기'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://pewpewstudio.com" target="_blank" rel="noopener" className="flex items-center gap-3 px-7 py-4 bg-neutral-900/80 border border-neutral-800 text-neutral-300 font-semibold rounded-xl hover:border-neutral-600 transition-all text-sm">
                <Play size={14} className="text-neutral-500" />
                PEWPEW Studio
              </a>
            </div>

            {/* 기능 태그 */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Camera, label: '카메라 앵글 · 샷 설정' },
                { icon: Layers, label: '씬 브레이크다운' },
                { icon: Clock, label: '타임테이블' },
                { icon: Clapperboard, label: 'PDF 기획안 출력' },
                { icon: Sparkles, label: 'AI 자동 생성' },
                { icon: MonitorPlay, label: '클라이언트 포트폴리오' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800/50 text-neutral-500 text-xs hover:border-neutral-700 hover:text-neutral-400 transition-all">
                  <Icon size={12} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 - 로그인 카드 / 대시보드 카드 */}
          <div id="login" className={`lg:col-span-5 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* 카드 배경 글로우 */}
              <div className="absolute -inset-1 bg-gradient-to-b from-neutral-700/20 to-transparent rounded-3xl blur-xl" />

              <div className="relative bg-neutral-900/90 backdrop-blur-2xl border border-neutral-800/80 rounded-2xl p-8 shadow-2xl">
                {/* 카드 장식 도트 */}
                <div className="flex gap-1.5 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>

                {isLoggedIn ? (
                  /* ===== 로그인 상태: 환영 카드 ===== */
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <Film size={28} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {user?.displayName ? `${user.displayName}님, 환영합니다` : '환영합니다'}
                    </h2>
                    <p className="text-neutral-500 text-sm mb-8">스토리보드 작업을 이어가세요</p>

                    <button onClick={() => router.push('/dashboard')}
                      className="w-full mb-3 px-4 py-4 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition flex items-center justify-center gap-3 text-sm shadow-lg shadow-white/10">
                      <Clapperboard size={16} />
                      대시보드로 가기
                      <ArrowRight size={14} />
                    </button>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700/30">
                        <div className="text-2xl font-black text-white mb-1">PDF</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">기획안 출력</div>
                      </div>
                      <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700/30">
                        <div className="text-2xl font-black text-white mb-1">AI</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">자동 생성</div>
                      </div>
                    </div>

                    <p className="text-neutral-700 text-[11px] mt-6">{user?.email}</p>
                  </div>
                ) : (
                  /* ===== 비로그인 상태: 로그인 폼 ===== */
                  <>
                    <h2 className="text-xl font-bold text-white mb-1">{isSignup ? '계정 만들기' : '시작하기'}</h2>
                    <p className="text-neutral-500 text-sm mb-6">{isSignup ? '새 계정을 만들어 시작하세요' : '로그인하고 스토리보드를 만들어보세요'}</p>

                    {error && (
                      <div className="bg-red-950/30 border border-red-900/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
                    )}

                    <button onClick={handleGoogleSignIn} disabled={isLoading}
                      className="w-full mb-4 px-4 py-3.5 bg-white text-neutral-900 font-semibold rounded-xl hover:bg-neutral-100 transition disabled:opacity-50 flex items-center justify-center gap-3 text-sm shadow-lg shadow-white/5">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {isLoading ? '처리 중...' : 'Google로 시작하기'}
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800" /></div>
                      <div className="relative flex justify-center text-xs"><span className="px-3 bg-neutral-900 text-neutral-600">또는 이메일로</span></div>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-3">
                      {isSignup && (
                        <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 text-white rounded-xl focus:outline-none focus:border-neutral-500 placeholder-neutral-600 text-sm transition" />
                      )}
                      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 text-white rounded-xl focus:outline-none focus:border-neutral-500 placeholder-neutral-600 text-sm transition" />
                      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 text-white rounded-xl focus:outline-none focus:border-neutral-500 placeholder-neutral-600 text-sm transition" />
                      <button type="submit" disabled={isLoading}
                        className="w-full px-4 py-3.5 bg-neutral-200 text-neutral-900 font-semibold rounded-xl hover:bg-white transition disabled:opacity-50 text-sm">
                        {isLoading ? '처리 중...' : isSignup ? '계정 만들기' : '로그인'}
                      </button>
                    </form>

                    <div className="mt-5 text-center">
                      <p className="text-neutral-500 text-xs">
                        {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
                        <button onClick={() => { setIsSignup(!isSignup); setError(''); setEmail(''); setPassword(''); setName(''); }}
                          className="text-white hover:underline underline-offset-4">
                          {isSignup ? '로그인' : '계정 만들기'}
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="hidden lg:flex justify-center mt-16">
          <a href="#features" className="flex flex-col items-center gap-2 text-neutral-700 hover:text-neutral-500 transition animate-bounce">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* ===== 기능 섹션 ===== */}
      <section id="features" className="relative z-10 py-24 px-8 lg:px-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-widest uppercase text-neutral-600 font-medium">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">영상 제작의 모든 것을 한 곳에서</h2>
            <p className="text-neutral-500 max-w-lg mx-auto">기획부터 촬영 준비, 클라이언트 제안까지 — 하나의 워크플로우로 연결합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🎬', title: '씬 브레이크다운', desc: '카메라 앵글, 샷 사이즈, 무브먼트, 조명, 렌즈를 씬 단위로 설정하고 관리합니다.' },
              { icon: '📋', title: '타임테이블', desc: '촬영 스케줄을 시간대별로 정리. 장소, 실내/외, 주/야, 출연진까지 한눈에.' },
              { icon: '📄', title: 'PDF 기획안', desc: 'HTML 미리보기와 동일한 프로페셔널 기획안을 PDF로 바로 출력합니다.' },
              { icon: '💰', title: '예산 추정', desc: '씬 수, 촬영일, 스태프, 장비 등을 기반으로 자동 예산을 계산합니다.' },
              { icon: '🎨', title: '포트폴리오 제안', desc: '클라이언트에게 포트폴리오와 함께 맞춤 제안서를 보내세요.' },
              { icon: '⚡', title: 'AI 자동 생성', desc: '씬 설명을 AI가 자동으로 작성. 빠른 초안 작업이 가능합니다.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:border-neutral-700/80 hover:bg-neutral-900/60 transition-all duration-300">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 워크플로우 섹션 ===== */}
      <section id="workflow" className="relative z-10 py-24 px-8 lg:px-16 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-widest uppercase text-neutral-600 font-medium">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">간단한 3단계</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: '프로젝트 생성', desc: '영상 유형, 플랫폼, 톤을 선택하고 새 스토리보드를 만드세요.' },
              { step: '02', title: '씬 설계', desc: '각 씬별 카메라 설정, 설명, 대사, 이미지를 입력합니다.' },
              { step: '03', title: '기획안 출력', desc: 'PDF로 내보내거나, 클라이언트에게 제안서를 바로 전송합니다.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative p-8 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 text-center">
                <div className="text-5xl font-black text-neutral-800/60 mb-4">{step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 섹션 ===== */}
      <section className="relative z-10 py-24 px-8 lg:px-16 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
          <p className="text-neutral-500 text-lg mb-10">무료로 시작하고, 프로 수준의 스토리보드를 만들어보세요.</p>
          <a href="#login" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition text-sm shadow-lg shadow-white/10">
            무료로 시작하기 <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ===== 푸터 ===== */}
      <footer className="relative z-10 px-8 lg:px-16 py-8 border-t border-neutral-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
              <Film size={13} className="text-neutral-400" />
            </div>
            <span className="text-xs text-neutral-600">PEWPEW 스토리보드</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-neutral-700">
            <a href="https://pewpewstudio.com" target="_blank" rel="noopener" className="hover:text-neutral-400 transition">PEWPEW Studio</a>
            <span>&copy; 2024 PEWPEW Studio. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
