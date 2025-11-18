/**
 * Width Token System
 *
 * Figma Tokens Studio에서 추출한 Width Constraint Design Tokens
 * - 12개 width 값 (xxs ~ 6xl, paragraph-max)
 * - 320px ~ 1920px
 * - 컨테이너 max-width, 반응형 레이아웃에 사용
 *
 * @generated from Figma Tokens Studio
 * @version 1.0.0
 */

// ============================================================================
// 1. WIDTH VALUES
// ============================================================================

/**
 * Width Values (px)
 * xxs: 320px (모바일)
 * xs ~ 6xl: 384px ~ 1920px (다양한 컨테이너 크기)
 * paragraphMax: 720px (가독성 좋은 텍스트 너비)
 */
export const widths = {
  xxs: 320,
  xs: 384,
  sm: 480,
  md: 560,
  lg: 640,
  xl: 768,
  xl2: 1024,
  xl3: 1280,
  xl4: 1440,
  xl5: 1600,
  xl6: 1920,
  paragraphMax: 720,
} as const;

/**
 * Width with Unit (px)
 * CSS에서 바로 사용 가능한 형태
 */
export const widthsWithUnit = {
  xxs: '320px',
  xs: '384px',
  sm: '480px',
  md: '560px',
  lg: '640px',
  xl: '768px',
  xl2: '1024px',
  xl3: '1280px',
  xl4: '1440px',
  xl5: '1600px',
  xl6: '1920px',
  paragraphMax: '720px',
} as const;

// ============================================================================
// 2. TYPESCRIPT TYPES
// ============================================================================

export type WidthSize = keyof typeof widths;

export type WidthValue = typeof widths[WidthSize];

/**
 * Width Style Object
 * React inline style이나 CSS-in-JS에서 사용 가능한 타입
 */
export type WidthStyle = {
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
};

// ============================================================================
// 3. BREAKPOINTS (Width 기반)
// ============================================================================

/**
 * Responsive Breakpoints
 * Width tokens 기반 반응형 중단점
 */
export const breakpoints = {
  mobile: widths.xxs,      // 320px
  mobileLg: widths.sm,     // 480px
  tablet: widths.xl,       // 768px
  desktop: widths.xl2,     // 1024px
  desktopLg: widths.xl3,   // 1280px
  desktopXl: widths.xl4,   // 1440px
  desktopXxl: widths.xl6,  // 1920px
} as const;

/**
 * Media Query Strings
 * CSS media query에서 바로 사용 가능
 */
export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  mobileLg: `@media (min-width: ${breakpoints.mobileLg}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  desktopLg: `@media (min-width: ${breakpoints.desktopLg}px)`,
  desktopXl: `@media (min-width: ${breakpoints.desktopXl}px)`,
  desktopXxl: `@media (min-width: ${breakpoints.desktopXxl}px)`,
} as const;

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================

/**
 * Max-width 스타일을 생성합니다.
 * @param size - Width size key
 * @param centered - 중앙 정렬 여부 (margin: 0 auto)
 * @returns Width style object
 */
export function createMaxWidth(size: WidthSize, centered: boolean = true): WidthStyle & { margin?: string } {
  return {
    maxWidth: widths[size],
    ...(centered && { margin: '0 auto' }),
  };
}

/**
 * Responsive container 스타일을 생성합니다.
 * @param maxSize - 최대 너비
 * @param padding - 좌우 패딩
 * @returns Container style object
 */
export function createResponsiveContainer(
  maxSize: WidthSize,
  padding: number = 16
): WidthStyle & { margin?: string; paddingLeft?: number; paddingRight?: number } {
  return {
    maxWidth: widths[maxSize],
    margin: '0 auto',
    paddingLeft: padding,
    paddingRight: padding,
  };
}

/**
 * 모든 Width Tokens를 객체로 반환합니다.
 */
export const widthTokens = {
  widths,
  widthsWithUnit,
  breakpoints,
  mediaQueries,
} as const;

// Default export
export default {
  ...widthTokens,
  createMaxWidth,
  createResponsiveContainer,
} as const;
