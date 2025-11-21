# OSM RFQ CSS Styling Rules

> Ocean Smart (OSM) 프로젝트 CSS 스타일링 표준 규칙
>
> **Version**: 2.0.0
> **Last Updated**: 2025-11-22
> **Status**: ✅ Active
> **Purpose**: 엄격한 스타일 규칙으로 코드의 일관성과 유지보수성 확보

---

## 📋 목차

1. [핵심 원칙 (MUST)](#핵심-원칙-must)
2. [CSS 방법론 및 제약사항](#css-방법론-및-제약사항)
3. [글로벌 CSS 관리](#글로벌-css-관리)
4. [CSS Modules 규칙 (Primary)](#css-modules-규칙-primary)
5. [Tailwind CSS 활용 (Secondary)](#tailwind-css-활용-secondary)
6. [Design Tokens 기반 스타일링](#design-tokens-기반-스타일링)
7. [레이아웃 구현 원칙](#레이아웃-구현-원칙)
8. [컴포넌트별 스타일링 패턴](#컴포넌트별-스타일링-패턴)
9. [Figma 디자인 구현](#figma-디자인-구현)
10. [반응형 디자인](#반응형-디자인)
11. [애니메이션 및 트랜지션](#애니메이션-및-트랜지션)
12. [절대 금지 사항 (NEVER)](#절대-금지-사항-never)
13. [체크리스트](#체크리스트)

---

## 🔥 핵심 원칙 (MUST)

### 1. 명시된 파일만 수정

```typescript
// ✅ MUST: 명시된 파일만 수정
// 작업 지시: src/commons/layout/index.tsx, styles.module.css 수정
// → 이 두 파일만 수정

// ❌ NEVER: 명시되지 않은 파일 수정
// → globals.css 수정 금지 (명시되지 않음)
// → tailwind.config.ts 수정 금지 (명시되지 않음)
// → 새 파일 생성 금지 (명시되지 않음)
```

### 2. 독립적인 부품의 조립 형태

```typescript
// ✅ MUST: 독립적인 컴포넌트 조립
import Button from '@/commons/components/button';
import { useNavigation } from './hooks/index.link.routing.hook';

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <Button variant="primary">Click</Button>
        </div>
    );
}

// ❌ NEVER: 모놀리식 구조
export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            {/* 버튼 인라인 구현 - 금지 */}
            <button style={{ padding: '8px', background: 'blue' }}>Click</button>
        </div>
    );
}
```

### 3. Step-by-Step 분석 및 구현

**MUST 따라야 할 순서:**

1. **피그마 구조 분석** (Figma 제공 시)
2. **package.json 분석** (사용 가능한 라이브러리 확인)
3. **폴더/라우터 구조 분석**
4. **HTML/CSS 레이아웃 뼈대 분석**
5. **구현**
6. **전체 검토 및 디테일 수정**

### 4. 명시하지 않은 라이브러리 설치 금지

```bash
# ❌ NEVER: 명시되지 않은 라이브러리 설치
npm install jest
npm install styled-components
npm install @emotion/react

# ✅ MUST: 이미 설치된 라이브러리만 사용
# package.json에 있는 것만 사용
```

---

## 🎨 CSS 방법론 및 제약사항

### 기본 원칙 (하이브리드 아키텍처)

OSM RFQ 프로젝트는 **레이어별로 최적화된 CSS 방법론**을 사용합니다:

#### 1️⃣ Layout & Page 레이어 (CSS Modules - PRIMARY)

**적용 대상:**
- ✅ `commons/layout/` - 전체 레이아웃 구조
- ✅ `app/**/page.tsx` - 페이지 컴포넌트
- ✅ Header, Footer, Sidebar 등 주요 섹션

**사용 이유:**
- 복수 프레임 구조의 명확한 영역 구분
- Flexbox 중첩 구조를 주석으로 설명
- 정확한 픽셀 수치 반영 (예: 1168 * 60)
- 일관된 레이아웃 패턴 유지

**파일 구조:**
```plaintext
commons/layout/
├── index.tsx
└── styles.module.css  # CSS Modules

app/rfq/
├── page.tsx
└── styles.module.css  # CSS Modules
```

#### 2️⃣ Component 레이어 (Tailwind CSS - PRIMARY)

**적용 대상:**
- ✅ `commons/components/**` - 공통 컴포넌트 (Button, Input, Badge, Tabs 등)
- ✅ 재사용 가능한 UI 조각
- ✅ Variant 기반 스타일링이 필요한 컴포넌트

**사용 이유:**
- Variant 기반 조건부 스타일링에 최적화
- 동적 클래스 조합 관리 용이 (cx 유틸리티)
- 빠른 프로토타이핑 및 반복 작업
- 기존 50+ 컴포넌트 자산 활용

**파일 구조:**
```plaintext
commons/components/button/
└── index.tsx  # Tailwind CSS만 사용

commons/components/tabs/
└── index.tsx  # Tailwind CSS만 사용
```

#### 3️⃣ Design Tokens (REQUIRED - 모든 레이어)

**적용 대상:**
- ✅ CSS Modules 내부: `var(--spacing-lg)`, `var(--color-primary)`
- ✅ Tailwind 클래스: `p-lg`, `text-primary`
- ✅ 모든 컴포넌트 및 페이지

**금지 사항:**
- ❌ 하드코딩된 값 사용 금지 (`padding: 12px` ❌)
- ❌ 직접 색상 코드 사용 금지 (`color: #3A5CF3` ❌)

### 필수 제약사항

```typescript
// ❌ 절대 금지 사항
:global { }          // CSS Modules에서 :global 키워드 사용 금지
:root { }            // 개별 컴포넌트에서 :root 사용 금지
!important           // !important 키워드 사용 금지
position: absolute   // position: absolute 사용 금지 (Flexbox 권장)
position: fixed      // position: fixed 사용 지양 (특별한 경우 예외)
```

**이유:**
- `:global`: 스타일 격리 원칙 위반, 예상치 못한 부작용 발생
- `:root`: 글로벌 변수 오염, Design Token 시스템과 충돌
- `!important`: 특정성 전쟁 유발, 유지보수 어려움
- `position: absolute`: 반응형 레이아웃에서 예측 불가능한 동작

---

## 📁 글로벌 CSS 관리

### 글로벌 CSS 경로

```plaintext
frontend/src/styles/
├── globals.css              # 글로벌 스타일 진입점
├── theme.css                # Design Tokens (자동 생성)
└── typography.css           # 타이포그래피 유틸리티
```

### globals.css 사용 원칙

**✅ 변경 가능한 경우:**
- 프로젝트 전역에 영향을 주는 스타일
- HTML/body 기본 설정
- 브라우저 초기화 스타일
- 전역 유틸리티 클래스

**❌ 변경 금지 사항:**
- 개별 컴포넌트를 위한 스타일 추가
- 특정 페이지만을 위한 스타일
- Design Token 직접 수정 (theme.css는 자동 생성됨)

### globals.css 구조

```css
/* frontend/src/styles/globals.css */

/* 1. Tailwind CSS 및 플러그인 */
@import "tailwindcss";
@import "./theme.css";
@import "./typography.css";

@plugin "@tailwindcss/typography";
@plugin "tailwindcss-react-aria-components";
@plugin "tailwindcss-animate";

/* 2. 커스텀 변형 (variants) */
@custom-variant dark (&:where(.dark-mode, .dark-mode *));
@custom-variant label (& [data-label]);
@custom-variant focus-input-within (&:has(input:focus));

/* 3. 전역 유틸리티 */
@utility scrollbar-hide {
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* 4. 기본 HTML 스타일 */
html,
body {
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* 5. 브라우저 기본 스타일 재설정 */
details summary::-webkit-details-marker {
    display: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
```

---

## 🧩 CSS Modules 규칙 (Primary)

### 파일 명명 규칙

```plaintext
components/button/
├── index.tsx                    # 컴포넌트
└── styles.module.css            # CSS Modules (PRIMARY 방식)
```

**중요:**
- **Layout/Page 레벨**: CSS Modules를 우선 사용합니다.
- **Component 레벨**: Tailwind CSS를 우선 사용합니다. (기존 컴포넌트 유지)

### CSS Modules 작성 규칙

**✅ 올바른 CSS Modules 패턴 (Reference 기반)**

```css
/* styles.module.css */

/* 1. Layout Container */
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

/* 2. Header: 1168 * 60 */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1168px;
    height: 60px;
}

/* 3. Design Token 사용 (필수) */
.logo {
    display: flex;
    align-items: center;
    width: 120px;
    height: 40px;
    cursor: pointer;
}

.logoText {
    font-family: var(--typo-title01-font-family);
    font-weight: var(--typo-title01-font-weight);
    font-size: var(--typo-title01-font-size);
    line-height: var(--typo-title01-line-height);
    color: var(--gray-black);
    letter-spacing: -0.18px;
}

/* 4. Gap 영역 (명시적 높이) */
.gap {
    display: flex;
    width: 100%;
    max-width: 1168px;
    height: 24px;
}

/* 5. Banner: 1168 * 240 */
.banner {
    display: flex;
    width: 100%;
    max-width: 1168px;
    height: 240px;
    background-color: var(--gray-20);
    border-radius: 24px;
    overflow: hidden;
}

.bannerImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

**❌ 잘못된 CSS Modules 사용**

```css
/* ❌ NEVER: :global 사용 */
:global(.my-class) {
    color: red;
}

/* ❌ NEVER: :root 사용 */
:root {
    --custom-color: red;
}

/* ❌ NEVER: position: absolute */
.container {
    position: absolute !important;
    top: 0;
    left: 0;
}

/* ❌ NEVER: 하드코딩된 값 */
.header {
    padding: 12px;  /* var(--spacing-lg) 사용해야 함 */
    color: #3A5CF3;  /* var(--color-blue-60) 사용해야 함 */
}
```

### TypeScript에서 CSS Modules 사용

```typescript
// ✅ MUST: CSS Modules import (Reference 패턴)
import styles from './styles.module.css';

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout} data-testid="layout">
            <header className={styles.header} data-testid="layout-header">
                <div className={styles.logo}>
                    <span className={styles.logoText}>Ocean Smart</span>
                </div>
            </header>
            <div className={styles.gap} />
            <main className={styles.children}>{children}</main>
        </div>
    );
}

// ❌ NEVER: Tailwind 인라인 클래스 (CSS Modules가 우선)
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col items-center w-full">  {/* 금지 */}
            <header className="flex items-center justify-between">  {/* 금지 */}
                <span className="text-xl font-bold">Ocean Smart</span>
            </header>
        </div>
    );
}
```

### CSS Modules 네이밍 규칙

```css
/* ✅ MUST: 의미론적 네이밍 */
.layout          /* 전체 레이아웃 컨테이너 */
.header          /* 헤더 영역 */
.logo            /* 로고 영역 */
.logoText        /* 로고 텍스트 (camelCase) */
.gap             /* 간격 영역 */
.banner          /* 배너 영역 */
.bannerImage     /* 배너 이미지 (camelCase) */
.navigation      /* 네비게이션 영역 */
.tabContainer    /* 탭 컨테이너 (camelCase) */
.tab             /* 탭 */
.tabActive       /* 활성 탭 (camelCase + 상태) */
.tabText         /* 탭 텍스트 (camelCase) */
.tabTextInactive /* 비활성 탭 텍스트 (camelCase + 상태) */
.children        /* 자식 콘텐츠 영역 */
.footer          /* 푸터 영역 */
.footerContent   /* 푸터 콘텐츠 (camelCase) */
.footerLogo      /* 푸터 로고 (camelCase) */

/* ❌ NEVER: BEM 표기법, kebab-case */
.layout__header           /* BEM 금지 */
.layout-header            /* kebab-case 금지 */
.header-logo-text         /* kebab-case 금지 */
```

---

## 🎯 Tailwind CSS 활용 (Component Layer Primary)

### Tailwind 사용 시점

**Tailwind CSS는 Component 레이어에서 PRIMARY로 사용합니다.**

```typescript
// ✅ MUST: Component 레이어는 Tailwind 사용
// commons/components/button/index.tsx
export const styles = sortCx({
    common: {
        root: [
            "group relative inline-flex h-max cursor-pointer",
            "items-center justify-center whitespace-nowrap",
            "outline-brand transition duration-100 ease-linear",
            "disabled:cursor-not-allowed disabled:text-fg-disabled",
        ].join(" "),
        icon: "pointer-events-none size-5 shrink-0 transition-inherit-all",
    },
    sizes: {
        sm: "gap-1 rounded-lg px-3 py-2 text-sm font-semibold",
        md: "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold",
        lg: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold",
    },
});

export function Button({ size = 'md', variant = 'primary', children }: ButtonProps) {
    return (
        <button className={cx(styles.common.root, styles.sizes[size])}>
            {children}
        </button>
    );
}

// ✅ MUST: Layout/Page 레이어는 CSS Modules 사용
// commons/layout/index.tsx
import styles from './styles.module.css';

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>...</header>
        </div>
    );
}

// ❌ NEVER: Layout/Page에서 Tailwind 사용
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col items-center w-full p-5">  {/* 금지 */}
            <header className="flex items-center justify-between w-full max-w-[1168px] h-[60px]">
                {/* 금지 */}
            </header>
        </div>
    );
}
```

### Tailwind 클래스 병합

**cx 유틸리티 사용 (clsx + tailwind-merge)**

```typescript
// commons/utils/cx.ts
import { cx } from '@/commons/utils/cx';

// ✅ 올바른 클래스 병합
export function Button({ className, ...props }: ButtonProps) {
    return (
        <button
            className={cx(
                'flex items-center gap-2',
                'px-4 py-2',
                'bg-primary text-white',
                'rounded-lg',
                'hover:bg-primary-dark',
                className
            )}
            {...props}
        />
    );
}

// ❌ 잘못된 클래스 병합 (중복 충돌)
export function Button({ className }: ButtonProps) {
    return (
        <button
            className={`px-4 py-2 bg-primary ${className}`}
            // className이 "px-2 bg-red"일 경우 충돌 발생
        />
    );
}
```

### Tailwind 설정 (tailwind.config.ts)

```typescript
// frontend/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/commons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS Variables 기반 컬러 (Design Tokens)
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
export default config;
```

---

## 🎨 Design Tokens 기반 스타일링

### Design Token 시스템 개요

OSM RFQ는 **2-Layer Token Architecture**를 사용합니다:

1. **Primitive Tokens** (원시 토큰): 기본 값 정의
2. **Semantic Tokens** (의미론적 토큰): 용도별 매핑

### Token Flow

```
Figma Design
    ↓
TypeScript Constants (src/commons/constants/*.ts)
    ↓
Auto-generated theme.css (npm run generate:tokens)
    ↓
Tailwind CSS
    ↓
React Components
```

### Primitive Tokens

**파일 위치:**
- `frontend/src/commons/constants/color.ts`
- `frontend/src/commons/constants/spacing.ts`
- `frontend/src/commons/constants/radius.ts`
- `frontend/src/commons/constants/typography.ts`

**예시:**
```typescript
// color.ts
export const colors = {
  white: 'rgb(255 255 255)',
  black: 'rgb(0 0 0)',
  gray50: 'rgb(249 250 251)',
  gray900: 'rgb(17 24 39)',
  blue600: 'rgb(28 100 242)',
} as const;

// spacing.ts
export const spacing = {
  none: '0px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const;
```

### Semantic Tokens (향후 확장)

```css
/* 향후 추가될 Semantic Tokens */
@theme {
  /* Background Colors */
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-gray50);

  /* Text Colors */
  --color-text-primary: var(--color-gray900);
  --color-text-secondary: var(--color-gray600);

  /* Border Colors */
  --color-border-primary: var(--color-gray300);
}

.dark {
  --color-bg-primary: var(--color-gray900);
  --color-bg-secondary: var(--color-gray800);
  --color-text-primary: var(--color-white);
}
```

### Design Token 사용 규칙

```typescript
// ✅ Design Token 사용 (Tailwind 또는 CSS Variables)
<div className="p-lg bg-white border border-gray-200 rounded-lg">
    <p className="text-md text-gray-900">Content</p>
</div>

// ✅ CSS Variables 직접 사용
<div style={{ padding: 'var(--spacing-lg)' }}>
    Content
</div>

// ❌ 하드코딩된 값 사용 금지
<div className="p-[12px] bg-[#FFFFFF]">  {/* 금지 */}
    <p style={{ fontSize: '16px' }}>Content</p>  {/* 금지 */}
</div>
```

### Design Token 생성/수정 워크플로우

```bash
# 1. TypeScript Constants 수정
# frontend/src/commons/constants/color.ts 편집

# 2. theme.css 자동 생성
cd frontend
npm run generate:tokens

# 3. 결과 확인
# frontend/src/styles/theme.css 자동 업데이트됨
```

---

## 📐 레이아웃 구현 원칙

### Flexbox 우선 원칙

**OSM RFQ는 모든 레이아웃을 Flexbox로 구현합니다.**

```typescript
// ✅ Flexbox 레이아웃 (권장)
export function Card() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h2>Title</h2>
                <button>Action</button>
            </div>
            <p>Content</p>
        </div>
    );
}

// ❌ Absolute Positioning (금지)
export function Card() {
    return (
        <div className="relative h-[200px]">
            <h2 className="absolute top-4 left-4">Title</h2>
            <button className="absolute top-4 right-4">Action</button>
            <p className="absolute bottom-4 left-4">Content</p>
        </div>
    );
}
```

**이유:**
- Flexbox는 반응형 디자인에 적합
- 콘텐츠 크기에 따라 자동 조정
- 유지보수 및 수정이 용이
- position: absolute는 특정 화면 크기에서 깨지기 쉬움

### 부모-자식 관계 명확화

```typescript
// ✅ 명확한 부모-자식 관계
export function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white border-b">
                <Logo />
                <Navigation />
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <div className="flex-1 p-6">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="flex items-center justify-center p-4 bg-gray-50">
                <Copyright />
            </footer>
        </div>
    );
}
```

### Grid 사용 (선택적)

CSS Grid는 2차원 레이아웃에만 선택적으로 사용합니다.

```typescript
// ✅ Grid 사용 (카드 그리드)
export function CardGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card />
            <Card />
            <Card />
        </div>
    );
}

