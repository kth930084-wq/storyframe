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

  // Load data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('storyboard-projects');
      if (saved) {
        setProjects(JSON.parse(saved));
      }
      const savedAnnouncements = localStorage.getItem('announcements');
      if (savedAnnouncements) {
        setAnnouncements(JSON.parse(savedAnnouncements));
      }
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">관리자 대시보드</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          로그아웃
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                activeTab === 'overview'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart3 size={20} />
              전체 통계
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                activeTab === 'projects'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FilmIcon size={20} />
              프로젝트 관리
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                activeTab === 'announcements'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Bell size={20} />
              공지사항 관리
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                activeTab === 'activity'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Activity size={20} />
              활동 로그
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                activeTab === 'settings'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Settings size={20} />
              설정
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">전체 통계</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">총 프로젝트 수</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalProjects}</p>
                    </div>
                    <FilmIcon size={32} className="text-indigo-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">총 씬 수</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalScenes}</p>
                    </div>
                    <BarChart3 size={32} className="text-purple-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">활성 사용자</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1</p>
                    </div>
                    <Users size={32} className="text-pink-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">총 비디오 길이</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{Math.floor(stats.totalDuration / 60)}분</p>
                    </div>
                    <FilmIcon size={32} className="text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">시스템 정보</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">프로젝트 관리</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {projects.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    생성된 프로젝트가 없습니다
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">프로젝트명</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">씬 수</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">생성일</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">작업</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map(project => (
                          <tr key={project.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{project.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{project.scenes.length}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                              {project.createdAt ? formatDate(project.createdAt) : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 hover:text-red-700 transition flex items-center gap-2"
                              >
                                <Trash2 size={16} />
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">공지사항 관리</h2>
                <button
                  onClick={() => setShowNewAnnouncement(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <Plus size={18} />
                  새 공지사항
                </button>
              </div>

              {showNewAnnouncement && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">새 공지사항 작성</h3>
                  <input
                    type="text"
                    placeholder="제목"
                    value={newAnnouncementTitle}
                    onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <textarea
                    placeholder="내용"
                    value={newAnnouncementContent}
                    onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAnnouncement}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                      <Save size={16} />
                      저장
                    </button>
                    <button
                      onClick={() => setShowNewAnnouncement(false)}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    공지사항이 없습니다
                  </div>
                ) : (
                  announcements.map(announcement => (
                    <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                        <button
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{formatDate(announcement.createdAt)}</p>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{announcement.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">활동 로그</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">최근 활동이 없습니다</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">설정</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    사용자당 최대 프로젝트 수
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    신규 사용자 환영 메시지 표시
                  </label>
                </div>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
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
