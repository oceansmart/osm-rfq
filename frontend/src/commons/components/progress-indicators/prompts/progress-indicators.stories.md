# ProgressIndicators Component - Storybook Stories Implementation Guide

## 조건-프로젝트

- **프로젝트명**: OSM RFQ (Request for Quotation Management System)
- **기술 스택**: Next.js 14.2.33, TypeScript 5, React 18
- **UI 라이브러리**: Untitled UI PRO
- **스타일링**: Tailwind CSS v4 + CSS Variables
- **컴포넌트 문서화**: Storybook 9.1.13 with @storybook/nextjs
- **언어 설정**: 한국어 (ko) - 주석 및 스토리 제목

## 조건-파일경로

```
frontend/src/commons/components/progress-indicators/
├── index.tsx                            # Main ProgressBar components
├── index.stories.tsx                    # Storybook stories (이 가이드의 대상)
└── prompts/
    └── progress-indicators.stories.md  # This guide
```

**관련 의존성**:
- `@/utils/cx` - Classname utility

## 핵심요구사항

### 1. ProgressIndicators Component Overview

**컴포넌트 구성**:
- `ProgressBarBase`: Low-level progress bar UI (내부 컴포넌트)
- `ProgressBar`: Progress bar with label display (4가지 labelPosition)

**주요 특징**:
- **값 표시**: Percentage, fraction, custom format 지원
- **Label 위치**: right, bottom, top-floating, bottom-floating
- **접근성**: ARIA progressbar 역할 (role, aria-valuenow, aria-valuemin, aria-valuemax)
- **커스터마이징**: 높이 (h-1 ~ h-4), 색상 (progressClassName)
- **Custom Range**: min, max 값 설정 가능 (default: 0-100)

### 2. Props Interface

```typescript
// ProgressBarBase Props
interface ProgressBarProps {
  value: number;                // Current progress value
  min?: number;                 // Minimum value (default: 0)
  max?: number;                 // Maximum value (default: 100)
  className?: string;           // Container CSS classes
  progressClassName?: string;   // Progress indicator CSS classes
  valueFormatter?: (value: number, valueInPercentage: number) => string | number;
}

// ProgressBar Props
interface ProgressIndicatorWithTextProps extends ProgressBarProps {
  labelPosition?: "right" | "bottom" | "top-floating" | "bottom-floating";
}
```

## 구현 범위

### Story Categories (9 Stories)

#### 1. **Default** - 기본 ProgressBarBase
- 단일 ProgressBarBase 컴포넌트
- value: 45, no label
- 고정 너비 (w-[400px])

#### 2. **WithDifferentValues** - 다양한 진행률
- 5가지 진행률: 0%, 25%, 50%, 75%, 100%
- 각 진행률에 대한 설명 제목 (Not Started, Getting Started, Half Way, Almost There, Complete)
- ProgressBarBase 사용

#### 3. **LabelPositions** - Label 위치 비교
- 4가지 labelPosition 비교:
  - right: 오른쪽에 텍스트 표시
  - bottom: 하단에 텍스트 표시
  - top-floating: 상단 floating 툴팁
  - bottom-floating: 하단 floating 툴팁
- 각 섹션별 설명 제목

#### 4. **CustomFormatters** - 사용자 정의 포맷터
- Default Format - percentage (45%)
- Custom Format - Fraction (45/100)
- Custom Format - Points (750 pts / 1000)
- Custom Format - MB (350MB / 500MB)

#### 5. **CustomRange** - 사용자 정의 범위
- Range 0-100 (Default)
- Range 0-1000 (value: 500)
- Range 20-80 (value: 50)

#### 6. **Sizes** - 높이 커스터마이징
- Extra Small (h-1)
- Small (h-2 - Default)
- Medium (h-3)
- Large (h-4)

#### 7. **Colors** - 색상 커스터마이징
- Default (Brand Primary)
- Success (bg-fg-success)
- Warning (bg-fg-warning)
- Error (bg-fg-error)

