'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3, Users, FilmIcon, Settings, Bell, Activity, Trash2,
  Edit3, Save, X, Plus
} from 'lucide-react';
import { Project, calculateStats } from '@/lib/utils';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('storyboard-projects');
      if (saved) setProjects(JSON.parse(saved));
      const savedAnnouncements = localStorage.getItem('announcements');
      if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }, []);

  const stats = calculateStats(projects);

  const handleAddAnnouncement = () => {
    if (!newAnnouncementTitle.trim() || !newAnnouncementContent.trim()) {
      alert('제목과 내용을 입력해주세요');
      return;
    }
    const newAnnouncement: Announcement = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newAnnouncementTitle,
      content: newAnnouncementContent,
      createdAt: Date.now(),
    };
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('announcements', JSON.stringify(updated));
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setShowNewAnnouncement(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('announcements', JSON.stringify(updated));
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm('이 프로젝트를 삭제하시겠습니까?')) return;
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('storyboard-projects', JSON.stringify(updated));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'overview', icon: BarChart3, label: '전체 통계' },
    { id: 'projects', icon: FilmIcon, label: '프로젝트 관리' },
    { id: 'announcements', icon: Bell, label: '공지사항 관리' },
    { id: 'activity', icon: Activity, label: '활동 로그' },
    { id: 'settings', icon: Settings, label: '설정' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Top Navigation */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Settings size={14} className="text-neutral-900" />
          </div>
          <h1 className="text-lg font-bold text-white">관리자 대시보드</h1>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition text-sm"
        >
          로그아웃
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-neutral-900/50 border-r border-neutral-800 p-4 min-h-[calc(100vh-65px)]">
          <nav className="space-y-1">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 text-sm ${
                  activeTab === id
                    ? 'bg-white text-neutral-900 font-semibold'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">전체 통계</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: '총 프로젝트 수', value: stats.totalProjects, icon: FilmIcon },
                  { label: '총 씬 수', value: stats.totalScenes, icon: BarChart3 },
                  { label: '활성 사용자', value: 1, icon: Users },
                  { label: '총 비디오 길이', value: `${Math.floor(stats.totalDuration / 60)}분`, icon: FilmIcon },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-500 text-xs font-medium">{label}</p>
                        <p className="text-3xl font-bold text-white mt-2">{value}</p>
                      </div>
                      <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                        <Icon size={20} className="text-neutral-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">시스템 정보</h3>
                <div className="space-y-2 text-xs text-neutral-500">
                  <p>스토리프레임 v1.0.0</p>
                  <p>Node.js 기반</p>
                  <p>로컬 저장소 사용</p>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">프로젝트 관리</h2>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                {projects.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 text-sm">생성된 프로젝트가 없습니다</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-800 bg-neutral-800/50">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-400">프로젝트명</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-400">씬 수</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-400">생성일</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-400">작업</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map(project => (
                          <tr key={project.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                            <td className="px-6 py-4 text-sm font-medium text-white">{project.title}</td>
                            <td className="px-6 py-4 text-sm text-neutral-400">{project.scenes.length}</td>
                            <td className="px-6 py-4 text-sm text-neutral-500">
                              {project.createdAt ? formatDate(project.createdAt) : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-neutral-500 hover:text-red-400 transition flex items-center gap-2"
                              >
                                <Trash2 size={14} />
                                삭제
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">공지사항 관리</h2>
                <button
                  onClick={() => setShowNewAnnouncement(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-200 transition text-sm font-medium"
                >
                  <Plus size={16} />
                  새 공지사항
                </button>
              </div>

              {showNewAnnouncement && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                  <h3 className="text-sm font-semibold text-white mb-4">새 공지사항 작성</h3>
                  <input
                    type="text"
                    placeholder="제목"
                    value={newAnnouncementTitle}
                    onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 mb-3 focus:outline-none focus:border-neutral-500 text-sm"
                  />
                  <textarea
                    placeholder="내용"
                    value={newAnnouncementContent}
                    onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 mb-4 h-24 focus:outline-none focus:border-neutral-500 text-sm resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAnnouncement}
                      className="px-4 py-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-200 transition flex items-center gap-2 text-sm font-medium"
                    >
                      <Save size={14} />
                      저장
                    </button>
                    <button
                      onClick={() => setShowNewAnnouncement(false)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition text-sm"
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {announcements.length === 0 ? (
                  <div className="text-center text-neutral-500 py-8 text-sm">공지사항이 없습니다</div>
                ) : (
                  announcements.map(announcement => (
                    <div key={announcement.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-semibold text-white">{announcement.title}</h3>
                        <button
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="text-neutral-600 hover:text-red-400 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-600 mb-3">{formatDate(announcement.createdAt)}</p>
                      <p className="text-neutral-400 text-sm whitespace-pre-wrap">{announcement.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">활동 로그</h2>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <p className="text-neutral-500 text-sm">최근 활동이 없습니다</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">설정</h2>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    사용자당 최대 프로젝트 수
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full max-w-xs px-4 py-2.5 border border-neutral-700 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-neutral-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    <input type="checkbox" defaultChecked className="mr-2 accent-neutral-500" />
                    신규 사용자 환영 메시지 표시
                  </label>
                </div>
                <button className="px-6 py-2.5 bg-white text-neutral-900 rounded-lg hover:bg-neutral-200 transition text-sm font-medium">
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