// ✅ Flexbox 대안 (동일한 결과)
export function CardGrid() {
    return (
        <div className="flex flex-wrap gap-6">
            <Card className="flex-1 min-w-[300px]" />
            <Card className="flex-1 min-w-[300px]" />
            <Card className="flex-1 min-w-[300px]" />
        </div>
    );
}
```

---

## 🧱 컴포넌트별 스타일링 패턴

### 레이어별 스타일링 전략

#### Layout & Page 레이어 (CSS Modules)

**원칙:**
- CSS Modules 100% 사용
- Flexbox 기반 구조적 레이아웃
- 주석으로 영역 명확히 표시 (예: `/* Header: 1168 * 60 */`)
- Design Tokens를 CSS Variables로 사용

**예시: Layout 컴포넌트**

```typescript
// commons/layout/index.tsx
import styles from './styles.module.css';

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout} data-testid="layout">
            <header className={styles.header} data-testid="layout-header">
                <div className={styles.logo}>
                    <span className={styles.logoText}>Ocean Smart</span>
                </div>
            </header>
            <div className={styles.gap} />
            <main className={styles.children}>{children}</main>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>Footer Content</div>
            </footer>
        </div>
    );
}
```

```css
/* commons/layout/styles.module.css */

/* Layout Container */
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

