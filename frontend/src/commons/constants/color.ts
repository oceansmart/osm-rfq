/**
 * Color Token System - Single Source of Truth
 *
 * 이 파일은 TypeScript 상수와 CSS Variables를 모두 제공합니다.
 * - Primitive Colors: 39개 팔레트 × 11 shades (25-950)
 * - Semantic Colors: Light/Dark mode 지원
 * - CSS Variables: 자동 생성 함수 제공
 *
 * @usage
 * TypeScript: import { brand } from '@/commons/constants/color'
 * CSS: 자동 생성된 theme.css 사용 또는 generateCSSVariables() 호출
 *
 * @version 2.0.0
 */

// ============================================================================
// 1. PRIMITIVE COLORS
// ============================================================================

/**
 * Base Colors
 */
export const base = {
  white: '#ffffff',
  black: '#000000',
  transparent: '#ffffff00',
} as const;

/**
 * Gray (Light Mode)
 */
export const grayLight = {
  25: '#fdfdfd',
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d6d6d6',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#424242',
  800: '#292929',
  900: '#141414',
  950: '#0f0f0f',
} as const;

/**
 * Gray (Dark Mode)
 */
export const grayDark = {
  25: '#fafafa',
  50: '#f5f5f5',
  100: '#f0f0f0',
  200: '#e5e5e5',
  300: '#d5d5d5',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0f0f0f',
} as const;

/**
 * Brand Colors
 */
export const brand = {
  25: '#f9f5ff',
  50: '#f4ebff',
  100: '#e9d7fe',
  200: '#d6bbfb',
  300: '#b692f6',
  400: '#9e77ed',
  500: '#7f56d9',
  600: '#6941c6',
  700: '#53389e',
  800: '#42307d',
  900: '#2c1c5f',
  950: '#1f1348',
} as const;

/**
 * Error Colors
 */
export const error = {
  25: '#fffbfa',
  50: '#fef3f2',
  100: '#fee4e2',
  200: '#fecdca',
  300: '#fda29b',
  400: '#f97066',
  500: '#f04438',
  600: '#d92d20',
  700: '#b42318',
  800: '#912018',
  900: '#7a271a',
  950: '#55160c',
} as const;

/**
 * Warning Colors
 */
export const warning = {
  25: '#fffcf5',
  50: '#fffaeb',
  100: '#fef0c7',
  200: '#fedf89',
  300: '#fec84b',
  400: '#fdb022',
  500: '#f79009',
  600: '#dc6803',
  700: '#b54708',
  800: '#93370d',
  900: '#7a2e0e',
  950: '#4e1d09',
} as const;

/**
 * Success Colors
 */
export const success = {
  25: '#f6fef9',
  50: '#ecfdf3',
  100: '#dcfae6',
  200: '#abefc6',
  300: '#75e0a7',
  400: '#47cd89',
  500: '#17b26a',
  600: '#079455',
  700: '#067647',
  800: '#085d3a',
  900: '#074d31',
  950: '#053321',
} as const;

/**
 * Green Colors (Extended Palette)
 */
export const green = {
  25: '#f6fef9',
  50: '#edfcf2',
  100: '#d3f8df',
  200: '#aaf0c4',
  300: '#73e2a3',
  400: '#3ccb7f',
  500: '#16b364',
  600: '#099250',
  700: '#087443',
  800: '#095c37',
  900: '#084c2e',
  950: '#052e1c',
} as const;

/**
 * Moss Colors
 */
export const moss = {
  25: '#fafdf7',
  50: '#f5fbee',
  100: '#e6f4d7',
  200: '#ceeab0',
  300: '#acdc79',
  400: '#86cb3c',
  500: '#669f2a',
  600: '#4f7a21',
  700: '#3f621a',
  800: '#335015',
  900: '#2b4212',
  950: '#1a280b',
} as const;

/**
 * Teal Colors
 */
