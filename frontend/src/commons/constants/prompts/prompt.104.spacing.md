# Spacing Token 구현 프롬프트

> Figma Tokens의 Spacing 시스템을 TypeScript와 CSS Variables로 변환하여 프로젝트 전반에서 사용 가능하도록 구현

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
1. `src/commons/constants/spacing.ts` - TypeScript Spacing Tokens (NEW)
2. `src/app/globals.css` - CSS Variables 추가 (UPDATE - Spacing 섹션만)

### 참조할 파일 (읽기 전용):
- `figma-tokens/3. Spacing/Mode 1.json` - Spacing tokens (70줄)
  - 17개 spacing 값 (none, xxs ~ 11xl)
  - 0px ~ 160px

---

## 🎯 핵심 요구사항

### 요구사항 1: Spacing Tokens TypeScript 변환

```typescript
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
```

### 요구사항 2: CSS Variables

```css
:root {
  --spacing-none: 0px;
  --spacing-xxs: 2px;
  --spacing-xs: 4px;
  --spacing-sm: 6px;
  --spacing-md: 8px;
  --spacing-lg: 12px;
  --spacing-xl: 16px;
  --spacing-2xl: 20px;
  --spacing-3xl: 24px;
  --spacing-4xl: 32px;
  --spacing-5xl: 40px;
  --spacing-6xl: 48px;
  --spacing-7xl: 64px;
  --spacing-8xl: 80px;
  --spacing-9xl: 96px;
  --spacing-10xl: 128px;
  --spacing-11xl: 160px;
}
```

### 요구사항 3: Utility Classes

```css
@layer utilities {
  .p-none { padding: var(--spacing-none); }
  .p-sm { padding: var(--spacing-sm); }
  .p-md { padding: var(--spacing-md); }
  .p-lg { padding: var(--spacing-lg); }
  .m-sm { margin: var(--spacing-sm); }
  .m-md { margin: var(--spacing-md); }
  .m-lg { margin: var(--spacing-lg); }
  .gap-sm { gap: var(--spacing-sm); }
  .gap-md { gap: var(--spacing-md); }
  .gap-lg { gap: var(--spacing-lg); }
}
```

---

## 💡 사용 예시

**TypeScript:**
```typescript
import { spacing } from '@/commons/constants/spacing';

const containerStyle = {
  padding: spacing.lg,
  margin: spacing.md,
};
```

**CSS/Tailwind:**
```tsx
<div className="p-lg m-md gap-sm">Content</div>
<div style={{ padding: 'var(--spacing-lg)' }}>Box</div>
```

---

**작성일**: 2025-11-18
**버전**: 2.0.0
