# Input Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/input/input.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/input/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Input 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

**Input은 폼 입력을 위한 텍스트 필드입니다:**
- Label, Hint Text, Tooltip 지원
- 아이콘 leading/trailing 표시
- 다양한 상태 (required, invalid, disabled, readonly)
- Keyboard shortcut 표시

---

## 📊 구현 범위

### 1. Size Variants (2가지)

| Size | Height | Padding | Use Case |
|------|--------|---------|----------|
| `sm` | `36px` | `px-3 py-2` | 기본 크기, 대부분의 경우 |
| `md` | `40px` | `px-3.5 py-2.5` | 강조가 필요한 입력 필드 |

### 2. States (5가지)

| State | Description |
|-------|-------------|
| `Normal` | 기본 상태 |
| `Required` | 필수 입력 (`isRequired=true`) |
| `Disabled` | 비활성화 (`isDisabled=true`) |
| `Read-only` | 읽기 전용 (`isReadOnly=true`) |
| `Invalid` | 검증 실패 (`isInvalid=true`) |

### 3. With Additional Elements

- **Icon**: Leading icon (Mail, Search, Lock, User, CreditCard)
- **Hint Text**: Helper text below input
- **Tooltip**: Help icon with tooltip
- **Shortcut**: Keyboard shortcut display (⌘K, Ctrl+/)

### 4. Form Examples

- Sign Up Form (Full Name, Email, Password)
- Validation States (Valid/Invalid examples)

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components 통합 검증 (TextField, Input, Group)
- Tooltip 컴포넌트 통합 검증
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - aria-label for inputs without labels
  - Required indicator (*) for required fields
  - Error messages via hint text
  - Keyboard navigation (Tab, Enter)

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './index';
import { Mail, Search, Lock, User, CreditCard } from '@/commons/components/icons';

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* ... */ },
};

export default meta;
type Story = StoryObj<typeof Input>;
```

### 필수 Stories (10개)

1. **Default** - 기본 Input (Label + Placeholder)
2. **AllSizes** - 2가지 사이즈 비교 (sm, md)
3. **WithIcons** - 아이콘과 함께 (Mail, Search, Lock, User, CreditCard)
4. **WithHelperText** - Hint text 표시
5. **WithTooltip** - Tooltip 표시 (Help icon)
6. **States** - 5가지 상태 (Normal, Required, Disabled, Read-only, Invalid)
7. **WithShortcut** - Keyboard shortcut 표시 (⌘K, Ctrl+/)
8. **FormExample** - 실제 폼 예시 (Sign Up)
9. **ValidationStates** - 검증 상태 (Valid/Invalid)
10. **Playground** - 모든 props 조작 가능

### 구현 예시

```typescript
// 1. Default
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    size: 'sm',
  },
};

// 3. WithIcons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <Input label="Email" placeholder="olivia@untitledui.com" icon={Mail} />
      <Input label="Search" placeholder="Search..." icon={Search} />
      <Input label="Password" placeholder="Enter password" icon={Lock} type="password" />
    </div>
  ),
};

// 6. States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Normal</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Required</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" isRequired />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Invalid</h3>
        <Input
          label="Email"
          placeholder="olivia@untitledui.com"
          isInvalid
          hint="Please enter a valid email address"
        />
      </div>
    </div>
  ),
};
```

---

## ✅ 검증 체크리스트

### 기능 검증

- [ ] 2가지 사이즈 (sm, md) 모두 렌더링 확인
- [ ] 모든 상태 전환 동작 확인 (Normal, Required, Disabled, Read-only, Invalid)
- [ ] 아이콘 leading 위치 정상 렌더링
- [ ] Hint text 표시 확인 (Normal/Error)
- [ ] Tooltip 표시 확인 (Help icon)
- [ ] Keyboard shortcut 표시 확인
- [ ] Focus ring 동작 확인 (Brand color)
- [ ] Error state에서 InfoCircle 아이콘 표시 확인

### Storybook 통합

- [ ] Controls 패널에서 모든 props 조작 가능
  - size: 'sm' | 'md'
  - isDisabled: boolean
  - isRequired: boolean
  - isInvalid: boolean
  - isReadOnly: boolean
  - label: string
  - placeholder: string
  - hint: string
  - tooltip: string
- [ ] A11y 애드온 경고 없음
- [ ] 각 Story가 의미있는 이름과 설명 포함

### 접근성 검증

- [ ] aria-label 속성 자동 설정 (label 없을 때 placeholder 사용)
- [ ] 키보드 내비게이션 지원 (Tab, Enter)
- [ ] Required indicator (*) 표시
- [ ] Tooltip이 스크린리더에 읽힘
- [ ] Disabled input은 포커스 불가
- [ ] Invalid state에서 hint text가 error role 가짐

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] InputBaseProps 타입 정상 동작
- [ ] AriaTextFieldProps 통합 확인
- [ ] Icon prop에 ComponentType 타입 지원

### 실전 사용성

- [ ] FormExample Story가 실제 폼 패턴 시연
  - Sign Up Form (Full Name, Email, Password, Confirm Password)
- [ ] ValidationStates Story가 검증 상태 시연
  - Valid email vs Invalid email
  - Available username vs Taken username
- [ ] 각 패턴이 프로젝트에서 바로 복사 가능

---

## 🎨 Input 컴포넌트 특징

### 1. React Aria Integration

Input은 React Aria Components의 TextField를 기반으로 합니다:
- `TextField` - 최상위 컨테이너 (Label + Input + Hint)
- `Group` - Input wrapper (아이콘, Tooltip 포함)
- `Input` - 실제 input element

### 2. Tooltip Integration

```typescript
// Tooltip with Help icon
<Input
  label="API Key"
  placeholder="sk_live_..."
  tooltip="Your API key can be found in the dashboard settings"
/>
```

### 3. Icon Support

```typescript
// Leading icon
<Input label="Email" placeholder="Enter email" icon={Mail} />

// Trailing icon (자동 - Tooltip help icon 또는 Error icon)
```

### 4. Keyboard Shortcut

```typescript
// Default shortcut (⌘K)
<Input label="Search" placeholder="Search..." shortcut />

// Custom shortcut
<Input label="Command" placeholder="Type a command..." shortcut="⌘K" />
```

---

## 💡 사용 예시

### 기본 입력 필드

```typescript
<Input
  label="Email"
  placeholder="olivia@untitledui.com"
  hint="We'll never share your email"
/>
```

### 필수 입력 (Required)

```typescript
<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  isRequired
  hint="Must be at least 8 characters"
/>
```

### 검증 실패 (Invalid)

```typescript
<Input
  label="Email"
  placeholder="olivia@untitledui.com"
  isInvalid
  hint="Please enter a valid email address"
/>
```

### 아이콘 + 툴팁 + 단축키

```typescript
<Input
  label="Search"
  placeholder="Search..."
  icon={Search}
  tooltip="Press ⌘K to open search"
  shortcut
/>
```

---

**구현 완료 후 위 체크리스트를 모두 검증하고 결과를 반환하세요!**
