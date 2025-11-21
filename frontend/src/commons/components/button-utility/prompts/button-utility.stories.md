# ButtonUtility Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/button-utility/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/button-utility/index.stories.tsx
```

---

## 🎯 핵심요구사항

### ButtonUtility 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

**ButtonUtility는 아이콘 전용 유틸리티 버튼입니다:**
- 텍스트 레이블 없이 아이콘만 표시
- 작은 크기로 UI 공간 최소화
- Tooltip과 함께 사용하여 접근성 제공

---

## 📊 구현 범위

### 1. Size Variants (2가지)

| Size | Icon Size | Padding | Use Case |
|------|-----------|---------|----------|
| `xs` | `16px (w-4 h-4)` | `p-1.5` | 테이블 행, 인라인 액션 |
| `sm` | `20px (w-5 h-5)` | `p-1.5` | 기본 크기, 대부분의 경우 |

### 2. Color Variants (2가지)

| Color | Style | Use Case |
|-------|-------|----------|
| `secondary` | 배경 + 테두리 (Default) | 일반 액션 |
| `tertiary` | 투명 배경, 호버시 배경 | 미묘한 액션 |

### 3. 아이콘 종류

**Navigation & Actions:**
- ArrowRight, ArrowLeft, ArrowUp, ArrowDown
- Plus, Minus, Check, X

**File Operations:**
- Download, Upload, Send, Save
- Edit, Trash, Copy

**UI Controls:**
- Settings, MoreVertical, MoreHorizontal
- Star, Heart, Bell, Bookmark

### 4. State Variants

- Default
- Hover
- Disabled
- With Tooltip
- As Link (href prop)

### 5. Interactive Controls

- Storybook Controls로 모든 props 조작 가능
- Args 기반 스토리 구성

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components 통합 검증 (Button, Link)
- Tooltip 컴포넌트 통합 검증
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - aria-label (tooltip 텍스트 사용)
  - 키보드 접근성
  - Tooltip으로 맥락 제공

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ButtonUtility } from './index';
import { Settings, Plus, Download, /* ... */ } from '@/commons/components/icons';

const meta: Meta<typeof ButtonUtility> = {
  title: 'Commons/Components/ButtonUtility',
  component: ButtonUtility,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* ... */ },
};

export default meta;
type Story = StoryObj<typeof ButtonUtility>;
```

### 필수 Stories (10개)

1. **Default** - 기본 버튼
2. **AllSizes** - 2가지 사이즈 비교
3. **AllColors** - 2가지 컬러 비교
4. **CommonIcons** - 자주 사용하는 아이콘들
5. **WithTooltips** - 툴팁과 함께 사용
6. **States** - Disabled 상태
7. **AsLink** - href prop으로 링크 사용
8. **SizeColorMatrix** - 사이즈 x 컬러 조합
9. **RealUseCases** - 실제 사용 예시 (테이블, 헤더, 카드)
10. **Playground** - 모든 props 조작 가능

### 구현 예시

```typescript
// 1. Default
export const Default: Story = {
  args: {
    icon: Settings,
    size: 'sm',
    color: 'secondary',
  },
};

// 4. CommonIcons
export const CommonIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Navigation & Actions</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={ArrowRight} />
          <ButtonUtility icon={Plus} />
          <ButtonUtility icon={Check} />
        </div>
      </div>
    </div>
  ),
};

// 5. WithTooltips
export const WithTooltips: Story = {
  render: () => (
    <div className="flex gap-3 p-16">
      <ButtonUtility icon={Settings} tooltip="Settings" />
      <ButtonUtility icon={Download} tooltip="Download file" />
      <ButtonUtility icon={Settings} tooltip="Top placement" tooltipPlacement="top" />
      <ButtonUtility icon={Settings} tooltip="Right placement" tooltipPlacement="right" />
    </div>
  ),
};

// 9. RealUseCases
export const RealUseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Table Row Actions */}
      <div className="flex items-center gap-1 p-2 border rounded">
        <span className="flex-1 text-sm">John Doe</span>
        <ButtonUtility icon={Edit} tooltip="Edit" size="xs" />
        <ButtonUtility icon={Trash} tooltip="Delete" size="xs" />
      </div>

      {/* Header Toolbar */}
      <div className="flex items-center gap-2 p-3 border rounded">
        <h2 className="flex-1 font-semibold">Document Title</h2>
        <ButtonUtility icon={Star} tooltip="Favorite" />
        <ButtonUtility icon={Send} tooltip="Share" />
        <ButtonUtility icon={Download} tooltip="Download" />
      </div>
    </div>
  ),
};
```

