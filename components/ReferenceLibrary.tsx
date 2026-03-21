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

export interface CapturedFrame {
  url: string;
  brand: string;
  title: string;
}

interface ReferenceLibraryProps {
  onSelectImage?: (template: TemplateData) => void;
  onSelectPortfolioImage?: (imageUrl: string, info: { brand: string; title: string; category: string }) => void;
  onClose?: () => void;
  capturedFrames?: CapturedFrame[];
  onCapturedFramesChange?: (frames: CapturedFrame[]) => void;
}

// ===== CAPTURED FRAMES SLIDE BAR (상단 슬라이드) =====
function CapturedFramesBar({
  frames,
  onFramesChange,
  onSelectFrame,
}: {
  frames: CapturedFrame[];
  onFramesChange: (frames: CapturedFrame[]) => void;
  onSelectFrame: (frame: CapturedFrame) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (frames.length === 0) return null;

  return (
    <div className="bg-md-surface-container-low/95 border-b border-orange-800/40 px-4 py-2.5 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-orange-400 text-xs font-bold">📸 캡처 보관함</span>
          <span className="text-orange-300/60 text-[10px]">{frames.length}컷</span>
          <button
            onClick={() => onFramesChange([])}
            className="text-md-light-on-surface-variant hover:text-red-400 text-[10px] ml-1 transition-colors"
          >
            전체삭제
          </button>
        </div>
        <div className="w-px h-6 bg-md-surface-container-high flex-shrink-0" />
        <div ref={scrollRef} className="flex-1 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {frames.map((frame, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden bg-md-surface-container hover:ring-2 hover:ring-orange-500 transition-all"
                style={{ width: 120 }}
              >
                <img
                  src={frame.url}
                  alt={`캡처 ${i + 1}`}
                  className="w-full aspect-video object-cover"
                  onClick={() => onSelectFrame(frame)}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-[9px] font-bold bg-orange-600 px-2 py-0.5 rounded">
                    씬에 적용
                  </span>
                </div>
                <div className="absolute top-0.5 left-1 text-white text-[8px] font-bold bg-black/50 px-1 rounded">
                  #{i + 1}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFramesChange(frames.filter((_, idx) => idx !== i));
                  }}
                  className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600/80 text-white rounded-full text-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-1 py-0.5">
                  <span className="text-white text-[8px] truncate block">{frame.brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <span className="text-md-light-on-surface-variant text-[9px] flex-shrink-0 hidden md:block">클릭 → 현재 씬에 적용</span>
      </div>
    </div>
  );
}

