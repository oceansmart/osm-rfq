# Breadcrumbs Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/breadcrumbs/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/breadcrumbs/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Breadcrumbs 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Type Variants (3가지)

- **text** (기본) - 텍스트만으로 구성된 breadcrumbs
- **text-line** - 텍스트 + 상단/하단 border line
- **button** - 버튼 스타일 (hover 배경)

| Type | Visual Style | Use Case |
|------|--------------|----------|
| `text` | 기본 텍스트 | 일반 페이지 내비게이션 |
| `text-line` | Border line 강조 | 페이지 헤더 영역 |
| `button` | Interactive 강조 | 대시보드, 설정 페이지 |

### 2. Divider Variants (2가지)

- **chevron** (기본) - ChevronRight 아이콘 (>)
- **slash** - SlashDivider 아이콘 (/)

| Divider | Icon | Use Case |
|---------|------|----------|
| `chevron` | `>` | 계층적 내비게이션 강조 |
| `slash` | `/` | URL 경로 표현 |

### 3. Icon Support

- Icon only (첫 번째 항목 Home 아이콘만)
- Icon + Text (모든 항목에 아이콘)
- Text only (아이콘 없음)

### 4. Max Visible Items (Ellipsis)

- 기본값: 4개
- 초과 시 중간 항목을 `...`로 축약
- 클릭하여 전체 펼치기 가능

### 5. State Variants

- Default (일반 항목)
- Current (현재 페이지, isCurrent)
- Hover (마우스 오버)

### 6. Interactive Controls

- Storybook Controls로 모든 props 조작 가능
- Args 기반 스토리 구성

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components 통합 검증
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - `aria-label="Breadcrumbs"`
  - `aria-label="See all breadcrumb items"` (ellipsis)
  - 키보드 내비게이션 지원

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Home, Settings, FileText, Users } from '@/commons/components/icons';
import { Breadcrumbs } from './index';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Commons/Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    divider: {
      control: 'radio',
      options: ['chevron', 'slash'],
      description: 'Divider type between breadcrumb items',
    },
    type: {
      control: 'radio',
      options: ['text', 'text-line', 'button'],
      description: 'Visual style of breadcrumbs',
    },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum number of visible items before collapsing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 chevron divider + text type
2. **DividerTypes** - chevron vs slash 비교
3. **DisplayTypes** - text, text-line, button 비교
4. **WithIcons** - 아이콘이 있는 breadcrumbs (text, button, icon only)
5. **MaxVisibleItems** - ellipsis 동작 (4개, 3개 제한)
6. **ShortPaths** - 짧은 경로 (2개, 1개 항목)
7. **ResponsiveExample** - 반응형 동작 확인
8. **RealWorldExamples** - 실제 사용 예시 (E-commerce, Docs, Admin)
9. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 type variants 렌더링 확인 (text, text-line, button)
- [ ] 모든 divider variants 렌더링 확인 (chevron, slash)
- [ ] Icon leading 동작 확인
- [ ] maxVisibleItems ellipsis 동작 확인 (축약 → 펼치기)
- [ ] Current page (isCurrent) 스타일 확인
- [ ] Hover 상태 CSS 전환 확인
- [ ] 키보드 내비게이션 동작 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] MDX 문서화 (선택사항)
- [ ] A11y 애드온 경고 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] BreadcrumbType union type 정확히 처리

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] OSM 브랜드 컬러 적용 확인 (current 상태)
- [ ] OSM 폰트 적용 확인 (`--font-body`)

---

## 🎨 디자인 토큰 참조

### Breadcrumbs 컴포넌트가 사용하는 토큰

**Text Colors:**
- `--fg-quaternary` - 일반 항목 텍스트
- `--fg-quaternary_hover` - 일반 항목 호버
- `--fg-brand-primary` - 현재 페이지 아이콘
- `--color-brand-secondary` - 현재 페이지 텍스트

**Background Colors (Button Type):**
- `--bg-primary_hover` - 버튼 호버 배경

**Border Colors (Text-Line Type):**
- `--border-secondary` - 상단/하단 border

**Typography:**
- `text-sm font-semibold` - 항목 텍스트 스타일

---

## 📚 참고 문서

- [Breadcrumbs Component Source](../index.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [React Aria Breadcrumbs](https://react-spectrum.adobe.com/react-aria/Breadcrumbs.html)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Breadcrumbs**

---

## 💡 구현 팁

1. **아이콘 Import**
   ```typescript
   import { Home, Settings, FileText, Users } from '@/commons/components/icons';
   ```

2. **Ellipsis 동작 시연**
   ```typescript
   export const MaxVisibleItems: Story = {
     render: () => (
       <Breadcrumbs maxVisibleItems={4}>
         <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
         <Breadcrumbs.Item href="/level1">Level 1</Breadcrumbs.Item>
         {/* ... 8개 항목 */}
       </Breadcrumbs>
     ),
   };
   ```

3. **Icon Only (Home)**
   ```typescript
   <Breadcrumbs type="button">
     <Breadcrumbs.Item href="/" icon={Home} />
     <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
     <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
   </Breadcrumbs>
   ```

4. **Real World Examples**
   ```typescript
   // E-commerce: text type
   <Breadcrumbs type="text">
     <Breadcrumbs.Item href="/" icon={Home}>Home</Breadcrumbs.Item>
     <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
     <Breadcrumbs.Item>MacBook Pro 16"</Breadcrumbs.Item>
   </Breadcrumbs>

   // Documentation: button type + slash
   <Breadcrumbs type="button" divider="slash">
     <Breadcrumbs.Item href="/" icon={Home}>Docs</Breadcrumbs.Item>
     <Breadcrumbs.Item href="/guides">Guides</Breadcrumbs.Item>
     <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
   </Breadcrumbs>

   // Admin Dashboard: text-line type
   <Breadcrumbs type="text-line">
     <Breadcrumbs.Item href="/dashboard" icon={Home}>Dashboard</Breadcrumbs.Item>
     <Breadcrumbs.Item href="/settings" icon={Settings}>Settings</Breadcrumbs.Item>
     <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
   </Breadcrumbs>
   ```

---

## 🔍 접근성 (a11y) 체크리스트

- [ ] `<nav aria-label="Breadcrumbs">` 사용
- [ ] 현재 페이지는 `aria-current="page"` (React Aria 자동 처리)
- [ ] Ellipsis 버튼은 `aria-label="See all breadcrumb items"` 포함
- [ ] 키보드로 모든 항목 접근 가능 (Tab)
- [ ] 스크린리더가 경로를 순서대로 읽음
- [ ] 링크와 현재 페이지 구분 명확

---

**구현 완료 후 체크리스트를 반환하세요!**
