# Design Tokens Migration to Single Source of Truth

**Date**: 2025-11-21
**Status**: In Progress
**Strategy**: B (Individual CSS generation functions + Unified build script)

---

## 📋 Overview

이 문서는 모든 디자인 토큰(spacing, radius, typography, widths, containers)을 Single Source of Truth 패턴으로 마이그레이션하는 계획과 체크리스트입니다.

**목표**: color.ts와 동일한 방식으로 모든 디자인 토큰을 TypeScript 파일에서 CSS Variables로 자동 생성

---

## 🎯 CSS Variable Naming Conventions (연구 결과)

### Untitled UI/React Kit Naming Rules

**분석 결과**:

#### 1. **Spacing** (spacing-*)
```css
/* Figma tokens */
spacing-none    → --spacing-none: 0px;
spacing-xxs     → --spacing-xxs: 2px;
spacing-xs      → --spacing-xs: 4px;
spacing-sm      → --spacing-sm: 6px;
spacing-md      → --spacing-md: 8px;
spacing-lg      → --spacing-lg: 12px;
spacing-xl      → --spacing-xl: 16px;
spacing-2xl     → --spacing-2xl: 20px;
spacing-3xl     → --spacing-3xl: 24px;
spacing-4xl     → --spacing-4xl: 32px;
spacing-5xl     → --spacing-5xl: 40px;
spacing-6xl     → --spacing-6xl: 48px;
spacing-7xl     → --spacing-7xl: 64px;
spacing-8xl     → --spacing-8xl: 80px;
spacing-9xl     → --spacing-9xl: 96px;
spacing-10xl    → --spacing-10xl: 128px;
spacing-11xl    → --spacing-11xl: 160px;
```

#### 2. **Radius** (radius-*)
```css
/* Figma tokens */
radius-none     → --radius-none: 0px;
radius-xxs      → --radius-xxs: 2px;
radius-xs       → --radius-xs: 4px;
radius-sm       → --radius-sm: 6px;
radius-md       → --radius-md: 8px;
radius-lg       → --radius-lg: 10px;
radius-xl       → --radius-xl: 12px;
radius-2xl      → --radius-2xl: 16px;
radius-3xl      → --radius-3xl: 20px;
radius-4xl      → --radius-4xl: 24px;
radius-full     → --radius-full: 9999px;
```

#### 3. **Typography**
```css
/* Font families */
--font-body: ...;
--font-display: ...;
--font-mono: ...;

/* Font sizes with line heights */
--text-xs: ...;
--text-xs--line-height: ...;
--text-sm: ...;
--text-sm--line-height: ...;
--text-md: ...;
--text-display-xs: ...;
--text-display-2xl--letter-spacing: ...;
```

#### 4. **Widths/Breakpoints**
```css
--max-width-container: 1280px;
--breakpoint-xxs: 320px;
--breakpoint-xs: 600px;
```

#### 5. **Containers**
```css
/* 현재 theme.css에 명시적 정의 없음 */
/* widths.ts와 통합 처리 예상 */
```

### Naming Rule Summary

| Token Type | Pattern | Example |
|-----------|---------|---------|
| Spacing | `--spacing-{size}` | `--spacing-xl`, `--spacing-2xl` |
| Radius | `--radius-{size}` | `--radius-md`, `--radius-full` |
| Typography | `--text-{size}`, `--font-{family}` | `--text-lg`, `--font-body` |
| Widths | `--max-width-{name}`, `--breakpoint-{size}` | `--max-width-container` |

**핵심 원칙**:
- ✅ Kebab-case 사용
- ✅ Figma tokens 네이밍 준용 (spacing-xl, radius-md)
- ✅ 복합 속성은 `--` 구분자 사용 (`--text-xs--line-height`)
- ✅ 단위는 CSS에서만 명시 (TypeScript는 숫자만)

---

## 📊 Phase 1: 기존 theme.css 영향도 분석

### ✅ Checklist

- [ ] **1.1** Spacing 관련 CSS Variables 식별
  - [ ] 현재 theme.css에 정의된 spacing 변수 목록 작성
  - [ ] 사용처 검색 (코드베이스 전체 `grep --spacing-`)
  - [ ] 삭제 시 영향 받는 파일 목록 작성

- [ ] **1.2** Radius 관련 CSS Variables 식별
  - [ ] 현재 theme.css에 정의된 radius 변수 목록 작성 (lines 54-63)
  - [ ] 사용처 검색 (코드베이스 전체 `grep --radius-`)
  - [ ] 삭제 시 영향 받는 파일 목록 작성

