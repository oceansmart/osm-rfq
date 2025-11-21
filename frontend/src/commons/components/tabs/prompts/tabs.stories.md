# Tabs Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/tabs/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/tabs/index.stories.tsx
```

## 🎯 핵심요구사항

### Tabs 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

## 📊 구현 범위

### 1. Orientation (방향)

**Variants**:
- `horizontal` (기본값)
- `vertical`

**특징**:
- Horizontal: 가로 레이아웃, 5가지 타입 지원
- Vertical: 세로 레이아웃, 5가지 타입 지원 (line 포함)

### 2. Horizontal Types (가로 탭 타입)

**Variants**:
- `button-brand`: 브랜드 색상 버튼 스타일
- `button-gray`: 회색 버튼 스타일
- `button-border`: 테두리가 있는 버튼 스타일 (컨테이너 포함)
- `button-minimal`: 최소한의 스타일 버튼
- `underline`: 밑줄 스타일 (하단 border 포함)

**States**:
- Default (unselected)
- Selected
- Hovered
- Focus visible
- Disabled

**A11y**:
- Tab/TabList/TabPanel ARIA roles
- Arrow key 내비게이션
- Focus management
- Keyboard activation: manual (선택을 위해 Enter/Space 필요)

### 3. Vertical Types (세로 탭 타입)

**Variants**:
- `button-brand`: 브랜드 색상 버튼 스타일
- `button-gray`: 회색 버튼 스타일
- `button-border`: 테두리가 있는 버튼 스타일
- `button-minimal`: 최소한의 스타일 버튼
- `line`: 왼쪽 라인 스타일 (vertical 전용)

**States**: Horizontal과 동일

### 4. Size (크기)

**Variants**:
- `sm` (기본값): 작은 크기
- `md`: 중간 크기

**Specifications**:
- sm: text-sm, 적절한 padding
- md: text-md, 더 큰 padding

### 5. Badge (뱃지)

**Props**:
- `badge`: number | string

**Features**:
- 탭 레이블 옆에 pill-color 타입의 Badge 표시
- 색상은 탭 상태에 따라 자동 변경 (brand/gray)
- md 이상 화면에서만 표시 (hidden md:flex)
- 크기는 탭 크기에 맞춰 자동 조정

### 6. Full Width

**Props**:
- `fullWidth`: boolean

**Features**:
- 각 탭이 동일한 너비로 확장
- underline 타입에서 gap이 증가 (gap-3 → gap-4)
- flex-1 클래스로 균등 분할

## 📚 Stories 구성

### 필수 Stories

1. **Default**: 기본 button-brand 스타일
2. **HorizontalButtonBrand**: Button Brand 타입 (sm, md)
3. **HorizontalButtonGray**: Button Gray 타입 (sm, md)
4. **HorizontalButtonBorder**: Button Border 타입 (sm, md)
5. **HorizontalButtonMinimal**: Button Minimal 타입 (sm, md)
6. **HorizontalUnderline**: Underline 타입 (sm, md)
7. **VerticalButtonTypes**: 모든 Vertical 타입 비교
8. **WithBadges**: 뱃지가 포함된 탭
9. **FullWidth**: 전체 너비 탭
10. **AllVariants**: 모든 타입 한눈에 보기
11. **Playground**: Interactive controls

### Story 구조

```typescript
export const StoryName: Story = {
  render: () => (
    <div className="w-[600px]">
      <Tabs>
        <Tabs.List items={tabItems} size="md" type="button-brand" />
        <Tabs.Panel id="tab1">
          <div className="p-6 text-sm text-gray-700">
            Panel content
          </div>
        </Tabs.Panel>
        {/* 추가 panels */}
      </Tabs>
    </div>
  ),
};
```

### 샘플 데이터

```typescript
const horizontalTabs = [
  { id: 'tab1', label: 'My details', children: 'My details' },
  { id: 'tab2', label: 'Profile', children: 'Profile' },
  { id: 'tab3', label: 'Password', children: 'Password' },
  { id: 'tab4', label: 'Team', children: 'Team' },
  { id: 'tab5', label: 'Billing', children: 'Billing' },
];

