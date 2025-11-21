# TextArea Component - Storybook Stories Implementation Guide

## 조건-프로젝트

- **프로젝트명**: OSM RFQ (Request for Quotation Management System)
- **기술 스택**: Next.js 14.2.33, TypeScript 5, React 18
- **UI 라이브러리**: React Aria Components, Untitled UI PRO
- **스타일링**: Tailwind CSS v4 + CSS Variables
- **컴포넌트 문서화**: Storybook 9.1.13 with @storybook/nextjs
- **언어 설정**: 한국어 (ko) - 주석 및 스토리 제목

## 조건-파일경로

```
frontend/src/commons/components/textarea/
├── index.tsx                          # Main TextArea component
├── index.stories.tsx                  # Storybook stories (이 가이드의 대상)
└── prompts/
    └── textarea.stories.md           # This guide
```

**관련 의존성**:
- `@/commons/components/input` - HintText, Label components
- `react-aria-components` - TextField, TextArea primitives
- `@/utils/cx` - Classname utility

## 핵심요구사항

### 1. TextArea Component Overview

**컴포넌트 구성**:
- `TextAreaBase`: Low-level textarea with React Aria integration
- `TextArea`: High-level component with label, hint, tooltip support

**주요 특징**:
- **크기 조절 가능**: Custom SVG resize handle (light/dark mode)
- **접근성**: React Aria Components 기반 (WCAG 2.1 AA 준수)
- **상태 관리**: Focus, disabled, invalid, read-only
- **다크 모드**: CSS Variables 기반 자동 전환
- **폼 통합**: Label, hint text, tooltip, required indicator

### 2. Props Interface

```typescript
interface TextFieldProps extends AriaTextFieldProps {
  label?: string;                      // Label text
  hint?: ReactNode;                    // Helper text below textarea
  tooltip?: string;                    // Tooltip after label
  textAreaClassName?: string;          // Custom textarea styles
  textAreaRef?: Ref<HTMLTextAreaElement>;
  hideRequiredIndicator?: boolean;
  placeholder?: string;
  rows?: number;                       // Visible height
  cols?: number;                       // Visible width
}
```

## 구현 범위

### Story Categories (10 Stories)

#### 1. **Default** - 기본 TextArea
- 기본 props 설정 (label, placeholder, rows=4)
- Interactive controls로 모든 props 조작 가능

#### 2. **Sizes** - 다양한 rows 크기
- Small (3 rows) - 짧은 댓글
- Medium (5 rows) - 설명 텍스트
- Large (8 rows) - 긴 콘텐츠

#### 3. **WithHelperText** - 힌트 텍스트
- 문자 수 제한 안내
- 사용 가이드 표시
- 긍정적 피드백 메시지

#### 4. **WithTooltip** - 툴팁 표시
- API 설정 예시 (JSON format)
- 고급 기능 설명 (Custom CSS)
- 복잡한 입력 필드 안내

#### 5. **States** - 다양한 상태
- Normal - 기본 상태
- Required - 필수 입력 (isRequired)
- Disabled - 비활성화 (isDisabled)
- Read-only - 읽기 전용 (isReadOnly + value)
- Invalid - 에러 상태 (isInvalid + error hint)

#### 6. **Resizable** - 크기 조절 가능
- Vertical Resize - 세로 방향 크기 조절
- Both Directions - 양방향 크기 조절
- Custom SVG resize handle 표시

#### 7. **FormExample** - 실제 폼 예시
- Contact Form 시나리오
- Subject (2 rows, required)
- Message (6 rows, required, hint)
- Additional Notes (4 rows, optional)

#### 8. **ValidationStates** - 검증 상태
- Valid - 충분한 글자 수
- Invalid - 최소 글자 수 미달
- Character Count - 최대 글자 수 도달

#### 9. **UseCases** - 실전 사용 예시
- Bug Report Form:
  - Steps to Reproduce (4 rows, required)
  - Expected Behavior (3 rows, required)
  - Actual Behavior (3 rows, required)
- Code Review Form:
  - Review Comments (6 rows, hint)
  - Suggested Changes (5 rows)

#### 10. **Playground** - 모든 props 조작 가능
- argTypes로 정의된 모든 props 포함
- Interactive controls로 실시간 변경 테스트
- 개발자 테스트용 샌드박스

## 기술 요구사항

### Storybook 설정

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextArea } from './index';

const meta: Meta<typeof TextArea> = {
  title: 'Commons/Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',  // Center alignment
  },
  tags: ['autodocs'],  // Auto-generate docs
  argTypes: {
    // 10 argTypes defined
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;
```

### ArgTypes 구성

모든 props에 대해 다음 정보 포함:
- `control`: 'text' | 'number' | 'boolean'
- `description`: 한글 설명 (명확하고 간결하게)

### Story 작성 패턴

**단일 컴포넌트 Story**:
```typescript
export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};
```

**복합 레이아웃 Story**:
```typescript
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small (3 rows)</h3>
        <TextArea label="Comment" placeholder="Add a comment..." rows={3} />
      </div>
      {/* ... more variants */}
    </div>
  ),
};
```

## 구현 요구사항

### 1. 코드 품질

- **타입 안전성**: 모든 Story에 `Story` 타입 명시
- **Props 일관성**: 동일한 props는 동일한 값 사용 (예: placeholder 패턴)
- **접근성**: label, placeholder 항상 제공
- **반응형**: 고정 width (w-[400px], w-[500px]) 사용으로 일관된 레이아웃

### 2. UI/UX 패턴

- **간격**: `gap-4`, `gap-6`, `gap-8` 사용으로 일관된 spacing
- **섹션 제목**: `<h3 className="text-sm font-semibold mb-3">` 패턴
- **컨테이너**: `border rounded-lg p-6` 패턴 (FormExample)
- **색상**: Tailwind semantic colors (text-tertiary, text-primary)

### 3. 한글화

- **섹션 제목**: 한글 사용 (예: "Small (3 rows)")
- **주석**: 한글 주석 (예: `// 1. Default - 기본 TextArea`)
- **Placeholder**: 영문 사용 (UI 표준)
- **Hint 메시지**: 영문 사용 (글로벌 표준)

