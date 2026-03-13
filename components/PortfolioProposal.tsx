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
  Search, Check, ChevronRight, ChevronLeft, Film, Mail, Sparkles, ExternalLink, Star, ArrowRight,
  Play, User, Type, HelpCircle, Info,
} from 'lucide-react';

/* ── 타입 ── */
// intro → step1 → step2 → step3(미리보기) → done
type Page = 'intro' | 'step1' | 'step2' | 'step3' | 'done';

interface Props {
  darkMode: boolean;
  userEmail?: string;
  onCreateProject?: (data: any) => void;
}

/* ── 컬러 팔레트 ── */
const CP: Record<string, string> = {
  '화이트': 'from-gray-50 to-gray-100', '핑크': 'from-pink-200 to-pink-300',
  '블루': 'from-blue-200 to-blue-300', '골드': 'from-yellow-200 to-yellow-300',
  '블랙': 'from-gray-700 to-gray-900', '레드': 'from-red-200 to-red-300',
  '오렌지': 'from-orange-200 to-orange-300', '그린': 'from-green-200 to-green-300',
  '베이지': 'from-amber-100 to-amber-200', '우드': 'from-yellow-700 to-yellow-800',
  '그레이': 'from-gray-400 to-gray-500', '옐로우': 'from-yellow-200 to-yellow-300',
  '브라운': 'from-amber-600 to-amber-800',
};

/* ── 씬 템플릿 생성 ── */
function generateScenes(contentType: string): any[] {
  const t: Record<string, any[]> = {
    ProductVideo: [
      { title: '제품 하이라이트', description: '제품의 주요 특징을 강조' },
      { title: '사용 장면', description: '제품 사용 모습' },
      { title: '텍스처/세부', description: '질감, 색상 디테일' },
      { title: '효과/결과', description: '사용 후 결과' },
    ],
    BrandFilm: [
      { title: '오프닝', description: '브랜드 가치와 철학' },
      { title: '핵심 메시지', description: '전달하고자 하는 메시지' },
      { title: '감성 연결', description: '타겟과의 감정적 연결' },
      { title: 'CTA', description: '행동 유도 엔딩' },
    ],
    ShortForm: [
      { title: '훅 (0-3초)', description: '강렬한 오프닝' },
      { title: '본론', description: '핵심 메시지' },
      { title: '클로징', description: '엔딩 + CTA' },
    ],
    Content: [
      { title: '오프닝', description: '관심 끌기' },
      { title: '메인 (1)', description: '핵심 콘텐츠' },
      { title: '메인 (2)', description: '핵심 콘텐츠' },
      { title: '클로징', description: '마무리' },
    ],
  };
  return (t[contentType] || t['Content']).map((s, i) => ({ ...s, number: i + 1, duration: 5 }));
}

/* ── 카테고리 이모지 매핑 ── */
const CAT_EMOJI: Record<string, string> = {
  BEAUTY: '💄', SKINCARE: '🧴', HAIRCARE: '💇', FOOD: '🍽️',
  FASHION: '👗', LIFESTYLE: '🏠', INTERIOR: '🪑', TECH: '📱',
};
const CT_LABEL: Record<string, string> = {
  ProductVideo: '제품영상', BrandFilm: '브랜드필름', HowTo: '하우투',
  Interview: '인터뷰', ShortForm: '숏폼', Content: '콘텐츠', TVC: '광고',
};

