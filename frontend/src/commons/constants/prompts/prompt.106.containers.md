# Container Token 구현 프롬프트

> Figma Tokens의 Container 시스템을 TypeScript와 CSS Variables로 변환하여 프로젝트 전반에서 사용 가능하도록 구현

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
1. `src/commons/constants/containers.ts` - TypeScript Container Tokens (NEW)
2. `src/app/globals.css` - CSS Variables 추가 (UPDATE - Containers 섹션만)

### 참조할 파일 (읽기 전용):
- `figma-tokens/5. Containers/Value.json` - Container tokens (14줄)
  - 3개 container 값 (max-width-desktop, padding-desktop, padding-mobile)
  - Responsive container 설정

---

## 🎯 핵심 요구사항

### 요구사항 1: Container Tokens TypeScript 변환

```typescript
export const containers = {
  maxWidthDesktop: 1280,
  paddingDesktop: 32,
  paddingMobile: 16,
} as const;
```

### 요구사항 2: CSS Variables

```css
:root {
  --container-max-width-desktop: 1280px;
  --container-padding-desktop: 32px;
  --container-padding-mobile: 16px;
}
```

### 요구사항 3: Container Utility Class

```css
@layer utilities {
  .container-responsive {
    max-width: var(--container-max-width-desktop);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--container-padding-mobile);
    padding-right: var(--container-padding-mobile);
  }

  @media (min-width: 768px) {
    .container-responsive {
      padding-left: var(--container-padding-desktop);
      padding-right: var(--container-padding-desktop);
    }
  }
}
```

---

## 💡 사용 예시

**TypeScript:**
```typescript
import { containers } from '@/commons/constants/containers';

const containerStyle = {
  maxWidth: containers.maxWidthDesktop,
  paddingLeft: containers.paddingMobile,
  paddingRight: containers.paddingMobile,
};
```

**CSS/Tailwind:**
```tsx
<div className="container-responsive">
  <h1>Page Title</h1>
  <p>Content with responsive padding</p>
</div>
```

---

**작성일**: 2025-11-18
**버전**: 2.0.0
