# Design Token Single Source of Truth

> **Version 2.0.0** - 통합 디자인 토큰 생성 시스템

## 📋 개요

OSM RFQ 프로젝트의 모든 디자인 토큰(Spacing, Radius, Typography, Widths, Colors)은 TypeScript 파일에서 **단일 소스(Single Source of Truth)**로 관리됩니다. 이를 통해 TypeScript 상수와 CSS Variables가 자동으로 동기화됩니다.

### 핵심 원칙

1. **TypeScript 파일이 유일한 진실의 원천**
   - 모든 토큰 값은 `src/commons/constants/*.ts` 파일에서만 수정
   - CSS 파일을 직접 편집하지 않음

2. **자동 생성**
   - `npm run generate:tokens` 명령어로 CSS Variables 자동 생성
   - 빌드 시 자동으로 토큰 생성 (`npm run build`)

3. **타입 안전성**
   - TypeScript로 타입 안전한 토큰 사용
   - IDE 자동완성 지원

## 🏗️ 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│  TypeScript Token Files (Single Source of Truth)           │
│  src/commons/constants/                                     │
│  ├─ spacing.ts   → generateSpacingCSS()                     │
│  ├─ radius.ts    → generateRadiusCSS()                      │
│  ├─ typography.ts → generateTypographyCSS()                 │
│  ├─ widths.ts    → generateWidthsCSS()                      │
│  └─ color.ts     → generateCSSString()                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Unified Build Script                                       │
│  scripts/generate-design-tokens.ts                          │
│  - 모든 토큰 모듈 import                                      │
│  - CSS 생성 함수 호출                                         │
│  - theme.css 자동 업데이트                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Generated CSS Variables                                    │
│  src/styles/theme.css                                       │
│  @theme {                                                   │
│    /* AUTO-GENERATED DESIGN TOKENS */                       │
│    --spacing-xl: 16px;                                      │
│    --radius-md: 8px;                                        │
│    --text-xs: 12px;                                         │
│    ...                                                      │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Usage in Components                                        │
│  - Tailwind CSS classes                                     │
│  - CSS Variables (var(--spacing-xl))                        │
│  - TypeScript constants (spacing.xl)                        │
└─────────────────────────────────────────────────────────────┘
```

## 📦 토큰 파일 구조

### 1. Spacing Tokens ([spacing.ts](/frontend/src/commons/constants/spacing.ts))

**제공하는 값**: 17개 spacing 값 (0px ~ 160px)

```typescript
import { spacing, generateSpacingCSSString } from '@/commons/constants/spacing';

// TypeScript에서 사용
const padding = spacing.xl; // 16

// CSS 생성
const css = generateSpacingCSSString();
// Output:
//   --spacing-none: 0px;
//   --spacing-xl: 16px;
//   --spacing-2xl: 20px;
```

**CSS Variables**:
- `--spacing-none` (0px)
- `--spacing-xxs` ~ `--spacing-xl` (2px ~ 16px)
- `--spacing-2xl` ~ `--spacing-11xl` (20px ~ 160px)

### 2. Radius Tokens ([radius.ts](/frontend/src/commons/constants/radius.ts))

**제공하는 값**: 11개 radius 값 (0px ~ 9999px)

```typescript
import { radius, generateRadiusCSSString } from '@/commons/constants/radius';

// TypeScript에서 사용
const borderRadius = radius.md; // 8

// CSS 생성
const css = generateRadiusCSSString();
// Output:
//   --radius-none: 0px;
//   --radius-md: 8px;
//   --radius-full: 9999px;
```

**CSS Variables**:
- `--radius-none` (0px)
- `--radius-xxs` ~ `--radius-xl` (2px ~ 12px)
- `--radius-2xl` ~ `--radius-4xl` (16px ~ 24px)
- `--radius-full` (9999px)

### 3. Typography Tokens ([typography.ts](/frontend/src/commons/constants/typography.ts))

**제공하는 값**: Font families, sizes, line heights, letter spacing

```typescript
import {
  fontFamilies,
  fontSizes,
  lineHeights,
  letterSpacing,
  generateTypographyCSSString
} from '@/commons/constants/typography';

// TypeScript에서 사용
const size = fontSizes.textMd; // 16
const lineHeight = lineHeights.textMd; // 24

// CSS 생성
const css = generateTypographyCSSString();
// Output:
//   --font-body: 'Poppins', ...;
//   --font-display: 'DM Sans', ...;
//   --text-xs: 12px;
//   --text-xs--line-height: 18px;
//   --text-display-md--letter-spacing: -0.72px;
```

**CSS Variables**:
- `--font-body`, `--font-display` (font families)
- `--text-xs` ~ `--text-xl` (12px ~ 20px)
- `--text-display-xs` ~ `--text-display-2xl` (24px ~ 72px)
- `--text-{size}--line-height` (line heights)
- `--text-display-{size}--letter-spacing` (display sizes only)

### 4. Width & Breakpoint Tokens ([widths.ts](/frontend/src/commons/constants/widths.ts))

**제공하는 값**: Container widths, breakpoints

```typescript
import { widths, breakpoints, generateWidthsCSSString } from '@/commons/constants/widths';

// TypeScript에서 사용
const maxWidth = widths.xl3; // 1280

// CSS 생성
const css = generateWidthsCSSString();
// Output:
//   --max-width-container: 1280px;
//   --breakpoint-xxs: 320px;
//   --breakpoint-xs: 600px;
```

**CSS Variables**:
- `--max-width-container` (1280px)
- `--breakpoint-xxs` (320px)
- `--breakpoint-xs` (600px, Sonner 호환성)

### 5. Color Tokens ([color.ts](/frontend/src/commons/constants/color.ts))

**제공하는 값**: Primitive colors, semantic colors

```typescript
import { primitiveColors, semanticColors, generateCSSString } from '@/commons/constants/color';

// TypeScript에서 사용
const blue = primitiveColors.blue[600]; // { r: 58, g: 92, b: 243 }

// CSS 생성
const css = generateCSSString();
// Output:
//   --color-blue-600: rgb(58 92 243);
//   --color-primary: var(--color-blue-600);
```

**CSS Variables**:
- `--color-{color}-{shade}` (primitive colors)
- `--color-{semantic}` (semantic colors)

## 🚀 사용 방법

### 1. 토큰 값 수정하기

**❌ 잘못된 방법**:
```css
/* theme.css를 직접 수정 (하지 마세요!) */
@theme {
  --spacing-xl: 20px; /* 이렇게 하면 안 됩니다! */
}
```

**✅ 올바른 방법**:
```typescript
// src/commons/constants/spacing.ts
export const spacing = {
  // ...
  xl: 20, // 여기서 값을 변경하세요
  // ...
} as const;
```

그 다음 토큰을 재생성:
```bash
npm run generate:tokens
```

### 2. 새로운 토큰 추가하기

**Step 1**: TypeScript 파일에 토큰 추가

```typescript
// src/commons/constants/spacing.ts
export const spacing = {
  // 기존 토큰들...
  xl12: 200, // 새로운 토큰 추가
} as const;
```

**Step 2**: CSS 네이밍 매핑 추가

```typescript
// spacing.ts 내부
const spacingCSSNameMapping: Record<string, string> = {
  // 기존 매핑들...
  xl12: '12xl', // TypeScript xl12 → CSS 12xl
};
```

**Step 3**: 토큰 생성

```bash
npm run generate:tokens
```

### 3. 컴포넌트에서 사용하기

#### TypeScript에서 사용

```typescript
import { spacing } from '@/commons/constants/spacing';
import { radius } from '@/commons/constants/radius';

const MyComponent = () => {
  return (
    <div style={{
      padding: spacing.xl,      // 16px
      borderRadius: radius.md   // 8px
    }}>
      Content
    </div>
  );
};
```

#### Tailwind CSS에서 사용

```typescript
// Tailwind이 CSS Variables를 자동으로 인식
const MyComponent = () => {
  return (
    <div className="p-[var(--spacing-xl)] rounded-[var(--radius-md)]">
      Content
    </div>
  );
};
```

#### 순수 CSS에서 사용

```css
.my-component {
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
}
```

## 🔧 빌드 스크립트

### 통합 생성 스크립트

[scripts/generate-design-tokens.ts](/frontend/scripts/generate-design-tokens.ts)는 모든 토큰을 한 번에 생성합니다.

**실행 방법**:

```bash
# 수동 실행
npm run generate:tokens

# 빌드 시 자동 실행
npm run build

# 기존 명령어 (별칭)
npm run generate:theme
```

**동작 과정**:

1. 모든 토큰 모듈 import (spacing, radius, typography, widths, colors)
2. 각 모듈의 CSS 생성 함수 호출
3. 생성된 CSS를 하나의 문자열로 결합
4. `theme.css`의 AUTO-GENERATED 섹션 교체
5. OSM 브랜드 오버라이드 및 수동 섹션 보존

### theme.css 구조

```css
@theme {
/* AUTO-GENERATED DESIGN TOKENS - START */
  /* DO NOT EDIT THIS SECTION MANUALLY */

  /* SPACING TOKENS */
  --spacing-xl: 16px;

  /* RADIUS TOKENS */
  --radius-md: 8px;

  /* ... 나머지 자동 생성된 토큰들 ... */

/* AUTO-GENERATED DESIGN TOKENS - END */

  /* MANUAL OVERRIDES */
  /* Shadows (수동 관리) */
  --shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);

  /* Animations (수동 관리) */
  --animate-marquee: marquee 60s linear infinite;
}

