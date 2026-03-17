/**
 * Brand configuration utilities for PEWPEW Storyboard
 * Handles studio branding, colors, watermarks, and persistence
 */

export interface BrandConfig {
  studioName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  watermarkText: string;
  watermarkOpacity: number;
  showWatermarkOnPDF: boolean;
  showWatermarkOnShare: boolean;
}

export const defaultBrandConfig: BrandConfig = {
  studioName: 'PEWPEW STUDIO',
  logoUrl: '',
  primaryColor: '#1F4E79',
  secondaryColor: '#2E75B6',
  watermarkText: 'PEWPEW STUDIO',
  watermarkOpacity: 15,
  showWatermarkOnPDF: true,
  showWatermarkOnShare: false,
};

const STORAGE_KEY = 'pewpew_brand';

/**
 * Save brand configuration to localStorage
 */
export function saveBrandConfig(config: BrandConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('브랜드 설정 저장 실패:', error);
  }
}

/**
 * Load brand configuration from localStorage
 * Returns default config if not found or on parse error
 */
export function loadBrandConfig(): BrandConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultBrandConfig, ...parsed };
    }
    return defaultBrandConfig;
  } catch (error) {
    console.error('브랜드 설정 로드 실패:', error);
    return defaultBrandConfig;
  }
}

/**
 * Reset brand configuration to defaults
 */
export function resetBrandConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('브랜드 설정 초기화 실패:', error);
  }
}

/**
 * Export brand configuration as JSON
 */
export function exportBrandConfig(config: BrandConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Import brand configuration from JSON
 */
export function importBrandConfig(jsonString: string): BrandConfig | null {
  try {
    const parsed = JSON.parse(jsonString);
    return { ...defaultBrandConfig, ...parsed };
  } catch (error) {
    console.error('브랜드 설정 임포트 실패:', error);
    return null;
  }
}

/**
 * Validate brand configuration
 */
export function validateBrandConfig(config: Partial<BrandConfig>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (config.studioName && config.studioName.trim().length === 0) {
    errors.push('스튜디오 이름을 입력하세요');
  }

  if (config.watermarkOpacity !== undefined) {
    if (config.watermarkOpacity < 0 || config.watermarkOpacity > 100) {
      errors.push('워터마크 투명도는 0~100 사이여야 합니다');
    }
  }

  if (config.primaryColor && !/^#[0-9A-F]{6}$/i.test(config.primaryColor)) {
    errors.push('주요 색상은 유효한 HEX 색상이어야 합니다');
  }

  if (config.secondaryColor && !/^#[0-9A-F]{6}$/i.test(config.secondaryColor)) {
    errors.push('보조 색상은 유효한 HEX 색상이어야 합니다');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get contrasting text color for a background color
 */
export function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Generate watermark CSS styles
 */
export function getWatermarkStyles(config: BrandConfig): React.CSSProperties {
  return {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
    color: config.primaryColor,
    opacity: config.watermarkOpacity / 100,
    pointerEvents: 'none',
    zIndex: 10,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  };
}

/**
 * Get CSS class for theme styling
 */
export function getBrandCSSVariables(config: BrandConfig): string {
  return `
    :root {
      --brand-primary: ${config.primaryColor};
      --brand-secondary: ${config.secondaryColor};
      --brand-watermark-opacity: ${config.watermarkOpacity}%;
    }
  `;
}