#### 8. **UseCases** - 실전 사용 예시
- File Upload Progress:
  - document.pdf 업로드 (342/500MB)
  - Estimated time 표시
- Profile Completion:
  - 3 out of 5 sections completed
- Storage Usage:
  - 7.5 GB of 15 GB used
  - bottom-floating label
- Download Progress:
  - 450 MB / 1.2 GB
  - top-floating label

#### 9. **Playground** - 모든 props 조작 가능
- argTypes로 정의된 모든 props 포함
- Interactive controls로 실시간 변경 테스트
- Default args: value=65, min=0, max=100, labelPosition='right'

## 기술 요구사항

### Storybook 설정

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBar, ProgressBarBase } from './index';

const meta: Meta<typeof ProgressBar> = {
  title: 'Commons/Components/ProgressIndicators',
  component: ProgressBar,
  parameters: {
    layout: 'centered',  // Center alignment
  },
  tags: ['autodocs'],  // Auto-generate docs
  argTypes: {
    // 7 argTypes defined
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;
```

### ArgTypes 구성

모든 props에 대해 다음 정보 포함:
- `value`: range control (0-100)
- `min`, `max`: number control
- `labelPosition`: radio control (4 options)
- `valueFormatter`: control: false (함수 타입)
- `className`, `progressClassName`: text control
- `description`: 영문 설명 (명확하고 간결하게)

### Story 작성 패턴

**복합 레이아웃 Story**:
```typescript
export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Label Right</h3>
        <ProgressBar value={65} labelPosition="right" />
      </div>
      {/* ... more variants */}
    </div>
  ),
};
```

## 구현 요구사항

### 1. 코드 품질

- **타입 안전성**: 모든 Story에 `Story` 타입 명시
- **Props 일관성**: value는 0-100 범위 (커스텀 range 제외)
- **접근성**: role="progressbar", ARIA 속성 자동 적용
- **반응형**: 고정 width (w-[400px], w-[500px], w-[600px], w-[700px]) 사용으로 일관된 레이아웃

### 2. UI/UX 패턴

- **간격**: `gap-4`, `gap-6`, `gap-8` 사용
- **섹션 제목**: `<h3 className="text-sm font-semibold mb-4">` 패턴
- **컨테이너**: `border rounded-lg p-6` 패턴 (UseCases)
- **색상**: Tailwind semantic colors (bg-fg-success, bg-fg-warning, bg-fg-error)

### 3. 한글화

- **섹션 제목**: 영문 사용 (Label Right, Label Bottom, etc.)
- **주석**: 한글 주석 (예: `// 1. Default - 기본 ProgressBarBase`)
- **설명 텍스트**: 영문 사용 (글로벌 표준)
- **스토리 이름**: PascalCase 영문

### 4. 스토리 순서

1. Default (기본)
2. WithDifferentValues (진행률 비교)
3. LabelPositions (Label 위치)
4. CustomFormatters (포맷터)
5. CustomRange (범위)
6. Sizes (높이)
7. Colors (색상)
8. UseCases (실전 예시)
9. Playground (개발자 도구)

**순서 원칙**: 단순 → 복잡, 기본 → 고급, 단일 → 복합

## 검증 체크리스트

### Story 실행 검증

```bash
cd frontend
npm run storybook
```

- [ ] Storybook 서버 정상 실행 (localhost:6006)
- [ ] `Commons/Components/ProgressIndicators` 카테고리 표시
- [ ] 9개 Story 모두 표시
- [ ] Autodocs 페이지 자동 생성
- [ ] Controls 패널 동작 (Playground)

### 개별 Story 검증

**Default**:
- [ ] ProgressBarBase 표시
- [ ] value: 45 반영
- [ ] Label 없음

