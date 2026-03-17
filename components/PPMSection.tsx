'use client';

import React, { useState, useCallback } from 'react';
import {
  FileText, Palette, Eye, BookOpen, Users, ChevronDown, ChevronRight,
  Plus, X, Upload, Link as LinkIcon, Image
} from 'lucide-react';

// ========== PPM 데이터 인터페이스 ==========
export interface PPMData {
  // 프로젝트 개요
  overview?: {
    project_name?: string;
    client?: string;
    production_company?: string;
    date?: string;
    version?: string;
  };
  // 크리에이티브 방향
  creative?: {
    tone_and_manner?: string;
    keywords?: string[];
    metaphor?: string;
    core_message?: string;
  };
  // 비주얼 가이드
  visual?: {
    key_colors?: string[];
    moodboard_images?: string[];
    reference_links?: string[];
  };
  // 시놉시스
  synopsis?: string;
  // 타겟 오디언스
  target?: {
    audience?: string;
    platform?: string;
    media?: string;
  };
}

export const defaultPPMData: PPMData = {
  overview: {},
  creative: { keywords: [], tone_and_manner: '' },
  visual: { key_colors: ['#000000', '#FFFFFF'], moodboard_images: [], reference_links: [] },
  synopsis: '',
  target: {},
};

// ========== 접기/펴기 섹션 래퍼 ==========
const CollapsibleSection = ({
  title, icon, darkMode, defaultOpen = true, children, badge
}: {
  title: string; icon: React.ReactNode; darkMode: boolean; defaultOpen?: boolean; children: React.ReactNode; badge?: string;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-2xl border transition-all ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-gray-100'}`}>
      <button onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 text-left ${darkMode ? 'hover:bg-neutral-750' : 'hover:bg-gray-50'} rounded-2xl transition`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-neutral-700' : 'bg-gray-100'}`}>
            {icon}
          </div>
          <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</span>
          {badge && <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-gray-100 text-gray-500'}`}>{badge}</span>}
        </div>
        {open ? <ChevronDown size={16} className={darkMode ? 'text-neutral-500' : 'text-gray-400'} /> : <ChevronRight size={16} className={darkMode ? 'text-neutral-500' : 'text-gray-400'} />}
      </button>
      {open && <div className="px-5 pb-5 pt-0">{children}</div>}
    </div>
  );
};

