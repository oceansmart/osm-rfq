# Width Token 구현 프롬프트

> Figma Tokens의 Width 시스템을 TypeScript와 CSS Variables로 변환하여 프로젝트 전반에서 사용 가능하도록 구현

---

## 🚨 CRITICAL RULES

### 적용할 규칙
**반드시 아래 규칙을 먼저 읽고 적용할 것:**
```
@.claude/rules/frontend-common.md
```

---

## 📁 구현 파일 경로

### 수정/생성할 파일 (명시된 파일만):
1. `src/commons/constants/widths.ts` - TypeScript Width Tokens (NEW)
2. `src/app/globals.css` - CSS Variables 추가 (UPDATE - Widths 섹션만)

### 참조할 파일 (읽기 전용):
- `figma-tokens/4. Widths/Mode 1.json` - Width tokens (50줄)
  - 12개 width 값 (xxs ~ 6xl, paragraph-max-width)
  - 320px ~ 1920px

---

## 🎯 핵심 요구사항

### 요구사항 1: Width Tokens TypeScript 변환

```typescript
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
```

### 요구사항 2: CSS Variables

```css
:root {
  --width-xxs: 320px;
  --width-xs: 384px;
  --width-sm: 480px;
  --width-md: 560px;
  --width-lg: 640px;
  --width-xl: 768px;
  --width-2xl: 1024px;
  --width-3xl: 1280px;
  --width-4xl: 1440px;
  --width-5xl: 1600px;
  --width-6xl: 1920px;
  --width-paragraph-max: 720px;
}
```

### 요구사항 3: Utility Classes

```css
@layer utilities {
  .max-w-xs { max-width: var(--width-xs); }
  .max-w-sm { max-width: var(--width-sm); }
  .max-w-md { max-width: var(--width-md); }
  .max-w-lg { max-width: var(--width-lg); }
  .max-w-xl { max-width: var(--width-xl); }
  .max-w-paragraph { max-width: var(--width-paragraph-max); }
}
```

---

## 💡 사용 예시

**TypeScript:**
```typescript
import { widths } from '@/commons/constants/widths';

const containerStyle = {
  maxWidth: widths.lg,
};
```

**CSS/Tailwind:**
```tsx
<div className="max-w-lg">Container</div>
<article className="max-w-paragraph">Long text</article>
<div style={{ maxWidth: 'var(--width-lg)' }}>Box</div>
```

---

**작성일**: 2025-11-18
**버전**: 2.0.0
