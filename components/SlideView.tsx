'use client';

import React, { useState } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface Scene {
  id: string;
  scene_number?: number;
  title: string;
  duration: number;
  [key: string]: any;
}

interface SlideViewProps {
  scenes: Scene[];
  activeSceneId: string | null;
  onSceneSelect: (sceneId: string) => void;
  onAddScene: () => void;
  onDeleteScene: (sceneId: string) => void;
  onReorderScenes: (reorderedScenes: Scene[]) => void;
}

export const SlideView: React.FC<SlideViewProps> = ({
  scenes,
  activeSceneId,
  onSceneSelect,
  onAddScene,
  onDeleteScene,
  onReorderScenes,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newScenes = [...scenes];
    const [draggedScene] = newScenes.splice(draggedIndex, 1);
    newScenes.splice(dropIndex, 0, draggedScene);

    // Renumber scenes
    const renumbered = newScenes.map((s, i) => ({ ...s, scene_number: i + 1 }));
    onReorderScenes(renumbered);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">씬 목록</h2>
        <button
          onClick={onAddScene}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          <Plus size={16} />
          추가
        </button>
      </div>

      {/* Scene List */}
      <div className="flex-1 overflow-y-auto">
        {scenes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            씬이 없습니다
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {scenes.map((scene, index) => (
              <div
                key={scene.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => onSceneSelect(scene.id)}
                className={`
                  flex items-start gap-2 p-2 rounded cursor-move transition-colors
                  ${activeSceneId === scene.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-gray-100 border border-transparent'
                  }
                  ${draggedIndex === index ? 'opacity-50' : ''}
                `}
              >
                {/* Drag Handle */}
                <div className="flex-shrink-0 mt-1 text-gray-400 hover:text-gray-600">
                  <GripVertical size={16} />
                </div>

                {/* Thumbnail Container */}
                <div className="flex-1 min-w-0">
                  {/* Scene Number and Title */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      {scene.scene_number || index + 1}
                    </span>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {scene.title}
                    </p>
                  </div>

                  {/* Duration and Type */}
                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>{scene.duration || 3}초</span>
                    {scene.blank_page_type && (
                      <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                        {scene.blank_page_type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`"${scene.title}"을(를) 삭제할까요?`)) {
                      onDeleteScene(scene.id);
                    }
                  }}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>총 {scenes.length}개 씬</span>
          <span>
            {scenes.reduce((sum, s) => sum + (s.duration || 3), 0)}초
          </span>
        </div>
      </div>
    </div>
  );
};
