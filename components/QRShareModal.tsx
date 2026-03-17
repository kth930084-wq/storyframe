'use client';

import React, { useState, useRef } from 'react';
import { X, Copy, Download } from 'lucide-react';

interface QRShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  projectTitle: string;
  darkMode: boolean;
}

export const QRShareModal: React.FC<QRShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl,
  projectTitle,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const qrImageRef = useRef<HTMLImageElement>(null);

  if (!isOpen) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };

  const handleDownloadQR = async () => {
    setDownloading(true);
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectTitle}-QR.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('QR 코드 다운로드 실패:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } rounded-lg shadow-xl w-full max-w-md mx-4 p-6`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">QR 코드 공유</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? 'hover:bg-gray-800'
                : 'hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Instruction Text */}
        <p
          className={`text-sm mb-6 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          현장 스태프에게 이 QR 코드를 보여주면 스마트폰으로 콘티를 바로 확인할 수 있습니다.
        </p>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <img
              ref={qrImageRef}
              src={qrCodeUrl}
              alt="QR Code"
              className="w-64 h-64"
            />
          </div>
        </div>

        {/* URL Display */}
        <div className="mb-6">
          <label
            className={`text-xs font-semibold mb-2 block ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            공유 URL
          </label>
          <div
            className={`flex items-center gap-2 p-3 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <input
              type="text"
              value={shareUrl}
              readOnly
              className={`flex-1 text-sm bg-transparent outline-none ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCopyUrl}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <Copy size={18} />
            <span>{copied ? '복사됨' : 'URL 복사'}</span>
          </button>
          <button
            onClick={handleDownloadQR}
            disabled={downloading}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            } ${downloading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Download size={18} />
            <span>{downloading ? '다운로딩...' : 'QR 다운로드'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRShareModal;