### 4. 스토리 순서

1. Default (기본)
2. Sizes (크기 비교)
3. WithHelperText (부가 정보)
4. WithTooltip (고급 기능)
5. States (상태 비교)
6. Resizable (특수 기능)
7. FormExample (실전 예시)
8. ValidationStates (검증 상태)
9. UseCases (복합 시나리오)
10. Playground (개발자 도구)

**순서 원칙**: 단순 → 복잡, 기본 → 고급, 단일 → 복합

## 검증 체크리스트

### Story 실행 검증

```bash
cd frontend
npm run storybook
```

- [ ] Storybook 서버 정상 실행 (localhost:6006)
- [ ] `Commons/Components/TextArea` 카테고리 표시
- [ ] 10개 Story 모두 표시
- [ ] Autodocs 페이지 자동 생성
- [ ] Controls 패널 동작 (Playground)

### 개별 Story 검증

**Default**:
- [ ] Label, placeholder 표시
- [ ] 4 rows 높이
- [ ] Interactive controls 동작

**Sizes**:
- [ ] 3개 크기 비교 레이아웃
- [ ] 각 크기별 적절한 rows 설정 (3, 5, 8)
- [ ] 섹션 제목 표시

**WithHelperText**:
- [ ] Hint text 하단 표시
- [ ] 회색 텍스트 색상 (text-tertiary)

**WithTooltip**:
- [ ] Tooltip icon 표시 (label 옆)
- [ ] Hover 시 tooltip 메시지 표시

**States**:
- [ ] 5개 상태 모두 표시
- [ ] Required - 빨간 별표 표시
- [ ] Disabled - 회색 배경, 커서 not-allowed
- [ ] Read-only - value 표시, 수정 불가
- [ ] Invalid - 빨간 테두리, 에러 hint

**Resizable**:
- [ ] Resize handle 표시 (우하단)
- [ ] Light mode - 회색 handle
- [ ] Dark mode - 어두운 handle
- [ ] Drag 시 크기 조절 가능

**FormExample**:
- [ ] Border container 표시
- [ ] 3개 textarea 세로 배치
- [ ] Required fields 별표 표시
- [ ] Hint 메시지 표시

**ValidationStates**:
- [ ] Valid - 기본 상태
- [ ] Invalid - 빨간 테두리 + 에러 메시지
- [ ] Character count - 현재/최대 표시

**UseCases**:
- [ ] Bug Report - 3개 필드, 모두 required
- [ ] Code Review - 2개 필드, hint 표시
- [ ] 섹션별 제목 표시

**Playground**:
- [ ] 모든 argTypes controls 표시
- [ ] 실시간 props 변경 반영
- [ ] Boolean controls 토글 동작
- [ ] Text/number controls 입력 동작

### TypeScript 컴파일 검증

```bash
npx tsc --noEmit
```

- [ ] 타입 에러 없음
- [ ] Import 경로 정상 (`'./index'`)
- [ ] Props 타입 정합성

### 접근성 검증

Storybook a11y addon 사용:
- [ ] Label-textarea 연결 (for/id)
- [ ] Required fields - aria-required
- [ ] Invalid fields - aria-invalid + aria-describedby
- [ ] Keyboard navigation (Tab, Shift+Tab)
- [ ] Screen reader 호환 (label announcement)

## 사용 예시

### Story 작성 예시

```typescript
// ✅ Good: 명확한 제목과 설명
export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself..."
        hint="Maximum 500 characters"
        rows={4}
      />
    </div>
  ),
};

// ❌ Bad: 제목 없음, 레이아웃 일관성 없음
export const HelperText: Story = {
  render: () => (
    <div>
      <TextArea label="Bio" hint="Max 500 chars" />
    </div>
  ),
};
```

### ArgTypes 작성 예시

```typescript
// ✅ Good: 명확한 설명
argTypes: {
  label: {
    control: 'text',
    description: 'Label text for the textarea',
  },
  rows: {
    control: 'number',
    description: 'Visible height of textarea in rows',
  },
}

// ❌ Bad: 설명 부족
argTypes: {
  label: { control: 'text' },
  rows: { control: 'number' },
}
```

### 복합 레이아웃 예시

```typescript
// ✅ Good: 섹션별 명확한 구분
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Bug Report</h3>
        <div className="flex flex-col gap-4 p-4 border rounded-lg">
          <TextArea label="Steps to Reproduce" rows={4} isRequired />
          <TextArea label="Expected Behavior" rows={3} isRequired />
        </div>
      </div>
    </div>
  ),
};

// ❌ Bad: 구분 없이 나열
export const UseCases: Story = {
  render: () => (
    <div>
      <TextArea label="Steps" />
      <TextArea label="Expected" />
    </div>
  ),
};
```

## 참고 자료

- **React Aria Components**: https://react-spectrum.adobe.com/react-aria/TextField.html
- **Storybook Next.js**: https://storybook.js.org/docs/get-started/frameworks/nextjs
- **Untitled UI Textarea**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/textarea/index.tsx`
- **Avatar Stories 참고**: `/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/avatar/index.stories.tsx`

## 버전 이력

- **v1.0.0** (2025-11-20): 초기 작성 - TextArea Storybook Stories 가이드 생성
