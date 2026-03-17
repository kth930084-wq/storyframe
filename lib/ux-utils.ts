/**
 * UX utilities for PEWPEW Storyboard
 * Includes image processing, aspect ratios, ID generation, and production budgets
 */

/**
 * Calculate smart crop parameters for an image to match target aspect ratio
 * Returns scale factor and center offsets
 */
export function calculateSmartCrop(
  imgW: number,
  imgH: number,
  targetRatio: string
): { scale: number; offsetX: number; offsetY: number } {
  const ratio = parseAspectRatio(targetRatio);
  const imgRatio = imgW / imgH;

  let scale: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > ratio) {
    // Image is wider than target - scale by height
    scale = imgH / (imgW / ratio);
    offsetX = (imgW - imgW * scale) / 2;
    offsetY = 0;
  } else {
    // Image is taller than target - scale by width
    scale = imgW / (imgH * ratio);
    offsetX = 0;
    offsetY = (imgH - imgH * scale) / 2;
  }

  return { scale, offsetX, offsetY };
}

/**
 * Parse aspect ratio string to numeric value
 * Examples: "16:9" -> 1.777..., "2.35:1" -> 2.35, "1" -> 1
 */
export function parseAspectRatio(ratio: string): number {
  if (!ratio) return 1;

  if (ratio.includes(':')) {
    const [width, height] = ratio.split(':').map(parseFloat);
    return width / (height || 1);
  }

  return parseFloat(ratio) || 1;
}

/**
 * Generate unique scene ID based on timestamp and random string
 */
export function generateSceneId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Budget item structure
 */
export interface BudgetItem {
  category: string;
  item: string;
  unit: string;
  unitPrice: number;
  quantity: number;
}

/**
 * Production budget presets for common video types
 * Prices are in KRW (Korean Won) - realistic Korean production rates
 */
export const BUDGET_PRESETS: Record<string, BudgetItem[]> = {
  '바이럴 광고': [
    {
      category: '크루',
      item: '감독',
      unit: '일',
      unitPrice: 500000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '촬영감독(DP)',
      unit: '일',
      unitPrice: 400000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '조명팀',
      unit: '명/일',
      unitPrice: 300000,
      quantity: 2,
    },
    {
      category: '크루',
      item: '촬영팀',
      unit: '명/일',
      unitPrice: 250000,
      quantity: 2,
    },
    {
      category: '장비',
      item: '카메라 패키지',
      unit: '일',
      unitPrice: 800000,
      quantity: 1,
    },
    {
      category: '장비',
      item: '조명 패키지',
      unit: '일',
      unitPrice: 600000,
      quantity: 1,
    },
    {
      category: '장소',
      item: '스튜디오 대관',
      unit: '시간',
      unitPrice: 100000,
      quantity: 8,
    },
    {
      category: '후반',
      item: '편집',
      unit: '일',
      unitPrice: 300000,
      quantity: 3,
    },
    {
      category: '후반',
      item: '컬러 그레이딩',
      unit: '일',
      unitPrice: 200000,
      quantity: 1,
    },
    {
      category: '경비',
      item: '식비/교통비',
      unit: '일',
      unitPrice: 150000,
      quantity: 1,
    },
  ],
  '유튜브 인터뷰': [
    {
      category: '크루',
      item: '감독/구성',
      unit: '일',
      unitPrice: 400000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '촬영감독',
      unit: '일',
      unitPrice: 350000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '음성 기술',
      unit: '일',
      unitPrice: 250000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '조명 기술',
      unit: '일',
      unitPrice: 250000,
      quantity: 1,
    },
    {
      category: '장비',
      item: '카메라',
      unit: '일',
      unitPrice: 400000,
      quantity: 1,
    },
    {
      category: '후반',
      item: '편집/컬러',
      unit: '일',
      unitPrice: 400000,
      quantity: 2,
    },
    {
      category: '경비',
      item: '식비/교통비',
      unit: '일',
      unitPrice: 100000,
      quantity: 1,
    },
    {
      category: '기타',
      item: '자막/그래픽',
      unit: '일',
      unitPrice: 200000,
      quantity: 1,
    },
  ],
  '뮤직비디오': [
    {
      category: '크루',
      item: '감독',
      unit: '일',
      unitPrice: 700000,
      quantity: 2,
    },
    {
      category: '크루',
      item: '촬영감독',
      unit: '일',
      unitPrice: 500000,
      quantity: 2,
    },
    {
      category: '크루',
      item: '조명팀',
      unit: '명/일',
      unitPrice: 300000,
      quantity: 3,
    },
    {
      category: '크루',
      item: '촬영팀',
      unit: '명/일',
      unitPrice: 250000,
      quantity: 3,
    },
    {
      category: '장비',
      item: '카메라 패키지',
      unit: '일',
      unitPrice: 1000000,
      quantity: 2,
    },
    {
      category: '장비',
      item: '조명 세트',
      unit: '일',
      unitPrice: 800000,
      quantity: 2,
    },
    {
      category: '장비',
      item: 'RED/ARRI 프리미엄',
      unit: '일',
      unitPrice: 1500000,
      quantity: 1,
    },
    {
      category: '장소',
      item: '스튜디오 대관',
      unit: '시간',
      unitPrice: 150000,
      quantity: 16,
    },
    {
      category: '장소',
      item: '로케이션 협력비',
      unit: '일',
      unitPrice: 200000,
      quantity: 1,
    },
    {
      category: '후반',
      item: '편집',
      unit: '일',
      unitPrice: 400000,
      quantity: 5,
    },
    {
      category: '후반',
      item: '컬러 그레이딩',
      unit: '일',
      unitPrice: 300000,
      quantity: 2,
    },
    {
      category: '후반',
      item: 'VFX/그래픽',
      unit: '일',
      unitPrice: 500000,
      quantity: 2,
    },
    {
      category: '경비',
      item: '식비/교통비',
      unit: '일',
      unitPrice: 200000,
      quantity: 2,
    },
    {
      category: '기타',
      item: '음악 라이선스',
      unit: '곡',
      unitPrice: 100000,
      quantity: 1,
    },
  ],
  '제품 촬영': [
    {
      category: '크루',
      item: '포토그래퍼/감독',
      unit: '일',
      unitPrice: 400000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '조명 기술',
      unit: '일',
      unitPrice: 250000,
      quantity: 1,
    },
    {
      category: '크루',
      item: '스타일리스트',
      unit: '일',
      unitPrice: 200000,
      quantity: 1,
    },
    {
      category: '장비',
      item: '카메라',
      unit: '일',
      unitPrice: 600000,
      quantity: 1,
    },
    {
      category: '장비',
      item: '조명 세트',
      unit: '일',
      unitPrice: 400000,
      quantity: 1,
    },
    {
      category: '장소',
      item: '스튜디오',
      unit: '시간',
      unitPrice: 80000,
      quantity: 6,
    },
    {
      category: '후반',
      item: '후보정/레타칭',
      unit: '이미지',
      unitPrice: 50000,
      quantity: 50,
    },
  ],
};

