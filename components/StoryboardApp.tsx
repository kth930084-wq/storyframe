'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Camera, Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Grid, Monitor,
  Download, Copy, Eye, Clock, Film, Upload, Sparkles, Users, Share2, Palette, LayoutTemplate,
  Settings, LogOut, Menu, X, Play, Pause, RotateCcw, Check, Edit3, Image, Sun, Moon, Zap,
  Target, Move, Maximize, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Search, Bell, FolderOpen,
  Star, MoreHorizontal, ChevronLeft, Keyboard, ListChecks, HelpCircle, CheckCircle2, Circle,
  RotateCw, Crop, Command, Undo2, Redo2, FileJson, Save
} from 'lucide-react';
import {
  CAMERA_ANGLES, SHOT_SIZES, CAMERA_MOVEMENTS, LIGHTING_OPTIONS, TRANSITIONS,
  VIDEO_TYPES, PLATFORMS, TONES, TEMPLATES, LENS_OPTIONS, FRAMERATE_OPTIONS, ASPECT_RATIOS, VIDEO_RESOLUTIONS, isAdmin
} from '@/lib/constants';
import {
  getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
  type Announcement
} from '@/lib/firebase';
import Link from 'next/link';
import { SceneCommentPanel, AssetLibraryPanel, AnimaticPreview, ShotListView, VersionManager } from './Features1';
import { BudgetEstimator, CalendarView, SceneSearchFilter, MobileResponsiveWrapper, useMobileDetect, AISceneRecommender } from './Features2';
import { PortfolioProposalBuilder } from './PortfolioProposal';
import { SlideView } from './SlideView';
import { BlankPageEditor, BlankPageContent } from './BlankPageEditor';
import { CanvasEditor, type CanvasElement } from './CanvasEditor';
import ReferenceLibrary from './ReferenceLibrary';
import PDFExportModal from './PDFExportModal';

interface StoryboardAppProps {
  user: any;
  onLogout: () => void;
}

interface SceneComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

interface Scene {
  id: string;
  scene_number?: number;
  title: string;
  duration: number;
  camera_angle?: string;
  shot_size?: string;
  camera_movement?: string;
  lighting?: string;
  description?: string;
  dialogue?: string;
  subtitle?: string;
  sound?: string;
  notes?: string;
  image?: string;
  transition?: string;
  shooting_completed?: boolean;
  comments?: SceneComment[];
  // New fields for blank pages and layouts
  blank_page_type?: string;
  blank_page_content?: {
    text?: string;
    imageUrl?: string;
    memo?: string;
  };
  layout_type?: string;
  canvas_elements?: CanvasElement[];
  [key: string]: any;
}

interface ProjectInfo {
  brand_name?: string;
  client_name?: string;
  manager_name?: string;
  manager_phone?: string;
  manager_email?: string;
  director_name?: string;
  director_phone?: string;
  dp_name?: string;
  dp_phone?: string;
  pd_name?: string;
  pd_phone?: string;
}

interface ShootingInfo {
  shoot_date?: string;
  shoot_days?: string;
  location_name?: string;
  location_address?: string;
  studio_name?: string;
  studio_address?: string;
  studio_phone?: string;
  parking_info?: string;
  nearest_hospital?: string;
  weather_note?: string;
  call_time?: string;
  wrap_time?: string;
  lunch_time?: string;
  special_notes?: string;
}

interface TimetableEntry {
  id: string;
  time_start: string;
  time_end: string;
  scene_id?: string;
  activity: string;
  location: string;
  int_ext: string;
  day_night: string;
  cast: string;
  notes: string;
}

interface Project {
  id: string;
  title: string;
  brand_name?: string;
  production_company?: string;
  video_type?: string;
  platform?: string;
  duration?: string;
  tone?: string;
  aspect_ratio?: string;
  resolution?: string;
  description?: string;
  project_info?: ProjectInfo;
  shooting_info?: ShootingInfo;
  timetable?: TimetableEntry[];
  scenes: Scene[];
  created_at?: string;
  [key: string]: any;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const generateDescription = (scene: Scene) => {
  const angle = scene.camera_angle || "정면";
  const shot = scene.shot_size || "미디엄 샷";
  const movement = scene.camera_movement || "고정";
  const light = scene.lighting || "자연광";

  const movementDesc: any = {
    "고정": "카메라가 안정적으로 고정되어",
    "줌 인": "카메라가 천천히 줌 인하며",
    "줌 아웃": "카메라가 서서히 줌 아웃하며",
    "팬 좌": "카메라가 부드럽게 왼쪽으로 패닝하며",
    "팬 우": "카메라가 부드럽게 오른쪽으로 패닝하며",
    "틸트 업": "카메라가 위로 틸트하며",
    "틸트 다운": "카메라가 아래로 틸트하며",
    "달리 인": "카메라가 앞으로 달리 인하며",
    "달리 아웃": "카메라가 뒤로 물러나며"
  };

  const lightDesc: any = {
    "소프트 라이트": "부드럽고 확산된 조명으로 은은한 분위기를 연출합니다",
    "하드 라이트": "강한 방향성 조명으로 드라마틱한 그림자를 만듭니다",
    "자연광": "자연스러운 주변광으로 촬영합니다",
    "스튜디오 조명": "컨트롤된 스튜디오 조명 아래에서 촬영합니다",
    "역광": "역광으로 실루엣 효과를 만들어냅니다",
    "하이 콘트라스트": "하이 콘트라스트 조명으로 시각적 임팩트를 줍니다"
  };

  return `${angle} 앵글에서 촬영한 ${shot}입니다. ${movementDesc[movement] || "카메라가 안정적으로 고정되어"} 피사체를 담아냅니다. ${lightDesc[light] || "균형 잡힌 조명으로 촬영합니다"} 길이: ${scene.duration || 3}초.`;
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}분 ${s}초` : `${s}초`;
};

const calculateSceneCompletion = (scene: Scene) => {
  const fields = [
    scene.title && scene.title.trim(),
    scene.description && scene.description.trim(),
    scene.image,
    scene.camera_angle,
    scene.shot_size,
    scene.camera_movement,
    scene.lighting,
    scene.notes && scene.notes.trim(),
  ];
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
};

const applyMemoTemplate = (currentNotes: string | undefined, templateType: string) => {
  const templates: any = {
    "인물": "\n[인물]\n- 배우: \n- 역할: \n- 의상: ",
    "소품": "\n[소품]\n- 주요 소품: \n- 배치: ",
    "장소": "\n[장소]\n- 위치: \n- 세팅: \n- 배경: ",
    "의상": "\n[의상]\n- 스타일: \n- 색상: \n- 특징: ",
    "음악/사운드": "\n[음악/사운드]\n- 음악: \n- 효과음: \n- 음성: "
  };
  return (currentNotes || "") + (templates[templateType] || "");
};

const createSampleProject = () => ({
  id: generateId(),
  title: "여름 컬렉션 런칭",
  brand_name: "럭스 스튜디오",
  production_company: "비전 프로덕션",
  video_type: "광고",
  platform: "인스타그램",
  duration: "30",
  tone: "럭셔리",
  description: "2026 여름 컬렉션을 보여주는 30초 럭셔리 패션 광고입니다.",
  created_at: new Date().toISOString(),
  scenes: [
    { id: generateId(), scene_number: 1, title: "브랜드 로고 인트로", duration: 3, description: "블랙 배경 위 은은한 파티클 이펙트와 함께 우아한 골드 로고 애니메이션.", camera_angle: "정면", shot_size: "와이드샷 (WS)", camera_movement: "줌 인", lighting: "스튜디오 조명", transition: "컷", shooting_completed: false, notes: "브랜드 가이드라인에 맞춰 로고 애니메이션 적용", image: null },
    { id: generateId(), scene_number: 2, title: "모델 워킹", duration: 5, description: "모델이 컬렉션의 히어로 의상을 입고 햇살 가득한 복도를 걸어갑니다.", camera_angle: "측면", shot_size: "와이드샷 (WS)", camera_movement: "달리 인", lighting: "자연광", transition: "컷", shooting_completed: false, notes: "골든아워 조명 선호", image: null },
    { id: generateId(), scene_number: 3, title: "제품 디테일", duration: 4, description: "메인 의상의 원단 질감과 스티칭 디테일 클로즈업.", camera_angle: "45도", shot_size: "익스트림 클로즈업 (ECU)", camera_movement: "팬 우", lighting: "소프트 라이트", transition: "컷", shooting_completed: false, notes: "질감 디테일을 위한 매크로 렌즈 사용", image: null },
  ]
});

const Badge = ({ children, variant = "default", className = "" }: any) => {
  const variants: any = {
    default: "bg-gray-100 text-gray-700",
    blue: "bg-neutral-100 text-neutral-800",
    green: "bg-neutral-100 text-neutral-700",
    purple: "bg-neutral-100 text-neutral-700",
    orange: "bg-neutral-100 text-neutral-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const AngleIcon = ({ type, size = 40 }: any) => {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  const icons: any = {
    "정면": (
      <svg {...common}>
        <rect x="12" y="8" width="16" height="20" rx="8" fill="currentColor" opacity="0.2"/>
        <circle cx="20" cy="15" r="4" fill="currentColor" opacity="0.5"/>
        <rect x="14" y="20" width="12" height="2" rx="1" fill="currentColor" opacity="0.3"/>
        <path d="M20 4L20 2M20 2L17 5M20 2L23 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="8" y="30" width="24" height="6" rx="3" fill="currentColor" opacity="0.15"/>
        <circle cx="20" cy="33" r="1.5" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    "측면": (
      <svg {...common}>
        <ellipse cx="18" cy="16" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
        <circle cx="14" cy="14" r="2.5" fill="currentColor" opacity="0.5"/>
        <path d="M10 22C10 22 14 26 22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        <path d="M32 16L35 16M35 16L32 13M35 16L32 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="8" y="30" width="24" height="6" rx="3" fill="currentColor" opacity="0.15"/>
      </svg>
    ),
    "45도": (
      <svg {...common}>
        <ellipse cx="18" cy="16" rx="9" ry="10" fill="currentColor" opacity="0.2" transform="rotate(-15 18 16)"/>
        <circle cx="16" cy="14" r="3" fill="currentColor" opacity="0.5"/>
        <path d="M30 6L33 3M33 3L30 3M33 3L33 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M33 3L22 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.4"/>
        <rect x="8" y="30" width="24" height="6" rx="3" fill="currentColor" opacity="0.15"/>
      </svg>
    ),
    "탑뷰": (
      <svg {...common}>
        <ellipse cx="20" cy="22" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
        <circle cx="20" cy="22" r="4" fill="currentColor" opacity="0.3"/>
        <circle cx="20" cy="22" r="1.5" fill="currentColor" opacity="0.5"/>
        <path d="M20 4L20 12M20 4L17 7M20 4L23 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "로우앵글": (
      <svg {...common}>
        <rect x="12" y="6" width="16" height="22" rx="4" fill="currentColor" opacity="0.2"/>
        <circle cx="20" cy="13" r="3.5" fill="currentColor" opacity="0.4"/>
        <path d="M20 36L20 28M20 36L17 33M20 36L23 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 28L20 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.3"/>
      </svg>
    ),
    "하이앵글": (
      <svg {...common}>
        <ellipse cx="20" cy="24" rx="10" ry="7" fill="currentColor" opacity="0.2"/>
        <circle cx="20" cy="22" r="3" fill="currentColor" opacity="0.4"/>
        <ellipse cx="20" cy="28" rx="6" ry="2" fill="currentColor" opacity="0.15"/>
        <path d="M20 4L20 12M20 4L17 7M20 4L23 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 12L20 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.3"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const ShotSizePreview = ({ type }: any) => {
  const frames: any = {
    "익스트림 클로즈업": { bodyTop: 10, bodyH: 40, head: true, crop: "4 8 32 24" },
    "클로즈업": { bodyTop: 6, bodyH: 40, head: true, crop: "2 4 36 28" },
    "미디엄 샷": { bodyTop: 4, bodyH: 40, head: true, crop: "0 0 40 32" },
    "와이드 샷": { bodyTop: 2, bodyH: 40, head: true, crop: "0 0 40 40" },
    "이스태블리싱 샷": { bodyTop: 0, bodyH: 40, head: true, crop: "0 0 40 40" },
  };
  const f = frames[type];
  if (!f) return null;

  const viewBox = type === "익스트림 클로즈업" ? "8 6 24 18"
    : type === "클로즈업" ? "6 4 28 22"
    : type === "미디엄 샷" ? "4 2 32 28"
    : "0 0 40 40";

  return (
    <svg width="48" height="32" viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      {type === "이스태블리싱 샷" && (
        <>
          <rect x="2" y="20" width="8" height="16" rx="1" fill="currentColor" opacity="0.1"/>
          <rect x="12" y="16" width="6" height="20" rx="1" fill="currentColor" opacity="0.1"/>
          <rect x="28" y="18" width="10" height="18" rx="1" fill="currentColor" opacity="0.1"/>
          <line x1="0" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        </>
      )}
      <circle cx="20" cy="10" r="5" fill="currentColor" opacity="0.35"/>
      <rect x="14" y="16" width="12" height="18" rx="4" fill="currentColor" opacity="0.2"/>
      {type !== "이스태블리싱 샷" && type !== "와이드 샷" && (
        <>
          <circle cx="18" cy="9" r="1" fill="currentColor" opacity="0.5"/>
          <circle cx="22" cy="9" r="1" fill="currentColor" opacity="0.5"/>
          <path d="M18 12.5C18 12.5 19 13.5 22 12.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
};

const MovementIcon = ({ type, size = 32 }: any) => {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  const icons: any = {
    "고정": (
      <svg {...common}>
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    "줌 인": (
      <svg {...common}>
        <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <path d="M8 8L12 12M24 8L20 12M8 24L12 20M24 24L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    "줌 아웃": (
      <svg {...common}>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <path d="M12 12L8 8M20 12L24 8M12 20L8 24M20 20L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    "팬 좌": (
      <svg {...common}>
        <rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <path d="M8 16L3 16M3 16L6 13M3 16L6 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "팬 우": (
      <svg {...common}>
        <rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <path d="M24 16L29 16M29 16L26 13M29 16L26 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "틸트 업": (
      <svg {...common}>
        <rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <path d="M16 8L16 3M16 3L13 6M16 3L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "틸트 다운": (
      <svg {...common}>
        <rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <path d="M16 24L16 29M16 29L13 26M16 29L19 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "달리 인": (
      <svg {...common}>
        <rect x="8" y="8" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.4"/>
        <path d="M16 6L16 2M16 2L14 4M16 2L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    "달리 아웃": (
      <svg {...common}>
        <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <rect x="8" y="8" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.4"/>
        <path d="M16 2L16 6M16 6L14 4M16 6L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const VisualAngleSelector = ({ value, onChange }: any) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
        <Camera className="w-3.5 h-3.5" /> 카메라 앵글
      </label>
      <div className="grid grid-cols-3 gap-2">
        {CAMERA_ANGLES.map((a: any) => (
          <button key={a.value} onClick={() => onChange(a.value)}
            className={`relative flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all text-center group hover:shadow-md ${
              value === a.value
                ? "border-neutral-400 bg-neutral-100 text-neutral-800 shadow-sm"
                : "border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50"
            }`}>
            <div className={`transition-transform group-hover:scale-110 ${value === a.value ? "text-neutral-700" : "text-gray-400"}`}>
              <AngleIcon type={a.value} size={36} />
            </div>
            <span className="text-[10px] font-bold leading-tight">{a.value}</span>
            <span className="text-[8px] opacity-60 leading-tight">{a.desc}</span>
            {value === a.value && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-800 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </button>
        ))}
        <button onClick={() => setShowCustomInput(!showCustomInput)}
          className="relative flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50 transition-all text-center group hover:shadow-md">
          <div className="transition-transform group-hover:scale-110 text-gray-400">✏️</div>
          <span className="text-[10px] font-bold leading-tight">직접 입력</span>
        </button>
      </div>
      {showCustomInput && (
        <div className="col-span-full mt-2">
          <input
            type="text"
            placeholder="카메라 앵글을 직접 입력..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && customValue.trim()) { onChange(customValue.trim()); setShowCustomInput(false); setCustomValue(''); }}}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>
      )}
    </div>
  );
};

const VisualShotSelector = ({ value, onChange }: any) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
        <Maximize className="w-3.5 h-3.5" /> 샷 사이즈
      </label>
      <div className="space-y-1.5">
        {SHOT_SIZES.map((s: any) => (
          <button key={s.value} onClick={() => onChange(s.value)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all group hover:shadow-md ${
              value === s.value
                ? "border-neutral-400 bg-neutral-100 shadow-sm"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}>
            <div className={`w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${value === s.value ? "text-neutral-700" : "text-gray-400"}`}>
              <ShotSizePreview type={s.value} />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${value === s.value ? "text-neutral-800" : "text-gray-700"}`}>{s.value}</span>
              </div>
              <span className="text-[10px] text-gray-400 leading-tight">{s.desc}</span>
            </div>
            {value === s.value && <Check className="w-4 h-4 text-neutral-600 flex-shrink-0" />}
          </button>
        ))}
        <button onClick={() => setShowCustomInput(!showCustomInput)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-white hover:border-gray-200 transition-all group hover:shadow-md">
          <div className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-400">✏️</div>
          <div className="flex-1 text-left">
            <span className="text-xs font-semibold text-gray-700">직접 입력</span>
          </div>
        </button>
        {showCustomInput && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="샷 사이즈를 직접 입력..."
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && customValue.trim()) { onChange(customValue.trim()); setShowCustomInput(false); setCustomValue(''); }}}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const VisualMovementSelector = ({ value, onChange }: any) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
        <Move className="w-3.5 h-3.5" /> 카메라 무브먼트
      </label>
      <div className="grid grid-cols-3 gap-1.5">
        {CAMERA_MOVEMENTS.map((m: any) => (
          <button key={m.value} onClick={() => onChange(m.value)}
            className={`relative flex flex-col items-center gap-0.5 p-2 rounded-lg border-2 transition-all group hover:shadow-md ${
              value === m.value
                ? "border-neutral-400 bg-neutral-100 text-neutral-800 shadow-sm"
                : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
            }`}>
            <div className={`transition-transform group-hover:scale-110 ${value === m.value ? "text-neutral-700" : "text-gray-400"}`}>
              <MovementIcon type={m.value} size={28} />
            </div>
            <span className="text-[9px] font-bold leading-tight">{m.value}</span>
            <span className="text-[8px] opacity-50 leading-tight">{m.desc}</span>
            {value === m.value && (
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-neutral-800 rounded-full flex items-center justify-center">
                <Check className="w-2 h-2 text-white" />
              </div>
            )}
          </button>
        ))}
        <button onClick={() => setShowCustomInput(!showCustomInput)}
          className="relative flex flex-col items-center gap-0.5 p-2 rounded-lg border-2 border-gray-100 bg-white text-gray-500 hover:border-gray-200 transition-all group hover:shadow-md">
          <div className="transition-transform group-hover:scale-110 text-gray-400">✏️</div>
          <span className="text-[9px] font-bold leading-tight">직접</span>
          <span className="text-[9px] font-bold leading-tight">입력</span>
        </button>
      </div>
      {showCustomInput && (
        <div className="col-span-full mt-2">
          <input
            type="text"
            placeholder="카메라 무브먼트를 직접 입력..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && customValue.trim()) { onChange(customValue.trim()); setShowCustomInput(false); setCustomValue(''); }}}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>
      )}
    </div>
  );
};

