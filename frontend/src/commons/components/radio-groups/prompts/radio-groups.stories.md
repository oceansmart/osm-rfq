# RadioGroups Component - Storybook Stories Implementation Guide

## 조건-프로젝트

- **프로젝트명**: OSM RFQ (Request for Quotation Management System)
- **기술 스택**: Next.js 14.2.33, TypeScript 5, React 18
- **UI 라이브러리**: React Aria Components, Untitled UI PRO
- **스타일링**: Tailwind CSS v4 + CSS Variables
- **컴포넌트 문서화**: Storybook 9.1.13 with @storybook/nextjs
- **언어 설정**: 한국어 (ko) - 주석 및 스토리 제목

## 조건-파일경로

```
frontend/src/commons/components/radio-groups/
├── index.tsx                            # Main RadioGroups components (6 variants)
├── index.stories.tsx                    # Storybook stories (이 가이드의 대상)
└── prompts/
    └── radio-groups.stories.md         # This guide
```

**관련 의존성**:
- `react-aria-components` - RadioGroup, Radio, Label, Text primitives
- `@/commons/components/checkbox` - CheckboxBase
- `@/commons/components/avatar` - Avatar
- `@/commons/components/badge` - BadgeWithDot
- `@/commons/components/featured-icon` - FeaturedIcon
- `@/commons/components/button` - Button
- `@/utils/cx` - Classname utility

## 핵심요구사항

### 1. RadioGroups Component Overview

**컴포넌트 구성** (6개 변형):

1. **RadioGroupRadioButton**: 기본 라디오 버튼 스타일
   - 자체 RadioButton UI (원형 인디케이터)
   - title, secondaryTitle, description

2. **RadioGroupCheckbox**: 체크박스 스타일 라디오 그룹
   - CheckboxBase 사용
   - title, secondaryTitle, description

3. **RadioGroupAvatar**: 아바타가 있는 라디오 그룹
   - Avatar + CheckboxBase
   - name, username, title, avatarUrl

4. **RadioGroupIconSimple**: 아이콘 + 체크박스 스타일
   - FeaturedIcon + CheckboxBase
   - icon, title, secondaryTitle, description

5. **RadioGroupIconCard**: 카드 형태의 아이콘 라디오 그룹
   - FeaturedIcon + CheckboxBase + BadgeWithDot
   - icon, title, price, secondaryTitle, description, badge

6. **RadioGroupPaymentIcon**: 결제 수단 선택 라디오 그룹
   - logo (ReactNode) + CheckboxBase + Button
   - logo, title, description, buttons (Set as default, Edit)

**주요 특징**:
- **2가지 크기**: sm (small), md (medium)
- **접근성**: React Aria Components 기반 (WCAG 2.1 AA 준수)
- **상태 관리**: Selected, disabled, focus-visible
- **폼 통합**: Label, description, disabled states
- **레이아웃**: Vertical (default), gap-3

### 2. Props Interfaces

```typescript
// RadioGroupRadioButton & RadioGroupCheckbox & RadioGroupIconSimple Props
interface RadioGroupProps {
  size?: "sm" | "md";
  items: RadioGroupItemType[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  className?: string;
}

type RadioGroupItemType = {
  value: string;
  title: string;
  disabled?: boolean;
  description: string;
  secondaryTitle: string;
  icon: FC<{ className?: string }>;
};

// RadioGroupAvatar Props
interface RadioGroupAvatarProps {
  size?: "sm" | "md";
  items: AvatarItemType[];
  // ... other RadioGroup props
}

interface AvatarItemType {
  id: string;              // value identifier
  name: string;            // user name
  username: string;        // username (e.g., @johndoe)
  title: string;           // job title or role
  avatarUrl: string;       // avatar image URL
  disabled?: boolean;
}

// RadioGroupIconCard Props
interface RadioGroupIconCardProps {
  size?: "sm" | "md";
  items: IconCardItemType[];
  // ... other RadioGroup props
}

type IconCardItemType = {
  value: string;
  title: string;
  description: string;
  secondaryTitle?: string;
  disabled?: boolean;
  price?: string;          // pricing display
  badge?: ReactNode;       // optional badge
  icon: FC<{ className?: string }>;
};

// RadioGroupPaymentIcon Props
interface RadioGroupPaymentIconProps {
  size?: "sm" | "md";
  items: PaymentCardItemType[];
  // ... other RadioGroup props
}

interface PaymentCardItemType {
  value: string;
  title: string;
  description: string;
  logo: ReactNode;         // payment logo (custom ReactNode)
  disabled?: boolean;
}
```

