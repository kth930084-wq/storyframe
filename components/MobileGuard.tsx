'use client';

import { useState, useEffect } from 'react';

export default function MobileGuard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    if (isMobile) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
      <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-md-light-on-surface rounded-2xl flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-md-light-on-surface mb-2">
          데스크탑에서 이용해주세요
        </h2>

        {/* Description */}
        <p className="text-md-light-on-surface-variant text-sm leading-relaxed mb-6">
          PEWPEW 스토리보드는 데스크탑 환경에 최적화되어 있습니다.
          <br />
          PC 또는 노트북에서 접속하시면 최상의 경험을 제공해드릴게요.
        </p>

        {/* URL copy hint */}
        <div className="bg-md-light-surface-container-high rounded-lg px-4 py-3 mb-6">
          <p className="text-xs text-md-light-outline-variant mb-1">접속 주소</p>
          <p className="text-sm font-mono text-md-light-on-surface font-medium">storyframe-three.vercel.app</p>
        </div>

        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="w-full bg-md-light-on-surface text-white rounded-xl py-3 text-sm font-semibold hover:bg-md-light-on-surface transition-colors"
        >
          그래도 계속하기
        </button>
      </div>
    </div>
  );
}
