'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  PORTFOLIO_ITEMS, SITE_CATEGORIES, PRODUCT_TYPES, CONTENT_TYPES, PORTFOLIO_BRANDS,
  type PortfolioItem, type SiteCategory,
  getSiteCategoryForItem, filterByCategory, filterByProductType, filterByBrand, getWideOnly
} from '@/lib/portfolio-data';

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
  const [siteCategory, setSiteCategory] = useState<SiteCategory | 'ALL'>('ALL');
  const [productTypeFilter, setProductTypeFilter] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [showWideOnly, setShowWideOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [capturedFrames, setCapturedFrames] = useState<{ url: string; brand: string; title: string }[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filteredItems = useMemo(() => {
    let items = PORTFOLIO_ITEMS;
    if (siteCategory !== 'ALL') items = filterByCategory(items, siteCategory);
    if (productTypeFilter) items = filterByProductType(items, productTypeFilter);
    if (brandFilter) items = filterByBrand(items, brandFilter);
    if (showWideOnly) items = getWideOnly(items);
    return items;
  }, [siteCategory, productTypeFilter, brandFilter, showWideOnly]);

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
      title: selectedItem?.filename || '캡처된 프레임',
    }]);
  }, [selectedItem]);

  const handleSelectCaptured = (frame: { url: string; brand: string; title: string }) => {
    if (onSelectImage) {
      onSelectImage(frame.url, { brand: frame.brand, title: frame.title, category: 'portfolio' });
    }
  };

  const clearFilters = () => {
    setSiteCategory('ALL');
    setProductTypeFilter('');
    setBrandFilter('');
    setShowWideOnly(false);
    setVisibleCount(30);
  };

  const hasFilters = siteCategory !== 'ALL' || productTypeFilter || brandFilter || showWideOnly;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - Filters */}
      <div className="hidden md:flex w-56 lg:w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-3 flex-shrink-0 flex-col gap-4">
        {/* Site Category */}
        <div>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">카테고리</h3>
          <div className="flex flex-col gap-1">
            {SITE_CATEGORIES.map(cat => {
              const count = cat.value === 'ALL' ? PORTFOLIO_ITEMS.length : filterByCategory(PORTFOLIO_ITEMS, cat.value).length;
              return (
                <button
                  key={cat.value}
                  onClick={() => { setSiteCategory(cat.value); setVisibleCount(30); }}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center gap-2 ${
                    siteCategory === cat.value ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="ml-auto text-[10px] opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Type */}
        <div>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">제품 타입</h3>
          <div className="flex flex-wrap gap-1">
            {PRODUCT_TYPES.map(pt => (
              <button
                key={pt.value}
                onClick={() => { setProductTypeFilter(productTypeFilter === pt.value ? '' : pt.value); setVisibleCount(30); }}
                className={`px-2 py-1 rounded text-[10px] transition-colors ${
                  productTypeFilter === pt.value ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {pt.icon} {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">브랜드</h3>
          <select
            value={brandFilter}
            onChange={e => { setBrandFilter(e.target.value); setVisibleCount(30); }}
            className="w-full bg-gray-800 text-gray-300 text-xs rounded-lg px-2 py-1.5 border border-gray-700 focus:outline-none focus:border-orange-500"
          >
            <option value="">전체 브랜드</option>
            {PORTFOLIO_BRANDS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Wide Only Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showWideOnly}
            onChange={e => setShowWideOnly(e.target.checked)}
            className="accent-orange-500"
          />
          <span className="text-gray-300 text-xs">16:9 가로 영상만</span>
        </label>

        {hasFilters && (
          <button onClick={clearFilters} className="text-orange-400 text-xs hover:text-orange-300 transition">
            필터 초기화
          </button>
        )}

        {/* Captured Frames */}
        {capturedFrames.length > 0 && (
          <div className="border-t border-gray-700 pt-3">
            <h3 className="text-gray-300 text-xs font-semibold mb-2">캡처 ({capturedFrames.length})</h3>
            <div className="flex flex-col gap-2">
              {capturedFrames.map((frame, i) => (
                <div key={i} className="relative group">
                  <img src={frame.url} alt={`캡처 ${i + 1}`} className="w-full aspect-video object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-orange-500" onClick={() => handleSelectCaptured(frame)} />
                  <div className="absolute bottom-1 left-1 right-1 text-[9px] text-white bg-black/60 rounded px-1.5 py-0.5 truncate">{frame.brand}</div>
                  <button onClick={() => setCapturedFrames(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4">
        {/* Mobile Filter Bar */}
        <div className="md:hidden mb-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 pb-2">
            {SITE_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => { setSiteCategory(cat.value); setVisibleCount(30); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap flex-shrink-0 ${
                  siteCategory === cat.value ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {PRODUCT_TYPES.slice(0, 6).map(pt => (
              <button
                key={pt.value}
                onClick={() => setProductTypeFilter(productTypeFilter === pt.value ? '' : pt.value)}
                className={`px-2 py-1 rounded text-[10px] whitespace-nowrap flex-shrink-0 ${
                  productTypeFilter === pt.value ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-500'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {isCapturing ? (
          /* Video Player with Frame Capture */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-base md:text-lg font-bold">{selectedItem ? selectedItem.brand : '영상 프레임 캡처'}</h3>
                <p className="text-gray-400 text-xs md:text-sm">원하는 장면에서 일시정지 후 '프레임 캡처'를 눌러주세요</p>
              </div>
              <button onClick={() => setIsCapturing(false)} className="px-3 py-1.5 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600">← 목록</button>
            </div>

            <div className="bg-black rounded-xl overflow-hidden mb-4">
              <video ref={videoRef} src={videoUrl || selectedItem?.videoUrl} controls className="w-full aspect-video" crossOrigin="anonymous" playsInline />
            </div>

            <div className="flex items-center gap-2 md:gap-3 mb-6">
              <button onClick={captureFrame} className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-500 text-xs md:text-sm font-bold flex items-center justify-center gap-2">
                📸 프레임 캡처
              </button>
              <button onClick={() => { const v = videoRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 1/30); }} className="px-3 md:px-4 py-2.5 md:py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 text-xs md:text-sm">◀ 1프레임</button>
              <button onClick={() => { const v = videoRef.current; if (v) v.currentTime = v.currentTime + 1/30; }} className="px-3 md:px-4 py-2.5 md:py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 text-xs md:text-sm">1프레임 ▶</button>
            </div>

            {capturedFrames.length > 0 && (
              <div>
                <h4 className="text-white text-sm font-bold mb-3">캡처된 프레임들</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {capturedFrames.map((frame, i) => (
                    <div key={i} className="cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-orange-500 transition-all" onClick={() => handleSelectCaptured(frame)}>
                      <img src={frame.url} alt={`캡처 ${i + 1}`} className="w-full aspect-video object-cover" />
                      <div className="p-2 text-[10px] text-gray-400">{frame.brand} · 프레임 {i + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-yellow-500/70 text-xs">
                * CORS 정책으로 일부 영상의 프레임 캡처가 안 될 수 있습니다. 이 경우 스크린샷으로 이미지를 직접 업로드해주세요.
              </p>
            </div>
          </div>
        ) : (
          /* Portfolio Grid */
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">{filteredItems.length}개 영상</span>
              {hasFilters && <button onClick={clearFilters} className="md:hidden text-orange-400 text-xs">필터 초기화</button>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
              {filteredItems.slice(0, visibleCount).map(item => {
                const siteCat = getSiteCategoryForItem(item);
                const catInfo = SITE_CATEGORIES.find(c => c.value === siteCat);
                return (
                  <div
                    key={item.id}
                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-gray-800 hover:ring-2 hover:ring-orange-500 transition-all"
                    onClick={() => { setSelectedItem(item); setIsCapturing(true); }}
                  >
                    <div className="aspect-video relative bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.brand}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">▶ 영상 열기</span>
                      </div>
                      {item.isWide && (
                        <span className="absolute top-1 left-1 bg-orange-600/80 text-white text-[8px] px-1 py-0.5 rounded">16:9</span>
                      )}
                      {item.hasModel && (
                        <span className="absolute top-1 right-1 bg-blue-600/80 text-white text-[8px] px-1 py-0.5 rounded">모델</span>
                      )}
                    </div>
                    <div className="p-1.5 md:p-2">
                      <div className="text-white text-[11px] md:text-xs font-medium truncate">{item.brand}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[8px] md:text-[9px] bg-gray-700 text-gray-400 px-1 md:px-1.5 py-0.5 rounded">{catInfo?.label}</span>
                        {item.productType && (
                          <span className="text-[8px] md:text-[9px] bg-gray-700 text-gray-400 px-1 md:px-1.5 py-0.5 rounded truncate">
                            {PRODUCT_TYPES.find(pt => item.productType.includes(pt.value))?.label || item.productType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {visibleCount < filteredItems.length && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setVisibleCount(prev => prev + 30)}
                  className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 text-sm"
                >
                  더 보기 ({filteredItems.length - visibleCount}개 남음)
                </button>
              </div>
            )}
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
              PEWPEW Studio ({PORTFOLIO_ITEMS.length}개)
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
                  {(data.filters[category] || []).map(value => {
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
                  (data.filters[category] || []).slice(0, 4).map(value => {
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
