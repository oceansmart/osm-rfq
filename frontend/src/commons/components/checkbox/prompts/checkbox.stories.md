# Checkbox Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/checkbox/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/checkbox/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Checkbox 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Size Variants (2가지)

- sm (Default)
- md

| Size | Box Size | Use Case |
|------|----------|----------|
| `sm` | `16px` (h-4 w-4) | Default, Compact forms |
| `md` | `20px` (h-5 w-5) | Larger touch targets, Accessibility |

### 2. State Variants (6가지)

**Basic States:**
- Unchecked (default)
- Checked (selected)
- Indeterminate (partial selection)

**Disabled States:**
- Disabled unchecked
- Disabled checked
- Disabled indeterminate

### 3. Content Variants

**Label Combinations:**
- No label (checkbox only)
- Label only
- Label with hint text
- Both label and hint

### 4. Interactive Controls

- Storybook Controls로 모든 props 조작 가능
- Args 기반 스토리 구성
- 실시간 상태 전환 가능

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components 통합 검증
- Untitled UI 디자인 토큰 활용 (--color-brand-*, --font-*, etc.)
- 접근성 (a11y) 검증 포함
  - Keyboard navigation (Space to toggle)
  - Label association
  - Screen reader support

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Commons/Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    label: {
      control: 'text',
    },
    hint: {
      control: 'text',
    },
    isSelected: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 체크박스 (label 포함)
2. **AllSizes** - 2가지 사이즈 비교 (sm, md)
3. **AllStates** - 모든 상태 비교 (unchecked, checked, indeterminate, disabled)
4. **WithLabelsAndHints** - Label과 Hint 조합
5. **IndeterminatePattern** - "Select All" 패턴 데모
6. **SizeStateMatrix** - Size × State 매트릭스
7. **FormIntegration** - 실제 폼 통합 예시
8. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (sm, md)
- [ ] 모든 state variants 렌더링 확인 (6가지)
- [ ] Checked/Unchecked 전환 동작 확인
- [ ] Indeterminate state 시각적 표현 확인
- [ ] Disabled state 스타일 적용 확인
- [ ] Label 클릭 시 체크박스 토글 확인
- [ ] Hint text 렌더링 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] A11y 애드온 경고 없음

### 접근성 (A11y)
- [ ] 키보드 내비게이션 (Space로 토글)
- [ ] Label과 input의 연결 확인
- [ ] ARIA 속성 적용 확인
- [ ] Screen reader 테스트 (optional)

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] ReactNode 타입 정확히 처리 (label, hint)

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] OSM 브랜드 컬러 적용 확인 (`--color-brand-solid`)
- [ ] Focus ring 스타일 적용 확인 (`--color-focus-ring`)

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

### Checkbox 컴포넌트가 사용하는 토큰

- `--color-brand-solid` → OSM `--color-brand-600` (checked background)
- `--color-focus-ring` → Focus outline color
- `--font-body` → OSM Poppins 폰트 (label, hint)
- `--color-primary` → Border color
- `--color-disabled` → Disabled state

---

## 📚 참고 문서

- [Checkbox Component Source](../index.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Foundation Token Override Guide](../../../../../../docs/frontend/foundation-token-override-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria Components - Checkbox](https://react-spectrum.adobe.com/react-aria/Checkbox.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Checkbox**

---

## 💡 구현 팁

1. **Indeterminate State 데모**
   ```typescript
   export const IndeterminatePattern: Story = {
     render: () => (
       <div className="flex flex-col gap-4">
         <Checkbox label="Select all" isIndeterminate />
         <div className="ml-6">
           <Checkbox label="Option 1" defaultSelected />
           <Checkbox label="Option 2" />
           <Checkbox label="Option 3" defaultSelected />
         </div>
       </div>
     ),
   };
   ```

2. **Form Integration 예시**
   ```typescript
   export const FormIntegration: Story = {
     render: () => (
       <div className="flex flex-col gap-4">
         <Checkbox
           label="Email notifications"
           hint="Receive email updates"
           defaultSelected
         />
         <Checkbox
           label="SMS notifications"
           hint="Get text messages"
         />
       </div>
     ),
   };
   ```

3. **Interactive Playground**
   ```typescript
   export const Playground: Story = {
     args: {
       label: 'Checkbox label',
       hint: 'Helper text',
       size: 'sm',
       isSelected: false,
       isIndeterminate: false,
       isDisabled: false,
     },
   };
   ```

---

## 🔍 Checkbox 특화 검증 항목

### Indeterminate State
- [ ] Indeterminate 아이콘 (dash) 렌더링 확인
- [ ] Checked와 Indeterminate 상호 배타적 확인
- [ ] Disabled + Indeterminate 조합 스타일 확인

### Label & Hint
- [ ] Label만 있을 때 레이아웃 확인
- [ ] Hint만 있을 때 레이아웃 확인 (label 없이는 드물지만 가능)
- [ ] Label + Hint 수직 정렬 확인
- [ ] ReactNode 타입으로 JSX 전달 가능 확인

### Size Variants
- [ ] sm: 16px checkbox, text-sm label, 8px gap
- [ ] md: 20px checkbox, text-md label, 12px gap
- [ ] 체크박스와 label의 수직 정렬 (mt-0.5) 확인

---

**구현 완료 후 체크리스트를 반환하세요!**
