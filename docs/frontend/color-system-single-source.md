# 색상 시스템: Single Source of Truth

**최종 업데이트**: 2025-11-21
**버전**: 2.0.0

---

## 개요

OSM RFQ 프로젝트는 **단일 소스(Single Source of Truth)** 방식으로 색상을 관리합니다. [color.ts](../../frontend/src/commons/constants/color.ts) 파일 하나에서 TypeScript 상수와 CSS Variables를 모두 제공하여 동기화 문제를 해결합니다.

---

## 아키텍처

```
┌─────────────────────────────────────┐
│   color.ts (Single Source)          │
│   - TypeScript 상수                  │
│   - CSS 생성 함수                    │
└──────────────┬──────────────────────┘
               │
               ├──> TypeScript/React에서 직접 사용
               │
               └──> generate:theme 스크립트
                         ↓
                   theme.css (Auto-generated)
                         ↓
                   Tailwind CSS 클래스
```

---

## 1. TypeScript에서 사용

### Primitive Colors

```typescript
import { brand, grayBlue } from '@/commons/constants/color';

// 인라인 스타일
<button style={{ backgroundColor: brand[600] }}>
  OSM 브랜드 버튼
</button>

// 조건부 색상
const bgColor = isActive ? brand[600] : grayBlue[800];
```

### Semantic Colors

```typescript
import { lightMode, darkMode } from '@/commons/constants/color';

// Light mode
<p style={{ color: lightMode.text.primary }}>
  주요 텍스트
</p>

// Dark mode 지원
const colors = isDarkMode ? darkMode : lightMode;
<div style={{ backgroundColor: colors.background.brandSolid }}>
  브랜드 배경
</div>
```

---

## 2. CSS/Tailwind에서 사용

### CSS Variables 자동 생성

```bash
# theme.css 자동 생성
npm run generate:theme

# 빌드 시 자동 실행
npm run build
```

### Tailwind 클래스 사용

```tsx
// Primitive colors
<div className="bg-brand-600 text-white">
  브랜드 배경
</div>

// Semantic colors (theme.css 생성 후)
<button className="bg-brand-solid hover:bg-brand-solid-hover">
  브랜드 버튼
</button>
```

### CSS Variables 직접 사용

```css
.custom-element {
  background-color: var(--color-brand-600);
  color: var(--color-text-primary);
}
```

---

## 3. 색상 추가/수정 방법

### ✅ 올바른 방법 (Single Source)

**1단계**: [color.ts](../../frontend/src/commons/constants/color.ts) 수정

```typescript
// frontend/src/commons/constants/color.ts
export const brand = {
  600: '#6941c6',  // ← 여기만 수정
  700: '#53389e',
  800: '#42307d',
} as const;
```

**2단계**: CSS 자동 생성

```bash
npm run generate:theme
```

**완료!** TypeScript와 CSS 모두 자동으로 동기화됩니다.

---

### ❌ 잘못된 방법

```typescript
// ❌ theme.css를 직접 수정하지 마세요!
// Auto-generated 섹션은 덮어씌워집니다.

@theme {
  --color-brand-600: rgb(105 65 198); /* ← 수정하지 마세요 */
}
```

---

## 4. 빌드 워크플로우

### 개발 모드

```bash
npm run dev
# theme.css는 수동으로 생성 필요
# color.ts만 수정하고 TypeScript에서 사용
```

### 프로덕션 빌드

```bash
npm run build
# 1. npm run generate:theme 자동 실행
# 2. theme.css 생성
# 3. next build
```

### 수동 CSS 생성

```bash
npm run generate:theme
```

---

## 5. 생성된 theme.css 구조

```css
@theme {
  /* AUTO-GENERATED COLORS - START */

  /* Primitive Colors */
  --color-white: rgb(255 255 255);
  --color-black: rgb(0 0 0);
  --color-brand-600: rgb(105 65 198);
  --color-brand-700: rgb(83 56 158);
  --color-gray-blue-800: rgb(41 48 86);

  /* Semantic Colors - Light Mode */
  --color-text-primary: var(--color-gray-900);
  --color-bg-brand-solid: var(--color-brand-600);

  /* AUTO-GENERATED COLORS - END */

  /* Manual overrides can go here */
}
```

---

## 6. API 레퍼런스

### 색상 상수

```typescript
// Primitive Colors
import {
  brand,      // 브랜드 색상 (보라색)
  grayBlue,   // 회색-청색
  error,      // 에러 색상
  warning,    // 경고 색상
  success     // 성공 색상
} from '@/commons/constants/color';
```

### CSS 생성 함수