/**
 * Calculate total budget for a preset or custom budget items
 */
export function calculateBudgetTotal(items: BudgetItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

/**
 * Format Korean Won currency
 */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate budget by category
 */
export function calculateByCategory(
  items: BudgetItem[]
): Record<string, number> {
  const byCategory: Record<string, number> = {};

  items.forEach((item) => {
    const total = item.unitPrice * item.quantity;
    if (byCategory[item.category]) {
      byCategory[item.category] += total;
    } else {
      byCategory[item.category] = total;
    }
  });

  return byCategory;
}

/**
 * Common aspect ratios for video
 */
export const ASPECT_RATIOS = {
  '1:1': '1:1',
  '16:9': '16:9',
  '9:16': '9:16',
  '4:3': '4:3',
  '3:4': '3:4',
  '2.35:1': '2.35:1',
  '21:9': '21:9',
  '9:21': '9:21',
} as const;

/**
 * Frame rates for video
 */
export const FRAME_RATES = [24, 30, 60] as const;

/**
 * Resolution presets
 */
export const RESOLUTION_PRESETS = {
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '2K': { width: 2560, height: 1440 },
  '4K': { width: 3840, height: 2160 },
  'DCI 2K': { width: 2048, height: 1080 },
  'DCI 4K': { width: 4096, height: 2160 },
} as const;

/**
 * Validate numeric input for frames, duration, etc
 */
export function validatePositiveNumber(value: unknown): boolean {
  return typeof value === 'number' && value > 0 && Number.isFinite(value);
}

/**
 * Convert seconds to timecode format (HH:MM:SS)
 */
export function secondsToTimecode(seconds: number): string {
  if (!validatePositiveNumber(seconds)) return '00:00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [hours, minutes, secs]
    .map((v) => String(v).padStart(2, '0'))
    .join(':');
}

/**
 * Convert timecode to seconds
 */
export function timecodeToSeconds(timecode: string): number {
  const parts = timecode.split(':').map(parseFloat);
  if (parts.length !== 3 || parts.some(isNaN)) return 0;

  const [hours, minutes, seconds] = parts;
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Generate color palette from primary color
 */
export function generateColorPalette(primaryHex: string): {
  light: string;
  main: string;
  dark: string;
} {
  // Simple palette generation - can be enhanced with more sophisticated algorithms
  const hex = primaryHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const light = `#${Math.min(r + 50, 255)
    .toString(16)
    .padStart(2, '0')}${Math.min(g + 50, 255)
    .toString(16)
    .padStart(2, '0')}${Math.min(b + 50, 255)
    .toString(16)
    .padStart(2, '0')}`;

  const dark = `#${Math.max(r - 50, 0)
    .toString(16)
    .padStart(2, '0')}${Math.max(g - 50, 0)
    .toString(16)
    .padStart(2, '0')}${Math.max(b - 50, 0)
    .toString(16)
    .padStart(2, '0')}`;

  return { light, main: primaryHex, dark };
}

/**
 * Calculate video file size estimate
 * bitrate in Mbps, duration in seconds
 */
export function estimateFileSize(
  bitrate: number,
  duration: number
): { bytes: number; megabytes: number; gigabytes: number } {
  const bytes = (bitrate * 1000000 * duration) / 8;
  const megabytes = bytes / (1024 * 1024);
  const gigabytes = megabytes / 1024;

  return { bytes, megabytes, gigabytes };
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
