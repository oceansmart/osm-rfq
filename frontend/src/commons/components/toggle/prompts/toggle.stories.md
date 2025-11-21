# Toggle Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/toggle/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/toggle/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Toggle 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Toggle Component Variants

#### Size Variants (2가지)
- `sm` - Small toggle (h-5 w-9)
- `md` - Medium toggle (h-6 w-11)

#### Style Variants
- **Default** - Solid background with shadow
- **Slim** - Ring border variant

#### State Variants
- Off (default)
- On (selected)
- Disabled (off)
- Disabled (on)
- Hovered
- Focused

#### Label Options
- Toggle only (no label)
- With label
- With label + hint text
- With label + interactive hint (links, etc.)

### 2. Toggle Props

```typescript
interface ToggleProps extends AriaSwitchProps {
  size?: "sm" | "md";
  label?: string;
  hint?: ReactNode;
  slim?: boolean;
}
```

### 3. ToggleBase Component

Internal component for toggle switch visualization:
- Responsive to size, state, and style variants
- Smooth transition animations
- Focus ring support

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components Switch 통합
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함:
  - ARIA Switch role
  - Keyboard support (Space, Enter)
  - Focus indicators
  - Screen reader labels

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toggle } from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    slim: {
      control: 'boolean',
    },
    label: { control: 'text' },
    hint: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Stories...
```

### 필수 Stories

1. **Default** - Basic toggle without label
2. **AllSizes** - Size comparison (sm vs md)
3. **WithLabel** - Toggle with label
4. **WithLabelAndHint** - Toggle with label + hint text
5. **SlimVariant** - Slim style variants
6. **States** - All state variations
7. **SizeVariantMatrix** - Comprehensive comparison
8. **InteractiveExamples** - Real-world usage
9. **ControlledVsUncontrolled** - State management patterns
10. **RealWorldUseCases** - Settings panels, privacy controls
11. **Playground** - All props adjustable

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (sm, md)
- [ ] Toggle on/off 동작 확인
- [ ] Slim variant 스타일 확인
- [ ] Label 텍스트 표시 확인
- [ ] Hint 텍스트 표시 확인
- [ ] Disabled state 동작 확인 (클릭 불가)
- [ ] Hover state 스타일 전환 확인
- [ ] Focus ring 표시 확인
- [ ] 전환 애니메이션 확인 (0.15s ease-in-out)

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] A11y 애드온 경고 없음
- [ ] 모든 Stories 렌더링 에러 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] AriaSwitchProps 상속 확인

### 접근성 (a11y)
- [ ] Keyboard navigation (Space, Enter)
- [ ] Screen reader label 적절히 설정
- [ ] ARIA switch role 적용
- [ ] Focus indicators 표시
- [ ] Disabled state 스크린리더 인식

### 디자인 토큰
- [ ] `--color-brand-solid` 적용 확인
- [ ] `--color-brand-solid_hover` 호버 확인
- [ ] `--color-fg-white` 스위치 버튼 색상 확인
- [ ] Focus ring 스타일 확인

---

## 🎨 디자인 토큰 참조

### Toggle Component가 사용하는 토큰

```css
/* Background Colors */
--color-tertiary         /* Off state background */
--color-brand-solid      /* On state background */
--color-brand-solid_hover /* On state hover background */
--color-disabled         /* Disabled background */

/* Switch Button */
--color-fg-white                    /* Switch button color */
--color-toggle-button-fg_disabled   /* Disabled switch button */

/* Slim Variant */
--color-toggle-border                      /* Slim border (off) */
--color-toggle-slim-border_pressed         /* Slim border (on) */
--color-toggle-slim-border_pressed-hover   /* Slim border (on hover) */

/* Focus */
--color-focus-ring       /* Focus outline color */

/* Text */
--color-text-secondary   /* Label text */
--color-text-tertiary    /* Hint text */
```

---

## 📚 참고 문서

- [Toggle Component Source](../index.tsx)
- [Untitled UI Toggle Reference](https://www.untitledui.com/react/components/toggles)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria Switch](https://react-spectrum.adobe.com/react-aria/Switch.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Toggle**

---

## 💡 구현 팁

### 1. Basic Toggle

```typescript
export const Default: Story = {
  args: {
    size: 'sm',
    slim: false,
  },
};
```

### 2. With Label and Hint

```typescript
export const WithLabelAndHint: Story = {
  render: () => (
    <Toggle
      label="Email notifications"
      hint="Receive email notifications about your account activity"
      size="md"
    />
  ),
};
```

### 3. Slim Variant

```typescript
export const SlimVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle slim size="sm" label="Slim small" />
      <Toggle slim size="md" label="Slim medium" />
    </div>
  ),
};
```

### 4. States Comparison

```typescript
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Toggle label="Off" />
      <Toggle label="On" isSelected defaultSelected />
      <Toggle label="Disabled (Off)" isDisabled />
      <Toggle label="Disabled (On)" isDisabled isSelected defaultSelected />
    </div>
  ),
};
```

### 5. Controlled State

```typescript
export const Controlled: Story = {
  render: () => {
    const [isOn, setIsOn] = useState(false);

    return (
      <Toggle
        label="Controlled toggle"
        isSelected={isOn}
        onChange={setIsOn}
      />
    );
  },
};
```

### 6. 접근성 테스트

Storybook에서 A11y 애드온으로 확인:
- Switch role
- Keyboard interaction
- Focus management
- Label association

---

## 🔍 주요 검증 포인트

### Toggle Component
1. ✅ On/Off 상태가 시각적으로 명확
2. ✅ Transition 애니메이션이 부드러움 (0.15s)
3. ✅ Focus ring이 토글 주위에 표시
4. ✅ Disabled 상태에서 클릭 불가
5. ✅ Label 클릭 시에도 토글 동작

### ToggleBase Component
1. ✅ 스위치 버튼이 정확한 위치로 이동 (translate-x)
2. ✅ Background 색상 전환이 자연스러움
3. ✅ Slim variant에서 ring border 표시
4. ✅ Hover 상태에서 색상 변화
5. ✅ Disabled 색상이 적절히 적용

### Accessibility
1. ✅ Space/Enter 키로 토글 가능
2. ✅ Tab 키로 포커스 이동
3. ✅ Screen reader가 on/off 상태 올바르게 읽음
4. ✅ Label이 toggle과 연결됨
5. ✅ Hint 텍스트가 description으로 제공

---

**구현 완료 후 체크리스트를 반환하세요!**
