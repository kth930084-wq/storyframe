'use client';

import React, { useState } from 'react';
import { Download, X, Eye, EyeOff, GripVertical, FileText, ChevronUp, ChevronDown } from 'lucide-react';

interface PDFPageOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface PDFExportModalProps {
  project: any;
  darkMode: boolean;
  onClose: () => void;
  onExport: (enabledPages: string[]) => void;
  budgetData?: {
    items: { name: string; quantity: number; unitLabel: string; unitCost: number }[];
    taxRate: number;
  } | null;
}

export default function PDFExportModal({ project, darkMode, onClose, onExport, budgetData }: PDFExportModalProps) {
  const sceneCount = project?.scenes?.length || 0;

  const [pages, setPages] = useState<PDFPageOption[]>([
    { id: 'cover', label: '표지', description: '프로젝트 제목, 브랜드, 제작사 정보', enabled: true },
    { id: 'overview', label: '프로젝트 개요', description: '프로젝트 설정, 타임라인, 씬 요약 테이블', enabled: true },
    { id: 'storyboard-grid', label: '스토리보드 전체보기', description: `${sceneCount}개 씬 카드 그리드 보기`, enabled: true },
    { id: 'scene-details', label: '씬 상세 페이지', description: `각 씬별 이미지, 설명, 기술 정보 (${sceneCount}페이지)`, enabled: true },
    { id: 'ppm', label: 'PPM (사전제작회의)', description: '크리에이티브 방향, 비주얼 가이드, 시놉시스, 타겟', enabled: !!(project?.ppm_enabled) },
    { id: 'timetable', label: '타임테이블', description: '촬영 스케줄 및 일정표', enabled: !!(project?.timetable && project.timetable.length > 0) },
    { id: 'budget', label: '예산 견적서', description: '항목별 비용 내역 및 총합계', enabled: true },
  ]);

  const togglePage = (id: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const toggleAll = (enabled: boolean) => {
    setPages(prev => prev.map(p => ({ ...p, enabled })));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setPages(prev => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    if (index >= pages.length - 1) return;
    setPages(prev => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const enabledCount = pages.filter(p => p.enabled).length;
  const estimatedPages = pages.reduce((sum, p) => {
    if (!p.enabled) return sum;
    if (p.id === 'scene-details') return sum + sceneCount;
    return sum + 1;
  }, 0);

  const handleExport = () => {
    const enabledPageIds = pages.filter(p => p.enabled).map(p => p.id);
    onExport(enabledPageIds);
  };

  const bg = darkMode ? 'bg-md-surface-container-low' : 'bg-white';
  const border = darkMode ? 'border-white/5' : 'border-md-light-outline-variant/20';
  const text = darkMode ? 'text-white' : 'text-md-light-on-surface';
  const subText = darkMode ? 'text-md-outline' : 'text-md-light-on-surface-variant';
  const cardBg = darkMode ? 'bg-md-surface-container' : 'bg-md-light-surface-container-high';
  const hoverBg = darkMode ? 'hover:bg-md-surface-container-high' : 'hover:bg-md-light-surface-container-highest';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`${bg} rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col`} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-md-surface-container rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${text}`}>PDF 내보내기</h2>
              <p className={`text-xs ${subText}`}>포함할 페이지를 선택하고 순서를 조정하세요</p>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-md-surface-container' : 'hover:bg-md-light-surface-container-high'} transition`}>
            <X className={`w-5 h-5 ${subText}`} />
          </button>
        </div>

        {/* Toggle All */}
        <div className={`px-6 py-3 border-b ${border} flex items-center justify-between`}>
          <span className={`text-sm font-medium ${text}`}>
            {enabledCount}/{pages.length}개 섹션 선택됨 · 약 {estimatedPages}페이지
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => toggleAll(true)}
              className={`text-xs px-2.5 py-1 rounded-lg transition ${darkMode ? 'bg-md-surface-container-high text-md-on-surface-variant hover:bg-md-surface-bright' : 'bg-md-light-surface-container-high text-md-light-on-surface-variant hover:bg-md-light-surface-container-highest'}`}
            >
              전체 선택
            </button>
            <button
              onClick={() => toggleAll(false)}
              className={`text-xs px-2.5 py-1 rounded-lg transition ${darkMode ? 'bg-md-surface-container-high text-md-on-surface-variant hover:bg-md-surface-bright' : 'bg-md-light-surface-container-high text-md-light-on-surface-variant hover:bg-md-light-surface-container-highest'}`}
            >
              전체 해제
            </button>
          </div>
        </div>

        {/* Page List */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-2">
          {pages.map((page, index) => (
            <div
              key={page.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                page.enabled
                  ? darkMode ? 'border-white/10 bg-md-surface-container' : 'border-md-light-outline-variant/30 bg-white'
                  : darkMode ? 'border-white/5 bg-md-surface-container-low opacity-50' : 'border-md-light-outline-variant/20 bg-md-light-surface-container-high opacity-50'
              }`}
            >
              {/* Reorder Buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveUp(index)}
                  className={`p-0.5 rounded ${index === 0 ? 'opacity-20 cursor-default' : `${darkMode ? 'hover:bg-md-surface-container-high' : 'hover:bg-md-light-surface-container-highest'}`}`}
                  disabled={index === 0}
                >
                  <ChevronUp className={`w-3.5 h-3.5 ${subText}`} />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  className={`p-0.5 rounded ${index === pages.length - 1 ? 'opacity-20 cursor-default' : `${darkMode ? 'hover:bg-md-surface-container-high' : 'hover:bg-md-light-surface-container-highest'}`}`}
                  disabled={index === pages.length - 1}
                >
                  <ChevronDown className={`w-3.5 h-3.5 ${subText}`} />
                </button>
              </div>

              {/* Toggle */}
              <button
                onClick={() => togglePage(page.id)}
                className={`flex-shrink-0 w-10 h-6 rounded-full transition-colors relative ${
                  page.enabled
                    ? 'bg-blue-600'
                    : darkMode ? 'bg-md-surface-container-high' : 'bg-md-light-surface-container-highest'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  page.enabled ? 'translate-x-4.5 left-[1px]' : 'translate-x-0.5 left-0'
                }`} style={{ transform: page.enabled ? 'translateX(17px)' : 'translateX(2px)' }} />
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${text}`}>{page.label}</div>
                <div className={`text-xs ${subText} truncate`}>{page.description}</div>
              </div>

              {/* Page Count Badge */}
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                darkMode ? 'bg-md-surface-container-high text-md-outline' : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant'
              }`}>
                {page.id === 'scene-details' ? `${sceneCount}p` : '1p'}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${border} flex items-center justify-between`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              darkMode ? 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-container-high' : 'bg-md-light-surface-container-high text-md-light-on-surface-variant hover:bg-md-light-surface-container-highest'
            }`}
          >
            취소
          </button>
          <button
            onClick={handleExport}
            disabled={enabledCount === 0}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition ${
              enabledCount > 0
                ? 'bg-md-surface-container text-white hover:bg-md-surface-container-low'
                : 'bg-md-light-surface-container-highest text-md-light-on-surface-variant cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            PDF 내보내기 ({estimatedPages}페이지)
          </button>
        </div>
      </div>
    </div>
  );
}