/* Header: 1168 * 60 */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1168px;
    height: 60px;
}

/* Gap: 1168 * 24 */
.gap {
    display: flex;
    width: 100%;
    max-width: 1168px;
    height: 24px;
}
```

#### Commons Components 스타일링 (Tailwind CSS)

**원칙:**
- Tailwind CSS 100% 활용
- Variant 기반 스타일링 (size, color, disabled 등)
- sortCx 또는 cx 유틸리티로 클래스 병합
- 기존 50+ 컴포넌트 패턴 유지

**예시: Button 컴포넌트**

```typescript
// commons/components/button/index.tsx
import { cx } from '@/commons/utils/cx';

interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function Button({
    size = 'md',
    variant = 'primary',
    disabled = false,
    children,
    className,
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            className={cx(
                // Base styles
                'inline-flex items-center justify-center',
                'font-medium transition-colors',
                'rounded-lg',
                'disabled:opacity-50 disabled:cursor-not-allowed',

                // Size variants
                size === 'sm' && 'px-3 py-1.5 text-sm',
                size === 'md' && 'px-4 py-2 text-md',
                size === 'lg' && 'px-6 py-3 text-lg',

                // Color variants
                variant === 'primary' && [
                    'bg-blue-600 text-white',
                    'hover:bg-blue-700',
                ],
                variant === 'secondary' && [
                    'bg-gray-200 text-gray-900',
                    'hover:bg-gray-300',
                ],
                variant === 'ghost' && [
                    'bg-transparent text-gray-700',
                    'hover:bg-gray-100',
                ],

                // Custom className
                className
            )}
        >
            {children}
        </button>
    );
}
```

### Feature Components 스타일링

**Feature별 컴포넌트는 Commons Components를 조합하여 구현합니다.**

```typescript
// app/rfq/components/rfq-card.tsx
import { Badge } from '@/commons/components/badge';
import { Button } from '@/commons/components/button';