/* OSM BRAND OVERRIDES */
@theme {
  /* OSM 브랜드 색상 (절대 삭제 금지) */
  --color-brand-600: rgb(105 65 198);
  --color-brand-700: rgb(83 56 158);

  /* OSM 타이포그래피 */
  --font-display: 'DM Sans', ...;
  --font-body: 'Poppins', ...;
}
```

**중요**:
- `AUTO-GENERATED` 섹션은 절대 수동 편집하지 마세요
- `MANUAL OVERRIDES` 섹션은 수동으로 관리 (shadows, animations 등)
- `OSM BRAND OVERRIDES` 섹션은 절대 삭제하지 마세요

## 📚 네이밍 규칙

### TypeScript to CSS Mapping

| TypeScript | CSS Variable | 예시 |
|------------|--------------|------|
| `spacing.xl` | `--spacing-xl` | 16px |
| `spacing.xl2` | `--spacing-2xl` | 20px ⚠️ |
| `radius.md` | `--radius-md` | 8px |
| `fontSizes.textXs` | `--text-xs` | 12px |
| `fontSizes.displayMd` | `--text-display-md` | 36px |

⚠️ **주의**: TypeScript에서 `xl2`, `xl3`는 CSS에서 `2xl`, `3xl`로 변환됩니다.

### Untitled UI 네이밍 규칙 준수

이 프로젝트는 [Untitled UI](https://www.untitledui.com/) 및 React Kit의 네이밍 규칙을 따릅니다:

- Spacing: `--spacing-{size}`
- Radius: `--radius-{size}`
- Typography: `--text-{size}`, `--font-{family}`
- Line Height: `--text-{size}--line-height`
- Letter Spacing: `--text-display-{size}--letter-spacing`
- Widths: `--max-width-{name}`, `--breakpoint-{device}`

## 🧪 테스트 및 검증

### 1. TypeScript 컴파일 확인

```bash
npx tsc --noEmit
```

에러가 없어야 합니다.

### 2. CSS 생성 확인

```bash
npm run generate:tokens
```

출력 예시:
```
🚀 Generating design tokens...

