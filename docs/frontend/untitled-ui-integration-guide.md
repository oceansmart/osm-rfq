# OSM RFQ 프로젝트 Untitled UI 통합 가이드

> **Reference 프로젝트(`challenge-02`)처럼 `commons/components/` 구조로 Untitled UI 컴포넌트 사용하기**

---

## 📊 현재 상황 분석

### Reference 프로젝트 (challenge-02) 구조

```
src/commons/components/
├── button/
│   ├── index.tsx                    # React 컴포넌트
│   ├── styles.module.css            # CSS Modules 스타일
│   ├── index.stories.tsx            # Storybook
│   └── prompts/
│       └── prompt.101.button.md
├── input/
├── modal/
├── pagination/
├── searchbar/
├── selectbox/
└── toggle/
```

**스타일링 방식**: CSS Modules (`.module.css`)

### OSM RFQ 프로젝트 (현재)

```
src/commons/
├── providers/              ✅ 완성
│   ├── react-query/       # 서버 상태 관리
│   ├── next-themes/       # 테마 관리
│   └── modal/             # 모달 관리
├── constants/              ✅ 완성
│   └── url.ts             # 라우팅 상수
├── utils/                  🚀 추가 예정
│   └── cx.ts              # Tailwind 병합 유틸리티
└── components/             🚀 추가 예정
    ├── button/
    ├── input/
    └── modal/
```

**스타일링 방식**: Tailwind CSS (더 현대적!)

### 주요 차이점

| 항목 | Reference | OSM RFQ | 비고 |
|------|-----------|---------|------|
| **스타일링** | CSS Modules | Tailwind CSS | ✅ Tailwind가 더 효율적 |
| **Provider** | 4개 (Auth, Query, Theme, Modal) | 3개 (Query, Theme, Modal) | ✅ Auth는 추후 추가 |
| **Design Tokens** | CSS Variables | CSS Variables | ✅ 동일 |
| **컴포넌트 수** | 7개 | 0개 → 7개+ 예정 | 🚀 구현 필요 |

---

## 🎯 통합 전략

### 왜 Untitled UI인가?

1. **1,325+ 프리미엄 컴포넌트** - Reference의 7개보다 훨씬 많음
2. **Tailwind CSS 기반** - OSM RFQ와 완벽 호환
3. **접근성 우선** - React Aria 기반 WCAG 준수
4. **소스 코드 소유** - npm 의존성 없음, 완전한 커스터마이징
5. **Copy & Paste** - 필요한 컴포넌트만 선택적으로 추가

### Reference 패턴 유지 전략

✅ **유지할 것**:
- `commons/components/` 디렉토리 구조
- `index.tsx` 파일 네이밍
- `index.stories.tsx` Storybook 패턴
- `prompts/` 디렉토리 구조
- Props 인터페이스 구조 (variant, size, theme)

❌ **변경할 것**:
- CSS Modules → Tailwind CSS
- 클래스 배열 조합 → `cx()` 유틸리티

---

## 📦 1단계: 필수 패키지 설치

### 1.1 Core 패키지

```bash
cd /Users/kimjongwook/project/osm-rfq/frontend

# Tailwind 클래스 병합 유틸리티 (필수)
npm install clsx tailwind-merge

# React Aria 접근성 컴포넌트 (권장)
npm install react-aria-components

# Tailwind 플러그인 (선택)
npm install tailwindcss-animate tailwindcss-react-aria-components

# Untitled UI 아이콘 (선택)
npm install @untitledui/icons
```

### 1.2 설치 확인

```bash
# package.json 확인
cat package.json | grep -E "(clsx|tailwind-merge)"
```

---

## 🛠️ 2단계: 유틸리티 함수 생성

### 2.1 cx() 유틸리티

