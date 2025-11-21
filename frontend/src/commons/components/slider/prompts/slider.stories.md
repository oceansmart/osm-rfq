# Slider Component Storybook Stories Implementation Guide

## Project Conditions

- **Project**: OSM RFQ Frontend
- **Component Library**: Untitled UI PRO
- **Framework**: Next.js 14.2.33 (App Router), TypeScript
- **Storybook Version**: 9.1.13 with @storybook/nextjs adapter
- **Base Library**: React Aria Components
- **Styling**: Tailwind CSS v4 with CSS Variables
- **Component Location**: `/src/commons/components/slider/`
- **Stories Location**: `/src/commons/components/slider/index.stories.tsx`

## Component Overview

### Slider Component

Slider 컴포넌트는 React Aria Components의 Slider를 기반으로 구축된 접근성 높은 슬라이더 컴포넌트입니다.

**Exported Component:**
```typescript
export const Slider = ({ labelPosition, minValue, maxValue, labelFormatter, formatOptions, ...rest }: SliderProps) => { ... };
```

**Component Structure:**
```
slider/
├── index.tsx              # Slider 컴포넌트
├── index.stories.tsx      # Storybook Stories
└── prompts/
    └── slider.stories.md  # 구현 가이드
```

### Key Features

1. **Label Positions** (3가지)
   - `default`: 숨김 (기본값)
   - `bottom`: 하단 표시 (absolute positioning)
   - `top-floating`: 상단 floating (툴팁 스타일)

2. **Value Range**
   - `minValue`: 최소값 (기본: 0)
   - `maxValue`: 최대값 (기본: 100)
   - `step`: 증가 단위 (기본: 1)
   - `defaultValue`: 초기값 (number 또는 [number, number])

3. **Single & Range Slider**
   - Single: `defaultValue={50}` (단일 thumb)
   - Range: `defaultValue={[25, 75]}` (두 개의 thumb)

4. **Custom Formatting**
   - `labelFormatter`: 커스텀 포맷 함수 `(value: number) => string`
   - `formatOptions`: Intl.NumberFormat 옵션 (기본: percentage)

5. **Accessibility**
   - React Aria Components 기반
   - 키보드 내비게이션 지원 (Arrow keys, Home, End)
   - Focus visible 스타일
   - ARIA labels 자동 적용

6. **Styling**
   - Track: `bg-quaternary` (배경), `bg-brand-solid` (활성)
   - Thumb: `bg-slider-handle-bg`, `ring-slider-handle-border`
   - Dragging: `cursor-grabbing`
   - Focus: `outline-focus-ring`

### Props

```typescript
interface SliderProps extends AriaSliderProps {
  labelPosition?: 'default' | 'bottom' | 'top-floating';
  labelFormatter?: (value: number) => string;
  // AriaSliderProps includes:
  // - minValue?: number;
  // - maxValue?: number;
  // - step?: number;
  // - defaultValue?: number | number[];
  // - value?: number | number[];
  // - onChange?: (value: number | number[]) => void;
  // - isDisabled?: boolean;
  // - formatOptions?: Intl.NumberFormatOptions;
}
```

**Default Format Options:**
```typescript
{
  style: "percent",
  maximumFractionDigits: 0,
}
```

## Implementation Scope

### Stories Created (Total: 9 Stories)

1. **Default** - 기본 슬라이더
   - 단일 값 슬라이더
   - 0-100 범위
   - 기본 percentage 포맷

2. **LabelPositions** - 라벨 위치 비교
   - default (숨김)
   - bottom
   - top-floating

3. **RangeValues** - 다양한 값 범위
   - 0-100 (기본)
   - 0-10 (커스텀 범위)
   - 1-5 (별점 예시, star rating)

4. **CustomFormatters** - 커스텀 라벨 포맷
   - Percentage (기본)
   - Currency ($50)
   - Temperature (22°C)

5. **States** - 슬라이더 상태
   - Default
   - Disabled
   - Min Value (0)
   - Max Value (100)

6. **RangeSlider** - 범위 슬라이더
   - Price Range ($25 - $75)
   - Temperature Range (18°C - 24°C)
   - 두 개의 thumb 사용

7. **StepIntervals** - 단계별 증가
   - step: 1 (기본)
   - step: 10
   - step: 25

8. **InteractiveExample** - 실제 사용 예시
   - 볼륨 컨트롤 시나리오
   - Master Volume, Music, Effects (disabled)
   - 카드 레이아웃으로 그룹화

9. **Playground** - 인터랙티브 테스트
   - 모든 props 조작 가능
   - args로 제어

## Technical Requirements