const horizontalTabsWithBadge = [
  { id: 'tab1', label: 'My details', children: 'My details', badge: 8 },
  { id: 'tab2', label: 'Profile', children: 'Profile', badge: 12 },
  { id: 'tab3', label: 'Password', children: 'Password' },
  { id: 'tab4', label: 'Team', children: 'Team', badge: 3 },
  { id: 'tab5', label: 'Billing', children: 'Billing', badge: '99+' },
];
```

## 🎨 시각적 레이아웃

### Width Constraints

- Horizontal tabs: `w-[600px]` (고정 너비)
- Vertical tabs: 자동 너비 (w-max)
- AllVariants: `max-w-4xl` (최대 너비 제한)

### Spacing

```typescript
// Gap between stories
<div className="flex flex-col gap-6">

// Gap in AllVariants
<div className="flex flex-col gap-8">

// Gap for vertical comparison
<div className="flex flex-wrap gap-8">
```

## ✅ 검증 체크리스트

### 기능 검증

- [ ] 모든 Horizontal 타입 렌더링 확인 (5가지)
- [ ] 모든 Vertical 타입 렌더링 확인 (5가지)
- [ ] 두 가지 크기 (sm, md) 동작 확인
- [ ] Badge 표시/숨김 동작 확인
- [ ] FullWidth 동작 확인
- [ ] Tab 선택 시 Panel 전환 확인
- [ ] Keyboard 내비게이션 (Arrow keys) 동작 확인
- [ ] Focus 상태 시각적 표시 확인

### Storybook 통합

- [ ] Controls 패널에서 props 조작 가능 (Playground)
- [ ] A11y 애드온 경고 없음
- [ ] 모든 타입이 예상대로 렌더링됨
- [ ] Badge가 md 이상에서만 표시됨

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] TabListComponentProps 제네릭 타입 정확함
- [ ] BadgeColors 타입 import 확인

### 시각적 품질

- [ ] Horizontal tabs가 600px width에 맞게 표시됨
- [ ] Vertical tabs가 적절한 높이로 표시됨
- [ ] Selected 상태가 명확하게 구분됨
- [ ] Hover 상태가 부드럽게 전환됨
- [ ] Focus ring이 정확한 위치에 표시됨

### React Aria 통합

- [ ] TabsContext가 올바르게 전달됨
- [ ] orientation prop이 TabList와 Tabs에서 동기화됨
- [ ] keyboardActivation="manual" 동작 확인

**구현 완료 후 체크리스트를 반환하세요!**

## 💡 구현 팁

### Compound Component Pattern

```typescript
<Tabs>
  <Tabs.List items={items} />
  <Tabs.Panel id="tab1">Content</Tabs.Panel>
</Tabs>

// 내부 구조
Tabs.Panel = TabPanel;
Tabs.List = TabList;
Tabs.Item = Tab;
```

### Orientation 전달

```typescript
// Tabs에서 orientation 설정
<Tabs orientation="vertical">
  {/* TabList는 context에서 자동으로 orientation 가져옴 */}
  <Tabs.List items={items} />
</Tabs>

// 또는 TabList에서 직접 설정
<Tabs.List items={items} orientation="vertical" />
```

### Badge 색상 자동 변경

```typescript
// getColorStyles 함수가 탭 상태에 따라 색상 결정
const color = getColorStyles({ isSelected, isHovered })[type];
// → "brand" (selected/hovered) 또는 "gray" (default)
```

### Full Width 사용

```typescript
<Tabs.List
  items={items}
  type="underline"
  fullWidth // 모든 탭이 동일한 너비로 확장
/>
```

## 🔍 테스트 시나리오

1. **Type Comparison**: 각 타입의 시각적 차이 확인
2. **Size Comparison**: sm과 md의 크기 차이 확인
3. **Badge Display**: md 이상에서만 표시되는지 확인
4. **Full Width**: 탭들이 균등하게 분할되는지 확인
5. **Keyboard Navigation**: Arrow keys로 탭 전환 확인
6. **Panel Switching**: 탭 선택 시 올바른 패널 표시 확인
7. **Focus Management**: Focus 이동이 자연스러운지 확인
8. **Vertical Layout**: Vertical orientation에서 레이아웃 확인

## 📖 참고 자료

- [Button Stories 패턴](../../button/index.stories.tsx)
- [React Aria Tabs](https://react-spectrum.adobe.com/react-aria/Tabs.html)
- [Badge Component](../../badge/index.tsx)
