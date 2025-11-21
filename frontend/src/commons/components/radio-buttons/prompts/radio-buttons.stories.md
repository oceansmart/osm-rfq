# RadioButtons Component - Storybook Stories Implementation Guide

## 조건-프로젝트

- **프로젝트명**: OSM RFQ (Request for Quotation Management System)
- **기술 스택**: Next.js 14.2.33, TypeScript 5, React 18
- **UI 라이브러리**: React Aria Components, Untitled UI PRO
- **스타일링**: Tailwind CSS v4 + CSS Variables
- **컴포넌트 문서화**: Storybook 9.1.13 with @storybook/nextjs
- **언어 설정**: 한국어 (ko) - 주석 및 스토리 제목

## 조건-파일경로

```
frontend/src/commons/components/radio-buttons/
├── index.tsx                            # Main RadioButtons components
├── index.stories.tsx                    # Storybook stories (이 가이드의 대상)
└── prompts/
    └── radio-buttons.stories.md        # This guide
```

**관련 의존성**:
- `react-aria-components` - Radio, RadioGroup primitives
- `@/utils/cx` - Classname utility

## 핵심요구사항

### 1. RadioButtons Component Overview

**컴포넌트 구성**:
- `RadioButtonBase`: Low-level radio button UI (내부 컴포넌트)
- `RadioButton`: Radio button with label and hint support
- `RadioGroup`: Container for grouping radio buttons
- `RadioGroupContext`: Context for sharing size prop

**주요 특징**:
- **2가지 크기**: sm (small), md (medium)
- **접근성**: React Aria Components 기반 (WCAG 2.1 AA 준수)
- **상태 관리**: Selected, disabled, focus-visible
- **폼 통합**: Label, hint text, disabled states
- **레이아웃 유연성**: Vertical (default), horizontal

### 2. Props Interface

```typescript
// RadioGroup Props
interface RadioGroupProps {
  size?: "sm" | "md";           // Size variant
  children: ReactNode;          // RadioButton children
  className?: string;           // Custom styles
  defaultValue?: string;        // Default selected value
  value?: string;               // Controlled value
  onChange?: (value: string) => void;  // Change handler
  isDisabled?: boolean;         // Disable all radio buttons
}

// RadioButton Props
interface RadioButtonProps {
  value: string;                // Value identifier (required)
  size?: "sm" | "md";          // Size variant (overrides RadioGroup)
  label?: ReactNode;            // Label text
  hint?: ReactNode;             // Helper text below label
  className?: string;           // Custom styles
  isDisabled?: boolean;         // Disable this radio button
}
```

## 구현 범위

### Story Categories (9 Stories)

#### 1. **Default** - 기본 RadioGroup
- 3개의 RadioButton with labels
- Vertical layout (default)
- Size: sm (default)

#### 2. **Sizes** - 크기 비교
- Small (sm) - 작은 라디오 버튼
- Medium (md) - 중간 크기 라디오 버튼
- 각 크기별 3개 옵션

#### 3. **WithLabelsAndHints** - Label과 Hint 표시
- Labels only - 라벨만 표시
- Labels with hints - 라벨 + 힌트 텍스트
- Pricing 예시 (Free, Pro, Enterprise)

#### 4. **States** - 다양한 상태
- Normal - 기본 상태
- With Default Selection - 기본 선택값
- Disabled (전체) - isDisabled on RadioGroup
- Individual Disabled - 개별 라디오 버튼 비활성화

#### 5. **WithoutLabels** - Label 없이 사용
- Small size without labels
- Medium size without labels
- 아이콘만 사용하는 경우

#### 6. **HorizontalLayout** - 가로 배치
- Horizontal with labels
- Horizontal without labels
- className="flex-row gap-6" 사용

#### 7. **FormExample** - 실제 폼 예시
- Account Settings 시나리오
- Notification Preferences (All, Important, None)
- Privacy Settings (Public, Friends, Private)

