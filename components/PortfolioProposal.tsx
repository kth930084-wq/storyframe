'use client';

import React, { useState, useMemo, useCallback } from 'react';
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
  Check,
  ChevronRight,
  ChevronLeft,
  Film,
  Mail,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

/* ── 타입 ── */
type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface PortfolioProposalBuilderProps {
  darkMode: boolean;
  userEmail?: string;
  onCreateProject?: (projectData: any) => void;
  onBackToDashboard?: () => void;
}

/* ── 컬러 팔레트 ── */
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

/* ──────────────────────────────────
   외부에 정의된 순수 프레젠테이션 컴포넌트
   (렌더마다 재생성되지 않으므로 포커스 유지)
   ────────────────────────────────── */

const StepIndicator = ({ current, darkMode }: { current: number; darkMode: boolean }) => {
  const labels = ['포트폴리오', '프로젝트 정보', '레퍼런스', '일정/예산', '미리보기'];
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        {labels.map((_, i) => {
          const n = i + 1;
          const active = n === current;
          const done = n < current;
          return (
            <React.Fragment key={n}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                  done
                    ? `${darkMode ? 'bg-neutral-700 text-neutral-100' : 'bg-neutral-300 text-neutral-900'}`
                    : active
                    ? `${darkMode ? 'bg-neutral-600 ring-2 ring-neutral-400 text-white' : 'bg-neutral-900 text-white'}`
                    : `${darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-200 text-neutral-500'}`
                }`}
              >
                {done ? <Check size={18} /> : n}
              </div>
              {i < 4 && (
                <div className={`h-0.5 w-6 ${done ? (darkMode ? 'bg-neutral-600' : 'bg-neutral-400') : darkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex gap-4 sm:gap-6">
        {labels.map((l, i) => (
          <span
            key={l}
            className={`text-[11px] sm:text-xs font-medium ${
              i + 1 === current ? (darkMode ? 'text-neutral-100' : 'text-neutral-900') : darkMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── 포트폴리오 카드 ── */
const PortfolioCard = React.memo(({
  item,
  isSelected,
  onToggle,
  darkMode,
}: {
  item: PortfolioItem;
  isSelected: boolean;
  onToggle: () => void;
  darkMode: boolean;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={`text-left rounded-xl overflow-hidden transition-all ${
      isSelected
        ? `ring-2 ${darkMode ? 'ring-neutral-400' : 'ring-neutral-800'} shadow-lg`
        : `${darkMode ? 'hover:ring-1 hover:ring-neutral-600' : 'hover:ring-1 hover:ring-neutral-300'} hover:shadow-md`
    }`}
  >
    <div className={`aspect-video bg-gradient-to-br ${colorPalettes[item.color] || 'from-gray-200 to-gray-300'} relative flex items-center justify-center`}>
      <Film size={32} className="text-white/40" />
      {isSelected && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-white' : 'bg-neutral-900'}`}>
            <Check size={20} className={darkMode ? 'text-neutral-900' : 'text-white'} />
          </div>
        </div>
      )}
      {item.duration && (
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
          {item.duration}
        </span>
      )}
    </div>
    <div className={`p-3 ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
        {item.brand}
      </p>
      <p className={`text-sm font-semibold line-clamp-1 mb-1.5 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
        {item.title}
      </p>
      <div className="flex flex-wrap gap-1">
        {item.platform.map((p) => (
          <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-100 text-neutral-600'}`}>
            {p}
          </span>
        ))}
      </div>
    </div>
  </button>
));
PortfolioCard.displayName = 'PortfolioCard';

/* ── generateScenes (스토리보드 변환용) ── */
function generateScenes(contentType: string, projectTitle: string): any[] {
  const templates: Record<string, any[]> = {
    ProductVideo: [
      { title: '제품 하이라이트', description: '제품의 주요 특징과 디자인을 강조하는 장면' },
      { title: '사용 장면', description: '제품을 실제로 사용하는 모습' },
      { title: '텍스처/세부사항', description: '제품의 텍스처, 질감, 색상 등 세부 디테일' },
      { title: '효과/결과물', description: '제품 사용 후의 결과나 효과' },
    ],
    BrandFilm: [
      { title: '브랜드 스토리 오프닝', description: '브랜드의 가치와 철학을 소개하는 오프닝' },
      { title: '핵심 메시지', description: '브랜드가 전달하고자 하는 주요 메시지' },
      { title: '감성적 연결', description: '타겟 오디언스와의 감정적 연결을 만드는 장면' },
      { title: '콜투액션', description: '시청자에게 행동을 유도하는 엔딩' },
    ],
    HowTo: [
      { title: '인트로/문제 제시', description: '해결해야 할 문제 또는 필요한 상황 소개' },
      { title: '단계별 설명 (1)', description: '첫 번째 단계를 상세하게 설명' },
      { title: '단계별 설명 (2)', description: '두 번째 단계를 상세하게 설명' },
      { title: '결과/결론', description: '최종 결과를 보여주고 마무리' },
    ],
    ShortForm: [
      { title: '훅 (0-3초)', description: '강렬한 오프닝으로 주목 끌기' },
      { title: '콘텐츠 본론', description: '핵심 메시지 전달' },
      { title: '클로징', description: '인상적인 엔딩과 CTA' },
    ],
    Content: [
      { title: '오프닝', description: '시청자의 관심을 끌 오프닝' },
      { title: '메인 콘텐츠 (1)', description: '핵심 콘텐츠 첫 번째 부분' },
      { title: '메인 콘텐츠 (2)', description: '핵심 콘텐츠 두 번째 부분' },
      { title: '클로징', description: '마무리 및 상호작용 유도' },
    ],
    TVC: [
      { title: '상품/문제 제시', description: '광고할 상품 또는 해결해야 할 문제' },
      { title: '솔루션/이점', description: '상품의 이점과 솔루션 제시' },
      { title: '감정적 호소', description: '감정적 연결 또는 실제 사용 장면' },
      { title: '브랜드 메시지', description: '최종 CTA와 브랜드 메시지' },
    ],
    Interview: [
      { title: '출연자 소개', description: '인터뷰 대상자의 소개와 배경' },
      { title: '주요 질문 (1)', description: '핵심 질문과 답변' },
      { title: '주요 질문 (2)', description: '추가 질문과 깊이 있는 답변' },
      { title: '마무리 메시지', description: '인터뷰 대상자의 최종 메시지' },
    ],
  };
  return (templates[contentType] || templates['Content']).map((s, i) => ({
    ...s,
    number: i + 1,
    duration: 5,
    projectTitle,
  }));
}

/* ──────────────────────────────────
   메인 컴포넌트
   ────────────────────────────────── */
export const PortfolioProposalBuilder: React.FC<PortfolioProposalBuilderProps> = ({
  darkMode,
  userEmail,
  onCreateProject,
  onBackToDashboard,
}) => {
  const [step, setStep] = useState<Step>(1);
  const [proposal, setProposal] = useState<ProposalData>(createEmptyProposal());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState('');

  /* 필터링된 포트폴리오 */
  const filteredItems = useMemo(() => {
    let items = PORTFOLIO_ITEMS;
    if (filterCat) items = items.filter((i) => i.category === filterCat);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q) || i.tags.some(t => t.includes(q)));
    }
    return items;
  }, [filterCat, searchQuery]);

  const selectedItems = useMemo(
    () => PORTFOLIO_ITEMS.filter((i) => proposal.selectedPortfolios.includes(i.id)),
    [proposal.selectedPortfolios]
  );

  /* 업데이트 헬퍼 */
  const update = useCallback((partial: Partial<ProposalData>) => {
    setProposal((prev) => ({ ...prev, ...partial }));
  }, []);

  const togglePortfolio = useCallback((id: string) => {
    setProposal((prev) => ({
      ...prev,
      selectedPortfolios: prev.selectedPortfolios.includes(id)
        ? prev.selectedPortfolios.filter((pid) => pid !== id)
        : [...prev.selectedPortfolios, id],
    }));
  }, []);

  /* 스텝 전환 (검증 포함) */
  const goStep = useCallback((next: Step) => {
    setProposal((prev) => {
      // Step1 → Step2: 스마트 기본값 적용
      if (next === 2 && prev.selectedPortfolios.length > 0) {
        const sd = getSmartDefaults(prev.selectedPortfolios);
        return {
          ...prev,
          category: prev.category || sd.category || '',
          contentType: prev.contentType || sd.contentType || '',
          platforms: prev.platforms.length ? prev.platforms : sd.platforms || [],
          tonePref: prev.tonePref.temp ? prev.tonePref : sd.tonePref || prev.tonePref,
          hasModel: sd.hasModel ?? prev.hasModel,
          hasTypo: sd.hasTypo ?? prev.hasTypo,
        };
      }
      return prev;
    });
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (step === 1 && proposal.selectedPortfolios.length === 0) {
      alert('최소 1개의 포트폴리오를 선택해주세요.');
      return;
    }
    if (step === 2 && !proposal.projectTitle.trim()) {
      alert('프로젝트 제목을 입력해주세요.');
      return;
    }
    if (step === 4 && (!proposal.clientName.trim() || !proposal.clientEmail.trim())) {
      alert('클라이언트 이름과 이메일은 필수입니다.');
      return;
    }
    if (step < 5) goStep((step + 1) as Step);
  }, [step, proposal, goStep]);

  const handlePrev = useCallback(() => {
    if (step > 1) goStep((step - 1) as Step);
  }, [step, goStep]);

  /* 이메일 제출 (mailto) */
  const handleEmailSubmit = useCallback(() => {
    const catLabel = PORTFOLIO_CATEGORIES.find((c) => c.value === proposal.category)?.label || proposal.category;
    const typeLabel = CONTENT_TYPES.find((c) => c.value === proposal.contentType)?.label || proposal.contentType;
    const refItems = selectedItems
      .map((item) => `- ${item.brand}: ${item.title}${proposal.referenceItemNotes[item.id] ? `\n  참고: ${proposal.referenceItemNotes[item.id]}` : ''}`)
      .join('\n');

    const subject = encodeURIComponent(`[영상 기획안] ${proposal.projectTitle} - ${proposal.clientCompany || proposal.clientName}`);
    const body = encodeURIComponent(
`안녕하세요 PEWPEW Studio,

영상 기획안을 제출합니다.

━━━ 클라이언트 정보 ━━━
이름: ${proposal.clientName}
회사: ${proposal.clientCompany}
이메일: ${proposal.clientEmail}
연락처: ${proposal.clientPhone}

━━━ 프로젝트 정보 ━━━
제목: ${proposal.projectTitle}
설명: ${proposal.projectDescription}
카테고리: ${catLabel}
콘텐츠 유형: ${typeLabel}
플랫폼: ${proposal.platforms.join(', ')}
톤: ${proposal.tonePref.temp} / ${proposal.tonePref.feel}
타겟 오디언스: ${proposal.targetAudience}
영상 목적: ${proposal.videoPurpose}
희망 길이: ${proposal.desiredDuration}
납품 포맷: ${proposal.deliveryFormat.join(', ')}
모델 촬영: ${proposal.hasModel ? '예' : '아니오'}
타이포그래피: ${proposal.hasTypo ? '예' : '아니오'}

━━━ 참고 영상 ━━━
${refItems}

전체 참고사항: ${proposal.referenceNotes}

━━━ 일정 & 예산 ━━━
희망 촬영일: ${proposal.desiredDate}
납품 기한: ${proposal.deadline}
예산: ${proposal.budget}

━━━ 추가 요청사항 ━━━
${proposal.additionalNotes}

---
이 기획안은 PEWPEW 스토리보드 포트폴리오 기획안 빌더로 작성되었습니다.`
    );
    window.location.href = `mailto:kth930084@gmail.com?subject=${subject}&body=${body}`;
    goStep(6);
  }, [proposal, selectedItems, goStep]);

  /* 스토리보드 변환 */
  const handleCreateStoryboard = useCallback(() => {
    const typeLabel = CONTENT_TYPES.find((c) => c.value === proposal.contentType)?.label || '';
    const scenes = generateScenes(proposal.contentType || 'Content', proposal.projectTitle);
    onCreateProject?.({
      title: proposal.projectTitle,
      brand_name: proposal.clientCompany,
      video_type: typeLabel,
      platform: proposal.platforms.join(', '),
      tone: proposal.tonePref.feel,
      description: proposal.projectDescription,
      scenes,
      client_info: {
        name: proposal.clientName,
        email: proposal.clientEmail,
        phone: proposal.clientPhone,
        company: proposal.clientCompany,
      },
    });
  }, [proposal, onCreateProject]);

  /* 스타일 헬퍼 */
  const cn = darkMode;
  const card = cn ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200';
  const cardInner = cn ? 'bg-neutral-800' : 'bg-neutral-50';
  const inputCls = `w-full px-4 py-2.5 rounded-lg outline-none text-sm transition border ${
    cn ? 'bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500' : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-600'
  }`;
  const selectCls = inputCls;
  const labelCls = `block text-sm font-medium mb-1.5 ${cn ? 'text-neutral-300' : 'text-neutral-700'}`;
  const headingCls = `text-2xl font-bold mb-1 ${cn ? 'text-neutral-100' : 'text-neutral-900'}`;
  const subCls = `text-sm mb-6 ${cn ? 'text-neutral-500' : 'text-neutral-500'}`;

  /* ──────────── 렌더 ──────────── */
  return (
    <div className={`min-h-full pb-12 ${cn ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* 스텝 인디케이터 (성공 화면에서는 숨김) */}
        {step <= 5 && <StepIndicator current={step} darkMode={darkMode} />}

        {/* ═══════ STEP 1: 포트폴리오 선택 ═══════ */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className={headingCls}>PEWPEW Studio 포트폴리오</h2>
              <p className={subCls}>참고하고 싶은 영상을 선택해주세요 (최소 1개)</p>
              <a
                href="https://www.pewpewstudio.com/video"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${cn ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                PEWPEW Studio 전체 포트폴리오 보기 <ExternalLink size={14} />
              </a>
            </div>

            {/* 검색 + 필터 */}
            <div className={`flex flex-col sm:flex-row gap-3 p-4 rounded-xl ${cardInner}`}>
              <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border ${cn ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
                <Search size={16} className={cn ? 'text-neutral-500' : 'text-neutral-400'} />
                <input
                  type="text"
                  placeholder="브랜드, 제목, 태그 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 bg-transparent outline-none text-sm ${cn ? 'text-neutral-100 placeholder-neutral-600' : 'text-neutral-900 placeholder-neutral-400'}`}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilterCat('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    !filterCat ? (cn ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white') : (cn ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600')
                  }`}
                >
                  전체
                </button>
                {PORTFOLIO_CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setFilterCat(filterCat === c.value ? '' : c.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      filterCat === c.value ? (cn ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white') : (cn ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600')
                    }`}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 선택 카운트 */}
            <div className={`text-center text-sm font-medium ${cn ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {filteredItems.length}개 중 <span className={cn ? 'text-white' : 'text-neutral-900'}>{proposal.selectedPortfolios.length}개</span> 선택됨
            </div>

            {/* 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredItems.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  isSelected={proposal.selectedPortfolios.includes(item.id)}
                  onToggle={() => togglePortfolio(item.id)}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══════ STEP 2: 프로젝트 정보 ═══════ */}
        {step === 2 && (
          <div className={`rounded-xl p-6 sm:p-8 max-w-2xl mx-auto ${card}`}>
            <h2 className={headingCls}>프로젝트 정보</h2>
            <p className={subCls}>기획하실 영상의 기본 정보를 입력해주세요.</p>

            {/* 선택된 포트폴리오 미니 프리뷰 */}
            {selectedItems.length > 0 && (
              <div className={`flex gap-2 mb-6 p-3 rounded-lg overflow-x-auto ${cardInner}`}>
                {selectedItems.map((it) => (
                  <div key={it.id} className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${colorPalettes[it.color]}`} title={it.title} />
                ))}
                <span className={`flex items-center text-xs font-medium ml-2 ${cn ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  참고영상 {selectedItems.length}개
                </span>
              </div>
            )}

            <div className="space-y-4">
              {/* 프로젝트 제목 (필수) */}
              <div>
                <label className={labelCls}>프로젝트 제목 <span className="text-red-500">*</span></label>
                <input type="text" value={proposal.projectTitle} onChange={(e) => update({ projectTitle: e.target.value })}
                  placeholder="예: 2026 여름 스킨케어 런칭 영상" className={inputCls} />
              </div>

              {/* 프로젝트 설명 */}
              <div>
                <label className={labelCls}>프로젝트 설명</label>
                <textarea value={proposal.projectDescription} onChange={(e) => update({ projectDescription: e.target.value })}
                  placeholder="프로젝트의 목표와 원하시는 방향을 자유롭게 적어주세요." rows={3} className={inputCls + ' resize-none'} />
              </div>

              {/* 카테고리 + 콘텐츠 유형 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>카테고리</label>
                  <select value={proposal.category} onChange={(e) => update({ category: e.target.value as any })} className={selectCls}>
                    <option value="">선택</option>
                    {PORTFOLIO_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>콘텐츠 유형</label>
                  <select value={proposal.contentType} onChange={(e) => update({ contentType: e.target.value as any })} className={selectCls}>
                    <option value="">선택</option>
                    {CONTENT_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {/* 플랫폼 */}
              <div>
                <label className={labelCls}>게재 플랫폼</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_OPTIONS.map((p) => (
                    <button key={p} type="button"
                      onClick={() => update({ platforms: proposal.platforms.includes(p) ? proposal.platforms.filter((x) => x !== p) : [...proposal.platforms, p] })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        proposal.platforms.includes(p)
                          ? (cn ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white')
                          : (cn ? 'bg-neutral-800 text-neutral-400 border border-neutral-700' : 'bg-neutral-100 text-neutral-600 border border-neutral-200')
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* 톤 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>톤 - 온도감</label>
                  <div className="flex flex-wrap gap-1.5">
                    {TONE_OPTIONS.temp.map((t) => (
                      <button key={t} type="button"
                        onClick={() => update({ tonePref: { ...proposal.tonePref, temp: t } })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          proposal.tonePref.temp === t ? (cn ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white') : (cn ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600')
                        }`}
                      >{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>톤 - 감성</label>
                  <div className="flex flex-wrap gap-1.5">
                    {TONE_OPTIONS.feel.map((f) => (
                      <button key={f} type="button"
                        onClick={() => update({ tonePref: { ...proposal.tonePref, feel: f } })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          proposal.tonePref.feel === f ? (cn ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white') : (cn ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600')
                        }`}
                      >{f}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 신규 필드들 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>타겟 오디언스</label>
                  <select value={proposal.targetAudience} onChange={(e) => update({ targetAudience: e.target.value })} className={selectCls}>
                    <option value="">선택</option>
                    {TARGET_AUDIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>영상 목적</label>
                  <select value={proposal.videoPurpose} onChange={(e) => update({ videoPurpose: e.target.value })} className={selectCls}>
                    <option value="">선택</option>
                    {VIDEO_PURPOSE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>희망 길이</label>
                  <select value={proposal.desiredDuration} onChange={(e) => update({ desiredDuration: e.target.value })} className={selectCls}>
                    <option value="">선택</option>
                    {DURATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>납품 비율</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DELIVERY_FORMAT_OPTIONS.map((f) => (
                      <button key={f} type="button"
                        onClick={() => update({ deliveryFormat: proposal.deliveryFormat.includes(f) ? proposal.deliveryFormat.filter((x) => x !== f) : [...proposal.deliveryFormat, f] })}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition ${
                          proposal.deliveryFormat.includes(f)
                            ? (cn ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white')
                            : (cn ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-500')
                        }`}
                      >{f}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 모델/타이포 */}
              <div className="flex gap-4">
                <label className={`flex items-center gap-2 cursor-pointer ${cn ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <input type="checkbox" checked={proposal.hasModel} onChange={(e) => update({ hasModel: e.target.checked })} className="w-4 h-4 rounded" />
                  <span className="text-sm">모델 촬영</span>
                </label>
                <label className={`flex items-center gap-2 cursor-pointer ${cn ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <input type="checkbox" checked={proposal.hasTypo} onChange={(e) => update({ hasTypo: e.target.checked })} className="w-4 h-4 rounded" />
                  <span className="text-sm">타이포그래피</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ═══════ STEP 3: 레퍼런스 노트 ═══════ */}
        {step === 3 && (
          <div className={`rounded-xl p-6 sm:p-8 max-w-2xl mx-auto ${card}`}>
            <h2 className={headingCls}>레퍼런스 노트</h2>
            <p className={subCls}>선택한 영상들의 어떤 부분이 마음에 드셨는지 적어주세요.</p>

            <div className="space-y-4">
              {selectedItems.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg ${cardInner}`}>
                  <div className="flex gap-3 mb-3">
                    <div className={`w-16 h-16 rounded-lg flex-shrink-0 bg-gradient-to-br ${colorPalettes[item.color]}`} />
                    <div>
                      <p className={`text-xs font-bold uppercase ${cn ? 'text-neutral-500' : 'text-neutral-400'}`}>{item.brand}</p>
                      <p className={`text-sm font-semibold ${cn ? 'text-neutral-100' : 'text-neutral-900'}`}>{item.title}</p>
                      <p className={`text-xs mt-0.5 ${cn ? 'text-neutral-500' : 'text-neutral-500'}`}>{item.description}</p>
                    </div>
                  </div>
                  <textarea
                    value={proposal.referenceItemNotes[item.id] || ''}
                    onChange={(e) => update({ referenceItemNotes: { ...proposal.referenceItemNotes, [item.id]: e.target.value } })}
                    placeholder="예: 색감이 마음에 들어요, 편집 속도가 좋아요..."
                    rows={2}
                    className={inputCls + ' resize-none'}
                  />
                </div>
              ))}

              <div>
                <label className={labelCls}>전체 참고사항</label>
                <textarea
                  value={proposal.referenceNotes}
                  onChange={(e) => update({ referenceNotes: e.target.value })}
                  placeholder="종합적으로 원하시는 스타일, 분위기를 자유롭게 작성해주세요."
                  rows={4}
                  className={inputCls + ' resize-none'}
                />
              </div>
            </div>
          </div>
        )}

        {/* ═══════ STEP 4: 일정 & 예산 ═══════ */}
        {step === 4 && (
          <div className={`rounded-xl p-6 sm:p-8 max-w-2xl mx-auto ${card}`}>
            <h2 className={headingCls}>일정 & 예산</h2>
            <p className={subCls}>마지막으로 연락처와 일정/예산 정보를 입력해주세요.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>이름 <span className="text-red-500">*</span></label>
                  <input type="text" value={proposal.clientName} onChange={(e) => update({ clientName: e.target.value })} placeholder="홍길동" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>회사/브랜드</label>
                  <input type="text" value={proposal.clientCompany} onChange={(e) => update({ clientCompany: e.target.value })} placeholder="예: ACME 코스메틱" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>이메일 <span className="text-red-500">*</span></label>
                  <input type="email" value={proposal.clientEmail} onChange={(e) => update({ clientEmail: e.target.value })} placeholder="you@example.com" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>연락처</label>
                  <input type="tel" value={proposal.clientPhone} onChange={(e) => update({ clientPhone: e.target.value })} placeholder="010-1234-5678" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>희망 촬영일</label>
                  <input type="date" value={proposal.desiredDate} onChange={(e) => update({ desiredDate: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>납품 기한</label>
                  <input type="date" value={proposal.deadline} onChange={(e) => update({ deadline: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>예산 범위</label>
                <select value={proposal.budget} onChange={(e) => update({ budget: e.target.value })} className={selectCls}>
                  <option value="">선택</option>
                  {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>추가 요청사항</label>
                <textarea value={proposal.additionalNotes} onChange={(e) => update({ additionalNotes: e.target.value })}
                  placeholder="특별히 고려해야 할 사항이 있다면 적어주세요." rows={3} className={inputCls + ' resize-none'} />
              </div>
            </div>
          </div>
        )}

        {/* ═══════ STEP 5: 미리보기 & 제출 ═══════ */}
        {step === 5 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className={headingCls}>기획안 미리보기</h2>
            <p className={subCls}>작성하신 기획안을 확인하고 제출해주세요.</p>

            {/* 프로젝트 정보 */}
            <div className={`p-6 rounded-xl ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${cn ? 'text-neutral-100' : 'text-neutral-900'}`}>프로젝트 정보</h3>
              <div className={`grid grid-cols-2 gap-4 text-sm ${cn ? 'text-neutral-300' : 'text-neutral-700'}`}>
                <div><span className="font-medium">제목:</span> {proposal.projectTitle}</div>
                <div><span className="font-medium">카테고리:</span> {PORTFOLIO_CATEGORIES.find((c) => c.value === proposal.category)?.label || '-'}</div>
                <div><span className="font-medium">유형:</span> {CONTENT_TYPES.find((c) => c.value === proposal.contentType)?.label || '-'}</div>
                <div><span className="font-medium">플랫폼:</span> {proposal.platforms.join(', ') || '-'}</div>
                <div><span className="font-medium">톤:</span> {proposal.tonePref.temp} / {proposal.tonePref.feel}</div>
                <div><span className="font-medium">타겟:</span> {proposal.targetAudience || '-'}</div>
                <div><span className="font-medium">목적:</span> {proposal.videoPurpose || '-'}</div>
                <div><span className="font-medium">길이:</span> {proposal.desiredDuration || '-'}</div>
                <div className="col-span-2"><span className="font-medium">납품 포맷:</span> {proposal.deliveryFormat.join(', ') || '-'}</div>
              </div>
              {proposal.projectDescription && (
                <p className={`mt-3 text-sm ${cn ? 'text-neutral-400' : 'text-neutral-600'}`}>{proposal.projectDescription}</p>
              )}
            </div>

            {/* 참고 영상 */}
            <div className={`p-6 rounded-xl ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${cn ? 'text-neutral-100' : 'text-neutral-900'}`}>참고 영상 ({selectedItems.length}개)</h3>
              <div className="grid grid-cols-3 gap-3">
                {selectedItems.map((item) => (
                  <div key={item.id} className={`rounded-lg overflow-hidden ${cardInner}`}>
                    <div className={`aspect-video bg-gradient-to-br ${colorPalettes[item.color]}`} />
                    <div className="p-2">
                      <p className={`text-xs font-bold ${cn ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.brand}</p>
                      <p className={`text-xs font-medium line-clamp-1 ${cn ? 'text-neutral-200' : 'text-neutral-800'}`}>{item.title}</p>
                      {proposal.referenceItemNotes[item.id] && (
                        <p className={`text-[10px] mt-1 ${cn ? 'text-neutral-500' : 'text-neutral-400'}`}>
                          "{proposal.referenceItemNotes[item.id]}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {proposal.referenceNotes && (
                <p className={`mt-3 text-sm ${cn ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  <span className="font-medium">전체 참고:</span> {proposal.referenceNotes}
                </p>
              )}
            </div>

            {/* 클라이언트 & 일정 */}
            <div className={`p-6 rounded-xl ${card}`}>
              <h3 className={`text-lg font-bold mb-4 ${cn ? 'text-neutral-100' : 'text-neutral-900'}`}>클라이언트 & 일정</h3>
              <div className={`grid grid-cols-2 gap-4 text-sm ${cn ? 'text-neutral-300' : 'text-neutral-700'}`}>
                <div><span className="font-medium">이름:</span> {proposal.clientName}</div>
                <div><span className="font-medium">회사:</span> {proposal.clientCompany || '-'}</div>
                <div><span className="font-medium">이메일:</span> {proposal.clientEmail}</div>
                <div><span className="font-medium">연락처:</span> {proposal.clientPhone || '-'}</div>
                <div><span className="font-medium">촬영일:</span> {proposal.desiredDate || '-'}</div>
                <div><span className="font-medium">납품 기한:</span> {proposal.deadline || '-'}</div>
                <div><span className="font-medium">예산:</span> {proposal.budget || '-'}</div>
              </div>
              {proposal.additionalNotes && (
                <p className={`mt-3 text-sm ${cn ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  <span className="font-medium">추가 요청:</span> {proposal.additionalNotes}
                </p>
              )}
            </div>

            {/* 제출 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEmailSubmit}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition ${
                  cn ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-white hover:bg-neutral-900'
                }`}
              >
                <Mail size={18} /> 이메일로 제출
              </button>
              <button
                onClick={handleCreateStoryboard}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition bg-gradient-to-r ${
                  cn ? 'from-neutral-600 to-neutral-700 text-white hover:from-neutral-500 hover:to-neutral-600' : 'from-neutral-800 to-neutral-900 text-white hover:from-neutral-900 hover:to-black'
                }`}
              >
                <Sparkles size={18} /> 스토리보드로 변환
              </button>
            </div>
          </div>
        )}

        {/* ═══════ STEP 6: 성공 화면 ═══════ */}
        {step === 6 && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className={`text-center p-10 rounded-2xl max-w-md ${card}`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${cn ? 'bg-green-900/30' : 'bg-green-50'}`}>
                <Check size={40} className="text-green-500" />
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${cn ? 'text-neutral-100' : 'text-neutral-900'}`}>
                기획안이 제출되었습니다!
              </h2>
              <p className={`text-sm mb-8 ${cn ? 'text-neutral-400' : 'text-neutral-600'}`}>
                PEWPEW Studio에서 검토 후 연락드리겠습니다.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setStep(1); setProposal(createEmptyProposal()); }}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                    cn ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  새로운 기획안 작성
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── 하단 네비게이션 ─── */}
        {step >= 1 && step <= 5 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                step === 1
                  ? `cursor-not-allowed ${cn ? 'bg-neutral-900 text-neutral-700' : 'bg-neutral-100 text-neutral-300'}`
                  : `${cn ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`
              }`}
            >
              <ChevronLeft size={16} /> 이전
            </button>
            {step < 5 && (
              <button
                onClick={handleNext}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                  cn ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-white hover:bg-neutral-900'
                }`}
              >
                다음 <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
