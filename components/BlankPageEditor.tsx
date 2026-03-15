'use client';

import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface BlankPageType {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const BLANK_PAGE_TYPES: BlankPageType[] = [
  {
    id: 'scene-divider',
    label: '씬 구분',
    description: '장면 사이의 구분 타이틀 카드',
    icon: '📋',
  },
  {
    id: 'free-memo',
    label: '자유 메모',
    description: '텍스트 기반의 노트 작성 공간',
    icon: '📝',
  },
  {
    id: 'sketch-canvas',
    label: '직접 그리기',
    description: '이미지 업로드 또는 스케치 캔버스',
    icon: '🎨',
  },
  {
    id: 'image-upload',
    label: '이미지 업로드',
    description: '이미지 파일 전용 업로드 페이지',
    icon: '🖼️',
  },
];

interface BlankPageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (typeId: string) => void;
}

export const BlankPageEditor: React.FC<BlankPageEditorProps> = ({
  isOpen,
  onClose,
  onSelectType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">빈 페이지 추가</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-gray-600 mb-6">추가할 빈 페이지의 유형을 선택하세요.</p>

          <div className="grid grid-cols-2 gap-4">
            {BLANK_PAGE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  onSelectType(type.id);
                  onClose();
                }}
                className="flex flex-col items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="text-3xl">{type.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

interface BlankPageContentProps {
  type: string;
  content: {
    text?: string;
    imageUrl?: string;
    memo?: string;
  };
  onChange: (content: any) => void;
}

export const BlankPageContent: React.FC<BlankPageContentProps> = ({
  type,
  content,
  onChange,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(content.imageUrl || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      onChange({ ...content, imageUrl: result });
    };
    reader.readAsDataURL(file);
  };

  switch (type) {
    case 'scene-divider':
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="씬 제목 입력..."
              value={content.text || ''}
              onChange={(e) => onChange({ ...content, text: e.target.value })}
              className="w-full text-4xl font-bold text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-4 placeholder-gray-400"
            />
            <p className="text-center text-gray-400 text-sm mt-4">
              여기에 씬 제목이나 구분 텍스트를 입력하세요
            </p>
          </div>
        </div>
      );

    case 'free-memo':
      return (
        <div className="flex-1 flex flex-col p-6">
          <textarea
            placeholder="자유롭게 메모를 작성하세요..."
            value={content.memo || ''}
            onChange={(e) => onChange({ ...content, memo: e.target.value })}
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-2">
            마크다운 포맷을 지원합니다
          </p>
        </div>
      );

    case 'sketch-canvas':
      return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-6xl">🎨</div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">스케치 캔버스</h3>
            <p className="text-sm text-gray-600 mb-4">
              이미지를 업로드하거나 직접 스케치할 수 있습니다
            </p>
            {imagePreview ? (
              <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden max-w-md">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto"
                />
              </div>
            ) : null}
          </div>
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            <Upload size={18} />
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      );

    case 'image-upload':
      return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          {imagePreview ? (
            <div className="w-full max-w-2xl border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto"
              />
              <div className="p-4 bg-gray-50 flex gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                  <Upload size={18} />
                  다른 이미지 선택
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-4">
              <div className="text-6xl">🖼️</div>
              <p className="text-gray-600">클릭하여 이미지를 선택하세요</p>
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                <Upload size={18} />
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};

export const getBlankPageTypeLabel = (typeId: string): string => {
  const type = BLANK_PAGE_TYPES.find(t => t.id === typeId);
  return type?.label || typeId;
};
