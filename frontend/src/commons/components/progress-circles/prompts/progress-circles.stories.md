# ProgressCircles Component - Storybook Stories Implementation Guide

## 조건-프로젝트

- **프로젝트명**: OSM RFQ (Request for Quotation Management System)
- **기술 스택**: Next.js 14.2.33, TypeScript 5, React 18
- **UI 라이브러리**: Untitled UI PRO
- **스타일링**: Tailwind CSS v4 + CSS Variables
- **컴포넌트 문서화**: Storybook 9.1.13 with @storybook/nextjs
- **언어 설정**: 한국어 (ko) - 주석 및 스토리 제목

## 조건-파일경로

```
frontend/src/commons/components/progress-circles/
├── index.tsx                            # Main ProgressCircle components
├── index.stories.tsx                    # Storybook stories (이 가이드의 대상)
└── prompts/
    └── progress-circles.stories.md     # This guide
```

**관련 의존성**:
- `@/utils/cx` - Classname utility (cx as clx, sortCx)

## 핵심요구사항

### 1. ProgressCircles Component Overview

**컴포넌트 구성**:
- `ProgressBarCircle`: Full circle progress indicator
- `ProgressBarHalfCircle`: Half circle (semicircle) progress indicator

**주요 특징**:
- **5가지 크기**: xxs, xs, sm, md, lg (각 크기마다 고유한 strokeWidth, radius)
- **값 표시**: Percentage, custom format 지원
- **Label 지원**: Optional label below or inside circle (size에 따라 위치 자동 조정)
- **접근성**: ARIA progressbar 역할 (role, aria-valuenow, aria-valuemin, aria-valuemax)
- **SVG 기반**: CSS transform을 사용한 부드러운 애니메이션
- **Custom Range**: min, max 값 설정 가능 (default: 0-100)

### 2. Props Interface

```typescript
interface ProgressBarProps {
  value: number;                // Current progress value
  min?: number;                 // Minimum value (default: 0)
  max?: number;                 // Maximum value (default: 100)
  size: "xxs" | "xs" | "sm" | "md" | "lg";  // Size variant (required)
  label?: string;               // Optional label text
  valueFormatter?: (value: number, valueInPercentage: number) => string | number;
}
```

### 3. Size Configuration

```typescript
const sizes = {
  xxs: {
    strokeWidth: 6,
    radius: 29,
    valueClass: "text-sm font-semibold text-primary",
    labelClass: "text-xs font-medium text-tertiary",
  },
  xs: {
    strokeWidth: 16,
    radius: 72,
    valueClass: "text-display-xs font-semibold text-primary",
    labelClass: "text-xs font-medium text-tertiary",
  },
  sm: {
    strokeWidth: 20,
    radius: 90,
    valueClass: "text-display-sm font-semibold text-primary",
    labelClass: "text-xs font-medium text-tertiary",
  },
  md: {
    strokeWidth: 24,
    radius: 108,
    valueClass: "text-display-md font-semibold text-primary",
    labelClass: "text-sm font-medium text-tertiary",
  },
  lg: {
    strokeWidth: 28,
    radius: 126,
    valueClass: "text-display-lg font-semibold text-primary",
    labelClass: "text-sm font-medium text-tertiary",
  },
};
```

## 구현 범위

### Story Categories (10 Stories)

#### 1. **Default** - 기본 ProgressBarCircle
- 단일 ProgressBarCircle 컴포넌트
- value: 65, size: md, no label
- 중앙 정렬 (flex justify-center)

#### 2. **CircleSizes** - 크기 비교 (Full Circle)
- 5가지 크기: xxs, xs, sm, md, lg
- 가로 배치 (flex-wrap items-center justify-center)
- 각 크기별 제목 표시
- value: 65 (일관성)

#### 3. **HalfCircleSizes** - 크기 비교 (Half Circle)
- 5가지 크기: xxs, xs, sm, md, lg
- 가로 배치 (flex-wrap items-end justify-center)
- items-end: 반원의 하단을 정렬
- value: 65 (일관성)

#### 4. **WithLabels** - Label 표시
- Circle with Label: md size, label="Completed"
- HalfCircle with Label: md size, label="Progress"
- 가로 배치 (2개 컴포넌트)

#### 5. **WithDifferentValues** - 다양한 진행률
- 5가지 진행률: 0%, 25%, 50%, 75%, 100%
- ProgressBarCircle 사용 (size: sm)
- 각 진행률 위에 설명 제목 (text-xs)

#### 6. **CustomFormatters** - 사용자 정의 포맷터
- Default Format - percentage (65%)
- Fraction Format - 65/100
- Points Format - 750 (custom range 0-1000)

#### 7. **Comparison** - Circle vs HalfCircle
- Full Circle Progress: 25%, 50%, 75%, 100% (size: sm, with labels)
- Half Circle Progress: 25%, 50%, 75%, 100% (size: sm, with labels)
- 세로 배치 (두 섹션)

