'use client';

import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

export interface BrandConfig {
  studioName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  watermarkText: string;
  watermarkOpacity: number;
  showWatermarkOnPDF: boolean;
  showWatermarkOnShare: boolean;
}

interface BrandSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  brandConfig: BrandConfig;
  onSave: (config: BrandConfig) => void;
}

export const BrandSettings: React.FC<BrandSettingsProps> = ({
  isOpen,
  onClose,
  darkMode,
  brandConfig,
  onSave,
}) => {
  const [config, setConfig] = useState<BrandConfig>(brandConfig);
  const [saving, setSaving] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = <K extends keyof BrandConfig>(
    key: K,
    value: BrandConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        handleChange('logoUrl', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      onSave(config);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setConfig(brandConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className={`${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } rounded-lg shadow-xl w-full max-w-md mx-4 my-8 p-6`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">브랜드 설정</h2>
          <button
            onClick={handleCancel}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? 'hover:bg-gray-800'
                : 'hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
          {/* Studio Name */}
          <div>
            <label
              className={`text-sm font-semibold block mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              스튜디오 이름
            </label>
            <input
              type="text"
              value={config.studioName}
              onChange={(e) => handleChange('studioName', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border transition outline-none ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="PEWPEW STUDIO"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label
              className={`text-sm font-semibold block mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              로고
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => logoInputRef.current?.click()}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                <Upload size={16} />
                <span className="text-sm">파일 선택</span>
              </button>
              {config.logoUrl && (
                <button
                  onClick={() => handleChange('logoUrl', '')}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition"
                >
                  삭제
                </button>
              )}
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            {config.logoUrl && (
              <div
                className={`mt-2 p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <img
                  src={config.logoUrl}
                  alt="Logo Preview"
                  className="h-16 object-contain"
                />
              </div>
            )}
          </div>

          {/* Primary Color */}
          <div>
            <label
              className={`text-sm font-semibold block mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              주요 색상
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-16 h-10 rounded-lg cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg border transition outline-none text-sm ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label
              className={`text-sm font-semibold block mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              보조 색상
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-16 h-10 rounded-lg cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={config.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg border transition outline-none text-sm ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Watermark Text */}
          <div>
            <label
              className={`text-sm font-semibold block mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              워터마크 텍스트
            </label>
            <input
              type="text"
              value={config.watermarkText}
              onChange={(e) => handleChange('watermarkText', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border transition outline-none text-sm ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="PEWPEW STUDIO"
            />
          </div>

          {/* Watermark Opacity */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                className={`text-sm font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                워터마크 투명도
              </label>
              <span
                className={`text-sm font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {config.watermarkOpacity}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.watermarkOpacity}
              onChange={(e) =>
                handleChange('watermarkOpacity', Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Watermark Preview */}
          <div
            className={`p-4 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}
          >
            <p
              className={`text-xs font-semibold mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              워터마크 미리보기
            </p>
            <div
              className={`h-24 rounded flex items-center justify-center border-2 border-dashed ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              }`}
              style={{
                color: config.primaryColor,
                opacity: 1,
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  opacity: config.watermarkOpacity / 100,
                  color: config.primaryColor,
                }}
              >
                {config.watermarkText}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showWatermarkOnPDF}
                onChange={(e) =>
                  handleChange('showWatermarkOnPDF', e.target.checked)
                }
                className="w-4 h-4 rounded"
              />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                PDF 내보내기에 워터마크 표시
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showWatermarkOnShare}
                onChange={(e) =>
                  handleChange('showWatermarkOnShare', e.target.checked)
                }
                className="w-4 h-4 rounded"
              />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                공유 링크에 워터마크 표시
              </span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={handleCancel}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition text-white ${
              saving ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandSettings;