- [ ] **1.3** Typography 관련 CSS Variables 식별
  - [ ] 현재 theme.css에 정의된 typography 변수 목록 작성 (lines 2-43)
  - [ ] Font families (--font-body, --font-display, --font-mono)
  - [ ] Font sizes (--text-xs, --text-display-2xl, etc.)
  - [ ] 사용처 검색
  - [ ] 삭제 시 영향 받는 파일 목록 작성

- [ ] **1.4** Widths/Breakpoints 관련 CSS Variables 식별
  - [ ] 현재 theme.css에 정의된 widths 변수 목록 작성 (lines 45-51)
  - [ ] 사용처 검색
  - [ ] 삭제 시 영향 받는 파일 목록 작성

- [ ] **1.5** OSM Brand Overrides 보존 확인
  - [ ] Lines 1336-1356 영향도 확인
  - [ ] OSM brand 색상 및 폰트 오버라이드 보존 계획 수립

### 예상 영향도

**자동 생성 가능** (삭제 후 재생성):
- [ ] Primitive spacing values (--spacing-none ~ --spacing-11xl)
- [ ] Primitive radius values (--radius-none ~ --radius-full)
- [ ] Typography sizes (--text-xs ~ --text-display-2xl)
- [ ] Font families (--font-body, --font-display, --font-mono)
- [ ] Breakpoints (--breakpoint-xxs, --breakpoint-xs)
- [ ] Max widths (--max-width-container)

**수동 보존 필요** (OSM overrides):
- [ ] --color-brand-600 (OSM purple)
- [ ] --color-brand-700 (OSM purple hover)
- [ ] --font-display (DM Sans override)
- [ ] --font-body (Poppins override)

---

## 📝 Phase 2: spacing.ts 구현 (Priority: High)

### File: `/frontend/src/commons/constants/spacing.ts`

#### ✅ Checklist

- [ ] **2.1** 헬퍼 함수 추가
  - [ ] `generateSpacingCSS()` 함수 작성
  - [ ] Figma tokens 네이밍 준용 (spacing-xl, spacing-2xl)
  - [ ] TypeScript 기존 상수는 유지 (하위 호환성)

- [ ] **2.2** 코드 구현
  ```typescript
  /**
   * Generate CSS Variables for spacing tokens
   * Follows Untitled UI naming convention: --spacing-{size}
   */
  export function generateSpacingCSS(): Record<string, string> {
    const cssVars: Record<string, string> = {};

    // spacing 객체를 순회하며 CSS Variables 생성
    Object.entries(spacing).forEach(([key, value]) => {
      const cssName = key; // 이미 kebab-case (none, xxs, xs, ...)
      cssVars[`--spacing-${cssName}`] = `${value}px`;
    });

    return cssVars;
  }

  /**
   * Generate CSS string for spacing tokens
   */
  export function generateSpacingCSSString(): string {
    const vars = generateSpacingCSS();
    return Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
  }
  ```

- [ ] **2.3** TypeScript 컴파일 확인
  ```bash
  npx tsc --noEmit
  ```

- [ ] **2.4** 테스트
  - [ ] generateSpacingCSS() 실행 결과 확인
  - [ ] 생성된 CSS Variables 형식 검증

---

## 📝 Phase 3: radius.ts 구현 (Priority: High)

### File: `/frontend/src/commons/constants/radius.ts`

#### ✅ Checklist

- [ ] **3.1** 헬퍼 함수 추가
  - [ ] `generateRadiusCSS()` 함수 작성
  - [ ] Figma tokens 네이밍 준용 (radius-md, radius-full)
  - [ ] TypeScript 기존 상수는 유지

- [ ] **3.2** 코드 구현
  ```typescript
  /**
   * Generate CSS Variables for radius tokens
   * Follows Untitled UI naming convention: --radius-{size}
   */
  export function generateRadiusCSS(): Record<string, string> {
    const cssVars: Record<string, string> = {};

    Object.entries(radius).forEach(([key, value]) => {
      cssVars[`--radius-${key}`] = `${value}px`;
    });

    return cssVars;
  }

  export function generateRadiusCSSString(): string {
    const vars = generateRadiusCSS();
    return Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
  }
  ```

- [ ] **3.3** TypeScript 컴파일 확인

- [ ] **3.4** 테스트

---

## 📝 Phase 4: typography.ts 구현 (Priority: Medium)

### File: `/frontend/src/commons/constants/typography.ts`

#### ✅ Checklist

