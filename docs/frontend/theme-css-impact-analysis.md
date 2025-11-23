# theme.css Impact Analysis

**Date**: 2025-11-21
**Purpose**: 디자인 토큰 마이그레이션 전 theme.css 영향도 분석

---

## 📊 Executive Summary

### Current theme.css Structure

- **Total Lines**: 1,357
- **Auto-generated Section**: 없음 (수동 관리)
- **Design Token Categories**: 8개
  - Font Families (3)
  - Font Sizes (12)
  - Max Widths (1)
  - Breakpoints (2)
  - Radius (10)
  - Shadows (13)
  - Animations (2)
  - Colors (1,200+)

### Impact Assessment

| Token Type | Current Lines | Usage Count | Migration Risk |
|-----------|---------------|-------------|----------------|
| **Spacing** | 0 (calc based) | 50+ | ⚠️ Medium |
| **Radius** | 10 (54-63) | 2 direct | ✅ Low |
| **Typography** | 40 (2-43) | 30+ | ⚠️ Medium |
| **Widths** | 6 (45-51) | 0 | ✅ Low |
| **Colors** | 1,200+ | Extensive | ✅ Already migrated |

---

## 1. Spacing Tokens (calc-based)

### 현재 상태

**theme.css에 직접 정의 없음** - `calc(var(--spacing) * N)` 패턴 사용

```css
/* typography.css에서 사용 예시 */
margin-top: calc(var(--spacing) * 4);    /* 28회 */
margin-bottom: calc(var(--spacing) * 4); /* 27회 */
padding-inline-start: calc(var(--spacing) * 5.75); /* 2회 */
```

### 사용처 분석

**File**: [frontend/src/styles/typography.css](../../frontend/src/styles/typography.css)

| Pattern | Count | Lines |
|---------|-------|-------|
| `calc(var(--spacing) * 4)` | 10 | 28, 29, 43-44, etc. |
| `calc(var(--spacing) * 8)` | 8 | 71, 72, 118, etc. |
| `calc(var(--spacing) * 10)` | 4 | 83, 84, 181, etc. |
| `calc(var(--spacing) * 2)` | 6 | 55, 56, etc. |
| `calc(var(--spacing) * 0.5)` | 4 | 240, 241, 416, 417 |

**총 사용 횟수**: 50+

### Migration Impact

⚠️ **Medium Risk**

**문제점**:
1. `--spacing` base 변수가 정의되지 않음 (현재 `calc()` 패턴만 사용)
2. Figma tokens는 절대값 사용 (`--spacing-xl: 16px`)
3. 마이그레이션 시 `calc()` → 직접 변수 참조로 변경 필요

**해결 방안**:

```css
/* Before (현재) */
margin-top: calc(var(--spacing) * 4);

/* After (마이그레이션 후) */
margin-top: var(--spacing-xl); /* 16px = 4 * 4px */
```

**매핑 테이블**:

| Current Calc | New Variable | Value |
|--------------|--------------|-------|
| `calc(var(--spacing) * 0.5)` | `--spacing-xxs` | 2px |
| `calc(var(--spacing) * 1)` | `--spacing-xs` | 4px |
| `calc(var(--spacing) * 1.5)` | `--spacing-sm` | 6px |
| `calc(var(--spacing) * 2)` | `--spacing-md` | 8px |
| `calc(var(--spacing) * 3)` | `--spacing-lg` | 12px |
| `calc(var(--spacing) * 4)` | `--spacing-xl` | 16px |
| `calc(var(--spacing) * 5)` | `--spacing-2xl` | 20px |
| `calc(var(--spacing) * 6)` | `--spacing-3xl` | 24px |
| `calc(var(--spacing) * 8)` | `--spacing-4xl` | 32px |
| `calc(var(--spacing) * 10)` | `--spacing-5xl` | 40px |
| `calc(var(--spacing) * 12)` | `--spacing-6xl` | 48px |
| `calc(var(--spacing) * 16)` | `--spacing-7xl` | 64px |
| `calc(var(--spacing) * 20)` | `--spacing-8xl` | 80px |

---

## 2. Radius Tokens

### 현재 상태