/* ── 포트폴리오 카드 (메모이즈) — 풍부한 썸네일 ── */
const Card = React.memo(({ item, on, toggle, dk }: { item: PortfolioItem; on: boolean; toggle: () => void; dk: boolean }) => (
  <div className={`text-left rounded-xl overflow-hidden transition-all ${on ? `ring-2 ${dk ? 'ring-neutral-400' : 'ring-neutral-800'} shadow-lg scale-[1.02]` : 'hover:shadow-md hover:scale-[1.01]'}`}>
    {/* 썸네일 영역 (클릭 = 선택 토글) */}
    <button type="button" onClick={toggle} className="w-full">
      <div className={`aspect-video bg-gradient-to-br ${CP[item.color] || 'from-gray-200 to-gray-300'} relative overflow-hidden`}>
        {/* 카테고리 이모지 + 브랜드 이니셜 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl mb-0.5 drop-shadow-sm">{CAT_EMOJI[item.category] || '🎬'}</span>
          <span className="text-white/70 text-[10px] font-bold tracking-wider drop-shadow-sm">{item.brand.split(' ')[0].slice(0, 8)}</span>
        </div>
        {/* 콘텐츠 유형 뱃지 (좌상단) */}
        <span className="absolute top-1.5 left-1.5 bg-black/50 backdrop-blur-sm text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-md">
          {CT_LABEL[item.contentType] || '영상'}
        </span>
        {/* 모델/타이포 표시 (우상단) */}
        <div className="absolute top-1.5 right-1.5 flex gap-0.5">
          {item.hasModel && <span className="bg-black/50 backdrop-blur-sm text-white text-[8px] px-1 py-0.5 rounded-md" title="모델 출연"><User size={8} className="inline" /></span>}
          {item.hasTypo && <span className="bg-black/50 backdrop-blur-sm text-white text-[8px] px-1 py-0.5 rounded-md" title="타이포그래피"><Type size={8} className="inline" /></span>}
        </div>
        {/* 선택 오버레이 */}
        {on && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${dk ? 'bg-white' : 'bg-neutral-900'}`}>
              <Check size={18} className={dk ? 'text-neutral-900' : 'text-white'} />
            </div>
          </div>
        )}
        {/* 하단 그라디언트 + 길이 */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
        {item.duration && <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">{item.duration}</span>}
        <span className="absolute bottom-1.5 left-1.5 text-white/80 text-[8px] font-medium">{item.tone.feel}</span>
      </div>
    </button>
    {/* 정보 영역 */}
    <div className={`p-2.5 ${dk ? 'bg-neutral-800' : 'bg-white'}`}>
      <p className={`text-[9px] font-bold uppercase tracking-wider ${dk ? 'text-neutral-500' : 'text-neutral-400'}`}>{item.brand}</p>
      <p className={`text-xs font-semibold line-clamp-1 mb-1 ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>{item.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-0.5">
          {item.platform.slice(0, 2).map(p => <span key={p} className={`text-[8px] px-1 py-0.5 rounded ${dk ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-100 text-neutral-500'}`}>{p}</span>)}
        </div>
        {/* 영상 보기 링크 */}
        {item.videoUrl && (
          <a href={item.videoUrl} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className={`inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded transition ${dk ? 'text-blue-400 hover:bg-neutral-700' : 'text-blue-600 hover:bg-blue-50'}`}>
            <Play size={9} fill="currentColor" /> 영상보기
          </a>
        )}
      </div>
    </div>
  </div>
));
Card.displayName = 'Card';

/* ══════════════════════════════════
   메인 컴포넌트
   ══════════════════════════════════ */
export const PortfolioProposalBuilder: React.FC<Props> = ({ darkMode: dk, userEmail, onCreateProject }) => {
  const [page, setPage] = useState<Page>('intro');
  const [proposal, setProposal] = useState<ProposalData>(createEmptyProposal());
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const up = useCallback((p: Partial<ProposalData>) => setProposal(v => ({ ...v, ...p })), []);
  const toggle = useCallback((id: string) => setProposal(v => ({
    ...v,
    selectedPortfolios: v.selectedPortfolios.includes(id) ? v.selectedPortfolios.filter(x => x !== id) : [...v.selectedPortfolios, id],
  })), []);

  const filtered = useMemo(() => {
    let r = PORTFOLIO_ITEMS;
    if (catFilter) r = r.filter(i => i.category === catFilter);
    if (search) { const q = search.toLowerCase(); r = r.filter(i => i.title.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q) || i.tags.some(t => t.includes(q))); }
    return r;
  }, [catFilter, search]);

  const sel = useMemo(() => PORTFOLIO_ITEMS.filter(i => proposal.selectedPortfolios.includes(i.id)), [proposal.selectedPortfolios]);

  const go = useCallback((p: Page) => {
    // step1→step2: 스마트 기본값
    if (p === 'step2' && proposal.selectedPortfolios.length > 0) {
      const sd = getSmartDefaults(proposal.selectedPortfolios);
      setProposal(v => ({
        ...v,
        category: v.category || sd.category || '',
        contentType: v.contentType || sd.contentType || '',
        platforms: v.platforms.length ? v.platforms : sd.platforms || [],
        tonePref: v.tonePref.temp ? v.tonePref : sd.tonePref || v.tonePref,
      }));
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [proposal.selectedPortfolios]);

  /* 이메일 제출 (API route → formsubmit.co + Firestore) */
  const submitEmail = useCallback(async () => {
    setSending(true);
    setSendError('');
    try {
      const cat = PORTFOLIO_CATEGORIES.find(c => c.value === proposal.category)?.label || '';
      const typ = CONTENT_TYPES.find(c => c.value === proposal.contentType)?.label || '';
      const refs = sel.map(i => `- ${i.brand}: ${i.title}${proposal.referenceItemNotes[i.id] ? ` → ${proposal.referenceItemNotes[i.id]}` : ''}`).join('\n');

      const res = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...proposal,
          categoryLabel: cat,
          contentTypeLabel: typ,
          referenceText: refs,
          selectedPortfolioTitles: sel.map(i => `${i.brand}: ${i.title}`),
        }),
      });

      const result = await res.json();
      if (result.success) {
        go('done');
      } else {
        setSendError('전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      setSendError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSending(false);
    }
  }, [proposal, sel, go]);

  /* 스토리보드 변환 */
  const toStoryboard = useCallback(() => {
    onCreateProject?.({
      title: proposal.projectTitle,
      brand_name: proposal.clientCompany,
      video_type: CONTENT_TYPES.find(c => c.value === proposal.contentType)?.label || '',
      platform: proposal.platforms.join(', '),
      tone: proposal.tonePref.feel,
      description: proposal.projectDescription,
      scenes: generateScenes(proposal.contentType || 'Content'),
      client_info: { name: proposal.clientName, email: proposal.clientEmail, phone: proposal.clientPhone, company: proposal.clientCompany },
    });
  }, [proposal, onCreateProject]);

  /* 스타일 */
  const crd = dk ? 'bg-neutral-900 border border-neutral-800 rounded-xl' : 'bg-white border border-neutral-200 rounded-xl';
  const inp = `w-full px-3.5 py-2.5 rounded-lg text-sm outline-none border transition ${dk ? 'bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500' : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500'}`;
  const lbl = `block text-xs font-semibold mb-1 ${dk ? 'text-neutral-400' : 'text-neutral-600'}`;
  const chip = (on: boolean) => `px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${on ? (dk ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white') : (dk ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600')}`;
  /* 도움말 힌트 컴포넌트 */
  const Hint = ({ text }: { text: string }) => (
    <span className={`inline-flex items-center gap-1 text-[10px] mt-0.5 ${dk ? 'text-neutral-600' : 'text-neutral-400'}`}>
      <Info size={10} className="flex-shrink-0" /> {text}
    </span>
  );

  return (
    <div className={`min-h-full pb-16 ${dk ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* ═══════════════════════════════════
            인트로 화면 - 기능 설명 + 시작하기
            ═══════════════════════════════════ */}
        {page === 'intro' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${dk ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              <Film size={36} className={dk ? 'text-neutral-300' : 'text-neutral-700'} />
            </div>

            <h1 className={`text-3xl font-bold mb-3 ${dk ? 'text-white' : 'text-neutral-900'}`}>
              영상 제작 의뢰하기
            </h1>
            <p className={`text-base max-w-md mb-8 ${dk ? 'text-neutral-400' : 'text-neutral-600'}`}>
              PEWPEW Studio의 포트폴리오를 보고 마음에 드는 스타일을 고르면,<br />
              간단하게 기획안을 만들어 바로 의뢰할 수 있어요
            </p>

            {/* 3단계 설명 */}
            <div className={`w-full max-w-lg rounded-2xl p-6 mb-8 ${dk ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'}`}>
              <div className="space-y-4">
                {[
                  { n: '1', title: '영상 고르기', desc: '포트폴리오에서 마음에 드는 영상을 선택하세요' },
                  { n: '2', title: '정보 입력', desc: '프로젝트와 연락처 정보를 간단히 작성하세요' },
                  { n: '3', title: '확인 & 제출', desc: '기획안을 확인하고 이메일로 보내세요' },
                ].map((s, i) => (
                  <div key={s.n} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${dk ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-800 text-white'}`}>
                      {s.n}
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold text-sm ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>{s.title}</p>
                      <p className={`text-xs mt-0.5 ${dk ? 'text-neutral-500' : 'text-neutral-500'}`}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => go('step1')}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-sm ${dk ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-white hover:bg-neutral-900'}`}
            >
              시작하기 <ArrowRight size={18} />
            </button>

            <a href="https://www.pewpewstudio.com/video" target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 mt-4 text-xs ${dk ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-700'} transition`}>
              PEWPEW Studio 홈페이지에서 전체 영상 보기 <ExternalLink size={12} />
            </a>
          </div>
        )}

        {/* ═══════════════════════════════════
            STEP 1: 영상 고르기
            ═══════════════════════════════════ */}
        {page === 'step1' && (
          <div className="space-y-5">
            {/* 스텝 표시 */}
            <div className="flex items-center gap-2 mb-2">
              {['영상 고르기', '정보 입력', '확인 & 제출'].map((t, i) => (
                <React.Fragment key={t}>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${i === 0 ? (dk ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white') : (dk ? 'bg-neutral-800 text-neutral-600' : 'bg-neutral-100 text-neutral-400')}`}>
                    {i + 1}. {t}
                  </span>
                  {i < 2 && <ChevronRight size={14} className={dk ? 'text-neutral-700' : 'text-neutral-300'} />}
                </React.Fragment>
              ))}
            </div>

            <div>
              <h2 className={`text-2xl font-bold mb-1 ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>
                마음에 드는 영상을 골라주세요
              </h2>
              <p className={`text-sm ${dk ? 'text-neutral-500' : 'text-neutral-500'}`}>
                &ldquo;이런 느낌으로 만들어주세요!&rdquo; 하고 보여줄 참고 영상이에요. 최소 1개 선택해주세요.
              </p>
              {/* 초보자 팁 */}
              <div className={`mt-3 p-3 rounded-lg text-xs ${dk ? 'bg-neutral-900 border border-neutral-800 text-neutral-400' : 'bg-amber-50 border border-amber-100 text-amber-700'}`}>
                <span className="font-bold">처음이라 뭘 골라야 할지 모르겠다면?</span>{' '}
                카테고리 필터로 업종을 먼저 고르고, 눈에 끌리는 영상을 1~3개만 선택하면 돼요. 정확하지 않아도 괜찮아요!
              </div>
            </div>

            {/* 검색 + 필터 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border ${dk ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
                <Search size={16} className={dk ? 'text-neutral-500' : 'text-neutral-400'} />
                <input type="text" placeholder="검색 (예: 아로셀, 숏폼, 럭셔리...)"
                  value={search} onChange={e => setSearch(e.target.value)}
                  className={`flex-1 bg-transparent outline-none text-sm ${dk ? 'text-neutral-100 placeholder-neutral-600' : 'text-neutral-900 placeholder-neutral-400'}`} />
              </div>
              <div className="flex flex-wrap gap-1">
                <button onClick={() => setCatFilter('')} className={chip(!catFilter)}>전체</button>
                {PORTFOLIO_CATEGORIES.map(c => (
                  <button key={c.value} onClick={() => setCatFilter(catFilter === c.value ? '' : c.value)} className={chip(catFilter === c.value)}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 선택 카운트 */}
            <p className={`text-center text-xs ${dk ? 'text-neutral-500' : 'text-neutral-400'}`}>
              {filtered.length}개 중 <span className={`font-bold ${dk ? 'text-white' : 'text-neutral-900'}`}>{proposal.selectedPortfolios.length}개</span> 선택
            </p>

            {/* 포트폴리오 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(item => (
                <Card key={item.id} item={item} on={proposal.selectedPortfolios.includes(item.id)}
                  toggle={() => toggle(item.id)} dk={dk} />
              ))}
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-between items-center pt-4">
              <button onClick={() => go('intro')} className={`text-sm ${dk ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-700'}`}>
                <ChevronLeft size={16} className="inline" /> 돌아가기
              </button>
              <button
                onClick={() => { if (!proposal.selectedPortfolios.length) { alert('최소 1개를 선택해주세요!'); return; } go('step2'); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition ${
                  proposal.selectedPortfolios.length ? (dk ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-white hover:bg-neutral-900')
                    : (dk ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed')
                }`}
              >
                다음으로 <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            STEP 2: 정보 입력 (프로젝트 + 연락처 + 레퍼런스 통합)
            ═══════════════════════════════════ */}
        {page === 'step2' && (
          <div className="space-y-5">
            {/* 스텝 표시 */}
            <div className="flex items-center gap-2 mb-2">
              {['영상 고르기', '정보 입력', '확인 & 제출'].map((t, i) => (
                <React.Fragment key={t}>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${i === 1 ? (dk ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white') : i < 1 ? (dk ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700') : (dk ? 'bg-neutral-800 text-neutral-600' : 'bg-neutral-100 text-neutral-400')}`}>
                    {i < 1 ? <Check size={12} className="inline" /> : `${i + 1}.`} {t}
                  </span>
                  {i < 2 && <ChevronRight size={14} className={dk ? 'text-neutral-700' : 'text-neutral-300'} />}
                </React.Fragment>
              ))}
            </div>

            {/* 선택한 영상 미리보기 */}
            <div className={`flex gap-2 p-3 rounded-xl overflow-x-auto ${dk ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'}`}>
              {sel.map(it => (
                <div key={it.id} className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${CP[it.color]} relative flex items-center justify-center`} title={`${it.brand}: ${it.title}`}>
                  <span className="text-lg">{CAT_EMOJI[it.category] || '🎬'}</span>
                </div>
              ))}
              <span className={`flex items-center text-xs ml-2 ${dk ? 'text-neutral-500' : 'text-neutral-400'}`}>선택한 참고영상 {sel.length}개</span>
            </div>

            {/* ── 프로젝트 정보 ── */}
            <div className={`p-5 ${crd}`}>
              <h3 className={`text-base font-bold mb-1 ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>어떤 영상을 만들고 싶으세요?</h3>
              <p className={`text-xs mb-4 ${dk ? 'text-neutral-500' : 'text-neutral-400'}`}>
                잘 모르는 항목은 비워두셔도 괜찮아요. 필수(<span className="text-red-500">*</span>) 항목만 채워주세요!
              </p>
              <div className="space-y-3">
                <div>
                  <label className={lbl}>프로젝트 이름 <span className="text-red-500">*</span></label>
                  <input type="text" value={proposal.projectTitle} onChange={e => up({ projectTitle: e.target.value })}
                    placeholder="예: 신제품 런칭 영상, 브랜드 소개 필름..." className={inp} />
                  <Hint text="영상의 이름이에요. 간단하게 적으시면 돼요!" />
                </div>
                <div>
                  <label className={lbl}>간단한 설명</label>
                  <textarea value={proposal.projectDescription} onChange={e => up({ projectDescription: e.target.value })}
                    placeholder="어떤 영상인지 자유롭게 설명해주세요. 목적, 메시지, 분위기 등 편하게 적어주시면 돼요!"
                    rows={3} className={inp + ' resize-none'} />
                  <Hint text="완벽하지 않아도 돼요! 머릿속에 떠오르는 대로 적어주세요." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>카테고리</label>
                    <select value={proposal.category} onChange={e => up({ category: e.target.value as any })} className={inp}>
                      <option value="">잘 모르겠어요</option>
                      {PORTFOLIO_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
                    </select>
                    <Hint text="업종 분야예요. 선택한 영상에서 자동 추천돼요." />
                  </div>
                  <div>
                    <label className={lbl}>콘텐츠 유형</label>
                    <select value={proposal.contentType} onChange={e => up({ contentType: e.target.value as any })} className={inp}>
                      <option value="">잘 모르겠어요</option>
                      {CONTENT_TYPES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <Hint text="제품영상=제품 소개, 숏폼=15~60초 짧은 영상, 브랜드필름=브랜드 스토리" />
                  </div>
                </div>
                <div>
                  <label className={lbl}>어디에 올릴 건가요?</label>
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORM_OPTIONS.map(p => (
                      <button key={p} type="button"
                        onClick={() => up({ platforms: proposal.platforms.includes(p) ? proposal.platforms.filter(x => x !== p) : [...proposal.platforms, p] })}
                        className={chip(proposal.platforms.includes(p))}>{p}</button>
                    ))}
                  </div>
                  <Hint text="여러 개 선택 가능! 영상을 업로드할 채널을 골라주세요." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>분위기 (온도감)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {TONE_OPTIONS.temp.map(t => <button key={t} type="button" onClick={() => up({ tonePref: { ...proposal.tonePref, temp: t } })} className={chip(proposal.tonePref.temp === t)}>{t}</button>)}
                    </div>
                    <Hint text="영상의 전체적인 느낌이에요. 따뜻한=포근, 차가운=세련된" />
                  </div>
                  <div>
                    <label className={lbl}>분위기 (감성)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {TONE_OPTIONS.feel.map(f => <button key={f} type="button" onClick={() => up({ tonePref: { ...proposal.tonePref, feel: f } })} className={chip(proposal.tonePref.feel === f)}>{f}</button>)}
                    </div>
                    <Hint text="밝은=활기찬, 차분한=절제된, 고급스러운=럭셔리한" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={lbl}>타겟</label>
                    <select value={proposal.targetAudience} onChange={e => up({ targetAudience: e.target.value })} className={inp}>
                      <option value="">잘 모르겠어요</option>
                      {TARGET_AUDIENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>목적</label>
                    <select value={proposal.videoPurpose} onChange={e => up({ videoPurpose: e.target.value })} className={inp}>
                      <option value="">잘 모르겠어요</option>
                      {VIDEO_PURPOSE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>길이</label>
                    <select value={proposal.desiredDuration} onChange={e => up({ desiredDuration: e.target.value })} className={inp}>
                      <option value="">잘 모르겠어요</option>
                      {DURATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={lbl}>납품 비율</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DELIVERY_FORMAT_OPTIONS.map(f => (
                      <button key={f} type="button"
                        onClick={() => up({ deliveryFormat: proposal.deliveryFormat.includes(f) ? proposal.deliveryFormat.filter(x => x !== f) : [...proposal.deliveryFormat, f] })}
                        className={chip(proposal.deliveryFormat.includes(f))}>{f}</button>
                    ))}
                  </div>
                  <Hint text="가로형=유튜브, 세로형=릴스/틱톡, 정사각형=인스타 피드" />
                </div>
              </div>
            </div>

            {/* ── 참고 영상 메모 ── */}
            <div className={`p-5 ${crd}`}>
              <h3 className={`text-base font-bold mb-1 ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>선택한 영상의 어떤 점이 좋았나요?</h3>
              <p className={`text-xs mb-4 ${dk ? 'text-neutral-500' : 'text-neutral-400'}`}>안 적어도 괜찮아요! 적으시면 더 정확한 영상을 만들 수 있어요.</p>
              <div className="space-y-3">
                {sel.map(item => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className={`w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br ${CP[item.color]} flex items-center justify-center`}>
                      <span className="text-lg">{CAT_EMOJI[item.category] || '🎬'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold mb-1 ${dk ? 'text-neutral-300' : 'text-neutral-700'}`}>{item.brand} - {item.title}</p>
                      <input type="text"
                        value={proposal.referenceItemNotes[item.id] || ''}
                        onChange={e => up({ referenceItemNotes: { ...proposal.referenceItemNotes, [item.id]: e.target.value } })}
                        placeholder="예: 색감이 좋아요, 편집 속도가 맘에 들어요..."
                        className={inp} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 연락처 & 일정 ── */}
            <div className={`p-5 ${crd}`}>
              <h3 className={`text-base font-bold mb-4 ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>연락처 & 일정</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>이름 <span className="text-red-500">*</span></label>
                    <input type="text" value={proposal.clientName} onChange={e => up({ clientName: e.target.value })} placeholder="홍길동" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>회사/브랜드</label>
                    <input type="text" value={proposal.clientCompany} onChange={e => up({ clientCompany: e.target.value })} placeholder="(선택)" className={inp} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>이메일 <span className="text-red-500">*</span></label>
                    <input type="email" value={proposal.clientEmail} onChange={e => up({ clientEmail: e.target.value })} placeholder="you@example.com" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>연락처</label>
                    <input type="tel" value={proposal.clientPhone} onChange={e => up({ clientPhone: e.target.value })} placeholder="010-0000-0000" className={inp} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={lbl}>촬영 희망일</label>
                    <input type="date" value={proposal.desiredDate} onChange={e => up({ desiredDate: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>납품 기한</label>
                    <input type="date" value={proposal.deadline} onChange={e => up({ deadline: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>예산</label>
                    <select value={proposal.budget} onChange={e => up({ budget: e.target.value })} className={inp}>
                      <option value="">선택</option>
                      {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={lbl}>추가 요청사항</label>
                  <textarea value={proposal.additionalNotes} onChange={e => up({ additionalNotes: e.target.value })}
                    placeholder="특별히 참고하거나 고려할 사항이 있으면 적어주세요 (선택)" rows={2} className={inp + ' resize-none'} />
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => go('step1')} className={`flex items-center gap-1 text-sm ${dk ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-700'}`}>
                <ChevronLeft size={16} /> 영상 다시 고르기
              </button>
              <button
                onClick={() => {
                  if (!proposal.projectTitle.trim()) { alert('프로젝트 이름을 입력해주세요!'); return; }
                  if (!proposal.clientName.trim() || !proposal.clientEmail.trim()) { alert('이름과 이메일은 필수입니다!'); return; }
                  go('step3');
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition ${dk ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-white hover:bg-neutral-900'}`}
              >
                미리보기 <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            STEP 3: 확인 & 제출
            ═══════════════════════════════════ */}
        {page === 'step3' && (
          <div className="space-y-5">
            {/* 스텝 표시 */}
            <div className="flex items-center gap-2 mb-2">
              {['영상 고르기', '정보 입력', '확인 & 제출'].map((t, i) => (
                <React.Fragment key={t}>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${i === 2 ? (dk ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white') : (dk ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700')}`}>
                    {i < 2 ? <Check size={12} className="inline" /> : '3.'} {t}
                  </span>
                  {i < 2 && <ChevronRight size={14} className={dk ? 'text-neutral-700' : 'text-neutral-300'} />}
                </React.Fragment>
              ))}
            </div>

            <h2 className={`text-2xl font-bold ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>기획안 확인</h2>
            <p className={`text-sm ${dk ? 'text-neutral-500' : 'text-neutral-500'}`}>내용을 확인하고 제출해주세요. 수정이 필요하면 이전으로 돌아가시면 돼요!</p>

            {/* 프로젝트 요약 */}
            <div className={`p-5 ${crd}`}>
              <h4 className={`text-sm font-bold mb-3 ${dk ? 'text-neutral-300' : 'text-neutral-800'}`}>프로젝트</h4>
              <div className={`space-y-1.5 text-sm ${dk ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <p><span className="font-semibold">제목:</span> {proposal.projectTitle}</p>
                {proposal.projectDescription && <p><span className="font-semibold">설명:</span> {proposal.projectDescription}</p>}
                <p>
                  <span className="font-semibold">유형:</span> {PORTFOLIO_CATEGORIES.find(c => c.value === proposal.category)?.label || '-'} / {CONTENT_TYPES.find(c => c.value === proposal.contentType)?.label || '-'}
                  {proposal.platforms.length > 0 && <> · <span className="font-semibold">플랫폼:</span> {proposal.platforms.join(', ')}</>}
                </p>
                <p>
                  {proposal.tonePref.temp && <><span className="font-semibold">톤:</span> {proposal.tonePref.temp} {proposal.tonePref.feel}</>}
                  {proposal.targetAudience && <> · <span className="font-semibold">타겟:</span> {proposal.targetAudience}</>}
                  {proposal.desiredDuration && <> · <span className="font-semibold">길이:</span> {proposal.desiredDuration}</>}
                </p>
              </div>
            </div>

            {/* 참고 영상 */}
            <div className={`p-5 ${crd}`}>
              <h4 className={`text-sm font-bold mb-3 ${dk ? 'text-neutral-300' : 'text-neutral-800'}`}>참고 영상 ({sel.length}개)</h4>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {sel.map(item => (
                  <div key={item.id} className="flex-shrink-0 w-28">
                    <div className={`aspect-video rounded-lg bg-gradient-to-br ${CP[item.color]} mb-1 relative flex items-center justify-center`}>
                      <span className="text-2xl">{CAT_EMOJI[item.category] || '🎬'}</span>
                      <span className="absolute bottom-1 right-1 bg-black/50 text-white text-[7px] px-1 rounded">{CT_LABEL[item.contentType] || ''}</span>
                    </div>
                    <p className={`text-[10px] font-bold ${dk ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.brand}</p>
                    <p className={`text-xs line-clamp-1 ${dk ? 'text-neutral-200' : 'text-neutral-800'}`}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 연락처 & 일정 */}
            <div className={`p-5 ${crd}`}>
              <h4 className={`text-sm font-bold mb-3 ${dk ? 'text-neutral-300' : 'text-neutral-800'}`}>연락처 & 일정</h4>
              <div className={`space-y-1.5 text-sm ${dk ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <p><span className="font-semibold">이름:</span> {proposal.clientName} {proposal.clientCompany && `(${proposal.clientCompany})`}</p>
                <p><span className="font-semibold">이메일:</span> {proposal.clientEmail} {proposal.clientPhone && ` · ${proposal.clientPhone}`}</p>
                <p>
                  <span className="font-semibold">촬영:</span> {proposal.desiredDate || '미정'}
                  {' · '}<span className="font-semibold">납품:</span> {proposal.deadline || '미정'}
                  {' · '}<span className="font-semibold">예산:</span> {proposal.budget || '미정'}
                </p>
              </div>
            </div>

            {/* 에러 메시지 */}
            {sendError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {sendError}
              </div>
            )}

            {/* 제출 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => go('step2')} disabled={sending}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition ${dk ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                <ChevronLeft size={16} /> 수정하기
              </button>
              <button onClick={submitEmail} disabled={sending}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${sending ? 'opacity-60 cursor-not-allowed' : ''} ${dk ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-white hover:bg-neutral-900'}`}>
                {sending ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 전송 중...</>
                ) : (
                  <><Mail size={18} /> 기획안 보내기</>
                )}
              </button>
              <button onClick={toStoryboard} disabled={sending}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition ${dk ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                <Sparkles size={16} /> 스토리보드로
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            완료 화면
            ═══════════════════════════════════ */}
        {page === 'done' && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className={`text-center p-10 rounded-2xl max-w-sm ${crd}`}>
              <div className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center ${dk ? 'bg-green-900/30' : 'bg-green-50'}`}>
                <Check size={32} className="text-green-500" />
              </div>
              <h2 className={`text-xl font-bold mb-2 ${dk ? 'text-neutral-100' : 'text-neutral-900'}`}>기획안이 전송되었어요!</h2>
              <p className={`text-sm mb-6 ${dk ? 'text-neutral-400' : 'text-neutral-500'}`}>PEWPEW Studio에서 검토 후 연락드릴게요.</p>
              <button onClick={() => { setPage('intro'); setProposal(createEmptyProposal()); }}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition ${dk ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}`}>
                새 기획안 작성하기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
