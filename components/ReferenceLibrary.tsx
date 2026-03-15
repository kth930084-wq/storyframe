'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES, type PortfolioItem, type PortfolioCategory } from '@/lib/portfolio-data';

interface TemplateData {
  id: number;
  uuid: string;
  shotSize: string;
  angle: string;
  character: string;
  action: string;
  location: string;
  lighting: string;
  movement: string;
  filename: string;
  thumbnail: string;
  fullImage: string;
}

interface FiltersData {
  shotSize: string[];
  angle: string[];
  character: string[];
  action: string[];
  lighting: string[];
  movement: string[];
}

interface TemplatesResponse {
  totalCount: number;
  filters: FiltersData;
  templates: TemplateData[];
}

// Korean labels for filter categories
const FILTER_LABELS: Record<string, string> = {
  shotSize: '샷 사이즈',
  angle: '카메라 앵글',
  character: '캐릭터',
  action: '액션',
  lighting: '조명',
  movement: '움직임',
};

const SHOT_SIZE_LABELS: Record<string, string> = {
  ECU: 'ECU (익스트림 클로즈업)',
  BCU: 'BCU (빅 클로즈업)',
  CU: 'CU (클로즈업)',
  MS: 'MS (미디엄 샷)',
  FS: 'FS (풀 샷)',
  WS: 'WS (와이드 샷)',
  ES: 'ES (익스트림 와이드)',
};

const ANGLE_LABELS: Record<string, string> = {
  'eye-level': '아이 레벨',
  'high-angle': '하이 앵글',
  'low-angle': '로우 앵글',
  'bird-eye': '버드 아이',
  'dutch-angle': '더치 앵글',
  'over-the-shoulder': '오버 더 숄더',
  'pov': 'POV (1인칭)',
  '45-degree': '45도 앵글',
};

const CHARACTER_LABELS: Record<string, string> = {
  'solo-male': '남자 1인',
  'solo-female': '여자 1인',
  'duo': '2인',
  'group': '그룹',
  'product': '제품',
};

const ACTION_LABELS: Record<string, string> = {
  neutral: '중립', conversation: '대화', dramatic: '드라마틱', eating: '식사',
  gesture: '제스처', 'holding-product': '제품 들기', phone: '전화', presenting: '발표',
  'product-shot': '제품 샷', reacting: '리액션', sitting: '앉기', standing: '서기',
  talking: '말하기', walking: '걷기', working: '작업',
};

type TabType = 'templates' | 'portfolio';

interface ReferenceLibraryProps {
  onSelectImage?: (template: TemplateData) => void;
  onSelectPortfolioImage?: (imageUrl: string, info: { brand: string; title: string; category: string }) => void;
  onClose?: () => void;
}

