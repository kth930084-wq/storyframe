'use client';

import React, { useState, useMemo } from 'react';
import {
  Download,
  X,
  FileText,
  Code,
  Table,
} from 'lucide-react';
import {
  exportToFCPXML,
  exportToEDL,
  exportToCSV,
  downloadFile,
  calculateTotalDuration,
  formatDurationDisplay,
  secondsToTimecode,
} from '@/lib/nle-export';

interface NLEExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenes: Array<{
    id: string;
    title: string;
    duration: number;
    camera_angle?: string;
    shot_size?: string;
    camera_movement?: string;
    description?: string;
    dialogue?: string;
    notes?: string;
    transition?: string;
  }>;
  projectTitle: string;
  darkMode: boolean;
}

type ExportFormat = 'fcpxml' | 'edl' | 'csv';
type FPS = 23.976 | 24 | 25 | 29.97 | 30;

const FPS_OPTIONS: { value: FPS; label: string }[] = [
  { value: 23.976, label: '23.976 fps' },
  { value: 24, label: '24 fps' },
  { value: 25, label: '25 fps' },
  { value: 29.97, label: '29.97 fps' },
  { value: 30, label: '30 fps' },
];

const FORMATS: Array<{
  id: ExportFormat;
  label: string;
  description: string;
  extension: string;
  mimeType: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'fcpxml',
    label: 'FCP XML',
    description: 'Final Cut Pro / DaVinci Resolve',
    extension: 'fcpxml',
    mimeType: 'application/xml',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 'edl',
    label: 'EDL',
    description: 'Premiere Pro / Avid',
    extension: 'edl',
    mimeType: 'text/plain',
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: 'csv',
    label: 'CSV',
    description: '스프레드시트 / 샷리스트',
    extension: 'csv',
    mimeType: 'text/csv',
    icon: <Table className="w-5 h-5" />,
  },
];

export default function NLEExportModal({
  isOpen,
  onClose,
  scenes,
  projectTitle,
  darkMode,
}: NLEExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('fcpxml');
  const [selectedFps, setSelectedFps] = useState<FPS>(24);
  const [isExporting, setIsExporting] = useState(false);

  // Generate preview
  const preview = useMemo(() => {
    if (scenes.length === 0) {
      return '(씬이 없습니다)';
    }

    let content = '';
    try {
      if (selectedFormat === 'fcpxml') {
        content = exportToFCPXML(scenes, projectTitle, selectedFps);
      } else if (selectedFormat === 'edl') {
        content = exportToEDL(scenes, projectTitle, selectedFps);
      } else if (selectedFormat === 'csv') {
        content = exportToCSV(scenes);
      }
    } catch (error) {
      return '(내보내기 생성 중 오류 발생)';
    }

    // Return first 15 lines
    return content.split('\n').slice(0, 15).join('\n');
  }, [scenes, selectedFormat, selectedFps, projectTitle]);

  // Calculate total duration
  const totalSeconds = useMemo(() => {
    return calculateTotalDuration(scenes);
  }, [scenes]);

  const totalDurationDisplay = formatDurationDisplay(totalSeconds);

  // Get format info
  const currentFormat = FORMATS.find(f => f.id === selectedFormat);

  const handleExport = async () => {
    if (scenes.length === 0) {
      alert('내보낼 씬이 없습니다.');
      return;
    }

    setIsExporting(true);
    try {
      let content = '';
      let filename = '';

      if (selectedFormat === 'fcpxml') {
        content = exportToFCPXML(scenes, projectTitle, selectedFps);
        filename = `${projectTitle}.fcpxml`;
      } else if (selectedFormat === 'edl') {
        content = exportToEDL(scenes, projectTitle, selectedFps);
        filename = `${projectTitle}.edl`;
      } else if (selectedFormat === 'csv') {
        content = exportToCSV(scenes);
        filename = `${projectTitle}.csv`;
      }

      const mimeType = currentFormat?.mimeType || 'text/plain';
      downloadFile(content, filename, mimeType);

      // Close modal after successful download
      setTimeout(() => {
        onClose();
        setIsExporting(false);
      }, 500);
    } catch (error) {
      console.error('Export failed:', error);
      alert('내보내기에 실패했습니다.');
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  const bg = darkMode ? 'bg-neutral-900' : 'bg-white';
  const border = darkMode ? 'border-neutral-700' : 'border-neutral-200';
  const text = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const subText = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const cardBg = darkMode ? 'bg-neutral-800' : 'bg-neutral-50';
  const previewBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-100';

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`${bg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${text}`}>NLE 타임라인 내보내기</h2>
              <p className={`text-xs ${subText}`}>
                편집 소프트웨어로 사용할 수 있는 형식으로 내보냅니다
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
            } transition`}
          >
            <X className={`w-5 h-5 ${subText}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {/* Format Selection */}
            <div>
              <label className={`block text-sm font-semibold ${text} mb-3`}>
                내보내기 형식
              </label>
              <div className="grid grid-cols-3 gap-3">
                {FORMATS.map(format => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedFormat === format.id
                        ? darkMode
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-blue-500 bg-blue-50'
                        : darkMode
                          ? 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div
                      className={`${
                        selectedFormat === format.id
                          ? 'text-blue-600'
                          : subText
                      } mb-2 flex justify-center`}
                    >
                      {format.icon}
                    </div>
                    <div className={`text-sm font-semibold ${text} leading-tight`}>
                      {format.label}
                    </div>
                    <div
                      className={`text-xs ${subText} mt-1 leading-tight`}
                    >
                      {format.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* FPS Selection */}
            <div>
              <label className={`block text-sm font-semibold ${text} mb-3`}>
                프레임레이트 (FPS)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {FPS_OPTIONS.map(fps => (
                  <button
                    key={fps.value}
                    onClick={() => setSelectedFps(fps.value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                      selectedFps === fps.value
                        ? 'bg-blue-600 text-white'
                        : darkMode
                          ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {fps.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className={`block text-sm font-semibold ${text} mb-2`}>
                미리보기
              </label>
              <div
                className={`${previewBg} rounded-lg p-4 font-mono text-xs leading-relaxed max-h-48 overflow-auto border ${border}`}
              >
                <pre className={subText} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {preview}
                </pre>
              </div>
            </div>

            {/* Info */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg ${cardBg} border ${border}`}
            >
              <div>
                <p className={`text-sm font-semibold ${text}`}>
                  총 {scenes.length}개 씬
                </p>
                <p className={`text-sm ${subText}`}>
                  총 시간: {totalDurationDisplay}
                </p>
              </div>
              <div className={`text-2xl font-bold ${text}`}>
                {scenes.length}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${border} flex items-center justify-between`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              darkMode
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            취소
          </button>
          <button
            onClick={handleExport}
            disabled={scenes.length === 0 || isExporting}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition ${
              scenes.length > 0 && !isExporting
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            {isExporting ? '내보내는 중...' : '내보내기'}
          </button>
        </div>
      </div>
    </div>
  );
}
