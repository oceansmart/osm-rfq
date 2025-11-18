# Typography Token 구현 프롬프트

> Figma Tokens의 Typography 시스템을 TypeScript와 CSS Variables로 변환하여 프로젝트 전반에서 사용 가능하도록 구현

---

## 🚨 CRITICAL RULES

### 적용할 규칙
**반드시 아래 규칙을 먼저 읽고 적용할 것:**
```
@.claude/rules/frontend-common.md
```

### 규칙 적용 결과
작업 완료 후 다음 형식으로 체크리스트 반환:
```
✅ 1.1 명시된 파일만 수정 - [수정된 파일 목록]
✅ 1.2 라이브러리 설치 없음 - [설치한 라이브러리 또는 "없음"]
✅ 1.3 독립적인 구조로 구현 - [설명]
✅ 2.1 Figma 구조 분석 완료
✅ 2.2 package.json 분석 완료
✅ 2.3 폴더 구조 분석 완료
✅ 2.4 전체 검토 및 디테일 수정 완료
```

---

## 📁 구현 파일 경로

### 수정/생성할 파일 (명시된 파일만):
1. `src/commons/constants/typography.ts` - TypeScript Typography Tokens (NEW)
2. `src/app/globals.css` - CSS Variables 추가 (UPDATE - Typography 섹션만)

### 참조할 파일 (읽기 전용):
- `figma-tokens/6. Typography/Value.json` - Typography tokens (138줄)
  - Font families: 2개 (DM Sans, Poppins)
  - Font weights: 8개 (Regular, Medium, Semibold, Bold + Italic variants)
  - Font sizes: 11개 (text-xs ~ display-2xl)
  - Line heights: 11개 (text-xs ~ display-2xl)

---

## 🎯 핵심 요구사항

### 요구사항 1: Figma Typography Tokens 분석 및 TypeScript 변환

**목표**: Typography 토큰을 TypeScript 상수 및 타입으로 정의하여 type-safe하게 사용

#### 구현 내용:
```typescript
// Font Families
export const fontFamilies = {
  display: 'DM Sans',
  body: 'Poppins',
} as const;

// Font Weights (CSS 숫자값으로 매핑)
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Font Sizes (11개 scale)
export const fontSizes = {
  textXs: 12,
  textSm: 14,
  textMd: 16,
  textLg: 18,
  textXl: 20,
  displayXs: 24,
  displaySm: 30,
  displayMd: 36,
  displayLg: 48,
  displayXl: 60,
  display2xl: 72,
} as const;

// Line Heights
export const lineHeights = {
  textXs: 18,
  textSm: 20,
  textMd: 24,
  textLg: 28,
  textXl: 30,
  displayXs: 32,
  displaySm: 38,
  displayMd: 44,
  displayLg: 60,
  displayXl: 72,
  display2xl: 90,
} as const;
```

### 요구사항 2: CSS Variables로 globals.css에 추가

**목표**: CSS Variables로 변환하여 `var(--font-family-display)` 형태로 사용 가능

#### 구현 위치:
`globals.css` 파일의 기존 Color Token 섹션 **아래에 추가**

```css
/* ============================================================================
   6. TYPOGRAPHY TOKENS
   ============================================================================ */

:root {
  /* Font Families */
  --font-family-display: 'DM Sans', sans-serif;
  --font-family-body: 'Poppins', sans-serif;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Font Sizes */
  --font-size-text-xs: 12px;
  --font-size-text-sm: 14px;
  /* ... 나머지 */

  /* Line Heights */
  --line-height-text-xs: 18px;
  --line-height-text-sm: 20px;
  /* ... 나머지 */
}
```

### 요구사항 3: Typography Utility Classes 생성

**목표**: Tailwind과 함께 사용 가능한 Typography 조합 클래스

```css
@layer utilities {
  /* Text Styles */
  .text-xs {
    font-size: var(--font-size-text-xs);
    line-height: var(--line-height-text-xs);
  }

  .text-sm {
    font-size: var(--font-size-text-sm);
    line-height: var(--line-height-text-sm);
  }

  /* Display Styles */
  .display-lg {
    font-size: var(--font-size-display-lg);
    line-height: var(--line-height-display-lg);
  }

  /* Font Family Utilities */
  .font-display {
    font-family: var(--font-family-display);
  }

  .font-body {
    font-family: var(--font-family-body);
  }
}
```

---

## 🔄 구현 순서 (Step-by-step)

### Phase 1: 분석

