# Radius Token 구현 프롬프트

> Figma Tokens의 Border Radius 시스템을 TypeScript와 CSS Variables로 변환하여 프로젝트 전반에서 사용 가능하도록 구현

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
1. `src/commons/constants/radius.ts` - TypeScript Radius Tokens (NEW)
2. `src/app/globals.css` - CSS Variables 추가 (UPDATE - Radius 섹션만)

### 참조할 파일 (읽기 전용):
- `figma-tokens/2. Radius/Mode 1.json` - Radius tokens (46줄)
  - 11개 radius 값 (none, xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full)
  - 0px ~ 9999px (full = border-radius: 50%)

---

## 🎯 핵심 요구사항

### 요구사항 1: Radius Tokens TypeScript 변환

```typescript
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
```

### 요구사항 2: CSS Variables

```css
:root {
  --radius-none: 0px;
  --radius-xxs: 2px;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-3xl: 20px;
  --radius-4xl: 24px;
  --radius-full: 9999px;
}
```

### 요구사항 3: Utility Classes

```css
@layer utilities {
  .rounded-none { border-radius: var(--radius-none); }
  .rounded-sm { border-radius: var(--radius-sm); }
  .rounded-md { border-radius: var(--radius-md); }
  .rounded-lg { border-radius: var(--radius-lg); }
  .rounded-full { border-radius: var(--radius-full); }
}
```

---

## 💡 사용 예시

**TypeScript:**
```typescript
import { radius } from '@/commons/constants/radius';

const cardStyle = {
  borderRadius: radius.lg,
};
```

**CSS/Tailwind:**
```tsx
<div className="rounded-lg">Card</div>
<div style={{ borderRadius: 'var(--radius-md)' }}>Box</div>
```

---

**작성일**: 2025-11-18
**버전**: 2.0.0