**Lines 54-63** in [theme.css](../../frontend/src/styles/theme.css#L54-L63):

```css
/* RADIUS */
--radius-none: 0px;
--radius-xs: 0.125rem;      /* 2px */
--radius-sm: 0.25rem;       /* 4px */
--radius-DEFAULT: 0.25rem;  /* 4px */
--radius-md: 0.375rem;      /* 6px */
--radius-lg: 0.5rem;        /* 8px */
--radius-xl: 0.75rem;       /* 12px */
--radius-2xl: 1rem;         /* 16px */
--radius-3xl: 1.5rem;       /* 24px */
--radius-full: 9999px;
```

### 사용처 분석

**Direct Usage** (2회):
- `typography.css:169` - `border-radius: var(--radius-xl);`
- `typography.css:224` - `border-radius: var(--radius-sm);`

**Definition** (10회):
- `theme.css:54-63` - Variable definitions

### Migration Impact

✅ **Low Risk**

**이유**:
1. 사용처가 적음 (2회)
2. Figma tokens와 네이밍 일치 (`radius-xl`, `radius-sm`)
3. 직접 교체만 하면 됨 (값 변환 불필요)

**Mismatch 확인**:

| theme.css (Current) | Figma tokens | Match? |
|---------------------|--------------|--------|
| `--radius-xs: 2px` | `radius-xxs: 2px` | ❌ Name |
| `--radius-sm: 4px` | `radius-xs: 4px` | ❌ Name |
| `--radius-md: 6px` | `radius-sm: 6px` | ❌ Name |
| `--radius-lg: 8px` | `radius-md: 8px` | ❌ Name |
| `--radius-xl: 12px` | `radius-xl: 12px` | ✅ |
| `--radius-2xl: 16px` | `radius-2xl: 16px` | ✅ |
| `--radius-3xl: 24px` | `radius-3xl: 20px` | ❌ Value |

⚠️ **네이밍 불일치 발견**

**해결 방안**:
- Figma tokens 네이밍 준용
- 코드 검색 후 수동 교체

---

## 3. Typography Tokens

### 현재 상태

**Lines 2-43** in [theme.css](../../frontend/src/styles/theme.css#L2-L43):

#### Font Families (Lines 2-5)
```css
--font-body: var(--font-inter, "Inter"), ...;
--font-display: var(--font-inter, "Inter"), ...;
--font-mono: ui-monospace, "Roboto Mono", ...;
```

#### Font Sizes (Lines 7-43)
```css
/* Text sizes */
--text-xs: calc(var(--spacing) * 3);           /* 12px */
--text-xs--line-height: calc(var(--spacing) * 4.5); /* 18px */

--text-sm: calc(var(--spacing) * 3.5);         /* 14px */
--text-sm--line-height: calc(var(--spacing) * 5);   /* 20px */

--text-md: calc(var(--spacing) * 4);           /* 16px */
--text-md--line-height: calc(var(--spacing) * 6);   /* 24px */

--text-lg: calc(var(--spacing) * 4.5);         /* 18px */
--text-lg--line-height: calc(var(--spacing) * 7);   /* 28px */

--text-xl: calc(var(--spacing) * 5);           /* 20px */
--text-xl--line-height: calc(var(--spacing) * 7.5); /* 30px */

/* Display sizes */
--text-display-xs: calc(var(--spacing) * 6);         /* 24px */
--text-display-xs--line-height: calc(var(--spacing) * 8); /* 32px */

--text-display-sm: calc(var(--spacing) * 7.5);       /* 30px */
--text-display-sm--line-height: calc(var(--spacing) * 9.5); /* 38px */

--text-display-md: calc(var(--spacing) * 9);         /* 36px */
--text-display-md--line-height: calc(var(--spacing) * 11);  /* 44px */
--text-display-md--letter-spacing: -0.72px;

--text-display-lg: calc(var(--spacing) * 12);        /* 48px */
--text-display-lg--line-height: calc(var(--spacing) * 15);  /* 60px */
--text-display-lg--letter-spacing: -0.96px;

--text-display-xl: calc(var(--spacing) * 15);        /* 60px */
--text-display-xl--line-height: calc(var(--spacing) * 18);  /* 72px */
--text-display-xl--letter-spacing: -1.2px;

--text-display-2xl: calc(var(--spacing) * 18);       /* 72px */
--text-display-2xl--line-height: calc(var(--spacing) * 22.5); /* 90px */
--text-display-2xl--letter-spacing: -1.44px;
```

### 사용처 분석

**typography.css** (30+ 사용):

| Variable | Usage Count | Lines |
|----------|-------------|-------|
| `--text-md` | 4 | 21, 33, 390, 391 |
| `--text-md--line-height` | 4 | 22, 34, 391 |
| `--text-sm` | 1 | 208 |
| `--text-sm--line-height` | 1 | 209 |
| `--text-lg` | 2 | 133, 281 |
| `--text-lg--line-height` | 2 | 134, 282 |
| `--text-xl` | 4 | 91, 124, 295, 363 |
| `--text-xl--line-height` | 4 | 92, 125, 296, 364 |
| `--text-display-xs` | 3 | 115, 339, 357 |
| `--text-display-xs--line-height` | 3 | 116, 340, 358 |
| `--text-display-sm` | 2 | 106, 351 |
| `--text-display-sm--line-height` | 2 | 107, 352 |
| `--text-display-md` | 1 | 345 |
| `--text-display-md--line-height` | 1 | 346 |

**총 사용 횟수**: 30+

### Migration Impact

⚠️ **Medium Risk**

**문제점**:
1. Font sizes가 `calc()` 기반
2. Line heights가 `calc()` 기반
3. Letter spacing은 절대값 사용

**해결 방안**:

```typescript
// typography.ts에서 절대값 상수로 변경
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  displayXs: 24,
  displaySm: 30,
  displayMd: 36,
  displayLg: 48,
  displayXl: 60,
  display2xl: 72,
} as const;

export const lineHeights = {
  xs: 18,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 30,
  displayXs: 32,
  displaySm: 38,
  displayMd: 44,
  displayLg: 60,
  displayXl: 72,
  display2xl: 90,
} as const;

export const letterSpacing = {
  displayMd: -0.72,
  displayLg: -0.96,
  displayXl: -1.2,
  display2xl: -1.44,
} as const;
```

---

## 4. Widths & Breakpoints

### 현재 상태

**Lines 45-51** in [theme.css](../../frontend/src/styles/theme.css#L45-L51):

```css
/* MAX WIDTH */
--max-width-container: 1280px;

/* BREAKPOINTS */
--breakpoint-xxs: 320px;
/* This must match the breakpoint in Sonner: https://github.com/emilkowalski/sonner/blob/main/src/styles.css */
--breakpoint-xs: 600px;
```

### 사용처 분석

**Search Results**: 0회 (코드베이스 내 직접 사용 없음)

```bash
grep -r "--max-width-container" src/ --include="*.tsx" --include="*.ts" --include="*.css"
# No results

grep -r "--breakpoint-" src/ --include="*.tsx" --include="*.ts" --include="*.css"
# No results
```

### Migration Impact

✅ **Low Risk**

**이유**:
1. 현재 사용처 없음
2. 향후 확장성을 위해 생성
3. 값 변경 없이 그대로 유지

---

## 5. Colors (Already Migrated)

### 현재 상태

**Lines 114-1,333**: 이미 Single Source of Truth 패턴 적용됨

- ✅ Primitive colors
- ✅ Utility colors
- ✅ Text colors
- ✅ Border colors
- ✅ Background colors
- ✅ Component colors

### Migration Impact

✅ **No Impact** - 이미 완료

---

## 6. OSM Brand Overrides

### 현재 상태

**Lines 1,336-1,356** in [theme.css](../../frontend/src/styles/theme.css#L1336-L1356):

```css
/* ============================================================================
   OSM BRAND COLOR OVERRIDES
   ============================================================================
   These overrides ensure OSM's brand identity (#6941c6 purple) is preserved
   while using Untitled UI's component system.

   Mapping:
   - OSM brand.600 (#6941c6) → --color-brand-600 (Primary brand color)
   - OSM brand.700 (#53389e) → --color-brand-700 (Hover state)
   - DM Sans → --font-display (Display/Headline text)
   - Poppins → --font-body (Body text and UI elements)
   ============================================================================ */

@theme {
    /* OSM Primary Brand Colors */
    --color-brand-600: rgb(105 65 198);  /* OSM brand.600 = #6941c6 */
    --color-brand-700: rgb(83 56 158);   /* OSM brand.700 = #53389e */

    /* OSM Typography - Font Families */
    --font-display: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-body: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Migration Impact

⚠️ **CRITICAL - Must Preserve**

**주의사항**:
1. **절대 삭제 금지**
2. Auto-generated 섹션 **외부**에 위치해야 함
3. OSM 브랜드 정체성 유지 필수

**보존 전략**:
- Auto-generated 섹션은 Lines 1-1,333까지만
- OSM overrides는 Lines 1,336-1,356에 별도 유지
- 빌드 스크립트에서 이 섹션은 건드리지 않음

---

## 7. Shadows & Animations

### 현재 상태

**Lines 65-112** in theme.css:

```css
/* SHADOW */
--shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);
--shadow-sm: ...;
/* ... 총 13개 shadow 변수 */

/* ANIMATIONS */
--animate-marquee: marquee 60s linear infinite;
--animate-caret-blink: caret-blink 1s infinite;

@keyframes marquee { ... }
@keyframes caret-blink { ... }
```

### Migration Impact

✅ **No Impact** - 토큰 시스템 외부

**이유**:
1. Figma tokens에 없음
2. 현재 시스템 유지
3. 향후 필요 시 별도 마이그레이션

---

## 📋 Migration Checklist

### Phase 1: 삭제 가능한 섹션

- [ ] **Lines 2-5**: Font families → typography.ts로 이동 (OSM overrides 제외)
- [ ] **Lines 7-43**: Font sizes → typography.ts로 이동
- [ ] **Lines 45-51**: Widths & breakpoints → widths.ts로 이동
- [ ] **Lines 54-63**: Radius → radius.ts로 이동
- [ ] **Lines 114-1,333**: Colors → color.ts로 이동 (이미 완료)

### Phase 2: 보존해야 할 섹션

- [ ] **Lines 65-112**: Shadows & animations (유지)
- [ ] **Lines 1,336-1,356**: OSM brand overrides (**절대 삭제 금지**)

### Phase 3: typography.css 수정 필요

- [ ] `calc(var(--spacing) * N)` → `var(--spacing-{size})` 변경 (50+ 개소)
- [ ] Radius 네이밍 불일치 확인 및 수정 (2개소)

---

## 🔄 Recommended Migration Steps

### Step 1: Backup
```bash
cp src/styles/theme.css src/styles/theme.css.backup
cp src/styles/typography.css src/styles/typography.css.backup
```

### Step 2: 토큰 생성 함수 구현
- `spacing.ts` - generateSpacingCSS()
- `radius.ts` - generateRadiusCSS()
- `typography.ts` - generateTypographyCSS()
- `widths.ts` - generateWidthsCSS()

### Step 3: 통합 스크립트 작성
- `scripts/generate-design-tokens.ts`
- Auto-generated 섹션만 교체
- OSM overrides 보존

### Step 4: typography.css 수정
- Search & replace: `calc(var(--spacing) * 4)` → `var(--spacing-xl)`
- 모든 calc() 패턴 변경

### Step 5: 테스트
- `npm run generate:tokens`
- Storybook 확인
- 개발 서버 확인
- Visual regression 테스트

---

## 🎯 Expected Output (theme.css 구조)

```css
@theme {
    /* AUTO-GENERATED DESIGN TOKENS - START */

    /* Spacing */
    --spacing-none: 0px;
    --spacing-xxs: 2px;
    /* ... */

    /* Radius */
    --radius-none: 0px;
    --radius-xxs: 2px;
    /* ... */

    /* Typography */
    --font-body: ...;
    --font-display: ...;
    --text-xs: 12px;
    --text-xs--line-height: 18px;
    /* ... */

    /* Widths & Breakpoints */
    --max-width-container: 1280px;
    --breakpoint-xxs: 320px;
    /* ... */

    /* Colors */
    --color-white: rgb(255 255 255);
    /* ... */

    /* AUTO-GENERATED DESIGN TOKENS - END */

    /* ======================================== */
    /* MANUAL OVERRIDES - DO NOT AUTO-GENERATE */
    /* ======================================== */

    /* Shadows */
    --shadow-xs: ...;
    /* ... */

    /* Animations */
    --animate-marquee: ...;
    @keyframes marquee { ... }
}

@layer base {
    /* Dark mode variables */
    .dark-mode { ... }
}

/* ============================================================================
   OSM BRAND COLOR OVERRIDES
   ============================================================================ */
@theme {
    --color-brand-600: rgb(105 65 198);
    --color-brand-700: rgb(83 56 158);
    --font-display: 'DM Sans', ...;
    --font-body: 'Poppins', ...;
}
```

---

## ⚠️ Breaking Changes

### typography.css에서 필요한 수정

| Before | After | Count |
|--------|-------|-------|
| `calc(var(--spacing) * 0.5)` | `var(--spacing-xxs)` | 4 |
| `calc(var(--spacing) * 2)` | `var(--spacing-md)` | 6 |
| `calc(var(--spacing) * 3)` | `var(--spacing-lg)` | 3 |
| `calc(var(--spacing) * 4)` | `var(--spacing-xl)` | 10 |
| `calc(var(--spacing) * 5)` | `var(--spacing-2xl)` | 5 |
| `calc(var(--spacing) * 8)` | `var(--spacing-4xl)` | 8 |
| `calc(var(--spacing) * 10)` | `var(--spacing-5xl)` | 4 |
| `calc(var(--spacing) * 12)` | `var(--spacing-6xl)` | 4 |

**총 수정 필요**: 44개소

---

**Maintainer**: OSM RFQ Development Team
**Last Updated**: 2025-11-21