- [ ] **4.1** 헬퍼 함수 추가
  - [ ] `generateTypographyCSS()` 함수 작성
  - [ ] Font families 처리 (--font-body, --font-display, --font-mono)
  - [ ] Font sizes 처리 (--text-xs, --text-display-2xl)
  - [ ] Line heights 처리 (--text-xs--line-height)
  - [ ] Letter spacing 처리 (--text-display-md--letter-spacing)

- [ ] **4.2** 코드 구현
  ```typescript
  /**
   * Generate CSS Variables for typography tokens
   */
  export function generateTypographyCSS(): Record<string, string> {
    const cssVars: Record<string, string> = {};

    // Font families
    Object.entries(fontFamiliesWithFallback).forEach(([key, value]) => {
      cssVars[`--font-${key}`] = value;
    });

    // Font sizes
    Object.entries(fontSizes).forEach(([key, value]) => {
      cssVars[`--text-${key}`] = `${value}px`;
    });

    // Line heights
    Object.entries(lineHeights).forEach(([key, value]) => {
      cssVars[`--text-${key}--line-height`] = `${value}px`;
    });

    // Letter spacing (if exists)
    if (letterSpacing) {
      Object.entries(letterSpacing).forEach(([key, value]) => {
        cssVars[`--text-${key}--letter-spacing`] = `${value}px`;
      });
    }

    return cssVars;
  }

  export function generateTypographyCSSString(): string {
    const vars = generateTypographyCSS();
    return Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
  }
  ```

- [ ] **4.3** TypeScript 컴파일 확인

- [ ] **4.4** 테스트

---

## 📝 Phase 5: widths.ts 구현 (Priority: Medium)

### File: `/frontend/src/commons/constants/widths.ts`

#### ✅ Checklist

- [ ] **5.1** 헬퍼 함수 추가
  - [ ] `generateWidthsCSS()` 함수 작성
  - [ ] Max widths 처리 (--max-width-container)
  - [ ] Breakpoints 처리 (--breakpoint-xxs, --breakpoint-xs)

- [ ] **5.2** 코드 구현
  ```typescript
  /**
   * Generate CSS Variables for widths and breakpoints
   */
  export function generateWidthsCSS(): Record<string, string> {
    const cssVars: Record<string, string> = {};

    // Max widths
    Object.entries(maxWidths).forEach(([key, value]) => {
      cssVars[`--max-width-${key}`] = `${value}px`;
    });

    // Breakpoints
    Object.entries(breakpoints).forEach(([key, value]) => {
      cssVars[`--breakpoint-${key}`] = `${value}px`;
    });

    return cssVars;
  }

  export function generateWidthsCSSString(): string {
    const vars = generateWidthsCSS();
    return Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
  }
  ```

- [ ] **5.3** TypeScript 컴파일 확인

- [ ] **5.4** 테스트

---

## 📝 Phase 6: containers.ts 구현 (Priority: Low)

### File: `/frontend/src/commons/constants/containers.ts`

#### ✅ Checklist

- [ ] **6.1** 현재 사용 여부 확인
  - [ ] theme.css에 container 변수 존재 여부
  - [ ] containers.ts 파일 구조 분석

- [ ] **6.2** 헬퍼 함수 추가 (필요 시)
  - [ ] `generateContainersCSS()` 함수 작성
  - [ ] Naming convention 결정

- [ ] **6.3** 코드 구현 (필요 시)

- [ ] **6.4** TypeScript 컴파일 확인

- [ ] **6.5** 테스트

---

## 📝 Phase 7: 통합 빌드 스크립트 작성

### File: `/frontend/scripts/generate-design-tokens.ts`

#### ✅ Checklist

- [ ] **7.1** 통합 스크립트 작성
  - [ ] 모든 토큰 타입 import
  - [ ] theme.css 읽기
  - [ ] Auto-generated 섹션 교체
  - [ ] OSM overrides 보존

