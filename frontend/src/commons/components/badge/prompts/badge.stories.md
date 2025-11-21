# Badge Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/badge/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/badge/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Badge 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Type Variants (3가지)

- pill-color (기본, 둥근 모양)
- color (모서리가 둥근 사각형)
- modern (그림자 효과 포함)

| Type | Shape | Shadow | Use Case |
|------|-------|--------|----------|
| `pill-color` | `rounded-full` | 없음 | 기본 라벨, 태그 |
| `color` | `rounded-md` | 없음 | 상태 표시, 카테고리 |
| `modern` | `rounded-md` | `shadow-xs` | 강조된 라벨 |

### 2. Size Variants (3가지)

- sm
- md
- lg

| Size | Padding (Pill) | Padding (Badge) | Font | Use Case |
|------|----------------|-----------------|------|----------|
| `sm` | `px-2 py-0.5` | `px-1.5 py-0.5` | `text-xs` | Compact UI, 인라인 태그 |
| `md` | `px-2.5 py-0.5` | `px-2 py-0.5` | `text-sm` | Default size, 일반 라벨 |
| `lg` | `px-3 py-1` | `px-2.5 py-1` | `text-sm` | 강조된 라벨 |

### 3. Color Variants (12가지)

**Base Colors:**
- gray
- brand

**Status Colors:**
- error
- warning
- success

**Extended Colors:**
- gray-blue
- blue-light
- blue
- indigo
- purple
- pink
- orange

### 4. Component Variants (7가지)

1. **Badge** - 기본 Badge
2. **BadgeWithDot** - 상태 표시 점이 있는 Badge
3. **BadgeWithIcon** - 아이콘이 있는 Badge (Leading/Trailing)
4. **BadgeWithFlag** - 국가 플래그가 있는 Badge
5. **BadgeWithImage** - 커스텀 이미지가 있는 Badge
6. **BadgeWithButton** - 닫기 버튼이 있는 Badge
7. **BadgeIcon** - 아이콘만 있는 Badge

### 5. Interactive Features

- BadgeWithButton의 onButtonClick 이벤트
- 다양한 아이콘 조합
- 국가 플래그 및 이미지 로딩

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- Untitled UI 디자인 토큰 활용 (--utility-brand-*, --utility-error-*, etc.)
- 접근성 (a11y) 검증 포함
  - BadgeWithButton의 aria-label 필수
  - 키보드 접근성 (버튼 요소)
  - 색상 대비 검증

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Badge,
  BadgeWithDot,
  BadgeWithIcon,
  BadgeWithFlag,
  BadgeWithImage,
  BadgeWithButton,
  BadgeIcon,
} from './index';

const meta: Meta<typeof Badge> = {
  title: 'Commons/Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['pill-color', 'color', 'modern'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: [
        'gray', 'brand', 'error', 'warning', 'success',
        'gray-blue', 'blue-light', 'blue', 'indigo',
        'purple', 'pink', 'orange'
      ],
    },
    // ... 나머지 props
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 Badge
2. **AllTypes** - 3가지 타입 비교
3. **AllSizes** - 3가지 사이즈 비교
4. **AllColors** - 12가지 컬러 비교
5. **WithDot** - 점 표시가 있는 Badge
6. **WithIcon** - 아이콘이 있는 Badge (Leading/Trailing)
7. **WithFlag** - 국가 플래그가 있는 Badge
8. **WithImage** - 커스텀 이미지가 있는 Badge
9. **WithButton** - 닫기 버튼이 있는 Badge (Interactive)
10. **IconOnly** - 아이콘만 있는 Badge
11. **TypeComparison** - 모든 타입별 variant 비교
12. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 type variants 렌더링 확인 (pill-color, color, modern)
- [ ] 모든 size variants 렌더링 확인 (sm, md, lg)
- [ ] 모든 color variants 렌더링 확인 (12가지)
- [ ] BadgeWithDot 점 표시 렌더링 확인
- [ ] BadgeWithIcon leading/trailing 아이콘 렌더링 확인
- [ ] BadgeWithFlag 국가 플래그 이미지 로딩 확인
- [ ] BadgeWithImage 커스텀 이미지 로딩 확인
- [ ] BadgeWithButton 닫기 버튼 클릭 동작 확인
- [ ] BadgeIcon 아이콘만 렌더링 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] A11y 애드온 경고 없음
- [ ] BadgeWithButton의 aria-label 검증

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] Generic type (BadgeProps<T>) 정확히 처리

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] Utility color 토큰 적용 확인 (`--utility-brand-*`)
- [ ] Modern type의 shadow-xs 적용 확인