export const teal = {
  25: '#f6fefc',
  50: '#f0fdf9',
  100: '#ccfbef',
  200: '#99f6e0',
  300: '#5fe9d0',
  400: '#2ed3b7',
  500: '#15b79e',
  600: '#0e9384',
  700: '#107569',
  800: '#125d56',
  900: '#134e48',
  950: '#0a2926',
} as const;

/**
 * Cyan Colors
 */
export const cyan = {
  25: '#f5feff',
  50: '#ecfdff',
  100: '#cff9fe',
  200: '#a5f0fc',
  300: '#67e3f9',
  400: '#22ccee',
  500: '#06aed4',
  600: '#088ab2',
  700: '#0e7090',
  800: '#155b75',
  900: '#164c63',
  950: '#0d2d3a',
} as const;

/**
 * Blue Light Colors
 */
export const blueLight = {
  25: '#f5fbff',
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#b9e6fe',
  300: '#7cd4fd',
  400: '#36bffa',
  500: '#0ba5ec',
  600: '#0086c9',
  700: '#026aa2',
  800: '#065986',
  900: '#0b4a6f',
  950: '#062c41',
} as const;

/**
 * Blue Colors
 */
export const blue = {
  25: '#f5faff',
  50: '#eff8ff',
  100: '#d1e9ff',
  200: '#b2ddff',
  300: '#84caff',
  400: '#53b1fd',
  500: '#2e90fa',
  600: '#1570ef',
  700: '#175cd3',
  800: '#1849a9',
  900: '#194185',
  950: '#102a56',
} as const;

/**
 * Blue Dark Colors
 */
export const blueDark = {
  25: '#f5f8ff',
  50: '#eff4ff',
  100: '#d1e0ff',
  200: '#b2ccff',
  300: '#84adff',
  400: '#528bff',
  500: '#2970ff',
  600: '#155eef',
  700: '#004eeb',
  800: '#0040c1',
  900: '#00359e',
  950: '#002266',
} as const;

/**
 * Indigo Colors
 */
export const indigo = {
  25: '#f5f8ff',
  50: '#eef4ff',
  100: '#e0eaff',
  200: '#c7d7fe',
  300: '#a4bcfd',
  400: '#8098f9',
  500: '#6172f3',
  600: '#444ce7',
  700: '#3538cd',
  800: '#2d31a6',
  900: '#2d3282',
  950: '#1f235b',
} as const;

/**
 * Violet Colors
 */
export const violet = {
  25: '#fbfaff',
  50: '#f5f3ff',
  100: '#ece9fe',
  200: '#ddd6fe',
  300: '#c3b5fd',
  400: '#a48afb',
  500: '#875bf7',
  600: '#7839ee',
  700: '#6927da',
  800: '#5720b7',
  900: '#491c96',
  950: '#2e125e',
} as const;

/**
 * Purple Colors
 */
export const purple = {
  25: '#fafaff',
  50: '#f4f3ff',
  100: '#ebe9fe',
  200: '#d9d6fe',
  300: '#bdb4fe',
  400: '#9b8afb',
  500: '#7a5af8',
  600: '#6938ef',
  700: '#5925dc',
  800: '#4a1fb8',
  900: '#3e1c96',
  950: '#27115f',
} as const;

/**
 * Fuchsia Colors
 */
export const fuchsia = {
  25: '#fefaff',
  50: '#fdf4ff',
  100: '#fbe8ff',
  200: '#f6d0fe',
  300: '#eeaafd',
  400: '#e478fa',
  500: '#d444f1',
  600: '#ba24d5',
  700: '#9f1ab1',
  800: '#821890',
  900: '#6f1877',
  950: '#47104c',
} as const;

/**
 * Pink Colors
 */
export const pink = {
  25: '#fef6fb',
  50: '#fdf2fa',
  100: '#fce7f6',
  200: '#fcceee',
  300: '#faa7e0',
  400: '#f670c7',
  500: '#ee46bc',
  600: '#dd2590',
  700: '#c11574',
  800: '#9e165f',
  900: '#851651',
  950: '#4e0d30',
} as const;

/**
 * Rosé Colors
 */