**WithDifferentValues**:
- [ ] 5가지 진행률 (0%, 25%, 50%, 75%, 100%)
- [ ] 각 진행률에 대한 설명 제목
- [ ] 진행률 차이 명확히 구분

**LabelPositions**:
- [ ] right: 오른쪽 텍스트 표시
- [ ] bottom: 하단 텍스트 표시
- [ ] top-floating: 상단 floating 툴팁 (progress bar 위)
- [ ] bottom-floating: 하단 floating 툴팁 (progress bar 아래)

**CustomFormatters**:
- [ ] Default: 45%
- [ ] Fraction: 45/100
- [ ] Points: 750 pts
- [ ] MB: 350MB / 500MB

**CustomRange**:
- [ ] Range 0-100: 50% 표시
- [ ] Range 0-1000: 500/1000 표시
- [ ] Range 20-80: value 50 표시 (50% percentage)

**Sizes**:
- [ ] h-1, h-2, h-3, h-4 높이 차이 확인
- [ ] Default (h-2) 강조

**Colors**:
- [ ] Default (Brand Primary) - 파란색 계열
- [ ] Success - 녹색
- [ ] Warning - 노란색
- [ ] Error - 빨간색

**UseCases**:
- [ ] File Upload Progress - 진행률 표시
- [ ] Profile Completion - 섹션 완료율
- [ ] Storage Usage - 용량 표시 (GB)
- [ ] Download Progress - 다운로드 진행률
- [ ] 각 섹션 border container 표시

**Playground**:
- [ ] 모든 argTypes controls 표시
- [ ] value slider 동작
- [ ] labelPosition radio 동작
- [ ] 실시간 props 변경 반영

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
    <div className="flex flex-col gap-8 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">File Upload Progress</h3>
        <div className="p-6 border rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Uploading document.pdf</p>
            <p className="text-xs text-tertiary">Estimated time: 2 minutes</p>
          </div>
          <ProgressBar
            value={342}
            min={0}
            max={500}
            labelPosition="right"
            valueFormatter={(value, percentage) => `${percentage.toFixed(0)}%`}
          />
        </div>
      </div>
    </div>
  ),
};

// ❌ Bad: 제목 없음, 레이아웃 일관성 없음
export const FileUpload: Story = {
  render: () => (
    <div>
      <ProgressBar value={342} max={500} labelPosition="right" />
    </div>
  ),
};
```

### ArgTypes 작성 예시

```typescript
// ✅ Good: 명확한 설명
argTypes: {
  value: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    description: 'Current progress value',
  },
  labelPosition: {
    control: 'radio',
    options: ['right', 'bottom', 'top-floating', 'bottom-floating'],
    description: 'Position of the value label',
  },
}

// ❌ Bad: 설명 부족
argTypes: {
  value: { control: 'range' },
  labelPosition: { control: 'radio', options: ['right', 'bottom', 'top-floating', 'bottom-floating'] },
}
```

### Custom Formatter 예시

```typescript
// ✅ Good: 명확한 포맷
<ProgressBar
  value={750}
  min={0}
  max={1000}
  labelPosition="right"
  valueFormatter={(value) => `${value} pts`}
/>

// ✅ Good: 백분율과 절대값 모두 사용
<ProgressBar
  value={350}
  min={0}
  max={500}
  labelPosition="right"
  valueFormatter={(value, percentage) => `${value}MB / 500MB`}
/>

// ❌ Bad: valueFormatter 없이 사용자 정의 범위
<ProgressBar value={750} min={0} max={1000} labelPosition="right" />
// → 표시: 75% (의미 불명확)
```

## 참고 자료

- **Untitled UI ProgressIndicators**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/progress-indicators/index.tsx`
- **RadioButtons Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/radio-buttons/index.stories.tsx`
- **TextArea Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/textarea/index.stories.tsx`

## 버전 이력

- **v1.0.0** (2025-11-20): 초기 작성 - ProgressIndicators Storybook Stories 가이드 생성