#### 8. **UseCases** - 실전 사용 예시
- Skills Proficiency:
  - React: 90%, TypeScript: 75%, Node.js: 60% (size: md, with labels)
- Daily Goals:
  - Water: 8/10 cups, Steps: 7500/10000, Exercise: 45/60 min (HalfCircle, size: sm)
- Project Status Dashboard:
  - Backend: 85%, Frontend: 92%, Testing: 68%, Docs: 45% (size: xs, grid-cols-4)
- Fitness Tracker:
  - Calories Burned: 1250/2000 cal (size: lg, center aligned)

#### 9. **PlaygroundCircle** - Circle Playground
- ProgressBarCircle with all argTypes
- Default args: value=65, min=0, max=100, size='md', label='Progress'

#### 10. **PlaygroundHalfCircle** - HalfCircle Playground
- ProgressBarHalfCircle with all argTypes
- Default args: value=65, min=0, max=100, size='md', label='Progress'

## 기술 요구사항

### Storybook 설정

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBarCircle, ProgressBarHalfCircle } from './index';

const meta: Meta<typeof ProgressBarCircle> = {
  title: 'Commons/Components/ProgressCircles',
  component: ProgressBarCircle,
  parameters: {
    layout: 'centered',  // Center alignment
  },
  tags: ['autodocs'],  // Auto-generate docs
  argTypes: {
    // 6 argTypes defined
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBarCircle>;
```

### ArgTypes 구성

모든 props에 대해 다음 정보 포함:
- `value`: range control (0-100)
- `min`, `max`: number control
- `size`: radio control (5 options: xxs, xs, sm, md, lg)
- `label`: text control
- `valueFormatter`: control: false (함수 타입)
- `description`: 영문 설명 (명확하고 간결하게)

### Story 작성 패턴

**복합 레이아웃 Story**:
```typescript
export const CircleSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">XXS</h3>
        <ProgressBarCircle value={65} size="xxs" />
      </div>
      {/* ... more sizes */}
    </div>
  ),
};
```

## 구현 요구사항

### 1. 코드 품질

- **타입 안전성**: 모든 Story에 `Story` 타입 명시
- **Props 일관성**: value는 0-100 범위 (커스텀 range 제외)
- **접근성**: role="progressbar", ARIA 속성 자동 적용
- **레이아웃**: Flexbox 사용, 중앙 정렬, 적절한 gap 사용

### 2. UI/UX 패턴

- **간격**: `gap-3`, `gap-4`, `gap-8`, `gap-12`, `gap-16` 사용
- **섹션 제목**: `<h3 className="text-sm font-semibold">` 또는 `text-md` 패턴
- **컨테이너**: `border rounded-lg p-6` 패턴 (UseCases)
- **정렬**: items-center (Circle), items-end (HalfCircle)
- **Padding**: p-8 (충분한 여백)

### 3. 한글화

- **섹션 제목**: 영문 사용 (XXS, XS, SM, MD, LG)
- **주석**: 한글 주석 (예: `// 1. Default - 기본 ProgressBarCircle`)
- **설명 텍스트**: 영문 사용 (글로벌 표준)
- **스토리 이름**: PascalCase 영문

### 4. 스토리 순서

1. Default (기본)
2. CircleSizes (Circle 크기 비교)
3. HalfCircleSizes (HalfCircle 크기 비교)
4. WithLabels (Label 표시)
5. WithDifferentValues (진행률 비교)
6. CustomFormatters (포맷터)
7. Comparison (Circle vs HalfCircle)
8. UseCases (실전 예시)
9. PlaygroundCircle (Circle 개발자 도구)
10. PlaygroundHalfCircle (HalfCircle 개발자 도구)

**순서 원칙**: 단순 → 복잡, 기본 → 고급, 단일 → 복합, 비교 → 실전

## 검증 체크리스트

### Story 실행 검증

```bash
cd frontend
npm run storybook
```

- [ ] Storybook 서버 정상 실행 (localhost:6006)
- [ ] `Commons/Components/ProgressCircles` 카테고리 표시
- [ ] 10개 Story 모두 표시
- [ ] Autodocs 페이지 자동 생성
- [ ] Controls 패널 동작 (Playground)

### 개별 Story 검증

**Default**:
- [ ] ProgressBarCircle 표시 (size: md)
- [ ] value: 65 반영
- [ ] Label 없음

**CircleSizes**:
- [ ] 5가지 크기 (xxs, xs, sm, md, lg) 명확히 구분
- [ ] 크기 순서대로 배치
- [ ] 각 크기별 제목 표시
- [ ] 중앙 정렬

**HalfCircleSizes**:
- [ ] 5가지 크기 (xxs, xs, sm, md, lg) 명확히 구분
- [ ] items-end 정렬 (하단 정렬)
- [ ] 반원 형태 확인

**WithLabels**:
- [ ] Circle with Label: label 내부 표시 (md 이상)
- [ ] HalfCircle with Label: label 하단 표시
- [ ] label 텍스트 명확히 표시

