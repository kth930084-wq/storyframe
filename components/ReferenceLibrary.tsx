'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';

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

// Korean labels for shot sizes
const SHOT_SIZE_LABELS: Record<string, string> = {
  ECU: 'ECU (익스트림 클로즈업)',
  BCU: 'BCU (빅 클로즈업)',
  CU: 'CU (클로즈업)',
  MS: 'MS (미디엄 샷)',
  FS: 'FS (풀 샷)',
  WS: 'WS (와이드 샷)',
  ES: 'ES (익스트림 와이드)',
};

// Korean labels for angles
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
  neutral: '중립',
  conversation: '대화',
  dramatic: '드라마틱',
  eating: '식사',
  gesture: '제스처',
  'holding-product': '제품 들기',
  phone: '전화',
  presenting: '발표',
  'product-shot': '제품 샷',
  reacting: '리액션',
  sitting: '앉기',
  standing: '서기',
  talking: '말하기',
  walking: '걷기',
  working: '작업',
};

interface ReferenceLibraryProps {
  onSelectImage?: (template: TemplateData) => void;
  onClose?: () => void;
}

export default function ReferenceLibrary({ onSelectImage, onClose }: ReferenceLibraryProps) {
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

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
        <div className="text-white text-lg">데이터를 불러올 수 없습니다</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center gap-4">
          <h2 className="text-white text-xl font-bold">스토리보드 레퍼런스 라이브러리</h2>
          <span className="text-gray-400 text-sm">
            {filteredTemplates.length} / {data.totalCount}개
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setVisibleCount(48); }}
            className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-blue-500 w-48"
          />
          {Object.keys(selectedFilters).length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              필터 초기화
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl leading-none px-2"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 flex-shrink-0">
          {(['shotSize', 'angle', 'character', 'action'] as const).map(category => (
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
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {getLabelForValue(category, value)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Active Filters Summary */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="text-gray-300 text-sm font-semibold mb-2">적용된 필터</h3>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(selectedFilters).map(([cat, val]) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs"
                  >
                    {getLabelForValue(cat, val)}
                    <button
                      onClick={() => handleFilterChange(cat, val)}
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredTemplates.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              조건에 맞는 레퍼런스가 없습니다
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
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
                  <button
                    onClick={loadMore}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-sm"
                  >
                    더 보기 ({filteredTemplates.length - visibleCount}개 남음)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.fullImage}
                alt={selectedImage.filename}
                className="w-full"
                crossOrigin="anonymous"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-medium mb-1">
                  #{selectedImage.id} — {SHOT_SIZE_LABELS[selectedImage.shotSize] || selectedImage.shotSize}
                </div>
                <div className="text-gray-400 text-xs flex flex-wrap gap-2">
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{getLabelForValue('angle', selectedImage.angle)}</span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{getLabelForValue('character', selectedImage.character)}</span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{getLabelForValue('action', selectedImage.action)}</span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{selectedImage.lighting}</span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded">{selectedImage.movement}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {onSelectImage && (
                  <button
                    onClick={() => {
                      onSelectImage(selectedImage);
                      setSelectedImage(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-sm"
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
