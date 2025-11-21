# ButtonGroup Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components (ToggleButtonGroup)
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/button-group/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/button-group/index.stories.tsx
```

---

## 🎯 핵심요구사항

### ButtonGroup 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Size Variants (3가지)

- sm
- md (default)
- lg

| Size | Padding | Font | Gap | Use Case |
|------|---------|------|-----|----------|
| `sm` | `px-3.5 py-2` | `text-sm` | `gap-1.5` | Compact toolbars, Inline controls |
| `md` | `px-4 py-2.5` | `text-sm` | `gap-1.5` | Default size, Most common |
| `lg` | `px-4.5 py-2.5` | `text-md` | `gap-2` | Prominent controls |

### 2. Selection Modes (2가지)

- **single**: 하나만 선택 가능 (default)
- **multiple**: 여러 개 선택 가능

### 3. State Variants

- Default (선택 안 됨)
- Selected (선택됨)
- Disabled (전체 그룹)
- Disabled (개별 아이템)
- Hover (개별 아이템)

### 4. Icon Variants

- Icon Leading
- Icon Trailing
- Icon Only
- No Icon (Text only)

### 5. Component Structure

```typescript
<ButtonGroup size="md" selectionMode="single">
  <ButtonGroupItem value="1">Item 1</ButtonGroupItem>
  <ButtonGroupItem value="2">Item 2</ButtonGroupItem>
  <ButtonGroupItem value="3">Item 3</ButtonGroupItem>
</ButtonGroup>
```

### 6. Interactive Controls

- Storybook Controls로 모든 props 조작 가능
- Args 기반 스토리 구성

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components (ToggleButtonGroup, ToggleButton) 통합 검증
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - ARIA roles (group, button)
  - Keyboard navigation (Tab, Space, Enter)
  - Screen reader announcements

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ButtonGroup, ButtonGroupItem } from './index';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Commons/Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 ButtonGroup (single selection)
2. **All Sizes** - 3가지 사이즈 비교
3. **With Icons** - Leading/Trailing/Only 아이콘
4. **States** - Selected/Disabled 상태
5. **Selection Modes** - Single vs Multiple selection
6. **Use Cases** - 실제 사용 사례 (Text alignment, View mode, Filters)
7. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (sm, md, lg)
- [ ] Single selection mode 동작 확인 (하나만 선택 가능)
- [ ] Multiple selection mode 동작 확인 (여러 개 선택 가능)
- [ ] Icon leading/trailing/only 동작 확인
- [ ] Selected state 스타일 적용 확인
- [ ] Disabled state (전체 그룹) 동작 확인
- [ ] Disabled state (개별 아이템) 동작 확인
- [ ] Hover 상태 CSS 전환 확인
- [ ] ButtonGroupContext를 통한 size 전달 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] MDX 문서화 (선택사항)
- [ ] A11y 애드온 경고 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] ButtonGroupItem이 ButtonGroup 외부에서 사용 시 에러 발생 확인

### 접근성 (A11y)
- [ ] 키보드 내비게이션 (Tab, Space, Enter) 동작
- [ ] ARIA roles 확인 (group, button)
- [ ] Selected state가 스크린리더에 전달되는지 확인
- [ ] Disabled state가 스크린리더에 전달되는지 확인

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] OSM 브랜드 컬러 적용 확인
- [ ] 버튼 간격 및 border 정확히 렌더링 확인 (-space-x-px)

---

## 🎨 디자인 토큰 참조

### ButtonGroup 컴포넌트가 사용하는 스타일

```css
/* 컨테이너 */
.relative.z-0.inline-flex.w-max.-space-x-px.rounded-lg.shadow-xs

/* 버튼 아이템 (공통) */
--color-bg-primary: 배경색
--color-text-secondary: 텍스트 색상
--color-ring-primary: Border 색상

/* 버튼 아이템 (Hover) */
--color-bg-primary_hover
--color-text-secondary_hover

/* 버튼 아이템 (Selected) */
--color-bg-active
--color-text-secondary_hover

/* 버튼 아이템 (Disabled) */
--color-text-disabled
--color-bg-disabled_subtle
```

---

## 📚 참고 문서

- [ButtonGroup Component Source](../index.tsx)
- [Button Component Stories](../../button/index.stories.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Foundation Token Override Guide](../../../../../../docs/frontend/foundation-token-override-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria ToggleButtonGroup](https://react-spectrum.adobe.com/react-aria/ToggleButton.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → ButtonGroup**

---

## 💡 구현 팁

1. **ButtonGroupContext 활용**
   ```typescript
   // ButtonGroup이 size를 Context로 전달
   // ButtonGroupItem이 Context에서 size를 가져옴
   const { size } = useContext(ButtonGroupContext);
   ```

2. **Default Selection 시연**
   ```typescript
   export const WithDefaultSelection: Story = {
     render: () => (
       <ButtonGroup defaultValue="2">
         <ButtonGroupItem value="1">Option 1</ButtonGroupItem>
         <ButtonGroupItem value="2">Option 2</ButtonGroupItem>
         <ButtonGroupItem value="3">Option 3</ButtonGroupItem>
       </ButtonGroup>
     ),
   };
   ```

3. **Multiple Selection 시연**
   ```typescript
   export const MultipleSelection: Story = {
     render: () => (
       <ButtonGroup selectionMode="multiple">
         <ButtonGroupItem value="1">Filter 1</ButtonGroupItem>
         <ButtonGroupItem value="2">Filter 2</ButtonGroupItem>
         <ButtonGroupItem value="3">Filter 3</ButtonGroupItem>
       </ButtonGroup>
     ),
   };
   ```

4. **Icon Only Buttons**
   ```typescript
   export const IconOnly: Story = {
     render: () => (
       <ButtonGroup>
         <ButtonGroupItem value="star" iconLeading={Star} />
         <ButtonGroupItem value="check" iconLeading={Check} />
         <ButtonGroupItem value="trash" iconLeading={Trash} />
       </ButtonGroup>
     ),
   };
   ```

---

## 🔍 실제 사용 사례

1. **Text Alignment Toolbar**
   - Left, Center, Right, Justify
   - Icon only 버튼
   - Single selection

2. **View Mode Selector**
   - List, Grid, Timeline
   - Text with icons
   - Single selection

3. **Filter Toggle**
   - Active, Pending, Completed
   - Multiple selection
   - Small size

4. **Status Filter**
   - Draft, Review, Published, Archived
   - Multiple selection
   - Disabled state for unavailable options

---

**구현 완료 후 체크리스트를 반환하세요!**