export function RfqCard({ rfq }: { rfq: RfqItem }) {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    {rfq.title}
                </h3>
                <Badge variant={rfq.status === 'active' ? 'success' : 'default'}>
                    {rfq.status}
                </Badge>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-600 line-clamp-3">
                {rfq.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                    Due: {rfq.dueDate}
                </span>
                <Button size="sm" variant="primary">
                    View Details
                </Button>
            </div>
        </div>
    );
}
```

---

## 🎨 Figma 디자인 구현

### 핵심 원칙

**MUST: Figma 디자인이 제공되면 그대로 구현하고, 그 이상 추가하지 않습니다.**

### Figma 구현 규칙

#### 1. 정확한 사이즈 반영

```css
/* ✅ MUST: Figma에서 제공된 수치 그대로 반영 */
/* Figma: Header - 1168 * 60 */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1168px;
    height: 60px;
}

/* Figma: Gap - 1168 * 24 */
.gap {
    display: flex;
    width: 100%;
    max-width: 1168px;
    height: 24px;
}

/* Figma: Banner - 1168 * 240 */
.banner {
    display: flex;
    width: 100%;
    max-width: 1168px;
    height: 240px;
    background-color: var(--gray-20);
    border-radius: 24px;
}

/* ❌ NEVER: 임의로 수치 변경 */
.header {
    height: 70px;  /* Figma는 60px인데 임의로 변경 - 금지 */
}
```

#### 2. Figma 구조 vs HTML/CSS 구조

**MUST: Figma 구조가 잘못되었을 수 있음을 이해하고, 기존 HTML/CSS 구조를 유지합니다.**

```typescript
// ✅ MUST: 기존 HTML/CSS 구조 내부만 채우기
// 이미 만들어진 구조:
export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                {/* Figma 디자인을 이 안에만 채우기 */}
                <div className={styles.logo}>
                    <span className={styles.logoText}>Ocean Smart</span>
                </div>
            </header>
            <div className={styles.gap} />
            <main className={styles.children}>{children}</main>
        </div>
    );
}