📦 Generating Spacing tokens...
📦 Generating Radius tokens...
📦 Generating Typography tokens...
📦 Generating Widths & Breakpoints...
📦 Generating Color tokens...

✅ Updated existing auto-generated section

📊 Generation Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Output: /Users/.../frontend/src/styles/theme.css
📦 Generated tokens:
   ✓ Spacing (17 variables)
   ✓ Radius (11 variables)
   ✓ Typography (26+ variables)
   ✓ Widths & Breakpoints (3 variables)
   ✓ Colors (Primitive + Semantic)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Design tokens generated successfully!
```

### 3. theme.css 검증

생성된 [theme.css](/frontend/src/styles/theme.css)를 확인:

```bash
# 첫 100줄 확인 (spacing, radius, typography)
head -100 src/styles/theme.css

# 마지막 40줄 확인 (OSM 브랜드 오버라이드)
tail -40 src/styles/theme.css

# Letter-spacing 변수 확인
grep "letter-spacing" src/styles/theme.css
```

### 4. Storybook에서 시각적 확인

```bash
npm run storybook
```

컴포넌트들이 올바르게 렌더링되는지 확인하세요.

## 🔄 마이그레이션 가이드

### 기존 CSS Variables에서 마이그레이션

**Before**:
```css
.my-component {
  padding: 16px;
  border-radius: 8px;
}
```

**After**:
```typescript
// TypeScript에서
import { spacing, radius } from '@/commons/constants';

const styles = {
  padding: spacing.xl,
  borderRadius: radius.md
};