```
Step 1-1: Figma Typography 파일 읽기
- figma-tokens/6. Typography/Value.json

Step 1-2: Typography Token 구조 파악
- Font families (2개)
- Font weights (8개)
- Font sizes (11개)
- Line heights (11개)

Step 1-3: 기존 파일 확인
- src/app/globals.css 현재 상태 (Color Token 완료 확인)
- src/commons/constants/ 디렉토리 구조

✋ 승인 요청: "위 분석 결과를 바탕으로 진행해도 될까요?"
```

### Phase 2: TypeScript 구현 (typography.ts)

```
Step 2-1: Font families 정의
Step 2-2: Font weights 정의 (CSS 숫자값 매핑)
Step 2-3: Font sizes 정의 (11개 scale)
Step 2-4: Line heights 정의 (11개 scale)
Step 2-5: TypeScript Types 정의
Step 2-6: Helper 함수 정의

✋ 승인 요청: "TypeScript 구현 완료. 확인해주세요."
```

### Phase 3: CSS Variables 구현 (globals.css)

```
Step 3-1: Typography 섹션 추가 (Color Token 아래)
Step 3-2: Font family variables
Step 3-3: Font weight variables
Step 3-4: Font size variables
Step 3-5: Line height variables
Step 3-6: Utility classes (@layer utilities)

✋ 승인 요청: "CSS Variables 구현 완료. 확인해주세요."
```

### Phase 4: 검증

```
Step 4-1: TypeScript 컴파일 확인
Step 4-2: CSS Variables 브라우저 테스트
Step 4-3: Utility classes 테스트

✋ 승인 요청: "검증 완료. 최종 확인해주세요."
```

### Phase 5: 최종 검토

```
Step 5-1: 전체 Typography 토큰 매핑 확인
Step 5-2: 빠진 부분 확인
Step 5-3: 디테일 수정
Step 5-4: 체크리스트 작성

✋ 승인 요청: "최종 검토 완료."
```

---

## ✅ 구현 완료 체크리스트 템플릿

```markdown
# Typography Token 구현 완료 체크리스트

## 📋 Frontend Common Rules 적용 결과
✅ 1.1 명시된 파일만 수정: [typography.ts 생성, globals.css Typography 섹션 추가]
✅ 1.2 라이브러리 설치: [없음]
✅ 1.3 독립적인 구조: [typography.ts는 독립 모듈, color.ts와 동일한 패턴]
✅ 2.1 Figma 구조 분석 완료
✅ 2.2 package.json 분석 완료
✅ 2.3 폴더 구조 분석 완료
✅ 2.4 전체 검토 완료

## 🎨 구현 결과
- TypeScript (typography.ts):
  - Font families: 2개
  - Font weights: 4개 (Regular, Medium, Semibold, Bold)
  - Font sizes: 11개 (text-xs ~ display-2xl)
  - Line heights: 11개 (text-xs ~ display-2xl)
- CSS Variables (globals.css):
  - Font family variables: 2개
  - Font weight variables: 4개
  - Font size variables: 11개
  - Line height variables: 11개
  - Utility classes: 11개 text styles

## 💡 사용 예시
**TypeScript:**
```typescript
import { fontFamilies, fontSizes, lineHeights } from '@/commons/constants/typography';

const headingStyle = {
  fontFamily: fontFamilies.display,
  fontSize: fontSizes.displayLg,
  lineHeight: lineHeights.displayLg,
};
```

**CSS/Tailwind:**
```tsx
// CSS Variables
<h1 style={{ fontFamily: 'var(--font-family-display)' }}>Hello</h1>

// Utility Classes
<div className="text-lg font-display font-semibold">Hello</div>

// Tailwind arbitrary values
<div className="text-[var(--font-size-display-lg)]">Hello</div>
```
```

---

## 📚 참고사항

### Font Weight 매핑
Figma의 문자열 → CSS 숫자값:
- Regular → 400
- Medium → 500
- Semibold → 600
- Bold → 700

### Font Family Fallback
프로덕션 환경을 고려한 fallback:
- Display: `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- Body: `'Poppins', -apple-system, BlinkMacSystemFont, sans-serif`

### Google Fonts 로딩
**주의**: 이 프롬프트는 Typography Token 정의만 다룹니다. Google Fonts 로딩은 별도로 `layout.tsx` 또는 `_document.tsx`에서 처리해야 합니다.

```typescript
// 예시: layout.tsx에서 Google Fonts 로딩 (별도 작업)
import { DM_Sans, Poppins } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['400', '500', '600', '700'] });
```

---

**작성일**: 2025-11-18
**버전**: 2.0.0 (Typography 전용, Color Token 패턴 기반)