export const rose = {
  25: '#fff5f6',
  50: '#fff1f3',
  100: '#ffe4e8',
  200: '#fecdd6',
  300: '#fea3b4',
  400: '#fd6f8e',
  500: '#f63d68',
  600: '#e31b54',
  700: '#c01048',
  800: '#a11043',
  900: '#89123e',
  950: '#510b24',
} as const;

/**
 * Orange Dark Colors
 */
export const orangeDark = {
  25: '#fff9f5',
  50: '#fff4ed',
  100: '#ffe6d5',
  200: '#ffd6ae',
  300: '#ff9c66',
  400: '#ff692e',
  500: '#ff4405',
  600: '#e62e05',
  700: '#bc1b06',
  800: '#97180c',
  900: '#771a0d',
  950: '#57130a',
} as const;

/**
 * Orange Colors
 */
export const orange = {
  25: '#fefaf5',
  50: '#fef6ee',
  100: '#fdead7',
  200: '#f9dbaf',
  300: '#f7b27a',
  400: '#f38744',
  500: '#ef6820',
  600: '#e04f16',
  700: '#b93815',
  800: '#932f19',
  900: '#772917',
  950: '#511c10',
} as const;

/**
 * Yellow Colors
 */
export const yellow = {
  25: '#fefdf0',
  50: '#fefbe8',
  100: '#fef7c3',
  200: '#feee95',
  300: '#fde272',
  400: '#fac515',
  500: '#eaaa08',
  600: '#ca8504',
  700: '#a15c07',
  800: '#854a0e',
  900: '#713b12',
  950: '#542c0d',
} as const;

/**
 * Gray Blue Colors
 */
export const grayBlue = {
  25: '#fcfcfd',
  50: '#f8f9fc',
  100: '#eaecf5',
  200: '#d5d9eb',
  300: '#b3b8db',
  400: '#717bbc',
  500: '#4e5ba6',
  600: '#3e4784',
  700: '#363f72',
  800: '#293056',
  900: '#101323',
  950: '#0d0f1c',
} as const;

/**
 * Gray Cool Colors
 */
export const grayCool = {
  25: '#fcfcfd',
  50: '#f9f9fb',
  100: '#eff1f5',
  200: '#dcdfea',
  300: '#b9c0d4',
  400: '#7d89b0',
  500: '#5d6b98',
  600: '#4a5578',
  700: '#404968',
  800: '#30374f',
  900: '#111322',
  950: '#0e101b',
} as const;

/**
 * Gray Modern Colors
 */
export const grayModern = {
  25: '#fcfcfd',
  50: '#f8fafc',
  100: '#eef2f6',
  200: '#e3e8ef',
  300: '#cdd5df',
  400: '#9aa4b2',
  500: '#697586',
  600: '#4b5565',
  700: '#364152',
  800: '#202939',
  900: '#121926',
  950: '#0d121c',
} as const;

/**
 * Gray Neutral Colors
 */
export const grayNeutral = {
  25: '#fcfcfd',
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d2d6db',
  400: '#9da4ae',
  500: '#6c737f',
  600: '#4d5761',
  700: '#384250',
  800: '#1f2a37',
  900: '#111927',
  950: '#0d121f',
} as const;

/**
 * Gray Iron Colors
 */
export const grayIron = {
  25: '#fcfcfc',
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d1d1d6',
  400: '#a0a0ab',
  500: '#70707b',
  600: '#51525c',
  700: '#3f3f46',
  800: '#26272b',
  900: '#1a1a1e',
  950: '#131316',
} as const;

/**
 * Gray True Colors
 */
export const grayTrue = {
  25: '#fcfcfc',
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d6d6d6',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#424242',
  800: '#292929',
  900: '#141414',
  950: '#0a0a0a',
} as const;

/**
 * Gray Warm Colors
 */
export const grayWarm = {
  25: '#fdfdfc',
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d7d3d0',
  400: '#a9a29d',
  500: '#79716b',
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#171412',
} as const;

