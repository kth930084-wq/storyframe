'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Send,
  Check,
  Trash2,
  Search,
  Play,
  Pause,
  Square,
  Copy,
  Download,
  Settings,
  RotateCcw,
  AlertCircle,
  Clock,
  MapPin,
  Type,
  Volume2,
  Eye,
} from 'lucide-react';

// ============================================================================
// Feature 1: SceneCommentPanel (씬별 코멘트/피드백)
// ============================================================================

interface SceneComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

interface SceneCommentPanelProps {
  scene: any;
  onUpdate: (scene: any) => void;
  darkMode: boolean;
  userName?: string;
}

export const SceneCommentPanel: React.FC<SceneCommentPanelProps> = ({
  scene,
  onUpdate,
  darkMode,
  userName = '현재 사용자',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newComment, setNewComment] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const comments: SceneComment[] = scene?.comments || [];
  const unresolvedCount = comments.filter((c) => !c.resolved).length;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: SceneComment = {
      id: `comment-${Date.now()}`,
      author: userName,
      text: newComment,
      timestamp: new Date().toISOString(),
      resolved: false,
    };

    const updatedScene = {
      ...scene,
      comments: [...comments, comment],
    };

    onUpdate(updatedScene);
    setNewComment('');
    inputRef.current?.focus();
  };

  const handleToggleResolved = (commentId: string) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId ? { ...c, resolved: !c.resolved } : c
    );

    const updatedScene = {
      ...scene,
      comments: updatedComments,
    };

    onUpdate(updatedScene);
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);

    const updatedScene = {
      ...scene,
      comments: updatedComments,
    };

    onUpdate(updatedScene);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return '지금';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}시간 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const bgClass = darkMode ? 'bg-md-surface-container' : 'bg-md-light-surface-container-high';
  const borderClass = darkMode ? 'border-white/5' : 'border-md-light-outline-variant/20';
  const textClass = darkMode ? 'text-white' : 'text-md-light-on-surface';
  const mutedClass = darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant';
  const inputBgClass = darkMode ? 'bg-md-surface-container-high' : 'bg-white';

  return (
    <div
      className={`rounded-lg border ${borderClass} ${bgClass} transition-colors`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer hover:${darkMode ? 'bg-md-surface-container-high' : 'bg-md-light-surface-container-highest'} transition-colors`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <MessageCircle
            size={20}
            className={darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant'}
          />
          <span className={`font-semibold ${textClass}`}>씬 코멘트</span>
          {unresolvedCount > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
              {unresolvedCount}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className={mutedClass} />
        ) : (
          <ChevronDown size={20} className={mutedClass} />
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className={`border-t ${borderClass} p-4 space-y-4`}>
          {/* Comments List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {comments.length === 0 ? (
              <p className={`text-sm ${mutedClass} text-center py-6`}>
                코멘트가 없습니다
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 rounded-lg ${
                    comment.resolved
                      ? darkMode
                        ? 'bg-md-surface-container-high opacity-60'
                        : 'bg-md-light-surface-container-highest opacity-60'
                      : darkMode
                      ? 'bg-md-surface-container-high'
                      : 'bg-md-light-surface-container-highest'
                  } transition-all`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${textClass}`}>
                          {comment.author}
                        </span>
                        <span className={`text-xs ${mutedClass}`}>
                          {formatTime(comment.timestamp)}
                        </span>
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          comment.resolved
                            ? mutedClass
                            : darkMode
                            ? 'text-white'
                            : 'text-md-light-on-surface'
                        }`}
                      >
                        {comment.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleToggleResolved(comment.id)}
                        className={`p-1 rounded transition-colors ${
                          comment.resolved
                            ? 'bg-green-600 text-white'
                            : darkMode
                            ? 'hover:bg-md-surface-bright'
                            : 'hover:bg-md-light-surface-container-highest'
                        }`}
                        title={
                          comment.resolved
                            ? '미해결로 변경'
                            : '해결로 표시'
                        }
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className={`p-1 rounded transition-colors ${
                          darkMode
                            ? 'hover:bg-md-surface-bright text-md-outline hover:text-red-400'
                            : 'hover:bg-md-light-surface-container-highest text-md-light-on-surface-variant hover:text-red-600'
                        }`}
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Field */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && handleAddComment()
              }
              placeholder="코멘트를 입력하세요..."
              className={`flex-1 px-3 py-2 rounded border ${borderClass} ${inputBgClass} ${textClass} text-sm outline-none transition-colors focus:ring-2 focus:ring-neutral-400`}
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`p-2 rounded transition-colors ${
                newComment.trim()
                  ? darkMode
                    ? 'bg-md-surface-container-high hover:bg-md-surface-bright text-white'
                    : 'bg-md-light-surface-container-highest hover:bg-md-light-outline-variant/30 text-md-light-on-surface'
                  : darkMode
                  ? 'bg-md-surface-container text-md-outline'
                  : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Feature 2: AssetLibraryPanel (에셋 라이브러리)
// ============================================================================

interface ScenePreset {
  id: string;
  name: string;
  category: string;
  camera_angle: string;
  shot_size: string;
  camera_movement: string;
  lighting: string;
  duration: number;
  description: string;
}

interface AssetLibraryPanelProps {
  onApplyPreset: (preset: any) => void;
  darkMode: boolean;
}

const PRESET_LIBRARY: ScenePreset[] = [
  {
    id: 'preset-1',
    name: '정면 인터뷰',
    category: '인터뷰',
    camera_angle: '정면',
    shot_size: '중간',
    camera_movement: '고정',
    lighting: '3점 조명',
    duration: 30,
    description: '표준 인터뷰 설정',
  },
  {
    id: 'preset-2',
    name: '측면 인터뷰',
    category: '인터뷰',
    camera_angle: '45도',
    shot_size: '상반신',
    camera_movement: '고정',
    lighting: '측면 조명',
    duration: 30,
    description: '프로필 인터뷰',
  },
  {
    id: 'preset-3',
    name: '제품 클로즈업',
    category: '제품 촬영',
    camera_angle: '위에서 아래로',
    shot_size: '클로즈업',
    camera_movement: '느린 회전',
    lighting: '고르게 분산',
    duration: 10,
    description: '제품 세부사항 강조',
  },
  {
    id: 'preset-4',
    name: '제품 풀샷',
    category: '제품 촬영',
    camera_angle: '정면',
    shot_size: '풀샷',
    camera_movement: '고정',
    lighting: '배경 분리 조명',
    duration: 15,
    description: '제품 전체 모습',
  },
  {
    id: 'preset-5',
    name: '황금시간 야외',
    category: '야외 촬영',
    camera_angle: '45도',
    shot_size: '풀샷',
    camera_movement: '느린 팬',
    lighting: '자연광',
    duration: 20,
    description: '일몰 시간대 촬영',
  },
  {
    id: 'preset-6',
    name: '광각 야외',
    category: '야외 촬영',
    camera_angle: '45도 위',
    shot_size: '와이드',
    camera_movement: '드론',
    lighting: '자연광',
    duration: 25,
    description: '드론 야외 촬영',
  },
  {
    id: 'preset-7',
    name: '스튜디오 상품',
    category: '스튜디오',
    camera_angle: '정면',
    shot_size: '중간',
    camera_movement: '고정',
    lighting: '스튜디오 조명',
    duration: 15,
    description: '스튜디오 조명 설정',
  },
  {
    id: 'preset-8',
    name: '음식 촬영',
    category: '푸드',
    camera_angle: '위에서 아래로',
    shot_size: '클로즈업',
    camera_movement: '고정',
    lighting: '부드러운 조명',
    duration: 8,
    description: '음식 상세 촬영',
  },
  {
    id: 'preset-9',
    name: '인물 포트레이트',
    category: '인물',
    camera_angle: '정면',
    shot_size: '상반신',
    camera_movement: '고정',
    lighting: '백라이트',
    duration: 20,
    description: '인물 프로필 촬영',
  },
  {
    id: 'preset-10',
    name: '자동차 쇼룸',
    category: '자동차',
    camera_angle: '45도',
    shot_size: '풀샷',
    camera_movement: '느린 회전',
    lighting: '쇼룸 조명',
    duration: 30,
    description: '자동차 360도 뷰',
  },
  {
    id: 'preset-11',
    name: '건물 내부',
    category: '부동산',
    camera_angle: '광각',
    shot_size: '와이드',
    camera_movement: '워크스루',
    lighting: '자연광',
    duration: 20,
    description: '인테리어 촬영',
  },
];

export const AssetLibraryPanel: React.FC<AssetLibraryPanelProps> = ({
  onApplyPreset,
  darkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(PRESET_LIBRARY.map((p) => p.category))
  ).sort();

  const filteredPresets = PRESET_LIBRARY.filter((preset) => {
    const matchesSearch =
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || preset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const bgClass = darkMode ? 'bg-md-surface-container' : 'bg-md-light-surface-container-high';
  const borderClass = darkMode ? 'border-white/5' : 'border-md-light-outline-variant/20';
  const textClass = darkMode ? 'text-white' : 'text-md-light-on-surface';
  const mutedClass = darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant';
  const inputBgClass = darkMode ? 'bg-md-surface-container-high' : 'bg-white';
  const hoverClass = darkMode
    ? 'hover:bg-md-surface-container-high'
    : 'hover:bg-md-light-surface-container-highest';
  const buttonClass = darkMode
    ? 'bg-md-surface-container-high hover:bg-md-surface-bright'
    : 'bg-md-light-surface-container-highest hover:bg-md-light-outline-variant/30';

  return (
    <div
      className={`rounded-lg border ${borderClass} ${bgClass} transition-colors`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${hoverClass} transition-colors`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Settings
            size={20}
            className={darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant'}
          />
          <span className={`font-semibold ${textClass}`}>에셋 라이브러리</span>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className={mutedClass} />
        ) : (
          <ChevronDown size={20} className={mutedClass} />
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className={`border-t ${borderClass} p-4 space-y-4`}>
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${mutedClass}`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프리셋 검색..."
              className={`w-full pl-9 pr-3 py-2 rounded border ${borderClass} ${inputBgClass} ${textClass} text-sm outline-none transition-colors focus:ring-2 focus:ring-neutral-400`}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedCategory === null
                  ? darkMode
                    ? 'bg-md-surface-bright text-white'
                    : 'bg-md-light-surface-container-highest text-md-light-on-surface'
                  : buttonClass
              } ${textClass}`}
            >
              전체
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat ? null : cat
                  )
                }
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedCategory === cat
                    ? darkMode
                      ? 'bg-md-surface-bright text-white'
                      : 'bg-md-light-surface-container-highest text-md-light-on-surface'
                    : buttonClass
                } ${textClass}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Presets Grid */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredPresets.length === 0 ? (
              <p className={`text-sm ${mutedClass} text-center py-6`}>
                일치하는 프리셋이 없습니다
              </p>
            ) : (
              filteredPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() =>
                    onApplyPreset({
                      camera_angle: preset.camera_angle,
                      shot_size: preset.shot_size,
                      camera_movement: preset.camera_movement,
                      lighting: preset.lighting,
                      duration: preset.duration,
                    })
                  }
                  className={`w-full text-left p-3 rounded border ${borderClass} ${hoverClass} transition-all group`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${textClass}`}>
                        {preset.name}
                      </h4>
                      <p className={`text-xs ${mutedClass} mt-1`}>
                        {preset.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span
                          className={`inline-block text-xs px-2 py-1 rounded ${
                            darkMode
                              ? 'bg-md-surface-container-high text-md-on-surface-variant'
                              : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
                          }`}
                        >
                          {preset.camera_angle}
                        </span>
                        <span
                          className={`inline-block text-xs px-2 py-1 rounded ${
                            darkMode
                              ? 'bg-md-surface-container-high text-md-on-surface-variant'
                              : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
                          }`}
                        >
                          {preset.shot_size}
                        </span>
                        <span
                          className={`inline-block text-xs px-2 py-1 rounded ${
                            darkMode
                              ? 'bg-md-surface-container-high text-md-on-surface-variant'
                              : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
                          }`}
                        >
                          {preset.duration}초
                        </span>
                      </div>
                    </div>
                    <div
                      className={`ml-2 p-1 rounded transition-transform group-hover:scale-110 ${buttonClass}`}
                    >
                      <Check size={16} className={textClass} />
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Feature 3: AnimaticPreview (애니매틱 프리뷰/슬라이드쇼)
// ============================================================================

interface AnimaticPreviewProps {
  scenes: any[];
  projectTitle: string;
  darkMode: boolean;
}

export const AnimaticPreview: React.FC<AnimaticPreviewProps> = ({
  scenes,
  projectTitle,
  darkMode,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentScene = scenes[currentIndex] || {};
  const sceneDuration = (currentScene.duration || 3) * 1000;
  const totalDuration = scenes.reduce((sum, s) => sum + (s.duration || 3), 0);
  const totalMs = totalDuration * 1000;

  // Play animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    startTimeRef.current = Date.now() - elapsedMs;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      setElapsedMs(elapsed);

      let newIndex = currentIndex;
      let remainingMs = elapsed;

      for (let i = 0; i < scenes.length; i++) {
        const duration = (scenes[i].duration || 3) * 1000;
        if (remainingMs < duration) {
          newIndex = i;
          break;
        }
        remainingMs -= duration;
      }

      if (newIndex >= scenes.length) {
        setIsPlaying(false);
        setCurrentIndex(0);
        setElapsedMs(0);
        return;
      }

      setCurrentIndex(newIndex);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, scenes, currentIndex, elapsedMs]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setElapsedMs(0);
  };

  const progressPercent = (elapsedMs / totalMs) * 100;

  const bgClass = darkMode ? 'bg-md-surface-container-low' : 'bg-md-light-surface-container-high';
  const textClass = darkMode ? 'text-white' : 'text-md-light-on-surface';
  const mutedClass = darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant';
  const buttonClass = darkMode
    ? 'bg-md-surface-container-high hover:bg-md-surface-bright text-white'
    : 'bg-md-light-surface-container-highest hover:bg-md-light-outline-variant/30 text-md-light-on-surface';

  return (
    <div className={`rounded-lg overflow-hidden ${bgClass} transition-colors`}>
      {/* Preview Area - Dark Background */}
      <div
        className={`relative w-full aspect-video ${
          darkMode ? 'bg-md-surface-container-low' : 'bg-black'
        } flex items-center justify-center`}
      >
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-2xl">
            {currentScene.image && (
              <div className="mb-4 rounded-lg overflow-hidden border border-white/5">
                <img
                  src={currentScene.image}
                  alt={currentScene.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <h2 className="text-3xl font-bold text-white mb-2">
              {currentScene.title || `장면 ${currentIndex + 1}`}
            </h2>
            {currentScene.description && (
              <p className="text-md-on-surface-variant text-lg mb-4">
                {currentScene.description}
              </p>
            )}
          </div>
        </div>

        {/* Scene Counter */}
        <div className="absolute bottom-4 right-4 text-white text-sm font-mono bg-black bg-opacity-50 px-3 py-1 rounded">
          {currentIndex + 1} / {scenes.length}
        </div>
      </div>

      {/* Controls Section */}
      <div className={`p-4 space-y-3 ${darkMode ? 'bg-md-surface-container' : 'bg-md-light-surface-container-highest'}`}>
        {/* Progress Bar */}
        <div className="space-y-1">
          <div
            className={`w-full h-2 rounded-full ${
              darkMode ? 'bg-md-surface-container-high' : 'bg-md-light-surface-container-highest'
            } overflow-hidden`}
          >
            <div
              className="h-full bg-md-surface-bright transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-md-outline">
            <span>
              {Math.floor(elapsedMs / 1000)} / {totalDuration}초
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={handlePlayPause}
              className={`p-2 rounded transition-colors ${buttonClass}`}
              title={isPlaying ? '일시정지' : '재생'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={handleStop}
              className={`p-2 rounded transition-colors ${buttonClass}`}
              title="정지"
            >
              <Square size={20} />
            </button>
          </div>

          <div className={`text-sm font-semibold ${textClass}`}>
            {projectTitle}
          </div>

          <div className={`text-xs ${mutedClass}`}>
            애니매틱 미리보기
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Feature 4: ShotListView (샷 리스트 자동 생성)
// ============================================================================

type SortColumn =
  | 'number'
  | 'title'
  | 'shot_size'
  | 'camera_angle'
  | 'camera_movement'
  | 'lighting'
  | 'duration';
type SortDirection = 'asc' | 'desc';

interface ShotListViewProps {
  project: any;
  darkMode: boolean;
}

export const ShotListView: React.FC<ShotListViewProps> = ({
  project,
  darkMode,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>('number');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [groupByScene, setGroupByScene] = useState(false);

  const scenes = project?.scenes || [];

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedScenes = [...scenes].sort((a, b) => {
    let aVal = a[sortColumn] || '';
    let bVal = b[sortColumn] || '';

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleCopy = () => {
    const headers = [
      '씬명',
      '샷 사이즈',
      '앵글',
      '무브먼트',
      '조명',
      '길이',
      '장소',
      '대사',
      '특이사항',
    ];
    const rows = scenes.map((scene) => [
      scene.title || '',
      scene.shot_size || '',
      scene.camera_angle || '',
      scene.camera_movement || '',
      scene.lighting || '',
      `${scene.duration || 0}초`,
      scene.location || '',
      scene.dialogue || '',
      scene.notes || '',
    ]);

    const tsvContent = [
      headers.join('\t'),
      ...rows.map((row) => row.join('\t')),
    ].join('\n');

    navigator.clipboard.writeText(tsvContent);
  };

  const bgClass = darkMode ? 'bg-md-surface-container' : 'bg-md-light-surface-container-high';
  const borderClass = darkMode ? 'border-white/5' : 'border-md-light-outline-variant/20';
  const textClass = darkMode ? 'text-white' : 'text-md-light-on-surface';
  const mutedClass = darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant';
  const cellBgClass = darkMode ? 'bg-md-surface-container-high' : 'bg-white';
  const headerBgClass = darkMode ? 'bg-md-surface-container-high' : 'bg-md-light-surface-container-highest';
  const rowHoverClass = darkMode ? 'hover:bg-md-surface-container-high' : 'hover:bg-md-light-surface-container-highest';

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return null;
    return (
      <span className="ml-1 text-xs">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className={`rounded-lg border ${borderClass} ${bgClass}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className={`font-semibold text-lg ${textClass}`}>샷 리스트</h3>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={groupByScene}
              onChange={(e) => setGroupByScene(e.target.checked)}
              className="rounded"
            />
            <span className={mutedClass}>장면별 그룹</span>
          </label>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
              darkMode
                ? 'bg-md-surface-container-high hover:bg-md-surface-bright'
                : 'bg-md-light-surface-container-highest hover:bg-md-light-outline-variant/30'
            } ${textClass}`}
            title="TSV로 복사 (엑셀 붙여넣기용)"
          >
            <Copy size={16} />
            복사
          </button>
          <button className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
              darkMode
                ? 'bg-md-surface-container-high hover:bg-md-surface-bright'
                : 'bg-md-light-surface-container-highest hover:bg-md-light-outline-variant/30'
            } ${textClass}`}
            title="인쇄"
          >
            <Download size={16} />
            인쇄
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={headerBgClass}>
              <th className={`px-4 py-2 text-left font-semibold ${textClass} w-12`}>
                #
              </th>
              <th
                onClick={() => handleSort('title')}
                className={`px-4 py-2 text-left font-semibold ${textClass} cursor-pointer hover:opacity-75 transition-opacity`}
              >
                씬명
                <SortIcon column="title" />
              </th>
              <th
                onClick={() => handleSort('shot_size')}
                className={`px-4 py-2 text-left font-semibold ${textClass} cursor-pointer hover:opacity-75 transition-opacity`}
              >
                샷 사이즈
                <SortIcon column="shot_size" />
              </th>
              <th
                onClick={() => handleSort('camera_angle')}
                className={`px-4 py-2 text-left font-semibold ${textClass} cursor-pointer hover:opacity-75 transition-opacity`}
              >
                앵글
                <SortIcon column="camera_angle" />
              </th>
              <th
                onClick={() => handleSort('camera_movement')}
                className={`px-4 py-2 text-left font-semibold ${textClass} cursor-pointer hover:opacity-75 transition-opacity`}
              >
                무브먼트
                <SortIcon column="camera_movement" />
              </th>
              <th
                onClick={() => handleSort('lighting')}
                className={`px-4 py-2 text-left font-semibold ${textClass} cursor-pointer hover:opacity-75 transition-opacity`}
              >
                조명
                <SortIcon column="lighting" />
              </th>
              <th
                onClick={() => handleSort('duration')}
                className={`px-4 py-2 text-left font-semibold ${textClass} cursor-pointer hover:opacity-75 transition-opacity`}
              >
                길이
                <SortIcon column="duration" />
              </th>
              <th className={`px-4 py-2 text-left font-semibold ${textClass}`}>
                장소
              </th>
              <th className={`px-4 py-2 text-left font-semibold ${textClass}`}>
                대사
              </th>
              <th className={`px-4 py-2 text-left font-semibold ${textClass}`}>
                특이사항
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedScenes.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className={`px-4 py-8 text-center ${mutedClass}`}
                >
                  샷이 없습니다
                </td>
              </tr>
            ) : (
              sortedScenes.map((scene, idx) => (
                <tr
                  key={scene.id}
                  className={`border-b ${borderClass} ${rowHoverClass} transition-colors`}
                >
                  <td
                    className={`px-4 py-3 ${mutedClass} font-mono text-xs`}
                  >
                    {idx + 1}
                  </td>
                  <td className={`px-4 py-3 ${textClass} font-medium`}>
                    {scene.title}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs`}
                  >
                    {scene.shot_size || '-'}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs`}
                  >
                    {scene.camera_angle || '-'}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs`}
                  >
                    {scene.camera_movement || '-'}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs`}
                  >
                    {scene.lighting || '-'}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs font-mono`}
                  >
                    {scene.duration || 0}초
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs`}
                  >
                    {scene.location || '-'}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs max-w-xs truncate`}
                  >
                    {scene.dialogue || '-'}
                  </td>
                  <td
                    className={`px-4 py-3 ${mutedClass} text-xs max-w-xs truncate`}
                  >
                    {scene.notes || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div
        className={`px-4 py-3 border-t ${borderClass} ${
          darkMode ? 'bg-md-surface-container-high' : 'bg-white'
        } flex items-center justify-between text-sm`}
      >
        <span className={mutedClass}>
          총 {scenes.length}개 장면,{' '}
          {scenes.reduce((sum, s) => sum + (s.duration || 0), 0)}초
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// Feature 5: VersionManager (버전 관리/스냅샷)
// ============================================================================

interface VersionSnapshot {
  id: string;
  name: string;
  timestamp: string;
  sceneCount: number;
  data: any;
}

interface VersionManagerProps {
  project: any;
  onRestore: (project: any) => void;
  darkMode: boolean;
}

export const VersionManager: React.FC<VersionManagerProps> = ({
  project,
  onRestore,
  darkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [versions, setVersions] = useState<VersionSnapshot[]>([]);
  const [versionName, setVersionName] = useState('');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [restoreConfirm, setRestoreConfirm] = useState<string | null>(null);

  const storageKey = `storyboard-versions-${project?.id}`;
  const MAX_VERSIONS = 10;

  // Load versions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setVersions(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      console.error('Failed to load versions:', e);
    }
  }, [storageKey]);

  // Auto-save periodically
  useEffect(() => {
    if (!autoSaveEnabled || !project?.id) return;

    const interval = setInterval(() => {
      const autoSnapshot: VersionSnapshot = {
        id: `version-auto-${Date.now()}`,
        name: `자동 저장 ${new Date().toLocaleTimeString('ko-KR')}`,
        timestamp: new Date().toISOString(),
        sceneCount: project?.scenes?.length || 0,
        data: project,
      };

      setVersions((prev) => {
        const updated = [autoSnapshot, ...prev].slice(0, MAX_VERSIONS);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (e) {
          console.error('Failed to save version:', e);
        }
        return updated;
      });
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [autoSaveEnabled, project, storageKey]);

  const handleSaveVersion = () => {
    if (!versionName.trim() || !project?.id) return;

    const newVersion: VersionSnapshot = {
      id: `version-${Date.now()}`,
      name: versionName,
      timestamp: new Date().toISOString(),
      sceneCount: project?.scenes?.length || 0,
      data: project,
    };

    setVersions((prev) => {
      const updated = [newVersion, ...prev].slice(0, MAX_VERSIONS);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save version:', e);
      }
      return updated;
    });

    setVersionName('');
  };

  const handleRestore = (versionId: string) => {
    const version = versions.find((v) => v.id === versionId);
    if (version) {
      onRestore(version.data);
      setRestoreConfirm(null);
    }
  };

  const handleDelete = (versionId: string) => {
    setVersions((prev) => {
      const updated = prev.filter((v) => v.id !== versionId);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to delete version:', e);
      }
      return updated;
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR');
  };

  const bgClass = darkMode ? 'bg-md-surface-container' : 'bg-md-light-surface-container-high';
  const borderClass = darkMode ? 'border-white/5' : 'border-md-light-outline-variant/20';
  const textClass = darkMode ? 'text-white' : 'text-md-light-on-surface';
  const mutedClass = darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant';
  const inputBgClass = darkMode ? 'bg-md-surface-container-high' : 'bg-white';
  const hoverClass = darkMode
    ? 'hover:bg-md-surface-container-high'
    : 'hover:bg-md-light-surface-container-highest';
  const buttonClass = darkMode
    ? 'bg-md-surface-container-high hover:bg-md-surface-bright'
    : 'bg-md-light-surface-container-highest hover:bg-md-light-outline-variant/30';

  return (
    <div
      className={`rounded-lg border ${borderClass} ${bgClass} transition-colors`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${hoverClass} transition-colors`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <RotateCcw
            size={20}
            className={darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant'}
          />
          <span className={`font-semibold ${textClass}`}>버전 관리</span>
          {autoSaveEnabled && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-green-900 text-green-200">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              자동 저장
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className={mutedClass} />
        ) : (
          <ChevronDown size={20} className={mutedClass} />
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className={`border-t ${borderClass} p-4 space-y-4`}>
          {/* Save New Version */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' && handleSaveVersion()
                }
                placeholder="버전 이름 입력..."
                className={`flex-1 px-3 py-2 rounded border ${borderClass} ${inputBgClass} ${textClass} text-sm outline-none transition-colors focus:ring-2 focus:ring-neutral-400`}
              />
              <button
                onClick={handleSaveVersion}
                disabled={!versionName.trim()}
                className={`px-3 py-2 rounded transition-colors text-sm font-medium ${
                  versionName.trim()
                    ? buttonClass
                    : darkMode
                    ? 'bg-md-surface-container text-md-outline'
                    : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
                } ${textClass}`}
              >
                저장
              </button>
            </div>

            {/* Auto-save Toggle */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoSaveEnabled}
                onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                className="rounded"
              />
              <span className={mutedClass}>
                자동 저장 활성화 (30초 간격)
              </span>
            </label>
          </div>

          {/* Versions List */}
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {versions.length === 0 ? (
              <p className={`text-sm ${mutedClass} text-center py-6`}>
                저장된 버전이 없습니다
              </p>
            ) : (
              versions.map((version) => (
                <div
                  key={version.id}
                  className={`p-3 rounded border ${borderClass} ${
                    restoreConfirm === version.id
                      ? darkMode
                        ? 'bg-md-surface-container-high'
                        : 'bg-md-light-surface-container-highest'
                      : ''
                  }`}
                >
                  {restoreConfirm === version.id ? (
                    // Confirm restore
                    <div className="space-y-2">
                      <p className={`text-sm ${textClass}`}>
                        이 버전으로 복원하시겠습니까?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleRestore(version.id)
                          }
                          className={`flex-1 px-2 py-1 rounded text-sm font-medium transition-colors bg-green-700 hover:bg-green-600 text-white`}
                        >
                          복원
                        </button>
                        <button
                          onClick={() => setRestoreConfirm(null)}
                          className={`flex-1 px-2 py-1 rounded text-sm font-medium transition-colors ${buttonClass} ${textClass}`}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${textClass}`}>
                            {version.name}
                          </h4>
                          <p
                            className={`text-xs ${mutedClass} mt-1`}
                          >
                            {formatDate(version.timestamp)}
                          </p>
                          <div className="flex gap-2 mt-2 text-xs">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                                darkMode
                                  ? 'bg-md-surface-container-high text-md-on-surface-variant'
                                  : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
                              }`}
                            >
                              <Eye size={12} />
                              {version.sceneCount} 장면
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setRestoreConfirm(version.id)
                            }
                            className={`p-1 rounded transition-colors ${buttonClass}`}
                            title="복원"
                          >
                            <RotateCcw size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(version.id)
                            }
                            className={`p-1 rounded transition-colors ${
                              darkMode
                                ? 'hover:bg-md-surface-bright text-md-outline hover:text-red-400'
                                : 'hover:bg-md-light-surface-container-highest text-md-light-on-surface-variant hover:text-red-600'
                            }`}
                            title="삭제"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Storage Info */}
          {versions.length > 0 && (
            <div
              className={`text-xs ${mutedClass} p-2 rounded ${
                darkMode ? 'bg-md-surface-container-high' : 'bg-md-light-surface-container-highest'
              }`}
            >
              저장됨: {versions.length} / {MAX_VERSIONS} 버전
            </div>
          )}
        </div>
      )}
    </div>
  );
};