**파일 생성**: `frontend/src/commons/utils/cx.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 *
 * clsx로 조건부 클래스를 처리하고,
 * tailwind-merge로 충돌하는 Tailwind 클래스를 병합합니다.
 *
 * @example
 * // 기본 사용
 * cx("bg-red-500", "text-white")
 * // → "bg-red-500 text-white"
 *
 * @example
 * // 조건부 클래스
 * cx("btn", isActive && "active", disabled && "disabled")
 * // → "btn active" (disabled가 false일 때)
 *
 * @example
 * // 충돌하는 클래스 병합
 * cx("p-4", "p-2")
 * // → "p-2" (나중 값이 우선)
 *
 * @param inputs - 클래스 이름, 조건부 클래스, 객체 등
 * @returns 병합된 클래스 문자열
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2.2 왜 cx() 함수가 필요한가?

**Reference 프로젝트 방식 (CSS Modules)**:

```typescript
// CSS Modules 배열 조합
const buttonClass = [
  styles.button,
  styles[`variant-${variant}`],
  styles[`size-${size}`],
  className,
]
  .filter(Boolean)
  .join(' ');
```

**OSM RFQ 방식 (Tailwind + cx)**:

```typescript
// Tailwind 동적 클래스 병합
const buttonClass = cx(
  "flex items-center justify-center",
  variant === 'primary' && "bg-blue-60 text-white",
  size === 'medium' && "px-4 py-2",
  className
);
```

**장점**:
- ✅ 조건부 클래스 더 직관적
- ✅ Tailwind 클래스 충돌 자동 해결
- ✅ 타입 안전성 (TypeScript)
- ✅ 코드가 더 짧고 읽기 쉬움

---

## 📁 3단계: 디렉토리 구조 생성

### 3.1 Button 컴포넌트 디렉토리

```bash
# 디렉토리 생성
mkdir -p frontend/src/commons/components/button/prompts

# 파일 생성
touch frontend/src/commons/components/button/index.tsx
touch frontend/src/commons/components/button/index.stories.tsx
touch frontend/src/commons/components/button/prompts/prompt.101.button.md
```

### 3.2 전체 구조 (Reference와 동일)

```
frontend/src/commons/
├── components/
│   ├── button/
│   │   ├── index.tsx                    # React 컴포넌트
│   │   ├── index.stories.tsx            # Storybook 스토리
│   │   └── prompts/
│   │       └── prompt.101.button.md     # 구현 가이드
│   ├── input/
│   │   ├── index.tsx
│   │   ├── index.stories.tsx
│   │   └── prompts/
│   │       └── prompt.101.input.md
│   └── modal/
│       ├── index.tsx
│       ├── index.stories.tsx
│       └── prompts/
│           └── prompt.101.modal.md
├── providers/
├── constants/
└── utils/
    └── cx.ts
```

**차이점**:
- ❌ `styles.module.css` 제거 (Tailwind 사용)
- ✅ `index.tsx` 내부에 Tailwind 클래스 직접 작성
- ✅ Design Tokens (`var(--color-*)`) 활용

---

## 💡 4단계: Button 컴포넌트 구현

### 4.1 index.tsx 구현

**파일**: `frontend/src/commons/components/button/index.tsx`

```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/commons/utils/cx';

// Reference와 동일한 타입 구조
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonTheme = 'light' | 'dark';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  children: ReactNode;
}

/**
 * Button 컴포넌트
 *
 * @description
 * Reference 프로젝트의 Button 컴포넌트와 동일한 API를 제공하지만,
 * CSS Modules 대신 Tailwind CSS를 사용합니다.
 *
 * @example
 * // 기본 사용
 * <Button>Click me</Button>
 *
 * @example
 * // variant와 size 지정
 * <Button variant="secondary" size="large">
 *   Submit
 * </Button>
 *
 * @example
 * // 다크 테마
 * <Button theme="dark" variant="tertiary">
 *   Cancel
 * </Button>
 */