- [ ] **7.2** 코드 구현
  ```typescript
  #!/usr/bin/env tsx
  /**
   * Unified Design Token Generator
   *
   * Generates CSS Variables for all design tokens:
   * - Colors (from color.ts)
   * - Spacing (from spacing.ts)
   * - Radius (from radius.ts)
   * - Typography (from typography.ts)
   * - Widths (from widths.ts)
   * - Containers (from containers.ts)
   */

  import fs from 'fs';
  import path from 'path';
  import { fileURLToPath } from 'url';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  async function main() {
    // Import all token modules
    const colorModule = await import('../src/commons/constants/color.js');
    const spacingModule = await import('../src/commons/constants/spacing.js');
    const radiusModule = await import('../src/commons/constants/radius.js');
    const typographyModule = await import('../src/commons/constants/typography.js');
    const widthsModule = await import('../src/commons/constants/widths.js');

    // Generate CSS for each token type
    const colorCSS = colorModule.generateCSSString();
    const semanticLightCSS = Object.entries(colorModule.generateSemanticCSSVariables('light'))
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');

    const spacingCSS = spacingModule.generateSpacingCSSString();
    const radiusCSS = radiusModule.generateRadiusCSSString();
    const typographyCSS = typographyModule.generateTypographyCSSString();
    const widthsCSS = widthsModule.generateWidthsCSSString();

    // Read existing theme.css
    const themeCssPath = path.join(__dirname, '../src/styles/theme.css');
    let existingCSS = '';

    try {
      existingCSS = fs.readFileSync(themeCssPath, 'utf-8');
    } catch (error) {
      console.warn('⚠️  theme.css not found, creating new file');
    }

    // Build new auto-generated section
    const autoGenStart = '/* AUTO-GENERATED DESIGN TOKENS - START */';
    const autoGenEnd = '/* AUTO-GENERATED DESIGN TOKENS - END */';

    const newTokenSection = `${autoGenStart}
  /* ============================================================================
     SPACING TOKENS
     Auto-generated from spacing.ts
     DO NOT EDIT MANUALLY
     ============================================================================ */

${spacingCSS}

  /* ============================================================================
     RADIUS TOKENS
     Auto-generated from radius.ts
     ============================================================================ */

${radiusCSS}

  /* ============================================================================
     TYPOGRAPHY TOKENS
     Auto-generated from typography.ts
     ============================================================================ */

${typographyCSS}

  /* ============================================================================
     WIDTHS & BREAKPOINTS
     Auto-generated from widths.ts
     ============================================================================ */

${widthsCSS}

  /* ============================================================================
     COLOR TOKENS
     Auto-generated from color.ts
     ============================================================================ */

${colorCSS}

  /* ============================================================================
     SEMANTIC COLORS - LIGHT MODE
     ============================================================================ */

${semanticLightCSS}
${autoGenEnd}`;

    // Replace auto-generated section
    let newCSS: string;

    if (existingCSS.includes(autoGenStart)) {
      const regex = new RegExp(`${autoGenStart}[\\s\\S]*?${autoGenEnd}`, 'g');
      newCSS = existingCSS.replace(regex, newTokenSection);
    } else {
      // Create new file with @theme wrapper
      newCSS = `@theme {
${newTokenSection}
}

/* ============================================================================
   OSM BRAND COLOR OVERRIDES
   ============================================================================
   These overrides are preserved during auto-generation.
   Add manual overrides below this section.
   ============================================================================ */
`;
    }

    // Write theme.css
    fs.writeFileSync(themeCssPath, newCSS, 'utf-8');

    console.log('✅ Design tokens generated successfully!');
    console.log(`📁 Location: ${themeCssPath}`);
    console.log('📊 Generated tokens:');
    console.log('   - Spacing');
    console.log('   - Radius');
    console.log('   - Typography');
    console.log('   - Widths & Breakpoints');
    console.log('   - Colors (Primitive + Semantic)');
  }

  main().catch(error => {
    console.error('❌ Error generating design tokens:', error);
    process.exit(1);
  });
  ```

- [ ] **7.3** 기존 generate-theme-css.ts 처리 결정
  - [ ] Option A: 삭제 (통합 스크립트로 대체)
  - [ ] Option B: 유지 (색상 전용 스크립트로 남김)

- [ ] **7.4** 실행 권한 부여
  ```bash
  chmod +x scripts/generate-design-tokens.ts
  ```

---

## 📝 Phase 8: package.json 업데이트

### File: `/frontend/package.json`

#### ✅ Checklist

- [ ] **8.1** Scripts 수정
  ```json
  {
    "scripts": {
      "generate:tokens": "tsx scripts/generate-design-tokens.ts",
      "generate:theme": "npm run generate:tokens",
      "build": "npm run generate:tokens && next build"
    }
  }
  ```

- [ ] **8.2** 기존 generate:theme 스크립트 처리 결정
  - [ ] generate:tokens로 통합
  - [ ] 또는 generate:theme → generate:tokens alias

---

## 📝 Phase 9: 테스트 및 검증

#### ✅ Checklist

- [ ] **9.1** 로컬 테스트
  - [ ] `npm run generate:tokens` 실행
  - [ ] theme.css 생성 확인
  - [ ] Auto-generated 섹션 내용 검증

- [ ] **9.2** TypeScript 컴파일 테스트
  ```bash
  npx tsc --noEmit
  ```

- [ ] **9.3** 빌드 테스트
  ```bash
  npm run build
  ```

