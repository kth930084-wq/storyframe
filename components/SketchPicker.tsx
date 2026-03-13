'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Grid, Layers, Check } from 'lucide-react';
import { SKETCH_REFERENCES, searchSketches, getSketchesByCategory, type SketchRef } from '@/lib/sketch-references';

interface SketchPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sketch: { character?: SketchRef; background?: SketchRef; combined?: SketchRef }) => void;
  darkMode: boolean;
  currentSketch?: { character?: string; background?: string; combined?: string };
}

type PickerMode = 'basic' | 'advanced';
type CategoryFilter = 'all' | 'character' | 'background' | 'combined';

export const SketchPicker: React.FC<SketchPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  darkMode,
  currentSketch,
}) => {
  const [mode, setMode] = useState<PickerMode>('basic');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced mode selections
  const [selectedCharacter, setSelectedCharacter] = useState<SketchRef | null>(
    currentSketch?.character
      ? SKETCH_REFERENCES.find((s) => s.id === currentSketch.character)
      : null
  );
  const [selectedBackground, setSelectedBackground] = useState<SketchRef | null>(
    currentSketch?.background
      ? SKETCH_REFERENCES.find((s) => s.id === currentSketch.background)
      : null
  );

  // Basic mode selection
  const [selectedCombined, setSelectedCombined] = useState<SketchRef | null>(
    currentSketch?.combined ? SKETCH_REFERENCES.find((s) => s.id === currentSketch.combined) : null
  );

  // Filter sketches based on search and category
  const filteredSketches = useMemo(() => {
    let sketches = searchQuery ? searchSketches(searchQuery) : SKETCH_REFERENCES;

    if (categoryFilter !== 'all') {
      sketches = sketches.filter((s) => s.category === categoryFilter);
    }

    return sketches;
  }, [searchQuery, categoryFilter]);

  // Get sketches by category for advanced mode
  const characterSketches = useMemo(() => {
    return searchQuery
      ? searchSketches(searchQuery).filter((s) => s.category === 'character')
      : getSketchesByCategory('character');
  }, [searchQuery]);

  const backgroundSketches = useMemo(() => {
    return searchQuery
      ? searchSketches(searchQuery).filter((s) => s.category === 'background')
      : getSketchesByCategory('background');
  }, [searchQuery]);

  const handleBasicSelect = (sketch: SketchRef) => {
    setSelectedCombined(sketch);
    onSelect({ combined: sketch });
    onClose();
  };

  const handleAdvancedApply = () => {
    if (selectedCharacter || selectedBackground) {
      onSelect({
        character: selectedCharacter || undefined,
        background: selectedBackground || undefined,
      });
      onClose();
    }
  };

  const bgClass = darkMode
    ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
    : 'bg-white border-gray-100 text-gray-900';

  const panelBgClass = darkMode ? 'bg-neutral-800' : 'bg-gray-50';

  const tabActiveClass = darkMode
    ? 'border-neutral-200 text-neutral-100 bg-neutral-800'
    : 'border-gray-400 text-gray-900 bg-white';

  const tabInactiveClass = darkMode
    ? 'border-neutral-600 text-neutral-400 hover:text-neutral-300'
    : 'border-gray-200 text-gray-500 hover:text-gray-700';

  const inputClass = darkMode
    ? 'bg-neutral-700 border-neutral-600 text-neutral-100 placeholder-neutral-400'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400';

  const sketchCardHoverClass = darkMode
    ? 'hover:bg-neutral-700'
    : 'hover:bg-gray-100';

  const selectedBorderClass = darkMode
    ? 'border-neutral-400'
    : 'border-gray-400';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-4xl max-h-[85vh] rounded-2xl border-2 ${bgClass} flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b-2 ${darkMode ? 'border-neutral-700' : 'border-gray-100'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Grid className="w-5 h-5" />
            <h2 className="text-lg font-bold">스케치 선택</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-neutral-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className={`px-6 py-3 border-b-2 ${darkMode ? 'border-neutral-700' : 'border-gray-100'} flex items-center gap-4`}>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                value="basic"
                checked={mode === 'basic'}
                onChange={() => {
                  setMode('basic');
                  setSelectedCharacter(null);
                  setSelectedBackground(null);
                }}
                className="w-4 h-4"
              />
              기본 모드
            </label>
            <label className="text-sm font-semibold flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                value="advanced"
                checked={mode === 'advanced'}
                onChange={() => {
                  setMode('advanced');
                  setSelectedCombined(null);
                }}
                className="w-4 h-4"
              />
              고급 모드
            </label>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`px-6 py-4 border-b-2 ${darkMode ? 'border-neutral-700' : 'border-gray-100'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="스케치 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 ${inputClass}`}
            />
          </div>
        </div>

        {/* Category Tabs (for basic mode) */}
        {mode === 'basic' && (
          <div className={`px-6 py-3 border-b-2 ${darkMode ? 'border-neutral-700' : 'border-gray-100'} flex items-center gap-2`}>
            {(['all', 'character', 'background', 'combined'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border-b-2 transition-colors ${
                  categoryFilter === cat ? tabActiveClass : tabInactiveClass
                }`}
              >
                {{
                  all: '전체',
                  character: '인물',
                  background: '배경',
                  combined: '합성',
                }[cat]}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 overflow-y-auto ${panelBgClass}`}>
          {mode === 'basic' ? (
            // Basic Mode: Single Grid
            <div className="p-6">
              <div className="grid grid-cols-5 gap-4">
                {filteredSketches.length > 0 ? (
                  filteredSketches.map((sketch) => (
                    <button
                      key={sketch.id}
                      onClick={() => handleBasicSelect(sketch)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedCombined?.id === sketch.id
                          ? `border-neutral-400 ${darkMode ? 'bg-neutral-700' : 'bg-gray-100'}`
                          : `border-transparent ${sketchCardHoverClass}`
                      }`}
                    >
                      <div
                        className={`w-full aspect-video rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-neutral-700' : 'bg-white'
                        } border-2 ${darkMode ? 'border-neutral-600' : 'border-gray-200'} overflow-hidden`}
                      >
                        <svg
                          viewBox="0 0 320 180"
                          className={`w-12 h-12 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}
                          dangerouslySetInnerHTML={{ __html: sketch.svg }}
                        />
                      </div>
                      <div className="text-xs font-semibold text-center line-clamp-2 w-full">
                        {sketch.nameKo}
                      </div>
                      {selectedCombined?.id === sketch.id && (
                        <div
                          className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-neutral-400' : 'bg-gray-400'
                          }`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="col-span-5 py-12 text-center">
                    <p className={darkMode ? 'text-neutral-400' : 'text-gray-500'}>
                      검색 결과가 없습니다
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Advanced Mode: Two Columns
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Character Selection */}
              <div className={`rounded-xl border-2 ${darkMode ? 'border-neutral-700' : 'border-gray-200'} p-4`}>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4" />
                  <h3 className="font-bold text-sm">인물 선택</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {characterSketches.length > 0 ? (
                    characterSketches.map((sketch) => (
                      <button
                        key={sketch.id}
                        onClick={() => setSelectedCharacter(sketch)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                          selectedCharacter?.id === sketch.id
                            ? `${selectedBorderClass} ${darkMode ? 'bg-neutral-700' : 'bg-gray-100'}`
                            : `border-transparent ${sketchCardHoverClass}`
                        }`}
                      >
                        <div
                          className={`w-full aspect-video rounded-lg flex items-center justify-center ${
                            darkMode ? 'bg-neutral-700' : 'bg-white'
                          } border-2 ${darkMode ? 'border-neutral-600' : 'border-gray-200'} overflow-hidden`}
                        >
                          <svg
                            viewBox="0 0 320 180"
                            className={`w-8 h-8 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}
                            dangerouslySetInnerHTML={{ __html: sketch.svg }}
                          />
                        </div>
                        <div className="text-xs font-medium text-center line-clamp-1 w-full">
                          {sketch.nameKo}
                        </div>
                        {selectedCharacter?.id === sketch.id && (
                          <div
                            className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                              darkMode ? 'bg-neutral-400' : 'bg-gray-400'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center">
                      <p className={darkMode ? 'text-neutral-400' : 'text-gray-500'}>
                        인물 스케치 없음
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Background Selection */}
              <div className={`rounded-xl border-2 ${darkMode ? 'border-neutral-700' : 'border-gray-200'} p-4`}>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4" />
                  <h3 className="font-bold text-sm">배경 선택</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {backgroundSketches.length > 0 ? (
                    backgroundSketches.map((sketch) => (
                      <button
                        key={sketch.id}
                        onClick={() => setSelectedBackground(sketch)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                          selectedBackground?.id === sketch.id
                            ? `${selectedBorderClass} ${darkMode ? 'bg-neutral-700' : 'bg-gray-100'}`
                            : `border-transparent ${sketchCardHoverClass}`
                        }`}
                      >
                        <div
                          className={`w-full aspect-video rounded-lg flex items-center justify-center ${
                            darkMode ? 'bg-neutral-700' : 'bg-white'
                          } border-2 ${darkMode ? 'border-neutral-600' : 'border-gray-200'} overflow-hidden`}
                        >
                          <svg
                            viewBox="0 0 320 180"
                            className={`w-8 h-8 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}
                            dangerouslySetInnerHTML={{ __html: sketch.svg }}
                          />
                        </div>
                        <div className="text-xs font-medium text-center line-clamp-1 w-full">
                          {sketch.nameKo}
                        </div>
                        {selectedBackground?.id === sketch.id && (
                          <div
                            className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                              darkMode ? 'bg-neutral-400' : 'bg-gray-400'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center">
                      <p className={darkMode ? 'text-neutral-400' : 'text-gray-500'}>
                        배경 스케치 없음
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t-2 ${darkMode ? 'border-neutral-700' : 'border-gray-100'} flex items-center justify-end gap-3`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              darkMode
                ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            취소
          </button>
          {mode === 'advanced' ? (
            <button
              onClick={handleAdvancedApply}
              disabled={!selectedCharacter && !selectedBackground}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'
                  : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            >
              적용
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SketchPicker;
