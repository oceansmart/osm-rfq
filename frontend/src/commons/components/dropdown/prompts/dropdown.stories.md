# Dropdown Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components (Menu, MenuItem, Popover)
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/dropdown/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/dropdown/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Dropdown 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Component Structure (Compound Component Pattern)

```typescript
<Dropdown.Root>
  <Dropdown.DotsButton />
  <Dropdown.Popover>
    <Dropdown.Menu>
      <Dropdown.Item label="Edit" icon={Edit} />
      <Dropdown.Separator />
      <Dropdown.Item label="Delete" icon={Trash} />
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>
```

### 2. Sub-Components

| Component | Description |
|-----------|-------------|
| `Dropdown.Root` | MenuTrigger wrapper |
| `Dropdown.DotsButton` | 3-dot menu trigger button |
| `Dropdown.Popover` | Popover container for menu |
| `Dropdown.Menu` | Menu container |
| `Dropdown.Item` | Menu item with label, icon, addon |
| `Dropdown.Section` | Section wrapper for grouping |
| `Dropdown.SectionHeader` | Section header text |
| `Dropdown.Separator` | Visual separator line |

### 3. DropdownItem Props

- `label`: 메뉴 아이템 텍스트 (optional if children provided)
- `icon`: Leading 아이콘 컴포넌트
- `addon`: Trailing badge/counter 텍스트
- `isDisabled`: 비활성화 상태
- `unstyled`: 스타일 없는 커스텀 아이템
- `children`: 커스텀 렌더 함수

### 4. States

- Default (기본)
- Hover (마우스 오버)
- Focused (키보드 포커스)
- Disabled (비활성화)
- Pressed (클릭)

### 5. Popover Placement

- `bottom right` (default)
- Configurable via Popover props

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components (Menu, MenuItem, MenuTrigger, Popover) 통합 검증
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - ARIA roles (menu, menuitem, separator)
  - Keyboard navigation (Arrow keys, Enter, Escape, Tab)
  - Screen reader announcements
  - Focus management

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Dropdown } from './index';

const meta: Meta<typeof Dropdown.Root> = {
  title: 'Commons/Components/Dropdown',
  component: Dropdown.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown.Root>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 Dropdown (DotsButton trigger)
2. **With Icons** - 아이콘이 있는 메뉴 아이템
3. **With Addons** - Badge/카운터가 있는 아이템
4. **Disabled Items** - 비활성화된 아이템
5. **With Sections** - 섹션으로 그룹화된 메뉴
6. **Icon Only Items** - 아이콘만 있는 아이템
7. **Use Cases** - 실제 사용 사례 (User menu, Actions menu, Notifications)
8. **Long Menu** - 긴 메뉴 목록 (스크롤)
9. **Playground** - 인터랙티브 플레이그라운드

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] DotsButton 클릭 시 메뉴 열림/닫힘 확인
- [ ] 메뉴 아이템 클릭 시 동작 확인
- [ ] 아이콘 렌더링 확인 (leading position)
- [ ] Addon (badge/counter) 렌더링 확인
- [ ] Separator 렌더링 확인
- [ ] Section header 렌더링 확인
- [ ] Disabled state 스타일 및 동작 확인
- [ ] Hover state CSS 전환 확인
- [ ] Focus state CSS 전환 확인

### 접근성 (A11y)
- [ ] 키보드 내비게이션 (Arrow Up/Down, Enter, Escape) 동작
- [ ] ARIA roles 확인 (menu, menuitem, separator)
- [ ] ARIA labels 확인 (DotsButton의 "Open menu")
- [ ] Focus management (메뉴 열릴 때 첫 아이템으로 포커스)
- [ ] Disabled items가 키보드 포커스 받지 않음 확인
- [ ] Tab 키로 메뉴 닫힘 확인
- [ ] Escape 키로 메뉴 닫힘 확인

### Storybook 통합
- [ ] 모든 Stories 렌더링 확인
- [ ] Args 기반 스토리 구성 (Playground)
- [ ] MDX 문서화 (선택사항)
- [ ] A11y 애드온 경고 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] Compound component pattern 타입 안전성

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] Popover shadow 및 border 정확히 렌더링 확인
- [ ] Menu item hover/focus 스타일 정확히 렌더링 확인

---

## 🎨 디자인 토큰 참조