const VisualLightingSelector = ({ value, onChange }: any) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
        <Sun className="w-3.5 h-3.5" /> 조명
      </label>
      <div className="grid grid-cols-2 gap-2">
        {LIGHTING_OPTIONS.map((l: any) => (
          <button key={l.value} onClick={() => onChange(l.value)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 transition-all group hover:shadow-md ${
              value === l.value
                ? "border-neutral-400 bg-neutral-100 shadow-sm"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}>
            <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">{l.icon}</span>
            <div className="text-left flex-1 min-w-0">
              <span className={`text-[10px] font-bold block leading-tight ${value === l.value ? "text-neutral-800" : "text-gray-700"}`}>{l.value}</span>
              <span className="text-[8px] text-gray-400 block leading-tight truncate">{l.desc}</span>
            </div>
            {value === l.value && <Check className="w-3.5 h-3.5 text-neutral-600 flex-shrink-0" />}
          </button>
        ))}
        <button onClick={() => setShowCustomInput(!showCustomInput)}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-white hover:border-gray-200 transition-all group hover:shadow-md">
          <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">✏️</span>
          <div className="text-left flex-1 min-w-0">
            <span className="text-[10px] font-bold block leading-tight text-gray-700">직접 입력</span>
          </div>
        </button>
      </div>
      {showCustomInput && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="조명을 직접 입력..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && customValue.trim()) { onChange(customValue.trim()); setShowCustomInput(false); setCustomValue(''); }}}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>
      )}
    </div>
  );
};

// 화면비율에 따른 마스킹 계산 함수
const calculateMaskingPercentage = (aspectRatio: string): number => {
  // aspectRatio는 "16:9", "9:16", "1:1", "4:5" 등의 형식
  if (!aspectRatio || aspectRatio === "16:9") return 0; // 16:9는 마스킹 없음

  const [w, h] = aspectRatio.split(':').map(Number);
  if (!w || !h) return 0;

  // 이미지의 기본 비율은 16:9 (너비를 1로 정규화하면 높이는 9/16)
  const imageHeight = 9 / 16;

  // 표시할 영역의 너비 계산: height * (targetW/targetH)
  const visibleWidth = imageHeight * (w / h);

  // 양쪽에 마스킹할 너비 계산
  const maskingPercentage = (1 - visibleWidth) / 2 * 100;

  return Math.max(0, maskingPercentage);
};