---

## ✅ 검증 체크리스트

### 기능 검증

- [ ] 2가지 사이즈 (xs, sm) 모두 렌더링 확인
- [ ] 2가지 컬러 (secondary, tertiary) 모두 렌더링 확인
- [ ] 모든 아이콘 타입 정상 렌더링 (React Component, ReactNode)
- [ ] Disabled 상태 동작 확인
- [ ] Tooltip 통합 정상 동작 (4가지 placement)
- [ ] Link 모드 (href prop) 정상 동작
- [ ] Disabled link는 href 제거 확인

### Storybook 통합

- [ ] Controls 패널에서 모든 props 조작 가능
  - size: 'xs' | 'sm'
  - color: 'secondary' | 'tertiary'
  - isDisabled: boolean
  - tooltip: string
  - tooltipPlacement: 'top' | 'right' | 'bottom' | 'left'
- [ ] A11y 애드온 경고 없음
- [ ] 각 Story가 의미있는 이름과 설명 포함

### 접근성 검증

- [ ] aria-label 속성 자동 설정 (tooltip 값 사용)
- [ ] 키보드 내비게이션 지원 (Tab, Enter, Space)
- [ ] Tooltip이 스크린리더에 읽힘 (aria-describedby)
- [ ] Disabled 버튼은 포커스 불가
- [ ] Link 모드에서 href가 정상 적용

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] icon prop에 FC<{ className?: string }> | ReactNode 타입 지원
- [ ] ButtonProps와 LinkProps 유니온 타입 정상 동작

### 실전 사용성

- [ ] RealUseCases Story가 3가지 이상 실제 패턴 시연
  - 테이블 행 액션
  - 헤더 툴바
  - 카드 액션
- [ ] 각 패턴이 프로젝트에서 바로 복사 가능

---

## 🎨 ButtonUtility 컴포넌트 특징

### 1. 아이콘 전용 디자인

- 텍스트 레이블 없음 (icon만 표시)
- 정사각형 버튼 (p-1.5)
- 컴팩트한 UI 공간 활용

### 2. Tooltip 필수 권장

```typescript
// ✅ Good - Tooltip으로 맥락 제공
<ButtonUtility icon={Settings} tooltip="Settings" />

// ⚠️ Bad - Tooltip 없이 사용 (접근성 저하)
<ButtonUtility icon={Settings} />
```

### 3. 유연한 아이콘 타입 지원

```typescript
// React Component
<ButtonUtility icon={Settings} />

// ReactNode (JSX Element)
<ButtonUtility icon={<Settings className="w-5 h-5" />} />
```

### 4. Link 모드 지원

```typescript
// Button 모드
<ButtonUtility icon={Settings} onClick={handleClick} />

// Link 모드 (href 제공 시)
<ButtonUtility icon={Settings} href="/settings" />

// Disabled link는 href 제거됨
<ButtonUtility icon={Settings} href="/settings" isDisabled />
// → <a> 대신 <button>으로 렌더링
```

---

## 💡 사용 예시

### 테이블 행 액션

```typescript
<tr>
  <td>John Doe</td>
  <td>john@example.com</td>
  <td className="flex gap-1">
    <ButtonUtility icon={Edit} tooltip="Edit" size="xs" />
    <ButtonUtility icon={Download} tooltip="Download" size="xs" />
    <ButtonUtility icon={Trash} tooltip="Delete" size="xs" color="tertiary" />
  </td>
</tr>
```

### 헤더 툴바

```typescript
<header className="flex items-center gap-2 p-3">
  <h1 className="flex-1">Document Title</h1>
  <ButtonUtility icon={Star} tooltip="Add to favorites" />
  <ButtonUtility icon={Send} tooltip="Share" />
  <ButtonUtility icon={Download} tooltip="Download" />
  <ButtonUtility icon={MoreVertical} tooltip="More options" />
</header>
```

### 카드 액션

```typescript
<div className="card p-4">
  <div className="flex items-start justify-between mb-2">
    <h3>Card Title</h3>
    <ButtonUtility icon={MoreVertical} tooltip="Options" size="xs" color="tertiary" />
  </div>
  <p>Card content...</p>
  <div className="flex gap-2 mt-3">
    <ButtonUtility icon={Edit} tooltip="Edit" size="xs" />
    <ButtonUtility icon={Star} tooltip="Favorite" size="xs" />
  </div>
</div>
```

---

**구현 완료 후 위 체크리스트를 모두 검증하고 결과를 반환하세요!**