### 1. Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Slider } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Commons/Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered', // Slider는 centered layout 사용
  },
  tags: ['autodocs'],
  argTypes: {
    labelPosition: {
      control: 'radio',
      options: ['default', 'bottom', 'top-floating'],
      description: 'Position of the value label',
    },
    minValue: {
      control: 'number',
      description: 'Minimum slider value',
    },
    maxValue: {
      control: 'number',
      description: 'Maximum slider value',
    },
    defaultValue: {
      control: 'number',
      description: 'Default slider value',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the slider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;
```

### 2. Component Usage Patterns

**Basic Single Slider:**
```typescript
<Slider
  defaultValue={50}
  minValue={0}
  maxValue={100}
  labelPosition="bottom"
/>
```

**Range Slider (Two Thumbs):**
```typescript
<Slider
  defaultValue={[25, 75]}
  labelPosition="top-floating"
/>
```

**Custom Formatter:**
```typescript
<Slider
  defaultValue={50}
  labelPosition="top-floating"
  labelFormatter={(value) => `$${value}`}
  formatOptions={undefined} // Override default percentage
/>
```

**Custom Range:**
```typescript
<Slider
  defaultValue={3}
  minValue={1}
  maxValue={5}
  step={1}
  labelPosition="bottom"
  labelFormatter={(value) => `${'⭐'.repeat(value)}`}
  formatOptions={undefined}
/>
```

**Disabled State:**
```typescript
<Slider
  defaultValue={50}
  labelPosition="bottom"
  isDisabled
/>
```

**Step Intervals:**
```typescript
<Slider
  defaultValue={50}
  step={10}
  labelPosition="bottom"
/>
```

### 3. Story Naming Convention

- **Default**: 기본 형태
- **LabelPositions**: 라벨 위치 비교
- **RangeValues**: 다양한 값 범위
- **CustomFormatters**: 커스텀 라벨 포맷
- **States**: 상태 (disabled 등)
- **RangeSlider**: 범위 슬라이더 (두 개의 thumb)
- **StepIntervals**: 단계별 증가
- **InteractiveExample**: 실제 사용 예시
- **Playground**: 인터랙티브 테스트

### 4. Documentation Requirements

- 각 Story에 JSDoc 주석으로 설명 추가
- Default에 기본 사용법 명시
- LabelPositions에 3가지 위치 비교 제공
- RangeSlider에 두 개의 thumb 사용법 설명
- CustomFormatters에 다양한 포맷 예시 제공
- InteractiveExample에 실제 사용 시나리오 표시

### 5. Accessibility Considerations

- React Aria Components 기반으로 접근성 자동 제공
- 키보드 내비게이션:
  - Arrow Left/Right: 값 증가/감소
  - Home: 최소값으로 이동
  - End: 최대값으로 이동
- Focus visible 스타일: `outline-focus-ring`
- ARIA labels 자동 적용 (AriaLabel 컴포넌트)
- Disabled 상태 지원

### 6. Styling Notes

**Track:**
- Background: `bg-quaternary` (비활성 영역)
- Active: `bg-brand-solid` (활성 영역)
- Height: `h-2`, rounded-full

**Thumb:**
- Size: `size-6` (24px)
- Background: `bg-slider-handle-bg`
- Border: `ring-2 ring-slider-handle-border ring-inset`
- Shadow: `shadow-md`
- Cursor: `cursor-grab` (기본), `cursor-grabbing` (dragging)
- Focus: `outline-2 outline-offset-2 outline-focus-ring`

**Label Styles:**
- `default`: `hidden` (숨김)
- `bottom`: `absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-md font-medium text-primary`
- `top-floating`: `absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-secondary shadow-lg ring-1 ring-secondary_alt`

### 7. Implementation Details

**Track Calculation (Single Slider):**
```typescript
const left = values.length === 1 ? 0 : getThumbPercent(0);
const width = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - left;
```

**Track Calculation (Range Slider):**
```typescript
const left = getThumbPercent(0);
const width = getThumbPercent(1) - left;
```

**Label Formatting:**
```typescript
// Default (percentage)
getFormattedValue(getThumbValue(index) / 100)

// Custom formatter
labelFormatter ? labelFormatter(getThumbValue(index)) : getFormattedValue(...)
```

## Validation Checklist

- [x] 9개 Story 모두 생성됨
- [x] Default에 기본 사용법 명시
- [x] LabelPositions에 3가지 위치 비교 제공
- [x] RangeValues에 다양한 범위 예시 제공
- [x] CustomFormatters에 percentage, currency, temperature 예시 제공
- [x] States에 disabled 상태 포함
- [x] RangeSlider에 두 개의 thumb 사용법 제공
- [x] StepIntervals에 step: 1, 10, 25 예시 제공
- [x] InteractiveExample에 실제 사용 시나리오 (볼륨 컨트롤) 제공
- [x] Playground Story로 인터랙티브 테스트 가능
- [x] 모든 Story에 적절한 설명 추가
- [x] JSDoc 주석으로 각 Story 설명 추가
- [x] TypeScript 타입 안전성 확보
- [x] Storybook 9.1.13 호환성 확인

## Additional Notes

### Default Format Options

Slider는 기본적으로 percentage 포맷을 사용합니다:
```typescript
const defaultFormatOptions: Intl.NumberFormatOptions = {
  style: "percent",
  maximumFractionDigits: 0,
};
```

**커스텀 포맷 사용 시:**
- `formatOptions={undefined}`로 기본 percentage 포맷 제거
- `labelFormatter`로 원하는 포맷 구현

### Single vs Range Slider

- Single Slider: `defaultValue={50}` (number)
- Range Slider: `defaultValue={[25, 75]}` (array)

React Aria는 `defaultValue`의 타입에 따라 자동으로 single/range 모드를 결정합니다.

### Label Position Strategies

1. **default (hidden)**: 라벨이 필요 없는 경우 (예: 최소한의 UI)
2. **bottom**: 항상 표시되는 라벨 (예: 설정 화면)
3. **top-floating**: Dragging 시에만 표시 (예: 볼륨 컨트롤, 가격 필터)

### Common Use Cases

1. **Volume Control**: `labelPosition="top-floating"`, percentage
2. **Price Filter**: Range slider, currency formatter
3. **Rating**: 1-5 range, star formatter
4. **Temperature**: Custom range (0-40), temperature formatter
5. **Progress**: Disabled slider, percentage

## Implementation Complete

This guide was generated as part of the Untitled UI Component Installer workflow (v5.2.0).

**Installation Date**: 2025-11-20
**Component**: Slider
**Stories Count**: 9
**Workflow Version**: 5.2.0