/**
 * Gray Dark Mode Alpha Colors
 */
export const grayDarkAlpha = {
  25: '#00000005',
  50: '#0000000a',
  100: '#0000000f',
  200: '#0000001a',
  300: '#0000002e',
  400: '#0000005c',
  500: '#0000008c',
  600: '#000000ad',
  700: '#000000bf',
  800: '#000000d9',
  900: '#000000e8',
  950: '#000000f0',
} as const;

/**
 * RFQ (Request for Quotation) UI-Specific Colors
 * Figma 디자인에서 추출한 RFQ List 컴포넌트 전용 색상
 * Source: Figma Node 227:60760, Channel 6kxxigzx
 */
export const rfqUi = {
  // Text Colors (from Figma extraction)
  textMain: '#181d27',           // rgb(24 29 39) - Main text
  textSupporting: '#535862',     // rgb(83 88 98) - Supporting text
  textTertiary: '#717680',       // rgb(113 118 128) - Tertiary text / placeholders
  textLabel: '#414651',          // rgb(65 70 81) - Labels
  textTabActive: '#303657',      // rgb(48 54 87) - Active tab text
  textAsterisk: '#474d69',       // rgb(71 77 105) - Asterisk / required indicators

  // Border Colors
  borderPrimary: '#d5d7da',      // rgb(213 215 218) - Primary borders
  borderSecondary: '#e9eaeb',    // rgb(233 234 235) - Secondary borders / dividers
  borderHover: '#b5b7bb',        // rgb(181 183 187) - Hover state borders

  // Background Colors
  bgWhite: '#ffffff',            // rgb(255 255 255) - Base white
  bgGray50: '#fafafa',           // rgb(250 250 250) - Table header background
  bgGray100: '#f9fafb',          // rgb(249 250 251) - Hover backgrounds
  bgGray200: '#f5f5f5',          // rgb(245 245 245) - Disabled backgrounds
  bgFilterSection: '#fefaf5',    // rgb(254 250 245) - Filter section background (orange.25)

  // Button Colors
  buttonPrimary: '#192044',      // rgb(25 32 68) - Primary button background
  buttonPrimaryHover: '#141a36', // rgb(20 26 54) - Primary button hover

  // Badge Colors - NEW Status
  badgeNewBg: '#ceeff1',         // rgb(206 239 241) - NEW badge background
  badgeNewBgHover: '#c4e5e7',    // rgb(196 229 231) - NEW badge hover
  badgeNewBorder: '#abefc6',     // rgb(171 239 198) - NEW badge border (success.200)
  badgeNewText: '#067647',       // rgb(6 118 71) - NEW badge text (success.700)

  // Badge Colors - IN_PROGRESS Status
  badgeInProgressBg: '#eff6ff',  // rgb(239 246 255) - IN_PROGRESS background
  badgeInProgressBorder: '#c2dafe', // rgb(194 218 254) - IN_PROGRESS border
  badgeInProgressText: '#1570ef',   // rgb(21 112 239) - IN_PROGRESS text

  // Badge Colors - PENDING Status
  badgePendingBg: '#fffaeb',     // rgb(255 250 235) - PENDING background
  badgePendingBorder: '#fedf89', // rgb(254 223 137) - PENDING border (warning.200)
  badgePendingText: '#dc6803',   // rgb(220 104 3) - PENDING text (warning.600)

  // Badge Colors - COMPLETED Status
  badgeCompletedBg: '#ecfdf3',   // rgb(236 253 243) - COMPLETED background (success.50)
  badgeCompletedBorder: '#abefc6', // rgb(171 239 198) - COMPLETED border (success.200)
  badgeCompletedText: '#079455',   // rgb(7 148 85) - COMPLETED text (success.600)

  // Badge Colors - Container 4 Info Badges
  badgeInfoCyanBg: '#ceeff1',    // rgb(206 239 241) - Cyan info badge background
  badgeInfoCyanBorder: '#ceeff1', // rgb(206 239 241) - Cyan info badge border
  badgeInfoOrangeBg: '#ffe6d5',  // rgb(255 230 213) - Orange info badge background
  badgeInfoOrangeBorder: '#fdead7', // rgb(253 234 215) - Orange info badge border

  // Avatar & User Elements
  avatarPlaceholderBg: '#f5f5f5', // rgb(245 245 245) - Avatar placeholder background
  avatarPlaceholderBorder: '#e9eaeb', // rgb(233 234 235) - Avatar placeholder border
  avatarImagePlaceholder: '#cfcbdc',  // rgb(207 203 220) - Avatar image placeholder
  userIconColor: '#717680',       // rgb(113 118 128) - User icon color
} as const;