// ❌ NEVER: Figma 구조대로 HTML 재구성
export default function Layout({ children }: LayoutProps) {
    return (
        <div>  {/* Figma의 프레임 구조대로 변경 - 금지 */}
            <div>
                <div>
                    <header>...</header>
                </div>
            </div>
        </div>
    );
}
```

#### 3. 아이콘 및 이미지 사용

```typescript
// ✅ MUST: public/ 디렉토리의 아이콘/이미지 사용
// 아이콘: public/icons/*
// 이미지: public/images/*

export function Banner() {
    return (
        <div className={styles.banner}>
            <img
                src="/images/banner.png"
                alt="Banner"
                className={styles.bannerImage}
            />
        </div>
    );
}

// ❌ NEVER: 외부 URL, CDN, 새 파일 생성
<img src="https://cdn.example.com/banner.png" />  {/* 금지 */}
<img src="/new-images/banner.png" />  {/* public/images/ 사용해야 함 */}
```

#### 4. Figma 디자인 토큰 매핑

```css
/* ✅ MUST: Figma 디자인 → CSS Variables 매핑 */

/* Figma: "일기보관함" 텍스트 */
.tabText {
    /* Figma 명세: HEADLINES - headline01 */
    font-family: var(--typo-headline01-font-family);
    font-weight: var(--typo-headline01-font-weight);
    font-size: var(--typo-headline01-font-size);
    line-height: var(--typo-headline01-line-height);

    /* Figma 명세: black color */
    color: var(--gray-black);

    letter-spacing: -0.24px;
}

