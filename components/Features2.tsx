'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  DollarSign,
  Calendar,
  Search,
  Filter,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Check,
  Zap,
  Eye,
  MapPin,
  Users,
  Clapperboard,
  BarChart3,
  Download,
  TrendingUp,
  Smartphone,
  Plus,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// Feature 6: BudgetEstimator (예산/리소스 추정 계산기)
// ============================================================================

interface BudgetEstimatorProps {
  project: any;
  darkMode: boolean;
}

export const BudgetEstimator: React.FC<BudgetEstimatorProps> = ({
  project,
  darkMode,
}) => {
  const [baseCostPerScene, setBaseCostPerScene] = useState(500000);
  const [equipmentOverride, setEquipmentOverride] = useState<number | null>(null);
  const [crewOverride, setCrewOverride] = useState<number | null>(null);
  const [locationOverride, setLocationOverride] = useState<number | null>(null);

  // Calculate estimated values
  const sceneCount = project?.scenes?.length || 0;
  const totalDuration = project?.scenes?.reduce((sum: number, scene: any) => sum + (scene.duration || 0), 0) || 0;
  const shootDays = project?.shooting_info?.shoot_days || Math.ceil(totalDuration / 480); // 8 hours per day
  const teamMembers = project?.project_info?.team_members?.length || 3;
  const locationCount = project?.shooting_info?.locations?.length || 1;

  // Calculate costs
  const sceneCost = sceneCount * baseCostPerScene;
  const shootingDayCost = shootDays * 2000000; // 200만원 per day
  const equipmentCost = equipmentOverride ?? (sceneCount * 1000000); // 100만원 base per scene
  const crewCost = crewOverride ?? (teamMembers * 5000000); // 500만원 per member
  const locationCost = locationOverride ?? (locationCount * 3000000); // 300만원 per location

  const subtotal = sceneCost + shootingDayCost + equipmentCost + crewCost + locationCost;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const bgColor = darkMode ? 'bg-neutral-900' : 'bg-neutral-50';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textColor = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const secondaryText = darkMode ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = darkMode ? 'bg-neutral-800' : 'bg-white';
  const inputBg = darkMode ? 'bg-neutral-700' : 'bg-neutral-100';

  return (
    <div className={`${bgColor} rounded-lg border ${borderColor} p-6 space-y-6`}>
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className={`w-6 h-6 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
        <h3 className={`text-xl font-bold ${textColor}`}>예산 추정 계산기</h3>
      </div>

      {/* Base Cost Slider */}
      <div className={`${cardBg} rounded-lg p-4 border ${borderColor}`}>
        <label className={`block text-sm font-medium ${secondaryText} mb-3`}>
          씬당 기본 비용
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="100000"
            max="2000000"
            step="100000"
            value={baseCostPerScene}
            onChange={(e) => setBaseCostPerScene(Number(e.target.value))}
            className="flex-1 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className={`font-mono text-lg font-bold ${textColor} min-w-32`}>
            {baseCostPerScene.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* Budget Breakdown Table */}
      <div className={`${cardBg} rounded-lg border ${borderColor} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${borderColor} ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <th className={`text-left px-4 py-3 font-semibold text-sm ${secondaryText}`}>
                  항목
                </th>
                <th className={`text-right px-4 py-3 font-semibold text-sm ${secondaryText}`}>
                  금액
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${borderColor}`}>
                <td className={`px-4 py-3 ${textColor}`}>
                  씬 제작비 ({sceneCount}개)
                </td>
                <td className={`px-4 py-3 text-right font-mono ${textColor}`}>
                  {sceneCost.toLocaleString()}원
                </td>
              </tr>
              <tr className={`border-b ${borderColor}`}>
                <td className={`px-4 py-3 ${textColor}`}>
                  촬영 일당 ({shootDays}일)
                </td>
                <td className={`px-4 py-3 text-right font-mono ${textColor}`}>
                  {shootingDayCost.toLocaleString()}원
                </td>
              </tr>
              <tr className={`border-b ${borderColor}`}>
                <td className={`px-4 py-3 ${textColor}`}>
                  <div className="flex items-center justify-between">
                    <span>장비비</span>
                    <button className={`text-xs px-2 py-1 rounded ${inputBg} ${secondaryText} hover:opacity-70`}>
                      편집
                    </button>
                  </div>
                </td>
                <td className={`px-4 py-3 text-right font-mono ${textColor}`}>
                  {(equipmentOverride ?? equipmentCost).toLocaleString()}원
                </td>
              </tr>
              <tr className={`border-b ${borderColor}`}>
                <td className={`px-4 py-3 ${textColor}`}>
                  <div className="flex items-center justify-between">
                    <span>스태프비 ({teamMembers}명)</span>
                    <button className={`text-xs px-2 py-1 rounded ${inputBg} ${secondaryText} hover:opacity-70`}>
                      편집
                    </button>
                  </div>
                </td>
                <td className={`px-4 py-3 text-right font-mono ${textColor}`}>
                  {(crewOverride ?? crewCost).toLocaleString()}원
                </td>
              </tr>
              <tr className={`border-b ${borderColor}`}>
                <td className={`px-4 py-3 ${textColor}`}>
                  <div className="flex items-center justify-between">
                    <span>로케이션비 ({locationCount}곳)</span>
                    <button className={`text-xs px-2 py-1 rounded ${inputBg} ${secondaryText} hover:opacity-70`}>
                      편집
                    </button>
                  </div>
                </td>
                <td className={`px-4 py-3 text-right font-mono ${textColor}`}>
                  {(locationOverride ?? locationCost).toLocaleString()}원
                </td>
              </tr>
              <tr className={`border-b ${borderColor} ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
                <td className={`px-4 py-3 font-semibold ${textColor}`}>소계</td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${textColor}`}>
                  {subtotal.toLocaleString()}원
                </td>
              </tr>
              <tr className={`border-b ${borderColor}`}>
                <td className={`px-4 py-3 ${textColor}`}>부가세 (10%)</td>
                <td className={`px-4 py-3 text-right font-mono ${textColor}`}>
                  {tax.toLocaleString()}원
                </td>
              </tr>
              <tr className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <td className={`px-4 py-3 font-bold text-lg ${textColor}`}>총합계</td>
                <td className={`px-4 py-3 text-right font-mono font-bold text-lg ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                  {total.toLocaleString()}원
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Summary */}
      <div className={`${cardBg} rounded-lg border ${borderColor} p-4 flex items-center justify-between`}>
        <div>
          <p className={`text-sm ${secondaryText} mb-1`}>총 프로젝트 비용</p>
          <p className={`text-2xl font-bold ${textColor} font-mono`}>
            {total.toLocaleString()}원
          </p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          darkMode
            ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100'
            : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'
        }`}>
          <Download className="w-4 h-4" />
          내보내기
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// Feature 7: CalendarView (촬영 캘린더 뷰)
// ============================================================================

interface CalendarViewProps {
  project: any;
  onUpdate: (updates: any) => void;
  darkMode: boolean;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  project,
  onUpdate,
  darkMode,
}) => {
  const [currentDate, setCurrentDate] = useState(() => {
    const shootDate = project?.shooting_info?.shoot_date;
    if (shootDate) {
      return new Date(shootDate);
    }
    return new Date();
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const timetable = project?.timetable || [];

  const getDayTimetableEntries = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return timetable.filter((entry: any) => entry.date === dateStr);
  };

  const getDayStats = (day: number) => {
    const entries = getDayTimetableEntries(day);
    const totalHours = entries.reduce((sum: number, entry: any) => {
      const start = new Date(`2000-01-01 ${entry.time_start}`);
      const end = new Date(`2000-01-01 ${entry.time_end}`);
      return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);
    return { entryCount: entries.length, totalHours };
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const bgColor = darkMode ? 'bg-neutral-900' : 'bg-neutral-50';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textColor = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const secondaryText = darkMode ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = darkMode ? 'bg-neutral-800' : 'bg-white';
  const dayBg = darkMode ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-100 hover:bg-neutral-200';
  const activeDayBg = darkMode ? 'bg-neutral-600' : 'bg-neutral-300';

  const koreanDays = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className={`${bgColor} rounded-lg border ${borderColor} p-6 space-y-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className={`w-6 h-6 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <h3 className={`text-xl font-bold ${textColor}`}>촬영 캘린더</h3>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            className={`p-2 rounded-lg transition-colors ${dayBg}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className={`font-semibold text-lg min-w-24 text-center ${textColor}`}>
            {year}년 {monthNames[month]}
          </span>
          <button
            onClick={handleNextMonth}
            className={`p-2 rounded-lg transition-colors ${dayBg}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={`${cardBg} rounded-lg border ${borderColor} p-4`}>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {koreanDays.map((day) => (
            <div
              key={day}
              className={`text-center font-semibold text-sm py-2 ${secondaryText}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const stats = day ? getDayStats(day) : null;
            const isSelected = day === selectedDay;

            return (
              <button
                key={index}
                onClick={() => day && setSelectedDay(isSelected ? null : day)}
                className={`aspect-square p-1 rounded-lg text-sm font-medium transition-colors ${
                  day === null
                    ? 'cursor-default'
                    : isSelected
                    ? `${activeDayBg} ${textColor}`
                    : `${dayBg} ${textColor} cursor-pointer`
                }`}
              >
                {day && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-xs sm:text-sm">{day}</span>
                    {stats && stats.entryCount > 0 && (
                      <span className={`text-xs ${secondaryText}`}>
                        {stats.entryCount}건
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day details */}
      {selectedDay && (
        <div className={`${cardBg} rounded-lg border ${borderColor} p-4`}>
          <h4 className={`font-semibold ${textColor} mb-4`}>
            {year}년 {monthNames[month]} {selectedDay}일
          </h4>
          <div className="space-y-3">
            {getDayTimetableEntries(selectedDay).length > 0 ? (
              getDayTimetableEntries(selectedDay).map((entry: any) => (
                <div
                  key={entry.id}
                  className={`p-3 rounded-lg ${
                    darkMode ? 'bg-neutral-700' : 'bg-neutral-100'
                  }`}
                >
                  <div className={`font-medium ${textColor} mb-1`}>
                    {entry.activity}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className={secondaryText}>{entry.location}</span>
                  </div>
                  <div className={`text-sm ${secondaryText} mt-1`}>
                    {entry.time_start} ~ {entry.time_end}
                  </div>
                </div>
              ))
            ) : (
              <p className={secondaryText}>일정이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Feature 8: SceneSearchFilter (스마트 검색 & 필터)
// ============================================================================

interface SceneSearchFilterProps {
  scenes: any[];
  onSelectScene: (id: string) => void;
  darkMode: boolean;
}

export const SceneSearchFilter: React.FC<SceneSearchFilterProps> = ({
  scenes,
  onSelectScene,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    camera_angle: '',
    shot_size: '',
    lighting: '',
    shooting_completed: '',
  });

  // Get unique filter values
  const uniqueValues = {
    camera_angles: [...new Set(scenes.map((s) => s.camera_angle).filter(Boolean))],
    shot_sizes: [...new Set(scenes.map((s) => s.shot_size).filter(Boolean))],
    lightings: [...new Set(scenes.map((s) => s.lighting).filter(Boolean))],
  };

  // Filter scenes
  const filteredScenes = scenes.filter((scene) => {
    const matchesSearch =
      !searchQuery ||
      scene.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.dialogue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAngle = !filters.camera_angle || scene.camera_angle === filters.camera_angle;
    const matchesShot = !filters.shot_size || scene.shot_size === filters.shot_size;
    const matchesLighting = !filters.lighting || scene.lighting === filters.lighting;
    const matchesCompleted =
      !filters.shooting_completed ||
      (filters.shooting_completed === 'completed' && scene.shooting_completed) ||
      (filters.shooting_completed === 'pending' && !scene.shooting_completed);

    return matchesSearch && matchesAngle && matchesShot && matchesLighting && matchesCompleted;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({
      camera_angle: '',
      shot_size: '',
      lighting: '',
      shooting_completed: '',
    });
  };

  const hasActiveFilters =
    searchQuery ||
    Object.values(filters).some((v) => v !== '');

  const bgColor = darkMode ? 'bg-neutral-900' : 'bg-neutral-50';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textColor = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const secondaryText = darkMode ? 'text-neutral-400' : 'text-neutral-600';
  const inputBg = darkMode ? 'bg-neutral-800 text-neutral-100' : 'bg-white text-neutral-900';
  const cardBg = darkMode ? 'bg-neutral-800' : 'bg-white';

  return (
    <div className={`${bgColor} rounded-lg border ${borderColor} p-6 space-y-6`}>
      <div className="flex items-center gap-2 mb-6">
        <Search className={`w-6 h-6 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
        <h3 className={`text-xl font-bold ${textColor}`}>스마트 검색 & 필터</h3>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="씬 검색 (Ctrl+F)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${inputBg} placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${secondaryText} hover:${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            카메라 각도
          </label>
          <select
            value={filters.camera_angle}
            onChange={(e) =>
              setFilters({ ...filters, camera_angle: e.target.value })
            }
            className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-neutral-500`}
          >
            <option value="">모두</option>
            {uniqueValues.camera_angles.map((angle) => (
              <option key={angle} value={angle}>
                {angle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            샷 사이즈
          </label>
          <select
            value={filters.shot_size}
            onChange={(e) =>
              setFilters({ ...filters, shot_size: e.target.value })
            }
            className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-neutral-500`}
          >
            <option value="">모두</option>
            {uniqueValues.shot_sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            라이팅
          </label>
          <select
            value={filters.lighting}
            onChange={(e) =>
              setFilters({ ...filters, lighting: e.target.value })
            }
            className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-neutral-500`}
          >
            <option value="">모두</option>
            {uniqueValues.lightings.map((light) => (
              <option key={light} value={light}>
                {light}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            촬영 상태
          </label>
          <select
            value={filters.shooting_completed}
            onChange={(e) =>
              setFilters({ ...filters, shooting_completed: e.target.value })
            }
            className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-neutral-500`}
          >
            <option value="">모두</option>
            <option value="completed">완료됨</option>
            <option value="pending">미완료</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            darkMode
              ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
              : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
          }`}
        >
          <X className="w-4 h-4" />
          필터 초기화
        </button>
      )}

      {/* Results */}
      <div>
        <p className={`text-sm font-medium ${secondaryText} mb-4`}>
          검색 결과: {filteredScenes.length}개
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSelectScene(scene.id)}
              className={`p-4 rounded-lg border ${borderColor} ${cardBg} text-left hover:opacity-80 transition-opacity`}
            >
              {scene.image ? (
                <div className={`w-full h-32 rounded-lg mb-3 bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center`}>
                  <img src={scene.image} alt={scene.title} className="w-full h-full object-cover rounded-lg" />
                </div>
              ) : (
                <div className={`w-full h-32 rounded-lg mb-3 ${darkMode ? 'bg-neutral-700' : 'bg-neutral-200'} flex items-center justify-center`}>
                  <Eye className={`w-6 h-6 ${secondaryText}`} />
                </div>
              )}
              <h4 className={`font-semibold ${textColor} mb-2 line-clamp-2`}>
                {scene.title}
              </h4>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {scene.camera_angle && (
                  <span className={`px-2 py-1 rounded ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} ${secondaryText}`}>
                    {scene.camera_angle}
                  </span>
                )}
                {scene.shot_size && (
                  <span className={`px-2 py-1 rounded ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} ${secondaryText}`}>
                    {scene.shot_size}
                  </span>
                )}
                {scene.shooting_completed && (
                  <span className={`px-2 py-1 rounded flex items-center gap-1 ${darkMode ? 'bg-neutral-600' : 'bg-neutral-200'} ${secondaryText}`}>
                    <Check className="w-3 h-3" />
                    완료
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {filteredScenes.length === 0 && (
          <div className={`text-center py-12 ${secondaryText}`}>
            <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Feature 9: MobileResponsiveWrapper (반응형 모바일 감지)
// ============================================================================

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet };
};

interface MobileResponsiveWrapperProps {
  children: React.ReactNode;
}

export const MobileResponsiveWrapper: React.FC<MobileResponsiveWrapperProps> = ({
  children,
}) => {
  const { isMobile } = useMobileDetect();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}

      {/* Floating Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-6 right-6 p-4 bg-neutral-800 text-neutral-100 rounded-full shadow-lg z-40 hover:bg-neutral-700 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-neutral-900 text-neutral-100 shadow-xl z-50 transform transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="font-bold text-lg mb-6">PEWPEW 스토리보드</h2>
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-neutral-800 transition-colors">
              대시보드
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-neutral-800 transition-colors">
              씬 관리
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-neutral-800 transition-colors">
              촬영 계획
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-neutral-800 transition-colors">
              예산 관리
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Feature 10: AISceneRecommender (AI 씬 추천)
// ============================================================================

interface AISceneRecommenderProps {
  project: any;
  onAddScene: (scene: any) => void;
  darkMode: boolean;
}

const SCENE_TEMPLATES: Record<string, string[]> = {
  '광고': ['오프닝 훅', '문제 제시', '해결 제시', '제품 소개', 'CTA', '엔딩'],
  '뮤직비디오': ['인트로', '벌스1', '코러스', '브릿지', '아웃트로'],
  '다큐멘터리': ['오프닝', '인터뷰', 'B-롤', '재현', '내레이션', '마무리'],
  '브이로그': ['인트로', '이동', '메인활동', '먹방', '마무리'],
  '교육/튜토리얼': ['인트로', '목차', '본문1', '실습', '요약'],
  '기본': ['오프닝', '메인', '서브', '클로징'],
};

const DESCRIPTION_TEMPLATES: Record<string, Record<string, string>> = {
  '광고': {
    '오프닝 훅': '시청자의 주의를 끌기 위한 강렬한 오프닝 장면',
    '문제 제시': '제품이 해결하는 문제를 시각적으로 표현',
    '해결 제시': '제품의 해결책을 시연하는 장면',
    '제품 소개': '제품의 주요 특징을 강조하는 장면',
    'CTA': '행동 유도 메시지와 함께 마무리',
    '엔딩': '브랜드 로고 및 연락처 정보',
  },
  '뮤직비디오': {
    '인트로': '곡의 오프닝 부분을 표현하는 시각적 연출',
    '벌스1': '가사의 첫 번째 부분을 스토리로 구성',
    '코러스': '곡의 메인 후렴구를 임팩트있게 표현',
    '브릿지': '곡의 중간 부분으로 장면 전환',
    '아웃트로': '곡의 마무리 부분을 예술적으로 연출',
  },
  '다큐멘터리': {
    '오프닝': '주제를 소개하는 시작 장면',
    '인터뷰': '전문가 또는 주인공 인터뷰 장면',
    'B-롤': '내레이션을 지원하는 관련 영상',
    '재현': '과거 사건을 극적으로 재현하는 장면',
    '내레이션': '음성으로 정보를 전달하는 부분',
    '마무리': '결론 및 메시지를 담은 마지막 장면',
  },
};

export const AISceneRecommender: React.FC<AISceneRecommenderProps> = ({
  project,
  onAddScene,
  darkMode,
}) => {
  const [expandedScene, setExpandedScene] = useState<string | null>(null);
  const [typing, setTyping] = useState<Record<string, boolean>>({});

  const videoType = project?.video_type || '기본';
  const recommendations = SCENE_TEMPLATES[videoType] || SCENE_TEMPLATES['기본'];
  const existingSceneTitles = new Set(project?.scenes?.map((s: any) => s.title) || []);

  const isSceneAdded = (sceneTitle: string) => existingSceneTitles.has(sceneTitle);

  const handleAddScene = (sceneTitle: string) => {
    const newScene = {
      id: `scene-${Date.now()}`,
      title: sceneTitle,
      duration: 30,
      description:
        DESCRIPTION_TEMPLATES[videoType]?.[sceneTitle] ||
        `${sceneTitle} 장면`,
      scene_number: (project?.scenes?.length || 0) + 1,
    };

    onAddScene(newScene);
    setTyping({ ...typing, [sceneTitle]: false });
  };

  const bgColor = darkMode ? 'bg-neutral-900' : 'bg-neutral-50';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textColor = darkMode ? 'text-neutral-100' : 'text-neutral-900';
  const secondaryText = darkMode ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = darkMode ? 'bg-neutral-800' : 'bg-white';
  const hoverBg = darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100';

  return (
    <div className={`${bgColor} rounded-lg border ${borderColor} p-6 space-y-6`}>
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className={`w-6 h-6 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
        <h3 className={`text-xl font-bold ${textColor}`}>AI 씬 추천</h3>
      </div>

      <div className={`${cardBg} rounded-lg border ${borderColor} p-4`}>
        <p className={`text-sm ${secondaryText} mb-4`}>
          비디오 타입: <span className="font-semibold text-neutral-300">{videoType}</span>
        </p>
        <p className={`text-sm ${secondaryText}`}>
          프로젝트 구조에 맞는 씬을 추천합니다.
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((sceneTitle) => {
          const isAdded = isSceneAdded(sceneTitle);
          const isTypingActive = typing[sceneTitle];

          return (
            <div
              key={sceneTitle}
              onClick={() => !isAdded && setExpandedScene(expandedScene === sceneTitle ? null : sceneTitle)}
              className={`${cardBg} rounded-lg border ${borderColor} p-4 cursor-pointer transition-colors ${
                !isAdded ? hoverBg : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isAdded
                      ? darkMode
                        ? 'bg-neutral-600 text-neutral-300'
                        : 'bg-neutral-300 text-neutral-700'
                      : darkMode
                      ? 'bg-neutral-700 text-neutral-400'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {recommendations.indexOf(sceneTitle) + 1}
                  </div>
                  <span className={`font-semibold ${textColor}`}>{sceneTitle}</span>
                  {isAdded && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutral-600 text-neutral-200">
                      <Check className="w-3 h-3" />
                      추가됨
                    </span>
                  )}
                </div>
                {!isAdded && (
                  <Lightbulb className={`w-5 h-5 ${secondaryText}`} />
                )}
              </div>

              {/* Description (expanded) */}
              {expandedScene === sceneTitle && (
                <div className="mt-4 pt-4 border-t border-neutral-700">
                  <p className={`text-sm ${secondaryText} mb-4`}>
                    {DESCRIPTION_TEMPLATES[videoType]?.[sceneTitle] ||
                      `${sceneTitle} 장면에 대한 설명입니다.`}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddScene(sceneTitle);
                    }}
                    disabled={isAdded}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center ${
                      isAdded
                        ? `${darkMode ? 'bg-neutral-700 text-neutral-500' : 'bg-neutral-300 text-neutral-600'} cursor-not-allowed`
                        : `${darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'}`
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    추가
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className={`${cardBg} rounded-lg border ${borderColor} p-4 flex items-center justify-between`}>
        <div>
          <p className={`text-sm ${secondaryText} mb-1`}>권장 씬</p>
          <p className={`text-lg font-bold ${textColor}`}>
            {recommendations.length}개 중 {Array.from(existingSceneTitles).filter((title) =>
              recommendations.includes(title as string)
            ).length}개 추가됨
          </p>
        </div>
        <TrendingUp className={`w-8 h-8 ${secondaryText}`} />
      </div>
    </div>
  );
};
