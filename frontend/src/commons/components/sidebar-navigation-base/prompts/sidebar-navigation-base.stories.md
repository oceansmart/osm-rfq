# Sidebar Navigation Base Component Storybook Stories Implementation Guide

## Project Conditions

- **Project**: OSM RFQ Frontend
- **Component Library**: Untitled UI PRO
- **Framework**: Next.js 14.2.33 (App Router), TypeScript
- **Storybook Version**: 9.1.13 with @storybook/nextjs adapter
- **Base Library**: React Aria Components
- **Styling**: Tailwind CSS v4 with CSS Variables
- **Component Location**: `/src/commons/components/sidebar-navigation-base/`
- **Stories Location**: `/src/commons/components/sidebar-navigation-base/index.stories.tsx`

## Component Overview

### Sidebar Navigation Base

Sidebar Navigation Base는 애플리케이션의 사이드바 네비게이션을 구성하는 컴포넌트 모음입니다.

**Exported Components:**
```typescript
export { NavList } from "./base-components/nav-list";
export { NavItemBase } from "./base-components/nav-item";
export { NavItemButton } from "./base-components/nav-item-button";
export { NavAccountCard, NavAccountMenu } from "./base-components/nav-account-card";
export { FeaturedCardProgressBar, FeaturedCardProgressCircle } from "./base-components/featured-cards";
export { MobileNavigationHeader } from "./base-components/mobile-header";
export type { NavItemType, NavItemDividerType } from "./config";
```

**Component Structure:**
```
sidebar-navigation-base/
├── index.tsx                    # Re-exports
├── config.ts                    # Types (NavItemType, NavItemDividerType)
└── base-components/
    ├── nav-list.tsx             # NavList - 네비게이션 목록
    ├── nav-item.tsx             # NavItemBase - 네비게이션 아이템 베이스
    ├── nav-item-button.tsx      # NavItemButton - 아이콘 버튼
    ├── nav-account-card.tsx     # NavAccountCard, NavAccountMenu - 계정 카드
    ├── featured-cards.tsx       # FeaturedCard (ProgressBar, ProgressCircle)
    └── mobile-header.tsx        # MobileNavigationHeader - 모바일 헤더
```

### Key Components

#### 1. NavList
네비게이션 목록 컴포넌트. 단순 링크, 접을 수 있는 항목, 구분선을 지원합니다.

**Props:**
```typescript
interface NavListProps {
  activeUrl?: string;                        // 현재 활성 항목 URL
  className?: string;                        // 추가 CSS 클래스
  items: (NavItemType | NavItemDividerType)[]; // 네비게이션 항목 배열
}
```

**NavItemType:**
```typescript
type NavItemType = {
  label: string;                             // 항목 레이블
  href?: string;                             // 링크 URL
  icon?: FC<{ className?: string }>;         // 아이콘 컴포넌트
  badge?: ReactNode;                         // 배지 (문자열 또는 컴포넌트)
  items?: { label, href, icon?, badge? }[];  // 하위 항목 (collapsible)
  divider?: boolean;                         // 구분선 여부
};
```

#### 2. NavItemBase
개별 네비게이션 아이템 베이스 컴포넌트. 3가지 타입을 지원합니다.

**Types:**
- `link`: 단순 링크
- `collapsible`: 접을 수 있는 항목 (summary)
- `collapsible-child`: 하위 항목 (pl-10 들여쓰기)

**Features:**
- 외부 링크 감지 (Share04 아이콘)
- Badge 자동 스타일링
- 현재 페이지 하이라이트 (bg-active)

#### 3. NavItemButton
아이콘만 표시하는 콤팩트한 네비게이션 버튼. Slim 사이드바에 사용됩니다.

**Props:**
```typescript
interface NavItemButtonProps {
  label: string;                     // 툴팁 레이블
  href?: string;                     // 링크 URL
  icon: FC<{ className?: string }>; // 아이콘 컴포넌트 (필수)
  current?: boolean;                 // 현재 활성 상태
  size?: "md" | "lg";               // 크기 (md: 40px, lg: 48px)
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
  onClick?: MouseEventHandler;
  className?: string;
}
```