#### 8. **UseCases** - 실전 사용 예시
- Payment Method Selection:
  - Credit Card, PayPal, Bank Transfer, Crypto
- Shipping Options:
  - Express ($15), Standard ($5), Economy (Free)
- Survey Question:
  - 5-point satisfaction scale

#### 9. **Playground** - 모든 props 조작 가능
- argTypes로 정의된 모든 props 포함
- Interactive controls로 실시간 변경 테스트
- 개발자 테스트용 샌드박스

## 기술 요구사항

### Storybook 설정

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { RadioButton, RadioGroup } from './index';

const meta: Meta<typeof RadioButton> = {
  title: 'Commons/Components/RadioButtons',
  component: RadioButton,
  parameters: {
    layout: 'centered',  // Center alignment
  },
  tags: ['autodocs'],  // Auto-generate docs
  argTypes: {
    // 5 argTypes defined
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;
```

### ArgTypes 구성

모든 props에 대해 다음 정보 포함:
- `control`: 'radio' | 'text' | 'boolean'
- `options`: ['sm', 'md'] (size)
- `description`: 한글 설명 (명확하고 간결하게)

### Story 작성 패턴

**복합 레이아웃 Story**:
```typescript
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroup size="sm">
          <RadioButton value="sm1" label="Small option 1" />
          <RadioButton value="sm2" label="Small option 2" />
          <RadioButton value="sm3" label="Small option 3" />
        </RadioGroup>
      </div>
      {/* ... more variants */}
    </div>
  ),
};
```

## 구현 요구사항

### 1. 코드 품질

- **타입 안전성**: 모든 Story에 `Story` 타입 명시
- **Props 일관성**: value는 항상 unique string
- **접근성**: label 권장, hint는 선택사항
- **반응형**: 고정 width (w-[400px], w-[500px]) 사용으로 일관된 레이아웃

### 2. UI/UX 패턴

- **간격**: `gap-4` (RadioGroup 기본값), `gap-6`, `gap-8` 사용
- **섹션 제목**: `<h3 className="text-sm font-semibold mb-4">` 패턴
- **컨테이너**: `border rounded-lg p-6` 패턴 (FormExample, UseCases)
- **색상**: Tailwind semantic colors (text-secondary, text-tertiary)

### 3. 한글화

- **섹션 제목**: 한글 사용 (예: "Small (sm)")
- **주석**: 한글 주석 (예: `// 1. Default - 기본 RadioGroup`)
- **Label**: 영문 또는 한글 (컨텍스트에 맞게)
- **Hint 메시지**: 영문 사용 (글로벌 표준)

### 4. 스토리 순서

1. Default (기본)
2. Sizes (크기 비교)
3. WithLabelsAndHints (부가 정보)
4. States (상태 비교)
5. WithoutLabels (최소 구성)
6. HorizontalLayout (레이아웃 변형)
7. FormExample (실전 예시)
8. UseCases (복합 시나리오)
9. Playground (개발자 도구)

**순서 원칙**: 단순 → 복잡, 기본 → 고급, 단일 → 복합

## 검증 체크리스트

### Story 실행 검증

```bash
cd frontend
npm run storybook
```

- [ ] Storybook 서버 정상 실행 (localhost:6006)
- [ ] `Commons/Components/RadioButtons` 카테고리 표시
- [ ] 9개 Story 모두 표시
- [ ] Autodocs 페이지 자동 생성
- [ ] Controls 패널 동작 (Playground)

### 개별 Story 검증

**Default**:
- [ ] 3개 RadioButton 표시
- [ ] Vertical layout (기본)
- [ ] Label 표시

**Sizes**:
- [ ] Small (sm) - 작은 크기 표시
- [ ] Medium (md) - 중간 크기 표시
- [ ] 크기 차이 명확히 구분

**WithLabelsAndHints**:
- [ ] Labels only - 라벨만 표시
- [ ] Labels with hints - 라벨 + 힌트 표시
- [ ] Hint text 회색 (text-tertiary)

