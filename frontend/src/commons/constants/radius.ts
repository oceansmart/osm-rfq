/**
 * Radius Token System
 *
 * Figma Tokens Studio에서 추출한 Border Radius Design Tokens
 * - 11개 radius 값 (none ~ 4xl, full)
 * - 0px ~ 9999px (full = 완전한 원형)
 *
 * @generated from Figma Tokens Studio
 * @version 1.0.0
 */

// ============================================================================
// 1. RADIUS VALUES
// ============================================================================

/**
 * Border Radius Values (px)
 * none: 0px (각진 모서리)
 * xxs ~ 4xl: 2px ~ 24px (점진적 둥글기)
 * full: 9999px (완전한 원형 또는 pill shape)
 */
export const radius = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xl2: 16,
  xl3: 20,
  xl4: 24,
  full: 9999,
} as const;

/**
 * Border Radius with Unit (px)
 * CSS에서 바로 사용 가능한 형태
 */
export const radiusWithUnit = {
  none: '0px',
  xxs: '2px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  xl2: '16px',
  xl3: '20px',
  xl4: '24px',
  full: '9999px',
} as const;

// ============================================================================
// 2. TYPESCRIPT TYPES
// ============================================================================

export type RadiusSize = keyof typeof radius;

export type RadiusValue = typeof radius[RadiusSize];

/**
 * Border Radius Style Object
 * React inline style이나 CSS-in-JS에서 사용 가능한 타입
 */
export type RadiusStyle = {
  borderRadius?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
  borderBottomRightRadius?: number | string;
};

// ============================================================================
// 3. HELPER FUNCTIONS
// ============================================================================

/**
 * Radius 값을 rem 단위로 변환합니다. (base: 16px)
 * @param size - Radius size key
 * @returns Rem value (string)
 */
export function getRadiusInRem(size: RadiusSize): string {
  if (size === 'full') return '9999px';
  return `${radius[size] / 16}rem`;
}

/**
 * 특정 모서리만 둥글게 하는 스타일을 생성합니다.
 * @param size - Radius size
 * @param corners - 둥글게 할 모서리 [topLeft, topRight, bottomRight, bottomLeft]
 * @returns Border radius style object
 */
export function createCornerRadius(
  size: RadiusSize,
  corners: [boolean, boolean, boolean, boolean] = [true, true, true, true]
): RadiusStyle {
  const value = radius[size];
  const [topLeft, topRight, bottomRight, bottomLeft] = corners;

  return {
    borderTopLeftRadius: topLeft ? value : 0,
    borderTopRightRadius: topRight ? value : 0,
    borderBottomRightRadius: bottomRight ? value : 0,
    borderBottomLeftRadius: bottomLeft ? value : 0,
  };
}

/**
 * 모든 Radius Tokens를 객체로 반환합니다.
 */
export const radiusTokens = {
  radius,
  radiusWithUnit,
} as const;

// ============================================================================
// 4. CSS VARIABLES GENERATION (Single Source of Truth)
// ============================================================================

/**
 * Figma tokens 네이밍을 CSS Variables로 매핑
 * TypeScript: xl2 → CSS: --radius-2xl
 */
const radiusCSSNameMapping: Record<string, string> = {
  none: 'none',
  xxs: 'xxs',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xl2: '2xl',   // TypeScript xl2 → CSS 2xl
  xl3: '3xl',
  xl4: '4xl',
  full: 'full',
};

/**
 * Generate CSS Variables for radius tokens
 * Follows Untitled UI naming convention: --radius-{size}
 *
 * @returns Record of CSS variable names and values
 *
 * @example
 * ```typescript
 * const cssVars = generateRadiusCSS();
 * // {
 * //   '--radius-none': '0px',
 * //   '--radius-md': '8px',
 * //   '--radius-2xl': '16px',
 * //   '--radius-full': '9999px',
 * //   ...
 * // }
 * ```
 */
export function generateRadiusCSS(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // radius 객체를 순회하며 CSS Variables 생성
  Object.entries(radius).forEach(([key, value]) => {
    const cssName = radiusCSSNameMapping[key as RadiusSize];
    cssVars[`--radius-${cssName}`] = `${value}px`;
  });

  return cssVars;
}

/**
 * Generate CSS string for radius tokens
 * Can be used directly in CSS files or style tags
 *
 * @returns CSS string with all radius variables
 *
 * @example
 * ```typescript
 * const css = generateRadiusCSSString();
 * // '  --radius-none: 0px;\n  --radius-xxs: 2px;\n  --radius-md: 8px;\n  ...'
 * ```
 */
export function generateRadiusCSSString(): string {
  const vars = generateRadiusCSS();
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

// Default export
export default {
  ...radiusTokens,
  getRadiusInRem,
  createCornerRadius,
  generateRadiusCSS,
  generateRadiusCSSString,
} as const;