#### 4. NavAccountCard
사용자 계정 정보를 표시하고 계정 전환, 프로필 설정 메뉴를 제공하는 카드입니다.

**Components:**
- `NavAccountCard`: 계정 카드 (AvatarLabelGroup + 드롭다운 트리거)
- `NavAccountMenu`: 계정 메뉴 팝오버 (프로필, 설정, 계정 전환, 로그아웃)

**Features:**
- 계정 전환 (RadioButtonBase 선택)
- 바로가기 키보드 단축키 표시
- 키보드 내비게이션 (ArrowUp/Down)

#### 5. FeaturedCards
사이드바 하단에 표시되는 특징 카드. 프로그레스 표시와 액션 버튼을 포함합니다.

**Components:**
- `FeaturedCardProgressBar`: 프로그레스 바 버전
- `FeaturedCardProgressCircle`: 프로그레스 서클 버전

**Props:**
```typescript
interface FeaturedCardCommonProps {
  title: string;          // 카드 제목
  description: ReactNode; // 설명 (ReactNode 지원)
  confirmLabel: string;   // 확인 버튼 레이블
  progress: number;       // 진행률 (0-100)
  onDismiss: () => void;  // 닫기 핸들러
  onConfirm: () => void;  // 확인 핸들러
  className?: string;
}
```

#### 6. MobileNavigationHeader
모바일 기기용 네비게이션 헤더. 햄버거 메뉴를 클릭하면 전체 화면 오버레이로 네비게이션을 표시합니다.

**Features:**
- DialogTrigger + Modal + ModalOverlay (React Aria)
- 햄버거 메뉴 아이콘 → 닫기 아이콘 전환
- 백드롭 클릭으로 닫기
- lg 브레이크포인트에서 숨김

### Dependencies

```typescript
import { Badge } from "@/commons/components/badge";
import { Button } from "@/commons/components/button";
import { Checkbox } from "@/commons/components/checkbox"; // RadioButtonBase
import { Tooltip } from "@/commons/components/tooltip";
import { Avatar } from "@/commons/components/avatar"; // AvatarLabelGroup
import { ProgressBarCircle } from "@/commons/components/progress-circles";
import { ProgressBar } from "@/commons/components/progress-indicators";
```

**Temporary Components (임시 구현):**
- `CloseButton` (featured-cards.tsx) - TODO: 공식 close-button 컴포넌트 설치 필요
- `UntitledLogo` (mobile-header.tsx) - TODO: 공식 logo 컴포넌트 생성 필요

## Implementation Scope

### Stories Created (Total: 13 Stories)

1. **Overview** - 전체 기능 개요
   - Simple Navigation
   - Collapsible Navigation
   - With Dividers

2. **SimpleNavigation** - 기본 네비게이션
   - 아이콘 + 레이블
   - 배지 표시
   - 활성 항목 하이라이트

3. **CollapsibleNavigation** - 접을 수 있는 네비게이션 (Dual-tier)
   - `<details>` 요소 사용
   - 하위 항목 들여쓰기
   - 배지 지원

4. **WithDividers** - 구분선 포함
   - `{ divider: true }` 항목
   - 섹션 구분

5. **IconButtonNavigation** - 아이콘 버튼 네비게이션 (Slim)
   - 아이콘만 표시
   - 툴팁 제공
   - 중간 크기 (md)

6. **LargeIconButtons** - 큰 아이콘 버튼
   - 큰 크기 (lg)
   - Slim 사이드바용

7. **AccountCard** - 계정 카드
   - AvatarLabelGroup
   - 드롭다운 메뉴
   - 계정 전환

8. **FeaturedCardWithProgressBar** - 프로그레스 바 카드
   - 프로필 완성도 예제
   - Dismiss/Confirm 버튼

