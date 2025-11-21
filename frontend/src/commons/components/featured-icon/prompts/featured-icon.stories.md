# FeaturedIcon Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/featured-icon/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/featured-icon/index.stories.tsx
```

---

## 🎯 핵심요구사항

### FeaturedIcon 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Theme Variants (6가지)

- light - Rounded solid background
- gradient - Border with gradient background
- dark - Shadow with skeumorphic effect
- outline - Concentric circle borders
- modern - Shadow with ring border
- modern-neue - Layered shadow effect

| Theme | Background | Border | Shadow | Use Case |
|-------|-----------|--------|--------|----------|
| `light` | Solid color | None | None | Default, Clean UI |
| `gradient` | Gradient fill | Border mask | None | Premium features |
| `dark` | Solid color | White overlay | Skeumorphic | Dark mode UI |
| `outline` | None | Concentric circles | None | Minimal design |
| `modern` | Solid | Inset ring | Skeumorphic | Contemporary UI |
| `modern-neue` | Alt background | Inset ring | Complex layered | Modern design |

### 2. Color Variants (5가지)

- brand - Primary brand color
- gray - Neutral/secondary
- success - Positive actions/states
- warning - Caution/alerts
- error - Destructive/errors

### 3. Size Variants (4가지)

- sm - 8x8 container
- md - 10x10 container
- lg - 12x12 container
- xl - 14x14 container

| Size | Container | Icon Size | Use Case |
|------|-----------|-----------|----------|
| `sm` | `size-8` | `size-4` | Compact UI, Lists |
| `md` | `size-10` | `size-5` | Default size |
| `lg` | `size-12` | `size-6` | Card headers |
| `xl` | `size-14` | `size-7` | Hero sections |

### 4. Icon Variants

- Component icons (React components)
- Element icons (ReactNode)
- Various semantic icons (Star, Check, Alert, etc.)

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- Icon prop 타입: `FC<{ className?: string }> | ReactNode`
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { FeaturedIcon } from './index';
import { Star, Check, AlertTriangle } from '@/commons/components/icons';

const meta: Meta<typeof FeaturedIcon> = {
  title: 'Commons/Components/FeaturedIcon',
  component: FeaturedIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['brand', 'gray', 'success', 'warning', 'error'],
    },
    theme: {
      control: 'select',
      options: ['light', 'gradient', 'dark', 'outline', 'modern', 'modern-neue'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeaturedIcon>;
```

### 필수 Stories

1. **Default** - 기본 FeaturedIcon (light theme, brand color)
2. **All Sizes** - 4가지 사이즈 비교
3. **All Themes** - 6가지 테마 비교
4. **All Colors** - 5가지 색상 비교
5. **With Various Icons** - 다양한 아이콘 사용
6. **Size x Theme Matrix** - 사이즈별 테마 조합
7. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 size variants 렌더링 확인 (sm, md, lg, xl)
- [ ] 모든 theme variants 렌더링 확인 (6가지)
- [ ] 모든 color variants 렌더링 확인 (5가지)
- [ ] Component icon 렌더링 확인 (FC 타입)
- [ ] Element icon 렌더링 확인 (ReactNode 타입)
- [ ] Dark theme 배경색 적용 확인 (스토리북 내 dark 배경)

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] A11y 애드온 경고 없음
- [ ] Autodocs 자동 생성 확인

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] Icon prop union type 정확히 처리

### 디자인 토큰
- [ ] Untitled UI CSS Variables 사용 확인
- [ ] OSM 브랜드 컬러 적용 확인
- [ ] 테마별 고유 스타일 적용 확인

---

## 🎨 디자인 토큰 참조

### FeaturedIcon이 사용하는 주요 토큰

**Light Theme:**
- `--brand-secondary`
- `--tertiary`
- `--error-secondary`
- `--warning-secondary`
- `--success-secondary`

**Gradient Theme:**
- `--utility-brand-50/200`
- `--brand-solid`
- Border mask effects

**Dark Theme:**
- `--brand-solid`
- `--secondary-solid`
- `--error-solid`
- Shadow: `shadow-xs-skeumorphic`
- Border overlay: `border-white/12`

**Modern Themes:**
- `--primary`
- `--primary_alt`
- Ring and shadow combinations

---

## 📚 참고 문서

- [FeaturedIcon Component Source](../index.tsx)
- [Button Stories Reference](../../button/index.stories.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → FeaturedIcon**

---

## 💡 구현 팁

1. **Dark Theme 배경색 처리**
   ```typescript
   <div className="flex gap-3 p-4 bg-gray-900 rounded">
     <FeaturedIcon icon={Star} theme="dark" color="brand" />
   </div>
   ```

2. **Icon Component vs Element**
   ```typescript
   // Component (권장)
   <FeaturedIcon icon={Star} />

   // Element
   <FeaturedIcon icon={<Star />} />
   ```

3. **Theme 비교 스토리**
   ```typescript
   export const AllThemes: Story = {
     render: () => (
       <div className="flex flex-col gap-6">
         {/* 각 테마별 렌더링 */}
       </div>
     ),
   };
   ```

4. **Color Semantics**
   - `brand` - 브랜드 액션 (즐겨찾기, 선택)
   - `gray` - 중립 정보 (설정, 일반)
   - `success` - 성공 상태 (완료, 확인)
   - `warning` - 경고 (주의, 알림)
   - `error` - 오류 (삭제, 실패)

---

**구현 완료 후 체크리스트를 반환하세요!**