// ========== PPM 메인 컴포넌트 ==========
export default function PPMSection({
  ppmData, onUpdate, darkMode, projectTitle
}: {
  ppmData: PPMData;
  onUpdate: (data: PPMData) => void;
  darkMode: boolean;
  projectTitle?: string;
}) {
  const data = { ...defaultPPMData, ...ppmData };

  const inputCls = darkMode
    ? 'bg-neutral-700 text-white border-neutral-600 placeholder-neutral-500 focus:ring-neutral-400'
    : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:ring-neutral-500';
  const labelCls = darkMode ? 'text-neutral-400' : 'text-gray-500';

  const updateField = useCallback((section: keyof PPMData, field: string, value: any) => {
    if (section === 'synopsis') {
      onUpdate({ ...data, synopsis: value });
    } else {
      onUpdate({
        ...data,
        [section]: { ...(data[section] as any), [field]: value },
      });
    }
  }, [data, onUpdate]);

  // 키워드 추가/삭제
  const [newKeyword, setNewKeyword] = useState('');
  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    const current = data.creative?.keywords || [];
    updateField('creative', 'keywords', [...current, newKeyword.trim()]);
    setNewKeyword('');
  };
  const removeKeyword = (idx: number) => {
    const current = [...(data.creative?.keywords || [])];
    current.splice(idx, 1);
    updateField('creative', 'keywords', current);
  };

  // 컬러 추가/삭제
  const addColor = () => {
    const current = data.visual?.key_colors || [];
    updateField('visual', 'key_colors', [...current, '#888888']);
  };
  const updateColor = (idx: number, color: string) => {
    const current = [...(data.visual?.key_colors || [])];
    current[idx] = color;
    updateField('visual', 'key_colors', current);
  };
  const removeColor = (idx: number) => {
    const current = [...(data.visual?.key_colors || [])];
    current.splice(idx, 1);
    updateField('visual', 'key_colors', current);
  };

  // 레퍼런스 링크 추가/삭제
  const [newLink, setNewLink] = useState('');
  const addLink = () => {
    if (!newLink.trim()) return;
    const current = data.visual?.reference_links || [];
    updateField('visual', 'reference_links', [...current, newLink.trim()]);
    setNewLink('');
  };
  const removeLink = (idx: number) => {
    const current = [...(data.visual?.reference_links || [])];
    current.splice(idx, 1);
    updateField('visual', 'reference_links', current);
  };

  // 무드보드 이미지 업로드
  const handleMoodboardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const current = data.visual?.moodboard_images || [];
        updateField('visual', 'moodboard_images', [...current, url]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };
  const removeMoodboard = (idx: number) => {
    const current = [...(data.visual?.moodboard_images || [])];
    current.splice(idx, 1);
    updateField('visual', 'moodboard_images', current);
  };

  return (
    <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                PPM
              </span>
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              사전 제작 미팅 자료
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
              톤앤매너, 비주얼 가이드, 시놉시스 등 PPM 발표 자료를 구성하세요
            </p>
          </div>
        </div>

        {/* 1. 프로젝트 개요 */}
        <CollapsibleSection title="프로젝트 개요" icon={<FileText size={16} className={darkMode ? 'text-neutral-300' : 'text-gray-600'} />} darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>프로젝트명</label>
              <input type="text" value={data.overview?.project_name || projectTitle || ''} onChange={(e) => updateField('overview', 'project_name', e.target.value)}
                placeholder="프로젝트 이름" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>클라이언트</label>
              <input type="text" value={data.overview?.client || ''} onChange={(e) => updateField('overview', 'client', e.target.value)}
                placeholder="예: 삼성전자 마케팅팀" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>제작사</label>
              <input type="text" value={data.overview?.production_company || ''} onChange={(e) => updateField('overview', 'production_company', e.target.value)}
                placeholder="예: PEWPEW Studio" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>날짜</label>
              <input type="date" value={data.overview?.date || ''} onChange={(e) => updateField('overview', 'date', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>버전</label>
              <input type="text" value={data.overview?.version || ''} onChange={(e) => updateField('overview', 'version', e.target.value)}
                placeholder="v1.0" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. 크리에이티브 방향 */}
        <CollapsibleSection title="크리에이티브 방향" icon={<Palette size={16} className={darkMode ? 'text-neutral-300' : 'text-gray-600'} />} darkMode={darkMode}>
          <div className="space-y-5">
            {/* 톤앤매너 */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>톤 & 매너</label>
              <textarea value={data.creative?.tone_and_manner || ''} onChange={(e) => updateField('creative', 'tone_and_manner', e.target.value)}
                rows={3} placeholder="예: 따뜻하고 감성적인 톤. 자연스러운 일상 속에서 브랜드 가치를 전달. 과하지 않은 세련된 무드."
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition resize-none ${inputCls}`} />
            </div>

            {/* 키워드 */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>키워드</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(data.creative?.keywords || []).map((kw, i) => (
                  <span key={i} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${darkMode ? 'bg-neutral-700 text-neutral-200' : 'bg-gray-100 text-gray-700'}`}>
                    {kw}
                    <button onClick={() => removeKeyword(i)} className="hover:text-red-400 transition"><X size={12} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  placeholder="키워드 입력 후 Enter" className={`flex-1 px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
                <button onClick={addKeyword} className={`px-3 py-2 rounded-xl text-xs font-medium transition ${darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* 메타포 */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>메타포 / 컨셉</label>
              <input type="text" value={data.creative?.metaphor || ''} onChange={(e) => updateField('creative', 'metaphor', e.target.value)}
                placeholder="예: '일상 속 작은 쉼표' - 커피 한 잔의 여유처럼 자연스러운 브랜드 경험"
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>

            {/* 핵심 메시지 */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>핵심 메시지</label>
              <input type="text" value={data.creative?.core_message || ''} onChange={(e) => updateField('creative', 'core_message', e.target.value)}
                placeholder="예: 당신의 하루를 특별하게 만드는 순간" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
          </div>
        </CollapsibleSection>

        {/* 3. 비주얼 가이드 */}
        <CollapsibleSection title="비주얼 가이드" icon={<Eye size={16} className={darkMode ? 'text-neutral-300' : 'text-gray-600'} />} darkMode={darkMode}
          badge={`컬러 ${(data.visual?.key_colors || []).length}개`}>
          <div className="space-y-5">
            {/* 키 컬러 팔레트 */}
            <div>
              <label className={`block text-xs font-semibold mb-2 ${labelCls}`}>키 컬러 팔레트</label>
              <div className="flex flex-wrap items-center gap-3">
                {(data.visual?.key_colors || []).map((color, i) => (
                  <div key={i} className="relative group">
                    <input type="color" value={color} onChange={(e) => updateColor(i, e.target.value)}
                      className="w-12 h-12 rounded-xl cursor-pointer border-2 border-transparent hover:border-gray-300 transition" />
                    <button onClick={() => removeColor(i)}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <X size={10} />
                    </button>
                    <p className={`text-[10px] text-center mt-1 font-mono ${labelCls}`}>{color}</p>
                  </div>
                ))}
                <button onClick={addColor}
                  className={`w-12 h-12 rounded-xl border-2 border-dashed flex items-center justify-center transition ${darkMode ? 'border-neutral-600 hover:border-neutral-500 text-neutral-500' : 'border-gray-300 hover:border-gray-400 text-gray-400'}`}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* 무드보드 */}
            <div>
              <label className={`block text-xs font-semibold mb-2 ${labelCls}`}>무드보드</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {(data.visual?.moodboard_images || []).map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
                    <img src={img} alt={`mood-${i}`} className="w-full h-full object-cover" />
                    <button onClick={() => removeMoodboard(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <X size={10} />
                    </button>
                  </div>
                ))}
                <label className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition ${darkMode ? 'border-neutral-600 hover:border-neutral-500 text-neutral-500' : 'border-gray-300 hover:border-gray-400 text-gray-400'}`}>
                  <Image size={20} />
                  <span className="text-[10px] mt-1">업로드</span>
                  <input type="file" accept="image/*" multiple onChange={handleMoodboardUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* 레퍼런스 영상 링크 */}
            <div>
              <label className={`block text-xs font-semibold mb-2 ${labelCls}`}>레퍼런스 영상</label>
              <div className="space-y-2 mb-2">
                {(data.visual?.reference_links || []).map((link, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${darkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>
                    <LinkIcon size={13} className="flex-shrink-0" />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="truncate hover:underline flex-1">{link}</a>
                    <button onClick={() => removeLink(i)} className="hover:text-red-400 flex-shrink-0"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newLink} onChange={(e) => setNewLink(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                  placeholder="유튜브/비메오 URL 입력 후 Enter" className={`flex-1 px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
                <button onClick={addLink} className={`px-3 py-2 rounded-xl text-xs font-medium transition ${darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 4. 시놉시스 */}
        <CollapsibleSection title="시놉시스" icon={<BookOpen size={16} className={darkMode ? 'text-neutral-300' : 'text-gray-600'} />} darkMode={darkMode}>
          <div>
            <textarea value={data.synopsis || ''} onChange={(e) => onUpdate({ ...data, synopsis: e.target.value })}
              rows={8} placeholder="영상의 전체 스토리를 서술형으로 작성하세요.&#10;&#10;예:&#10;새벽 5시, 아직 어두운 도시의 전경으로 시작한다. 고요한 거리 위로 한 줄기 빛이 비치며, 카메라는 천천히 한 카페의 문을 향해 다가간다..."
              className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition resize-none leading-relaxed ${inputCls}`} />
            <p className={`text-[11px] mt-2 ${labelCls}`}>
              {(data.synopsis || '').length}자 작성됨
            </p>
          </div>
        </CollapsibleSection>

        {/* 5. 타겟 오디언스 */}
        <CollapsibleSection title="타겟 오디언스" icon={<Users size={16} className={darkMode ? 'text-neutral-300' : 'text-gray-600'} />} darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>타겟층</label>
              <textarea value={data.target?.audience || ''} onChange={(e) => updateField('target', 'audience', e.target.value)}
                rows={2} placeholder="예: 25~35세 여성, 라이프스타일에 관심이 많고 프리미엄 제품을 선호하는 소비자"
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition resize-none ${inputCls}`} />
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>매체 / 플랫폼</label>
              <input type="text" value={data.target?.platform || ''} onChange={(e) => updateField('target', 'platform', e.target.value)}
                placeholder="예: 유튜브, 인스타그램 릴스" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>집행 매체</label>
              <input type="text" value={data.target?.media || ''} onChange={(e) => updateField('target', 'media', e.target.value)}
                placeholder="예: 디지털 광고, TV CF, OTT 프리롤" className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