### 접근성 (a11y)
- [ ] BadgeWithButton의 button 요소에 aria-label 존재
- [ ] 키보드로 button 요소 포커스 가능
- [ ] 색상 대비 WCAG AA 이상 준수
- [ ] 스크린 리더로 Badge 내용 읽기 가능

---

## 🎨 디자인 토큰 참조

### Badge 컴포넌트가 사용하는 토큰

**Filled Colors (전체 컬러 세트):**
```css
/* Root background & text */
bg-utility-{color}-50
text-utility-{color}-700
ring-utility-{color}-200

/* Addon (dot, icon) */
text-utility-{color}-500

/* Addon Button (close button) */
hover:bg-utility-{color}-100
text-utility-{color}-400
hover:text-utility-{color}-500
```

**Modern Type 특화:**
```css
bg-primary
text-secondary
ring-primary
shadow-xs
```

---

## 📚 참고 문서

- [Badge Component Source](../index.tsx)
- [Badge Types Source](../badge-types.ts)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Untitled UI Icons](https://github.com/untitledui/icons)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → Badge**

---

## 💡 구현 팁

1. **Icon Import**
   ```typescript
   import { Star, Mail, Bell, Check } from '@untitledui/icons';
   ```

2. **Flag Badge 사용**
   ```typescript
   <BadgeWithFlag flag="US" color="brand">United States</BadgeWithFlag>
   ```
   - 플래그 이미지는 Untitled UI CDN에서 자동 로드
   - 국가 코드는 ISO 3166-1 alpha-2 표준 (US, GB, FR, etc.)

3. **Button Badge Interactive**
   ```typescript
   <BadgeWithButton
     color="brand"
     buttonLabel="Remove badge"
     onButtonClick={() => alert('Badge removed')}
   >
     Removable
   </BadgeWithButton>
   ```
   - buttonLabel은 접근성을 위한 aria-label
   - onButtonClick은 optional (미지정 시 undefined)

4. **Image Badge with Avatar**
   ```typescript
   <BadgeWithImage
     imgSrc="https://i.pravatar.cc/32?img=1"
     color="brand"
   >
     User Name
   </BadgeWithImage>
   ```

5. **Type-Safe Color Props**
   ```typescript
   // Modern type은 'gray'만 지원
   <Badge type="modern" color="gray">Modern Badge</Badge>

   // Pill-color와 color는 모든 컬러 지원
   <Badge type="pill-color" color="brand">Brand Badge</Badge>
   ```

---

## 🔍 주의사항

### Modern Type 제약사항

Modern type은 특정 컬러만 지원합니다:
- ✅ `gray` (지원됨)
- ❌ 기타 컬러 (타입 에러 발생)

이는 TypeScript generic type에 의해 compile-time에 검증됩니다.

### Flag 이미지 외부 의존성

BadgeWithFlag는 Untitled UI CDN에서 플래그 이미지를 로드합니다:
```
https://www.untitledui.com/images/flags/{flag}.svg
```

오프라인 환경에서는 플래그 이미지가 로드되지 않을 수 있습니다.

### Dot Icon 컴포넌트 의존성

BadgeWithDot는 `@/components/foundations/dot-icon`에 의존합니다. 이 컴포넌트가 존재하지 않으면 런타임 에러가 발생합니다.

---

**구현 완료 후 체크리스트를 반환하세요!**
