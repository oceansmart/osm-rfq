/**
 * Spacing Token System
 *
 * Figma Tokens Studio에서 추출한 Spacing Design Tokens
 * - 17개 spacing 값 (none ~ 11xl)
 * - 0px ~ 160px
 * - Margin, Padding, Gap 등에 사용
 *
 * @generated from Figma Tokens Studio
 * @version 1.0.0
 */

// ============================================================================
// 1. SPACING VALUES
// ============================================================================

/**
 * Spacing Values (px)
 * none: 0px
 * xxs ~ 11xl: 2px ~ 160px
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xl2: 20,
  xl3: 24,
  xl4: 32,
  xl5: 40,
  xl6: 48,
  xl7: 64,
  xl8: 80,
  xl9: 96,
  xl10: 128,
  xl11: 160,
} as const;

/**
 * Spacing with Unit (px)
 * CSS에서 바로 사용 가능한 형태
 */
export const spacingWithUnit = {
  none: '0px',
  xxs: '2px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xl2: '20px',
  xl3: '24px',
  xl4: '32px',
  xl5: '40px',
  xl6: '48px',
  xl7: '64px',
  xl8: '80px',
  xl9: '96px',
  xl10: '128px',
  xl11: '160px',
} as const;

// ============================================================================
// 2. TYPESCRIPT TYPES
// ============================================================================

export type SpacingSize = keyof typeof spacing;

export type SpacingValue = typeof spacing[SpacingSize];

/**
 * Spacing Style Object
 * React inline style이나 CSS-in-JS에서 사용 가능한 타입
 */
export type SpacingStyle = {
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
};

// ============================================================================
// 3. SPACING PRESETS
// ============================================================================

/**
 * Spacing Presets
 * 자주 사용하는 spacing 조합을 미리 정의
 */
export const spacingPresets = {
  // Padding Presets
  paddingSmall: {
    padding: spacing.sm,
  },
  paddingMedium: {
    padding: spacing.md,
  },
  paddingLarge: {
    padding: spacing.lg,
  },
  paddingXLarge: {
    padding: spacing.xl,
  },

  // Margin Presets
  marginSmall: {
    margin: spacing.sm,
  },
  marginMedium: {
    margin: spacing.md,
  },
  marginLarge: {
    margin: spacing.lg,
  },

  // Gap Presets (Flexbox/Grid)
  gapSmall: {
    gap: spacing.sm,
  },
  gapMedium: {
    gap: spacing.md,
  },
  gapLarge: {
    gap: spacing.lg,
  },

  // Component Spacing
  cardPadding: {
    padding: spacing.xl,
  },
  sectionSpacing: {
    marginBottom: spacing.xl4,
  },
  inputPadding: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
} as const;

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================

/**
 * Spacing 값을 rem 단위로 변환합니다. (base: 16px)
 * @param size - Spacing size key
 * @returns Rem value (string)
 */
export function getSpacingInRem(size: SpacingSize): string {
  return `${spacing[size] / 16}rem`;
}

/**
 * Padding 스타일을 생성합니다.
 * @param size - Spacing size
 * @param sides - 적용할 면 [top, right, bottom, left]
 * @returns Padding style object
 */
export function createPadding(
  size: SpacingSize,
  sides: [boolean, boolean, boolean, boolean] = [true, true, true, true]
): SpacingStyle {
  const value = spacing[size];
  const [top, right, bottom, left] = sides;

  return {
    paddingTop: top ? value : undefined,
    paddingRight: right ? value : undefined,
    paddingBottom: bottom ? value : undefined,
    paddingLeft: left ? value : undefined,
  };
}

/**
 * Margin 스타일을 생성합니다.
 * @param size - Spacing size
 * @param sides - 적용할 면 [top, right, bottom, left]
 * @returns Margin style object
 */
export function createMargin(
  size: SpacingSize,
  sides: [boolean, boolean, boolean, boolean] = [true, true, true, true]
): SpacingStyle {
  const value = spacing[size];
  const [top, right, bottom, left] = sides;

  return {
    marginTop: top ? value : undefined,
    marginRight: right ? value : undefined,
    marginBottom: bottom ? value : undefined,
    marginLeft: left ? value : undefined,
  };
}

/**
 * 모든 Spacing Tokens를 객체로 반환합니다.
 */
export const spacingTokens = {
  spacing,
  spacingWithUnit,
  presets: spacingPresets,
} as const;

// ============================================================================
// 5. CSS VARIABLES GENERATION (Single Source of Truth)
// ============================================================================

/**
 * Figma tokens 네이밍을 CSS Variables로 매핑
 * TypeScript: xl2 → CSS: --spacing-2xl
 */
const spacingCSSNameMapping: Record<string, string> = {
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
  xl5: '5xl',
  xl6: '6xl',
  xl7: '7xl',
  xl8: '8xl',
  xl9: '9xl',
  xl10: '10xl',
  xl11: '11xl',
};

/**
 * Generate CSS Variables for spacing tokens
 * Follows Untitled UI naming convention: --spacing-{size}
 *
 * @returns Record of CSS variable names and values
 *
 * @example
 * ```typescript
 * const cssVars = generateSpacingCSS();
 * // {
 * //   '--spacing-none': '0px',
 * //   '--spacing-xl': '16px',
 * //   '--spacing-2xl': '20px',
 * //   ...
 * // }
 * ```
 */
export function generateSpacingCSS(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // spacing 객체를 순회하며 CSS Variables 생성
  Object.entries(spacing).forEach(([key, value]) => {
    const cssName = spacingCSSNameMapping[key as SpacingSize];
    cssVars[`--spacing-${cssName}`] = `${value}px`;
  });

  return cssVars;
}

/**
 * Generate CSS string for spacing tokens
 * Can be used directly in CSS files or style tags
 *
 * @returns CSS string with all spacing variables
 *
 * @example
 * ```typescript
 * const css = generateSpacingCSSString();
 * // '  --spacing-none: 0px;\n  --spacing-xxs: 2px;\n  --spacing-xl: 16px;\n  ...'
 * ```
 */
export function generateSpacingCSSString(): string {
  const vars = generateSpacingCSS();
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

// Default export
export default {
  ...spacingTokens,
  getSpacingInRem,
  createPadding,
  createMargin,
  generateSpacingCSS,
  generateSpacingCSSString,
} as const;