// ===== VIDEO CAPTURE MODAL (전체화면 오버레이) =====
function VideoCaptureModal({
  item,
  onClose,
  onCapture,
}: {
  item: PortfolioItem;
  onClose: () => void;
  onCapture: (frame: CapturedFrame) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captureSuccess, setCaptureSuccess] = useState(false);
  const [captureCount, setCaptureCount] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const doCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    onCapture({
      url: dataUrl,
      brand: item.brand,
      title: item.filename || '캡처된 프레임',
    });
    setCaptureCount(prev => prev + 1);
    setCaptureSuccess(true);
    setTimeout(() => setCaptureSuccess(false), 600);
  }, [item, onCapture]);

  // 키보드 단축키
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'KeyC' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        doCapture();
      }
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [doCapture, onClose]);

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-md-surface-container-low/80 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h3 className="text-white text-sm font-bold">{item.brand}</h3>
          <span className="text-md-light-outline-variant text-xs">{item.duration} · {item.title}</span>
          {captureCount > 0 && (
            <span className="bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {captureCount}컷 캡처됨
            </span>
          )}
        </div>
        <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-500 transition-colors shadow-lg">
          ← 영상 목록으로 돌아가기
          <span className="text-orange-200 text-[10px] font-normal">(ESC)</span>
        </button>
      </div>

      {/* Video + Controls */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Usage hint (first time) */}
        {captureCount === 0 && (
          <div className="mb-3 px-4 py-2 bg-orange-950/40 rounded-xl border border-orange-800/30 max-w-2xl w-full">
            <p className="text-orange-200/80 text-[11px] text-center">
              영상을 재생하다가 원하는 장면에서 <strong className="text-orange-300">일시정지</strong> → 아래 <strong className="text-orange-300">캡처 버튼</strong> 또는 <strong className="text-orange-300">C키</strong> · 여러 장면을 캡처하면 상단 보관함에 저장됩니다
            </p>
          </div>
        )}

        {/* Video */}
        <div className={`relative rounded-xl overflow-hidden max-w-4xl w-full ${captureSuccess ? 'ring-4 ring-green-500' : ''} transition-all duration-200`}>
          <video
            ref={videoRef}
            src={item.videoUrl}
            controls
            autoPlay
            className="w-full aspect-video bg-black"
            crossOrigin="anonymous"
            playsInline
            onError={() => setVideoError(true)}
          />
          {videoError && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
              <span className="text-red-400 text-lg mb-2">영상을 재생할 수 없습니다</span>
              <span className="text-md-light-on-surface-variant text-xs">이 영상 파일에 접근할 수 없어요</span>
              <button onClick={onClose} className="mt-3 px-4 py-2 bg-md-surface-container-high text-white rounded-lg text-sm hover:bg-md-surface-bright">
                돌아가기
              </button>
            </div>
          )}
          {captureSuccess && (
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center pointer-events-none">
              <span className="text-white text-xl font-bold drop-shadow-lg">📸 캡처!</span>
            </div>
          )}
        </div>

        {/* Capture Controls */}
        <div className="flex items-center gap-2 mt-3 max-w-4xl w-full">
          <button
            onClick={() => { const v = videoRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 5); }}
            className="px-3 py-2.5 bg-md-surface-container text-md-on-surface-variant rounded-xl hover:bg-md-surface-container-high text-xs"
          >
            ⏪ 5초
          </button>
          <button
            onClick={() => { const v = videoRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 1/30); }}
            className="px-3 py-2.5 bg-md-surface-container text-md-on-surface-variant rounded-xl hover:bg-md-surface-container-high text-xs"
          >
            ◀ 1프레임
          </button>
          <button
            onClick={doCapture}
            className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-500 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
          >
            📸 프레임 캡처 <span className="text-orange-200 text-[10px] font-normal">(C키)</span>
          </button>
          <button
            onClick={() => { const v = videoRef.current; if (v) v.currentTime = v.currentTime + 1/30; }}
            className="px-3 py-2.5 bg-md-surface-container text-md-on-surface-variant rounded-xl hover:bg-md-surface-container-high text-xs"
          >
            1프레임 ▶
          </button>
          <button
            onClick={() => { const v = videoRef.current; if (v) v.currentTime = v.currentTime + 5; }}
            className="px-3 py-2.5 bg-md-surface-container text-md-on-surface-variant rounded-xl hover:bg-md-surface-container-high text-xs"
          >
            5초 ⏩
          </button>
        </div>

        {/* CORS Note */}
        <p className="text-md-light-on-surface-variant text-[9px] mt-2 max-w-4xl text-center">
          💡 일부 영상은 보안 정책(CORS)으로 캡처가 안 될 수 있어요. 그럴 때는 스크린샷(Cmd+Shift+4)으로 캡처해주세요.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// ===== PEWPEW PORTFOLIO TAB =====