// ===== PEWPEW PORTFOLIO TAB =====
function PortfolioTab({ onSelectImage, onClose }: { onSelectImage?: ReferenceLibraryProps['onSelectPortfolioImage']; onClose?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | 'ALL'>('ALL');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [capturedFrames, setCapturedFrames] = useState<{ url: string; brand: string; title: string }[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedFrames(prev => [...prev, {
      url: dataUrl,
      brand: selectedItem?.brand || '직접 업로드',
      title: selectedItem?.title || '캡처된 프레임',
    }]);
  }, [selectedItem]);

  const handleSelectCaptured = (frame: { url: string; brand: string; title: string }) => {
    if (onSelectImage) {
      onSelectImage(frame.url, { brand: frame.brand, title: frame.title, category: 'portfolio' });
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - Categories */}
      <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 flex-shrink-0">
        <h3 className="text-gray-300 text-sm font-semibold mb-3">카테고리</h3>
        <div className="flex flex-col gap-1.5 mb-6">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-2 rounded-lg text-left text-sm transition-colors ${
              selectedCategory === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            전체 ({PORTFOLIO_ITEMS.length})
          </button>
          {PORTFOLIO_CATEGORIES.map(cat => {
            const count = PORTFOLIO_ITEMS.filter(i => i.category === cat.value).length;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-2 rounded-lg text-left text-sm transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.value ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="ml-auto text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Captured Frames */}
        {capturedFrames.length > 0 && (
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-gray-300 text-sm font-semibold mb-2">캡처된 프레임 ({capturedFrames.length})</h3>
            <div className="flex flex-col gap-2">
              {capturedFrames.map((frame, i) => (
                <div key={i} className="relative group">
                  <img
                    src={frame.url}
                    alt={`캡처 ${i + 1}`}
                    className="w-full aspect-video object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500"
                    onClick={() => handleSelectCaptured(frame)}
                  />
                  <div className="absolute bottom-1 left-1 right-1 text-[9px] text-white bg-black/60 rounded px-1.5 py-0.5 truncate">
                    {frame.brand}
                  </div>
                  <button
                    onClick={() => setCapturedFrames(prev => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct URL Input */}
        <div className="border-t border-gray-700 pt-4 mt-4">
          <h3 className="text-gray-300 text-sm font-semibold mb-2">영상 URL 직접 입력</h3>
          <input
            type="url"
            placeholder="https://..."
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg text-xs border border-gray-600 focus:outline-none focus:border-blue-500 mb-2"
          />
          {videoUrl && (
            <button
              onClick={() => {
                setSelectedItem(null);
                setIsCapturing(true);
              }}
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-500"
            >
              영상 열기
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isCapturing ? (
          /* Video Player with Frame Capture */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-lg font-bold">
                  {selectedItem ? `${selectedItem.brand} - ${selectedItem.title}` : '영상 프레임 캡처'}
                </h3>
                <p className="text-gray-400 text-sm">원하는 장면에서 일시정지 후 '프레임 캡처' 버튼을 눌러주세요</p>
              </div>
              <button
                onClick={() => setIsCapturing(false)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600"
              >
                목록으로 돌아가기
              </button>
            </div>

            <div className="bg-black rounded-xl overflow-hidden mb-4">
              <video
                ref={videoRef}
                src={videoUrl || selectedItem?.videoUrl}
                controls
                className="w-full aspect-video"
                crossOrigin="anonymous"
                playsInline
              >
                <source src={videoUrl || selectedItem?.videoUrl} />
              </video>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={captureFrame}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 text-sm font-bold flex items-center justify-center gap-2"
              >
                📸 현재 프레임 캡처
              </button>
              <button
                onClick={() => {
                  const v = videoRef.current;
                  if (v) { v.currentTime = Math.max(0, v.currentTime - 1/30); }
                }}
                className="px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 text-sm"
              >
                ◀ 1프레임
              </button>
              <button
                onClick={() => {
                  const v = videoRef.current;
                  if (v) { v.currentTime = v.currentTime + 1/30; }
                }}
                className="px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 text-sm"
              >
                1프레임 ▶
              </button>
            </div>

            {/* Captured Frames Grid */}
            {capturedFrames.length > 0 && (
              <div>
                <h4 className="text-white text-sm font-bold mb-3">캡처된 프레임들</h4>
                <div className="grid grid-cols-4 gap-3">
                  {capturedFrames.map((frame, i) => (
                    <div
                      key={i}
                      className="cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-blue-500 transition-all"
                      onClick={() => handleSelectCaptured(frame)}
                    >
                      <img src={frame.url} alt={`캡처 ${i + 1}`} className="w-full aspect-video object-cover" />
                      <div className="p-2 text-[10px] text-gray-400">{frame.brand} · 프레임 {i + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {/* PEWPEW Studio guide */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <h4 className="text-gray-300 text-sm font-semibold mb-2">사용 방법</h4>
              <ol className="text-gray-500 text-xs space-y-1.5 list-decimal list-inside">
                <li>pewpewstudio.com에서 영상을 재생하고 원하는 장면에서 일시정지합니다</li>
                <li>또는 위 영상 플레이어에서 직접 재생/정지합니다</li>
                <li>'프레임 캡처' 버튼으로 현재 화면을 캡처합니다</li>
                <li>캡처된 프레임을 클릭하면 스토리보드 씬에 적용됩니다</li>
              </ol>
              <p className="text-yellow-500/70 text-xs mt-2">
                * CORS 정책으로 외부 영상 캡처가 안 될 수 있습니다. 이 경우 스크린샷을 찍어 이미지를 직접 업로드해주세요.
              </p>
            </div>
          </div>
        ) : (
          /* Portfolio Grid */
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredItems.map(item => {
                const catInfo = PORTFOLIO_CATEGORIES.find(c => c.value === item.category);
                return (
                  <div
                    key={item.id}
                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-gray-800 hover:ring-2 hover:ring-blue-500 transition-all"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsCapturing(true);
                    }}
                  >
                    <div className="aspect-video relative bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-4xl opacity-30">{catInfo?.icon || '🎬'}</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                          ▶ 영상 열기
                        </span>
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="text-white text-xs font-medium truncate">{item.brand}</div>
                      <div className="text-gray-500 text-[10px] truncate">{item.title}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[9px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{catInfo?.label}</span>
                        <span className="text-[9px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{item.contentType}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick guide at bottom */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 text-center">
              <p className="text-gray-500 text-xs">
                포트폴리오 영상을 클릭하여 원하는 장면을 캡처하고, 스토리보드 레퍼런스로 활용하세요
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function ReferenceLibrary({ onSelectImage, onSelectPortfolioImage, onClose }: ReferenceLibraryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('templates');
  const [data, setData] = useState<TemplatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<TemplateData | null>(null);
  const [visibleCount, setVisibleCount] = useState(48);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/templates_data.json')
      .then(res => res.json())
      .then((d: TemplatesResponse) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredTemplates = useMemo(() => {
    if (!data) return [];
    return data.templates.filter(t => {
      for (const [key, value] of Object.entries(selectedFilters)) {
        if (value && t[key as keyof TemplateData] !== value) return false;
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          t.shotSize.toLowerCase().includes(term) ||
          t.angle.toLowerCase().includes(term) ||
          t.character.toLowerCase().includes(term) ||
          t.action.toLowerCase().includes(term) ||
          t.filename.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [data, selectedFilters, searchTerm]);

  const handleFilterChange = useCallback((category: string, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category] === value) {
        delete newFilters[category];
      } else {
        newFilters[category] = value;
      }
      return newFilters;
    });
    setVisibleCount(48);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
    setSearchTerm('');
    setVisibleCount(48);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + 48);
  }, []);

  const getLabelForValue = (category: string, value: string): string => {
    switch (category) {
      case 'shotSize': return SHOT_SIZE_LABELS[value] || value;
      case 'angle': return ANGLE_LABELS[value] || value;
      case 'character': return CHARACTER_LABELS[value] || value;
      case 'action': return ACTION_LABELS[value] || value;
      default: return value;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
        <div className="text-white text-lg">레퍼런스 라이브러리 로딩중...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-white text-base md:text-xl font-bold whitespace-nowrap">레퍼런스 라이브러리</h2>
          {/* Tab Switcher */}
          <div className="flex bg-gray-800 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'templates' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              템플릿 {data ? `(${data.totalCount})` : ''}
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'portfolio' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              PEWPEW Studio ({PORTFOLIO_ITEMS.length})
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {activeTab === 'templates' && (
            <>
              <input
                type="text"
                placeholder="검색..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setVisibleCount(48); }}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-blue-500 w-32 md:w-48"
              />
              {Object.keys(selectedFilters).length > 0 && (
                <button onClick={clearFilters} className="text-sm text-blue-400 hover:text-blue-300 hidden md:block">
                  필터 초기화
                </button>
              )}
            </>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none px-2">
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'portfolio' ? (
        <PortfolioTab
          onSelectImage={onSelectPortfolioImage || ((url, info) => {
            if (onSelectImage) {
              // Wrap portfolio image as TemplateData-like object
              onSelectImage({
                id: 0, uuid: '', shotSize: '', angle: '', character: '', action: '',
                location: '', lighting: '', movement: '', filename: info.title,
                thumbnail: url, fullImage: url,
              });
            }
          })}
          onClose={onClose}
        />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Filters - Hidden on mobile */}
          <div className="hidden md:block w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 flex-shrink-0">
            {data && (['shotSize', 'angle', 'character', 'action'] as const).map(category => (
              <div key={category} className="mb-5">
                <h3 className="text-gray-300 text-sm font-semibold mb-2">
                  {FILTER_LABELS[category]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.filters[category].map(value => {
                    const isActive = selectedFilters[category] === value;
                    return (
                      <button
                        key={value}
                        onClick={() => handleFilterChange(category, value)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {getLabelForValue(category, value)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(selectedFilters).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-gray-300 text-sm font-semibold mb-2">적용된 필터</h3>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(selectedFilters).map(([cat, val]) => (
                    <span key={cat} className="inline-flex items-center gap-1 bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs">
                      {getLabelForValue(cat, val)}
                      <button onClick={() => handleFilterChange(cat, val)} className="hover:text-white">×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Filter Bar */}
          <div className="md:hidden">
            {data && (
              <div className="flex overflow-x-auto gap-1.5 px-3 py-2 border-b border-gray-700 bg-gray-900/50">
                {(['shotSize', 'angle', 'character', 'action'] as const).map(category => (
                  data.filters[category].slice(0, 4).map(value => {
                    const isActive = selectedFilters[category] === value;
                    return (
                      <button
                        key={`${category}-${value}`}
                        onClick={() => handleFilterChange(category, value)}
                        className={`px-2.5 py-1 rounded text-[10px] whitespace-nowrap transition-colors flex-shrink-0 ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        {getLabelForValue(category, value)}
                      </button>
                    );
                  })
                ))}
              </div>
            )}
          </div>

          {/* Image Grid */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            {filteredTemplates.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                조건에 맞는 레퍼런스가 없습니다
              </div>
            ) : (
              <>
                <div className="text-gray-500 text-xs mb-3 md:hidden">
                  {filteredTemplates.length}개 결과
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
                  {filteredTemplates.slice(0, visibleCount).map(template => (
                    <div
                      key={template.id}
                      className="group relative cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-blue-500 transition-all"
                      onClick={() => setSelectedImage(template)}
                    >
                      <div className="aspect-video relative">
                        <img
                          src={template.thumbnail}
                          alt={template.filename}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 text-xs">
                            클릭하여 확대
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5">
                        <div className="text-gray-400 text-[10px] truncate">
                          {template.shotSize} · {getLabelForValue('angle', template.angle)}
                        </div>
                        <div className="text-gray-500 text-[10px] truncate">
                          {getLabelForValue('character', template.character)} · {getLabelForValue('action', template.action)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {visibleCount < filteredTemplates.length && (
                  <div className="flex justify-center mt-6 mb-4">
                    <button onClick={loadMore} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-sm">
                      더 보기 ({filteredTemplates.length - visibleCount}개 남음)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedImage.fullImage} alt={selectedImage.filename} className="w-full" crossOrigin="anonymous" />
            </div>
            <div className="p-3 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <div className="text-white text-sm font-medium mb-1">
                  #{selectedImage.id} — {SHOT_SIZE_LABELS[selectedImage.shotSize] || selectedImage.shotSize}
                </div>
                <div className="text-gray-400 text-xs flex flex-wrap gap-1.5">
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{getLabelForValue('angle', selectedImage.angle)}</span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{getLabelForValue('character', selectedImage.character)}</span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{getLabelForValue('action', selectedImage.action)}</span>
                  {selectedImage.lighting && <span className="bg-gray-800 px-2 py-0.5 rounded">{selectedImage.lighting}</span>}
                  {selectedImage.movement && <span className="bg-gray-800 px-2 py-0.5 rounded">{selectedImage.movement}</span>}
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                {onSelectImage && (
                  <button
                    onClick={() => { onSelectImage(selectedImage); setSelectedImage(null); }}
                    className="flex-1 md:flex-initial px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-sm"
                  >
                    이 레퍼런스 사용
                  </button>
                )}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