**WithDifferentValues**:
- [ ] 5가지 진행률 (0%, 25%, 50%, 75%, 100%)
- [ ] 진행률 차이 명확히 구분
- [ ] 0%: 빈 원, 100%: 완전한 원

**CustomFormatters**:
- [ ] Default: 65%
- [ ] Fraction: 65/100
- [ ] Points: 750 (custom range 표시)

**Comparison**:
- [ ] Full Circle: 4개 진행률 (25%, 50%, 75%, 100%)
- [ ] Half Circle: 4개 진행률 (25%, 50%, 75%, 100%)
- [ ] 각 섹션 제목 표시
- [ ] items-end 정렬 (HalfCircle)

**UseCases**:
- [ ] Skills Proficiency: 3개 스킬 표시 (React, TypeScript, Node.js)
- [ ] Daily Goals: 3개 목표 (Water, Steps, Exercise) - HalfCircle
- [ ] Project Status Dashboard: 4개 프로젝트 (grid-cols-4)
- [ ] Fitness Tracker: 1개 대형 Circle (lg)
- [ ] 각 섹션 border container 표시

**PlaygroundCircle**:
- [ ] 모든 argTypes controls 표시
- [ ] value slider 동작
- [ ] size radio 동작
- [ ] label text input 동작
- [ ] 실시간 props 변경 반영

**PlaygroundHalfCircle**:
- [ ] 모든 argTypes controls 표시
- [ ] value slider 동작
- [ ] size radio 동작
- [ ] label text input 동작
- [ ] 반원 형태 유지

### TypeScript 컴파일 검증

```bash
npx tsc --noEmit
```

- [ ] 타입 에러 없음
- [ ] Import 경로 정상 (`'./index'`)
- [ ] Props 타입 정합성

### 접근성 검증

Storybook a11y addon 사용:
- [ ] role="progressbar" 적용
- [ ] aria-valuenow 속성 (현재값)
- [ ] aria-valuemin 속성 (최소값)
- [ ] aria-valuemax 속성 (최대값)
- [ ] Screen reader 호환 (값 announcement)

## 사용 예시

### Story 작성 예시

```typescript
// ✅ Good: 명확한 제목과 설명
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[800px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Skills Proficiency</h3>
        <div className="p-6 border rounded-lg">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={90}
                size="md"
                label="React"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ❌ Bad: 제목 없음, 레이아웃 일관성 없음
export const Skills: Story = {
  render: () => (
    <div>
      <ProgressBarCircle value={90} size="md" label="React" />
    </div>
  ),
};
```

### Size 선택 가이드

```typescript
// ✅ Good: 용도에 맞는 크기 선택
<ProgressBarCircle value={65} size="xxs" />  // Dashboard, small indicator
<ProgressBarCircle value={65} size="xs" />   // Card header, compact display
<ProgressBarCircle value={65} size="sm" />   // Default, list item
<ProgressBarCircle value={65} size="md" />   // Featured, main display
<ProgressBarCircle value={65} size="lg" />   // Hero, primary focus

// ❌ Bad: 크기 일관성 없음
<ProgressBarCircle value={65} size="lg" />  // Dashboard (너무 큼)
<ProgressBarCircle value={65} size="xxs" /> // Hero (너무 작음)
```

### Custom Formatter 예시

```typescript
// ✅ Good: 명확한 포맷
<ProgressBarCircle
  value={750}
  min={0}
  max={1000}
  size="md"
  label="Score"
  valueFormatter={(value) => `${value}`}  // 절대값 표시
/>

// ✅ Good: 단위 표시
<ProgressBarHalfCircle
  value={45}
  min={0}
  max={60}
  size="sm"
  label="Exercise"
  valueFormatter={(value) => `${value} min`}  // 시간 단위
/>

// ❌ Bad: valueFormatter 없이 사용자 정의 범위
<ProgressBarCircle value={750} min={0} max={1000} size="md" />
// → 표시: 75% (의미 불명확)
```

### Label 사용 가이드

```typescript
// ✅ Good: Label with valueFormatter
<ProgressBarCircle
  value={90}
  size="md"
  label="React"
  valueFormatter={(value) => `${value}%`}
/>

// ✅ Good: HalfCircle with label (size: xxs는 label 하단 표시)
<ProgressBarHalfCircle value={65} size="xxs" label="Progress" />

// ❌ Bad: Label 없이 context 없는 Circle
<ProgressBarCircle value={90} size="md" />
// → 무엇의 90%인지 불명확
```

## 참고 자료

- **Untitled UI ProgressCircles**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/progress-circles/index.tsx`
- **ProgressIndicators Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/progress-indicators/index.stories.tsx`
- **RadioButtons Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/radio-buttons/index.stories.tsx`

## 버전 이력

- **v1.0.0** (2025-11-20): 초기 작성 - ProgressCircles Storybook Stories 가이드 생성