## 구현 범위

### Story Categories (15 Stories)

#### 1. **Overview** - 6개 변형 모두 표시
- RadioButton, Checkbox, Avatar, IconSimple, IconCard, PaymentIcon
- 각 변형 1-2개 아이템
- Border container로 구분

#### 2. **RadioButtonVariants** - 기본 라디오 버튼 상세
- Small (sm) - 3개 아이템
- Medium (md) - 3개 아이템
- With Disabled Item - 특정 아이템 비활성화
- All Disabled - 전체 비활성화 (isDisabled)

#### 3. **CheckboxVariants** - 체크박스 스타일 상세
- Small (sm) - 3개 아이템
- Medium (md) - 3개 아이템
- With Disabled Item - 특정 아이템 비활성화

#### 4. **AvatarVariants** - 아바타 스타일 상세
- Small (sm) - 3개 아이템 (user profiles)
- Medium (md) - 3개 아이템
- With Disabled Item - 특정 사용자 비활성화

#### 5. **IconSimpleVariants** - 아이콘 심플 스타일 상세
- Small (sm) - 3개 아이템
- Medium (md) - 3개 아이템
- With Disabled Item - 특정 아이템 비활성화

#### 6. **IconCardVariants** - 아이콘 카드 스타일 상세
- Small (sm) - 2개 아이템 (pricing cards)
- Medium (md) - 2개 아이템
- With More Options - 3개 아이템 (badge 포함)

#### 7. **PaymentIconVariants** - 결제 아이콘 스타일 상세
- Small (sm) - 2개 아이템 (payment cards)
- Medium (md) - 2개 아이템
- With More Cards - 3개 아이템 (Visa, Mastercard, Amex)

#### 8. **SizesComparison** - 모든 변형의 크기 비교
- Small (sm) - All Variants (4개: RadioButton, Checkbox, IconSimple, Avatar)
- Medium (md) - All Variants (4개)
- Grid layout (grid-cols-2)

#### 9. **UseCases** - 실전 사용 예시
- Subscription Plan Selection (IconCard)
- Team Member Assignment (Avatar)
- Payment Method Selection (PaymentIcon)
- Notification Preferences (Checkbox)

#### 10-15. **Playground** - 각 변형당 Playground
- PlaygroundRadioButton
- PlaygroundCheckbox
- PlaygroundAvatar
- PlaygroundIconSimple
- PlaygroundIconCard
- PlaygroundPaymentIcon

## 기술 요구사항

### Storybook 설정

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  RadioGroupRadioButton,
  RadioGroupCheckbox,
  RadioGroupAvatar,
  RadioGroupIconSimple,
  RadioGroupIconCard,
  RadioGroupPaymentIcon,
} from './index';

