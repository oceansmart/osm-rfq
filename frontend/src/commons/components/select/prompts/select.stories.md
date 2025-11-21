# Select Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/select/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/select/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Select 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Select Component Variants

#### Size Variants (2가지)
- `sm` - Small select (py-2 px-3)
- `md` - Medium select (py-2.5 px-3.5)

#### Item Types
- **Basic Items** - Label only
- **Items with Icons** - Icon + Label
- **Items with Supporting Text** - Label + Supporting Text (e.g., price, email)
- **Items with Avatars** - Avatar + Label + Supporting Text (e.g., user selection)
- **Disabled Items** - Non-selectable items

#### State Variants
- Default
- Open/Closed
- Disabled
- Required
- Invalid/Error
- With Label
- With Hint Text
- With Tooltip

### 2. ComboBox Component Variants

#### Features
- Searchable select with filter functionality
- Keyboard shortcut badge (⌘K)
- All Select item types supported
- Focus and search highlighting

#### Variants
- With shortcut badge (default)
- Without shortcut badge
- Small (sm) and Medium (md) sizes

### 3. SelectItem Component

#### Props
- `id` - Unique identifier
- `label` - Display text
- `icon` - Optional leading icon
- `avatarUrl` - Optional avatar image
- `supportingText` - Optional secondary text
- `isDisabled` - Disable specific item

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components 통합 검증
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함:
  - ARIA attributes (aria-label, aria-describedby)
  - Keyboard navigation (Arrow keys, Enter, Escape)
  - Screen reader support

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Select } from './index';

const meta: Meta<typeof Select> = {
  title: 'Commons/Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    hint: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Stories...
```

### 필수 Stories

#### Select Component Stories
1. **Default** - Basic select with simple items
2. **All Sizes** - Size comparison (sm vs md)
3. **With Label and Hint** - Form integration
4. **With Icons** - Icon leading items
5. **With Avatars** - User/team member selection
6. **With Supporting Text** - Additional context (prices, emails)
7. **States** - All state variants (default, required, invalid, disabled)
8. **Disabled Items** - Mix of enabled/disabled items

#### ComboBox Stories
9. **ComboBox** - Searchable select variants
10. **ComboBox No Shortcut** - Without keyboard shortcut badge
11. **Variants Comparison** - All variants side-by-side

#### Interactive
12. **Playground** - All props adjustable via Controls

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (sm, md)
- [ ] Select 드롭다운 열기/닫기 동작 확인
- [ ] 아이템 선택 시 값 반영 확인
- [ ] Icon leading 렌더링 확인
- [ ] Avatar 렌더링 확인
- [ ] Supporting text 렌더링 확인
- [ ] Disabled items 선택 불가 확인
- [ ] ComboBox 검색 필터링 동작 확인
- [ ] Keyboard shortcut badge (⌘K) 표시 확인
- [ ] Label, hint, tooltip 렌더링 확인
- [ ] Required state 표시 확인
- [ ] Invalid/Error state 스타일 확인
- [ ] Disabled state 동작 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] A11y 애드온 경고 없음
- [ ] 모든 Stories 렌더링 에러 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] SelectItemType 타입 정확히 적용
- [ ] Generic 타입 파라미터 올바르게 처리

### 접근성 (a11y)
- [ ] Keyboard navigation (Arrow keys, Enter, Escape)
- [ ] Screen reader 레이블 적절히 설정
- [ ] Focus indicators 표시
- [ ] ARIA attributes 적용 확인
- [ ] Disabled items 접근 불가

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] OSM 브랜드 컬러 적용 확인
- [ ] Focus ring 스타일 확인 (--color-focus-ring)

---

## 🎨 디자인 토큰 참조

### Select Component가 사용하는 토큰

```css
/* Colors */
--color-brand           /* Focus ring */
--color-primary         /* Background */
--color-disabled_subtle /* Disabled background */
--color-active          /* Selected item background */
--color-primary_hover   /* Hover background */

/* Text Colors */
--color-text-primary    /* Label text */
--color-text-secondary  /* Supporting text */
--color-text-tertiary   /* Hint text */
--color-text-disabled   /* Disabled text */
--color-text-placeholder /* Placeholder text */

/* Icon Colors */
--color-fg-quaternary    /* Default icon color */
--color-fg-brand-primary /* Selected item icon */
--color-fg-disabled      /* Disabled icon */

/* Typography */
--font-body             /* Text font */
--text-md               /* Text size */
```

---

## 📚 참고 문서

- [Select Component Source](../index.tsx)
- [Button Stories Reference](../../button/index.stories.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria Select](https://react-spectrum.adobe.com/react-aria/Select.html)
- [React Aria ComboBox](https://react-spectrum.adobe.com/react-aria/ComboBox.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Select**

---

## 💡 구현 팁

### 1. Sample Data 준비

```typescript
const basicItems = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

const itemsWithIcons = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'user', label: 'Profile', icon: UserIcon },
];

const itemsWithAvatars = [
  {
    id: '1',
    label: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    supportingText: 'john@example.com'
  },
];
```

### 2. Select 사용 예시

```typescript
export const WithIcons: Story = {
  render: () => (
    <div className="w-80">
      <Select label="Navigation" placeholder="Select page">
        {itemsWithIcons.map((item) => (
          <Select.Item
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </Select>
    </div>
  ),
};
```

### 3. ComboBox 사용 예시

```typescript
export const SearchableSelect: Story = {
  render: () => (
    <div className="w-80">
      <Select.ComboBox
        label="Search"
        placeholder="Type to search..."
        shortcut={true}
      >
        {items.map((item) => (
          <Select.Item key={item.id} {...item} />
        ))}
      </Select.ComboBox>
    </div>
  ),
};
```

### 4. State 시연

```typescript
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      {/* Default */}
      <Select label="Default" placeholder="Select...">
        {items}
      </Select>

      {/* Required */}
      <Select label="Required" isRequired hint="This field is required">
        {items}
      </Select>

      {/* Invalid */}
      <Select label="Invalid" isInvalid hint="Please select a valid option">
        {items}
      </Select>

      {/* Disabled */}
      <Select label="Disabled" isDisabled>
        {items}
      </Select>
    </div>
  ),
};
```

### 5. 접근성 테스트

Storybook에서 A11y 애드온으로 확인:
- Focus order
- ARIA labels
- Keyboard navigation
- Color contrast

---

## 🔍 주요 검증 포인트

### Select Component
1. ✅ 드롭다운이 trigger width에 맞춰 렌더링
2. ✅ 선택된 아이템이 trigger에 표시
3. ✅ Placeholder가 선택 전에만 표시
4. ✅ ChevronDown 아이콘이 항상 우측에 표시
5. ✅ Focus ring이 trigger 주위에 표시

### ComboBox Component
1. ✅ 검색 입력 시 필터링 동작
2. ✅ SearchIcon이 좌측에 표시
3. ✅ Keyboard shortcut badge (⌘K)가 우측에 표시
4. ✅ 검색어가 selected item과 일치하도록 표시
5. ✅ Focus 시 popover width가 trigger와 동일

### SelectItem Component
1. ✅ Icon 또는 Avatar가 좌측에 표시
2. ✅ Label이 중앙에 truncate로 표시
3. ✅ Supporting text가 label 옆에 표시
4. ✅ Check icon이 선택된 아이템 우측에 표시
5. ✅ Disabled 아이템은 회색으로 표시되고 선택 불가

---

**구현 완료 후 체크리스트를 반환하세요!**