function PortfolioTab({
  onSelectImage,
  capturedFrames,
  onCapturedFramesChange,
}: {
  onSelectImage?: ReferenceLibraryProps['onSelectPortfolioImage'];
  capturedFrames: CapturedFrame[];
  onCapturedFramesChange: (frames: CapturedFrame[]) => void;
}) {
  const [siteCategory, setSiteCategory] = useState<SiteCategory | 'ALL'>('ALL');
  const [productTypeFilter, setProductTypeFilter] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [showWideOnly, setShowWideOnly] = useState(false);
  const [captureItem, setCaptureItem] = useState<PortfolioItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(30);
  const [thumbErrors, setThumbErrors] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    let items = PORTFOLIO_ITEMS;
    if (siteCategory !== 'ALL') items = filterByCategory(items, siteCategory);
    if (productTypeFilter) items = filterByProductType(items, productTypeFilter);
    if (brandFilter) items = filterByBrand(items, brandFilter);
    if (showWideOnly) items = getWideOnly(items);
    // 썸네일 로드 실패한 영상은 숨기기 (재생도 안 될 가능성 높음)
    items = items.filter(item => !thumbErrors.has(item.id));
    return items;
  }, [siteCategory, productTypeFilter, brandFilter, showWideOnly, thumbErrors]);

  const clearFilters = () => {
    setSiteCategory('ALL');
    setProductTypeFilter('');
    setBrandFilter('');
    setShowWideOnly(false);
    setVisibleCount(30);
  };

  const hasFilters = siteCategory !== 'ALL' || productTypeFilter || brandFilter || showWideOnly;

  const handleThumbError = (id: string) => {
    setThumbErrors(prev => new Set(prev).add(id));
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - Filters */}
      <div className="hidden md:flex w-56 lg:w-64 bg-md-surface-container-low border-r border-white/5 overflow-y-auto p-3 flex-shrink-0 flex-col gap-4">
        {/* Site Category */}
        <div>
          <h3 className="text-md-light-outline-variant text-[10px] font-bold uppercase tracking-wider mb-2">카테고리</h3>
          <div className="flex flex-col gap-1">
            {SITE_CATEGORIES.map(cat => {
              const count = cat.value === 'ALL' ? PORTFOLIO_ITEMS.length : filterByCategory(PORTFOLIO_ITEMS, cat.value).length;
              return (
                <button
                  key={cat.value}
                  onClick={() => { setSiteCategory(cat.value); setVisibleCount(30); }}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center gap-2 ${
                    siteCategory === cat.value ? 'bg-orange-600 text-white' : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-container-high'
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
          <h3 className="text-md-light-outline-variant text-[10px] font-bold uppercase tracking-wider mb-2">제품 타입</h3>
          <div className="flex flex-wrap gap-1">
            {PRODUCT_TYPES.map(pt => (
              <button
                key={pt.value}
                onClick={() => { setProductTypeFilter(productTypeFilter === pt.value ? '' : pt.value); setVisibleCount(30); }}
                className={`px-2 py-1 rounded text-[10px] transition-colors ${
                  productTypeFilter === pt.value ? 'bg-orange-600 text-white' : 'bg-md-surface-container text-md-light-outline-variant hover:bg-md-surface-container-high'
                }`}
              >
                {pt.icon} {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="text-md-light-outline-variant text-[10px] font-bold uppercase tracking-wider mb-2">브랜드</h3>
          <select
            value={brandFilter}
            onChange={e => { setBrandFilter(e.target.value); setVisibleCount(30); }}
            className="w-full bg-md-surface-container text-md-on-surface-variant text-xs rounded-lg px-2 py-1.5 border border-white/5 focus:outline-none focus:border-orange-500"
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
          <span className="text-md-on-surface-variant text-xs">16:9 가로 영상만</span>
        </label>

        {hasFilters && (
          <button onClick={clearFilters} className="text-orange-400 text-xs hover:text-orange-300 transition">
            필터 초기화
          </button>
        )}
      </div>

      {/* Main Content - Portfolio Grid */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4">
        {/* Mobile Filter Bar */}
        <div className="md:hidden mb-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 pb-2">
            {SITE_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => { setSiteCategory(cat.value); setVisibleCount(30); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap flex-shrink-0 ${
                  siteCategory === cat.value ? 'bg-orange-600 text-white' : 'bg-md-surface-container text-md-light-outline-variant'
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
                  productTypeFilter === pt.value ? 'bg-orange-600 text-white' : 'bg-md-surface-container text-md-light-on-surface-variant'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-md-light-outline-variant text-xs">{filteredItems.length}개 영상</span>
          {hasFilters && <button onClick={clearFilters} className="md:hidden text-orange-400 text-xs">필터 초기화</button>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
          {filteredItems.slice(0, visibleCount).map(item => {
            const siteCat = getSiteCategoryForItem(item);
            const catInfo = SITE_CATEGORIES.find(c => c.value === siteCat);
            const hasThumbError = thumbErrors.has(item.id);
            return (
              <div
                key={item.id}
                className="group relative cursor-pointer rounded-xl overflow-hidden bg-md-surface-container hover:ring-2 hover:ring-orange-500 transition-all"
                onClick={() => setCaptureItem(item)}
              >
                <div className="aspect-video relative bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  {!hasThumbError ? (
                    <img
                      src={item.thumbnail}
                      alt={item.brand}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleThumbError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-md-light-on-surface-variant">
                      <span className="text-2xl mb-1">🎬</span>
                      <span className="text-[9px]">{item.brand}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">▶ 장면 캡처</span>
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
                    <span className="text-[8px] md:text-[9px] bg-md-surface-container-high text-md-light-outline-variant px-1 md:px-1.5 py-0.5 rounded">{catInfo?.label}</span>
                    {item.productType && (
                      <span className="text-[8px] md:text-[9px] bg-md-surface-container-high text-md-light-outline-variant px-1 md:px-1.5 py-0.5 rounded truncate">
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
              className="px-6 py-2.5 bg-md-surface-container text-md-on-surface-variant rounded-xl hover:bg-md-surface-container-high text-sm"
            >
              더 보기 ({filteredItems.length - visibleCount}개 남음)
            </button>
          </div>
        )}
      </div>

      {/* Video Capture Modal - 전체화면 오버레이 */}
      {captureItem && (
        <VideoCaptureModal
          item={captureItem}
          onClose={() => setCaptureItem(null)}
          onCapture={(frame) => onCapturedFramesChange([...capturedFrames, frame])}
        />
      )}
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function ReferenceLibrary({
  onSelectImage,
  onSelectPortfolioImage,
  onClose,
  capturedFrames: externalFrames,
  onCapturedFramesChange: externalOnChange,
}: ReferenceLibraryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('templates');
  const [data, setData] = useState<TemplatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<TemplateData | null>(null);
  const [visibleCount, setVisibleCount] = useState(48);
  const [searchTerm, setSearchTerm] = useState('');

  // 캡처 프레임: 외부 prop 사용 가능, 없으면 내부 state
  const [internalFrames, setInternalFrames] = useState<CapturedFrame[]>([]);
  const capturedFrames = externalFrames ?? internalFrames;
  const setCapturedFrames = externalOnChange ?? setInternalFrames;

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

  const handleSelectCapturedFrame = (frame: CapturedFrame) => {
    if (onSelectPortfolioImage) {
      onSelectPortfolioImage(frame.url, { brand: frame.brand, title: frame.title, category: 'portfolio' });
    } else if (onSelectImage) {
      onSelectImage({
        id: 0, uuid: '', shotSize: '', angle: '', character: '', action: '',
        location: '', lighting: '', movement: '', filename: frame.title,
        thumbnail: frame.url, fullImage: frame.url,
      });
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
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 bg-md-surface-container-low flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-white text-base md:text-xl font-bold whitespace-nowrap">레퍼런스 라이브러리</h2>
          {/* Tab Switcher */}
          <div className="flex bg-md-surface-container rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'templates' ? 'bg-blue-600 text-white' : 'text-md-light-outline-variant hover:text-white'
              }`}
            >
              스토리보드 템플릿
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'portfolio' ? 'bg-orange-600 text-white' : 'text-md-light-outline-variant hover:text-white'
              }`}
            >
              PEWPEW 영상 캡처
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
                className="bg-md-surface-container text-white px-3 py-1.5 rounded-lg text-sm border border-white/10 focus:outline-none focus:border-blue-500 w-32 md:w-48"
              />
              {Object.keys(selectedFilters).length > 0 && (
                <button onClick={clearFilters} className="text-sm text-blue-400 hover:text-blue-300 hidden md:block">
                  필터 초기화
                </button>
              )}
            </>
          )}
          {onClose && (
            <button onClick={onClose} className="flex items-center gap-1.5 px-3 py-1.5 bg-md-surface-container-high text-white rounded-lg text-xs font-medium hover:bg-md-surface-bright transition-colors">
              ← 편집기로 돌아가기
            </button>
          )}
        </div>
      </div>

      {/* Captured Frames Slide Bar - 상단에 항상 표시 */}
      <CapturedFramesBar
        frames={capturedFrames}
        onFramesChange={setCapturedFrames}
        onSelectFrame={handleSelectCapturedFrame}
      />

      {/* Tab Content */}
      {activeTab === 'portfolio' ? (
        <PortfolioTab
          onSelectImage={onSelectPortfolioImage || ((url, info) => {
            if (onSelectImage) {
              onSelectImage({
                id: 0, uuid: '', shotSize: '', angle: '', character: '', action: '',
                location: '', lighting: '', movement: '', filename: info.title,
                thumbnail: url, fullImage: url,
              });
            }
          })}
          capturedFrames={capturedFrames}
          onCapturedFramesChange={setCapturedFrames}
        />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Filters - Hidden on mobile */}
          <div className="hidden md:block w-64 bg-md-surface-container-low border-r border-white/5 overflow-y-auto p-4 flex-shrink-0">
            {data && (['shotSize', 'angle', 'character', 'action'] as const).map(category => (
              <div key={category} className="mb-5">
                <h3 className="text-md-on-surface-variant text-sm font-semibold mb-2">
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
                          isActive ? 'bg-blue-600 text-white' : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-container-high'
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
              <div className="mt-4 pt-4 border-t border-white/5">
                <h3 className="text-md-on-surface-variant text-sm font-semibold mb-2">적용된 필터</h3>
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
              <div className="flex overflow-x-auto gap-1.5 px-3 py-2 border-b border-white/5 bg-md-surface-container-low/50">
                {(['shotSize', 'angle', 'character', 'action'] as const).map(category => (
                  (data.filters[category] || []).slice(0, 4).map(value => {
                    const isActive = selectedFilters[category] === value;
                    return (
                      <button
                        key={`${category}-${value}`}
                        onClick={() => handleFilterChange(category, value)}
                        className={`px-2.5 py-1 rounded text-[10px] whitespace-nowrap transition-colors flex-shrink-0 ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-md-surface-container text-md-light-outline-variant'
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
              <div className="flex items-center justify-center h-full text-md-light-on-surface-variant">
                조건에 맞는 레퍼런스가 없습니다
              </div>
            ) : (
              <>
                <div className="text-md-light-on-surface-variant text-xs mb-3 md:hidden">
                  {filteredTemplates.length}개 결과
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
                  {filteredTemplates.slice(0, visibleCount).map(template => (
                    <div
                      key={template.id}
                      className="group relative cursor-pointer rounded-lg overflow-hidden bg-md-surface-container hover:ring-2 hover:ring-blue-500 transition-all"
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
                        <div className="text-md-light-outline-variant text-[10px] truncate">
                          {template.shotSize} · {getLabelForValue('angle', template.angle)}
                        </div>
                        <div className="text-md-light-on-surface-variant text-[10px] truncate">
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
            className="bg-md-surface-container-low rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
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
                <div className="text-md-light-outline-variant text-xs flex flex-wrap gap-1.5">
                  <span className="bg-md-surface-container px-2 py-0.5 rounded">{getLabelForValue('angle', selectedImage.angle)}</span>
                  <span className="bg-md-surface-container px-2 py-0.5 rounded">{getLabelForValue('character', selectedImage.character)}</span>
                  <span className="bg-md-surface-container px-2 py-0.5 rounded">{getLabelForValue('action', selectedImage.action)}</span>
                  {selectedImage.lighting && <span className="bg-md-surface-container px-2 py-0.5 rounded">{selectedImage.lighting}</span>}
                  {selectedImage.movement && <span className="bg-md-surface-container px-2 py-0.5 rounded">{selectedImage.movement}</span>}
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
                  className="px-4 py-2 bg-md-surface-container-high text-white rounded-lg hover:bg-md-surface-bright text-sm"
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
