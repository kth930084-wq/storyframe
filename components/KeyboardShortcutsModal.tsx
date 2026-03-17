'use client';

import React from 'react';
import { X } from 'lucide-react';

interface Shortcut {
  key: string;
  description: string;
}

interface ShortcutCategory {
  name: string;
  shortcuts: Shortcut[];
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  if (!isOpen) return null;

  const shortcutCategories: ShortcutCategory[] = [
    {
      name: '일반',
      shortcuts: [
        { key: 'Ctrl+S', description: '저장' },
        { key: 'Ctrl+Z', description: '취소' },
        { key: 'Ctrl+Shift+Z', description: '다시실행' },
      ],
    },
    {
      name: '씬 관리',
      shortcuts: [
        { key: 'Ctrl+N', description: '새씬' },
        { key: 'Ctrl+D', description: '복제' },
        { key: 'Delete', description: '삭제' },
      ],
    },
    {
      name: '뷰 모드',
      shortcuts: [
        { key: 'Ctrl+1', description: '그리드' },
        { key: 'Ctrl+2', description: '타임라인' },
        { key: 'Ctrl+3', description: '슬라이드' },
      ],
    },
    {
      name: '도구',
      shortcuts: [
        { key: 'V', description: '선택' },
        { key: 'T', description: '텍스트' },
        { key: 'R', description: '사각형' },
        { key: 'A', description: '화살표' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className={`${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8 p-6`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">키보드 단축키</h2>
            <p
              className={`text-sm mt-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              PEWPEW Storyboard의 모든 단축키를 확인하세요
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition flex-shrink-0 ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-y-auto pr-2">
          {shortcutCategories.map((category, idx) => (
            <div key={idx}>
              <h3
                className={`text-sm font-bold mb-3 uppercase tracking-wider ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.shortcuts.map((shortcut, shortcutIdx) => (
                  <div
                    key={shortcutIdx}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {shortcut.description}
                    </span>
                    <kbd
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        darkMode
                          ? 'bg-gray-700 text-gray-200 border border-gray-600'
                          : 'bg-white text-gray-800 border border-gray-300'
                      }`}
                    >
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div
          className={`mt-6 p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <p
            className={`text-xs font-semibold mb-1 ${
              darkMode ? 'text-blue-400' : 'text-blue-700'
            }`}
          >
            팁
          </p>
          <p
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-blue-600'
            }`}
          >
            Mac에서는 Cmd 키를 Ctrl 대신 사용하세요. 단축키는 포커스된 요소에 따라 작동하지 않을 수 있습니다.
          </p>
        </div>

        {/* Close Button */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className={`w-full py-2 px-4 rounded-lg font-medium transition ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