**States**:
- [ ] Normal - 기본 상태
- [ ] With Default Selection - defaultValue prop 동작
- [ ] Disabled (전체) - 회색 배경, cursor not-allowed
- [ ] Individual Disabled - 특정 옵션만 비활성화

**WithoutLabels**:
- [ ] Label 없이 RadioButtonBase만 표시
- [ ] Small, Medium 크기 차이 확인

**HorizontalLayout**:
- [ ] Horizontal with labels - 가로 배치
- [ ] Horizontal without labels - 가로 배치
- [ ] className="flex-row" 적용 확인

**FormExample**:
- [ ] Account Settings 폼 표시
- [ ] Notification Preferences 섹션
- [ ] Privacy Settings 섹션
- [ ] Border container 표시

**UseCases**:
- [ ] Payment Method - 4개 옵션
- [ ] Shipping Options - 3개 옵션 (가격 표시)
- [ ] Survey Question - 5-point scale
- [ ] 각 섹션 border container 표시

**Playground**:
- [ ] 모든 argTypes controls 표시
- [ ] 실시간 props 변경 반영
- [ ] Boolean controls 토글 동작
- [ ] Text controls 입력 동작

### TypeScript 컴파일 검증

```bash
npx tsc --noEmit
```

- [ ] 타입 에러 없음
- [ ] Import 경로 정상 (`'./index'`)
- [ ] Props 타입 정합성

### 접근성 검증

Storybook a11y addon 사용:
- [ ] Radio-label 연결 (for/id)
- [ ] RadioGroup - role="radiogroup"
- [ ] RadioButton - role="radio"
- [ ] Disabled fields - aria-disabled
- [ ] Keyboard navigation (Arrow keys, Space, Tab)
- [ ] Screen reader 호환 (label announcement)

## 사용 예시

### Story 작성 예시

```typescript
// ✅ Good: 명확한 제목과 설명
export const FormExample: Story = {
  render: () => (
    <div className="w-[600px] p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-md font-semibold mb-4">Notification Preferences</h3>
          <RadioGroup defaultValue="all">
            <RadioButton value="all" label="All notifications" hint="Receive all updates" />
            <RadioButton value="important" label="Important only" hint="Only critical notifications" />
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
};

// ❌ Bad: 제목 없음, 레이아웃 일관성 없음
export const Form: Story = {
  render: () => (
    <div>
      <RadioGroup>
        <RadioButton value="all" label="All" />
        <RadioButton value="important" label="Important" />
      </RadioGroup>
    </div>
  ),
};
```

### ArgTypes 작성 예시

```typescript
// ✅ Good: 명확한 설명
argTypes: {
  size: {
    control: 'radio',
    options: ['sm', 'md'],
    description: 'Size of the radio button',
  },
  label: {
    control: 'text',
    description: 'Label text for the radio button',
  },
}

// ❌ Bad: 설명 부족
argTypes: {
  size: { control: 'radio', options: ['sm', 'md'] },
  label: { control: 'text' },
}
```

### 레이아웃 패턴 예시

```typescript
// ✅ Good: 섹션별 명확한 구분
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Payment Method</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroup defaultValue="credit">
            <RadioButton value="credit" label="Credit Card" hint="Visa, Mastercard..." />
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
};

// ❌ Bad: 구분 없이 나열
export const UseCases: Story = {
  render: () => (
    <div>
      <RadioGroup>
        <RadioButton value="credit" label="Credit Card" />
      </RadioGroup>
    </div>
  ),
};
```

## 참고 자료

- **React Aria Components**: https://react-spectrum.adobe.com/react-aria/RadioGroup.html
- **Storybook Next.js**: https://storybook.js.org/docs/get-started/frameworks/nextjs
- **Untitled UI RadioButtons**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/radio-buttons/index.tsx`
- **TextArea Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/textarea/index.stories.tsx`
- **Avatar Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/avatar/index.stories.tsx`

## 버전 이력

- **v1.0.0** (2025-11-20): 초기 작성 - RadioButtons Storybook Stories 가이드 생성