const meta: Meta<typeof RadioGroupRadioButton> = {
  title: 'Commons/Components/RadioGroups',
  component: RadioGroupRadioButton,
  parameters: {
    layout: 'centered',  // Center alignment
  },
  tags: ['autodocs'],  // Auto-generate docs
  argTypes: {
    // 3 argTypes defined
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupRadioButton>;
```

### ArgTypes 구성

모든 변형에 공통으로 적용되는 props:
- `size`: radio control (2 options: sm, md)
- `defaultValue`: text control
- `isDisabled`: boolean control
- `description`: 영문 설명 (명확하고 간결하게)

### Sample Data 구성

각 변형별로 샘플 데이터 정의:

```typescript
// planItems - RadioButton, Checkbox, IconSimple 공통
const planItems = [
  {
    value: 'basic',
    title: 'Basic',
    secondaryTitle: '$10/mo',
    description: 'Perfect for individuals',
    icon: PlaceholderIcon,
  },
  // ... more items
];

// avatarItems - Avatar 전용
const avatarItems = [
  {
    id: '1',
    name: 'John Doe',
    username: '@johndoe',
    title: 'Senior Developer',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  // ... more items
];

// iconCardItems - IconCard 전용
const iconCardItems = [
  {
    value: 'starter',
    title: 'Starter',
    price: '$10',
    secondaryTitle: '/month',
    description: 'Up to 5 users, 10GB storage',
    badge: 'Popular',
    icon: PlaceholderIcon,
  },
  // ... more items
];

// paymentItems - PaymentIcon 전용
const paymentItems = [
  {
    value: 'visa',
    title: 'Visa ending in 1234',
    description: 'Expires 12/2024',
    logo: <div className="...">VISA</div>,
  },
  // ... more items
];
```

### Icon Placeholder

실제 아이콘 컴포넌트는 사용자가 제공해야 하므로 Placeholder 사용:

```typescript
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
```

### Story 작성 패턴

**Overview Story**:
```typescript
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">1. RadioButton Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupRadioButton size="sm" items={planItems} defaultValue="basic" />
        </div>
      </div>
      {/* ... more variants */}
    </div>
  ),
};
```

## 구현 요구사항

### 1. 코드 품질

- **타입 안전성**: 모든 Story에 `Story` 타입 명시
- **Props 일관성**: value/id는 항상 unique string
- **접근성**: React Aria Components 자동 ARIA 속성
- **반응형**: 고정 width (w-[600px], w-[700px]) 사용으로 일관된 레이아웃

### 2. UI/UX 패턴

- **간격**: `gap-3` (RadioGroup 기본값), `gap-6`, `gap-8`, `gap-12` 사용
- **섹션 제목**: `<h3 className="text-md font-semibold mb-4">` 패턴
- **컨테이너**: `border rounded-lg p-6` 패턴 (Overview, UseCases)
- **Grid**: `grid-cols-2` (SizesComparison)
- **색상**: Tailwind semantic colors (text-secondary, text-tertiary)

### 3. 한글화

- **섹션 제목**: 영문 사용 (Small (sm), Medium (md))
- **주석**: 한글 주석 (예: `// 1. Overview - 6개 변형 모두 표시`)
- **설명 텍스트**: 영문 사용 (글로벌 표준)
- **스토리 이름**: PascalCase 영문

### 4. 스토리 순서

1. Overview (전체 개요)
2-7. 각 변형별 상세 (RadioButton, Checkbox, Avatar, IconSimple, IconCard, PaymentIcon)
8. SizesComparison (크기 비교)
9. UseCases (실전 예시)
10-15. Playground (각 변형당)

**순서 원칙**: 개요 → 변형별 상세 → 비교 → 실전 → 개발자 도구

## 검증 체크리스트

### Story 실행 검증

```bash
cd frontend
npm run storybook
```

- [ ] Storybook 서버 정상 실행 (localhost:6006)
- [ ] `Commons/Components/RadioGroups` 카테고리 표시
- [ ] 15개 Story 모두 표시
- [ ] Autodocs 페이지 자동 생성
- [ ] Controls 패널 동작 (Playground)

### 개별 Story 검증

**Overview**:
- [ ] 6개 변형 모두 표시
- [ ] Border container로 구분
- [ ] 각 변형 1-2개 아이템
- [ ] defaultValue 정상 동작

**RadioButtonVariants**:
- [ ] Small (sm) - 원형 인디케이터 표시
- [ ] Medium (md) - 크기 차이 확인
- [ ] With Disabled Item - 특정 아이템 회색 처리
- [ ] All Disabled - 전체 비활성화

**CheckboxVariants**:
- [ ] CheckboxBase 표시
- [ ] Small, Medium 크기 차이
- [ ] Disabled 상태 확인

**AvatarVariants**:
- [ ] Avatar 이미지 표시 (pravatar.cc)
- [ ] name, username, title 표시
- [ ] CheckboxBase 오른쪽 배치

**IconSimpleVariants**:
- [ ] FeaturedIcon 표시
- [ ] CheckboxBase 오른쪽 배치
- [ ] Disabled 상태 확인

**IconCardVariants**:
- [ ] 카드 형태 레이아웃 (header + body)
- [ ] price, badge 표시
- [ ] CheckboxBase 헤더 오른쪽 배치

**PaymentIconVariants**:
- [ ] logo (ReactNode) 표시
- [ ] Button 2개 표시 (Set as default, Edit)
- [ ] CheckboxBase 오른쪽 배치

**SizesComparison**:
- [ ] Grid layout (grid-cols-2)
- [ ] Small, Medium 크기 차이 명확
- [ ] 4개 변형 표시 (RadioButton, Checkbox, IconSimple, Avatar)

**UseCases**:
- [ ] Subscription Plan - IconCard 사용
- [ ] Team Member - Avatar 사용
- [ ] Payment Method - PaymentIcon 사용
- [ ] Notification Preferences - Checkbox 사용
- [ ] 각 섹션 border container

**Playground**:
- [ ] 6개 Playground 모두 동작
- [ ] size radio control 동작
- [ ] defaultValue text input 동작
- [ ] isDisabled boolean toggle 동작

### TypeScript 컴파일 검증

```bash
npx tsc --noEmit
```

- [ ] 타입 에러 없음
- [ ] Import 경로 정상 (`'./index'`)
- [ ] Props 타입 정합성
- [ ] Sample data 타입 정합성

### 접근성 검증

Storybook a11y addon 사용:
- [ ] RadioGroup - role="radiogroup"
- [ ] Radio - role="radio"
- [ ] Label 연결 (React Aria 자동)
- [ ] Disabled fields - aria-disabled
- [ ] Keyboard navigation (Arrow keys, Space, Tab)
- [ ] Screen reader 호환 (label + description announcement)

## 사용 예시

### Story 작성 예시

```typescript
// ✅ Good: 명확한 제목과 설명
export const RadioButtonVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupRadioButton size="sm" items={planItems} defaultValue="basic" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupRadioButton size="md" items={planItems} defaultValue="pro" />
      </div>
    </div>
  ),
};

// ❌ Bad: 제목 없음, 레이아웃 일관성 없음
export const RadioButton: Story = {
  render: () => (
    <div>
      <RadioGroupRadioButton size="sm" items={planItems} />
    </div>
  ),
};
```

### Sample Data 작성 예시

```typescript
// ✅ Good: 명확한 데이터 구조
const planItems = [
  {
    value: 'basic',          // unique identifier
    title: 'Basic',          // primary text
    secondaryTitle: '$10/mo', // secondary text
    description: 'Perfect for individuals', // description
    icon: PlaceholderIcon,   // icon component
  },
];

// ❌ Bad: 불완전한 데이터
const planItems = [
  { value: 'basic', title: 'Basic' }, // missing required fields
];
```

### Icon 사용 예시

```typescript
// ✅ Good: Placeholder icon for demo
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24">
    {/* SVG content */}
  </svg>
);

// ✅ Good: Actual icon component (user's implementation)
import { CheckIcon } from '@/commons/icons';

const planItems = [
  { value: 'basic', title: 'Basic', icon: CheckIcon },
];

// ❌ Bad: Missing icon
const planItems = [
  { value: 'basic', title: 'Basic', icon: undefined }, // Error
];
```

### Avatar URL 예시

```typescript
// ✅ Good: Using placeholder service
const avatarItems = [
  {
    id: '1',
    name: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=1', // Random avatar
  },
];

// ✅ Good: Using actual avatar URLs
const avatarItems = [
  {
    id: '1',
    name: 'John Doe',
    avatarUrl: '/avatars/john-doe.jpg', // Project avatar
  },
];

// ❌ Bad: Missing avatar URL
const avatarItems = [
  { id: '1', name: 'John Doe', avatarUrl: '' }, // Empty string
];
```

## 참고 자료

- **React Aria Components**: https://react-spectrum.adobe.com/react-aria/RadioGroup.html
- **Storybook Next.js**: https://storybook.js.org/docs/get-started/frameworks/nextjs
- **Untitled UI RadioGroups**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/radio-groups/index.tsx`
- **RadioButtons Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/radio-buttons/index.stories.tsx`
- **Avatar Component**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/avatar/index.tsx`
- **Checkbox Component**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/checkbox/index.tsx`

## 버전 이력

- **v1.0.0** (2025-11-20): 초기 작성 - RadioGroups Storybook Stories 가이드 생성 (6개 변형)