// ============================================================================
// 2. SEMANTIC COLORS - LIGHT MODE
// ============================================================================

export const lightMode = {
  // Text Colors
  text: {
    primary: grayLight[900],
    secondary: grayLight[700],
    tertiary: grayLight[600],
    quaternary: grayLight[500],
    white: base.white,
    disabled: grayLight[500],
    placeholder: grayLight[500],
    placeholderSubtle: grayLight[300],

    // Brand
    brandPrimary: grayLight[900],
    brandSecondary: grayLight[700],
    brandTertiary: grayLight[600],
    brandTertiaryAlt: brand[600],

    // Status
    errorPrimary: error[600],
    warningPrimary: warning[600],
    successPrimary: success[600],

    // On Brand
    primaryOnBrand: base.white,
    secondaryOnBrand: brand[200],
    tertiaryOnBrand: brand[300],
    quaternaryOnBrand: brand[400],

    // Hover States
    secondaryHover: grayLight[800],
    tertiaryHover: grayLight[700],
    brandSecondaryHover: grayLight[800],
    errorPrimaryHover: error[700],
  },

  // Border Colors
  border: {
    primary: grayLight[300],
    secondary: grayLight[200],
    tertiary: grayLight[200],
    disabled: grayLight[300],
    disabledSubtle: grayLight[200],
    brand: brand[300],
    brandAlt: brand[400],
    error: error[300],
    errorSubtle: error[200],
    secondaryAlt: grayLight[200],
  },

  // Background Colors
  background: {
    primary: base.white,
    primaryAlt: base.white,
    secondary: grayLight[50],
    secondaryAlt: grayLight[100],
    secondarySubtle: grayLight[50],
    tertiary: grayLight[100],
    quaternary: grayLight[200],

    // Brand
    brandPrimary: brand[50],
    brandSecondary: brand[600],
    brandSolid: brand[600],
    brandSolidHover: brand[700],
    brandSection: brand[800],
    brandSectionSubtle: grayLight[700],

    // Status
    errorPrimary: error[50],
    errorSecondary: error[600],
    errorSolid: error[600],
    errorSolidHover: error[700],
    warningPrimary: warning[50],
    warningSecondary: warning[600],
    warningSolid: warning[600],
    successPrimary: success[50],
    successSecondary: success[600],
    successSolid: success[600],

    // Other
    overlay: grayLight[950],
    disabled: grayLight[100],
    disabledSubtle: grayLight[50],
    active: grayLight[50],

    // Hover States
    primaryHover: grayLight[50],
    secondaryHover: grayLight[100],

    // Solid Variants
    primarySolid: grayLight[950],
    secondarySolid: grayLight[600],
  },

  // Foreground Colors
  foreground: {
    primary: grayLight[900],
    secondary: grayLight[700],
    tertiary: grayLight[600],
    quaternary: grayLight[400],
    white: base.white,
    disabled: grayLight[400],
    disabledSubtle: grayLight[300],

    // Brand
    brandPrimary: brand[600],
    brandSecondary: brand[500],
    brandPrimaryAlt: brand[600],
    brandSecondaryAlt: brand[500],

    // Status
    errorPrimary: error[600],
    errorSecondary: error[500],
    warningPrimary: warning[600],
    warningSecondary: warning[500],
    successPrimary: success[600],
    successSecondary: success[500],

    // Hover States
    secondaryHover: grayLight[800],
    tertiaryHover: grayLight[700],
    quaternaryHover: grayLight[500],
    brandSecondaryHover: brand[600],
  },
} as const;

