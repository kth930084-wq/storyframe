'use client';

import React, { useState } from 'react';
import { X, Sparkles, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { SHOT_SIZES, CAMERA_ANGLES, CAMERA_MOVEMENTS } from '@/lib/constants';

interface AIScriptSplitterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (scenes: Array<{
    id: string;
    title: string;
    duration: number;
    camera_angle: string;
    shot_size: string;
    camera_movement: string;
    description: string;
    dialogue: string;
    notes: string;
  }>) => void;
  darkMode: boolean;
  existingSceneCount: number;
}

interface ProcessedScene {
  id: string;
  title: string;
  duration: number;
  camera_angle: string;
  shot_size: string;
  camera_movement: string;
  description: string;
  dialogue: string;
  notes: string;
}

type EditingField = `${number}_${keyof ProcessedScene}`;

export default function AIScriptSplitter({
  isOpen,
  onClose,
  onApply,
  darkMode,
  existingSceneCount,
}: AIScriptSplitterProps) {
  const [scriptInput, setScriptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenes, setScenes] = useState<ProcessedScene[]>([]);
  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const [editingValue, setEditingValue] = useState('');

  // Color scheme
  const bgOverlay = darkMode ? 'bg-black/60' : 'bg-black/40';
  const modalBg = darkMode ? 'bg-neutral-900' : 'bg-white';
  const panelBg = darkMode ? 'bg-neutral-850' : 'bg-neutral-50';
  const borderColor = darkMode ? 'border-neutral-700' : 'border-neutral-200';
  const textColor = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const subtextColor = darkMode ? 'text-neutral-400' : 'text-neutral-600';
  const inputBg = darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700' : 'bg-white text-neutral-900 border-neutral-300';
  const hoverBg = darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100';
  const cellBg = darkMode ? 'bg-neutral-800' : 'bg-neutral-50';

  const handleAnalyze = async () => {
    if (!scriptInput.trim()) {
      setError('대본을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setScenes([]);

    try {
      const response = await fetch('/api/ai/split-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: scriptInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'AI 분석에 실패했습니다.');
        return;
      }

      if (data.success && data.scenes) {
        setScenes(data.scenes);
      } else {
        setError(data.error || '분석 결과를 처리할 수 없습니다.');
      }
    } catch (err) {
      console.error('API call failed:', err);
      setError('AI 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (index: number, field: keyof ProcessedScene) => {
    const fieldKey: EditingField = `${index}_${field}`;
    setEditingField(fieldKey);
    setEditingValue(String(scenes[index][field]));
  };

  const handleCellChange = (value: string) => {
    setEditingValue(value);
  };

  const handleCellBlur = () => {
    if (!editingField) return;

    const [indexStr, field] = editingField.split('_') as [string, keyof ProcessedScene];
    const index = parseInt(indexStr, 10);

    if (field === 'duration') {
      const duration = parseInt(editingValue, 10);
      setScenes(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], duration: isNaN(duration) ? 5 : duration };
        return updated;
      });
    } else {
      setScenes(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: editingValue };
        return updated;
      });
    }

    setEditingField(null);
    setEditingValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCellBlur();
    } else if (e.key === 'Escape') {
      setEditingField(null);
      setEditingValue('');
    }
  };

  const handleRetry = () => {
    setScenes([]);
    setError(null);
    setEditingField(null);
  };

  const handleApply = () => {
    if (scenes.length === 0) return;
    onApply(scenes);
    setScriptInput('');
    setScenes([]);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${bgOverlay} z-50 flex items-center justify-center p-4`} onClick={onClose}>
      <div
        className={`${modalBg} rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${borderColor}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${textColor}`}>AI 스크립트 분석</h2>
              <p className={`text-xs ${subtextColor}`}>대본을 씬으로 자동 분할합니다</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${hoverBg} transition`}
          >
            <X className={`w-5 h-5 ${subtextColor}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex gap-4 p-6">
          {/* Left Panel - Script Input */}
          <div className="w-1/3 flex flex-col gap-3">
            <div>
              <label className={`block text-sm font-semibold ${textColor} mb-2`}>대본 입력</label>
              <textarea
                value={scriptInput}
                onChange={e => setScriptInput(e.target.value)}
                placeholder="대본을 여기에 붙여넣으세요..."
                className={`w-full h-40 p-3 rounded-lg border ${inputBg} resize-none focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <p className={`text-xs ${subtextColor} mt-2`}>팁: 문단별로 나누어 입력하면 더 정확합니다</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAnalyze}
                disabled={loading || !scriptInput.trim()}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition ${
                  loading || !scriptInput.trim()
                    ? `${darkMode ? 'bg-neutral-700 text-neutral-500' : 'bg-neutral-200 text-neutral-400'} cursor-not-allowed`
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    분석 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI로 씬 분할
                  </>
                )}
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className={`p-4 rounded-lg ${panelBg} text-center`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                  <p className={`text-sm font-semibold ${textColor}`}>AI가 대본을 분석 중입니다...</p>
                </div>
                <p className={`text-xs ${subtextColor}`}>잠시만 기다려주세요</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-950' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 ${darkMode ? 'text-red-400' : 'text-red-600'} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>{error}</p>
                    <button
                      onClick={handleRetry}
                      className={`text-xs font-semibold mt-2 ${darkMode ? 'text-red-300 hover:text-red-200' : 'text-red-700 hover:text-red-600'}`}
                    >
                      다시 시도
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success Badge */}
            {scenes.length > 0 && !loading && !error && (
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-950' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'} flex items-center gap-2`}>
                <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <p className={`text-xs font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  {scenes.length}개 씬 분석됨
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Results Table */}
          <div className="flex-1 flex flex-col gap-3">
            <label className={`block text-sm font-semibold ${textColor}`}>분석 결과</label>

            {scenes.length > 0 ? (
              <div className="flex-1 overflow-auto">
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} border-b ${borderColor}`}>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>씬#</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>장소</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>시간(초)</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>액션</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>대사</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>샷</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>앵글</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textColor} whitespace-nowrap`}>무빙</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenes.map((scene, idx) => {
                        const rowNum = existingSceneCount + idx + 1;
                        return (
                          <tr key={scene.id} className={`border-b ${borderColor} ${darkMode ? 'hover:bg-neutral-800/50' : 'hover:bg-neutral-50'}`}>
                            <td className={`px-3 py-2 font-semibold ${textColor} whitespace-nowrap`}>{rowNum}</td>

                            {/* Title (Location) */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer max-w-xs truncate`}
                              onClick={() => handleCellClick(idx, 'title')}
                              title={scene.title}
                            >
                              {editingField === `${idx}_title` ? (
                                <input
                                  autoFocus
                                  type="text"
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  onKeyDown={handleKeyDown}
                                  className={`w-full px-2 py-1 rounded border ${inputBg} text-xs focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                />
                              ) : (
                                <span className={`text-xs ${textColor}`}>{scene.title}</span>
                              )}
                            </td>

                            {/* Duration */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer text-center whitespace-nowrap`}
                              onClick={() => handleCellClick(idx, 'duration')}
                            >
                              {editingField === `${idx}_duration` ? (
                                <input
                                  autoFocus
                                  type="number"
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  onKeyDown={handleKeyDown}
                                  className={`w-12 px-2 py-1 rounded border ${inputBg} text-xs text-center focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                />
                              ) : (
                                <span className={`text-xs ${textColor}`}>{scene.duration}</span>
                              )}
                            </td>

                            {/* Description (Action) */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer max-w-xs truncate`}
                              onClick={() => handleCellClick(idx, 'description')}
                              title={scene.description}
                            >
                              {editingField === `${idx}_description` ? (
                                <textarea
                                  autoFocus
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  onKeyDown={handleKeyDown}
                                  className={`w-full px-2 py-1 rounded border ${inputBg} text-xs resize-none focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                  rows={3}
                                />
                              ) : (
                                <span className={`text-xs ${textColor} line-clamp-2`}>{scene.description}</span>
                              )}
                            </td>

                            {/* Dialogue */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer max-w-xs truncate`}
                              onClick={() => handleCellClick(idx, 'dialogue')}
                              title={scene.dialogue}
                            >
                              {editingField === `${idx}_dialogue` ? (
                                <textarea
                                  autoFocus
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  onKeyDown={handleKeyDown}
                                  className={`w-full px-2 py-1 rounded border ${inputBg} text-xs resize-none focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                  rows={2}
                                />
                              ) : (
                                <span className={`text-xs ${textColor} line-clamp-2`}>{scene.dialogue || '-'}</span>
                              )}
                            </td>

                            {/* Shot Size */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer max-w-xs truncate`}
                              onClick={() => handleCellClick(idx, 'shot_size')}
                            >
                              {editingField === `${idx}_shot_size` ? (
                                <select
                                  autoFocus
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  className={`w-full px-2 py-1 rounded border ${inputBg} text-xs focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                >
                                  {SHOT_SIZES.map(s => (
                                    <option key={s.value} value={s.value}>
                                      {s.short}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className={`text-xs ${textColor}`}>{SHOT_SIZES.find(s => s.value === scene.shot_size)?.short || '?'}</span>
                              )}
                            </td>

                            {/* Camera Angle */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer max-w-xs truncate`}
                              onClick={() => handleCellClick(idx, 'camera_angle')}
                            >
                              {editingField === `${idx}_camera_angle` ? (
                                <select
                                  autoFocus
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  className={`w-full px-2 py-1 rounded border ${inputBg} text-xs focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                >
                                  {CAMERA_ANGLES.map(a => (
                                    <option key={a.value} value={a.value}>
                                      {a.value}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className={`text-xs ${textColor} line-clamp-1`}>{scene.camera_angle}</span>
                              )}
                            </td>

                            {/* Camera Movement */}
                            <td
                              className={`px-3 py-2 ${cellBg} cursor-pointer max-w-xs truncate`}
                              onClick={() => handleCellClick(idx, 'camera_movement')}
                            >
                              {editingField === `${idx}_camera_movement` ? (
                                <select
                                  autoFocus
                                  value={editingValue}
                                  onChange={e => handleCellChange(e.target.value)}
                                  onBlur={handleCellBlur}
                                  className={`w-full px-2 py-1 rounded border ${inputBg} text-xs focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                >
                                  {CAMERA_MOVEMENTS.map(m => (
                                    <option key={m.value} value={m.value}>
                                      {m.value}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className={`text-xs ${textColor} line-clamp-1`}>{scene.camera_movement}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className={`flex-1 flex items-center justify-center rounded-lg border-2 border-dashed ${borderColor} ${panelBg}`}>
                <div className="text-center">
                  <Sparkles className={`w-12 h-12 ${subtextColor} mx-auto mb-3 opacity-50`} />
                  <p className={`text-sm font-medium ${subtextColor}`}>분석 결과가 여기에 표시됩니다</p>
                  <p className={`text-xs ${subtextColor} mt-1`}>왼쪽에서 대본을 입력하고 분석해주세요</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {scenes.length > 0 && (
          <div className={`flex items-center justify-between px-6 py-4 border-t ${borderColor} ${panelBg}`}>
            <div className={`text-sm ${subtextColor}`}>
              <span className="font-semibold">{scenes.length}개 씬</span> 분석됨 (기존: {existingSceneCount}개)
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${hoverBg} ${textColor}`}
              >
                <RotateCcw className="w-4 h-4" />
                다시 분석
              </button>

              <button
                onClick={handleApply}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                <CheckCircle className="w-4 h-4" />
                프로젝트에 적용
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
