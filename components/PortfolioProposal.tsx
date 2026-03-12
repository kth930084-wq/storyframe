'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORIES,
  CONTENT_TYPES,
  PLATFORM_OPTIONS,
  TONE_OPTIONS,
  BUDGET_RANGES,
  TARGET_AUDIENCE_OPTIONS,
  VIDEO_PURPOSE_OPTIONS,
  DURATION_OPTIONS,
  DELIVERY_FORMAT_OPTIONS,
  createEmptyProposal,
  getSmartDefaults,
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

type Step = 1 | 2 | 3 | 4 | 5 | 6;

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
  '브라운': 'from-amber-600 to-amber-800',
};

const BgColor = ({ darkMode }: { darkMode: boolean }) => (
  <div
    className={`fixed inset-0 -z-10 ${
      darkMode ? 'bg-neutral-950' : 'bg-white'
    } transition-colors duration-300`}
  />
);

const StepIndicator = ({ current, total, darkMode }: { current: number; total: number; darkMode: boolean }) => {
  const stepLabels = ['포트폴리오', '프로젝트 정보', '레퍼런스', '일정/예산', '미리보기'];

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        {Array.from({ length: 5 }).map((_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === current;
          const isComplete = stepNum < current;
          return (
            <React.Fragment key={stepNum}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                  isComplete
                    ? `${darkMode ? 'bg-neutral-700' : 'bg-neutral-300'} ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`
                    : isActive
                    ? `${darkMode ? 'bg-neutral-600 ring-2 ring-neutral-400' : 'bg-neutral-900 text-white'}`
                    : `${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'} ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`
                }`}
              >
                {isComplete ? <Check size={20} /> : stepNum}
              </div>
              {i < 4 && (
                <div
                  className={`h-1 w-6 ${
                    isComplete ? (darkMode ? 'bg-neutral-700' : 'bg-neutral-300') : darkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex gap-6 text-xs font-medium">
        {stepLabels.map((label, i) => (
          <span
            key={label}
            className={`${
              i + 1 === current
                ? darkMode
                  ? 'text-neutral-100'
                  : 'text-neutral-900'
                : darkMode
                ? 'text-neutral-500'
                : 'text-neutral-600'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  darkMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  darkMode: boolean;
}) => (
  <div className="mb-4">
    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-lg transition-colors ${
        darkMode
          ? 'bg-neutral-800 border-neutral-600 text-neutral-100 placeholder-neutral-500 focus:border-neutral-400'
          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-neutral-400' : 'focus:ring-neutral-600'}`}
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
  darkMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  darkMode: boolean;
}) => (
  <div className="mb-4">
    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 border rounded-lg transition-colors ${
        darkMode
          ? 'bg-neutral-800 border-neutral-600 text-neutral-100 focus:border-neutral-400'
          : 'bg-white border-neutral-300 text-neutral-900 focus:border-neutral-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-neutral-400' : 'focus:ring-neutral-600'}`}
    >
      <option value="">선택하기</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder = '',
  darkMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  darkMode: boolean;
}) => (
  <div className="mb-4">
    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={`w-full px-4 py-2 border rounded-lg transition-colors ${
        darkMode
          ? 'bg-neutral-800 border-neutral-600 text-neutral-100 placeholder-neutral-500 focus:border-neutral-400'
          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-neutral-400' : 'focus:ring-neutral-600'}`}
    />
  </div>
);

const CheckboxField = ({
  label,
  checked,
  onChange,
  darkMode,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  darkMode: boolean;
}) => (
  <label className={`flex items-center gap-3 mb-3 cursor-pointer ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-neutral-300 focus:ring-2"
    />
    <span>{label}</span>
  </label>
);

export const PortfolioProposalBuilder = ({ darkMode, userEmail, onCreateProject }: PortfolioProposalBuilderProps) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [proposal, setProposal] = useState<ProposalData>(createEmptyProposal());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  const portfolioItems = useMemo(() => {
    let items = PORTFOLIO_ITEMS;
    if (filterCategory) {
      items = items.filter((item) => item.category === filterCategory);
    }
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [filterCategory, searchQuery]);

  const selectedPortfolios = useMemo(
    () => PORTFOLIO_ITEMS.filter((item) => proposal.selectedPortfolios.includes(item.id)),
    [proposal.selectedPortfolios]
  );

  const onUpdate = (updates: Partial<ProposalData>) => {
    setProposal((prev) => ({ ...prev, ...updates }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepChange = (newStep: Step) => {
    // Validation before step transitions
    if (currentStep === 1 && newStep === 2) {
      if (proposal.selectedPortfolios.length === 0) {
        alert('최소 1개의 포트폴리오를 선택해주세요.');
        return;
      }
      // Apply smart defaults from selected portfolios
      const smartDefaults = getSmartDefaults(proposal.selectedPortfolios);
      onUpdate({
        category: smartDefaults.category || proposal.category,
        contentType: smartDefaults.contentType || proposal.contentType,
        platforms: smartDefaults.platforms?.length ? smartDefaults.platforms : proposal.platforms,
        tonePref: smartDefaults.tonePref?.temp ? smartDefaults.tonePref : proposal.tonePref,
        hasModel: smartDefaults.hasModel !== undefined ? smartDefaults.hasModel : proposal.hasModel,
        hasTypo: smartDefaults.hasTypo !== undefined ? smartDefaults.hasTypo : proposal.hasTypo,
      });
    }
    if (currentStep === 2 && newStep === 3) {
      if (!proposal.projectTitle) {
        alert('프로젝트 제목을 입력해주세요.');
        return;
      }
    }
    if (currentStep === 4 && newStep === 5) {
      if (!proposal.clientName || !proposal.clientEmail) {
        alert('클라이언트 이름과 이메일을 입력해주세요.');
        return;
      }
    }

    setCurrentStep(newStep);
    scrollToTop();
  };

  // Step 1: Portfolio Selection
  const Step1PortfolioSelection = () => (
    <div className={`space-y-6 ${darkMode ? 'bg-neutral-900' : 'bg-white'} p-8 rounded-xl`}>
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
          PEWPEW Studio 포트폴리오 선택
        </h2>
        <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          참고할 포트폴리오를 선택해주세요. 최소 1개 이상 필요합니다.
        </p>
        <a
          href="https://pewpewstudio.com/video"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          PEWPEW Studio 전체 포트폴리오 보기 <ExternalLink size={14} />
        </a>
      </div>

      <div className="space-y-4">
        <div className={`flex gap-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'} p-4 rounded-lg`}>
          <div className="flex-1 flex items-center gap-3">
            <Search size={20} className={darkMode ? 'text-neutral-500' : 'text-neutral-400'} />
            <input
              type="text"
              placeholder="포트폴리오 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent outline-none ${
                darkMode ? 'text-neutral-100 placeholder-neutral-500' : 'text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </div>
          <button
            onClick={() => setFilterCategory('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !filterCategory
                ? `${darkMode ? 'bg-neutral-600 text-neutral-100' : 'bg-neutral-900 text-white'}`
                : `${darkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-200 text-neutral-700'}`
            }`}
          >
            전체
          </button>
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(filterCategory === cat.value ? '' : cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterCategory === cat.value
                  ? `${darkMode ? 'bg-neutral-600 text-neutral-100' : 'bg-neutral-900 text-white'}`
                  : `${darkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-200 text-neutral-700'}`
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioItems.map((item) => {
          const isSelected = proposal.selectedPortfolios.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => {
                onUpdate({
                  selectedPortfolios: isSelected
                    ? proposal.selectedPortfolios.filter((id) => id !== item.id)
                    : [...proposal.selectedPortfolios, item.id],
                });
              }}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all transform hover:scale-105 ${
                isSelected
                  ? `${darkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-500'}`
                  : `${darkMode ? 'hover:ring-2 hover:ring-neutral-600' : 'hover:ring-2 hover:ring-neutral-300'}`
              }`}
            >
              <div className={`aspect-video ${colorPalettes[item.color] || colorPalettes['화이트']} bg-gradient-to-br flex items-center justify-center relative`}>
                <Film size={40} className="text-white opacity-50" />
                {item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
              </div>
              <div className={`p-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`font-bold text-sm ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.brand}</p>
                  </div>
                  {isSelected && <Check size={20} className="text-blue-500" />}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.platform.map((p) => (
                    <span key={p} className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-200 text-neutral-700'}`}>
                      {p}
                    </span>
                  ))}
                </div>
                <a
                  href="https://pewpewstudio.com/video"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 text-xs font-medium"
                >
                  홈페이지에서 보기 <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`text-center text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {proposal.selectedPortfolios.length}개 선택됨
      </div>
    </div>
  );

  // Step 2: Project Information
  const Step2ProjectInfo = () => (
    <div className={`space-y-6 ${darkMode ? 'bg-neutral-900' : 'bg-white'} p-8 rounded-xl max-w-2xl mx-auto`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
        프로젝트 정보
      </h2>

      <InputField
        label="프로젝트 제목"
        value={proposal.projectTitle}
        onChange={(value) => onUpdate({ projectTitle: value })}
        placeholder="예: 신제품 런칭 영상"
        required
        darkMode={darkMode}
      />

      <TextAreaField
        label="프로젝트 설명"
        value={proposal.projectDescription}
        onChange={(value) => onUpdate({ projectDescription: value })}
        placeholder="프로젝트에 대해 자유롭게 설명해주세요..."
        darkMode={darkMode}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="카테고리"
          value={proposal.category}
          onChange={(value) => onUpdate({ category: value as any })}
          options={PORTFOLIO_CATEGORIES.map((c) => c.value)}
          darkMode={darkMode}
        />
        <SelectField
          label="콘텐츠 타입"
          value={proposal.contentType}
          onChange={(value) => onUpdate({ contentType: value as any })}
          options={CONTENT_TYPES.map((c) => c.value)}
          darkMode={darkMode}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
          플랫폼
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PLATFORM_OPTIONS.map((platform) => (
            <CheckboxField
              key={platform}
              label={platform}
              checked={proposal.platforms.includes(platform)}
              onChange={(checked) => {
                onUpdate({
                  platforms: checked
                    ? [...proposal.platforms, platform]
                    : proposal.platforms.filter((p) => p !== platform),
                });
              }}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="톤 - 온도"
          value={proposal.tonePref.temp}
          onChange={(value) => onUpdate({ tonePref: { ...proposal.tonePref, temp: value } })}
          options={TONE_OPTIONS.temp}
          darkMode={darkMode}
        />
        <SelectField
          label="톤 - 분위기"
          value={proposal.tonePref.feel}
          onChange={(value) => onUpdate({ tonePref: { ...proposal.tonePref, feel: value } })}
          options={TONE_OPTIONS.feel}
          darkMode={darkMode}
        />
      </div>

      <SelectField
        label="타겟 오디언스"
        value={proposal.targetAudience}
        onChange={(value) => onUpdate({ targetAudience: value })}
        options={TARGET_AUDIENCE_OPTIONS}
        darkMode={darkMode}
      />

      <SelectField
        label="비디오 목적"
        value={proposal.videoPurpose}
        onChange={(value) => onUpdate({ videoPurpose: value })}
        options={VIDEO_PURPOSE_OPTIONS}
        darkMode={darkMode}
      />

      <SelectField
        label="원하는 길이"
        value={proposal.desiredDuration}
        onChange={(value) => onUpdate({ desiredDuration: value })}
        options={DURATION_OPTIONS}
        darkMode={darkMode}
      />

      <div>
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
          납품 포맷
        </label>
        <div className="space-y-3">
          {DELIVERY_FORMAT_OPTIONS.map((format) => (
            <CheckboxField
              key={format}
              label={format}
              checked={proposal.deliveryFormat.includes(format)}
              onChange={(checked) => {
                onUpdate({
                  deliveryFormat: checked
                    ? [...proposal.deliveryFormat, format]
                    : proposal.deliveryFormat.filter((f) => f !== format),
                });
              }}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CheckboxField
          label="모델 필요"
          checked={proposal.hasModel}
          onChange={(checked) => onUpdate({ hasModel: checked })}
          darkMode={darkMode}
        />
        <CheckboxField
          label="텍스트/타이포그래피"
          checked={proposal.hasTypo}
          onChange={(checked) => onUpdate({ hasTypo: checked })}
          darkMode={darkMode}
        />
      </div>
    </div>
  );

  // Step 3: Reference Notes
  const Step3ReferenceNotes = () => (
    <div className={`space-y-6 ${darkMode ? 'bg-neutral-900' : 'bg-white'} p-8 rounded-xl max-w-2xl mx-auto`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
        포트폴리오 참고사항
      </h2>

      <TextAreaField
        label="전체 참고 사항"
        value={proposal.referenceNotes}
        onChange={(value) => onUpdate({ referenceNotes: value })}
        placeholder="선택한 포트폴리오들에 대한 전반적인 참고사항을 입력해주세요..."
        darkMode={darkMode}
      />

      <div>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
          각 포트폴리오별 참고사항
        </h3>
        <div className="space-y-4">
          {selectedPortfolios.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'} border ${
                darkMode ? 'border-neutral-700' : 'border-neutral-200'
              }`}
            >
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {item.title} ({item.brand})
              </p>
              <textarea
                value={proposal.referenceItemNotes[item.id] || ''}
                onChange={(e) =>
                  onUpdate({
                    referenceItemNotes: {
                      ...proposal.referenceItemNotes,
                      [item.id]: e.target.value,
                    },
                  })
                }
                placeholder="이 포트폴리오와 관련된 특별한 참고사항..."
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-neutral-700 border-neutral-600 text-neutral-100 placeholder-neutral-500 focus:border-neutral-400'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-neutral-400' : 'focus:ring-neutral-600'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Schedule and Budget
  const Step4ScheduleBudget = () => (
    <div className={`space-y-6 ${darkMode ? 'bg-neutral-900' : 'bg-white'} p-8 rounded-xl max-w-2xl mx-auto`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
        일정 및 예산
      </h2>

      <InputField
        label="클라이언트 이름"
        value={proposal.clientName}
        onChange={(value) => onUpdate({ clientName: value })}
        placeholder="예: 홍길동"
        required
        darkMode={darkMode}
      />

      <InputField
        label="회사명"
        value={proposal.clientCompany}
        onChange={(value) => onUpdate({ clientCompany: value })}
        placeholder="예: ABC 주식회사"
        darkMode={darkMode}
      />

      <InputField
        label="이메일"
        value={proposal.clientEmail}
        onChange={(value) => onUpdate({ clientEmail: value })}
        type="email"
        placeholder="예: hello@example.com"
        required
        darkMode={darkMode}
      />

      <InputField
        label="연락처"
        value={proposal.clientPhone}
        onChange={(value) => onUpdate({ clientPhone: value })}
        placeholder="예: 010-1234-5678"
        darkMode={darkMode}
      />

      <InputField
        label="희망 납기일"
        value={proposal.desiredDate}
        onChange={(value) => onUpdate({ desiredDate: value })}
        type="date"
        darkMode={darkMode}
      />

      <SelectField
        label="예상 예산"
        value={proposal.budget}
        onChange={(value) => onUpdate({ budget: value })}
        options={BUDGET_RANGES}
        darkMode={darkMode}
      />

      <TextAreaField
        label="추가 요청사항"
        value={proposal.additionalNotes}
        onChange={(value) => onUpdate({ additionalNotes: value })}
        placeholder="기타 요청사항이나 특별한 사항이 있다면 입력해주세요..."
        darkMode={darkMode}
      />
    </div>
  );

  // Step 5: Preview
  const Step5Preview = () => {
    const portfolioDetails = selectedPortfolios.map((item) => ({
      ...item,
      notes: proposal.referenceItemNotes[item.id] || '',
    }));

    return (
      <div className={`space-y-6 ${darkMode ? 'bg-neutral-900' : 'bg-white'} p-8 rounded-xl max-w-4xl mx-auto`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
          기획안 미리보기
        </h2>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-50 border border-neutral-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
            프로젝트 정보
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>프로젝트 제목:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.projectTitle}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>카테고리:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>
                {PORTFOLIO_CATEGORIES.find((c) => c.value === proposal.category)?.label || proposal.category}
              </span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>콘텐츠 타입:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>
                {CONTENT_TYPES.find((c) => c.value === proposal.contentType)?.label || proposal.contentType}
              </span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>플랫폼:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.platforms.join(', ')}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>타겟 오디언스:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.targetAudience}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>비디오 목적:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.videoPurpose}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>원하는 길이:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.desiredDuration}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>납품 포맷:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.deliveryFormat.join(', ')}</span>
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-50 border border-neutral-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
            클라이언트 정보
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>이름:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.clientName}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>회사:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.clientCompany}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>이메일:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.clientEmail}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>연락처:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.clientPhone}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>예상 예산:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.budget}</span>
            </p>
            <p>
              <strong className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>희망 납기일:</strong>{' '}
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{proposal.desiredDate}</span>
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-50 border border-neutral-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
            선택된 포트폴리오
          </h3>
          <div className="space-y-3">
            {portfolioDetails.map((item) => (
              <div key={item.id} className={`p-3 rounded ${darkMode ? 'bg-neutral-700' : 'bg-white border border-neutral-200'}`}>
                <p className={`font-semibold text-sm ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
                  {item.title}
                </p>
                <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.brand}</p>
                {item.notes && (
                  <p className={`text-xs mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    참고: {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleSubmit()}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Mail className="inline mr-2" size={18} />
          기획안 제출하기
        </button>
      </div>
    );
  };

  // Step 6: Success Screen
  const Step6Success = () => (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
      <div className={`text-center space-y-6 p-8 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
        <div className="flex justify-center">
          <Sparkles size={64} className="text-green-500" />
        </div>
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
          기획안이 성공적으로 제출되었습니다!
        </h2>
        <p className={`text-lg ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          PEWPEW Studio에서 곧 연락드리겠습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setCurrentStep(1);
              setProposal(createEmptyProposal());
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              darkMode
                ? 'bg-neutral-700 text-neutral-100 hover:bg-neutral-600'
                : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
            }`}
          >
            새로운 기획안 만들기
          </button>
          <button
            onClick={() => onCreateProject?.({ type: 'portfolio_proposal' })}
            className="px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async () => {
    const deliveryFormatStr = proposal.deliveryFormat.join(', ');
    const referenceDetailsStr = selectedPortfolios
      .map(
        (item) =>
          `${item.title} (${item.brand})${proposal.referenceItemNotes[item.id] ? ': ' + proposal.referenceItemNotes[item.id] : ''}`
      )
      .join('\n');

    const emailBody = `
PEWPEW Studio 비디오 제안 신청

[클라이언트 정보]
이름: ${proposal.clientName}
회사: ${proposal.clientCompany}
이메일: ${proposal.clientEmail}
연락처: ${proposal.clientPhone}

[프로젝트 정보]
프로젝트 제목: ${proposal.projectTitle}
프로젝트 설명: ${proposal.projectDescription}
카테고리: ${PORTFOLIO_CATEGORIES.find((c) => c.value === proposal.category)?.label || proposal.category}
콘텐츠 타입: ${CONTENT_TYPES.find((c) => c.value === proposal.contentType)?.label || proposal.contentType}
플랫폼: ${proposal.platforms.join(', ')}
톤 (온도/분위기): ${proposal.tonePref.temp} / ${proposal.tonePref.feel}
타겟 오디언스: ${proposal.targetAudience}
비디오 목적: ${proposal.videoPurpose}
원하는 길이: ${proposal.desiredDuration}
납품 포맷: ${deliveryFormatStr}
모델 필요: ${proposal.hasModel ? '예' : '아니오'}
텍스트/타이포그래피: ${proposal.hasTypo ? '예' : '아니오'}

[포트폴리오 참고사항]
전체 참고사항: ${proposal.referenceNotes}

개별 포트폴리오 항목:
${referenceDetailsStr}

[일정 및 예산]
희망 납기일: ${proposal.desiredDate}
예상 예산: ${proposal.budget}

[추가 요청사항]
${proposal.additionalNotes}

---
이 기획안은 PEWPEW Studio 포트폴리오 제안 빌더를 통해 자동 생성되었습니다.
`;

    try {
      const response = await fetch('/api/send-proposal-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'contact@pewpewstudio.com',
          subject: `[PEWPEW Studio] 비디오 제안 신청 - ${proposal.clientName} / ${proposal.projectTitle}`,
          body: emailBody,
        }),
      });

      if (response.ok) {
        setCurrentStep(6);
        scrollToTop();
      } else {
        alert('기획안 제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('기획안 제출 중 오류가 발생했습니다.');
    }
  };

  const currentContent = {
    1: <Step1PortfolioSelection />,
    2: <Step2ProjectInfo />,
    3: <Step3ReferenceNotes />,
    4: <Step4ScheduleBudget />,
    5: <Step5Preview />,
    6: <Step6Success />,
  };

  return (
    <div className={`min-h-screen pb-16 ${darkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      <BgColor darkMode={darkMode} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentStep !== 6 && <StepIndicator current={currentStep} total={5} darkMode={darkMode} />}

        {currentContent[currentStep]}

        {currentStep !== 6 && (
          <div className="flex gap-4 justify-between mt-8 max-w-6xl mx-auto px-4">
            <button
              onClick={() => handleStepChange((currentStep - 1) as Step)}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                currentStep === 1
                  ? `${darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-200 text-neutral-400'} cursor-not-allowed`
                  : `${darkMode ? 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700' : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'}`
              }`}
            >
              <ChevronLeft size={18} />
              이전
            </button>
            <button
              onClick={() => handleStepChange((currentStep + 1) as Step)}
              disabled={currentStep === 5}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                currentStep === 5
                  ? `${darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-200 text-neutral-400'} cursor-not-allowed`
                  : `${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`
              }`}
            >
              다음
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
