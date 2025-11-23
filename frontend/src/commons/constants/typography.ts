/**
 * Typography Token System
 *
 * Figma Tokens Studio에서 추출한 Typography Design Tokens
 * - Font Families: 2개 (Display, Body)
 * - Font Weights: 4개 (Regular, Medium, Semibold, Bold)
 * - Font Sizes: 11개 (text-xs ~ display-2xl)
 * - Line Heights: 11개 (text-xs ~ display-2xl)
 *
 * @generated from Figma Tokens Studio
 * @version 1.0.0
 */

// ============================================================================
// 1. FONT FAMILIES
// ============================================================================

/**
 * Font Families
 * - display: Headlines and display text (DM Sans)
 * - body: Body text and UI elements (Poppins)
 */
export const fontFamilies = {
  display: 'DM Sans',
  body: 'Poppins',
} as const;

/**
 * Font Families with Fallback
 * 프로덕션 환경을 위한 시스템 폰트 fallback 포함
 */
export const fontFamiliesWithFallback = {
  display: `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  body: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
} as const;

// ============================================================================
// 2. FONT WEIGHTS
// ============================================================================

/**
 * Font Weights
 * CSS 숫자값으로 매핑 (Figma의 문자열 → CSS weight)
 */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Font Weight Names (Figma 원본)
 * Italic variants는 CSS font-style: italic으로 별도 처리
 */
export const fontWeightNames = {
  regular: 'Regular',
  regularItalic: 'Regular italic',
  medium: 'Medium',
  mediumItalic: 'Medium italic',
  semibold: 'Semibold',
  semiboldItalic: 'Semibold italic',
  bold: 'Bold',
  boldItalic: 'Bold italic',
} as const;

// ============================================================================
// 3. FONT SIZES
// ============================================================================

/**
 * Font Sizes (px)
 * Text scale: xs ~ xl (12px ~ 20px)
 * Display scale: xs ~ 2xl (24px ~ 72px)
 */
export const fontSizes = {
  // Text Scale
  textXs: 12,
  textSm: 14,
  textMd: 16,
  textLg: 18,
  textXl: 20,

  // Display Scale
  displayXs: 24,
  displaySm: 30,
  displayMd: 36,
  displayLg: 48,
  displayXl: 60,
  display2xl: 72,
} as const;

/**
 * Font Sizes with Unit (px)
 * CSS에서 바로 사용 가능한 형태
 */
export const fontSizesWithUnit = {
  textXs: '12px',
  textSm: '14px',
  textMd: '16px',
  textLg: '18px',
  textXl: '20px',
  displayXs: '24px',
  displaySm: '30px',
  displayMd: '36px',
  displayLg: '48px',
  displayXl: '60px',
  display2xl: '72px',
} as const;

// ============================================================================
// 4. LINE HEIGHTS
// ============================================================================

/**
 * Line Heights (px)
 * Font size에 대응하는 line height 값
 */
export const lineHeights = {
  // Text Scale
  textXs: 18,
  textSm: 20,
  textMd: 24,
  textLg: 28,
  textXl: 30,

  // Display Scale
  displayXs: 32,
  displaySm: 38,
  displayMd: 44,
  displayLg: 60,
  displayXl: 72,
  display2xl: 90,
} as const;

/**
 * Line Heights with Unit (px)
 * CSS에서 바로 사용 가능한 형태
 */
export const lineHeightsWithUnit = {
  textXs: '18px',
  textSm: '20px',
  textMd: '24px',
  textLg: '28px',
  textXl: '30px',
  displayXs: '32px',
  displaySm: '38px',
  displayMd: '44px',
  displayLg: '60px',
  displayXl: '72px',
  display2xl: '90px',
} as const;

// ============================================================================
// 5. TYPESCRIPT TYPES
// ============================================================================

export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type FontSize = keyof typeof fontSizes;
export type LineHeight = keyof typeof lineHeights;

export type TypographyScale = FontSize;

/**
 * Typography Style Object
 * React inline style이나 CSS-in-JS에서 사용 가능한 타입
 */
export type TypographyStyle = {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number;
  lineHeight?: number | string;
  fontStyle?: 'normal' | 'italic';
};

/**
 * Typography Token Keys
 */
export type TypographyToken = FontFamily | FontWeight | FontSize | LineHeight;

// ============================================================================
// 6. TYPOGRAPHY COMBINATIONS (Preset Styles)
// ============================================================================

/**
 * Typography Presets
 * 자주 사용하는 typography 조합을 미리 정의
 */
export const typographyPresets = {
  // Display Styles
  displayLarge: {
    fontFamily: fontFamiliesWithFallback.display,
    fontSize: fontSizes.displayLg,
    lineHeight: lineHeights.displayLg,
    fontWeight: fontWeights.bold,
  },
  displayMedium: {
    fontFamily: fontFamiliesWithFallback.display,
    fontSize: fontSizes.displayMd,
    lineHeight: lineHeights.displayMd,
    fontWeight: fontWeights.semibold,
  },
  displaySmall: {
    fontFamily: fontFamiliesWithFallback.display,
    fontSize: fontSizes.displaySm,
    lineHeight: lineHeights.displaySm,
    fontWeight: fontWeights.semibold,
  },

  // Heading Styles
  headingLarge: {
    fontFamily: fontFamiliesWithFallback.display,
    fontSize: fontSizes.displayXs,
    lineHeight: lineHeights.displayXs,
    fontWeight: fontWeights.semibold,
  },
  headingMedium: {
    fontFamily: fontFamiliesWithFallback.display,
    fontSize: fontSizes.textXl,
    lineHeight: lineHeights.textXl,
    fontWeight: fontWeights.semibold,
  },
  headingSmall: {
    fontFamily: fontFamiliesWithFallback.display,
    fontSize: fontSizes.textLg,
    lineHeight: lineHeights.textLg,
    fontWeight: fontWeights.semibold,
  },

  // Body Styles
  bodyLarge: {
    fontFamily: fontFamiliesWithFallback.body,
    fontSize: fontSizes.textLg,
    lineHeight: lineHeights.textLg,
    fontWeight: fontWeights.regular,
  },
  bodyMedium: {
    fontFamily: fontFamiliesWithFallback.body,
    fontSize: fontSizes.textMd,
    lineHeight: lineHeights.textMd,
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontFamily: fontFamiliesWithFallback.body,
    fontSize: fontSizes.textSm,
    lineHeight: lineHeights.textSm,
    fontWeight: fontWeights.regular,
  },

  // Label/UI Styles
  labelLarge: {
    fontFamily: fontFamiliesWithFallback.body,
    fontSize: fontSizes.textMd,
    lineHeight: lineHeights.textMd,
    fontWeight: fontWeights.medium,
  },
  labelMedium: {
    fontFamily: fontFamiliesWithFallback.body,
    fontSize: fontSizes.textSm,
    lineHeight: lineHeights.textSm,
    fontWeight: fontWeights.medium,
  },
  labelSmall: {
    fontFamily: fontFamiliesWithFallback.body,
    fontSize: fontSizes.textXs,
    lineHeight: lineHeights.textXs,
    fontWeight: fontWeights.medium,
  },
} as const;

// ============================================================================
// 7. HELPER FUNCTIONS
// ============================================================================

/**
 * Typography 스타일 객체를 생성합니다.
 * @param size - Font size key
 * @param weight - Font weight key (optional, default: regular)
 * @param family - Font family key (optional, default: body)
 * @returns Typography style object
 */
export function createTypographyStyle(
  size: FontSize,
  weight: FontWeight = 'regular',
  family: FontFamily = 'body'
): TypographyStyle {
  return {
    fontFamily: fontFamiliesWithFallback[family],
    fontSize: fontSizes[size],
    fontWeight: fontWeights[weight],
    lineHeight: lineHeights[size],
  };
}

/**
 * Rem 단위로 변환합니다. (base: 16px)
 * @param px - Pixel value
 * @returns Rem value (string)
 */
export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * Font size를 rem 단위로 반환합니다.
 * @param size - Font size key
 * @returns Rem value (string)
 */
export function getFontSizeInRem(size: FontSize): string {
  return pxToRem(fontSizes[size]);
}

/**
 * Line height를 rem 단위로 반환합니다.
 * @param size - Line height key
 * @returns Rem value (string)
 */
export function getLineHeightInRem(size: LineHeight): string {
  return pxToRem(lineHeights[size]);
}

/**
 * 모든 Typography Tokens를 객체로 반환합니다.
 */
export const typographyTokens = {
  fontFamilies,
  fontFamiliesWithFallback,
  fontWeights,
  fontWeightNames,
  fontSizes,
  fontSizesWithUnit,
  lineHeights,
  lineHeightsWithUnit,
  presets: typographyPresets,
} as const;

// ============================================================================
// 8. LETTER SPACING (Display sizes only)
// ============================================================================

/**
 * Letter Spacing for Display Sizes (px)
 * Display sizes (md, lg, xl, 2xl)만 letter spacing 적용
 */
export const letterSpacing = {
  displayMd: -0.72,
  displayLg: -0.96,
  displayXl: -1.2,
  display2xl: -1.44,
} as const;

// ============================================================================
// 9. CSS VARIABLES GENERATION (Single Source of Truth)
// ============================================================================

/**
 * Font size 네이밍을 CSS Variables로 매핑
 * TypeScript: textXs, displayXs → CSS: --text-xs, --text-display-xs
 */
const fontSizeCSSNameMapping: Record<FontSize, string> = {
  textXs: 'xs',
  textSm: 'sm',
  textMd: 'md',
  textLg: 'lg',
  textXl: 'xl',
  displayXs: 'display-xs',
  displaySm: 'display-sm',
  displayMd: 'display-md',
  displayLg: 'display-lg',
  displayXl: 'display-xl',
  display2xl: 'display-2xl',
};

/**
 * Generate CSS Variables for typography tokens
 * Follows Untitled UI naming convention:
 * - Font families: --font-{family}
 * - Font sizes: --text-{size}
 * - Line heights: --text-{size}--line-height
 * - Letter spacing: --text-display-{size}--letter-spacing
 *
 * @returns Record of CSS variable names and values
 *
 * @example
 * ```typescript
 * const cssVars = generateTypographyCSS();
 * // {
 * //   '--font-body': "'Poppins', ...",
 * //   '--font-display': "'DM Sans', ...",
 * //   '--text-xs': '12px',
 * //   '--text-xs--line-height': '18px',
 * //   '--text-display-md--letter-spacing': '-0.72px',
 * //   ...
 * // }
 * ```
 */
export function generateTypographyCSS(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Font families
  Object.entries(fontFamiliesWithFallback).forEach(([key, value]) => {
    cssVars[`--font-${key}`] = value;
  });

  // Font sizes and line heights
  Object.entries(fontSizes).forEach(([key, value]) => {
    const cssName = fontSizeCSSNameMapping[key as FontSize];
    cssVars[`--text-${cssName}`] = `${value}px`;

    // Line height (동일한 키로 접근)
    const lineHeight = lineHeights[key as FontSize];
    cssVars[`--text-${cssName}--line-height`] = `${lineHeight}px`;
  });

  // Letter spacing (display sizes only)
  Object.entries(letterSpacing).forEach(([key, value]) => {
    const sizeKey = key
      .replace('display', 'display-')
      .toLowerCase() as 'display-md' | 'display-lg' | 'display-xl' | 'display-2xl';
    cssVars[`--text-${sizeKey}--letter-spacing`] = `${value}px`;
  });

  return cssVars;
}

/**
 * Generate CSS string for typography tokens
 * Can be used directly in CSS files or style tags
 *
 * @returns CSS string with all typography variables
 *
 * @example
 * ```typescript
 * const css = generateTypographyCSSString();
 * // '  --font-body: ...\n  --text-xs: 12px;\n  --text-xs--line-height: 18px;\n  ...'
 * ```
 */
export function generateTypographyCSSString(): string {
  const vars = generateTypographyCSS();
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

// Default export
export default {
  ...typographyTokens,
  createTypographyStyle,
  pxToRem,
  getFontSizeInRem,
  getLineHeightInRem,
  generateTypographyCSS,
  generateTypographyCSSString,
  letterSpacing,
} as const;
