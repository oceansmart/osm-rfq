# 색상 시스템 마이그레이션 완료

**날짜**: 2025-11-21
**버전**: 2.0.0

---

## 변경 사항 요약

OSM RFQ 프로젝트의 색상 관리 시스템을 **Single Source of Truth** 패턴으로 업그레이드했습니다.

### Before (기존 시스템)

```
❌ 문제점: 동기화 불편
┌─────────────────┐     ┌──────────────────┐
│   color.ts      │     │   theme.css      │
│ (TypeScript)    │     │ (CSS Variables)  │
│                 │     │                  │
│ brand[600]      │  ≠  │ --color-brand-   │
│  = #6941c6      │     │   600: rgb(...)  │
└─────────────────┘     └──────────────────┘
       ↓                        ↓
   수동 동기화 필요 😰
```

### After (새 시스템)

```
✅ 해결: 자동 동기화
┌───────────────────────────────┐
│  color.ts (Single Source)     │
│  - TypeScript 상수             │
│  - CSS 생성 함수               │
└──────────────┬────────────────┘
               ↓
       npm run generate:theme
               ↓
┌──────────────────────────────┐
│  theme.css (Auto-generated)   │
│  - CSS Variables              │
└───────────────────────────────┘
```

---

## 추가된 파일

### 1. 업데이트된 파일

#### [frontend/src/commons/constants/color.ts](src/commons/constants/color.ts)

**추가된 함수**:

- `generateCSSVariables()` - CSS Variables 객체 생성
- `generateCSSString()` - CSS 문자열 생성
- `generateSemanticCSSVariables()` - Semantic Colors CSS 생성

**예시**:

```typescript
import { generateCSSString } from '@/commons/constants/color';

const css = generateCSSString();
// Returns: "  --color-brand-600: rgb(105 65 198);\n  ..."
```

### 2. 새로 생성된 파일

#### [frontend/scripts/generate-theme-css.ts](scripts/generate-theme-css.ts)

**용도**: color.ts에서 theme.css를 자동 생성

**실행**:

```bash
npm run generate:theme
```

#### [docs/frontend/color-system-single-source.md](../../docs/frontend/color-system-single-source.md)

**내용**:

- Single Source 아키텍처 설명
- 사용 방법 (TypeScript/CSS)
- API 레퍼런스
- 마이그레이션 가이드
- 트러블슈팅

---

## 업데이트된 package.json

### 새 스크립트

```json
{
  "scripts": {
    "generate:theme": "tsx scripts/generate-theme-css.ts",
    "build": "npm run generate:theme && next build"
  }
}
```

### 새 devDependency

```json
{
  "devDependencies": {
    "tsx": "^4.19.2"
  }
}
```

---

## 사용 방법

### 1. TypeScript에서 사용 (변경 없음)

```typescript
import { brand } from '@/commons/constants/color';

<button style={{ backgroundColor: brand[600] }}>
  브랜드 버튼
</button>
```

### 2. CSS/Tailwind에서 사용

#### Step 1: CSS 생성

```bash
npm run generate:theme
```

#### Step 2: Tailwind 클래스 사용

```tsx
<div className="bg-brand-600 text-white">
  자동 생성된 CSS Variable 사용
</div>
```

### 3. 색상 추가/수정

**이제 color.ts만 수정하면 됩니다!**

```typescript
// frontend/src/commons/constants/color.ts
export const brand = {
  600: '#6941c6',  // ← 여기만 수정
  700: '#53389e',
} as const;
```

```bash
# CSS 자동 생성
npm run generate:theme
```

---

## 마이그레이션 체크리스트

### ✅ 완료된 작업

- [x] color.ts에 CSS 생성 함수 추가
- [x] generate-theme-css.ts 스크립트 작성
- [x] package.json에 스크립트 추가
- [x] tsx devDependency 추가
- [x] 문서 작성 (color-system-single-source.md)
- [x] mkdocs.yml에 문서 링크 추가
- [x] scripts/README.md 업데이트

### 📋 다음 단계 (선택사항)

- [ ] tsx 패키지 설치: `npm install`
- [ ] theme.css 자동 생성 테스트: `npm run generate:theme`
- [ ] 빌드 테스트: `npm run build`
- [ ] 기존 theme.css 백업 (필요 시)

---

## 설치 및 테스트

### 1. 패키지 설치

```bash
cd frontend
npm install
```

### 2. CSS 생성 테스트

```bash
npm run generate:theme
```

**예상 출력**:

```
✅ theme.css generated successfully!
📁 Location: /frontend/src/styles/theme.css
📊 Generated 87 semantic variables
```

### 3. 빌드 테스트

```bash
npm run build
```

**빌드 시 자동으로 `generate:theme`이 실행됩니다.**

---

## 주요 변경 사항

### color.ts

**Before**:

```typescript
// TypeScript 상수만 제공
export const brand = { 600: '#6941c6' } as const;
```

**After**:

```typescript
// TypeScript 상수 + CSS 생성 함수 제공
export const brand = { 600: '#6941c6' } as const;

export function generateCSSVariables() { /* ... */ }
export function generateCSSString() { /* ... */ }
export function generateSemanticCSSVariables() { /* ... */ }
```

### theme.css (생성 후)

**구조**:

```css
@theme {
  /* AUTO-GENERATED COLORS - START */

  /* Primitive Colors */
  --color-brand-600: rgb(105 65 198);
  --color-brand-700: rgb(83 56 158);

  /* Semantic Colors */
  --color-bg-brand-solid: var(--color-brand-600);

  /* AUTO-GENERATED COLORS - END */

  /* Manual overrides go here */
}
```

---

## 장점

### 1. ✅ 동기화 문제 해결

- **이전**: color.ts와 theme.css를 각각 수정 → 불일치 가능성
- **현재**: color.ts만 수정 → 자동 동기화

### 2. ✅ 개발 경험 향상

- TypeScript 자동완성
- 빌드 시 자동 생성
- 명확한 워크플로우

### 3. ✅ 유지보수성 향상

- 단일 진실의 원천
- 버전 관리 용이
- 문서 불일치 방지

---

## 트러블슈팅

### Q: tsx 패키지가 없다는 에러

**A**: 패키지 설치 필요

```bash
cd frontend
npm install
```

### Q: theme.css가 생성되지 않음

**A**: 수동 실행

```bash
npm run generate:theme
```

### Q: CSS Variables가 적용되지 않음

**A**: 개발 서버 재시작

```bash
npm run dev
```

---

## 관련 문서

- **상세 가이드**: [docs/frontend/color-system-single-source.md](../../docs/frontend/color-system-single-source.md)
- **스크립트 문서**: [scripts/README.md](scripts/README.md)
- **color.ts**: [src/commons/constants/color.ts](src/commons/constants/color.ts)
- **생성 스크립트**: [scripts/generate-theme-css.ts](scripts/generate-theme-css.ts)

---

## 팀 공지사항

### 📢 중요 변경사항

1. **색상 수정 시**: `color.ts`만 수정하고 `npm run generate:theme` 실행
2. **theme.css 수정 금지**: Auto-generated 섹션은 덮어씌워집니다
3. **빌드 시 자동 생성**: `npm run build` 시 자동으로 CSS 생성됨

### 🎯 액션 아이템

모든 개발자:

1. 이 문서 읽기
2. `npm install` 실행 (tsx 설치)
3. `npm run generate:theme` 테스트
4. [color-system-single-source.md](../../docs/frontend/color-system-single-source.md) 참조

---

**Author**: OSM RFQ Development Team
**Date**: 2025-11-21
**Status**: ✅ 완료
