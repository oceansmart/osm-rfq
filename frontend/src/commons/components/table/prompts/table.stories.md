# Table Component Storybook Stories Implementation Guide

## Project Conditions

- **Project**: OSM RFQ Frontend
- **Component Library**: Untitled UI PRO
- **Framework**: Next.js 14.2.33 (App Router), TypeScript
- **Storybook Version**: 9.1.13 with @storybook/nextjs adapter
- **Base Library**: React Aria Components
- **Styling**: Tailwind CSS v4 with CSS Variables
- **Component Location**: `/src/commons/components/table/`
- **Stories Location**: `/src/commons/components/table/index.stories.tsx`

## Component Overview

### Table Component

Table 컴포넌트는 React Aria Components의 Table을 기반으로 구축된 접근성 높은 데이터 테이블 컴포넌트입니다.

**Exported Components:**
```typescript
export { Table, TableCard };
```

**Table Sub-components:**
- `Table.Header` - 테이블 헤더 영역
- `Table.Head` - 개별 열 헤더 (정렬, 툴팁 지원)
- `Table.Body` - 테이블 본문 (React Aria TableBody)
- `Table.Row` - 테이블 행 (선택, 하이라이트 지원)
- `Table.Cell` - 테이블 셀

**TableCard Components:**
- `TableCard.Root` - 카드 컨테이너 래퍼
- `TableCard.Header` - 카드 헤더 (제목, 배지, 설명, contentTrailing)

**Helper Components:**
- `TableRowActionsDropdown` - 행 액션 드롭다운 (Edit, Copy link, Delete)

**Key Features:**
1. **Selection Modes**
   - `none` - 선택 불가
   - `single` - 단일 행 선택
   - `multiple` - 다중 행 선택 (헤더 체크박스 포함)

2. **Sorting**
   - `Table.Head`의 `allowsSorting` prop으로 활성화
   - 정렬 방향 표시 아이콘 (ArrowDown, ChevronSelectorVertical)

3. **Sizes**
   - `sm` - 작은 크기 (h-14 row, h-9 header)
   - `md` - 중간 크기 (h-18 row, h-11 header, default)

4. **Accessibility**
   - React Aria Components 기반
   - 키보드 내비게이션 지원
   - Focus visible 스타일
   - ARIA labels 지원

5. **Styling**
   - Hover 효과 (bg-secondary)
   - Selected row 하이라이트 (highlightSelectedRow prop)
   - 행 경계선 (after pseudo-element)
   - TableContext로 size 관리

**Dependencies:**
```typescript
import { Badge } from "@/commons/components/badge";
import { Checkbox } from "@/commons/components/checkbox";
import { Dropdown } from "@/commons/components/dropdown";
import { Tooltip, TooltipTrigger } from "@/commons/components/tooltip";
```

## Implementation Scope

### Stories Created (Total: 12 Stories)

1. **Overview** - 전체 기능 개요
   - Basic Table
   - Table with Selection
   - 주요 기능 설명

2. **BasicTable** - 기본 테이블
   - 5개 샘플 데이터
   - 4개 열 (이름, 이메일, 역할, 상태)

3. **WithSingleSelection** - 단일 선택
   - selectionMode="single"
   - 5개 샘플 데이터

4. **WithMultipleSelection** - 다중 선택
   - selectionMode="multiple"
   - 헤더 체크박스 포함
   - 5개 샘플 데이터

5. **WithSorting** - 정렬 기능
   - 이름, 이메일 열에 allowsSorting
   - 정렬 아이콘 표시

6. **WithTooltip** - 툴팁 표시
   - Table.Head의 tooltip prop
   - 3개 열에 툴팁 설명

7. **WithActionsDropdown** - 액션 드롭다운
   - TableRowActionsDropdown 사용
   - Edit, Copy link, Delete 액션

8. **TableCardContainer** - 카드 컨테이너
   - TableCard.Root + TableCard.Header
   - 제목, 배지, 설명 포함

9. **SmallSize** - 작은 크기
   - size="sm"
   - 3개 샘플 데이터

10. **SizeComparison** - 크기 비교
    - sm vs md 나란히 표시
    - 2개 샘플 데이터씩

11. **UseCases** - 실제 사용 예시
    - User Management Dashboard
    - 선택, 정렬, 액션 드롭다운 모두 포함

12. **Playground** - 인터랙티브 테스트
    - args: size, selectionMode
    - 정렬 가능 열 포함