```typescript
import {
  generateCSSVariables,         // CSS Variables 객체 반환
  generateCSSString,            // CSS 문자열 반환
  generateSemanticCSSVariables  // Semantic CSS 반환
} from '@/commons/constants/color';

// 예시
const cssVars = generateCSSVariables();
// { '--color-brand-600': 'rgb(105 65 198)', ... }

const cssString = generateCSSString();
// '  --color-brand-600: rgb(105 65 198);\n  --color-brand-700: ...'
```

### 헬퍼 함수

```typescript
import {
  getSemanticColors,    // Light/Dark mode 색상 반환
  getPrimitiveColor     // Primitive color 조회
} from '@/commons/constants/color';

// 예시
const colors = getSemanticColors(isDarkMode);
const brandColor = getPrimitiveColor(brand, 600);
```

---

## 7. 마이그레이션 가이드

### 기존 코드 → 새 시스템

**Before (Old System)**:

```typescript
// ❌ theme.css와 color.ts 따로 관리
import { brand } from '@/commons/constants/color';

// theme.css
@theme {
  --color-brand-600: rgb(105 65 198); // 수동 동기화 필요
}
```

**After (New System)**:

```typescript
// ✅ color.ts만 수정
export const brand = {
  600: '#6941c6',  // 한 곳에서만 관리
} as const;

// npm run generate:theme 실행
// → theme.css 자동 생성
```

---

## 8. 트러블슈팅

### CSS Variables가 적용되지 않음

**문제**: Tailwind 클래스가 작동하지 않음

**해결**:

```bash
# 1. theme.css 재생성
npm run generate:theme

# 2. 개발 서버 재시작
npm run dev
```

### 색상이 동기화되지 않음

**문제**: TypeScript 값과 CSS 값이 다름

**원인**: theme.css를 직접 수정함

**해결**:

1. [color.ts](../../frontend/src/commons/constants/color.ts)만 수정
2. `npm run generate:theme` 실행
3. Auto-generated 섹션 외부에 커스텀 추가

---

## 9. 장점

### ✅ 동기화 문제 해결

- **단일 소스**: color.ts 하나만 수정
- **자동 생성**: theme.css 자동 업데이트
- **일관성 보장**: TypeScript와 CSS 항상 동기화

### ✅ 개발 경험 향상

- **타입 안전성**: TypeScript 자동완성
- **빌드 자동화**: 빌드 시 자동 생성
- **명확한 워크플로우**: 수정 → 생성 → 커밋

### ✅ 유지보수성

- **단일 진실의 원천**: 색상 정의 한 곳에만
- **문서화**: 자동 생성으로 문서 불일치 방지
- **버전 관리**: Git으로 변경 이력 추적

---

## 10. 주의사항

### ⚠️ Auto-generated 섹션 수정 금지

```css
/* AUTO-GENERATED COLORS - START */
/* 이 섹션은 수동으로 수정하지 마세요! */
/* generate:theme 스크립트가 덮어씁니다 */
/* AUTO-GENERATED COLORS - END */
```

### ⚠️ 커스텀 CSS는 별도 섹션에

```css
@theme {
  /* AUTO-GENERATED COLORS - START */
  /* ... 자동 생성 */
  /* AUTO-GENERATED COLORS - END */

  /* Manual Overrides - 여기에 커스텀 CSS 추가 */
  --custom-brand-gradient: linear-gradient(90deg, ...);
}
```

---

## 11. 관련 파일

- **Single Source**: [frontend/src/commons/constants/color.ts](../../frontend/src/commons/constants/color.ts)
- **생성 스크립트**: [frontend/scripts/generate-theme-css.ts](../../frontend/scripts/generate-theme-css.ts)
- **생성된 CSS**: [frontend/src/styles/theme.css](../../frontend/src/styles/theme.css)
- **Package Scripts**: [frontend/package.json](../../frontend/package.json)

---

## 12. FAQ

### Q: 새 색상 팔레트를 추가하려면?

**A**: color.ts에 추가 후 generate:theme 실행

```typescript
// color.ts
export const customPalette = {
  600: '#ff5733',
  700: '#cc4629',
} as const;

// primitiveColors에 추가
export const primitiveColors = {
  // ... 기존
  customPalette,
} as const;
```

```bash
npm run generate:theme
```

### Q: Dark mode 색상을 수정하려면?

**A**: color.ts의 darkMode 객체 수정

```typescript
export const darkMode = {
  text: {
    primary: grayDark[50],  // ← 여기 수정
  },
} as const;
```

### Q: Figma tokens와 연동하려면?

**A**: Figma tokens JSON → color.ts로 변환 스크립트 작성 필요 (향후 계획)

---

**Maintainer**: OSM RFQ Development Team
**Last Updated**: 2025-11-21
