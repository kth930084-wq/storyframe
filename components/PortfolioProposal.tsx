'use client';

import React, { useState, useMemo } from 'react';
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORIES,
  CONTENT_TYPES,
  PLATFORM_OPTIONS,
  TONE_OPTIONS,
  BUDGET_RANGES,
  createEmptyProposal,
  type PortfolioItem,
  type ProposalData,
} from '@/lib/portfolio-data';
import {
  Search,
  Filter,
  Check,
  ChevronRight,
  ChevronLeft,
  Star,
  Film,
  Mail,
  Download,
  ArrowRight,
  X,
  Plus,
  Eye,
  Calendar,
  DollarSign,
  User,
  Building,
  Phone,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5;

interface PortfolioProposalBuilderProps {
  darkMode: boolean;
  userEmail?: string;
  onCreateProject?: (projectData: any) => void;
}

const colorPalettes: Record<string, string> = {
  '화이트': 'from-gray-50 to-gray-100',
  '핑크': 'from-pink-200 to-pink-300',
  '블루': 'from-blue-200 to-blue-300',
  '골드': 'from-yellow-200 to-yellow-300',
  '블랙': 'from-gray-700 to-gray-900',
  '레드': 'from-red-200 to-red-300',
  '오렌지': 'from-orange-200 to-orange-300',
  '그린': 'from-green-200 to-green-300',
  '베이지': 'from-amber-100 to-amber-200',
  '우드': 'from-yellow-700 to-yellow-800',
  '그레이': 'from-gray-400 to-gray-500',
  '옐로우': 'from-yellow-200 to-yellow-300',
};

const BgColor = ({ darkMode }: { darkMode: boolean }) => (
  <div
    className={`fixed inset-0 -z-10 ${
      darkMode ? 'bg-gray-950' : 'bg-white'
    } transition-colors duration-300`}
  />
);

const StepIndicator = ({ current, total, darkMode }: { current: number; total: number; darkMode: boolean }) => (
  <div className="flex items-center justify-center gap-3 mb-8">
    {Array.from({ length: total }).map((_, i) => {
      const stepNum = i + 1;
      const isActive = stepNum === current;
      const isComplete = stepNum < current;
      return (
        <React.Fragment key={stepNum}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
              isComplete
                ? `${darkMode ? 'bg-gray-700' : 'bg-gray-300'} ${darkMode ? 'text-gray-100' : 'text-gray-900'}`
                : isActive
                ? `${darkMode ? 'bg-gray-600 ring-2 ring-gray-400' : 'bg-gray-900 text-white'}`
                : `${darkMode ? 'bg-gray-800' : 'bg-gray-200'} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`
            }`}
          >
            {isComplete ? <Check size={20} /> : stepNum}
          </div>
          {i < total - 1 && (
            <div
              className={`h-1 w-6 ${
                isComplete ? (darkMode ? 'bg-gray-700' : 'bg-gray-300') : darkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const PortfolioGrid = ({
  items,
  selected,
  onSelect,
  darkMode,
}: {
  items: PortfolioItem[];
  selected: string[];
  onSelect: (id: string) => void;
  darkMode: boolean;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {items.map((item) => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`group relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
          selected.includes(item.id)
            ? `ring-3 ${darkMode ? 'ring-gray-400' : 'ring-gray-800'}`
            : `hover:shadow-lg ${darkMode ? 'hover:shadow-gray-800' : 'hover:shadow-gray-300'}`
        }`}
      >
        <div
          className={`bg-gradient-to-br ${colorPalettes[item.color] || 'from-gray-200 to-gray-300'} aspect-video relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {selected.includes(item.id) && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className={`w-12 h-12 ${darkMode ? 'bg-gray-200' : 'bg-gray-900'} rounded-full flex items-center justify-center`}>
                <Check size={24} className={darkMode ? 'text-gray-900' : 'text-white'} />
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Star
              size={20}
              className={selected.includes(item.id) ? (darkMode ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-300 text-yellow-300') : 'text-gray-500'}
            />
          </div>
        </div>
        <div className={`p-3 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
            {item.brand}
          </p>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'} line-clamp-2 mb-2`}>
            {item.title}
          </p>
          <div className="flex flex-wrap gap-1">
            <span
              className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {PORTFOLIO_CATEGORIES.find((c) => c.value === item.category)?.label}
            </span>
            <span
              className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {CONTENT_TYPES.find((ct) => ct.value === item.contentType)?.label}
            </span>
          </div>
        </div>
      </button>
    ))}
  </div>
);

const Step1Browse = ({
  darkMode,
  selected,
  onSelect,
  onNext,
}: {
  darkMode: boolean;
  selected: string[];
  onSelect: (id: string) => void;
  onNext: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter((item) => {
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === null || item.category === selectedCategory;
      const matchesContentType = selectedContentType === null || item.contentType === selectedContentType;
      const matchesTone = selectedTone === null || item.tone.feel === selectedTone;
      return matchesSearch && matchesCategory && matchesContentType && matchesTone;
    });
  }, [searchTerm, selectedCategory, selectedContentType, selectedTone]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          포트폴리오 둘러보기
        </h2>
        <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          PEWPEW Studio의 이전 작업물들을 둘러보고 참고 영상을 선택해주세요. (최소 1개)
        </p>
      </div>

      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <Search size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
        <input
          type="text"
          placeholder="브랜드, 제목, 또는 태그로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 bg-transparent outline-none text-base ${darkMode ? 'text-gray-100 placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>필터</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === null
                    ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                    : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                }`}
              >
                전체
              </button>
              {PORTFOLIO_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === cat.value
                      ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                      : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>
              콘텐츠 유형
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedContentType(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedContentType === null
                    ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                    : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                }`}
              >
                전체
              </button>
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedContentType(type.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedContentType === type.value
                      ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                      : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>
              감성
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTone(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedTone === null
                    ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                    : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                }`}
              >
                전체
              </button>
              {TONE_OPTIONS.feel.map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedTone === tone
                      ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                      : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
        <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {filteredItems.length}개 영상 중 {selected.length}개 선택됨
        </span>
        {selected.length > 0 && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
              darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {selected.length}
          </span>
        )}
      </div>

      <PortfolioGrid items={filteredItems} selected={selected} onSelect={onSelect} darkMode={darkMode} />

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            selected.length === 0
              ? `${darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`
              : `${darkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`
          }`}
        >
          다음 <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Step2ProjectInfo = ({
  darkMode,
  proposal,
  onUpdate,
  selectedPortfolios,
  onPrev,
  onNext,
}: {
  darkMode: boolean;
  proposal: ProposalData;
  onUpdate: (data: Partial<ProposalData>) => void;
  selectedPortfolios: PortfolioItem[];
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          프로젝트 정보
        </h2>
        <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          기획하실 영상 프로젝트의 기본 정보를 입력해주세요.
        </p>
      </div>

      {selectedPortfolios.length > 0 && (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
          <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            선택한 참고 영상 ({selectedPortfolios.length}개)
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {selectedPortfolios.map((item) => (
              <div
                key={item.id}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br ${colorPalettes[item.color]} border-2 ${
                  darkMode ? 'border-gray-700' : 'border-gray-300'
                }`}
                title={item.title}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            프로젝트 제목
          </label>
          <input
            type="text"
            value={proposal.projectTitle}
            onChange={(e) => onUpdate({ projectTitle: e.target.value })}
            placeholder="예: 새로운 스킨케어 라인 제품 영상"
            className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
              darkMode
                ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            프로젝트 설명
          </label>
          <textarea
            value={proposal.projectDescription}
            onChange={(e) => onUpdate({ projectDescription: e.target.value })}
            placeholder="프로젝트의 목표, 메시지, 또는 추가 정보를 입력하세요..."
            rows={4}
            className={`w-full px-4 py-3 rounded-lg outline-none text-base resize-none transition ${
              darkMode
                ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              카테고리
            </label>
            <select
              value={proposal.category}
              onChange={(e) => onUpdate({ category: (e.target.value as any) || '' })}
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-gray-600'
              }`}
            >
              <option value="">선택하세요</option>
              {PORTFOLIO_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              콘텐츠 유형
            </label>
            <select
              value={proposal.contentType}
              onChange={(e) => onUpdate({ contentType: (e.target.value as any) || '' })}
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-gray-600'
              }`}
            >
              <option value="">선택하세요</option>
              {CONTENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            게재 플랫폼
          </label>
          <div className="flex flex-wrap gap-3">
            {PLATFORM_OPTIONS.map((platform) => (
              <label key={platform} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={proposal.platforms.includes(platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onUpdate({ platforms: [...proposal.platforms, platform] });
                    } else {
                      onUpdate({ platforms: proposal.platforms.filter((p) => p !== platform) });
                    }
                  }}
                  className={`w-4 h-4 rounded cursor-pointer ${
                    darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
                  }`}
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            영상 톤 - 온도감
          </label>
          <div className="flex gap-3 flex-wrap">
            {TONE_OPTIONS.temp.map((temp) => (
              <button
                key={temp}
                onClick={() => onUpdate({ tonePref: { ...proposal.tonePref, temp } })}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  proposal.tonePref.temp === temp
                    ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                    : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                }`}
              >
                {temp}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            영상 톤 - 감성
          </label>
          <div className="flex gap-3 flex-wrap">
            {TONE_OPTIONS.feel.map((feel) => (
              <button
                key={feel}
                onClick={() => onUpdate({ tonePref: { ...proposal.tonePref, feel } })}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  proposal.tonePref.feel === feel
                    ? `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'}`
                    : `${darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
                }`}
              >
                {feel}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`flex items-center gap-3 cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                checked={proposal.hasModel}
                onChange={(e) => onUpdate({ hasModel: e.target.checked })}
                className={`w-4 h-4 rounded cursor-pointer ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
                }`}
              />
              <span className="font-medium">모델 촬영 포함</span>
            </label>
          </div>

          <div>
            <label className={`flex items-center gap-3 cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                checked={proposal.hasTypo}
                onChange={(e) => onUpdate({ hasTypo: e.target.checked })}
                className={`w-4 h-4 rounded cursor-pointer ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
                }`}
              />
              <span className="font-medium">타이포그래피 필요</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800'
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={20} /> 이전
        </button>
        <button
          onClick={onNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          다음 <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Step3ReferenceNotes = ({
  darkMode,
  proposal,
  onUpdate,
  selectedPortfolios,
  onPrev,
  onNext,
}: {
  darkMode: boolean;
  proposal: ProposalData;
  onUpdate: (data: Partial<ProposalData>) => void;
  selectedPortfolios: PortfolioItem[];
  onPrev: () => void;
  onNext: () => void;
}) => {
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          레퍼런스 노트
        </h2>
        <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          선택한 영상들의 어떤 부분이 마음에 들었는지 구체적으로 적어주세요.
        </p>
      </div>

      <div className="space-y-6">
        {selectedPortfolios.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex gap-4 mb-4">
              <div
                className={`flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br ${colorPalettes[item.color]}`}
              />
              <div className="flex-1">
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  {item.brand}
                </p>
                <p className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {item.title}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'} mt-1`}>
                  {item.description}
                </p>
              </div>
            </div>
            <textarea
              value={itemNotes[item.id] || ''}
              onChange={(e) => setItemNotes({ ...itemNotes, [item.id]: e.target.value })}
              placeholder="예: 조명이 아름다워요, 색감 표현이 좋아요, 빠른 편집 속도가 마음에 들어요..."
              rows={3}
              className={`w-full px-4 py-3 rounded-lg outline-none text-base resize-none transition ${
                darkMode
                  ? 'bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
              }`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          일반 참고사항
        </label>
        <textarea
          value={proposal.referenceNotes}
          onChange={(e) => onUpdate({ referenceNotes: e.target.value })}
          placeholder="위의 영상들을 종합했을 때 원하는 영상의 스타일, 분위기, 또는 추가 요청사항을 자유롭게 작성해주세요."
          rows={5}
          className={`w-full px-4 py-3 rounded-lg outline-none text-base resize-none transition ${
            darkMode
              ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
              : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
          }`}
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800'
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={20} /> 이전
        </button>
        <button
          onClick={onNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          다음 <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Step4Schedule = ({
  darkMode,
  proposal,
  onUpdate,
  onPrev,
  onNext,
}: {
  darkMode: boolean;
  proposal: ProposalData;
  onUpdate: (data: Partial<ProposalData>) => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          일정 & 예산
        </h2>
        <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          프로젝트의 최종 정보를 입력해주세요.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <User size={16} /> 클라이언트 이름
            </label>
            <input
              type="text"
              value={proposal.clientName}
              onChange={(e) => onUpdate({ clientName: e.target.value })}
              placeholder="예: 김OO"
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
              }`}
            />
          </div>

          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Building size={16} /> 회사/브랜드명
            </label>
            <input
              type="text"
              value={proposal.clientCompany}
              onChange={(e) => onUpdate({ clientCompany: e.target.value })}
              placeholder="예: ACME 화장품"
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Mail size={16} /> 이메일
            </label>
            <input
              type="email"
              value={proposal.clientEmail}
              onChange={(e) => onUpdate({ clientEmail: e.target.value })}
              placeholder="예: client@example.com"
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
              }`}
            />
          </div>

          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Phone size={16} /> 연락처
            </label>
            <input
              type="tel"
              value={proposal.clientPhone}
              onChange={(e) => onUpdate({ clientPhone: e.target.value })}
              placeholder="예: 010-1234-5678"
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Calendar size={16} /> 희망 촬영일
            </label>
            <input
              type="date"
              value={proposal.desiredDate}
              onChange={(e) => onUpdate({ desiredDate: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-gray-600'
              }`}
            />
          </div>

          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Calendar size={16} /> 납품 기한
            </label>
            <input
              type="date"
              value={proposal.deadline}
              onChange={(e) => onUpdate({ deadline: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
                darkMode
                  ? 'bg-gray-900 border border-gray-800 text-gray-100 focus:border-gray-600'
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-gray-600'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <DollarSign size={16} /> 예산 범위
          </label>
          <select
            value={proposal.budget}
            onChange={(e) => onUpdate({ budget: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg outline-none text-base transition ${
              darkMode
                ? 'bg-gray-900 border border-gray-800 text-gray-100 focus:border-gray-600'
                : 'bg-white border border-gray-300 text-gray-900 focus:border-gray-600'
            }`}
          >
            <option value="">선택하세요</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            추가 요청사항
          </label>
          <textarea
            value={proposal.additionalNotes}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value })}
            placeholder="영상 제작 시 특별히 고려해야 할 사항이 있다면 입력해주세요..."
            rows={4}
            className={`w-full px-4 py-3 rounded-lg outline-none text-base resize-none transition ${
              darkMode
                ? 'bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-600'
            }`}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800'
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={20} /> 이전
        </button>
        <button
          onClick={onNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          다음 <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Step5Preview = ({
  darkMode,
  proposal,
  selectedPortfolios,
  onPrev,
  onCreateProject,
}: {
  darkMode: boolean;
  proposal: ProposalData;
  selectedPortfolios: PortfolioItem[];
  onPrev: () => void;
  onCreateProject: (data: any) => void;
}) => {
  const contentTypeLabel = CONTENT_TYPES.find((ct) => ct.value === proposal.contentType)?.label || '';
  const categoryLabel = PORTFOLIO_CATEGORIES.find((c) => c.value === proposal.category)?.label || '';

  const handleCreateStoryboard = () => {
    const scenes = generateScenes(proposal.contentType, proposal.projectTitle);
    const projectData = {
      title: proposal.projectTitle,
      brand_name: proposal.clientCompany,
      video_type: contentTypeLabel,
      platform: proposal.platforms.join(', '),
      tone: proposal.tonePref.feel,
      description: proposal.projectDescription,
      scenes: scenes,
      client_info: {
        name: proposal.clientName,
        email: proposal.clientEmail,
        phone: proposal.clientPhone,
      },
    };
    onCreateProject(projectData);
  };

  const handleEmailSubmit = () => {
    const subject = `영상 기획안: ${proposal.projectTitle}`;
    const body = `안녕하세요,\n\n아래는 ${proposal.projectTitle}에 대한 영상 기획안입니다.\n\n[기본 정보]\n제목: ${proposal.projectTitle}\n브랜드: ${proposal.clientCompany}\n카테고리: ${categoryLabel}\n콘텐츠 유형: ${contentTypeLabel}\n게재 플랫폼: ${proposal.platforms.join(', ')}\n예산: ${proposal.budget}\n촬영 예정일: ${proposal.desiredDate}\n납품 기한: ${proposal.deadline}\n\n[프로젝트 설명]\n${proposal.projectDescription}\n\n[참고 영상]\n${selectedPortfolios.map((p) => `- ${p.brand}: ${p.title}`).join('\n')}\n\n[참고사항]\n${proposal.referenceNotes}\n\n[추가 요청사항]\n${proposal.additionalNotes}\n\n감사합니다!`;

    window.location.href = `mailto:kth930084@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          기획안 미리보기
        </h2>
        <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          작성한 영상 기획안을 확인하고 제출하세요.
        </p>
      </div>

      <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="space-y-8">
          <div>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <FileText size={24} /> 프로젝트 정보
            </h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  프로젝트 제목
                </p>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {proposal.projectTitle}
                </p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  카테고리
                </p>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {categoryLabel}
                </p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  콘텐츠 유형
                </p>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {contentTypeLabel}
                </p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  게재 플랫폼
                </p>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {proposal.platforms.join(', ')}
                </p>
              </div>
            </div>
            <p className={`mt-4 text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {proposal.projectDescription}
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <User size={24} /> 클라이언트 정보
            </h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  이름
                </p>
                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{proposal.clientName}</p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  회사/브랜드
                </p>
                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{proposal.clientCompany}</p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  이메일
                </p>
                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{proposal.clientEmail}</p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  연락처
                </p>
                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{proposal.clientPhone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <Film size={24} /> 참고 영상
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedPortfolios.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg overflow-hidden p-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                >
                  <div
                    className={`bg-gradient-to-br ${colorPalettes[item.color]} aspect-video rounded-lg mb-2`}
                  />
                  <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                    {item.brand}
                  </p>
                  <p className={`text-sm font-medium line-clamp-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <Sparkles size={24} /> 영상 톤
            </h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  온도감
                </p>
                <p className={`text-base font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {proposal.tonePref.temp}
                </p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  감성
                </p>
                <p className={`text-base font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {proposal.tonePref.feel}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <Calendar size={24} /> 일정 & 예산
            </h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  촬영 예정일
                </p>
                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{proposal.desiredDate || '-'}</p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  납품 기한
                </p>
                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{proposal.deadline || '-'}</p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                  예산 범위
                </p>
                <p className={`text-base font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {proposal.budget}
                </p>
              </div>
            </div>
          </div>

          {proposal.additionalNotes && (
            <div>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <FileText size={24} /> 추가 요청사항
              </h3>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {proposal.additionalNotes}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          onClick={onPrev}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? 'bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800'
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={20} /> 이전
        </button>

        <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-none sm:justify-end">
          <button
            onClick={() => window.print()}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              darkMode
                ? 'bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <Download size={20} /> PDF 다운로드
          </button>

          <button
            onClick={handleEmailSubmit}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              darkMode
                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
          >
            <Mail size={20} /> 이메일 제출
          </button>

          <button
            onClick={handleCreateStoryboard}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition bg-gradient-to-r ${
              darkMode
                ? 'from-gray-600 to-gray-700 text-gray-100 hover:from-gray-500 hover:to-gray-600'
                : 'from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'
            }`}
          >
            <Sparkles size={20} /> 스토리보드로 변환
          </button>
        </div>
      </div>
    </div>
  );
};

function generateScenes(contentType: string, projectTitle: string): any[] {
  const sceneTemplates: Record<string, any[]> = {
    ProductVideo: [
      {
        number: 1,
        title: '제품 하이라이트',
        description: '제품의 주요 특징과 디자인을 강조하는 장면',
      },
      {
        number: 2,
        title: '사용 장면 (1)',
        description: '제품을 실제로 사용하는 모습 또는 적용 장면',
      },
      {
        number: 3,
        title: '텍스처/세부사항',
        description: '제품의 텍스처, 질감, 색상 등 세부 디테일',
      },
      {
        number: 4,
        title: '효과/결과물',
        description: '제품 사용 후의 결과나 효과를 보여주는 장면',
      },
    ],
    BrandFilm: [
      {
        number: 1,
        title: '브랜드 스토리 오프닝',
        description: '브랜드의 가치와 철학을 소개하는 오프닝',
      },
      {
        number: 2,
        title: '핵심 메시지',
        description: '브랜드가 전달하고자 하는 주요 메시지',
      },
      {
        number: 3,
        title: '감성적 연결',
        description: '타겟 오디언스와의 감정적 연결을 만드는 장면',
      },
      {
        number: 4,
        title: '콜투액션',
        description: '시청자에게 행동을 유도하는 엔딩',
      },
    ],
    HowTo: [
      {
        number: 1,
        title: '인트로/문제 제시',
        description: '해결해야 할 문제 또는 필요한 상황 소개',
      },
      {
        number: 2,
        title: '단계별 설명 (1)',
        description: '첫 번째 단계를 상세하게 설명',
      },
      {
        number: 3,
        title: '단계별 설명 (2)',
        description: '두 번째 단계를 상세하게 설명',
      },
      {
        number: 4,
        title: '결과/결론',
        description: '최종 결과를 보여주고 마무리',
      },
    ],
    Interview: [
      {
        number: 1,
        title: '출연자 소개',
        description: '인터뷰 대상자의 소개와 배경',
      },
      {
        number: 2,
        title: '주요 질문 (1)',
        description: '핵심 질문과 답변',
      },
      {
        number: 3,
        title: '주요 질문 (2)',
        description: '추가 질문과 깊이 있는 답변',
      },
      {
        number: 4,
        title: '마무리/메시지',
        description: '인터뷰 대상자의 최종 메시지',
      },
    ],
    ShortForm: [
      {
        number: 1,
        title: '훅 (0-3초)',
        description: '강렬한 오프닝으로 주목 끌기',
      },
      {
        number: 2,
        title: '콘텐츠 본론',
        description: '핵심 메시지 전달',
      },
      {
        number: 3,
        title: '클로징',
        description: '인상적인 엔딩과 CTA',
      },
    ],
    Content: [
      {
        number: 1,
        title: '오프닝/감정 유발',
        description: '시청자의 관심을 끌 오프닝',
      },
      {
        number: 2,
        title: '메인 콘텐츠 (1)',
        description: '핵심 콘텐츠 첫 번째 부분',
      },
      {
        number: 3,
        title: '메인 콘텐츠 (2)',
        description: '핵심 콘텐츠 두 번째 부분',
      },
      {
        number: 4,
        title: '클로징 및 상호작용 유도',
        description: '마무리 및 시청자와의 상호작용 유도',
      },
    ],
    TVC: [
      {
        number: 1,
        title: '상품 또는 문제 제시',
        description: '광고할 상품 또는 해결해야 할 문제 제시',
      },
      {
        number: 2,
        title: '솔루션/이점 설명',
        description: '상품의 이점과 솔루션 제시',
      },
      {
        number: 3,
        title: '감정적 호소 또는 사용 장면',
        description: '감정적 연결 또는 실제 사용 장면',
      },
      {
        number: 4,
        title: '콜투액션 및 브랜드 메시지',
        description: '최종 CTA와 브랜드 메시지',
      },
    ],
  };

  const template = sceneTemplates[contentType] || sceneTemplates['Content'];
  return template.map((scene) => ({
    ...scene,
    projectTitle,
  }));
}

export const PortfolioProposalBuilder: React.FC<PortfolioProposalBuilderProps> = ({
  darkMode,
  userEmail,
  onCreateProject,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [proposal, setProposal] = useState<ProposalData>(createEmptyProposal());

  const selectedPortfolios = PORTFOLIO_ITEMS.filter((item) => proposal.selectedPortfolios.includes(item.id));

  const handleUpdateProposal = (data: Partial<ProposalData>) => {
    setProposal((prev) => ({ ...prev, ...data }));
  };

  const handleSelectPortfolio = (id: string) => {
    setProposal((prev) => {
      const selected = prev.selectedPortfolios;
      return {
        ...prev,
        selectedPortfolios: selected.includes(id) ? selected.filter((pid) => pid !== id) : [...selected, id],
      };
    });
  };

  const handleCreateProject = (data: any) => {
    if (onCreateProject) {
      onCreateProject(data);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'} transition-colors duration-300`}>
      <BgColor darkMode={darkMode} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StepIndicator current={currentStep} total={5} darkMode={darkMode} />

        {currentStep === 1 && (
          <Step1Browse
            darkMode={darkMode}
            selected={proposal.selectedPortfolios}
            onSelect={handleSelectPortfolio}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2ProjectInfo
            darkMode={darkMode}
            proposal={proposal}
            onUpdate={handleUpdateProposal}
            selectedPortfolios={selectedPortfolios}
            onPrev={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <Step3ReferenceNotes
            darkMode={darkMode}
            proposal={proposal}
            onUpdate={handleUpdateProposal}
            selectedPortfolios={selectedPortfolios}
            onPrev={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <Step4Schedule
            darkMode={darkMode}
            proposal={proposal}
            onUpdate={handleUpdateProposal}
            onPrev={() => setCurrentStep(3)}
            onNext={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <Step5Preview
            darkMode={darkMode}
            proposal={proposal}
            selectedPortfolios={selectedPortfolios}
            onPrev={() => setCurrentStep(4)}
            onCreateProject={handleCreateProject}
          />
        )}
      </div>
    </div>
  );
};
