'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, ArrowUp, ArrowDown } from 'lucide-react';

interface Scene {
  id: string;
  title: string;
  duration: number;
  image: string;
}

interface BatchImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateScenes: (scenes: Scene[]) => void;
  darkMode: boolean;
  existingSceneCount: number;
}

interface UploadedImage {
  file: File;
  preview: string;
  name: string;
}

export const BatchImageUpload: React.FC<BatchImageUploadProps> = ({
  isOpen,
  onClose,
  onCreateScenes,
  darkMode,
  existingSceneCount,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [creating, setCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      processFiles(files);
    }
  };

  const processFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );

    const newImages: UploadedImage[] = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSwapImages = (index1: number, index2: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index1], newImages[index2]] = [newImages[index2], newImages[index1]];
      return newImages;
    });
  };

  const handleSortByName = () => {
    setImages((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleCreateScenes = async () => {
    if (images.length === 0) return;

    setCreating(true);
    try {
      const scenes: Scene[] = await Promise.all(
        images.map(async (img, index) => {
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(img.file);
          });

          const sceneNumber = existingSceneCount + index + 1;
          return {
            id: `scene-${Date.now()}-${index}`,
            title: `Scene ${sceneNumber}`,
            duration: 3,
            image: dataUrl,
          };
        })
      );

      onCreateScenes(scenes);
      setImages([]);
      onClose();
    } catch (error) {
      console.error('씬 생성 실패:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleClear = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className={`${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8 p-6`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">이미지 일괄 업로드</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          ref={dropZoneRef}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition mb-6 ${
            dragActive
              ? darkMode
                ? 'bg-blue-900/50 border-blue-500'
                : 'bg-blue-50 border-blue-500'
              : darkMode
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <Upload
            size={48}
            className={`mx-auto mb-3 ${
              dragActive
                ? darkMode
                  ? 'text-blue-400'
                  : 'text-blue-500'
                : darkMode
                  ? 'text-gray-500'
                  : 'text-gray-400'
            }`}
          />
          <p className="font-semibold mb-1">이미지 파일을 드래그하거나 클릭</p>
          <p
            className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            PNG, JPG, GIF 등의 이미지를 여러 개 선택할 수 있습니다
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p
                className={`text-sm font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                선택된 이미지: {images.length}개
              </p>
              <button
                onClick={handleSortByName}
                className={`text-xs px-3 py-1 rounded font-medium transition ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                파일명 순 정렬
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 max-h-64 overflow-y-auto">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative group rounded-lg overflow-hidden border-2 ${
                    darkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover"
                  />

                  {/* Order Number */}
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      darkMode ? 'bg-blue-600' : 'bg-blue-500'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Actions Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2`}
                  >
                    {index > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwapImages(index, index - 1);
                        }}
                        className="p-2 bg-white rounded hover:bg-gray-100"
                        title="위로 이동"
                      >
                        <ArrowUp size={16} className="text-gray-900" />
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwapImages(index, index + 1);
                        }}
                        className="p-2 bg-white rounded hover:bg-gray-100"
                        title="아래로 이동"
                      >
                        <ArrowDown size={16} className="text-gray-900" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      className="p-2 bg-red-500 rounded hover:bg-red-600"
                      title="제거"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>

                  {/* Filename Tooltip */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 px-2 py-1 text-xs truncate ${
                      darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                    }`}
                  >
                    {img.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t border-gray-700">
          {images.length > 0 && (
            <button
              onClick={handleClear}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              모두 삭제
            </button>
          )}
          <button
            onClick={onClose}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            취소
          </button>
          <button
            onClick={handleCreateScenes}
            disabled={images.length === 0 || creating}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition text-white ${
              images.length === 0 || creating
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {creating
              ? '생성 중...'
              : `${images.length}개 씬 생성`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchImageUpload;