### Dropdown 컴포넌트가 사용하는 스타일

#### Popover Container

```css
/* 컨테이너 */
.w-62.rounded-lg.bg-primary.shadow-lg.ring-1.ring-secondary_alt

/* 애니메이션 */
.animate-in.fade-in.slide-in-from-top-0.5
.animate-out.fade-out.slide-out-to-top-0.5
```

#### Menu Item

```css
/* 기본 */
--color-bg-transparent: 배경색
--color-text-secondary: 텍스트 색상
--color-text-fg-quaternary: 아이콘 색상

/* Hover/Focus */
--color-bg-primary_hover: 배경색
--color-text-secondary_hover: 텍스트 색상

/* Disabled */
--color-text-disabled: 텍스트 색상
--color-text-fg-disabled: 아이콘 색상

/* Focus Ring */
--color-outline-focus-ring: Focus outline 색상
```

#### Separator

```css
--color-bg-border-secondary: Separator 색상
```

---

## 📚 참고 문서

- [Dropdown Component Source](../index.tsx)
- [Button Component Stories](../../button/index.stories.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Foundation Token Override Guide](../../../../../../docs/frontend/foundation-token-override-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria Menu](https://react-spectrum.adobe.com/react-aria/Menu.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Dropdown**

---

## 💡 구현 팁

1. **기본 Dropdown**
   ```typescript
   export const Default: Story = {
     render: () => (
       <Dropdown.Root>
         <Dropdown.DotsButton />
         <Dropdown.Popover>
           <Dropdown.Menu>
             <Dropdown.Item label="Edit" icon={Edit} />
             <Dropdown.Item label="Delete" icon={Trash} />
           </Dropdown.Menu>
         </Dropdown.Popover>
       </Dropdown.Root>
     ),
   };
   ```

2. **Addon 사용**
   ```typescript
   <Dropdown.Item label="Messages" icon={User} addon="12" />
   <Dropdown.Item label="Updates" icon={Download} addon="New" />
   ```

3. **섹션 그룹화**
   ```typescript
   <Dropdown.Menu>
     <Dropdown.Section>
       <Dropdown.SectionHeader>Account</Dropdown.SectionHeader>
       <Dropdown.Item label="Profile" icon={User} />
       <Dropdown.Item label="Settings" icon={Settings} />
     </Dropdown.Section>
     <Dropdown.Separator />
     <Dropdown.Section>
       <Dropdown.SectionHeader>Actions</Dropdown.SectionHeader>
       <Dropdown.Item label="Edit" icon={Edit} />
     </Dropdown.Section>
   </Dropdown.Menu>
   ```

4. **Disabled Item**
   ```typescript
   <Dropdown.Item label="Delete" icon={Trash} isDisabled />
   ```

5. **커스텀 렌더링**
   ```typescript
   <Dropdown.Item icon={Edit} aria-label="Edit">
     {(state) => (
       <span className={state.isFocused ? 'text-brand' : ''}>
         Custom Content
       </span>
     )}
   </Dropdown.Item>
   ```

---

## 🔍 실제 사용 사례

1. **User Menu**
   - Profile, Settings, Logout
   - 아이콘 + 텍스트
   - Separator로 그룹 구분

2. **Actions Menu**
   - Edit, Duplicate, Download, Share
   - Archive, Delete (destructive actions)
   - 섹션으로 그룹화

3. **Notifications Menu**
   - Messages, Updates, Favorites
   - Addon으로 카운터 표시
   - Badge로 "New" 표시

4. **Context Menu**
   - 우클릭 메뉴
   - Copy, Paste, Cut
   - 키보드 shortcut 표시

---

## 🎯 키보드 내비게이션 가이드

| 키 | 동작 |
|----|------|
| `Space` / `Enter` | 메뉴 열기 (trigger에 포커스) |
| `Arrow Down` | 다음 아이템으로 포커스 이동 |
| `Arrow Up` | 이전 아이템으로 포커스 이동 |
| `Enter` | 포커스된 아이템 선택 |
| `Escape` | 메뉴 닫기 |
| `Tab` | 메뉴 닫고 다음 focusable element로 이동 |
| `Home` | 첫 번째 아이템으로 포커스 이동 |
| `End` | 마지막 아이템으로 포커스 이동 |

---

**구현 완료 후 체크리스트를 반환하세요!**