/* Figma: "사진보관함" 텍스트 (비활성) */
.tabTextInactive {
    font-family: var(--typo-headline01-font-family);
    font-weight: var(--font-weight-medium);
    font-size: var(--typo-headline01-font-size);
    line-height: var(--typo-headline01-line-height);

    /* Figma 명세: gray60 color */
    color: var(--gray-60);

    letter-spacing: -0.24px;
}
```

### Figma 구현 체크리스트

- [ ] Figma 노드 ID 확인 (MCP 사용 시)
- [ ] 모든 사이즈 수치 정확히 반영
- [ ] 기존 HTML/CSS 구조 유지
- [ ] Design Token 매핑 (하드코딩 금지)
- [ ] public/ 디렉토리의 아이콘/이미지 사용
- [ ] Figma에 없는 기능 추가하지 않음

---

## 📱 반응형 디자인

### Breakpoint 시스템

```typescript
// commons/constants/widths.ts
export const breakpoints = {
  xxs: '320px',
  xs: '600px',
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1536px',
} as const;
```

### Tailwind Responsive Utilities

```typescript
// ✅ Tailwind 반응형 클래스
export function ResponsiveLayout() {
    return (
        <div className="
            flex flex-col
            gap-4 sm:gap-6 md:gap-8
            p-4 sm:p-6 md:p-8
            max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl
            mx-auto
        ">
            <h1 className="
                text-xl sm:text-2xl md:text-3xl lg:text-4xl
                font-bold
            ">
                Responsive Title
            </h1>

            {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="
                grid
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                gap-4 md:gap-6
            ">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}
```

### useBreakpoint Hook

```typescript
// commons/hooks/use-breakpoint.ts 사용
import { useBreakpoint } from '@/commons/hooks/use-breakpoint';

export function AdaptiveComponent() {
    const breakpoint = useBreakpoint();

    return (
        <div>
            {breakpoint.isMobile && <MobileView />}
            {breakpoint.isTablet && <TabletView />}
            {breakpoint.isDesktop && <DesktopView />}
        </div>
    );
}
```

---

## 🎬 애니메이션 및 트랜지션

### 원칙

**현재 단계에서는 애니메이션을 추가하지 않습니다.**

```typescript
// ✅ 기본 트랜지션만 사용 (hover, focus)
<button className="bg-blue-600 hover:bg-blue-700 transition-colors">
    Button
</button>

// ❌ 추가 애니메이션 금지
<button className="bg-blue-600 hover:bg-blue-700 animate-pulse animate-bounce">
    Button
</button>
```

**이유:**
- 요구사항에 명시되지 않은 기능 추가 방지
- 과도한 엔지니어링 방지
- 성능 최적화 우선

### 허용되는 트랜지션

```css
/* ✅ 허용: 기본 상태 전환 */
.button {
    transition-property: background-color, border-color, color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
}

/* ✅ Tailwind 단축 */
<div className="transition-colors duration-150" />
```

---

## 🌙 다크모드 지원

### 다크모드 구현 방식

OSM RFQ는 **next-themes**를 사용하여 다크모드를 지원합니다.

```typescript
// commons/providers/next-themes/index.tsx
import { ThemeProvider } from 'next-themes';

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
```

### 다크모드 스타일링

```typescript
// ✅ Tailwind dark: variant
export function Card() {
    return (
        <div className="
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border border-gray-200 dark:border-gray-700
        ">
            Content
        </div>
    );
}

// ✅ CSS Variables (자동 전환)
@theme {
  --color-bg-primary: rgb(255 255 255);
}

.dark {
  --color-bg-primary: rgb(17 24 39);
}
```

---

## 🚫 절대 금지 사항 (NEVER)

### 1. 파일 수정 금지

```bash
# ❌ NEVER: 명시되지 않은 파일 수정
# 작업 지시에 명시된 파일만 수정
# 예: src/commons/layout/index.tsx, styles.module.css

# 금지 목록:
- globals.css 수정 (명시되지 않은 경우)
- tailwind.config.ts 수정 (명시되지 않은 경우)
- package.json 수정 (명시되지 않은 경우)
- 새 파일 생성 (명시되지 않은 경우)
- 다른 컴포넌트 수정 (명시되지 않은 경우)
```

### 2. CSS 절대 금지 사항

```css
/* ❌ NEVER: 절대 금지 키워드 */
:global { }                    /* CSS Modules에서 금지 */
:root { }                      /* 컴포넌트에서 금지 (globals.css만 허용) */
!important                     /* 모든 경우 금지 */
position: absolute             /* Flexbox로 대체 */
position: fixed                /* 특수한 경우 외 금지 */

/* ❌ NEVER: 하드코딩된 값 */
padding: 12px;                 /* var(--spacing-lg) 사용 */
color: #3A5CF3;                /* var(--color-blue-60) 사용 */
font-size: 16px;               /* var(--text-md) 사용 */
width: 1168px;                 /* max-width: 1168px 사용 */

/* ❌ NEVER: BEM, kebab-case */
.layout__header { }            /* camelCase 사용: layoutHeader */
.layout-header { }             /* camelCase 사용: layoutHeader */
```

### 3. React/TypeScript 금지 사항

```typescript
// ❌ NEVER: 인라인 스타일 (하드코딩)
<div style={{ padding: '12px', color: '#3A5CF3' }}>  {/* 금지 */}

// ✅ OK: Design Token 사용 시 허용
<div style={{ padding: 'var(--spacing-lg)' }}>  {/* 허용 */}

// ❌ NEVER: CSS-in-JS 라이브러리
import styled from 'styled-components';  {/* 금지 */}
import { css } from '@emotion/react';    {/* 금지 */}

// ❌ NEVER: Layout/Page에서 Tailwind 사용
<div className="flex flex-col items-center w-full">  {/* Layout은 CSS Modules 사용 */}

// ❌ NEVER: Commons Components에서 CSS Modules 사용
// commons/components/button/styles.module.css 생성 금지
// Commons Components는 Tailwind만 사용

// ❌ NEVER: 임의의 라이브러리 설치
npm install jest  {/* 명시되지 않음 - 금지 */}
```

### 4. 추가 기능 구현 금지

```typescript
// ❌ NEVER: Figma에 없는 기능 추가
// Figma: 기본 버튼만 있음
export function Button() {
    return <button>Click</button>;
}

// 금지: 애니메이션 추가 (Figma에 없음)
export function Button() {
    return (
        <button className="animate-pulse hover:scale-110 transition-transform">
            Click
        </button>
    );
}

// 금지: 추가 변형 구현 (Figma에 없음)
export function Button({ loading }: ButtonProps) {  // loading prop 금지
    return <button>{loading ? 'Loading...' : 'Click'}</button>;
}
```

### 5. 구조 변경 금지

```typescript
// ❌ NEVER: 기존 HTML/CSS 구조 변경
// 기존 구조:
<div className={styles.layout}>
    <header className={styles.header}>...</header>
    <div className={styles.gap} />
    <main className={styles.children}>{children}</main>
</div>

// 금지: 구조 변경
<div className={styles.newLayout}>  {/* 클래스명 변경 금지 */}
    <div className={styles.wrapper}>  {/* 새 wrapper 추가 금지 */}
        <header className={styles.header}>...</header>
    </div>
    {/* gap 제거 금지 */}
    <main className={styles.children}>{children}</main>
</div>
```

---

## ✅ 체크리스트

### 작업 시작 전 (MUST)

- [ ] **명시된 파일만 수정** (다른 파일 수정 금지)
- [ ] **package.json 분석** (사용 가능한 라이브러리 확인)
- [ ] **폴더/라우터 구조 분석** (기존 구조 파악)
- [ ] **HTML/CSS 레이아웃 뼈대 분석** (기존 패턴 이해)
- [ ] **Figma 디자인 분석** (제공된 경우)

### CSS Modules 작성 시

- [ ] **styles.module.css 파일명** 사용
- [ ] **camelCase 클래스명** (BEM, kebab-case 금지)
- [ ] **Design Tokens 사용** (하드코딩 금지)
- [ ] **Flexbox 레이아웃** (position: absolute 금지)
- [ ] **:global, :root, !important 미사용**
- [ ] **부모-자식 관계 명확**
- [ ] **주석으로 영역 설명** (/* Header: 1168 * 60 */)

### TypeScript 컴포넌트 작성 시

- [ ] **import styles from './styles.module.css'**
- [ ] **독립적인 컴포넌트 조립** (모놀리식 구조 금지)
- [ ] **data-testid 추가** (테스트 가능성)
- [ ] **기존 Hook 재사용** (새로 만들지 말고)
- [ ] **Tailwind 최소 사용** (CSS Modules 우선)

### Figma 디자인 구현 시

- [ ] **Figma 수치 정확히 반영** (임의 변경 금지)
- [ ] **기존 HTML/CSS 구조 유지** (Figma 구조 따르지 않음)
- [ ] **Design Token 매핑** (하드코딩 금지)
- [ ] **public/ 디렉토리 아이콘/이미지 사용**
- [ ] **Figma에 없는 기능 추가하지 않음**
- [ ] **애니메이션 추가하지 않음**

### 작업 완료 후 (MUST)

- [ ] **전체 검토** (Step-by-Step)
- [ ] **빠진 부분 확인**
- [ ] **디테일 수정**
- [ ] **체크리스트 결과 반환** (작업 완료 확인)

### globals.css 수정 시 (명시된 경우만)

- [ ] **전역 영향 확인** (개별 컴포넌트용 아닌지)
- [ ] **Design Token 충돌 확인** (theme.css는 자동 생성)
- [ ] **브라우저 초기화만 수정** (컴포넌트 스타일 금지)
- [ ] **문서화** (주석으로 이유 설명)

### Design Token 수정 시 (명시된 경우만)

- [ ] **TypeScript Constants 수정** (src/commons/constants/*.ts)
- [ ] **npm run generate:tokens 실행**
- [ ] **theme.css 자동 생성 확인**
- [ ] **Figma와 동기화** 확인
- [ ] **모든 사용처 영향 검토**

---

## 📚 참고 자료

### 프로젝트 문서
- [CLAUDE.md](/CLAUDE.md) - 프로젝트 전체 가이드
- [osm-naming-convention.md](.claude/rules/osm-naming-convention.md) - 네이밍 규칙
- [design-tokens-single-source.md](/docs/frontend/design-tokens-single-source.md) - Design Token 시스템
- [tailwind.config.ts](/frontend/tailwind.config.ts) - Tailwind 설정

### 외부 문서
- [Tailwind CSS](https://tailwindcss.com/docs)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

**Last Updated**: 2025-11-22
**Maintained By**: Ocean Smart Development Team
