/**
 * Container Token System
 *
 * Figma Tokens Studio에서 추출한 Container Layout Design Tokens
 * - 반응형 컨테이너 설정
 * - Desktop/Mobile 구분
 *
 * @generated from Figma Tokens Studio
 * @version 1.0.0
 */

// ============================================================================
// 1. CONTAINER VALUES
// ============================================================================

/**
 * Container Values (px)
 * maxWidthDesktop: 1280px - 데스크톱 최대 너비
 * paddingDesktop: 32px - 데스크톱 좌우 패딩
 * paddingMobile: 16px - 모바일 좌우 패딩
 */
export const containers = {
  maxWidthDesktop: 1280,
  paddingDesktop: 32,
  paddingMobile: 16,
} as const;

/**
 * Container with Unit (px)
 * CSS에서 바로 사용 가능한 형태
 */
export const containersWithUnit = {
  maxWidthDesktop: '1280px',
  paddingDesktop: '32px',
  paddingMobile: '16px',
} as const;

// ============================================================================
// 2. TYPESCRIPT TYPES
// ============================================================================

export type ContainerKey = keyof typeof containers;

export type ContainerValue = typeof containers[ContainerKey];

/**
 * Container Style Object
 * React inline style이나 CSS-in-JS에서 사용 가능한 타입
 */
export type ContainerStyle = {
  maxWidth?: number | string;
  margin?: string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  width?: string;
};

// ============================================================================
// 3. CONTAINER PRESETS
// ============================================================================

/**
 * Container Presets
 * 자주 사용하는 container 조합을 미리 정의
 */
export const containerPresets = {
  /**
   * 반응형 컨테이너 (Mobile)
   * 모바일에서 사용하는 기본 컨테이너
   */
  responsiveMobile: {
    maxWidth: containers.maxWidthDesktop,
    margin: '0 auto',
    paddingLeft: containers.paddingMobile,
    paddingRight: containers.paddingMobile,
  },

  /**
   * 반응형 컨테이너 (Desktop)
   * 데스크톱에서 사용하는 기본 컨테이너
   */
  responsiveDesktop: {
    maxWidth: containers.maxWidthDesktop,
    margin: '0 auto',
    paddingLeft: containers.paddingDesktop,
    paddingRight: containers.paddingDesktop,
  },

  /**
   * Full Width 컨테이너
   * 패딩만 적용하고 max-width 제한 없음
   */
  fullWidthMobile: {
    width: '100%',
    paddingLeft: containers.paddingMobile,
    paddingRight: containers.paddingMobile,
  },

  fullWidthDesktop: {
    width: '100%',
    paddingLeft: containers.paddingDesktop,
    paddingRight: containers.paddingDesktop,
  },

  /**
   * Narrow 컨테이너
   * 텍스트 중심 콘텐츠를 위한 좁은 컨테이너
   */
  narrow: {
    maxWidth: 720,
    margin: '0 auto',
    paddingLeft: containers.paddingMobile,
    paddingRight: containers.paddingMobile,
  },
} as const;

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================

/**
 * 반응형 컨테이너 스타일을 생성합니다.
 * @param breakpoint - 'mobile' | 'desktop'
 * @returns Container style object
 */
export function createResponsiveContainer(breakpoint: 'mobile' | 'desktop' = 'mobile'): ContainerStyle {
  return breakpoint === 'desktop'
    ? containerPresets.responsiveDesktop
    : containerPresets.responsiveMobile;
}

/**
 * 커스텀 컨테이너 스타일을 생성합니다.
 * @param maxWidth - 최대 너비 (px)
 * @param padding - 좌우 패딩 (px)
 * @param centered - 중앙 정렬 여부
 * @returns Container style object
 */
export function createCustomContainer(
  maxWidth: number,
  padding: number = containers.paddingMobile,
  centered: boolean = true
): ContainerStyle {
  return {
    maxWidth,
    ...(centered && { margin: '0 auto' }),
    paddingLeft: padding,
    paddingRight: padding,
  };
}

/**
 * 모든 Container Tokens를 객체로 반환합니다.
 */
export const containerTokens = {
  containers,
  containersWithUnit,
  presets: containerPresets,
} as const;

// Default export
export default {
  ...containerTokens,
  createResponsiveContainer,
  createCustomContainer,
} as const;
