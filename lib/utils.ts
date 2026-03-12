// 프로젝트 타입 정의
export interface Scene {
  id: string;
  title: string;
  duration: number;
  camera_angle?: string;
  shot_size?: string;
  camera_movement?: string;
  lighting?: string;
  description?: string;
  notes?: string;
  image_url?: string;
  transition?: string;
  lens?: string;
  framerate?: string;
  [key: string]: any;
}

export interface Project {
  id: string;
  title: string;
  brand_name?: string;
  production_company?: string;
  video_type?: string;
  platform?: string;
  duration?: string;
  tone?: string;
  description?: string;
  scenes: Scene[];
  createdAt?: number;
  updatedAt?: number;
  userId?: string;
  thumbnail?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: number;
}

// ID 생성
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 프로젝트 생성
export const createProject = (data: Partial<Project>): Project => {
  return {
    id: generateId(),
    title: data.title || '새 프로젝트',
    brand_name: data.brand_name || '',
    production_company: data.production_company || '',
    video_type: data.video_type || '',
    platform: data.platform || '',
    duration: data.duration || '30',
    tone: data.tone || '',
    description: data.description || '',
    scenes: data.scenes || [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

// 씬 생성
export const createScene = (data: Partial<Scene> = {}): Scene => {
  return {
    id: generateId(),
    title: data.title || '새 씬',
    duration: data.duration || 5,
    camera_angle: data.camera_angle || '정면',
    shot_size: data.shot_size || '미디엄 샷',
    camera_movement: data.camera_movement || '고정',
    lighting: data.lighting || '자연광',
    description: data.description || '',
    notes: data.notes || '',
    image_url: data.image_url || '',
    transition: data.transition || '컷',
    lens: data.lens || '',
    framerate: data.framerate || '24fps',
  };
};

// localStorage 유틸
export const saveProjectsToStorage = (projects: Project[]) => {
  try {
    localStorage.setItem('storyboard-projects', JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save projects:', error);
  }
};

export const loadProjectsFromStorage = (): Project[] => {
  try {
    const saved = localStorage.getItem('storyboard-projects');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
};

// 사용자 통계
export interface Stats {
  totalProjects: number;
  totalScenes: number;
  totalUsers: number;
  totalDuration: number;
}

export const calculateStats = (projects: Project[]): Stats => {
  const totalScenes = projects.reduce((sum, p) => sum + (p.scenes?.length || 0), 0);
  const totalDuration = projects.reduce((sum, p) => {
    return sum + (p.scenes?.reduce((s, scene) => s + (scene.duration || 0), 0) || 0);
  }, 0);

  return {
    totalProjects: projects.length,
    totalScenes,
    totalUsers: 1, // 단일 사용자를 위해 1로 설정
    totalDuration,
  };
};

// 날짜 포맷
export const formatDate = (timestamp: number | undefined) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 총 비디오 길이 계산
export const calculateTotalDuration = (scenes: Scene[]): string => {
  const totalSeconds = scenes.reduce((sum, scene) => sum + (scene.duration || 0), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}분 ${seconds}초`;
};

// 씬 완성도 계산
export const calculateSceneCompletion = (scene: Scene): number => {
  const fields = [
    scene.title && scene.title.trim(),
    scene.description && scene.description.trim(),
    scene.image_url,
    scene.camera_angle,
    scene.shot_size,
    scene.camera_movement,
    scene.lighting,
    scene.notes && scene.notes.trim(),
  ];
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
};

// 설명 생성
export const generateDescription = (scene: Scene): string => {
  const angle = scene.camera_angle || "정면";
  const shot = scene.shot_size || "미디엄 샷";
  const movement = scene.camera_movement || "고정";
  const light = scene.lighting || "자연광";

  const movementDesc: Record<string, string> = {
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

  const lightDesc: Record<string, string> = {
    "소프트 라이트": "부드럽고 확산된 조명으로 은은한 분위기를 연출합니다",
    "하드 라이트": "강한 방향성 조명으로 드라마틱한 그림자를 만듭니다",
    "자연광": "자연스러운 주변광으로 촬영합니다",
    "스튜디오 조명": "컨트롤된 스튜디오 조명 아래에서 촬영합니다",
    "역광": "역광으로 실루엣 효과를 만들어냅니다",
    "하이 콘트라스트": "하이 콘트라스트 조명으로 시각적 임팩트를 줍니다"
  };

  return `${angle} 앵글에서 촬영한 ${shot}입니다. ${movementDesc[movement] || "카메라가 안정적으로 고정되어"} 피사체를 담아냅니다. ${lightDesc[light] || "균형 잡힌 조명으로 촬영합니다"} 길이: ${scene.duration || 3}초.`;
};

// 메모 템플릿 적용
export const applyMemoTemplate = (currentNotes: string | undefined, templateType: string): string => {
  const templates: Record<string, string> = {
    "인물": "\n[인물]\n- 배우: \n- 역할: \n- 의상: ",
    "소품": "\n[소품]\n- 주요 소품: \n- 배치: ",
    "장소": "\n[장소]\n- 위치: \n- 세팅: \n- 배경: ",
    "의상": "\n[의상]\n- 스타일: \n- 색상: \n- 특징: ",
    "음악/사운드": "\n[음악/사운드]\n- 음악: \n- 효과음: \n- 음성: "
  };
  return (currentNotes || "") + (templates[templateType] || "");
};