9. **FeaturedCardWithProgressCircle** - 프로그레스 서클 카드
   - 스토리지 사용량 예제
   - 원형 프로그레스

10. **MobileNavigation** - 모바일 네비게이션
    - 햄버거 메뉴
    - 전체 화면 오버레이
    - 네비게이션 + 계정 카드

11. **CompleteSidebar** - 완전한 사이드바 예제
    - 헤더 (로고)
    - 네비게이션 목록
    - Featured Card
    - Account Card
    - Help & Support 링크

12. **UseCases** - 실제 사용 시나리오
    - Desktop Sidebar (Expanded)
    - Desktop Sidebar (Collapsed/Slim)
    - 나란히 비교

13. **Playground** - 플레이그라운드
    - 인터랙티브 테스트

### Sample Data

```typescript
const sampleNavItems: NavItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home03,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart01,
    badge: '10',
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FileCheck02,
  },
  {
    label: 'Team',
    href: '/team',
    icon: Users01,
  },
];

const sampleNavItemsWithCollapsible: NavItemType[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart01,
    badge: '10',
    items: [
      { label: 'Overview', href: '/dashboard/overview' },
      { label: 'Analytics', href: '/dashboard/analytics', badge: '5' },
      { label: 'Reports', href: '/dashboard/reports' },
    ],
  },
  // ...
];

const sampleNavItemsWithDividers: (NavItemType | { divider: true })[] = [
  { label: 'Home', href: '/', icon: Home03 },
  { label: 'Dashboard', href: '/dashboard', icon: BarChart01 },
  { divider: true },
  { label: 'Projects', href: '/projects', icon: FileCheck02 },
  // ...
];
```

## Technical Requirements

### 1. Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Home03, BarChart01, FileCheck02, Users01, Settings01 } from '@untitledui/icons';
import {
  NavList,
  NavItemButton,
  NavAccountCard,
  FeaturedCardProgressBar,
  FeaturedCardProgressCircle,
  MobileNavigationHeader,
} from './index';
import type { NavItemType } from './config';

