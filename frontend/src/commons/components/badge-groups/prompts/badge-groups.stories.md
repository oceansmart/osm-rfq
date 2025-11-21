# BadgeGroup Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React (custom implementation)
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/badge-groups/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/badge-groups/index.stories.tsx
```

---

## 🎯 핵심요구사항

### BadgeGroup 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Size Variants (2가지)

- md (default)
- lg

| Size | Padding | Font | Use Case |
|------|---------|------|----------|
| `md` | `py-1 px-2` | `text-xs` | Compact badges, Inline counters |
| `lg` | `py-1 px-2.5` | `text-sm` | Prominent badges, Larger displays |

### 2. Color Variants (5가지)

- brand (default)
- gray
- error
- warning
- success

### 3. Theme Variants (2가지)

- **light**: 기본 테마, rounded-full, ring border
- **modern**: 현대적 테마, rounded-[10px], dot indicator

### 4. Alignment (2가지)

- **leading**: Addon이 앞에 위치
- **trailing**: Addon이 뒤에 위치

### 5. Component Structure

```typescript
<BadgeGroup
  addonText="100"
  size="md"
  color="brand"
  theme="light"
  align="leading"
  iconTrailing={ArrowRight}
>
  Label Text
</BadgeGroup>
```

### 6. Props

- `children`: 메인 텍스트 (optional)
- `addonText`: Addon 영역 텍스트 (required)
- `size`: 사이즈 variant
- `color`: 컬러 variant
- `theme`: 테마 variant
- `align`: Addon 위치
- `iconTrailing`: Trailing 아이콘 컴포넌트
- `className`: 추가 CSS 클래스

### 7. Interactive Controls

- Storybook Controls로 모든 props 조작 가능
- Args 기반 스토리 구성

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React custom implementation (React Aria 미사용)
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - ARIA labels (선택사항)
  - Semantic HTML
  - Color contrast compliance

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { BadgeGroup } from './index';

const meta: Meta<typeof BadgeGroup> = {
  title: 'Commons/Components/BadgeGroup',
  component: BadgeGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['brand', 'gray', 'error', 'warning', 'success'],
    },
    theme: {
      control: 'radio',
      options: ['light', 'modern'],
    },
    align: {
      control: 'radio',
      options: ['leading', 'trailing'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeGroup>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 BadgeGroup (light theme, leading align)
2. **All Sizes** - 2가지 사이즈 비교
3. **All Colors** - 5가지 컬러 비교 (light + modern themes)
4. **Themes** - Light vs Modern theme 비교
5. **Alignment** - Leading vs Trailing alignment
6. **With Icons** - Trailing icon variants
7. **Addon Only** - Text 없이 Addon만 표시
8. **Use Cases** - 실제 사용 사례 (Notifications, Status counters, Filters)
9. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (md, lg)
- [ ] 모든 color variants 렌더링 확인 (5가지)
- [ ] 모든 theme variants 렌더링 확인 (light, modern)
- [ ] Leading alignment 동작 확인
- [ ] Trailing alignment 동작 확인
- [ ] Trailing icon 렌더링 확인
- [ ] Addon only (children 없음) 렌더링 확인
- [ ] Modern theme의 dot indicator 렌더링 확인
- [ ] Hover 상태 CSS 전환 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] MDX 문서화 (선택사항)
- [ ] A11y 애드온 경고 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] Required props (addonText) 검증
- [ ] Optional props (children) 처리 확인

### 접근성 (A11y)
- [ ] 색상 대비 비율 확인 (WCAG AA 기준)
- [ ] Semantic HTML 사용 확인
- [ ] 스크린리더 테스트 (optional)

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] Color utilities (utility-brand-*, utility-gray-* 등) 적용 확인
- [ ] 테마별 스타일 정확히 렌더링 확인

---

## 🎨 디자인 토큰 참조

### BadgeGroup 컴포넌트가 사용하는 스타일

#### Light Theme

```css
/* 컨테이너 */
.rounded-full.ring-1.ring-inset

/* Brand */
--color-bg-utility-brand-50: 배경색
--color-text-utility-brand-700: 텍스트 색상
--color-ring-utility-brand-200: Border 색상

/* Gray */
--color-bg-utility-gray-50
--color-text-utility-gray-700
--color-ring-utility-gray-200

/* Error */
--color-bg-utility-error-50
--color-text-utility-error-700
--color-ring-utility-error-200

/* Warning */
--color-bg-utility-warning-50
--color-text-utility-warning-700
--color-ring-utility-warning-200

/* Success */
--color-bg-utility-success-50
--color-text-utility-success-700
--color-ring-utility-success-200
```

#### Modern Theme

```css
/* 컨테이너 */
.rounded-[10px].bg-primary.text-secondary.shadow-xs.ring-1.ring-inset

/* Dot Indicator */
--color-bg-utility-brand-500: Dot 배경색
--color-outline-utility-brand-100: Dot outline 색상
```

---

## 📚 참고 문서

- [BadgeGroup Component Source](../index.tsx)
- [Button Component Stories](../../button/index.stories.tsx)
- [Badge Component Stories](../../badge/index.stories.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Foundation Token Override Guide](../../../../../../docs/frontend/foundation-token-override-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → BadgeGroup**

---

## 💡 구현 팁

1. **Addon Only Variant**
   ```typescript
   export const AddonOnly: Story = {
     render: () => (
       <div className="flex gap-3">
         <BadgeGroup addonText="100" color="brand" align="leading" />
         <BadgeGroup addonText="25" color="error" align="trailing" />
       </div>
     ),
   };
   ```

2. **Modern Theme with Dot**
   ```typescript
   export const ModernTheme: Story = {
     render: () => (
       <BadgeGroup addonText="New" color="brand" theme="modern">
         Notifications
       </BadgeGroup>
     ),
   };
   ```

3. **Trailing Alignment**
   ```typescript
   export const TrailingAlign: Story = {
     render: () => (
       <BadgeGroup addonText="100" color="brand" align="trailing">
         Messages
       </BadgeGroup>
     ),
   };
   ```

4. **Custom Icon**
   ```typescript
   import { Plus } from '@/commons/components/icons';

   export const WithCustomIcon: Story = {
     render: () => (
       <BadgeGroup addonText="New" color="success" iconTrailing={Plus}>
         Add Item
       </BadgeGroup>
     ),
   };
   ```

---

## 🔍 실제 사용 사례

1. **Notification Counters**
   - Leading addon with count
   - Brand or error color
   - Medium size

2. **Status Badges**
   - Modern theme with dot indicator
   - Success, warning, or error color
   - Trailing alignment

3. **Category Filters**
   - Large size
   - Trailing addon with item count
   - Gray or brand color

4. **Activity Indicators**
   - Modern theme
   - Small addon text
   - Color-coded by activity type

---

**구현 완료 후 체크리스트를 반환하세요!**
