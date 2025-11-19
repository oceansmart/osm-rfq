# Button Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 프로젝트 컨텍스트

### OSM RFQ 프로젝트 표준
- **Design System**: Untitled UI PRO 기반 (1,325+ components)
- **Styling**: Tailwind CSS v4 + CSS Variables (`@theme`)
- **Component Library**: React Aria Components (Accessibility-first)
- **Documentation**: Storybook 9.1.13 + MDX 지원
- **TypeScript**: Strict mode enabled

---

## 📂 파일 경로

```
frontend/src/commons/components/button/
├── index.tsx                 ← 참고할 Button 컴포넌트 (272 lines)
├── index.stories.tsx         ← 구현 대상 (새로 생성)
└── prompts/
    ├── button.stories.txt    ← 이 문서
    └── button.stories.md     ← 상세 가이드
```

---

## 🎯 핵심 요구사항

### Button 컴포넌트의 **모든 variants**를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Size Variants (4가지)
| Size | Padding | Font | Use Case |
|------|---------|------|----------|
| `sm` | `px-3 py-2` | `text-sm` | Compact UI, Inline actions |
| `md` | `px-3.5 py-2.5` | `text-sm` | Default size, Most common |
| `lg` | `px-4 py-2.5` | `text-md` | Prominent actions |
| `xl` | `px-4.5 py-3` | `text-md` | Hero CTAs |

### 2. Color Variants (10가지)

#### Primary Group
- `primary` - Brand solid background (`--color-brand-600`)
- `secondary` - Outlined style with border
- `tertiary` - Ghost style, no background

#### Link Group
- `link-gray` - Text link with gray color
- `link-color` - Text link with brand color

#### Destructive Group
- `primary-destructive` - Red solid background
- `secondary-destructive` - Red outlined style
- `tertiary-destructive` - Red ghost style
- `link-destructive` - Red text link

### 3. State Variants

#### Interactive States
- **Default** - 기본 상태
- **Hover** - `hover:bg-brand-solid_hover`
- **Disabled** - `disabled:bg-disabled` + `cursor-not-allowed`
- **Loading** - Spinning icon + `data-loading` attribute

#### Icon States
- **Icon Leading** - `iconLeading` prop
- **Icon Trailing** - `iconTrailing` prop
- **Icon Only** - Icon without text (`data-icon-only`)

### 4. Link vs Button Behavior
- **Button** - `<button>` element, `type="button"`
- **Link** - `<a>` element, `href` prop 제공 시 자동 전환

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'primary', 'secondary', 'tertiary',
        'link-gray', 'link-color',
        'primary-destructive', 'secondary-destructive',
        'tertiary-destructive', 'link-destructive'
      ],
    },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    // ... 나머지 props
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 Primary 버튼
2. **All Sizes** - 4가지 사이즈 비교
3. **All Colors** - 10가지 컬러 비교
4. **With Icons** - Leading/Trailing/Only 아이콘
5. **States** - Disabled/Loading 상태
6. **Link Variant** - `href` prop 사용
7. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (sm, md, lg, xl)
- [ ] 모든 color variants 렌더링 확인 (10가지)
- [ ] Icon leading/trailing/only 동작 확인
- [ ] Loading state 스피너 애니메이션 확인
- [ ] Disabled state 스타일 적용 확인
- [ ] Link variant (href prop) 동작 확인
- [ ] Hover 상태 CSS 전환 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] MDX 문서화 (선택사항)
- [ ] A11y 애드온 경고 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] Union type (ButtonProps | LinkProps) 정확히 처리

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] OSM 브랜드 컬러 적용 확인 (`--color-brand-600`)
- [ ] OSM 폰트 적용 확인 (`--font-body`)

---

## 🎨 디자인 토큰 참조

### 현재 적용된 OSM Overrides

```css
/* frontend/src/styles/theme.css */
@theme {
    /* OSM Primary Brand Colors */
    --color-brand-600: rgb(105 65 198);  /* #6941c6 */
    --color-brand-700: rgb(83 56 158);   /* #53389e */

    /* OSM Typography */
    --font-display: 'DM Sans', -apple-system, ...;
    --font-body: 'Poppins', -apple-system, ...;
}
```

### Button 컴포넌트가 사용하는 토큰

- `--color-brand-solid` → OSM `--color-brand-600`
- `--color-brand-solid_hover` → OSM `--color-brand-700`
- `--font-body` → OSM Poppins 폰트

---

## 📚 참고 문서

- [Button Component Source](../index.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Foundation Token Override Guide](../../../../../../docs/frontend/foundation-token-override-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/Button.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Button**

---

## 💡 구현 팁

1. **Icon 컴포넌트 Mock**
   ```typescript
   const MockIcon = ({ className }: { className?: string }) => (
     <svg className={className} /* ... */ />
   );
   ```

2. **Loading State 시연**
   ```typescript
   export const Loading: Story = {
     args: {
       isLoading: true,
       children: 'Loading...',
     },
   };
   ```

3. **Interactive Playground**
   ```typescript
   export const Playground: Story = {
     args: {
       children: 'Click me',
       size: 'md',
       color: 'primary',
     },
   };
   ```

---

**구현 완료 후 체크리스트를 반환하세요!**