export default function Button({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        // Base Styles (Reference의 .button 클래스와 동일)
        "flex items-center justify-center gap-1",
        "border-none cursor-pointer",
        "font-pretendard font-semibold",
        "transition-opacity duration-200",

        // Hover & Disabled States
        "hover:opacity-80",
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Size Variants (Reference의 .size-* 클래스와 동일)
        size === 'small' && [
          "h-9",           // height: 36px
          "px-4",          // padding: 0 16px
          "text-sm",       // font-size: 14px
          "leading-5",     // line-height: 20px
          "tracking-tight", // letter-spacing: -0.14px
          "rounded-md",    // border-radius: 6px
        ],
        size === 'medium' && [
          "h-12",          // height: 48px
          "px-5",          // padding: 0 20px
          "text-lg",       // font-size: 18px
          "leading-6",     // line-height: 24px
          "tracking-tight", // letter-spacing: -0.18px
          "rounded-lg",    // border-radius: 8px
        ],
        size === 'large' && [
          "h-14",          // height: 56px
          "px-6",          // padding: 0 24px
          "text-xl",       // font-size: 20px
          "leading-7",     // line-height: 28px
          "tracking-tight", // letter-spacing: -0.2px
          "rounded-[10px]", // border-radius: 10px
        ],

        // Variant + Theme Combinations (Reference의 .variant-*.theme-*과 동일)
        // Primary Variants
        variant === 'primary' && theme === 'light' && "bg-[var(--color-gray-black)] text-[var(--color-gray-white)]",
        variant === 'primary' && theme === 'dark' && "bg-[var(--color-gray-black)] text-[var(--color-gray-white)]",

        // Secondary Variants
        variant === 'secondary' && theme === 'light' && "bg-[var(--color-gray-10)] text-[var(--color-gray-90)]",
        variant === 'secondary' && theme === 'dark' && "bg-[var(--color-gray-80)] text-[var(--color-gray-10)]",

        // Tertiary Variants
        variant === 'tertiary' && theme === 'light' && "bg-transparent text-[var(--color-blue-60)] border border-[var(--color-blue-60)]",
        variant === 'tertiary' && theme === 'dark' && "bg-transparent text-[var(--color-blue-40)] border border-[var(--color-blue-40)]",

        // 외부에서 전달된 className
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 4.2 Design Tokens 활용

**globals.css에 이미 정의된 색상 참조**:

```typescript
// CSS Variable 직접 사용
className="bg-[var(--color-blue-60)]"

// 또는 Tailwind config에 매핑
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'blue-60': 'var(--color-blue-60)',      // #3A5CF3
      'blue-40': 'var(--color-blue-40)',
      'gray-black': 'var(--color-gray-black)', // #000000
      'gray-white': 'var(--color-gray-white)', // #FFFFFF
      'gray-10': 'var(--color-gray-10)',
      'gray-80': 'var(--color-gray-80)',
      'gray-90': 'var(--color-gray-90)',
    },
    fontFamily: {
      pretendard: ['Pretendard Variable', 'sans-serif'],
    }
  }
}

// 그러면 더 간결하게 사용 가능
className="bg-blue-60 text-gray-white"
```

---

## 📝 5단계: Storybook 작성

### 5.1 index.stories.tsx

**파일**: `frontend/src/commons/components/button/index.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

const meta = {
  title: 'Commons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
};

// Tertiary Button
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
};

// Dark Theme
export const DarkTheme: Story = {
  render: () => (
    <div className="flex gap-4 items-center p-8 bg-gray-900">
      <Button theme="dark" variant="primary">Primary</Button>
      <Button theme="dark" variant="secondary">Secondary</Button>
      <Button theme="dark" variant="tertiary">Tertiary</Button>
    </div>
  ),
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button disabled variant="primary">Primary</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="tertiary">Tertiary</Button>
    </div>
  ),
};
```

### 5.2 Storybook 실행

```bash
cd frontend
npm run storybook
```

브라우저에서 `http://localhost:6006` 열기

---

## 🎯 6단계: 실제 사용 방법

### 6.1 페이지에서 사용

**파일**: `app/page.tsx`

```typescript
import Button from '@/commons/components/button';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1>Button 컴포넌트 테스트</h1>

      {/* Primary Button */}
      <Button variant="primary" size="medium">
        클릭하세요
      </Button>

      {/* Secondary Button */}
      <Button variant="secondary" size="large">
        취소
      </Button>

      {/* Tertiary Button with onClick */}
      <Button
        variant="tertiary"
        size="small"
        onClick={() => alert('Clicked!')}
      >
        자세히 보기
      </Button>

      {/* Disabled Button */}
      <Button variant="primary" disabled>
        비활성화됨
      </Button>
    </div>
  );
}
```

### 6.2 Form에서 사용

**파일**: `components/login-form/index.tsx`

```typescript
'use client';

import Button from '@/commons/components/button';
import { useState } from 'react';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // API 호출 로직
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="px-4 py-2 border rounded-lg"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="px-4 py-2 border rounded-lg"
      />

      <Button
        variant="primary"
        size="large"
        type="submit"
        disabled={loading || !email || !password}
      >
        {loading ? '로그인 중...' : '로그인'}
      </Button>

      <Button
        variant="tertiary"
        size="medium"
        type="button"
      >
        비밀번호를 잊으셨나요?
      </Button>
    </form>
  );
}
```

### 6.3 Modal과 함께 사용

```typescript
'use client';

import Button from '@/commons/components/button';
import { useModal } from '@/commons/providers/modal/modal.provider';

export default function DeleteButton() {
  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    openModal(
      <div className="flex flex-col items-center p-6 bg-white rounded-3xl w-[480px]">
        <h2 className="text-2xl font-bold mb-4">정말 삭제하시겠습니까?</h2>
        <p className="text-xl text-gray-500 mb-10">삭제된 데이터는 복구할 수 없습니다.</p>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={closeModal}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log('삭제 실행');
              closeModal();
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Button variant="primary" onClick={handleDelete}>
      삭제
    </Button>
  );
}
```

---

## 🔄 7단계: 다른 컴포넌트 구현

### 7.1 Input 컴포넌트

**파일**: `frontend/src/commons/components/input/index.tsx`

```typescript
import { InputHTMLAttributes, forwardRef } from 'react';
import { cx } from '@/commons/utils/cx';

type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  error?: boolean;
  helperText?: string;
}

/**
 * Input 컴포넌트
 *
 * @description
 * react-hook-form의 register()와 함께 사용할 수 있도록
 * forwardRef를 사용합니다.
 *
 * @example
 * // 기본 사용
 * <Input placeholder="이메일을 입력하세요" />
 *
 * @example
 * // react-hook-form과 함께
 * <Input {...register('email')} error={!!errors.email} />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'medium',
  error = false,
  helperText,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={cx(
          // Base styles
          "w-full border rounded-lg",
          "font-pretendard",
          "focus:outline-none focus:ring-2",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "placeholder:text-gray-40",

          // Size variants
          size === 'small' && "h-9 px-3 text-sm",
          size === 'medium' && "h-12 px-4 text-base",
          size === 'large' && "h-14 px-5 text-lg",

          // Error state
          error
            ? "border-[var(--color-red-50)] focus:ring-[var(--color-red-50)] focus:border-[var(--color-red-50)]"
            : "border-[var(--color-gray-30)] focus:ring-[var(--color-blue-60)] focus:border-[var(--color-blue-60)]",

          className
        )}
        {...props}
      />

      {/* Helper Text */}
      {helperText && (
        <p className={cx(
          "mt-1 text-sm",
          error ? "text-[var(--color-red-50)]" : "text-[var(--color-gray-50)]"
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
```

### 7.2 Modal 컴포넌트

**파일**: `frontend/src/commons/components/modal/index.tsx`

```typescript
import { ReactNode } from 'react';
import { cx } from '@/commons/utils/cx';
import { useModal } from '@/commons/providers/modal/modal.provider';
import Button from '@/commons/components/button';

type ModalVariant = 'info' | 'danger' | 'success' | 'warning';
type ModalActions = 'single' | 'dual';

interface ModalContentProps {
  variant?: ModalVariant;
  actions?: ModalActions;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * ModalContent 컴포넌트
 *
 * @description
 * ModalProvider와 함께 사용하는 모달 콘텐츠 컴포넌트입니다.
 *
 * @example
 * const { openModal } = useModal();
 *
 * openModal(
 *   <ModalContent
 *     variant="danger"
 *     title="삭제 확인"
 *     description="정말 삭제하시겠습니까?"
 *     onConfirm={() => console.log('삭제')}
 *   />
 * );
 */
export default function ModalContent({
  variant = 'info',
  actions = 'dual',
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ModalContentProps) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  const handleCancel = () => {
    onCancel?.();
    closeModal();
  };

  // Variant에 따른 색상
  const variantColors = {
    info: 'text-[var(--color-blue-60)]',
    danger: 'text-[var(--color-red-60)]',
    success: 'text-[var(--color-green-60)]',
    warning: 'text-[var(--color-orange-60)]',
  };

  return (
    <div className={cx(
      "flex flex-col items-center",
      "w-[480px] p-6",
      "bg-white dark:bg-gray-800 rounded-3xl"
    )}>
      {/* Title */}
      <h2 className={cx(
        "font-pretendard font-bold text-2xl",
        "text-center mb-4",
        variantColors[variant]
      )}>
        {title}
      </h2>

      {/* Description */}
      <p className="font-pretendard font-medium text-xl text-[var(--color-gray-50)] text-center mb-10">
        {description}
      </p>

      {/* Actions */}
      <div className={cx(
        "flex gap-4",
        actions === 'single' ? "w-full" : "w-auto"
      )}>
        {actions === 'dual' && (
          <Button
            variant="secondary"
            size="medium"
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
        )}

        <Button
          variant="primary"
          size="medium"
          onClick={handleConfirm}
          className={cx(
            actions === 'single' && "w-full"
          )}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
```

---

## 📊 8단계: CSS Modules vs Tailwind CSS 비교

### Reference 프로젝트 방식 (CSS Modules)

**장점**:
- ✅ 클래스명 자동 스코핑
- ✅ CSS 파일 분리로 관심사 분리

**단점**:
- ❌ 별도 CSS 파일 관리 필요
- ❌ 동적 스타일 적용이 복잡
- ❌ 번들 사이즈 증가

```typescript
// index.tsx
import styles from './styles.module.css';

const buttonClass = [
  styles.button,
  styles[`variant-${variant}`],
  styles[`size-${size}`],
  className,
]
  .filter(Boolean)
  .join(' ');
```

```css
/* styles.module.css */
.button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-medium {
  height: 48px;
  padding: 0 20px;
}
```

### OSM RFQ 방식 (Tailwind CSS)

**장점**:
- ✅ CSS 파일 불필요
- ✅ 동적 스타일 직관적
- ✅ 더 작은 번들 사이즈 (PurgeCSS)
- ✅ Design Tokens 직접 참조
- ✅ 개발 속도 향상

**단점**:
- ❌ 클래스명이 길어질 수 있음 (cx로 해결)

```typescript
// index.tsx (스타일이 코드 안에 있음)
const buttonClass = cx(
  "flex items-center justify-center",
  size === 'medium' && "h-12 px-5"
);
```

---

## 🎯 9단계: Untitled UI 컴포넌트 추가 방법

### 방법 1: CLI 사용 (가장 빠름)

```bash
cd frontend

# Button 컴포넌트 추가
npx untitledui@latest add button

# 자동 생성 위치
# → src/components/ui/button.tsx

# OSM 구조로 이동
mkdir -p src/commons/components/button
mv src/components/ui/button.tsx src/commons/components/button/index.tsx
```

### 방법 2: 수동 복사 (권장 - 커스터마이징 필요)

1. [Untitled UI Docs](https://www.untitledui.com/react/docs/components/button) 접속
2. 원하는 컴포넌트 코드 복사
3. `src/commons/components/[name]/index.tsx`에 붙여넣기
4. OSM Design Tokens로 수정

### 방법 3: Reference 패턴 유지 (최고 추천)

위에서 작성한 Button 컴포넌트처럼:
- ✅ Reference 구조 유지
- ✅ Tailwind CSS 사용
- ✅ OSM Design Tokens 활용
- ✅ Props 구조 동일 (variant, size, theme)

---

## ✅ 최종 체크리스트

### 패키지 설치
- [ ] `clsx` 설치 완료
- [ ] `tailwind-merge` 설치 완료
- [ ] (선택) `react-aria-components` 설치
- [ ] (선택) `@untitledui/icons` 설치

### 유틸리티 생성
- [ ] `commons/utils/cx.ts` 생성 완료

### 디렉토리 구조
- [ ] `commons/components/button/` 생성
- [ ] `commons/components/input/` 생성
- [ ] `commons/components/modal/` 생성
- [ ] 각 컴포넌트에 `prompts/` 디렉토리 생성

### 컴포넌트 구현
- [ ] Button 컴포넌트 (variant, size, theme)
- [ ] Input 컴포넌트 (size, error, helperText)
- [ ] Modal 컴포넌트 (variant, actions)

### Storybook
- [ ] Button stories 작성
- [ ] Input stories 작성
- [ ] Modal stories 작성
- [ ] `npm run storybook` 실행 확인

### Tailwind 설정
- [ ] Design Tokens를 Tailwind config에 매핑
- [ ] `font-pretendard` 폰트 설정
- [ ] PurgeCSS 설정 확인

### 사용 테스트
- [ ] 페이지에서 Button 사용
- [ ] Form에서 Input 사용
- [ ] Modal 열기/닫기 테스트
- [ ] 각 variant, size 테스트
- [ ] Dark mode 테스트

---

## 🚀 다음 단계

### 1. 더 많은 컴포넌트 추가

```bash
# Reference의 나머지 컴포넌트 구현
- [ ] Pagination
- [ ] Searchbar
- [ ] Selectbox
- [ ] Toggle
```

### 2. Untitled UI PRO 컴포넌트 탐색

```bash
# PRO 버전 구매 시
npx untitledui login
npx untitledui add dashboard-sidebar
npx untitledui add data-table
```

### 3. 접근성 개선

```bash
# React Aria 통합
npm install react-aria-components
```

### 4. 테스트 작성

```bash
# Playwright E2E 테스트
- Button 클릭 테스트
- Form 제출 테스트
- Modal 열기/닫기 테스트
```

---

## 📚 참고 자료

### 공식 문서
- [Untitled UI React](https://www.untitledui.com/react)
- [Tailwind CSS](https://tailwindcss.com)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)
- [Storybook](https://storybook.js.org)

### OSM RFQ 내부 문서
- [untitled-ui-claude-guide.md](./untitled-ui-claude-guide.md)
- [untitled-ui-purchased-setup-guide.md](./untitled-ui-purchased-setup-guide.md)
- [OSM Naming Convention](/.claude/rules/osm-naming-convention.md)
- [Frontend Common Rules](/.claude/rules/frontend-common.md)

### GitHub
- [Untitled UI GitHub](https://github.com/untitleduico)
- [OSM RFQ Repository](https://github.com/oceansmart/osm-rfq)

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**OSM Naming Convention**: ✅ 준수
**Reference**: challenge-02 프로젝트 구조
**스타일링**: Tailwind CSS
**상태**: ✅ 준비 완료
