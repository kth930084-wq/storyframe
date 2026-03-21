'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// 인앱 브라우저 감지
const isInAppBrowser = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || '';
  return /KAKAOTALK|Instagram|FBAN|FBAV|Line|NAVER|Whale\/1|Snapchat|WeChat|MicroMessenger|DaumApps|SamsungBrowser\/.*CrossApp/i.test(ua);
};

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

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) router.push('/dashboard');
    }).catch((error) => {
      if (error?.code !== 'auth/popup-closed-by-user') {
        setError(error.message || '로그인 처리 중 오류가 발생했습니다');
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-md-background flex items-center justify-center">
        <div className="text-md-on-surface-variant text-center">
          <div className="animate-pulse mb-4">
            <span className="material-symbols-outlined text-5xl text-md-outline">movie_filter</span>
          </div>
          <p className="text-sm tracking-widest uppercase font-label">Loading</p>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!user;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true); setError('');
      const provider = new GoogleAuthProvider();
      if (isInAppBrowser()) {
        await signInWithRedirect(auth, provider);
        return;
      }
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/unauthorized-domain' || error.message?.includes('disallowed_useragent')) {
        try {
          const provider = new GoogleAuthProvider();
          await signInWithRedirect(auth, provider);
          return;
        } catch (fallbackError: any) {
          setError(fallbackError.message || '구글 로그인 실패');
        }
      } else {
        setError(error.message || '구글 로그인 실패');
      }
    }
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
    <div className="relative flex min-h-screen w-full flex-col bg-md-background overflow-x-hidden font-body">
      <div className="flex h-full grow flex-col items-center">

        {/* ===== TopNavBar ===== */}
        <header className="flex items-center justify-between whitespace-nowrap px-10 py-4 w-full max-w-[1200px] border-b border-md-surface-container-high bg-md-surface-container-lowest sticky top-0 z-50">
          <div className="flex items-center gap-4 text-white">
            <div className="w-6 h-6 text-white">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold font-headline tracking-tight">PEWPEW Storyboard</h2>
          </div>
          <nav className="flex flex-1 justify-end gap-8 items-center">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-md-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="#features">기능</a>
              <a className="text-md-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="#workflow">워크플로우</a>
              <a className="text-md-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="https://pewpewstudio.com" target="_blank" rel="noopener">스튜디오</a>
            </div>
            {isLoggedIn ? (
              <button onClick={() => router.push('/dashboard')}
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded bg-white text-md-on-primary text-sm font-bold h-10 px-6 transition-all hover:bg-md-surface-tint hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                대시보드
              </button>
            ) : (
              <a href="#login"
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded bg-white text-md-on-primary text-sm font-bold h-10 px-6 transition-all hover:bg-md-surface-tint hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                시작하기
              </a>
            )}
          </nav>
        </header>

        <main className="w-full max-w-[1200px] flex-1 flex flex-col">

          {/* ===== Hero Section ===== */}
          <section className="flex flex-col items-center justify-center min-h-[716px] px-6 py-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-md-surface-container-lowest to-md-background z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-md-tertiary-container/10 blur-[120px] rounded-full z-0 pointer-events-none" />

            <div className={`relative z-10 flex flex-col items-center gap-8 max-w-4xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-white text-5xl md:text-7xl font-headline font-extrabold leading-tight tracking-tighter">
                영상 기획,<br />프레임 단위로 완성하다
              </h1>
              <p className="text-md-on-surface-variant text-lg md:text-xl font-body max-w-2xl leading-relaxed">
                카메라 앵글, 샷 사이즈, 트랜지션부터 타임테이블, 예산까지 — 하나의 도구로 전문 스토리보드를 완성하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                {isLoggedIn ? (
                  <button onClick={() => router.push('/dashboard')}
                    className="flex items-center justify-center rounded bg-white text-md-on-primary text-base font-bold h-14 px-8 w-full sm:w-auto transition-all hover:bg-md-surface-tint hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                    대시보드로 가기
                  </button>
                ) : (
                  <a href="#login"
                    className="flex items-center justify-center rounded bg-white text-md-on-primary text-base font-bold h-14 px-8 w-full sm:w-auto transition-all hover:bg-md-surface-tint hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                    무료로 시작하기
                  </a>
                )}
                <a href="https://pewpewstudio.com" target="_blank" rel="noopener"
                  className="flex items-center justify-center rounded bg-transparent border border-md-outline-variant text-white text-base font-bold h-14 px-8 w-full sm:w-auto transition-all hover:bg-md-surface-container hover:border-md-outline">
                  PEWPEW Studio
                </a>
              </div>
            </div>

            {/* Hero Preview */}
            <div className={`w-full max-w-5xl mt-20 relative z-10 rounded-xl overflow-hidden bg-md-surface-container-lowest border border-md-surface-container shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center px-4 py-3 bg-md-surface-container-low border-b border-md-surface-container gap-2">
                <div className="w-3 h-3 rounded-full bg-md-surface-variant" />
                <div className="w-3 h-3 rounded-full bg-md-surface-variant" />
                <div className="w-3 h-3 rounded-full bg-md-surface-variant" />
                <div className="ml-4 text-xs font-label text-md-outline tracking-wider uppercase">Scene Breakdown View</div>
              </div>
              <div className="aspect-video bg-md-surface relative flex items-center justify-center overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom right, #131313, #0e0e0e)' }}>
                <div className="grid grid-cols-3 gap-4 p-8 w-full h-full opacity-30">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-md-surface-container rounded border border-md-surface-container-high" />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-md-outline/50" style={{ fontSize: 64 }}>movie_filter</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Login Section ===== */}
          <section id="login" className="py-16 px-6 flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-md-surface-container rounded-xl p-8 border border-md-surface-container-high shadow-2xl">
                {isLoggedIn ? (
                  <div className="text-center py-4">
                    <span className="material-symbols-outlined text-5xl text-white mb-4 block">movie_filter</span>
                    <h2 className="text-xl font-headline font-bold text-white mb-2">
                      {user?.displayName ? `${user.displayName}님, 환영합니다` : '환영합니다'}
                    </h2>
                    <p className="text-md-on-surface-variant text-sm mb-8">스토리보드 작업을 이어가세요</p>
                    <button onClick={() => router.push('/dashboard')}
                      className="w-full px-4 py-4 bg-white text-md-on-primary font-bold rounded text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">dashboard</span>
                      대시보드로 가기
                    </button>
                    <p className="text-md-outline text-xs mt-6">{user?.email}</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-headline font-bold text-white mb-1">{isSignup ? '계정 만들기' : '시작하기'}</h2>
                    <p className="text-md-on-surface-variant text-sm mb-6">{isSignup ? '새 계정을 만들어 시작하세요' : '로그인하고 스토리보드를 만들어보세요'}</p>

                    {error && (
                      <div className="bg-md-error-container/30 border border-md-error/20 text-md-error px-4 py-3 rounded mb-4 text-sm">{error}</div>
                    )}

                    {mounted && isInAppBrowser() && (
                      <div className="bg-yellow-950/30 border border-yellow-800/30 text-yellow-400 px-4 py-3 rounded mb-4 text-sm">
                        <p className="mb-2">인앱 브라우저에서 접속 중입니다.</p>
                        <button onClick={() => {
                          const url = window.location.href;
                          window.open(url, '_system');
                          window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
                        }} className="text-yellow-300 underline underline-offset-4 text-xs font-medium">
                          외부 브라우저로 열기 (권장)
                        </button>
                      </div>
                    )}

                    <button onClick={handleGoogleSignIn} disabled={isLoading}
                      className="w-full mb-4 px-4 py-3.5 bg-white text-md-on-primary font-semibold rounded hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition disabled:opacity-50 flex items-center justify-center gap-3 text-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      {isLoading ? '처리 중...' : 'Google로 시작하기'}
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-md-outline-variant" /></div>
                      <div className="relative flex justify-center text-xs"><span className="px-3 bg-md-surface-container text-md-outline">또는 이메일로</span></div>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-3">
                      {isSignup && (
                        <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 bg-md-surface-container-lowest border border-md-outline-variant/30 text-white rounded focus:outline-none focus:border-white/50 placeholder-md-outline text-sm transition" />
                      )}
                      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-md-surface-container-lowest border border-md-outline-variant/30 text-white rounded focus:outline-none focus:border-white/50 placeholder-md-outline text-sm transition" />
                      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-md-surface-container-lowest border border-md-outline-variant/30 text-white rounded focus:outline-none focus:border-white/50 placeholder-md-outline text-sm transition" />
                      <button type="submit" disabled={isLoading}
                        className="w-full px-4 py-3.5 bg-md-surface-container-highest text-white font-semibold rounded hover:bg-md-surface-bright transition disabled:opacity-50 text-sm">
                        {isLoading ? '처리 중...' : isSignup ? '계정 만들기' : '로그인'}
                      </button>
                    </form>

                    <div className="mt-5 text-center">
                      <p className="text-md-outline text-xs">
                        {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
                        <button onClick={() => { setIsSignup(!isSignup); setError(''); setEmail(''); setPassword(''); setName(''); }}
                          className="text-white hover:underline underline-offset-4 font-medium">
                          {isSignup ? '로그인' : '계정 만들기'}
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ===== Features Section ===== */}
          <section id="features" className="py-24 px-6 flex flex-col gap-16 relative">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h2 className="text-white text-4xl font-headline font-bold tracking-tight">영상 제작의 모든 것을 한 곳에서</h2>
              <p className="text-md-on-surface-variant text-lg font-body">전문적인 스토리보드 제작에 필요한 모든 도구를 지원합니다. 아이디어 스케치부터 최종 기획안 출력까지 매끄럽게 진행하세요.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'video_camera_back', title: '씬 브레이크다운', desc: '프레임 단위 씬 설계. 카메라 움직임, 렌즈 화각, 조명 셋업 등 디테일한 연출 지시를 직관적으로 작성하세요.' },
                { icon: 'schedule', title: '타임테이블', desc: '촬영 일정 관리. 씬 번호와 로케이션 기반으로 효율적인 콜시트와 데일리 스케줄을 자동 생성합니다.' },
                { icon: 'picture_as_pdf', title: 'PDF 기획안', desc: '전문 기획안 즉시 출력. 클라이언트 미팅이나 현장 배포용으로 최적화된 포맷으로 스토리보드를 내보냅니다.' },
                { icon: 'account_balance_wallet', title: '예산 추정', desc: '프로젝트 예산 파악. 장비 렌탈, 인건비, 로케이션 비용 등을 씬 데이터와 연동하여 실시간으로 추산합니다.' },
                { icon: 'work', title: '포트폴리오 제안', desc: '클라이언트 제안서. 이전 작업물이나 레퍼런스 영상을 손쉽게 임베드하여 설득력 있는 피치덱을 구성하세요.' },
                { icon: 'auto_awesome', title: 'AI 자동 생성', desc: 'AI 아이디어 시각화. 텍스트 프롬프트만으로 러프한 콘티 이미지를 생성하여 초기 컨셉 회의 속도를 높입니다.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-lg bg-md-surface-container-low border border-transparent transition-all duration-300 hover:bg-md-surface-container hover:border-md-surface-container-high group">
                  <div className="w-12 h-12 rounded bg-md-surface-container flex items-center justify-center text-white group-hover:bg-md-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-headline font-bold mb-2">{title}</h3>
                    <p className="text-md-on-surface-variant text-sm font-body leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== 3-Step Workflow ===== */}
          <section id="workflow" className="py-24 px-6 mb-20">
            <div className="bg-md-surface-container-lowest rounded-xl p-10 md:p-16 border border-md-surface-container">
              <h2 className="text-white text-3xl font-headline font-bold mb-12 text-center tracking-tight">3-Step Workflow</h2>
              <div className="flex flex-col md:flex-row gap-8 relative">
                <div className="hidden md:block absolute top-6 left-12 right-12 h-px bg-md-surface-container-highest z-0" />

                {[
                  { step: '01', title: '프로젝트 생성', desc: '기본 정보를 설정하고 팀원을 초대하여 협업 환경을 구축하세요.' },
                  { step: '02', title: '씬 설계', desc: '이미지 업로드, 카메라 앵글, 샷 사이즈 등 세밀한 연출을 프레임 단위로 조정하세요.' },
                  { step: '03', title: '기획안 출력', desc: '완성된 스토리보드를 프로페셔널한 PDF 포맷으로 추출하여 공유하세요.' },
                ].map(({ step, title, desc }, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center text-center relative z-10">
                    <div className={`w-12 h-12 rounded-full bg-md-surface border-2 ${i === 1 ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-md-surface-container-high shadow-lg shadow-md-background'} flex items-center justify-center text-white mb-6`}>
                      <span className="text-sm font-headline font-bold">{step}</span>
                    </div>
                    <h3 className="text-white text-lg font-headline font-bold mb-3">{title}</h3>
                    <p className="text-md-on-surface-variant text-sm font-body max-w-xs">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ===== Footer ===== */}
        <footer className="w-full border-t border-md-surface-container-lowest py-8 text-center text-sm font-label text-md-outline">
          <p>&copy; 2024 PEWPEW Storyboard. All cinematic rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