// ============================================================================
// 3. SEMANTIC COLORS - DARK MODE
// ============================================================================

export const darkMode = {
  // Text Colors
  text: {
    primary: grayDark[50],
    secondary: grayDark[300],
    tertiary: grayDark[400],
    quaternary: grayDark[400],
    white: base.white,
    disabled: grayDark[500],
    placeholder: grayDark[500],
    placeholderSubtle: grayDark[700],

    // Brand
    brandPrimary: grayDark[50],
    brandSecondary: grayDark[300],
    brandTertiary: grayDark[400],
    brandTertiaryAlt: grayDark[50],

    // Status
    errorPrimary: error[400],
    warningPrimary: warning[400],
    successPrimary: success[400],

    // On Brand
    primaryOnBrand: grayDark[50],
    secondaryOnBrand: grayDark[300],
    tertiaryOnBrand: grayDark[400],
    quaternaryOnBrand: grayDark[400],

    // Hover States
    secondaryHover: grayDark[200],
    tertiaryHover: grayDark[300],
    brandSecondaryHover: grayDark[200],
    errorPrimaryHover: error[300],
  },

  // Border Colors
  border: {
    primary: grayDark[700],
    secondary: grayDark[800],
    tertiary: grayDark[800],
    disabled: grayDark[700],
    disabledSubtle: grayDark[800],
    brand: brand[400],
    brandAlt: grayDark[700],
    error: error[400],
    errorSubtle: error[500],
    secondaryAlt: grayDark[800],
  },

  // Background Colors
  background: {
    primary: grayDark[950],
    primaryAlt: grayDark[900],
    secondary: grayDark[900],
    secondaryAlt: grayDark[950],
    secondarySubtle: grayDark[900],
    tertiary: grayDark[800],
    quaternary: grayDark[700],

    // Brand
    brandPrimary: brand[500],
    brandSecondary: brand[600],
    brandSolid: brand[600],
    brandSolidHover: brand[500],
    brandSection: grayDark[900],
    brandSectionSubtle: grayDark[950],

    // Status
    errorPrimary: error[950],
    errorSecondary: error[600],
    errorSolid: error[600],
    errorSolidHover: error[500],
    warningPrimary: warning[950],
    warningSecondary: warning[600],
    warningSolid: warning[600],
    successPrimary: success[950],
    successSecondary: success[600],
    successSolid: success[600],

    // Other
    overlay: grayDark[800],
    disabled: grayDark[800],
    disabledSubtle: grayDark[900],
    active: grayDark[800],

    // Hover States
    primaryHover: grayDark[800],
    secondaryHover: grayDark[800],

    // Solid Variants
    primarySolid: grayDark[900],
    secondarySolid: grayDark[600],
  },

  // Foreground Colors
  foreground: {
    primary: base.white,
    secondary: grayDark[300],
    tertiary: grayDark[400],
    quaternary: grayDark[600],
    white: base.white,
    disabled: grayDark[500],
    disabledSubtle: grayDark[600],

    // Brand
    brandPrimary: brand[500],
    brandSecondary: brand[500],
    brandPrimaryAlt: grayDark[300],
    brandSecondaryAlt: grayDark[600],

    // Status
    errorPrimary: error[500],
    errorSecondary: error[400],
    warningPrimary: warning[500],
    warningSecondary: warning[400],
    successPrimary: success[500],
    successSecondary: success[400],

    // Hover States
    secondaryHover: grayDark[200],
    tertiaryHover: grayDark[300],
    quaternaryHover: grayDark[500],
    brandSecondaryHover: grayDark[500],
  },
} as const;

// ============================================================================
// 4. TYPESCRIPT TYPES
// ============================================================================

export type ColorShade = 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type PrimitiveColorPalette = typeof brand;