const meta: Meta = {
  title: 'Commons/Components/SidebarNavigationBase',
  parameters: {
    layout: 'padded', // 사이드바는 padded layout 사용
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;
```

### 2. Component Usage Patterns

**Simple Navigation:**
```typescript
<NavList activeUrl="/" items={sampleNavItems} />
```

**Collapsible Navigation:**
```typescript
const items: NavItemType[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    items: [
      { label: 'Overview', href: '/dashboard/overview' },
      { label: 'Analytics', href: '/dashboard/analytics' },
    ],
  },
];
<NavList activeUrl="/dashboard/analytics" items={items} />
```

**With Dividers:**
```typescript
const items = [
  { label: 'Home', href: '/' },
  { divider: true },
  { label: 'Settings', href: '/settings' },
];
<NavList items={items} />
```

**Icon Button:**
```typescript
<NavItemButton
  label="Dashboard"
  href="/dashboard"
  icon={BarChart01}
  current={true}
  size="md"
/>
```

**Account Card:**
```typescript
<NavAccountCard
  selectedAccountId="olivia"
  popoverPlacement="right bottom"
/>
```

**Featured Card:**
```typescript
<FeaturedCardProgressBar
  title="Complete your profile"
  description={<><span className="font-semibold">70%</span> completed</>}
  confirmLabel="Complete profile"
  progress={70}
  onDismiss={() => {}}
  onConfirm={() => {}}
/>
```

**Mobile Header:**
```typescript
<MobileNavigationHeader>
  <div className="h-full overflow-y-auto bg-primary">
    <NavList items={items} />
  </div>
</MobileNavigationHeader>
```

### 3. Story Naming Convention

- **Overview**: 전체 기능 개요
- **[ComponentName]**: 개별 컴포넌트 (SimpleNavigation, CollapsibleNavigation)
- **With[Feature]**: 특정 기능 강조 (WithDividers)
- **[Variant]**: 변형 (IconButtonNavigation, LargeIconButtons)
- **UseCases**: 실제 사용 시나리오
- **CompleteSidebar**: 완전한 예제
- **Playground**: 인터랙티브 테스트

### 4. Documentation Requirements

- 각 Story에 JSDoc 주석으로 설명 추가
- Overview에 주요 기능 설명
- UseCases에 실제 사용 시나리오 표시 (Expanded/Collapsed 비교)
- CompleteSidebar에 전체 구성 요소 통합

### 5. Accessibility Considerations

- NavItemBase에 `aria-current="page"` 자동 적용 (current prop)
- NavItemButton에 `aria-label` 제공
- MobileNavigationHeader에 "Expand/Close navigation menu" 레이블
- NavAccountMenu에 키보드 내비게이션 (ArrowUp/Down)
- Tooltip 제공 (NavItemButton)

## Known Issues & TODOs

1. **CloseButton 컴포넌트 누락**
   - 현재: featured-cards.tsx에 임시 구현
   - TODO: 공식 close-button 컴포넌트 설치

2. **UntitledLogo 컴포넌트 누락**
   - 현재: mobile-header.tsx에 임시 구현
   - TODO: 공식 logo 컴포넌트 생성 또는 프로젝트 로고로 대체

3. **useBreakpoint Hook**
   - nav-account-card.tsx에서 사용
   - 프로젝트에 `@/hooks/use-breakpoint` 존재 확인 필요

## Validation Checklist

- [x] 13개 Story 모두 생성됨
- [x] Overview에 주요 기능 설명 포함
- [x] Simple/Collapsible/Divider 모든 네비게이션 타입 커버
- [x] Icon Button (md, lg) 크기 모두 커버
- [x] AccountCard Story 포함
- [x] FeaturedCard (ProgressBar, ProgressCircle) 모두 커버
- [x] MobileNavigation Story 포함
- [x] CompleteSidebar 통합 예제 제공
- [x] UseCases에 Expanded/Collapsed 비교 제공
- [x] Playground Story로 인터랙티브 테스트 가능
- [x] 모든 컴포넌트에 적절한 aria-label 제공
- [x] 샘플 데이터 (sampleNavItems, sampleNavItemsWithCollapsible, etc.) 제공
- [x] JSDoc 주석으로 각 Story 설명 추가
- [x] TypeScript 타입 안전성 확보
- [x] Storybook 9.1.13 호환성 확인

## Additional Notes

### Directory Structure Pattern

이 컴포넌트는 **Button/Badge 패턴과 다른 구조**를 사용합니다:
- Button/Badge: 단일 `index.tsx`로 통합
- SidebarNavigationBase: `base-components/` 디렉토리 + `index.tsx` re-exports

**이유:**
- 각 컴포넌트가 독립적으로 사용 가능
- 파일 크기가 크고 복잡함 (각 200+ 라인)
- 논리적 그룹화 유지 (nav-item 관련, featured-card 관련 등)

### NavItemType Design

NavItemType은 재귀적 구조를 지원합니다:
```typescript
type NavItemType = {
  label: string;
  href?: string;
  icon?: FC;
  badge?: ReactNode;
  items?: { label, href, icon?, badge? }[]; // 1-depth만 지원
  divider?: boolean;
};
```

**제한 사항:**
- 하위 항목 (`items`)은 1-depth만 지원 (2-depth 이상 불가)
- Collapsible child는 icon 없음 (공간 절약)

### Styling Notes

- NavItemBase: `bg-active` (선택), `bg-primary_hover` (hover)
- NavItemButton: `size-10` (md), `size-12` (lg)
- NavAccountCard: `w-66` (264px) 팝오버 너비
- FeaturedCard: `rounded-xl bg-secondary p-4`
- MobileNavigationHeader: `lg:hidden` (데스크탑에서 숨김)

## Implementation Complete

This guide was generated as part of the Untitled UI Component Installer workflow (v5.2.0).

**Installation Date**: 2025-11-21
**Component**: sidebar-navigation-base
**Stories Count**: 13
**Workflow Version**: 5.2.0
