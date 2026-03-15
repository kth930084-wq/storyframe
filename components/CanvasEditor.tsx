'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Type, Square, Circle, ArrowRight, Trash2, Copy, ArrowUp, ArrowDown,
  Lock, Unlock
} from 'lucide-react';

export interface CanvasElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'arrow';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  color?: string;
  fontSize?: number;
  locked?: boolean;
  zIndex?: number;
}

interface CanvasEditorProps {
  elements: CanvasElement[];
  onElementsChange: (elements: CanvasElement[]) => void;
  layoutType?: string;
}

const COLORS = ['#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  elements,
  onElementsChange,
  layoutType = '1-cut',
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [draggingElementId, setDraggingElementId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<string>('');

  const selectedElement = elements.find(e => e.id === selectedElementId);

  const addElement = (type: CanvasElement['type']) => {
    const newElement: CanvasElement = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      content: type === 'text' ? '텍스트 추가' : undefined,
      color: '#000000',
      fontSize: 16,
      zIndex: elements.length,
    };
    onElementsChange([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    onElementsChange(
      elements.map(e => e.id === id ? { ...e, ...updates } : e)
    );
  };

  const deleteElement = (id: string) => {
    onElementsChange(elements.filter(e => e.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  const duplicateElement = (id: string) => {
    const element = elements.find(e => e.id === id);
    if (!element) return;
    const newElement: CanvasElement = {
      ...element,
      id: Math.random().toString(36).substr(2, 9),
      x: element.x + 10,
      y: element.y + 10,
      zIndex: Math.max(...elements.map(e => e.zIndex || 0)) + 1,
    };
    onElementsChange([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };

  const changeZIndex = (id: string, direction: 'up' | 'down') => {
    const element = elements.find(e => e.id === id);
    if (!element) return;

    if (direction === 'up') {
      updateElement(id, { zIndex: Math.max(...elements.map(e => e.zIndex || 0)) + 1 });
    } else {
      updateElement(id, { zIndex: -1 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (selectedElement?.locked) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const element = elements.find(e => e.id === elementId);
    if (!element) return;

    setSelectedElementId(elementId);
    setDraggingElementId(elementId);
    setDragOffset({
      x: e.clientX - canvasRect.left - element.x,
      y: e.clientY - canvasRect.top - element.y,
    });
  };

  const handleResizeStart = (e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    setResizeDir(dir);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || !draggingElementId) return;

      const canvasRect = canvas.getBoundingClientRect();
      const newX = Math.max(0, e.clientX - canvasRect.left - dragOffset.x);
      const newY = Math.max(0, e.clientY - canvasRect.top - dragOffset.y);

      updateElement(draggingElementId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDraggingElementId(null);
      setResizing(false);
      setResizeDir('');
    };

    if (draggingElementId || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingElementId, resizing, dragOffset, elements]);

  const getLayoutGridClass = () => {
    switch (layoutType) {
      case '2-cut':
        return 'grid-cols-2';
      case '4-cut':
        return 'grid-cols-2 grid-rows-2';
      case '6-cut':
        return 'grid-cols-3 grid-rows-2';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg flex-wrap">
        <button
          onClick={() => addElement('text')}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="텍스트 추가"
        >
          <Type size={18} />
          텍스트
        </button>
        <button
          onClick={() => addElement('rectangle')}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="사각형 추가"
        >
          <Square size={18} />
          사각형
        </button>
        <button
          onClick={() => addElement('circle')}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="원형 추가"
        >
          <Circle size={18} />
          원형
        </button>
        <button
          onClick={() => addElement('arrow')}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="화살표 추가"
        >
          <ArrowRight size={18} />
          화살표
        </button>

        {selectedElement && (
          <>
            <div className="w-px h-6 bg-gray-300" />

            {/* Color Picker */}
            <div className="flex items-center gap-1">
              {COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => updateElement(selectedElement.id, { color })}
                  className={`w-6 h-6 rounded border-2 ${
                    selectedElement.color === color
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title="색상 변경"
                />
              ))}
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* Element Controls */}
            <button
              onClick={() => changeZIndex(selectedElement.id, 'up')}
              className="flex items-center gap-1 px-2 py-2 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="앞으로 보내기"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={() => changeZIndex(selectedElement.id, 'down')}
              className="flex items-center gap-1 px-2 py-2 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="뒤로 보내기"
            >
              <ArrowDown size={16} />
            </button>

            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="flex items-center gap-1 px-2 py-2 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="복사"
            >
              <Copy size={16} />
            </button>

            <button
              onClick={() => updateElement(selectedElement.id, { locked: !selectedElement.locked })}
              className={`flex items-center gap-1 px-2 py-2 text-xs rounded ${
                selectedElement.locked
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
              title={selectedElement.locked ? "잠금 해제" : "잠금"}
            >
              {selectedElement.locked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>

            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="flex items-center gap-1 px-2 py-2 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
              title="삭제"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 border border-gray-300 rounded-lg overflow-auto bg-gray-50">
        <div
          ref={canvasRef}
          className={`relative w-full h-full min-h-[400px] bg-white ${
            layoutType !== '1-cut' ? `grid ${getLayoutGridClass()}` : ''
          }`}
          onClick={() => setSelectedElementId(null)}
        >
          {elements.map((element) => (
            <CanvasElementRenderer
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
              onResizeStart={handleResizeStart}
              onUpdate={(updates) => updateElement(element.id, updates)}
            />
          ))}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElement && selectedElement.type === 'text' && (
        <div className="p-4 bg-gray-100 rounded-lg space-y-3">
          <textarea
            value={selectedElement.content || ''}
            onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            rows={2}
            placeholder="텍스트 입력..."
          />
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              글자 크기
            </label>
            <input
              type="number"
              value={selectedElement.fontSize || 16}
              onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              min="8"
              max="72"
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface CanvasElementRendererProps {
  element: CanvasElement;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeStart: (e: React.MouseEvent, dir: string) => void;
  onUpdate: (updates: Partial<CanvasElement>) => void;
}

const CanvasElementRenderer: React.FC<CanvasElementRendererProps> = ({
  element,
  isSelected,
  onMouseDown,
  onResizeStart,
  onUpdate,
}) => {
  const renderElement = () => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      zIndex: element.zIndex || 0,
      cursor: element.locked ? 'not-allowed' : 'move',
      opacity: element.locked ? 0.6 : 1,
    };

    const commonClasses = `
      ${isSelected ? 'ring-2 ring-blue-500' : ''}
      transition-shadow
    `;

    switch (element.type) {
      case 'text':
        return (
          <div
            style={{
              ...baseStyle,
              backgroundColor: 'transparent',
              padding: '8px',
            }}
            className={commonClasses}
            onMouseDown={onMouseDown}
          >
            <p
              style={{
                fontSize: `${element.fontSize || 16}px`,
                color: element.color,
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
              className="font-semibold"
            >
              {element.content}
            </p>
          </div>
        );

      case 'rectangle':
        return (
          <div
            style={{
              ...baseStyle,
              backgroundColor: element.color,
              border: '2px solid rgba(0,0,0,0.1)',
            }}
            className={commonClasses}
            onMouseDown={onMouseDown}
          />
        );

      case 'circle':
        return (
          <div
            style={{
              ...baseStyle,
              backgroundColor: element.color,
              border: '2px solid rgba(0,0,0,0.1)',
              borderRadius: '50%',
            }}
            className={commonClasses}
            onMouseDown={onMouseDown}
          />
        );

      case 'arrow':
        return (
          <svg
            style={baseStyle}
            viewBox="0 0 100 100"
            className={commonClasses}
            onMouseDown={onMouseDown}
          >
            <line x1="10" y1="50" x2="80" y2="50" stroke={element.color} strokeWidth="2" />
            <polygon
              points="80,50 70,45 70,55"
              fill={element.color}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width}px`,
        height: `${element.height}px`,
        zIndex: element.zIndex || 0,
      }}
    >
      {renderElement()}

      {/* Resize Handles */}
      {isSelected && !element.locked && (
        <>
          {['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'].map((dir) => (
            <div
              key={dir}
              onMouseDown={(e) => onResizeStart(e, dir)}
              className={`
                absolute w-2 h-2 bg-blue-500 border border-white rounded-full cursor-${
                  ['nw', 'se'].includes(dir) ? 'nwse' :
                  ['ne', 'sw'].includes(dir) ? 'nesw' :
                  ['n', 's'].includes(dir) ? 'ns' :
                  'ew'
                }-resize
                ${
                  dir === 'nw' ? '-left-1 -top-1' :
                  dir === 'ne' ? '-right-1 -top-1' :
                  dir === 'sw' ? '-left-1 -bottom-1' :
                  dir === 'se' ? '-right-1 -bottom-1' :
                  dir === 'n' ? 'left-1/2 -translate-x-1/2 -top-1' :
                  dir === 's' ? 'left-1/2 -translate-x-1/2 -bottom-1' :
                  dir === 'e' ? '-right-1 top-1/2 -translate-y-1/2' :
                  '-left-1 top-1/2 -translate-y-1/2'
                }
              `}
            />
          ))}
        </>
      )}
    </div>
  );
};