### Sample Data Structure

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleUsers: User[] = [
  { id: 1, name: '김철수', email: 'chulsoo@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: '이영희', email: 'younghee@example.com', role: 'User', status: 'active' },
  { id: 3, name: '박민수', email: 'minsoo@example.com', role: 'Manager', status: 'inactive' },
  { id: 4, name: '정수진', email: 'soojin@example.com', role: 'User', status: 'active' },
  { id: 5, name: '최동욱', email: 'dongwook@example.com', role: 'Admin', status: 'active' },
];
```

## Technical Requirements

### 1. Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Table, TableCard, TableRowActionsDropdown } from './index';

const meta: Meta<typeof Table> = {
  title: 'Commons/Components/Table',
  component: Table,
  parameters: {
    layout: 'padded', // Table은 padded layout 사용
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the table',
      defaultValue: 'md',
    },
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple'],
      description: 'Selection mode for table rows',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;
```

### 2. Component Usage Pattern

**Basic Table:**
```typescript
<Table aria-label="User table" size="md">
  <Table.Header>
    <Table.Head label="이름" />
    <Table.Head label="이메일" />
  </Table.Header>
  <Table.Body>
    {data.map((item) => (
      <Table.Row key={item.id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.email}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

**With Selection:**
```typescript
<Table aria-label="Table with selection" selectionMode="multiple">
  {/* ... */}
</Table>
```

**With Sorting:**
```typescript
<Table.Header>
  <Table.Head label="이름" allowsSorting />
  <Table.Head label="이메일" allowsSorting />
</Table.Header>
```

**With Tooltip:**
```typescript
<Table.Head label="이름" tooltip="사용자의 전체 이름" />
```

**Card Container:**
```typescript
<TableCard.Root size="md">
  <TableCard.Header
    title="사용자 목록"
    badge="5"
    description="시스템에 등록된 사용자 목록입니다."
  />
  <Table aria-label="User table" size="md">
    {/* ... */}
  </Table>
</TableCard.Root>
```

**Actions Dropdown:**
```typescript
<Table.Cell>
  <TableRowActionsDropdown />
</Table.Cell>
```

### 3. Story Naming Convention

- **Overview**: 전체 기능 개요
- **BasicTable**: 기본 형태
- **With[Feature]**: 특정 기능 강조 (WithSingleSelection, WithSorting, etc.)
- **[Size]Size**: 크기 변형 (SmallSize)
- **SizeComparison**: 크기 비교
- **UseCases**: 실제 사용 예시
- **Playground**: 인터랙티브 테스트

### 4. Documentation Requirements

- 각 Story에 JSDoc 주석으로 설명 추가
- Overview에 주요 기능 설명
- UseCases에 실제 사용 시나리오 표시
- SizeComparison에 크기 차이 명확히 표시

### 5. Accessibility Considerations

- 모든 Table에 `aria-label` 제공
- Table.Head에 `label` prop 필수
- 선택 기능 사용 시 Checkbox의 접근성 자동 처리
- 키보드 내비게이션 지원 (React Aria)

## Validation Checklist

- [x] 12개 Story 모두 생성됨
- [x] Overview에 주요 기능 설명 포함
- [x] 모든 Selection 모드 (none, single, multiple) 커버
- [x] 정렬 기능 Story 포함
- [x] 툴팁 기능 Story 포함
- [x] 액션 드롭다운 Story 포함
- [x] TableCard 컨테이너 Story 포함
- [x] 두 가지 크기 (sm, md) 모두 커버
- [x] SizeComparison Story로 크기 비교 제공
- [x] UseCases에 실제 사용 예시 제공
- [x] Playground Story로 인터랙티브 테스트 가능
- [x] 모든 Story에 적절한 aria-label 제공
- [x] 한글 샘플 데이터 사용 (OSM RFQ 프로젝트 context)
- [x] JSDoc 주석으로 각 Story 설명 추가
- [x] TypeScript 타입 안전성 확보
- [x] Storybook 9.1.13 호환성 확인

## Additional Notes

### TableContext Pattern

Table 컴포넌트는 내부적으로 `TableContext`를 사용하여 size를 관리합니다:

```typescript
const TableContext = createContext<{ size: "sm" | "md" }>({ size: "md" });
```

TableCard.Root와 Table 모두 TableContext.Provider로 감싸져 있어, size prop이 자동으로 하위 컴포넌트에 전달됩니다.

### Selection Behavior

- `selectionBehavior="toggle"` (기본값)
- `selectionMode="none"` - 체크박스 없음
- `selectionMode="single"` - 라디오 버튼 형태
- `selectionMode="multiple"` - 체크박스 형태 (헤더 체크박스 포함)

### Styling Notes

- Row border는 `after` pseudo-element로 구현 (공간 차지 방지)
- Selected row는 `selected:bg-secondary` 클래스로 하이라이트
- Hover 효과는 `hover:bg-secondary`
- Focus visible 시 outline-focus-ring (2px)

### Dependencies Check

모든 의존성 컴포넌트가 OSM RFQ 프로젝트에 설치되어 있어야 합니다:
- Badge ✅
- Checkbox ✅
- Dropdown ✅
- Tooltip ✅
- Icon components (@untitledui/icons) ✅

## Implementation Complete

This guide was generated as part of the Untitled UI Component Installer workflow (v5.2.0).

**Installation Date**: 2025-01-21
**Component**: Table
**Stories Count**: 12
**Workflow Version**: 5.2.0
