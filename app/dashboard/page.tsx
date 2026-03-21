'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { StoryboardApp } from '@/components/StoryboardApp';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-md-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4"><span className="material-symbols-outlined text-5xl text-md-outline">movie_filter</span></div>
          <p className="text-md-on-surface-variant text-sm tracking-widest uppercase font-label">Loading</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <StoryboardApp
      user={user}
      onLogout={handleLogout}
    />
  );
}