export type SemanticTextColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  white: string;
  disabled: string;
  placeholder: string;
  placeholderSubtle: string;
  brandPrimary: string;
  brandSecondary: string;
  brandTertiary: string;
  brandTertiaryAlt: string;
  errorPrimary: string;
  warningPrimary: string;
  successPrimary: string;
  primaryOnBrand: string;
  secondaryOnBrand: string;
  tertiaryOnBrand: string;
  quaternaryOnBrand: string;
  secondaryHover: string;
  tertiaryHover: string;
  brandSecondaryHover: string;
  errorPrimaryHover: string;
};

export type SemanticBorderColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  disabledSubtle: string;
  brand: string;
  brandAlt: string;
  error: string;
  errorSubtle: string;
  secondaryAlt: string;
};

export type SemanticBackgroundColors = {
  primary: string;
  primaryAlt: string;
  secondary: string;
  secondaryAlt: string;
  secondarySubtle: string;
  tertiary: string;
  quaternary: string;
  brandPrimary: string;
  brandSecondary: string;
  brandSolid: string;
  brandSolidHover: string;
  brandSection: string;
  brandSectionSubtle: string;
  errorPrimary: string;
  errorSecondary: string;
  errorSolid: string;
  errorSolidHover: string;
  warningPrimary: string;
  warningSecondary: string;
  warningSolid: string;
  successPrimary: string;
  successSecondary: string;
  successSolid: string;
  overlay: string;
  disabled: string;
  disabledSubtle: string;
  active: string;
  primaryHover: string;
  secondaryHover: string;
  primarySolid: string;
  secondarySolid: string;
};

export type SemanticForegroundColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  white: string;
  disabled: string;
  disabledSubtle: string;
  brandPrimary: string;
  brandSecondary: string;
  brandPrimaryAlt: string;
  brandSecondaryAlt: string;
  errorPrimary: string;
  errorSecondary: string;
  warningPrimary: string;
  warningSecondary: string;
  successPrimary: string;
  successSecondary: string;
  secondaryHover: string;
  tertiaryHover: string;
  quaternaryHover: string;
  brandSecondaryHover: string;
};

export type SemanticColorMode = {
  text: SemanticTextColors;
  border: SemanticBorderColors;
  background: SemanticBackgroundColors;
  foreground: SemanticForegroundColors;
};

export type ColorToken = keyof SemanticTextColors |
  keyof SemanticBorderColors |
  keyof SemanticBackgroundColors |
  keyof SemanticForegroundColors;

// ============================================================================
// 5. HELPER FUNCTIONS
// ============================================================================

/**
 * 현재 테마 모드에 따른 Semantic Colors를 반환합니다.
 * @param isDarkMode - 다크모드 여부
 * @returns Semantic colors object
 */
export function getSemanticColors(isDarkMode: boolean): SemanticColorMode {
  return isDarkMode ? darkMode : lightMode;
}

/**
 * Primitive color palette에서 특정 shade를 가져옵니다.
 * @param palette - 색상 팔레트
 * @param shade - 색상 농도 (25-950)
 * @returns Hex color code
 */
export function getPrimitiveColor(
  palette: PrimitiveColorPalette,
  shade: ColorShade
): string {
  return palette[shade];
}

/**
 * 모든 Primitive Colors를 객체로 반환합니다.
 */
export const primitiveColors = {
  base,
  grayLight,
  grayDark,
  brand,
  error,
  warning,
  success,
  green,
  moss,
  teal,
  cyan,
  blueLight,
  blue,
  blueDark,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  orangeDark,
  orange,
  yellow,
  grayBlue,
  grayCool,
  grayModern,
  grayNeutral,
  grayIron,
  grayTrue,
  grayWarm,
  grayDarkAlpha,
  rfqUi,
} as const;

/**
 * 모든 Semantic Colors를 객체로 반환합니다.
 */
export const semanticColors = {
  light: lightMode,
  dark: darkMode,
} as const;

// ============================================================================
// 6. CSS VARIABLES 생성 유틸리티
// ============================================================================