const ImageUploadArea = ({ image, onImageChange, aspectRatio = "16:9", isPdfExport = false }: any) => {
  const fileRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const maskingPercentage = calculateMaskingPercentage(aspectRatio);
  const showMasking = maskingPercentage > 0;

  const handleFile = (file: any) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        onImageChange(e.target.result);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  }, [isEditing]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditing) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [isEditing, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isEditing) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, isEditing, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden transition-all ${dragOver ? "ring-2 ring-neutral-400" : ""}`}
      onDragOver={(e: any) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e: any) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}>
      {image ? (
        <div className="relative group" ref={containerRef}>
          <div
            className="w-full overflow-hidden rounded-2xl relative"
            style={{ aspectRatio: "16/9", cursor: isEditing ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={image}
              alt="씬"
              className="w-full h-full object-cover select-none"
              crossOrigin="anonymous"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
              }}
            />

            {/* 화면비율 마스킹 오버레이 */}
            {showMasking && (
              <>
                {/* 좌측 마스킹 */}
                <div
                  className="absolute top-0 left-0 bottom-0 bg-black/40 backdrop-blur-sm"
                  style={{ width: `${maskingPercentage}%`, pointerEvents: 'none' }}
                />
                {/* 우측 마스킹 */}
                <div
                  className="absolute top-0 right-0 bottom-0 bg-black/40 backdrop-blur-sm"
                  style={{ width: `${maskingPercentage}%`, pointerEvents: 'none' }}
                />
                {/* 세이프존 레이블 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap">
                  세이프존 ({aspectRatio})
                </div>
                {/* 잘리는 영역 안내 텍스트 */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-[10px] bg-black/50 backdrop-blur-sm px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                  어두운 영역은 숏폼에서 잘림
                </div>
              </>
            )}
          </div>

          {/* 편집 모드 컨트롤 */}
          {isEditing && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition text-lg font-bold">−</button>
              <span className="text-white text-xs font-medium min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition text-lg font-bold">+</button>
              <div className="w-px h-5 bg-white/30 mx-1" />
              <button onClick={handleReset} className="px-2 py-1 text-white hover:bg-white/20 rounded-lg transition text-xs" title="초기화"><RotateCcw className="w-3.5 h-3.5" /></button>
              <div className="w-px h-5 bg-white/30 mx-1" />
              <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-white text-neutral-900 rounded-lg text-xs font-semibold hover:bg-neutral-200 transition">완료</button>
            </div>
          )}

          {/* 기본 호버 컨트롤 */}
          {!isEditing && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-3">
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm"><Move className="w-4 h-4 inline mr-1" /> 위치/크기</button>
              <button onClick={() => (fileRef.current as any)?.click()} className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm"><Upload className="w-4 h-4 inline mr-1" /> 교체</button>
              <button onClick={() => { onImageChange(null); handleReset(); }} className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm"><Trash2 className="w-4 h-4 inline mr-1" /> 삭제</button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => (fileRef.current as any)?.click()} className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:border-neutral-400 hover:bg-neutral-100/30 transition-all cursor-pointer" style={{ aspectRatio: "16/9" }}>
          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-3"><Image className="w-7 h-7 text-gray-400" /></div>
          <p className="text-sm font-medium text-gray-500">이미지를 드래그하거나 클릭하여 업로드</p>
          <p className="text-xs text-gray-400 mt-1">스케치, 레퍼런스 이미지 또는 생성 이미지</p>
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e: any) => handleFile(e.target.files?.[0])} />
    </div>
  );
};

const VisualLensSelector = ({ value, onChange }: any) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
        🎥 렌즈 설정
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border-2 border-gray-100 bg-white rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent hover:border-gray-200 transition-all">
        <option value="">렌즈를 선택하세요</option>
        {LENS_OPTIONS.map((l: any) => (
          <option key={l.value} value={l.value}>{l.value} ({l.focal})</option>
        ))}
      </select>
      <button
        onClick={() => setShowCustomInput(!showCustomInput)}
        className="w-full mt-2 px-3 py-2 text-sm font-medium text-gray-600 border-2 border-gray-100 bg-white rounded-lg hover:border-gray-200 hover:bg-gray-50 transition-all">
        ✏️ 직접 입력
      </button>
      {showCustomInput && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="렌즈를 직접 입력..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && customValue.trim()) { onChange(customValue.trim()); setShowCustomInput(false); setCustomValue(''); }}}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>
      )}
    </div>
  );
};

const VisualFramerateSelector = ({ value, onChange }: any) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
        ⚡ 프레임레이트
      </label>
      <select
        value={value || '24fps'}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border-2 border-gray-100 bg-white rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent hover:border-gray-200 transition-all">
        {FRAMERATE_OPTIONS.map((f: any) => (
          <option key={f.value} value={f.value}>{f.value}</option>
        ))}
      </select>
      <button
        onClick={() => setShowCustomInput(!showCustomInput)}
        className="w-full mt-2 px-3 py-2 text-sm font-medium text-gray-600 border-2 border-gray-100 bg-white rounded-lg hover:border-gray-200 hover:bg-gray-50 transition-all">
        ✏️ 직접 입력
      </button>
      {showCustomInput && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="프레임레이트를 직접 입력..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && customValue.trim()) { onChange(customValue.trim()); setShowCustomInput(false); setCustomValue(''); }}}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>
      )}
    </div>
  );
};

const SceneProgressRing = ({ completion }: any) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completion / 100) * circumference;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="transform -rotate-90">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="2" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="#737373"
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <text x="22" y="27" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">
        {completion}%
      </text>
    </svg>
  );
};

const SceneEditor = ({ scene, onUpdate, onOpenReferenceLibrary, aspectRatio = "16:9" }: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const memoTemplates = ["인물", "소품", "장소", "의상", "음악/사운드"];
  const completion = useMemo(() => calculateSceneCompletion(scene), [scene]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      onUpdate({ ...scene, description: generateDescription(scene) });
      setIsGenerating(false);
    }, 800);
  };

  const handleApplyMemoTemplate = (templateType: string) => {
    const newNotes = applyMemoTemplate(scene.notes, templateType);
    onUpdate({ ...scene, notes: newNotes });
  };

  if (!scene) return (
    <div className="flex-1 flex items-center justify-center text-gray-400"><div className="text-center"><Film className="w-12 h-12 mx-auto mb-3 opacity-50" /><p className="font-medium">편집할 씬을 선택하세요</p></div></div>
  );

  // Handle blank pages
  if (scene.blank_page_type) {
    return (
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{scene.title}</h2>
          <p className="text-sm text-gray-600">빈 페이지 - {scene.blank_page_type}</p>
        </div>
        <div className="flex-1 p-6">
          <BlankPageContent
            type={scene.blank_page_type}
            content={scene.blank_page_content || {}}
            onChange={(content) => onUpdate({ ...scene, blank_page_content: content })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
        <div className="lg:col-span-3 space-y-5">
          <div className="relative">
            <ImageUploadArea image={scene.image} onImageChange={(img: any) => onUpdate({ ...scene, image: img })} aspectRatio={aspectRatio} />
            <button
              onClick={() => onOpenReferenceLibrary?.()}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all text-sm font-medium"
            >
              <Image className="w-4 h-4" />
              레퍼런스 라이브러리에서 선택 (514)
            </button>
          </div>
          <div><input type="text" value={scene.title || ""} onChange={(e: any) => onUpdate({ ...scene, title: e.target.value })} placeholder="씬 제목" className="w-full text-xl font-bold text-gray-900 border-0 border-b-2 border-transparent focus:border-neutral-400 focus:outline-none pb-1 bg-transparent placeholder-gray-300" /></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">씬 설명</label>
              <div className="flex gap-1.5">
                {scene.description && (
                  <button onClick={() => onUpdate({ ...scene, description: '' })} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"><X className="w-3 h-3" />지우기</button>
                )}
                <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"><Sparkles className="w-3.5 h-3.5" />{isGenerating ? "생성 중..." : "자동 생성"}</button>
              </div>
            </div>
            <textarea value={scene.description || ""} onChange={(e: any) => onUpdate({ ...scene, description: e.target.value })} rows={4} placeholder="이 씬에서 무슨 일이 일어나는지 설명하세요..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none text-sm leading-relaxed text-gray-900 bg-white" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">대사 / 나레이션</label>
            <textarea value={scene.dialogue || ""} onChange={(e: any) => onUpdate({ ...scene, dialogue: e.target.value })} rows={2} placeholder="이 씬의 대사나 나레이션을 입력하세요..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none text-sm leading-relaxed text-gray-900 bg-white" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">자막</label>
            <textarea value={scene.subtitle || ""} onChange={(e: any) => onUpdate({ ...scene, subtitle: e.target.value })} rows={2} placeholder="이 씬의 자막을 입력하세요..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none text-sm leading-relaxed text-gray-900 bg-white" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">사운드 / BGM</label>
            <input type="text" value={scene.sound || ""} onChange={(e: any) => onUpdate({ ...scene, sound: e.target.value })} placeholder="배경음악, 효과음 등..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent text-sm text-gray-900 bg-white" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">감독 메모</label>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {memoTemplates.map((template: any) => (
                  <button
                    key={template}
                    onClick={() => handleApplyMemoTemplate(template)}
                    className="px-2 py-1 text-xs bg-neutral-200 text-neutral-700 rounded hover:bg-neutral-300 transition-colors"
                  >
                    + {template}
                  </button>
                ))}
              </div>
            </div>
            <textarea value={scene.notes || ""} onChange={(e: any) => onUpdate({ ...scene, notes: e.target.value })} rows={3} placeholder="촬영 메모, 리마인더 추가..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none text-sm bg-white text-gray-900 border-neutral-200" />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5 overflow-y-auto">
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-xs font-semibold text-gray-700 mb-2 block flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 씬 길이</label>
            <div className="flex items-center gap-3">
              <input type="range" min="1" max="60" value={scene.duration || 3} onChange={(e: any) => onUpdate({ ...scene, duration: parseInt(e.target.value) })} className="flex-1 accent-neutral-600 h-2" />
              <div className="bg-neutral-800 text-white text-sm font-bold px-3 py-1.5 rounded-lg min-w-[52px] text-center">{scene.duration || 3}초</div>
            </div>
          </div>

          <VisualAngleSelector value={scene.camera_angle} onChange={(v: any) => onUpdate({ ...scene, camera_angle: v })} />
          <VisualShotSelector value={scene.shot_size} onChange={(v: any) => onUpdate({ ...scene, shot_size: v })} />
          <VisualMovementSelector value={scene.camera_movement} onChange={(v: any) => onUpdate({ ...scene, camera_movement: v })} />
          <VisualLightingSelector value={scene.lighting} onChange={(v: any) => onUpdate({ ...scene, lighting: v })} />
          <VisualLensSelector value={scene.lens} onChange={(v: any) => onUpdate({ ...scene, lens: v })} />
          <VisualFramerateSelector value={scene.framerate} onChange={(v: any) => onUpdate({ ...scene, framerate: v })} />

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
              ➡️ 씬 전환효과
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TRANSITIONS.map((t: any) => (
                <button key={t.value} onClick={() => onUpdate({ ...scene, transition: t.value })}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border-2 transition-all text-center group ${
                    (scene.transition || "컷") === t.value
                      ? "border-neutral-400 bg-neutral-100 shadow-sm"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}>
                  <span className="text-lg flex-shrink-0">{t.icon}</span>
                  <div className="text-left flex-1 min-w-0">
                    <span className={`text-[9px] font-bold block leading-tight ${(scene.transition || "컷") === t.value ? "text-neutral-800" : "text-gray-700"}`}>{t.value}</span>
                    <span className="text-[7px] text-gray-400 block leading-tight">{t.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl p-4 border border-neutral-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-neutral-900 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 완성도</h3>
              <div className="w-11 h-11">
                <SceneProgressRing completion={completion} />
              </div>
            </div>
            <p className="text-xs text-neutral-800">
              {completion < 50 && "더 많은 정보를 추가해주세요"}
              {completion >= 50 && completion < 100 && "거의 완성되었습니다"}
              {completion === 100 && "모든 필드가 작성되었습니다"}
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 text-white">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-3"><Eye className="w-4 h-4" /> 씬 요약</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">길이</span><span className="font-medium">{scene.duration}초</span></div>
              <div className="flex justify-between"><span className="text-gray-400">앵글</span><span className="font-medium">{scene.camera_angle}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">샷</span><span className="font-medium">{scene.shot_size}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">무브먼트</span><span className="font-medium">{scene.camera_movement}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">조명</span><span className="font-medium">{scene.lighting}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryboardGrid = ({ scenes, onSelectScene }: any) => (
  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {scenes.map((scene: Scene) => (
        <button key={scene.id} onClick={() => onSelectScene(scene.id)} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-neutral-300 transition-all group text-left">
          <div className="relative" style={{ aspectRatio: "16/9" }}>
            {scene.image ? <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center"><Film className="w-8 h-8 text-gray-300" /></div>}
            <div className="absolute top-2 left-2"><span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md">#{scene.scene_number}</span></div>
            <div className="absolute bottom-2 right-2"><span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">{scene.duration}초</span></div>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-neutral-700 transition-colors">{scene.title || `씬 ${scene.scene_number}`}</h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{scene.description || "설명 없음"}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap"><Badge>{scene.shot_size}</Badge><Badge>{scene.camera_angle}</Badge></div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const TimelineView = ({ scenes, activeSceneId, onSelectScene }: any) => {
  const totalDuration = scenes.reduce((sum: number, s: Scene) => sum + (s.duration || 0), 0);
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-900">타임라인</h3><div className="flex items-center gap-2 text-sm text-gray-500"><Clock className="w-4 h-4" /> 전체: <span className="font-bold text-gray-900">{formatDuration(totalDuration)}</span></div></div>
        <div className="flex gap-1 mb-6 rounded-lg overflow-hidden">
          {scenes.map((scene: Scene, i: number) => {
            const width = totalDuration > 0 ? (scene.duration / totalDuration) * 100 : 100 / scenes.length;
            const colors = ["bg-neutral-500", "bg-neutral-600", "bg-neutral-700", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600", "bg-neutral-700"];
            return <button key={scene.id} onClick={() => onSelectScene(scene.id)} className={`${colors[i % colors.length]} h-10 rounded transition-all hover:opacity-80 ${activeSceneId === scene.id ? "ring-2 ring-offset-1 ring-neutral-700" : ""}`} style={{ width: `${width}%`, minWidth: "2rem" }} title={`${scene.title} (${scene.duration}초)`}><span className="text-white text-xs font-bold">{scene.scene_number}</span></button>;
          })}
        </div>
        <div className="space-y-2">
          {scenes.map((scene: Scene, i: number) => {
            let accum = 0; for (let j = 0; j < i; j++) accum += scenes[j].duration || 0;
            const transition = TRANSITIONS.find((t: any) => t.value === (scene.transition || "컷"));
            return (
              <div key={scene.id}>
                <button onClick={() => onSelectScene(scene.id)} className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all ${activeSceneId === scene.id ? "bg-neutral-100 border border-neutral-300" : "hover:bg-gray-50"}`}>
                  <span className="text-xs font-mono text-gray-400 w-16">{formatDuration(accum)}</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">{scene.scene_number}</div>
                  <div className="flex-1"><h4 className="text-sm font-medium text-gray-900">{scene.title || `씬 ${scene.scene_number}`}</h4><p className="text-xs text-gray-400">{scene.shot_size} · {scene.camera_movement}</p></div>
                  <span className="text-sm font-medium text-gray-600">{scene.duration}초</span>
                </button>
                {i < scenes.length - 1 && transition && (
                  <div className="ml-20 text-xs text-gray-500 py-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded">
                      {transition.icon} {transition.value}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PresentationView = ({ scenes, projectTitle }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scene = scenes[currentIndex];
  if (!scene) return null;
  return (
    <div className="p-6">
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
        <div className="relative" style={{ aspectRatio: "16/9" }}>
          {scene.image ? <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center"><div className="text-center"><Film className="w-16 h-16 text-slate-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-white">{scene.title || `씬 ${scene.scene_number}`}</h2></div></div>}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="flex items-end justify-between">
              <div><Badge variant="blue" className="mb-2">씬 {scene.scene_number}</Badge><h2 className="text-2xl font-bold text-white">{scene.title}</h2><p className="text-gray-300 text-sm mt-2 max-w-xl">{scene.description}</p></div>
              <div className="text-right text-white text-sm space-y-1"><p>{scene.camera_angle} · {scene.shot_size}</p><p>{scene.camera_movement} · {scene.lighting}</p><p className="font-bold">{scene.duration}초</p></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-800">
          <span className="text-sm text-slate-400">{projectTitle}</span>
          <div className="flex items-center gap-2"><button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="p-2 text-white hover:bg-slate-700 rounded-lg disabled:opacity-30 transition-colors"><ChevronLeft className="w-5 h-5" /></button><span className="text-white text-sm font-medium px-3">{currentIndex + 1} / {scenes.length}</span><button onClick={() => setCurrentIndex(Math.min(scenes.length - 1, currentIndex + 1))} disabled={currentIndex === scenes.length - 1} className="p-2 text-white hover:bg-slate-700 rounded-lg disabled:opacity-30 transition-colors"><ChevronRight className="w-5 h-5" /></button></div>
          <span className="text-sm text-slate-400">{formatDuration(scenes.reduce((s: number, sc: Scene) => s + (sc.duration || 0), 0))}</span>
        </div>
      </div>
    </div>
  );
};

// ChecklistView 제거됨 (촬영 진행도는 사이드바에서 확인 가능)

// ========== 인라인 편집 필드 (포커스 유지를 위해 컴포넌트 바깥에 정의) ==========
const InfoField = ({ label, field, placeholder, value, type, onChange, inputCls, labelCls }: {
  label: string; field: string; placeholder: string; value?: string; type?: string;
  onChange: (field: string, value: string) => void; inputCls: string; labelCls: string;
}) => {
  const [localVal, setLocalVal] = useState(value || '');
  const timerRef = useRef<any>(null);

  useEffect(() => {
    setLocalVal(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLocalVal(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(field, v), 300);
  };

  return (
    <div>
      <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>{label}</label>
      <input type={type || "text"} value={localVal} onChange={handleChange} placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`} />
    </div>
  );
};

const InfoTextarea = ({ label, value, placeholder, rows, onChange, inputCls, labelCls, className }: {
  label: string; value?: string; placeholder: string; rows: number;
  onChange: (value: string) => void; inputCls: string; labelCls: string; className?: string;
}) => {
  const [localVal, setLocalVal] = useState(value || '');
  const timerRef = useRef<any>(null);

  useEffect(() => {
    setLocalVal(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setLocalVal(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), 300);
  };

  return (
    <div className={className}>
      <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>{label}</label>
      <textarea value={localVal} onChange={handleChange} rows={rows} placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition resize-none ${inputCls}`} />
    </div>
  );
};

// ========== 프로젝트 정보 뷰 (1번째 페이지) ==========
const ProjectInfoView = ({ project, onUpdate, darkMode }: { project: Project; onUpdate: (u: Partial<Project>) => void; darkMode: boolean }) => {
  const info = project.project_info || {};
  const updateInfo = useCallback((field: string, value: string) => {
    onUpdate({ project_info: { ...project.project_info, [field]: value } });
  }, [project.project_info, onUpdate]);
  const cardCls = darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100";
  const inputCls = darkMode
    ? "bg-neutral-700 text-white border-neutral-600 placeholder-neutral-500 focus:ring-neutral-400"
    : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:ring-neutral-500";
  const labelCls = darkMode ? "text-neutral-300" : "text-gray-600";

  return (
    <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? "bg-neutral-900" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>프로젝트 정보</h2>
            <p className={`text-sm mt-1 ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>스토리보드 표지에 들어갈 기본 정보</p>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${darkMode ? "bg-neutral-700 text-neutral-300" : "bg-gray-100 text-gray-500"}`}>1페이지</div>
        </div>

        {/* 프로젝트 기본 정보 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><Film className="w-4 h-4" /> 프로젝트 기본</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="프로젝트명" field="__title" placeholder="프로젝트 이름" value={project.title} onChange={(_f, v) => onUpdate({ title: v })} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="브랜드 / 클라이언트명" field="brand_name" placeholder="예: 삼성전자" value={info.brand_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="광고주 / 클라이언트 담당자" field="client_name" placeholder="예: 홍길동 과장" value={info.client_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>영상 유형</label>
              <select value={project.video_type || ''} onChange={(e) => onUpdate({ video_type: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition ${inputCls}`}>
                <option value="">선택하세요</option>
                {VIDEO_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${labelCls}`}>비율 / 해상도</label>
              <div className={`px-4 py-2.5 rounded-xl text-sm border ${darkMode ? "bg-neutral-700 border-neutral-600 text-neutral-300" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
                {project.aspect_ratio || '16:9'} · {project.resolution || '1920x1080'}
              </div>
            </div>
          </div>
        </div>

        {/* 제작사 / 감독 정보 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><Users className="w-4 h-4" /> 제작진 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="담당자 (PM)" field="manager_name" placeholder="이름" value={info.manager_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="담당자 연락처" field="manager_phone" placeholder="010-0000-0000" value={info.manager_phone} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="담당자 이메일" field="manager_email" placeholder="email@example.com" value={info.manager_email} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="감독" field="director_name" placeholder="감독 이름" value={info.director_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="감독 연락처" field="director_phone" placeholder="010-0000-0000" value={info.director_phone} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="촬영감독 (DP)" field="dp_name" placeholder="촬영감독 이름" value={info.dp_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="촬영감독 연락처" field="dp_phone" placeholder="010-0000-0000" value={info.dp_phone} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="PD / 프로듀서" field="pd_name" placeholder="PD 이름" value={info.pd_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="PD 연락처" field="pd_phone" placeholder="010-0000-0000" value={info.pd_phone} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
          </div>
        </div>

        {/* 프로젝트 설명 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><Edit3 className="w-4 h-4" /> 프로젝트 설명</h3>
          <InfoTextarea label="" value={project.description} placeholder="이 프로젝트에 대한 간단한 설명, 컨셉, 목표 등을 적어주세요..." rows={4} onChange={(v) => onUpdate({ description: v })} inputCls={inputCls} labelCls={labelCls} />
        </div>
      </div>
    </div>
  );
};

// ========== 촬영 정보 뷰 (2번째 페이지) ==========
const ShootingInfoView = ({ project, onUpdate, darkMode }: { project: Project; onUpdate: (u: Partial<Project>) => void; darkMode: boolean }) => {
  const info = project.shooting_info || {};
  const updateInfo = useCallback((field: string, value: string) => {
    onUpdate({ shooting_info: { ...project.shooting_info, [field]: value } });
  }, [project.shooting_info, onUpdate]);
  const cardCls = darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100";
  const inputCls = darkMode
    ? "bg-neutral-700 text-white border-neutral-600 placeholder-neutral-500 focus:ring-neutral-400"
    : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:ring-neutral-500";
  const labelCls = darkMode ? "text-neutral-300" : "text-gray-600";

  return (
    <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? "bg-neutral-900" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>촬영 정보</h2>
            <p className={`text-sm mt-1 ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>촬영 장소, 스튜디오, 주차 등 현장 정보</p>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${darkMode ? "bg-neutral-700 text-neutral-300" : "bg-gray-100 text-gray-500"}`}>2페이지</div>
        </div>

        {/* 촬영 일정 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><Clock className="w-4 h-4" /> 촬영 일정</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="촬영일" field="shoot_date" placeholder="2026-03-15" value={info.shoot_date} type="date" onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="촬영 일수" field="shoot_days" placeholder="예: 2일" value={info.shoot_days} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="콜타임 (출근 시간)" field="call_time" placeholder="예: 07:00" value={info.call_time} type="time" onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="예상 종료 시간" field="wrap_time" placeholder="예: 19:00" value={info.wrap_time} type="time" onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="점심시간" field="lunch_time" placeholder="예: 12:00~13:00" value={info.lunch_time} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
          </div>
        </div>

        {/* 촬영 장소 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><Target className="w-4 h-4" /> 촬영 장소</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="촬영 장소명" field="location_name" placeholder="예: 한남동 루프탑" value={info.location_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="촬영 장소 주소" field="location_address" placeholder="서울시 용산구 한남동 123-45" value={info.location_address} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
          </div>
        </div>

        {/* 스튜디오 정보 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><Camera className="w-4 h-4" /> 스튜디오 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="스튜디오 이름" field="studio_name" placeholder="예: PEWPEW Studio A" value={info.studio_name} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="스튜디오 주소" field="studio_address" placeholder="서울시 강남구..." value={info.studio_address} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="스튜디오 연락처" field="studio_phone" placeholder="02-0000-0000" value={info.studio_phone} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoTextarea label="주차 안내" value={info.parking_info} placeholder="주차 가능 대수, 위치, 유/무료 여부 등..." rows={3} onChange={(v) => updateInfo('parking_info', v)} inputCls={inputCls} labelCls={labelCls} className="md:col-span-2" />
          </div>
        </div>

        {/* 안전/기타 정보 */}
        <div className={`rounded-2xl border p-6 ${cardCls}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}><HelpCircle className="w-4 h-4" /> 안전 / 기타</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="가까운 병원" field="nearest_hospital" placeholder="병원명 및 주소" value={info.nearest_hospital} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoField label="날씨 메모" field="weather_note" placeholder="예: 맑음, 30°C 예상" value={info.weather_note} onChange={updateInfo} inputCls={inputCls} labelCls={labelCls} />
            <InfoTextarea label="특이사항 / 주의사항" value={info.special_notes} placeholder="현장 주의사항, 반입 금지 물품, 드레스코드 등..." rows={3} onChange={(v) => updateInfo('special_notes', v)} inputCls={inputCls} labelCls={labelCls} className="md:col-span-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== 편집 가능한 타임테이블 뷰 ==========
const TimetableView = ({ project, onUpdate, darkMode }: { project: Project; onUpdate: (u: Partial<Project>) => void; darkMode: boolean }) => {
  const timetable = project.timetable || [];

  const addEntry = () => {
    const newEntry: TimetableEntry = {
      id: generateId(),
      time_start: '',
      time_end: '',
      activity: '',
      location: '',
      int_ext: '실내',
      day_night: '낮',
      cast: '',
      notes: '',
    };
    onUpdate({ timetable: [...timetable, newEntry] });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    onUpdate({
      timetable: timetable.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const deleteEntry = (id: string) => {
    onUpdate({ timetable: timetable.filter(e => e.id !== id) });
  };

  const moveEntry = (index: number, direction: number) => {
    const newTable = [...timetable];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newTable.length) return;
    [newTable[index], newTable[targetIndex]] = [newTable[targetIndex], newTable[index]];
    onUpdate({ timetable: newTable });
  };

  // 씬에서 자동으로 타임테이블 생성
  const generateFromScenes = () => {
    const shootInfo = project.shooting_info || {};
    let currentMinutes = shootInfo.call_time ? parseInt(shootInfo.call_time.split(':')[0]) * 60 + parseInt(shootInfo.call_time.split(':')[1] || '0') : 8 * 60;

    const entries: TimetableEntry[] = [];

    // 준비 시간
    entries.push({
      id: generateId(), time_start: formatTime(currentMinutes), time_end: formatTime(currentMinutes + 30),
      activity: '현장 세팅 & 장비 준비', location: shootInfo.studio_name || shootInfo.location_name || '', int_ext: '실내', day_night: '낮', cast: '스태프 전원', notes: '',
    });
    currentMinutes += 30;

    project.scenes.forEach((scene, i) => {
      const setupTime = 15;
      const shootTime = Math.max((scene.duration || 3) * 8, 20); // 최소 20분

      // 세팅
      entries.push({
        id: generateId(), time_start: formatTime(currentMinutes), time_end: formatTime(currentMinutes + setupTime),
        scene_id: scene.id, activity: `씬 ${scene.scene_number || i + 1} 세팅 - ${scene.title}`, location: '', int_ext: '실내', day_night: '낮', cast: '', notes: `${scene.camera_angle || ''} / ${scene.shot_size || ''}`,
      });
      currentMinutes += setupTime;

      // 촬영
      entries.push({
        id: generateId(), time_start: formatTime(currentMinutes), time_end: formatTime(currentMinutes + shootTime),
        scene_id: scene.id, activity: `씬 ${scene.scene_number || i + 1} 촬영 - ${scene.title}`, location: '', int_ext: '실내', day_night: '낮', cast: '', notes: scene.description || '',
      });
      currentMinutes += shootTime;

      // 점심 시간 (약 4시간 후)
      if (i === Math.floor(project.scenes.length / 2) - 1) {
        entries.push({
          id: generateId(), time_start: formatTime(currentMinutes), time_end: formatTime(currentMinutes + 60),
          activity: '점심 식사', location: '', int_ext: '', day_night: '', cast: '전원', notes: '',
        });
        currentMinutes += 60;
      }
    });

    // 정리
    entries.push({
      id: generateId(), time_start: formatTime(currentMinutes), time_end: formatTime(currentMinutes + 30),
      activity: '촬영 마무리 & 장비 정리', location: '', int_ext: '', day_night: '', cast: '스태프 전원', notes: '',
    });

    onUpdate({ timetable: entries });
  };

  const formatTime = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const thCls = darkMode ? "bg-neutral-700 text-neutral-200" : "bg-gray-100 text-gray-700";
  const tdCls = darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100";
  const inputCls = darkMode
    ? "bg-transparent text-white placeholder-neutral-500 focus:bg-neutral-700"
    : "bg-transparent text-gray-900 placeholder-gray-400 focus:bg-gray-50";
  const selectCls = darkMode
    ? "bg-neutral-700 text-white border-neutral-600"
    : "bg-gray-50 text-gray-900 border-gray-200";

  return (
    <div className={`flex-1 overflow-auto p-6 ${darkMode ? "bg-neutral-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>촬영 타임테이블</h2>
            <p className={`text-sm mt-1 ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>
              촬영 일정을 표 형식으로 직접 편집하세요 · {timetable.length}개 항목
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={generateFromScenes}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${darkMode ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              <Sparkles size={14} /> 씬에서 자동 생성
            </button>
            <button onClick={addEntry}
              className="px-4 py-2 bg-neutral-800 text-white rounded-xl text-sm font-medium hover:bg-neutral-900 transition flex items-center gap-1.5">
              <Plus size={14} /> 항목 추가
            </button>
          </div>
        </div>

        {timetable.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${darkMode ? "border-neutral-700" : "border-gray-200"}`}>
            <Clock size={40} className={`mx-auto mb-3 ${darkMode ? "text-neutral-600" : "text-gray-300"}`} />
            <p className={`font-medium mb-2 ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>아직 타임테이블이 없어요</p>
            <p className={`text-sm mb-5 ${darkMode ? "text-neutral-600" : "text-gray-400"}`}>씬에서 자동으로 생성하거나 직접 추가하세요</p>
            <div className="flex gap-3 justify-center">
              <button onClick={generateFromScenes} className="px-5 py-2.5 bg-neutral-800 text-white rounded-xl text-sm font-medium hover:bg-neutral-900 transition">
                씬에서 자동 생성
              </button>
              <button onClick={addEntry} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${darkMode ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                빈 항목 추가
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border shadow-sm" style={{ borderColor: darkMode ? '#404040' : '#e5e7eb' }}>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={`px-2 py-3 text-center text-xs font-semibold w-10 ${thCls}`}>#</th>
                  <th className={`px-3 py-3 text-left text-xs font-semibold w-20 ${thCls}`}>시작</th>
                  <th className={`px-3 py-3 text-left text-xs font-semibold w-20 ${thCls}`}>종료</th>
                  <th className={`px-3 py-3 text-left text-xs font-semibold min-w-[180px] ${thCls}`}>활동 내용</th>
                  <th className={`px-3 py-3 text-left text-xs font-semibold w-28 ${thCls}`}>장소</th>
                  <th className={`px-2 py-3 text-center text-xs font-semibold w-16 ${thCls}`}>실내/외</th>
                  <th className={`px-2 py-3 text-center text-xs font-semibold w-16 ${thCls}`}>낮/밤</th>
                  <th className={`px-3 py-3 text-left text-xs font-semibold w-28 ${thCls}`}>출연진</th>
                  <th className={`px-3 py-3 text-left text-xs font-semibold min-w-[120px] ${thCls}`}>비고</th>
                  <th className={`px-2 py-3 text-center text-xs font-semibold w-24 ${thCls}`}>관리</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((entry, index) => (
                  <tr key={entry.id} className={`border-t transition hover:${darkMode ? "bg-neutral-750" : "bg-blue-50/30"}`} style={{ borderColor: darkMode ? '#404040' : '#f3f4f6' }}>
                    <td className={`px-2 py-2 text-center font-bold text-xs ${darkMode ? "text-neutral-500" : "text-gray-400"}`}>{index + 1}</td>
                    <td className="px-1 py-1">
                      <input type="time" value={entry.time_start} onChange={(e) => updateEntry(entry.id, 'time_start', e.target.value)}
                        className={`w-full px-2 py-1.5 rounded-lg text-xs focus:outline-none transition ${inputCls}`} />
                    </td>
                    <td className="px-1 py-1">
                      <input type="time" value={entry.time_end} onChange={(e) => updateEntry(entry.id, 'time_end', e.target.value)}
                        className={`w-full px-2 py-1.5 rounded-lg text-xs focus:outline-none transition ${inputCls}`} />
                    </td>
                    <td className="px-1 py-1">
                      <input type="text" value={entry.activity} onChange={(e) => updateEntry(entry.id, 'activity', e.target.value)} placeholder="활동 내용"
                        className={`w-full px-2 py-1.5 rounded-lg text-xs focus:outline-none transition font-medium ${inputCls}`} />
                    </td>
                    <td className="px-1 py-1">
                      <input type="text" value={entry.location} onChange={(e) => updateEntry(entry.id, 'location', e.target.value)} placeholder="장소"
                        className={`w-full px-2 py-1.5 rounded-lg text-xs focus:outline-none transition ${inputCls}`} />
                    </td>
                    <td className="px-1 py-1">
                      <select value={entry.int_ext} onChange={(e) => updateEntry(entry.id, 'int_ext', e.target.value)}
                        className={`w-full px-1 py-1.5 rounded-lg text-xs focus:outline-none transition border ${selectCls}`}>
                        <option value="">-</option>
                        <option value="실내">실내</option>
                        <option value="실외">실외</option>
                        <option value="실내/외">둘다</option>
                      </select>
                    </td>
                    <td className="px-1 py-1">
                      <select value={entry.day_night} onChange={(e) => updateEntry(entry.id, 'day_night', e.target.value)}
                        className={`w-full px-1 py-1.5 rounded-lg text-xs focus:outline-none transition border ${selectCls}`}>
                        <option value="">-</option>
                        <option value="낮">낮</option>
                        <option value="밤">밤</option>
                        <option value="새벽">새벽</option>
                        <option value="황혼">황혼</option>
                      </select>
                    </td>
                    <td className="px-1 py-1">
                      <input type="text" value={entry.cast} onChange={(e) => updateEntry(entry.id, 'cast', e.target.value)} placeholder="출연진"
                        className={`w-full px-2 py-1.5 rounded-lg text-xs focus:outline-none transition ${inputCls}`} />
                    </td>
                    <td className="px-1 py-1">
                      <input type="text" value={entry.notes} onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)} placeholder="비고"
                        className={`w-full px-2 py-1.5 rounded-lg text-xs focus:outline-none transition ${inputCls}`} />
                    </td>
                    <td className="px-1 py-1">
                      <div className="flex items-center justify-center gap-0.5">
                        <button onClick={() => moveEntry(index, -1)} disabled={index === 0}
                          className={`p-1 rounded transition ${darkMode ? "hover:bg-neutral-600 text-neutral-400 disabled:text-neutral-700" : "hover:bg-gray-200 text-gray-400 disabled:text-gray-200"}`}>
                          <ArrowUp size={12} />
                        </button>
                        <button onClick={() => moveEntry(index, 1)} disabled={index === timetable.length - 1}
                          className={`p-1 rounded transition ${darkMode ? "hover:bg-neutral-600 text-neutral-400 disabled:text-neutral-700" : "hover:bg-gray-200 text-gray-400 disabled:text-gray-200"}`}>
                          <ArrowDown size={12} />
                        </button>
                        <button onClick={() => deleteEntry(entry.id)}
                          className={`p-1 rounded transition ${darkMode ? "hover:bg-red-900/30 text-neutral-400 hover:text-red-400" : "hover:bg-red-50 text-gray-400 hover:text-red-500"}`}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {timetable.length > 0 && (
          <div className="flex justify-center mt-4">
            <button onClick={addEntry}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Plus size={14} /> 항목 추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NewProjectModal = ({ darkMode, onClose, onCreate }: { darkMode: boolean; onClose: () => void; onCreate: (title: string, templateId?: string, aspectRatio?: string, resolution?: string) => void }) => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [selectedResolution, setSelectedResolution] = useState('1920x1080');
  const [customResolution, setCustomResolution] = useState('');

  const handleCreate = () => {
    const name = projectName.trim() || (selectedTemplate ? TEMPLATES.find(t => t.id === selectedTemplate)?.name || '새 프로젝트' : '새 프로젝트');
    const res = selectedResolution === '직접입력' ? customResolution : selectedResolution;
    onCreate(name, selectedTemplate || undefined, selectedRatio, res);
  };

  const ratioToAspect = (ratio: string) => {
    const [w, h] = ratio.split(':').map(Number);
    return `${w}/${h}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`rounded-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto ${darkMode ? "bg-neutral-800" : "bg-white"}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>새 프로젝트</h2>
          <button onClick={onClose} className={`p-1.5 rounded-lg transition ${darkMode ? "hover:bg-neutral-700 text-neutral-400" : "hover:bg-gray-100 text-gray-400"}`}><X size={18} /></button>
        </div>

        {/* Step 1: 프로젝트 이름 */}
        <div className="mb-5">
          <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-neutral-300" : "text-gray-600"}`}>프로젝트 이름</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="예: 신제품 홍보 영상"
            className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ${darkMode ? "bg-neutral-700 text-white placeholder-neutral-500 border border-neutral-600" : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200"}`}
          />
        </div>

        {/* Step 2: 영상 비율 선택 */}
        <div className="mb-5">
          <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-neutral-300" : "text-gray-600"}`}>영상 비율</label>
          <div className="grid grid-cols-3 gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setSelectedRatio(ratio.value)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                  selectedRatio === ratio.value
                    ? darkMode ? "border-white bg-neutral-700" : "border-neutral-800 bg-neutral-50"
                    : darkMode ? "border-neutral-600 hover:border-neutral-500 bg-neutral-750" : "border-gray-100 hover:border-gray-300 bg-white"
                }`}
              >
                {ratio.badge && (
                  <div className="absolute top-1 right-1 bg-orange-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded">
                    {ratio.badge}
                  </div>
                )}
                <div className={`border-2 flex items-center justify-center ${selectedRatio === ratio.value ? (darkMode ? "border-white" : "border-neutral-800") : (darkMode ? "border-neutral-500" : "border-gray-300")}`}
                  style={{ width: '36px', aspectRatio: ratioToAspect(ratio.value) }}>
                  <span className="text-[8px]">{ratio.icon}</span>
                </div>
                <span className={`text-[10px] font-bold ${selectedRatio === ratio.value ? (darkMode ? "text-white" : "text-gray-900") : (darkMode ? "text-neutral-400" : "text-gray-600")}`}>{ratio.value}</span>
                <span className={`text-[8px] ${darkMode ? "text-neutral-500" : "text-gray-400"}`}>{ratio.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: 해상도 */}
        <div className="mb-5">
          <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-neutral-300" : "text-gray-600"}`}>영상 해상도</label>
          <select
            value={selectedResolution}
            onChange={(e) => setSelectedResolution(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ${darkMode ? "bg-neutral-700 text-white border border-neutral-600" : "bg-gray-50 text-gray-900 border border-gray-200"}`}
          >
            {VIDEO_RESOLUTIONS.map((res) => (
              <option key={res.value} value={res.value}>{res.label}</option>
            ))}
          </select>
          {selectedResolution === '직접입력' && (
            <input
              type="text"
              value={customResolution}
              onChange={(e) => setCustomResolution(e.target.value)}
              placeholder="예: 2560x1440"
              className={`w-full mt-2 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ${darkMode ? "bg-neutral-700 text-white placeholder-neutral-500 border border-neutral-600" : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200"}`}
            />
          )}
        </div>

        {/* Step 4: 템플릿 선택 */}
        <div className="mb-5">
          <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-neutral-300" : "text-gray-600"}`}>템플릿 (선택사항)</label>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedTemplate(null)}
              className={`w-full px-4 py-3 rounded-xl transition text-left text-sm font-medium border-2 ${
                selectedTemplate === null
                  ? darkMode ? "border-white bg-neutral-700 text-white" : "border-neutral-800 bg-neutral-50 text-gray-900"
                  : darkMode ? "border-neutral-600 bg-neutral-750 text-neutral-300 hover:border-neutral-500" : "border-gray-100 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              빈 프로젝트로 시작
            </button>
            {TEMPLATES.map((template: any) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full px-4 py-3 rounded-xl transition text-left border-2 ${
                  selectedTemplate === template.id
                    ? darkMode ? "border-white bg-neutral-700" : "border-neutral-800 bg-neutral-50"
                    : darkMode ? "border-neutral-600 bg-neutral-750 hover:border-neutral-500" : "border-gray-100 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`font-medium text-sm ${selectedTemplate === template.id ? (darkMode ? "text-white" : "text-gray-900") : (darkMode ? "text-neutral-300" : "text-gray-700")}`}>{template.icon} {template.name}</div>
                <div className={`text-xs mt-1 ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>{template.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 만들기 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={handleCreate}
            className="flex-1 px-4 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-900 transition text-sm font-semibold"
          >
            프로젝트 만들기
          </button>
          <button
            onClick={onClose}
            className={`px-4 py-3 rounded-xl transition text-sm ${darkMode ? "border border-neutral-600 text-neutral-300 hover:bg-neutral-700" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export const StoryboardApp: React.FC<StoryboardAppProps> = ({ user, onLogout }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showNewProject, setShowNewProject] = useState(false);
  const [viewMode, setViewMode] = useState('editor');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<Project[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAnnouncementEditor, setShowAnnouncementEditor] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcementForm, setAnnouncementForm] = useState({ title: '', content: '', type: 'info' as 'info' | 'update' | 'important' });
  const [showBlankPageEditor, setShowBlankPageEditor] = useState(false);
  const [showReferenceLibrary, setShowReferenceLibrary] = useState(false);
  const [showPDFExportModal, setShowPDFExportModal] = useState(false);
  const [slideViewMode, setSlideViewMode] = useState(false);

  const activeProject = projects.find(p => p.id === activeProjectId);
  const activeScene = activeProject?.scenes?.find(s => s.id === activeSceneId);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('storyboard-projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProjects(parsed);
        if (parsed.length > 0) {
          setActiveProjectId(parsed[0].id);
          if (parsed[0].scenes.length > 0) {
            setActiveSceneId(parsed[0].scenes[0].id);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    }
  }, []);

  // 공지사항 Firestore에서 불러오기
  useEffect(() => {
    const loadAnnouncements = async () => {
      const data = await getAnnouncements();
      setAnnouncements(data);
    };
    loadAnnouncements();
  }, []);

  const handleSaveAnnouncement = async () => {
    if (!announcementForm.title.trim()) return;
    if (editingAnnouncement?.id) {
      const ok = await updateAnnouncement(editingAnnouncement.id, { ...announcementForm });
      if (ok) {
        setAnnouncements(prev => prev.map(a => a.id === editingAnnouncement.id ? { ...a, ...announcementForm } : a));
      }
    } else {
      const id = await addAnnouncement({ ...announcementForm, active: true, author_email: user?.email });
      if (id) {
        setAnnouncements(prev => [{ id, ...announcementForm, active: true, author_email: user?.email }, ...prev]);
      }
    }
    setShowAnnouncementEditor(false);
    setEditingAnnouncement(null);
    setAnnouncementForm({ title: '', content: '', type: 'info' });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm('이 공지사항을 삭제할까요?')) return;
    const ok = await deleteAnnouncement(id);
    if (ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (projects.length > 0) {
        setIsSaving(true);
        localStorage.setItem('storyboard-projects', JSON.stringify(projects));
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(true);
          setTimeout(() => setLastSaved(false), 3000);
        }, 500);
      }
    }, 1000);
    return () => clearTimeout(saveTimer);
  }, [projects]);

  const addToHistory = useCallback((newProjects: Project[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newProjects);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setProjects(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setProjects(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) { handleRedo(); } else { handleUndo(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleCreateProject = (title: string, templateId?: string, aspectRatio?: string, resolution?: string) => {
    let newProject: Project;
    const baseFields = {
      aspect_ratio: aspectRatio || '16:9',
      resolution: resolution || '1920x1080',
    };

    if (templateId) {
      const template = TEMPLATES.find((t: any) => t.id === templateId);
      if (template) {
        newProject = {
          id: generateId(),
          title: template.name,
          video_type: template.videoType,
          ...baseFields,
          scenes: template.scenes.map((s: any, i: number) => ({
            id: generateId(),
            scene_number: i + 1,
            ...s,
            image: null,
            notes: ""
          })),
          created_at: new Date().toISOString(),
        };
      } else {
        newProject = {
          id: generateId(),
          title,
          ...baseFields,
          scenes: [{
            id: generateId(),
            scene_number: 1,
            title: "씬 1",
            duration: 3,
            description: "",
            camera_angle: "정면",
            shot_size: "미디엄샷 (MS)",
            camera_movement: "고정",
            lighting: "자연광",
            notes: "",
            image: null
          }],
          created_at: new Date().toISOString(),
        };
      }
    } else {
      newProject = {
        id: generateId(),
        title,
        ...baseFields,
        scenes: [{
          id: generateId(),
          scene_number: 1,
          title: "씬 1",
          duration: 3,
          description: "",
          camera_angle: "정면",
          shot_size: "미디엄 샷",
          camera_movement: "고정",
          lighting: "자연광",
          notes: "",
          image: null
        }],
        created_at: new Date().toISOString(),
      };
    }

    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    addToHistory(newProjects);
    setActiveProjectId(newProject.id);
    if (newProject.scenes.length > 0) {
      setActiveSceneId(newProject.scenes[0].id);
    }
    setCurrentPage('editor');
    setShowNewProject(false);
  };

  const handleDeleteProject = (projectId: string) => {
    if (!confirm('프로젝트를 삭제하시겠습니까?')) return;
    const newProjects = projects.filter(p => p.id !== projectId);
    setProjects(newProjects);
    addToHistory(newProjects);
    if (activeProjectId === projectId) {
      setActiveProjectId(newProjects.length > 0 ? newProjects[0].id : null);
      setActiveSceneId(null);
    }
  };

  const handleAddScene = useCallback(() => {
    if (!activeProjectId) return;
    const newScene: Scene = {
      id: generateId(),
      scene_number: (activeProject?.scenes.length || 0) + 1,
      title: `씬 ${(activeProject?.scenes.length || 0) + 1}`,
      duration: 3,
      description: "",
      camera_angle: "정면",
      shot_size: "미디엄 샷",
      camera_movement: "고정",
      lighting: "자연광",
      transition: "컷",
      shooting_completed: false,
      notes: "",
      image: null
    };
    const newProjects = projects.map(p => {
      if (p.id === activeProjectId) {
        return { ...p, scenes: [...p.scenes, newScene] };
      }
      return p;
    });
    setProjects(newProjects);
    addToHistory(newProjects);
    setActiveSceneId(newScene.id);
  }, [projects, activeProjectId, activeProject, addToHistory]);

  const handleAddBlankPage = useCallback((typeId: string) => {
    if (!activeProjectId) return;

    const typeLabels: { [key: string]: string } = {
      'scene-divider': '씬 구분',
      'free-memo': '자유 메모',
      'sketch-canvas': '직접 그리기',
      'image-upload': '이미지 업로드',
    };

    const newScene: Scene = {
      id: generateId(),
      scene_number: (activeProject?.scenes.length || 0) + 1,
      title: typeLabels[typeId] || '빈 페이지',
      duration: 0,
      blank_page_type: typeId,
      blank_page_content: {
        text: '',
        imageUrl: '',
        memo: '',
      },
      canvas_elements: [],
      shooting_completed: false,
    };

    const newProjects = projects.map(p => {
      if (p.id === activeProjectId) {
        return { ...p, scenes: [...p.scenes, newScene] };
      }
      return p;
    });
    setProjects(newProjects);
    addToHistory(newProjects);
    setActiveSceneId(newScene.id);
    setShowBlankPageEditor(false);
  }, [projects, activeProjectId, activeProject, addToHistory]);

  const handleDuplicateScene = useCallback((sceneId: string) => {
    if (!activeProjectId || !activeProject) return;
    const source = activeProject.scenes.find(s => s.id === sceneId);
    if (!source) return;
    const sourceIndex = activeProject.scenes.findIndex(s => s.id === sceneId);
    const newScene: Scene = {
      ...JSON.parse(JSON.stringify(source)),
      id: generateId(),
      scene_number: sourceIndex + 2,
      title: `${source.title} (복사)`,
      shooting_completed: false,
    };
    const scenes = [...activeProject.scenes];
    scenes.splice(sourceIndex + 1, 0, newScene);
    const reNumbered = scenes.map((s, i) => ({ ...s, scene_number: i + 1 }));
    const newProjects = projects.map(p => p.id === activeProjectId ? { ...p, scenes: reNumbered } : p);
    setProjects(newProjects);
    addToHistory(newProjects);
    setActiveSceneId(newScene.id);
  }, [projects, activeProjectId, activeProject, addToHistory]);

  const handleDeleteScene = useCallback((sceneId: string) => {
    if (!activeProjectId) return;
    if (activeProject?.scenes.length === 1) {
      alert('최소 1개의 씬은 필요합니다.');
      return;
    }
    const newProjects = projects.map(p => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          scenes: p.scenes
            .filter(s => s.id !== sceneId)
            .map((s, i) => ({ ...s, scene_number: i + 1 }))
        };
      }
      return p;
    });
    setProjects(newProjects);
    addToHistory(newProjects);
    if (activeSceneId === sceneId) {
      const remaining = activeProject?.scenes.filter(s => s.id !== sceneId);
      if (remaining && remaining.length > 0) {
        setActiveSceneId(remaining[0].id);
      }
    }
  }, [projects, activeProjectId, activeSceneId, activeProject, addToHistory]);

  const handleUpdateScene = useCallback((sceneId: string, updates: Partial<Scene>) => {
    if (!activeProjectId) return;
    const newProjects = projects.map(p => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          scenes: p.scenes.map(s => s.id === sceneId ? { ...s, ...updates } : s)
        };
      }
      return p;
    });
    setProjects(newProjects);
    addToHistory(newProjects);
  }, [projects, activeProjectId, addToHistory]);

  const handleMoveScene = useCallback((sceneId: string, direction: number) => {
    if (!activeProjectId || !activeProject) return;
    const scenes = [...activeProject.scenes];
    const index = scenes.findIndex(s => s.id === sceneId);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= scenes.length) return;
    [scenes[index], scenes[targetIndex]] = [scenes[targetIndex], scenes[index]];
    const reNumbered = scenes.map((s, i) => ({ ...s, scene_number: i + 1 }));
    const newProjects = projects.map(p => p.id === activeProjectId ? { ...p, scenes: reNumbered } : p);
    setProjects(newProjects);
    addToHistory(newProjects);
  }, [projects, activeProjectId, activeProject, addToHistory]);

  const handleReorderScenes = useCallback((reorderedScenes: Scene[]) => {
    if (!activeProjectId) return;
    const newProjects = projects.map(p => {
      if (p.id === activeProjectId) {
        return { ...p, scenes: reorderedScenes };
      }
      return p;
    });
    setProjects(newProjects);
    addToHistory(newProjects);
  }, [projects, activeProjectId, addToHistory]);

  const handleDuplicateProject = useCallback((projectId: string) => {
    const source = projects.find(p => p.id === projectId);
    if (!source) return;
    const newProject: Project = {
      ...JSON.parse(JSON.stringify(source)),
      id: generateId(),
      title: `${source.title} (복사본)`,
      created_at: new Date().toISOString(),
      scenes: source.scenes.map(s => ({ ...s, id: generateId() })),
    };
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    addToHistory(newProjects);
    setActiveProjectId(newProject.id);
    if (newProject.scenes.length > 0) setActiveSceneId(newProject.scenes[0].id);
    setCurrentPage('editor');
  }, [projects, addToHistory]);

  const handleUpdateProjectMeta = useCallback((updates: Partial<Project>) => {
    if (!activeProjectId) return;
    const newProjects = projects.map(p => {
      if (p.id === activeProjectId) {
        return { ...p, ...updates };
      }
      return p;
    });
    setProjects(newProjects);
    addToHistory(newProjects);
  }, [projects, activeProjectId, addToHistory]);

  const totalDuration = activeProject?.scenes?.reduce((sum: number, s: Scene) => sum + (s.duration || 0), 0) || 0;

  const handleExportPDF = useCallback((enabledPages?: string[]) => {
    if (!activeProject) return;
    const allPages = enabledPages || ['cover', 'overview', 'storyboard-grid', 'scene-details', 'timetable', 'budget'];
    const isEnabled = (id: string) => allPages.includes(id);
    const p = activeProject;
    const pInfo = p.project_info || {} as any;
    const sInfo = p.shooting_info || {} as any;
    const today = new Date().toLocaleDateString('ko-KR');
    const brand = pInfo.brand_name || '';
    const production = pInfo.production_company || 'PEWPEW STUDIO';
    const videoType = p.video_type || '';
    const platform = p.platform || '';
    const tone = p.tone || '';
    const dur = formatDuration(totalDuration);
    const sceneCnt = p.scenes.length;
    // PDF 렌더링을 위한 마스킹 비율 계산
    const maskingPercentage = calculateMaskingPercentage(p.aspect_ratio || '16:9');

    // 타임라인 바 비율 계산
    const tlSegs = p.scenes.map((s, i) => {
      const pct = totalDuration > 0 ? ((s.duration || 0) / totalDuration * 100) : (100 / sceneCnt);
      const colors = ['#333','#555','#777','#999','#bbb','#666','#888','#aaa'];
      return `<div style="width:${pct}%;background:${colors[i % colors.length]};display:flex;align-items:center;justify-content:center;color:white;font-size:7pt;font-weight:700;">${i + 1}</div>`;
    }).join('');

    // 씬 요약 행
    const summaryRows = p.scenes.map((s, i) =>
      `<tr><td style="font-weight:800;color:#111;text-align:center;width:40px;">${i + 1}</td><td>${s.title || '-'}</td><td>${s.duration || 0}초</td><td>${s.camera_angle || '-'}</td><td>${s.shot_size || '-'}</td><td>${s.camera_movement || '-'}</td><td>${s.lighting || '-'}</td></tr>`
    ).join('');

    // 스토리보드 전체보기 카드
    const sbCards = p.scenes.map((s, i) => `
      <div style="border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;page-break-inside:avoid;">
        <div style="background:#111;color:#fff;padding:8px 14px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:8px;"><span style="font-size:8pt;font-weight:700;background:rgba(255,255,255,0.12);padding:2px 10px;border-radius:12px;">${String(i + 1).padStart(2, '0')}</span><span style="font-size:9pt;font-weight:700;">${s.title || '-'}</span></div>
          <span style="font-size:8pt;color:#888;">${s.duration || 0}초</span>
        </div>
        <div style="width:100%;aspect-ratio:16/9;background:#f5f5f5;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #eee;position:relative;overflow:hidden;">
          ${s.image ? `<img src="${s.image}" style="width:100%;height:100%;object-fit:cover;">` : `<div style="color:#ccc;font-size:9pt;text-align:center;"><div style="font-size:20pt;margin-bottom:4px;">🎞️</div></div>`}
          ${maskingPercentage > 0 ? `<div style="position:absolute;top:0;left:0;width:${maskingPercentage}%;height:100%;background:#000;pointer-events:none;"></div><div style="position:absolute;top:0;right:0;width:${maskingPercentage}%;height:100%;background:#000;pointer-events:none;"></div>` : ''}
        </div>
        <div style="padding:12px 14px;">
          <div style="font-size:8pt;color:#555;line-height:1.6;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${s.description || ''}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${[s.camera_angle, s.shot_size, s.camera_movement, s.lighting].filter(Boolean).map(t => `<span style="background:#f5f5f5;border:1px solid #e5e5e5;padding:3px 8px;border-radius:4px;font-size:7pt;font-weight:600;color:#666;">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');

    // 씬 상세 페이지들
    const scenePages = p.scenes.map((s, i) => {
      const pgNum = String(4 + i).padStart(2, '0');
      const scNum = String(i + 1).padStart(2, '0');
      const settings = [
        ['카메라 앵글', s.camera_angle], ['샷 사이즈', s.shot_size],
        ['카메라 무브먼트', s.camera_movement], ['조명', s.lighting], ['길이', `${s.duration || 0}초`],
        ['전환', s.transition],
      ].filter(([, v]) => v).map(([k, v]) => `<tr><th style="background:#fafafa;padding:7px 12px;font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;text-align:left;border-bottom:1px solid #eee;width:30%;">${k}</th><td style="padding:7px 12px;font-size:9pt;font-weight:600;color:#333;border-bottom:1px solid #f5f5f5;">${v}</td></tr>`).join('');

      return `
      <div class="page" style="padding:40px 52px 56px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;padding-bottom:12px;border-bottom:2px solid #111;">
          <h2 style="font-size:14pt;font-weight:800;color:#111;">씬 ${scNum} — ${s.title || 'Untitled'}</h2>
          <div style="font-size:8pt;color:#999;font-weight:500;">${pgNum}</div>
        </div>
        <div style="border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:#111;color:#fff;padding:14px 24px;display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);padding:4px 14px;border-radius:20px;font-size:8pt;font-weight:700;">씬 ${scNum}</span>
              <span style="font-size:13pt;font-weight:700;">${s.title || '-'}</span>
            </div>
            <span style="font-size:10pt;color:#888;">${s.duration || 0}초</span>
          </div>
          <div style="padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:20px;">
            <div style="border-radius:10px;overflow:hidden;background:#f5f5f5;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;position:relative;">
              ${s.image ? `<img src="${s.image}" style="width:100%;height:100%;object-fit:cover;">` : `<div style="color:#bbb;font-size:10pt;text-align:center;"><div style="font-size:28pt;margin-bottom:6px;">🎞️</div><div>이미지 미등록</div></div>`}
              ${maskingPercentage > 0 ? `<div style="position:absolute;top:0;left:0;width:${maskingPercentage}%;height:100%;background:#000;pointer-events:none;"></div><div style="position:absolute;top:0;right:0;width:${maskingPercentage}%;height:100%;background:#000;pointer-events:none;"></div>` : ''}
            </div>
            <div>
              <div style="font-size:10pt;color:#444;line-height:1.8;margin-bottom:16px;">${s.description || ''}</div>
              <table style="width:100%;border-collapse:collapse;">${settings}</table>
            </div>
            ${(s.dialogue || s.subtitle || s.sound || s.notes) ? `<div style="grid-column:1/-1;background:#fafafa;border:1px solid #eee;border-radius:8px;padding:14px 18px;">
              ${s.dialogue ? `<div style="margin-bottom:8px;"><div style="font-size:7pt;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">대사 / 나레이션</div><div style="font-size:9pt;color:#555;line-height:1.6;">${s.dialogue}</div></div>` : ''}
              ${s.subtitle ? `<div style="margin-bottom:8px;"><div style="font-size:7pt;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">자막</div><div style="font-size:9pt;color:#555;line-height:1.6;">${s.subtitle}</div></div>` : ''}
              ${s.sound ? `<div style="margin-bottom:8px;"><div style="font-size:7pt;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">사운드 / BGM</div><div style="font-size:9pt;color:#555;line-height:1.6;">${s.sound}</div></div>` : ''}
              ${s.notes ? `<div><div style="font-size:7pt;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">감독 메모</div><div style="font-size:9pt;color:#555;line-height:1.6;">${s.notes}</div></div>` : ''}
            </div>` : ''}
          </div>
        </div>
        <div style="position:absolute;bottom:20px;left:52px;right:52px;display:flex;justify-content:space-between;font-size:7pt;color:#aaa;border-top:1px solid #eee;padding-top:8px;">
          <span>스토리프레임</span><span>${production}</span><span>${today}</span>
        </div>
      </div>`;
    }).join('');

    // 타임라인 범례
    const tlLegend = p.scenes.map((s, i) => {
      const colors = ['#333','#555','#777','#999','#bbb','#666','#888','#aaa'];
      return `<div style="display:flex;align-items:center;gap:5px;"><div style="width:8px;height:8px;border-radius:2px;background:${colors[i % colors.length]};"></div>씬 ${i + 1}: ${s.title || '-'} (${s.duration || 0}초)</div>`;
    }).join('');

    // Budget page data (use default values for PDF)
    const pdfShootDays = sInfo.shoot_days || Math.ceil(totalDuration / 480) || 1;
    const pdfTeamMembers = pInfo.team_members?.length || 3;
    const pdfLocationCount = sInfo.locations?.length || 1;
    const budgetItems = [
      { name: '씬 제작비', qty: sceneCnt, unit: '씬', unitCost: 500000 },
      { name: '촬영 일당', qty: pdfShootDays, unit: '일', unitCost: 2000000 },
      { name: '장비비', qty: sceneCnt, unit: '씬', unitCost: 1000000 },
      { name: '스태프비', qty: pdfTeamMembers, unit: '명', unitCost: 5000000 },
      { name: '로케이션비', qty: pdfLocationCount, unit: '곳', unitCost: 3000000 },
    ];
    const budgetSubtotal = budgetItems.reduce((s, i) => s + i.qty * i.unitCost, 0);
    const budgetTax = Math.round(budgetSubtotal * 0.1);
    const budgetTotal = budgetSubtotal + budgetTax;

    const budgetRows = budgetItems.map(item =>
      `<tr><td style="padding:10px 14px;font-size:9pt;font-weight:600;color:#333;border-bottom:1px solid #f0f0f0;">${item.name}</td><td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#555;text-align:center;border-bottom:1px solid #f0f0f0;">${item.qty} ${item.unit}</td><td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#555;text-align:right;font-family:monospace;border-bottom:1px solid #f0f0f0;">${item.unitCost.toLocaleString()}원</td><td style="padding:10px 14px;font-size:9pt;font-weight:600;color:#111;text-align:right;font-family:monospace;border-bottom:1px solid #f0f0f0;">${(item.qty * item.unitCost).toLocaleString()}원</td></tr>`
    ).join('');

    // footer helper
    const footer = `<div style="position:absolute;bottom:20px;left:52px;right:52px;display:flex;justify-content:space-between;font-size:7pt;color:#aaa;border-top:1px solid #eee;padding-top:8px;"><span>스토리프레임</span><span>${production}</span><span>${today}</span></div>`;
    const thStyle = `background:#111;color:#999;padding:8px 14px;font-size:7pt;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;text-align:left;`;

    // Build pages array based on selection
    const htmlPages: string[] = [];

    // Cover Page
    if (isEnabled('cover')) {
      htmlPages.push(`<div class="page" style="background:#111;color:white;display:flex;align-items:center;justify-content:center;">
  <div style="width:100%;height:100%;display:flex;align-items:center;padding:56px 72px;position:relative;">
    <div style="flex:1;">
      <div style="display:inline-block;font-size:8pt;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#888;border:1px solid #444;border-radius:4px;padding:4px 12px;margin-bottom:24px;">Video Storyboard</div>
      <h1 style="font-size:36pt;font-weight:900;letter-spacing:-1.5px;line-height:1.15;margin-bottom:16px;color:#fff;">${p.title || 'Untitled'}</h1>
      <div style="font-size:11pt;color:#888;font-weight:300;line-height:1.7;max-width:500px;">${pInfo.description || p.description || ''}</div>
    </div>
    <div style="width:320px;flex-shrink:0;border-left:1px solid #333;padding-left:48px;margin-left:48px;">
      ${brand ? `<div style="margin-bottom:20px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:4px;">브랜드</div><div style="font-size:13pt;font-weight:700;color:#ccc;">${brand}</div></div>` : ''}
      <div style="margin-bottom:20px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:4px;">제작</div><div style="font-size:13pt;font-weight:700;color:#ccc;">${production}</div></div>
      ${videoType ? `<div style="margin-bottom:20px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:4px;">유형</div><div style="font-size:13pt;font-weight:700;color:#ccc;">${videoType}${platform ? ' · ' + platform : ''}</div></div>` : ''}
      ${tone ? `<div style="margin-bottom:20px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:4px;">톤</div><div style="font-size:13pt;font-weight:700;color:#ccc;">${tone}</div></div>` : ''}
      <div style="margin-bottom:20px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:4px;">전체 길이</div><div style="font-size:13pt;font-weight:700;color:#ccc;">${dur} · ${sceneCnt}개 씬</div></div>
    </div>
    <div style="position:absolute;bottom:36px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:8pt;color:#555;border-top:1px solid #333;padding-top:12px;">
      <span>${production}</span><span>CONFIDENTIAL</span><span>${today}</span>
    </div>
  </div>
</div>`);
    }

    // Overview Page
    if (isEnabled('overview')) {
      htmlPages.push(`<div class="page" style="padding:40px 52px 56px;">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;padding-bottom:12px;border-bottom:2px solid #111;">
    <h2 style="font-size:14pt;font-weight:800;color:#111;">프로젝트 개요</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
    <div style="background:#111;border:1px solid #111;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">프로젝트</div><div style="font-size:14pt;font-weight:800;color:#fff;">${p.title || '-'}</div></div>
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">브랜드</div><div style="font-size:14pt;font-weight:800;color:#111;">${brand || '-'}</div></div>
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">제작 회사</div><div style="font-size:14pt;font-weight:800;color:#111;">${production}</div></div>
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">영상 유형</div><div style="font-size:14pt;font-weight:800;color:#111;">${videoType || '-'}</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:20px 24px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:8px;">프로젝트 설명</div><p style="font-size:10pt;color:#444;line-height:1.8;">${pInfo.description || p.description || '-'}</p></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">플랫폼</div><div style="font-size:14pt;font-weight:800;color:#111;">${platform || '-'}</div></div>
      <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">톤 & 무드</div><div style="font-size:14pt;font-weight:800;color:#111;">${tone || '-'}</div></div>
      <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">전체 길이</div><div style="font-size:14pt;font-weight:800;color:#111;">${dur}</div></div>
      <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:16px 20px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:4px;">총 씬 수</div><div style="font-size:14pt;font-weight:800;color:#111;">${sceneCnt}개</div></div>
    </div>
  </div>
  <div style="margin-bottom:8px;font-size:9pt;font-weight:700;color:#111;">타임라인</div>
  <div style="display:flex;gap:2px;height:24px;border-radius:6px;overflow:hidden;margin-bottom:12px;">${tlSegs}</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px 20px;font-size:8pt;color:#666;margin-bottom:20px;">${tlLegend}</div>
  <table style="width:100%;border-collapse:collapse;">
    <thead><tr><th style="${thStyle}border-radius:6px 0 0 0;">씬</th><th style="${thStyle}">제목</th><th style="${thStyle}">길이</th><th style="${thStyle}">앵글</th><th style="${thStyle}">샷 사이즈</th><th style="${thStyle}">무브먼트</th><th style="${thStyle}border-radius:0 6px 0 0;">조명</th></tr></thead>
    <tbody>${summaryRows}</tbody>
  </table>
  ${footer}
</div>`);
    }

    // Storyboard Grid
    if (isEnabled('storyboard-grid')) {
      htmlPages.push(`<div class="page" style="padding:40px 52px 56px;">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;padding-bottom:12px;border-bottom:2px solid #111;">
    <h2 style="font-size:14pt;font-weight:800;color:#111;">스토리보드 전체보기</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">${sbCards}</div>
  ${footer}
</div>`);
    }

    // Scene Detail Pages
    if (isEnabled('scene-details')) {
      htmlPages.push(scenePages);
    }

    // Timetable
    if (isEnabled('timetable') && p.timetable && p.timetable.length > 0) {
      htmlPages.push(`<div class="page" style="padding:40px 52px 56px;">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;padding-bottom:12px;border-bottom:2px solid #111;">
    <h2 style="font-size:14pt;font-weight:800;color:#111;">타임테이블</h2>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <thead><tr>
      <th style="${thStyle}border-radius:6px 0 0 0;">#</th>
      <th style="${thStyle}">시작</th><th style="${thStyle}">종료</th>
      <th style="${thStyle}">활동</th><th style="${thStyle}">장소</th>
      <th style="${thStyle}">실내/외</th><th style="${thStyle}">주/야</th>
      <th style="${thStyle}">출연</th><th style="${thStyle}border-radius:0 6px 0 0;">비고</th>
    </tr></thead>
    <tbody>${p.timetable.map((e: any, i: number) => `
      <tr>
        <td style="padding:10px 14px;font-size:9pt;font-weight:800;color:#111;text-align:center;width:40px;border-bottom:1px solid #f0f0f0;">${i + 1}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#333;border-bottom:1px solid #f0f0f0;">${e.time_start || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#333;border-bottom:1px solid #f0f0f0;">${e.time_end || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:600;color:#333;border-bottom:1px solid #f0f0f0;">${e.activity || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#333;border-bottom:1px solid #f0f0f0;">${e.location || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#333;border-bottom:1px solid #f0f0f0;">${e.int_ext || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#333;border-bottom:1px solid #f0f0f0;">${e.day_night || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#333;border-bottom:1px solid #f0f0f0;">${e.cast || '-'}</td>
        <td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#555;border-bottom:1px solid #f0f0f0;">${e.notes || '-'}</td>
      </tr>`).join('')}
    </tbody>
  </table>
  ${footer}
</div>`);
    }

    // Budget Page
    if (isEnabled('budget')) {
      htmlPages.push(`<div class="page" style="padding:40px 52px 56px;">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;padding-bottom:12px;border-bottom:2px solid #111;">
    <h2 style="font-size:14pt;font-weight:800;color:#111;">예산 견적서</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;">
    <div style="background:#111;border-radius:10px;padding:20px 24px;"><div style="font-size:7pt;color:#666;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:6px;">프로젝트</div><div style="font-size:16pt;font-weight:800;color:#fff;">${p.title || '-'}</div></div>
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:20px 24px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:6px;">총 예산</div><div style="font-size:16pt;font-weight:800;color:#111;font-family:monospace;">${budgetTotal.toLocaleString()}원</div></div>
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:20px 24px;"><div style="font-size:7pt;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:6px;">견적 일자</div><div style="font-size:16pt;font-weight:800;color:#111;">${today}</div></div>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <thead><tr>
      <th style="${thStyle}border-radius:6px 0 0 0;">항목</th>
      <th style="${thStyle}text-align:center;">수량</th>
      <th style="${thStyle}text-align:right;">단가</th>
      <th style="${thStyle}text-align:right;border-radius:0 6px 0 0;">금액</th>
    </tr></thead>
    <tbody>
      ${budgetRows}
      <tr style="background:#fafafa;"><td colspan="3" style="padding:10px 14px;font-size:10pt;font-weight:700;color:#111;border-top:2px solid #e0e0e0;">소계</td><td style="padding:10px 14px;font-size:10pt;font-weight:700;color:#111;text-align:right;font-family:monospace;border-top:2px solid #e0e0e0;">${budgetSubtotal.toLocaleString()}원</td></tr>
      <tr><td colspan="3" style="padding:10px 14px;font-size:9pt;font-weight:500;color:#555;">부가세 (10%)</td><td style="padding:10px 14px;font-size:9pt;font-weight:500;color:#555;text-align:right;font-family:monospace;">${budgetTax.toLocaleString()}원</td></tr>
      <tr style="background:#111;"><td colspan="3" style="padding:14px;font-size:12pt;font-weight:800;color:#fff;border-radius:0 0 0 6px;">총합계</td><td style="padding:14px;font-size:12pt;font-weight:800;color:#fff;text-align:right;font-family:monospace;border-radius:0 0 6px 0;">${budgetTotal.toLocaleString()}원</td></tr>
    </tbody>
  </table>
  <div style="margin-top:32px;padding:20px 24px;background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;">
    <div style="font-size:8pt;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">참고 사항</div>
    <div style="font-size:9pt;color:#555;line-height:1.8;">
      • 상기 금액은 추정 비용이며, 실제 비용은 협의에 따라 달라질 수 있습니다.<br>
      • 부가세(VAT) 10%가 포함된 금액입니다.<br>
      • 촬영 일수: ${pdfShootDays}일 / 스태프: ${pdfTeamMembers}명 / 로케이션: ${pdfLocationCount}곳 기준
    </div>
  </div>
  ${footer}
</div>`);
    }

    const html = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>${p.title} - 영상 기획안</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Noto Sans KR',-apple-system,sans-serif;color:#1a1a1a;background:#d4d4d4;line-height:1.5;-webkit-font-smoothing:antialiased;}
@page{size:A4 landscape;margin:0;}
.page{width:297mm;min-height:210mm;margin:20px auto;background:white;position:relative;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.15);page-break-after:always;}
@media print{body{background:white;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}.page{margin:0;box-shadow:none;}.no-print{display:none!important;}}
</style></head><body>
${htmlPages.join('\n')}
</body></html>`;

    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 800);
    }
  }, [activeProject, totalDuration]);

  const handleExportJSON = useCallback(() => {
    if (!activeProject) return;
    const exportData = {
      ...activeProject,
      exported_at: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProject.title}_스토리보드.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [activeProject]);

  const isDashboard = !activeProject && currentPage !== 'proposal';
  const isProposalPage = currentPage === 'proposal';

  // 포트폴리오 기획안에서 스토리보드 프로젝트 생성
  const handleCreateFromProposal = useCallback((projectData: any) => {
    const newProject: Project = {
      id: generateId(),
      title: projectData.title || '새 프로젝트',
      brand_name: projectData.brand_name,
      video_type: projectData.video_type,
      platform: projectData.platform,
      tone: projectData.tone,
      description: projectData.description,
      project_info: projectData.client_info ? {
        client_name: projectData.client_info.name,
        manager_name: projectData.client_info.name,
        manager_phone: projectData.client_info.phone,
        manager_email: projectData.client_info.email,
        brand_name: projectData.client_info.company,
      } : undefined,
      scenes: (projectData.scenes || []).map((s: any, i: number) => ({
        id: generateId(),
        scene_number: i + 1,
        title: s.title || `씬 ${i + 1}`,
        duration: s.duration || 5,
        description: s.description || '',
        camera_angle: s.camera_angle,
        shot_size: s.shot_size,
        camera_movement: s.camera_movement,
        lighting: s.lighting,
        transition: '컷',
        shooting_completed: false,
      })),
      created_at: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    if (newProject.scenes.length > 0) setActiveSceneId(newProject.scenes[0].id);
    setCurrentPage('editor');
    setViewMode('editor');
  }, []);

  return (
    <div className={`h-screen flex overflow-hidden ${darkMode ? "bg-neutral-900" : "bg-gray-50"}`}>
      {/* Sidebar - 프로젝트 편집 중일 때만 표시 */}
      {activeProject && !isProposalPage && (
        <aside className={`border-r flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} hidden md:flex ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100"}`}>
          <div className={`p-4 border-b ${darkMode ? "border-neutral-700" : "border-gray-100"}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>PEWPEW 스토리보드</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeProject.scenes.map((scene, index) => (
              <div key={scene.id} className={`flex items-center gap-1 rounded-lg transition ${
                activeSceneId === scene.id
                  ? `${darkMode ? "bg-neutral-700 border-neutral-500" : "bg-neutral-200 border-neutral-500"} border-2`
                  : `${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-gray-100 hover:bg-gray-200"} border-2 border-transparent`
              }`}>
                {/* 순서 변경 버튼 */}
                <div className="flex flex-col pl-1">
                  <button onClick={(e) => { e.stopPropagation(); handleMoveScene(scene.id, -1); }} disabled={index === 0}
                    className={`p-0.5 rounded transition ${darkMode ? "hover:bg-neutral-600 text-neutral-500 disabled:text-neutral-700" : "hover:bg-gray-300 text-gray-400 disabled:text-gray-200"}`}>
                    <ArrowUp size={10} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleMoveScene(scene.id, 1); }} disabled={index === activeProject.scenes.length - 1}
                    className={`p-0.5 rounded transition ${darkMode ? "hover:bg-neutral-600 text-neutral-500 disabled:text-neutral-700" : "hover:bg-gray-300 text-gray-400 disabled:text-gray-200"}`}>
                    <ArrowDown size={10} />
                  </button>
                </div>
                <button
                  onClick={() => { setActiveSceneId(scene.id); setViewMode('editor'); }}
                  className="flex-1 text-left p-3 min-w-0"
                >
                  <div className={`font-semibold text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{index + 1}. {scene.title}</div>
                  <div className={`text-xs mt-1 ${darkMode ? "text-neutral-400" : "text-gray-600"}`}>{scene.duration}초</div>
                </button>
                {/* 복제/삭제 */}
                <div className="flex flex-col pr-1.5 gap-0.5">
                  <button onClick={(e) => { e.stopPropagation(); handleDuplicateScene(scene.id); }}
                    className={`p-1 rounded transition ${darkMode ? "hover:bg-neutral-600 text-neutral-500" : "hover:bg-gray-300 text-gray-400"}`} title="씬 복제">
                    <Copy size={10} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); if (confirm('이 씬을 삭제할까요?')) handleDeleteScene(scene.id); }}
                    className={`p-1 rounded transition ${darkMode ? "hover:bg-red-900/40 text-neutral-500 hover:text-red-400" : "hover:bg-red-50 text-gray-400 hover:text-red-500"}`} title="씬 삭제">
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={`p-4 border-t ${darkMode ? "border-neutral-700" : "border-gray-100"} space-y-2`}>
            <button
              onClick={handleAddScene}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 transition"
            >
              <Plus size={18} />
              씬 추가
            </button>
            <button
              onClick={() => setShowBlankPageEditor(true)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Plus size={14} />
              빈 페이지
            </button>
            <button
              onClick={() => setSlideViewMode(!slideViewMode)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm ${slideViewMode ? (darkMode ? "bg-neutral-600 text-white" : "bg-blue-100 text-blue-700") : (darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`}
            >
              <Grid size={14} />
              슬라이드 뷰
            </button>
            <button
              onClick={() => setViewMode('search')}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Search size={14} />
              씬 검색
            </button>
            <button
              onClick={() => setViewMode('versions')}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Save size={14} />
              버전 관리
            </button>
            <button
              onClick={() => { setActiveProjectId(null); setActiveSceneId(null); setCurrentPage('dashboard'); }}
              className={`w-full px-4 py-2 rounded-lg transition text-sm ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              프로젝트 목록
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className={`border-b px-3 md:px-6 py-2 md:py-4 flex items-center justify-between ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100"}`}>
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            {/* 사이드바 토글 - 프로젝트 편집 중일 때만 */}
            {activeProject && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition flex-shrink-0 ${darkMode ? "hover:bg-neutral-700 text-neutral-300" : "hover:bg-gray-100 text-gray-600"}`}
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
              </button>
            )}

            {/* 뷰모드 버튼 - 프로젝트 편집 중일 때만 */}
            {activeProject && (
              <div className="flex gap-1 md:gap-1.5 overflow-x-auto no-scrollbar min-w-0">
                {[
                  { id: 'project-info', label: '프로젝트 정보', mobileLabel: '정보' },
                  { id: 'shooting-info', label: '촬영 정보', mobileLabel: '촬영' },
                  { id: 'editor', label: '편집기', mobileLabel: '편집' },
                  { id: 'grid', label: '그리드', mobileLabel: '그리드' },
                  { id: 'timeline', label: '타임라인', mobileLabel: '타임라인' },
                  { id: 'timetable', label: '타임테이블', mobileLabel: '일정' },
                  { id: 'animatic', label: '프리뷰', mobileLabel: '프리뷰' },
                  { id: 'shotlist', label: '샷리스트', mobileLabel: '샷' },
                  { id: 'calendar', label: '캘린더', mobileLabel: '캘린더' },
                  { id: 'budget', label: '예산', mobileLabel: '예산' },
                  { id: 'ai-recommend', label: 'AI추천', mobileLabel: 'AI' },
                ].map(({ id, label, mobileLabel }) => (
                  <button
                    key={id}
                    onClick={() => setViewMode(id)}
                    className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition text-xs md:text-sm whitespace-nowrap flex-shrink-0 ${viewMode === id ? 'bg-neutral-800 text-white' : `${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}`}
                  >
                    <span className="hidden md:inline">{label}</span>
                    <span className="md:hidden">{mobileLabel}</span>
                  </button>
                ))}
              </div>
            )}

            {/* 대시보드/기획안 페이지일 때 로고 표시 */}
            {(isDashboard || isProposalPage) && (
              <div className="flex items-center gap-2.5">
                {isProposalPage && (
                  <button onClick={() => setCurrentPage('dashboard')}
                    className={`p-1.5 rounded-lg transition mr-1 ${darkMode ? "hover:bg-neutral-700 text-neutral-400" : "hover:bg-gray-100 text-gray-500"}`}>
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className="w-8 h-8 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-lg flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
                <span className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {isProposalPage ? '포트폴리오 기획안' : 'PEWPEW 스토리보드'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 md:gap-3">
            {lastSaved && <span className="hidden md:inline text-xs text-neutral-500">저장됨</span>}
            {isSaving && <span className="hidden md:inline text-xs text-gray-400">저장 중...</span>}
            {activeProject && (
              <div className="flex gap-1">
                <button
                  onClick={() => setShowPDFExportModal(true)}
                  className="px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 md:gap-1.5 bg-neutral-800 text-white hover:bg-neutral-900"
                  title="PDF 내보내기"
                >
                  <Download size={14} /> <span className="hidden sm:inline">PDF</span>
                </button>
                <button
                  onClick={() => handleExportJSON()}
                  className={`hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-medium transition items-center gap-1.5 ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  title="JSON 내보내기"
                >
                  <FileJson size={14} /> JSON
                </button>
              </div>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 md:p-2 rounded-lg transition ${darkMode ? "hover:bg-neutral-700 text-neutral-300" : "hover:bg-gray-100 text-gray-600"}`}
              title={darkMode ? "라이트 모드" : "다크 모드"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user?.email && isAdmin(user.email) && (
              <Link
                href="/admin"
                className={`hidden md:inline-block px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                관리자
              </Link>
            )}
            <button
              onClick={onLogout}
              className={`p-1.5 md:p-2 rounded-lg transition ${darkMode ? "hover:bg-neutral-700 text-neutral-400 hover:text-red-400" : "hover:bg-gray-100 text-gray-400 hover:text-red-500"}`}
              title="로그아웃"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {isProposalPage ? (
            <PortfolioProposalBuilder
              darkMode={darkMode}
              userEmail={user?.email}
              onCreateProject={handleCreateFromProposal}
            />
          ) : isDashboard ? (
            <div className={`min-h-full p-6 md:p-8 ${darkMode ? "bg-neutral-900" : "bg-gray-50"}`}>
              <div className="max-w-6xl mx-auto space-y-8">

                {/* 환영 + 새 프로젝트 */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {user?.displayName ? `${user.displayName}님, 환영합니다` : '환영합니다'}
                    </h1>
                    <p className={`text-xs md:text-sm mt-1 ${darkMode ? "text-neutral-500" : "text-gray-500"}`}>PEWPEW 스토리보드에서 영상을 기획하세요</p>
                  </div>
                  <button onClick={() => setShowNewProject(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-neutral-800 text-white rounded-xl hover:bg-neutral-900 transition font-medium text-sm shadow-sm">
                    <Plus size={18} /> 새 프로젝트
                  </button>
                </div>

                {/* 공지사항 배너 */}
                <div className={`rounded-2xl border p-5 ${darkMode ? "bg-gradient-to-r from-neutral-800 to-neutral-800/50 border-neutral-700" : "bg-gradient-to-r from-white to-gray-50 border-gray-100"}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-neutral-700" : "bg-neutral-100"}`}>
                      <Bell size={18} className={darkMode ? "text-neutral-300" : "text-neutral-600"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>공지사항</h3>
                        {announcements.length > 0 && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${darkMode ? "bg-neutral-600 text-neutral-300" : "bg-neutral-200 text-neutral-600"}`}>
                            {announcements.length}건
                          </span>
                        )}
                        {isAdmin(user?.email) && (
                          <button onClick={() => {
                            setAnnouncementForm({ title: '', content: '', type: 'info' });
                            setEditingAnnouncement(null);
                            setShowAnnouncementEditor(true);
                          }}
                            className={`ml-auto text-[11px] px-3 py-1 rounded-lg font-medium transition ${darkMode ? "bg-neutral-600 text-neutral-200 hover:bg-neutral-500" : "bg-neutral-800 text-white hover:bg-neutral-700"}`}>
                            + 공지 작성
                          </button>
                        )}
                      </div>

                      {/* 공지사항 에디터 (어드민 전용) */}
                      {showAnnouncementEditor && isAdmin(user?.email) && (
                        <div className={`mt-3 p-4 rounded-xl border space-y-3 ${darkMode ? "bg-neutral-700 border-neutral-600" : "bg-gray-50 border-gray-200"}`}>
                          <input type="text" value={announcementForm.title}
                            onChange={(e) => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="공지 제목 (예: v2.1 업데이트)"
                            className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none ${darkMode ? "bg-neutral-600 text-white border-neutral-500 placeholder-neutral-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"}`} />
                          <textarea value={announcementForm.content}
                            onChange={(e) => setAnnouncementForm(prev => ({ ...prev, content: e.target.value }))}
                            rows={3} placeholder="공지 내용을 입력하세요..."
                            className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-none resize-none ${darkMode ? "bg-neutral-600 text-white border-neutral-500 placeholder-neutral-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"}`} />
                          <div className="flex items-center gap-2">
                            <select value={announcementForm.type}
                              onChange={(e) => setAnnouncementForm(prev => ({ ...prev, type: e.target.value as any }))}
                              className={`px-3 py-1.5 rounded-lg text-xs border ${darkMode ? "bg-neutral-600 text-white border-neutral-500" : "bg-white text-gray-700 border-gray-300"}`}>
                              <option value="info">일반</option>
                              <option value="update">업데이트</option>
                              <option value="important">중요</option>
                            </select>
                            <div className="flex-1" />
                            <button onClick={() => { setShowAnnouncementEditor(false); setEditingAnnouncement(null); }}
                              className={`px-3 py-1.5 text-xs rounded-lg ${darkMode ? "text-neutral-400 hover:text-neutral-200" : "text-gray-500 hover:text-gray-700"}`}>
                              취소
                            </button>
                            <button onClick={handleSaveAnnouncement}
                              className="px-4 py-1.5 text-xs bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 font-medium">
                              {editingAnnouncement ? '수정' : '등록'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 공지 목록 */}
                      <div className={`text-sm space-y-2 mt-2 ${darkMode ? "text-neutral-400" : "text-gray-600"}`}>
                        {announcements.length > 0 ? (
                          announcements.filter(a => a.active !== false).map(a => (
                            <div key={a.id} className="flex items-start gap-2 group">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${
                                a.type === 'important' ? (darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-600') :
                                a.type === 'update' ? (darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-600') :
                                (darkMode ? 'bg-neutral-600 text-neutral-300' : 'bg-gray-200 text-gray-600')
                              }`}>
                                {a.type === 'important' ? '중요' : a.type === 'update' ? '업데이트' : '안내'}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-xs ${darkMode ? "text-neutral-200" : "text-gray-800"}`}>{a.title}</p>
                                {a.content && <p className="text-xs mt-0.5">{a.content}</p>}
                              </div>
                              {isAdmin(user?.email) && (
                                <div className="opacity-0 group-hover:opacity-100 flex gap-1 flex-shrink-0 transition">
                                  <button onClick={() => {
                                    setAnnouncementForm({ title: a.title, content: a.content, type: a.type });
                                    setEditingAnnouncement(a);
                                    setShowAnnouncementEditor(true);
                                  }} className={`text-[10px] px-2 py-0.5 rounded ${darkMode ? "hover:bg-neutral-600 text-neutral-400" : "hover:bg-gray-200 text-gray-400"}`}>
                                    수정
                                  </button>
                                  <button onClick={() => a.id && handleDeleteAnnouncement(a.id)}
                                    className={`text-[10px] px-2 py-0.5 rounded ${darkMode ? "hover:bg-red-900/30 text-neutral-400 hover:text-red-400" : "hover:bg-red-50 text-gray-400 hover:text-red-500"}`}>
                                    삭제
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-xs">아직 공지사항이 없습니다.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 영상 기획안 의뢰 CTA 카드 */}
                <button
                  onClick={() => setCurrentPage('proposal')}
                  className={`w-full rounded-2xl border p-5 text-left transition group ${darkMode ? "bg-gradient-to-r from-neutral-800 via-neutral-800 to-neutral-700 border-neutral-700 hover:border-neutral-500" : "bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-gray-200 hover:border-neutral-400 hover:shadow-md"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-neutral-700 group-hover:bg-neutral-600" : "bg-neutral-100 group-hover:bg-neutral-200"} transition`}>
                      <Star size={22} className={darkMode ? "text-yellow-400" : "text-yellow-500"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm mb-0.5 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        우리 포트폴리오 보고 영상 의뢰하기
                      </h3>
                      <p className={`text-xs ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>
                        PEWPEW Studio가 만든 영상을 둘러보고, 마음에 드는 스타일을 골라 간단하게 기획안을 작성해보세요
                      </p>
                    </div>
                    <ChevronRight size={20} className={`flex-shrink-0 transition-transform group-hover:translate-x-1 ${darkMode ? "text-neutral-500" : "text-gray-400"}`} />
                  </div>
                </button>

                {/* 빠른 시작 가이드 (접기/펼치기) */}
                <div className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100"}`}>
                  <button
                    onClick={() => setShowGuide && setShowGuide(!showGuide)}
                    className={`w-full px-5 py-4 flex items-center justify-between text-left ${darkMode ? "hover:bg-neutral-750" : "hover:bg-gray-50"} transition`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? "bg-neutral-700" : "bg-neutral-100"}`}>
                        <HelpCircle size={16} className={darkMode ? "text-neutral-300" : "text-neutral-600"} />
                      </div>
                      <span className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>사용법 가이드</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${showGuide ? "rotate-180" : ""} ${darkMode ? "text-neutral-500" : "text-gray-400"}`} />
                  </button>
                  {showGuide && (
                    <div className={`px-5 pb-5 ${darkMode ? "border-t border-neutral-700" : "border-t border-gray-100"}`}>
                      <div className="space-y-3 pt-4">
                        {[
                          { step: '1', title: '시작하기', desc: '"새 프로젝트" 버튼을 눌러 프로젝트 이름, 영상 비율, 해상도를 선택하고 시작하세요. 샘플 프로젝트로 빠르게 시작할 수도 있습니다.', icon: '🚀' },
                          { step: '2', title: '프로젝트 정보 (1페이지)', desc: '"프로젝트 정보" 탭에서 브랜드명, 담당자, 감독, DP(촬영감독), PD(프로듀서) 정보를 입력하세요. 이 정보는 PDF 표지와 촬영 자료에 자동으로 포함됩니다.', icon: '📋' },
                          { step: '3', title: '촬영 정보 (2페이지)', desc: '"촬영 정보" 탭에서 촬영 일정(촬영일), 콜타임, 촬영 장소, 스튜디오 정보, 주차 안내, 병원 정보, 날씨 등을 기록하세요.', icon: '📍' },
                          { step: '4', title: '씬 편집기', desc: '"편집기"에서 각 씬별로 이미지 업로드/편집, 카메라 앵글, 샷 사이즈, 무브먼트, 조명, 렌즈, 프레임레이트, 전환효과, 대사/나레이션, 사운드/BGM, 감독 메모를 설정할 수 있습니다.', icon: '🎥' },
                          { step: '5', title: '씬 코멘트', desc: '각 씬에 대해 피드백이나 메모를 작성하고, 논의 사항을 관리할 수 있습니다. "해결" 표시로 완료된 항목을 체계적으로 관리하세요.', icon: '💬' },
                          { step: '6', title: '에셋 라이브러리', desc: '미리 만들어진 프리셋을 적용하여 씬을 빠르게 설정할 수 있습니다. 자주 사용하는 설정을 저장하고 재사용하세요.', icon: '📦' },
                          { step: '7', title: '그리드 뷰', desc: '"그리드 뷰"에서 전체 씬을 한눈에 썸네일로 확인할 수 있습니다. 전체 구성을 빠르게 파악하고 씬 순서를 드래그로 조정하세요.', icon: '⊞' },
                          { step: '8', title: '타임라인 뷰', desc: '"타임라인 뷰"에서 씬의 시간 흐름을 시각적으로 확인할 수 있습니다. 각 씬의 소요 시간을 한눈에 보고 전체 영상 길이를 계산하세요.', icon: '📊' },
                          { step: '9', title: '애니매틱 프리뷰', desc: '"프리뷰" 버튼을 눌러 씬을 자동으로 재생하는 슬라이드쇼를 볼 수 있습니다. 각 씬을 순서대로 자동 전환하며 전체 흐름을 확인하세요.', icon: '▶️' },
                          { step: '10', title: '타임테이블', desc: '"타임테이블" 탭에서 촬영 일정을 시간 단위로 표 형식으로 관리하세요. "씬에서 자동 생성" 버튼으로 씬 정보를 기반으로 일정을 자동 생성할 수 있습니다.', icon: '⏰' },
                          { step: '11', title: '샷 리스트', desc: '"샷 리스트"는 촬영팀용 샷 목록을 자동으로 생성합니다. 각 씬의 샷 정보를 테이블 형식으로 정리하고 "복사" 버튼으로 다른 도구에 붙여넣으세요.', icon: '📹' },
                          { step: '12', title: '캘린더 뷰', desc: '"캘린더 뷰"에서 월간 촬영 일정을 시각적으로 확인할 수 있습니다. 촬영 날짜를 캘린더에 표시하고 전체 일정을 한눈에 파악하세요.', icon: '📅' },
                          { step: '13', title: '예산 추정', desc: '"예산" 탭에서 씬 기반으로 제작비를 자동 계산할 수 있습니다. 각 씬의 복잡도, 소요 시간 등을 입력하면 총 예산을 추정합니다.', icon: '💰' },
                          { step: '14', title: 'AI 씬 추천', desc: '"AI 추천" 기능으로 영상 유형별(광고, 뮤직비디오, 다큐멘터리 등) 추천 씬을 자동으로 구성받을 수 있습니다. 빠른 기획에 도움이 됩니다.', icon: '✨' },
                          { step: '15', title: '버전 관리', desc: '"버전 관리"에서 프로젝트 스냅샷을 저장하고 복원할 수 있습니다. 이전 버전으로 돌아가거나 여러 버전을 비교하세요.', icon: '🔄' },
                          { step: '16', title: '스마트 검색', desc: '"검색" 기능으로 씬 제목, 설명, 대사로 빠르게 검색할 수 있습니다. 다양한 필터를 사용하여 원하는 씬을 찾으세요.', icon: '🔍' },
                          { step: '17', title: 'PDF 내보내기', desc: '상단의 "PDF" 버튼을 눌러 표지+프로젝트 정보+촬영 정보+씬테이블+타임테이블을 한 번에 PDF로 출력하세요. 외부 공유에 최적화되어 있습니다.', icon: '📄' },
                          { step: '18', title: 'JSON 내보내기', desc: '"내보내기" 메뉴에서 프로젝트 데이터를 JSON 형식으로 내보낼 수 있습니다. 다른 시스템과의 연동이나 백업 용도로 사용하세요.', icon: '💾' },
                          { step: '19', title: '키보드 단축키', desc: 'Ctrl+Z(실행 취소), Ctrl+Shift+Z(다시 하기), 마우스 휠(이미지 확대/축소), 마우스 드래그(이미지 이동) 등의 단축키로 빠르게 작업하세요.', icon: '⌨️' },
                          { step: '20', title: '관리자 기능', desc: '"설정" > "공지사항"에서 팀 전체에 공지사항을 작성, 수정, 삭제할 수 있습니다. 어드민 권한이 필요합니다.', icon: '👨‍💼' },
                        ].map(item => (
                          <div key={item.step} className={`flex gap-3 p-4 rounded-xl ${darkMode ? "bg-neutral-700/50" : "bg-gray-50"}`}>
                            <div className="text-2xl flex-shrink-0">{item.icon}</div>
                            <div className="flex-1">
                              <div className={`font-semibold text-sm mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-[11px] mr-2 font-bold ${darkMode ? "bg-neutral-600 text-white" : "bg-neutral-800 text-white"}`}>{item.step}</span>
                                {item.title}
                              </div>
                              <p className={`text-xs leading-relaxed ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 키보드 단축키 상세 */}
                      <div className={`mt-4 p-4 rounded-xl ${darkMode ? "bg-neutral-700/50" : "bg-gray-50"}`}>
                        <h4 className={`font-semibold text-sm mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          <Keyboard size={14} /> 키보드 단축키
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { keys: 'Ctrl + Z', action: '실행 취소' },
                            { keys: 'Ctrl + Shift + Z', action: '다시 하기' },
                            { keys: '마우스 휠', action: '이미지 확대/축소' },
                            { keys: '마우스 드래그', action: '이미지 이동' },
                          ].map(s => (
                            <div key={s.keys} className="flex items-center gap-2">
                              <kbd className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${darkMode ? "bg-neutral-600 text-neutral-200" : "bg-neutral-200 text-neutral-700"}`}>{s.keys}</kbd>
                              <span className={`text-xs ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>{s.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 내 프로젝트 */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>내 프로젝트 <span className={`text-sm font-normal ml-1 ${darkMode ? "text-neutral-500" : "text-gray-400"}`}>{projects.length}개</span></h2>
                  </div>

                  {projects.length === 0 ? (
                    <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${darkMode ? "border-neutral-700" : "border-gray-200"}`}>
                      <Film size={48} className={`mx-auto mb-4 ${darkMode ? "text-neutral-600" : "text-gray-300"}`} />
                      <p className={`mb-2 font-medium ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>아직 프로젝트가 없어요</p>
                      <p className={`text-sm mb-6 ${darkMode ? "text-neutral-600" : "text-gray-400"}`}>새 프로젝트를 만들어 스토리보드를 시작하세요</p>
                      <button onClick={() => setShowNewProject(true)}
                        className="px-6 py-2.5 bg-neutral-800 text-white rounded-xl hover:bg-neutral-900 transition text-sm font-medium">
                        첫 프로젝트 만들기
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {projects.map(project => (
                        <div key={project.id}
                          className={`rounded-xl overflow-hidden transition cursor-pointer group ${darkMode ? "bg-neutral-800 hover:bg-neutral-750 border border-neutral-700" : "bg-white border border-gray-100 hover:shadow-lg"}`}
                          onClick={() => {
                            setActiveProjectId(project.id);
                            if (project.scenes.length > 0) setActiveSceneId(project.scenes[0].id);
                            setCurrentPage('editor');
                            setViewMode('editor');
                          }}>
                          <div className="h-24 md:h-32 bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center text-3xl md:text-4xl">
                            {project.video_type ? '🎬' : '📽️'}
                          </div>
                          <div className="p-4">
                            <h3 className={`font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>{project.title}</h3>
                            <p className={`text-sm mb-2 ${darkMode ? "text-neutral-400" : "text-gray-500"}`}>
                              {project.scenes.length} 씬 · {formatDuration(project.scenes.reduce((s, sc) => s + (sc.duration || 0), 0))}
                            </p>
                            {project.aspect_ratio && (
                              <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded mb-3 ${darkMode ? "bg-neutral-700 text-neutral-300" : "bg-gray-100 text-gray-600"}`}>
                                {project.aspect_ratio} {project.resolution && `· ${project.resolution}`}
                              </span>
                            )}
                            <div className="flex gap-2">
                              <button onClick={(e) => { e.stopPropagation(); handleDuplicateProject(project.id); }}
                                className={`px-3 py-1.5 text-xs rounded-lg transition flex items-center gap-1 ${darkMode ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                <Copy size={12} /> 복제
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); if(confirm('프로젝트를 삭제할까요?')) handleDeleteProject(project.id); }}
                                className={`px-3 py-1.5 text-xs rounded-lg transition ${darkMode ? "bg-neutral-700 text-neutral-400 hover:text-red-400 hover:bg-neutral-600" : "bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50"}`}>
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 하단 기능 요약 */}
                <div className={`rounded-2xl border p-6 ${darkMode ? "bg-neutral-800/50 border-neutral-700" : "bg-white border-gray-100"}`}>
                  <h3 className={`font-semibold text-sm mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>주요 기능</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                    {[
                      { icon: '📋', title: '프로젝트 정보', desc: '브랜드, 담당자, 제작진' },
                      { icon: '📍', title: '촬영 정보', desc: '스튜디오, 주차, 콜타임' },
                      { icon: '🎥', title: '씬 편집기', desc: '앵글, 조명, 대사, 사운드' },
                      { icon: '💬', title: '씬 코멘트', desc: '씬별 피드백/메모' },
                      { icon: '🗂️', title: '에셋 라이브러리', desc: '프리셋으로 빠른 설정' },
                      { icon: '▶️', title: '애니매틱 프리뷰', desc: '씬 자동 재생 슬라이드' },
                      { icon: '📝', title: '샷 리스트', desc: '촬영팀용 샷 목록 생성' },
                      { icon: '💾', title: '버전 관리', desc: '스냅샷 저장/복원' },
                      { icon: '💰', title: '예산 추정', desc: '씬 기반 제작비 계산' },
                      { icon: '📅', title: '촬영 캘린더', desc: '월간 일정 시각화' },
                      { icon: '🔍', title: '스마트 검색', desc: '씬 필터/검색' },
                      { icon: '📱', title: '반응형 UI', desc: '모바일/태블릿 지원' },
                      { icon: '🤖', title: 'AI 씬 추천', desc: '영상 유형별 자동 구성' },
                      { icon: '📄', title: 'PDF 내보내기', desc: '표지+씬+일정 한번에' },
                      { icon: '⏰', title: '타임테이블', desc: '촬영 일정 표 관리' },
                    ].map(f => (
                      <div key={f.title} className={`p-3 rounded-xl ${darkMode ? "bg-neutral-700/50" : "bg-gray-50"}`}>
                        <div className="text-xl mb-2">{f.icon}</div>
                        <div className={`text-xs font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{f.title}</div>
                        <div className={`text-[10px] mt-0.5 ${darkMode ? "text-neutral-500" : "text-gray-400"}`}>{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : activeProject ? (
            <>
              {viewMode === 'project-info' && <ProjectInfoView project={activeProject} onUpdate={handleUpdateProjectMeta} darkMode={darkMode} />}
              {viewMode === 'shooting-info' && <ShootingInfoView project={activeProject} onUpdate={handleUpdateProjectMeta} darkMode={darkMode} />}
              {viewMode === 'editor' && (
                <div className="flex flex-1 overflow-hidden relative">
                  {slideViewMode && (
                    <div className="hidden md:block w-80 border-r border-gray-200 flex-shrink-0">
                      <SlideView
                        scenes={activeProject.scenes}
                        activeSceneId={activeSceneId}
                        onSceneSelect={setActiveSceneId}
                        onAddScene={handleAddScene}
                        onDeleteScene={handleDeleteScene}
                        onReorderScenes={handleReorderScenes}
                      />
                    </div>
                  )}
                  <SceneEditor scene={activeScene} onUpdate={(updates: any) => activeScene && handleUpdateScene(activeScene.id, updates)} onOpenReferenceLibrary={() => setShowReferenceLibrary(true)} aspectRatio={activeProject.aspect_ratio || "16:9"} />
                  {activeScene && (
                    <div className={`hidden lg:block w-80 border-l overflow-y-auto flex-shrink-0 ${darkMode ? "border-neutral-700 bg-neutral-800" : "border-gray-200 bg-gray-50"}`}>
                      <SceneCommentPanel scene={activeScene} onUpdate={(updates: any) => handleUpdateScene(activeScene.id, updates)} darkMode={darkMode} userName={user?.displayName || user?.email?.split('@')[0] || '사용자'} />
                      <div className={`border-t ${darkMode ? "border-neutral-700" : "border-gray-200"}`}>
                        <AssetLibraryPanel onApplyPreset={(preset: any) => {
                          if (activeScene) {
                            handleUpdateScene(activeScene.id, { ...activeScene, ...preset });
                          }
                        }} darkMode={darkMode} />
                      </div>
                    </div>
                  )}

                  {/* Mobile Scene Navigation Bar */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 z-10">
                    <div className={`flex items-center gap-2 px-3 py-2 border-t ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-200"}`}>
                      <button
                        onClick={() => {
                          const scenes = activeProject.scenes;
                          const idx = scenes.findIndex(s => s.id === activeSceneId);
                          if (idx > 0) setActiveSceneId(scenes[idx - 1].id);
                        }}
                        disabled={activeProject.scenes.findIndex(s => s.id === activeSceneId) <= 0}
                        className={`p-2 rounded-lg transition flex-shrink-0 ${darkMode ? "bg-neutral-700 text-neutral-300 disabled:opacity-30" : "bg-gray-100 text-gray-600 disabled:opacity-30"}`}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div className="flex-1 overflow-x-auto no-scrollbar flex gap-1.5">
                        {activeProject.scenes.map((scene, idx) => (
                          <button
                            key={scene.id}
                            onClick={() => setActiveSceneId(scene.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap flex-shrink-0 transition ${
                              scene.id === activeSceneId
                                ? 'bg-neutral-800 text-white'
                                : darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          const scenes = activeProject.scenes;
                          const idx = scenes.findIndex(s => s.id === activeSceneId);
                          if (idx < scenes.length - 1) setActiveSceneId(scenes[idx + 1].id);
                        }}
                        disabled={activeProject.scenes.findIndex(s => s.id === activeSceneId) >= activeProject.scenes.length - 1}
                        className={`p-2 rounded-lg transition flex-shrink-0 ${darkMode ? "bg-neutral-700 text-neutral-300 disabled:opacity-30" : "bg-gray-100 text-gray-600 disabled:opacity-30"}`}
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        onClick={handleAddScene}
                        className="p-2 rounded-lg bg-neutral-800 text-white flex-shrink-0"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {viewMode === 'grid' && <StoryboardGrid scenes={activeProject.scenes} onSelectScene={(id: string) => { setActiveSceneId(id); setViewMode('editor'); }} />}
              {viewMode === 'timeline' && <TimelineView scenes={activeProject.scenes} activeSceneId={activeSceneId} onSelectScene={setActiveSceneId} />}
              {viewMode === 'timetable' && <TimetableView project={activeProject} onUpdate={handleUpdateProjectMeta} darkMode={darkMode} />}
              {viewMode === 'animatic' && <AnimaticPreview scenes={activeProject.scenes} projectTitle={activeProject.title} darkMode={darkMode} />}
              {viewMode === 'shotlist' && <ShotListView project={activeProject} darkMode={darkMode} />}
              {viewMode === 'calendar' && <CalendarView project={activeProject} onUpdate={handleUpdateProjectMeta} darkMode={darkMode} />}
              {viewMode === 'budget' && <BudgetEstimator project={activeProject} darkMode={darkMode} onExportPDF={() => setShowPDFExportModal(true)} />}
              {viewMode === 'search' && <SceneSearchFilter scenes={activeProject.scenes} onSelectScene={(id: string) => { setActiveSceneId(id); setViewMode('editor'); }} darkMode={darkMode} />}
              {viewMode === 'versions' && <VersionManager project={activeProject} onRestore={(restored: any) => {
                const updated = projects.map(p => p.id === activeProject.id ? { ...restored, id: activeProject.id } : p);
                setProjects(updated);
              }} darkMode={darkMode} />}
              {viewMode === 'ai-recommend' && <AISceneRecommender project={activeProject} onAddScene={(sceneData: any) => {
                const newScene = {
                  ...sceneData,
                  id: generateId(),
                  scene_number: activeProject.scenes.length + 1,
                };
                const updated = projects.map(p => p.id === activeProject.id ? { ...p, scenes: [...p.scenes, newScene] } : p);
                setProjects(updated);
                setActiveSceneId(newScene.id);
              }} darkMode={darkMode} />}
            </>
          ) : null}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <NewProjectModal
          darkMode={darkMode}
          onClose={() => setShowNewProject(false)}
          onCreate={handleCreateProject}
        />
      )}

      {/* Blank Page Editor Modal */}
      <BlankPageEditor
        isOpen={showBlankPageEditor}
        onClose={() => setShowBlankPageEditor(false)}
        onSelectType={handleAddBlankPage}
      />

      {/* Reference Library Modal */}
      {showReferenceLibrary && (
        <ReferenceLibrary
          onClose={() => setShowReferenceLibrary(false)}
          onSelectImage={(template) => {
            if (activeScene) {
              const updatedProjects = projects.map(p => {
                if (p.id === activeProjectId) {
                  return {
                    ...p,
                    scenes: p.scenes.map(s => {
                      if (s.id === activeSceneId) {
                        return { ...s, image: template.fullImage, shot_size: template.shotSize, camera_angle: template.angle };
                      }
                      return s;
                    })
                  };
                }
                return p;
              });
              setProjects(updatedProjects);
              addToHistory(updatedProjects);
            }
            setShowReferenceLibrary(false);
          }}
        />
      )}

      {showPDFExportModal && activeProject && (
        <PDFExportModal
          project={activeProject}
          darkMode={darkMode}
          onClose={() => setShowPDFExportModal(false)}
          onExport={(enabledPages) => {
            handleExportPDF(enabledPages);
            setShowPDFExportModal(false);
          }}
        />
      )}

    </div>
  );
};
