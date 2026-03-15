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

  const bg = darkMode ? 'bg-neutral-900' : 'bg-white';
  const border = darkMode ? 'border-neutral-700' : 'border-neutral-200';
  const text = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const subText = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const cardBg = darkMode ? 'bg-neutral-800' : 'bg-neutral-50';
  const hoverBg = darkMode ? 'hover:bg-neutral-750' : 'hover:bg-neutral-100';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`${bg} rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col`} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${text}`}>PDF 내보내기</h2>
              <p className={`text-xs ${subText}`}>포함할 페이지를 선택하고 순서를 조정하세요</p>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} transition`}>
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
              className={`text-xs px-2.5 py-1 rounded-lg transition ${darkMode ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
            >
              전체 선택
            </button>
            <button
              onClick={() => toggleAll(false)}
              className={`text-xs px-2.5 py-1 rounded-lg transition ${darkMode ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
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
                  ? darkMode ? 'border-neutral-600 bg-neutral-800' : 'border-neutral-300 bg-white'
                  : darkMode ? 'border-neutral-800 bg-neutral-900 opacity-50' : 'border-neutral-100 bg-neutral-50 opacity-50'
              }`}
            >
              {/* Reorder Buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveUp(index)}
                  className={`p-0.5 rounded ${index === 0 ? 'opacity-20 cursor-default' : `${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'}`}`}
                  disabled={index === 0}
                >
                  <ChevronUp className={`w-3.5 h-3.5 ${subText}`} />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  className={`p-0.5 rounded ${index === pages.length - 1 ? 'opacity-20 cursor-default' : `${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'}`}`}
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
                    : darkMode ? 'bg-neutral-700' : 'bg-neutral-300'
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
                darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-500'
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
              darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            취소
          </button>
          <button
            onClick={handleExport}
            disabled={enabledCount === 0}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition ${
              enabledCount > 0
                ? 'bg-neutral-800 text-white hover:bg-neutral-900'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
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