// 또는 CSS에서
.my-component {
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
}
```

### calc() 표현식 마이그레이션

**Before**:
```css
.my-component {
  padding: calc(var(--spacing) * 4); /* 32px */
}
```

**After**:
```css
.my-component {
  padding: var(--spacing-4xl); /* 32px */
}
```

## ⚠️ 주의사항

### 하지 말아야 할 것들

1. ❌ `theme.css`의 AUTO-GENERATED 섹션을 수동으로 편집
2. ❌ OSM BRAND OVERRIDES 섹션 삭제
3. ❌ TypeScript 파일과 CSS를 동시에 수정
4. ❌ `generate:tokens` 없이 빌드

### 해야 할 것들

1. ✅ 토큰 수정 시 항상 TypeScript 파일만 수정
2. ✅ 수정 후 `npm run generate:tokens` 실행
3. ✅ TypeScript 컴파일 확인 (`npx tsc --noEmit`)
4. ✅ git commit 전에 생성된 theme.css도 함께 커밋

## 🐛 트러블슈팅

### Q: "tsx: command not found" 에러

**A**: npx를 사용하세요:
```bash
npx tsx scripts/generate-design-tokens.ts
```

또는 전역 설치:
```bash
npm install -g tsx
```

### Q: theme.css가 생성되지 않음

**A**:
1. TypeScript 컴파일 에러 확인: `npx tsc --noEmit`
2. 파일 경로 확인: `ls -la src/styles/theme.css`
3. 스크립트 직접 실행: `npx tsx scripts/generate-design-tokens.ts`

### Q: OSM 브랜드 색상이 사라짐

**A**:
- `theme.css` 파일 끝에 OSM BRAND OVERRIDES 섹션이 있는지 확인
- 없다면 git에서 복구: `git checkout src/styles/theme.css`
- 다시 토큰 생성: `npm run generate:tokens`

### Q: CSS Variable 이름이 틀림 (예: display-Md 대신 display-md)

**A**:
- 이미 수정되었습니다 (v2.0.0)
- 최신 코드로 업데이트: `git pull`
- 토큰 재생성: `npm run generate:tokens`

## 📖 관련 문서

- [Color System Single Source](/docs/frontend/color-system-single-source.md) - 색상 시스템 상세 가이드
- [Design Tokens Migration Checklist](/docs/frontend/design-tokens-migration-checklist.md) - 마이그레이션 체크리스트
- [Theme CSS Impact Analysis](/docs/frontend/theme-css-impact-analysis.md) - 영향도 분석

## 🎯 버전 히스토리

### v2.0.0 (2025-11-21)
- ✅ 모든 디자인 토큰 Single Source of Truth 패턴 적용
- ✅ 통합 빌드 스크립트 (generate-design-tokens.ts)
- ✅ Spacing, Radius, Typography, Widths CSS 생성 함수 구현
- ✅ Untitled UI 네이밍 규칙 준수
- ✅ Letter-spacing 소문자 변환 버그 수정
- ✅ OSM 브랜드 오버라이드 보존

### v1.0.0
- ✅ Color System Single Source of Truth 구현

## 💡 팁

### IDE 자동완성 활용

```typescript
import { spacing, radius, fontSizes } from '@/commons/constants';

// TypeScript가 자동완성을 제공합니다
const s = spacing.  // ← Ctrl+Space로 모든 옵션 확인
```

### 타입 안전성

```typescript
import { SpacingSize, RadiusSize, FontSize } from '@/commons/constants';

// 타입 안전한 함수
function createBox(size: SpacingSize, corner: RadiusSize) {
  return {
    padding: spacing[size],
    borderRadius: radius[corner]
  };
}

// 컴파일 타임에 에러 감지
createBox('invalid', 'wrong'); // ❌ TypeScript 에러
createBox('xl', 'md');         // ✅ OK
```

### 성능 최적화

CSS Variables는 런타임에 계산되므로, 정적 값을 사용할 수 있다면 TypeScript 상수를 직접 사용하는 것이 더 빠릅니다:

```typescript
// 런타임 계산 (느림)
<div style={{ padding: 'var(--spacing-xl)' }} />

// 정적 값 (빠름)
<div style={{ padding: spacing.xl }} />
```

하지만 dark mode나 테마 전환이 필요하다면 CSS Variables를 사용하세요.

---

**마지막 업데이트**: 2025-11-21
**작성자**: OSM RFQ Team
**버전**: 2.0.0