- [ ] **9.4** CSS Variables 사용처 검증
  - [ ] Storybook에서 컴포넌트 렌더링 확인
  - [ ] 개발 서버에서 UI 확인
  - [ ] Console에 CSS 에러 없는지 확인

- [ ] **9.5** OSM Brand Overrides 보존 확인
  - [ ] --color-brand-600 = #6941c6
  - [ ] --font-display = 'DM Sans'
  - [ ] --font-body = 'Poppins'

- [ ] **9.6** 하위 호환성 테스트
  - [ ] TypeScript에서 기존 상수 사용 가능한지 확인
  - [ ] 기존 코드 변경 없이 작동하는지 확인

---

## 📝 Phase 10: 문서화

#### ✅ Checklist

- [ ] **10.1** README 업데이트
  - [ ] [scripts/README.md](../../frontend/scripts/README.md) 업데이트
  - [ ] `generate:tokens` 스크립트 설명 추가

- [ ] **10.2** 마이그레이션 가이드 작성
  - [ ] [docs/frontend/design-tokens-single-source.md](./design-tokens-single-source.md) 작성
  - [ ] color.ts와 유사한 구조로 작성
  - [ ] 모든 토큰 타입 포괄

- [ ] **10.3** API 레퍼런스 문서 작성
  - [ ] 각 토큰 파일의 함수 설명
  - [ ] 사용 예시 추가
  - [ ] CSS Variables 네이밍 규칙 문서화

- [ ] **10.4** mkdocs.yml 업데이트
  - [ ] 새 문서 페이지 추가
  - [ ] Navigation 구조 업데이트

---

## 🔄 전체 작업 순서 (복잡도 기반)

### Phase A: High Priority (간단, 자주 사용)
1. ✅ **Spacing** - 단순 구조, 높은 사용 빈도
2. ✅ **Radius** - 단순 구조, 높은 사용 빈도

### Phase B: Medium Priority (중간 복잡도)
3. ✅ **Widths** - 2가지 타입 (max-widths, breakpoints)
4. ✅ **Typography** - 3가지 타입 (families, sizes, line-heights)

### Phase C: Low Priority (낮은 사용 빈도)
5. ✅ **Containers** - 사용 빈도 낮음

### Phase D: Integration
6. ✅ **통합 스크립트** - 모든 토큰 통합
7. ✅ **테스트 및 검증**
8. ✅ **문서화**

---

## ⚠️ 주의사항

### 1. OSM Brand Overrides 보존
- [ ] Lines 1336-1356 절대 삭제 금지
- [ ] Auto-generated 섹션 외부에 위치 확인
- [ ] 자동 생성 후에도 오버라이드 유지되는지 검증

### 2. 기존 코드 하위 호환성
- [ ] TypeScript 상수 접근 방식 유지
- [ ] 기존 import 구문 변경 불필요
- [ ] CSS Variables는 추가 옵션으로 제공

### 3. Naming Conventions
- [ ] Figma tokens 네이밍 100% 준용
- [ ] Kebab-case 엄수
- [ ] 복합 속성은 `--` 구분자 사용

### 4. 빌드 자동화
- [ ] `npm run build` 시 자동 실행
- [ ] CI/CD에서도 작동하는지 확인

---

## 📊 진행 상황 추적

| Phase | Status | Completed | Notes |
|-------|--------|-----------|-------|
| Phase 1: 영향도 분석 | ⬜ Not Started | 0/5 | - |
| Phase 2: spacing.ts | ⬜ Not Started | 0/4 | - |
| Phase 3: radius.ts | ⬜ Not Started | 0/4 | - |
| Phase 4: typography.ts | ⬜ Not Started | 0/4 | - |
| Phase 5: widths.ts | ⬜ Not Started | 0/5 | - |
| Phase 6: containers.ts | ⬜ Not Started | 0/5 | - |
| Phase 7: 통합 스크립트 | ⬜ Not Started | 0/3 | - |
| Phase 8: package.json | ⬜ Not Started | 0/2 | - |
| Phase 9: 테스트 | ⬜ Not Started | 0/6 | - |
| Phase 10: 문서화 | ⬜ Not Started | 0/4 | - |

**전체 진행률**: 0/42 (0%)

---

## 📚 참고 자료

- [Color System Single Source](./color-system-single-source.md) - 색상 시스템 구현 참고
- [Untitled UI Documentation](https://untitledui.com/docs)
- [Figma Tokens](../../frontend/figma-tokens/)
- [theme.css](../../frontend/src/styles/theme.css)

---

**Last Updated**: 2025-11-21
**Maintainer**: OSM RFQ Development Team