/**
 * Hex 색상을 RGB 형식으로 변환합니다.
 * @param hex - Hex 색상 코드 (예: '#6941c6')
 * @returns RGB 문자열 (예: '105 65 198')
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

/**
 * camelCase를 kebab-case로 변환합니다.
 * @param str - camelCase 문자열 (예: 'grayBlue')
 * @returns kebab-case 문자열 (예: 'gray-blue')
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Primitive Colors를 CSS Variables로 변환합니다.
 * @returns CSS Variables 객체
 */
export function generateCSSVariables(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Base colors
  cssVars['--color-white'] = `rgb(${hexToRgb(base.white)})`;
  cssVars['--color-black'] = `rgb(${hexToRgb(base.black)})`;
  cssVars['--color-transparent'] = 'rgb(0 0 0 / 0)';

  // Primitive color palettes
  Object.entries(primitiveColors).forEach(([paletteName, palette]) => {
    if (paletteName === 'base' || paletteName === 'grayDarkAlpha') return;

    const cssName = kebabCase(paletteName);
    Object.entries(palette).forEach(([shade, color]) => {
      cssVars[`--color-${cssName}-${shade}`] = `rgb(${hexToRgb(color)})`;
    });
  });

  return cssVars;
}

/**
 * CSS Variables를 CSS 문자열로 변환합니다.
 * @returns @theme 블록 내부에 들어갈 CSS 문자열
 */
export function generateCSSString(): string {
  const vars = generateCSSVariables();
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/**
 * Semantic Colors를 CSS Variables로 변환합니다.
 * @param mode - 'light' 또는 'dark'
 * @returns CSS Variables 객체
 */
export function generateSemanticCSSVariables(mode: 'light' | 'dark' = 'light'): Record<string, string> {
  const semanticMode = mode === 'dark' ? darkMode : lightMode;
  const cssVars: Record<string, string> = {};

  // Text colors
  Object.entries(semanticMode.text).forEach(([key, value]) => {
    const cssKey = kebabCase(key);
    cssVars[`--color-text-${cssKey}`] = `var(--color-${getColorVariable(value)})`;
  });

  // Border colors
  Object.entries(semanticMode.border).forEach(([key, value]) => {
    const cssKey = kebabCase(key);
    cssVars[`--color-border-${cssKey}`] = `var(--color-${getColorVariable(value)})`;
  });

  // Background colors
  Object.entries(semanticMode.background).forEach(([key, value]) => {
    const cssKey = kebabCase(key);
    cssVars[`--color-bg-${cssKey}`] = `var(--color-${getColorVariable(value)})`;
  });

  // Foreground colors
  Object.entries(semanticMode.foreground).forEach(([key, value]) => {
    const cssKey = kebabCase(key);
    cssVars[`--color-fg-${cssKey}`] = `var(--color-${getColorVariable(value)})`;
  });

  return cssVars;
}

/**
 * 색상 값을 CSS Variable 이름으로 변환합니다.
 * @param color - Hex 색상 코드
 * @returns CSS Variable 이름 (예: 'gray-900')
 */
function getColorVariable(color: string): string {
  // 1. Base colors 먼저 확인 (white, black, transparent)
  if (color === base.white) return 'white';
  if (color === base.black) return 'black';
  if (color === base.transparent) return 'transparent';

  // 2. primitiveColors에서 해당 색상을 찾습니다
  for (const [paletteName, palette] of Object.entries(primitiveColors)) {
    if (paletteName === 'base') continue; // base는 위에서 이미 처리
    for (const [shade, value] of Object.entries(palette)) {
      if (value === color) {
        return `${kebabCase(paletteName)}-${shade}`;
      }
    }
  }
  return 'gray-900'; // fallback
}

// Default export
export default {
  primitive: primitiveColors,
  semantic: semanticColors,
  getSemanticColors,
  getPrimitiveColor,
  generateCSSVariables,
  generateCSSString,
  generateSemanticCSSVariables,
} as const;
