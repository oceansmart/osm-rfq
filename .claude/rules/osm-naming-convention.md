# OSM RFQ Project Naming Convention

> Ocean Smart (OSM) 회사 네이밍 표준 규칙
>
> **Version**: 1.0.0
> **Last Updated**: 2025-11-19
> **Status**: ✅ Active

---

## 🏢 OSM Prefix Rule (필수)

**모든 프로젝트 레벨 명명에는 `osm-` 접두사를 사용합니다.**

### 프로젝트명
```
✅ osm-rfq               (Ocean Smart - RFQ Management System)
✅ osm-logistics         (Ocean Smart - Logistics Platform)
✅ osm-analytics         (Ocean Smart - Analytics Dashboard)

❌ rfq-system            (OSM prefix 없음)
❌ smart-rfq             (회사명 불명확)
```

### Repository 명
```
✅ oceansmart/osm-rfq
✅ oceansmart/osm-design-system
✅ oceansmart/osm-component-library

❌ oceansmart/rfq-mgmt   (OSM prefix 없음)
```

### NPM Package 명 (향후)
```json
{
  "name": "@oceansmart/osm-rfq-ui",
  "name": "@oceansmart/osm-shared-utils",
  "name": "@oceansmart/osm-design-tokens"
}
```

---

## 📁 디렉토리 구조 네이밍

### Root Level
```
osm-rfq/
├── frontend/           # 프론트엔드 애플리케이션
├── backend/            # 백엔드 애플리케이션
├── docs/               # 통합 문서
├── .claude/            # Claude Code 설정
├── .specify/           # Spec Kit 설정
└── reference/          # 레퍼런스 프로젝트
```

### Source Structure
```
src/
├── app/                # Next.js App Router 페이지
├── commons/            # 공통 리소스 (통합됨)
│   ├── components/     # 재사용 가능한 공통 컴포넌트
│   ├── constants/      # 상수 정의
│   ├── hooks/          # 커스텀 훅
│   ├── providers/      # Context Providers
│   └── utils/          # 유틸리티 함수
└── styles/             # 글로벌 스타일
```

**규칙:**

- 단수형보다 **복수형** 선호 (`component` ❌ → `components` ✅)
- kebab-case 사용 (`userProfile` ❌ → `user-profile` ✅)
- 영문 소문자만 사용
- **모든 공통 코드는 `src/commons/` 하위에 배치**
  - ✅ `src/commons/hooks/use-breakpoint.ts`
  - ✅ `src/commons/utils/cx.ts`
  - ❌ `src/hooks/` (삭제됨)
  - ❌ `src/utils/` (삭제됨)

---

## 📄 파일 네이밍

### 1. React 컴포넌트 파일

#### Commons Components (재사용 컴포넌트)
```
commons/components/
├── button/
│   ├── index.tsx              # 컴포넌트 구현
│   ├── index.stories.tsx      # Storybook 스토리
│   └── prompts/               # AI 가이드 (선택)
│       └── button.stories.md
├── pagination/
│   ├── index.tsx
│   ├── index.stories.tsx
│   └── prompts/
│       └── pagination.stories.md
└── input/
    └── index.tsx
```

**규칙:**

- 디렉토리명: **kebab-case** (`user-card`, `rfq-list`, `button-group`)
- 파일명: **index.tsx** (디렉토리 기반 구조)
- Stories: `index.stories.tsx`
- Prompts: `prompts/[component-name].stories.md` (AI 가이드)

#### Feature Components (향후 사용)

```plaintext
src/app/rfq/
├── page.tsx                    # RFQ 목록 페이지
├── [id]/
│   └── page.tsx                # RFQ 상세 페이지
└── components/                 # 페이지별 컴포넌트
    ├── rfq-filter.tsx
    └── rfq-table.tsx
```

**규칙:**

- Feature 컴포넌트는 App Router 디렉토리 내부에 배치
- 재사용 가능하면 `commons/components/`로 이동

### 2. Hook 파일 네이밍

#### 현재 프로젝트 표준

```plaintext
// ✅ 올바른 Hook 네이밍 (현재 사용 중)
commons/hooks/
└── use-breakpoint.ts             // Tailwind breakpoint 감지

// ✅ 향후 Hook 추가 시 패턴
commons/hooks/
├── use-breakpoint.ts
├── use-pagination.ts             // 페이지네이션
├── use-filter.ts                 // 필터링
└── use-auth.ts                   // 인증
```

#### Feature별 Hook (참고용 - 현재 미사용)

```plaintext
// 📝 Reference 프로젝트 패턴 (향후 필요시 참고)
src/app/rfq/hooks/
├── index.binding.hook.ts         // 데이터 바인딩
├── index.pagination.hook.ts      // 페이지네이션
└── index.filter.hook.ts          // 필터링
```

**규칙:**

- **공통 Hook**: `commons/hooks/use-[purpose].ts`
- **Feature Hook** (향후): `src/app/[feature]/hooks/index.[purpose].hook.ts`
- 파일명에 `use-` prefix 필수 (공통 Hook)
- 함수명에도 `use` prefix 필수 (예: `useBreakpoint`)

```typescript
// ❌ 잘못된 Hook 네이밍
useRfqList.ts                     // camelCase 파일명 금지
rfqListHook.ts                    // 'use-' prefix 없음
hooks.ts                          // 너무 일반적
```

**Hook 함수 네이밍 규칙:**
```typescript
// ✅ 올바른 Hook 함수명
export function useRfqListBinding() { ... }
export function useRfqPagination() { ... }
export function useLayoutArea() { ... }

// ❌ 잘못된 Hook 함수명
export function rfqListBinding() { ... }  // 'use' prefix 없음
export function UseRfqList() { ... }      // PascalCase 잘못됨
```

### 3. Test 파일 네이밍

```typescript
// ✅ Unit Test (Vitest)
tests/
├── index.binding.hook.spec.ts    // Hook 단위 테스트
├── index.filter.hook.spec.ts
└── index.component.spec.tsx      // 컴포넌트 단위 테스트

// ✅ E2E Test (Playwright)
e2e/
├── rfq-list.spec.ts              // RFQ 목록 E2E
├── rfq-detail.spec.ts            // RFQ 상세 E2E
└── bidding-draft.spec.ts         // 견적 작성 E2E
```

**규칙:**
- Unit Test: `*.spec.ts` (src 디렉토리 내부 tests/ 폴더)
- E2E Test: `*.spec.ts` (root의 e2e/ 폴더)
- Playwright config: `playwright.config.ts`

### 4. Storybook 파일 네이밍

```typescript
// ✅ Storybook Stories
commons/components/button/index.stories.tsx
commons/components/input/index.stories.tsx
components/rfq-list/index.stories.tsx

// ✅ Storybook Configuration
.storybook/
├── main.ts
├── preview.ts
└── manager.ts
```

### 5. Utils 파일 네이밍

**현재 프로젝트 표준:**

```plaintext
// ✅ 올바른 Utils 네이밍 (현재 사용 중)
commons/utils/
├── cx.ts                      # Tailwind class merging (clsx + tw-merge)
├── is-react-component.ts      # React component 타입 체크
└── index.ts                   # 재export

// ✅ 향후 Utils 추가 시 패턴
commons/utils/
├── cx.ts
├── is-react-component.ts
├── format-date.ts             # 날짜 포맷팅
├── parse-currency.ts          # 통화 파싱
└── validate-email.ts          # 이메일 검증
```

**규칙:**

- 파일명: **kebab-case** (`format-date.ts`, `parse-currency.ts`)
- 함수명: **camelCase** (`formatDate`, `parseCurrency`)
- 단일 목적 함수는 파일명과 동일한 함수명 사용
- 여러 관련 함수는 하나의 파일에 그룹화

```typescript
// ✅ 올바른 Utils 파일 구조
// commons/utils/cx.ts
export function cx(...inputs: ClassValue[]) { ... }
export function sortCx<T>(...) { ... }

// ❌ 잘못된 Utils 네이밍
CX.ts                     // 대문자 파일명 금지
cx-utils.ts               // 불필요한 접미사
utils.ts                  // 너무 일반적
```

### 6. Constants 파일 네이밍

**현재 프로젝트 표준:**

```plaintext
// ✅ 올바른 Constants 네이밍 (현재 사용 중)
commons/constants/
├── color.ts              // Design Token - Color
├── typography.ts         // Design Token - Typography
├── spacing.ts            // Design Token - Spacing
├── radius.ts             // Design Token - Radius
├── widths.ts             // Design Token - Widths
├── containers.ts         // Design Token - Containers (타입 정의)
└── prompts/              # AI 가이드
    ├── color.md
    ├── typography.md
    └── spacing.md
```

**규칙:**

- 파일명: **kebab-case** (단수형: `color.ts`, `spacing.ts`)
- Design Token은 Figma 네이밍 유지 (camelCase 객체)
- Enum 상수는 별도 파일로 분리

```typescript
// ❌ 잘못된 Constants 네이밍
COLOR_CONSTANTS.ts        // 대문자 사용 금지
colorConstants.ts         // camelCase 금지
color-constants.ts        // 불필요한 접미사
```

### 7. Provider 파일 네이밍

**현재 프로젝트 표준:**

```plaintext
// ✅ 올바른 Provider 네이밍 (현재 사용 중)
commons/providers/
├── modal/
│   └── index.tsx               # Modal Provider
├── react-query/
│   └── index.tsx               # React Query Provider
└── next-themes/
    └── index.tsx               # Theme Provider

// 📝 Reference 프로젝트 패턴 (향후 필요시 참고)
commons/providers/auth/
├── auth.provider.tsx           # Provider 구현
├── auth.guard.tsx              # Guard 구현
└── auth.guard.hook.tsx         # Guard Hook
```

**규칙:**

- 현재: 각 Provider는 디렉토리별로 `index.tsx`
- 향후 복잡한 Provider: `[name].provider.tsx`, `[name].guard.tsx` 패턴 사용 가능

### 8. API/Service 파일 네이밍

```typescript
// ✅ API 관련 파일 네이밍
lib/
├── api/
│   ├── rfq.api.ts           // RFQ API 클라이언트
│   ├── bidding.api.ts       // Bidding API 클라이언트
│   └── auth.api.ts          // Auth API 클라이언트
└── services/
    ├── rfq.service.ts       // RFQ 비즈니스 로직
    └── email.service.ts     // Email 서비스

// ❌ 잘못된 네이밍
rfqAPI.ts                    // camelCase 금지
RfqService.ts                // PascalCase 금지
```

---

## 🔤 코드 네이밍 규칙

### 1. 변수/함수명 (camelCase)

```typescript
// ✅ 올바른 네이밍
const rfqList = [];
const userName = 'John';
function getRfqById(id: string) {}
function calculateTotalPrice() {}

// ❌ 잘못된 네이밍
const RfqList = [];           // PascalCase 금지
const rfq_list = [];          // snake_case 금지
const RFQLIST = [];           // UPPER_CASE 금지 (상수 제외)
```

### 2. 상수명 (UPPER_SNAKE_CASE)

```typescript
// ✅ 설정/환경 상수 (UPPER_SNAKE_CASE)
export const API_BASE_URL = 'https://api.oceansmart.com';
export const MAX_RETRY_COUNT = 3;
export const DEFAULT_PAGE_SIZE = 20;

// ✅ Design Token 상수 (camelCase object)
export const colors = {
  blue60: '#3A5CF3',
  grayWhite: '#FFFFFF',
} as const;

export const spacing = {
  xl: 16,
  lg: 12,
} as const;
```

**규칙:**
- 환경 변수, API 엔드포인트: `UPPER_SNAKE_CASE`
- Design Token 객체: `camelCase` (Figma 네이밍 유지)
- Enum: `PascalCase`

### 3. 타입/인터페이스명 (PascalCase)

```typescript
// ✅ 올바른 타입 네이밍
export interface RfqItem {
  id: string;
  title: string;
}

export type RfqStatus = 'draft' | 'submitted' | 'approved';

export interface UseRfqListReturn {
  rfqList: RfqItem[];
  isLoading: boolean;
}

// ❌ 잘못된 타입 네이밍
interface rfqItem {}          // camelCase 금지
type rfq_status = '';         // snake_case 금지
interface IRfqItem {}         // Hungarian notation 지양
```

### 4. Enum 네이밍 (PascalCase)

```typescript
// ✅ 올바른 Enum 네이밍
export enum RfqStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum BiddingType {
  OCEAN_FREIGHT = 'OCEAN_FREIGHT',
  AIR_FREIGHT = 'AIR_FREIGHT',
  INLAND = 'INLAND',
}

// ❌ 잘못된 Enum 네이밍
enum rfqStatus {}             // camelCase 금지
enum RFQ_STATUS {}            // UPPER_CASE 금지
```

### 5. React Component 네이밍 (PascalCase)

```typescript
// ✅ 올바른 컴포넌트 네이밍
export function RfqList() { ... }
export function BiddingDraft() { ... }
export function EmailPreview() { ... }
export default function HomePage() { ... }

// ❌ 잘못된 컴포넌트 네이밍
export function rfqList() { ... }      // camelCase 금지
export function rfq_list() { ... }     // snake_case 금지
export function RFQList() { ... }      // 약어 전체 대문자 지양 (Rfq 선호)
```

### 6. Custom Hook 네이밍 (use + PascalCase)

```typescript
// ✅ 올바른 Hook 네이밍
export function useRfqList() { ... }
export function useRfqPagination() { ... }
export function useLayoutArea() { ... }
export function useAuth() { ... }

// ❌ 잘못된 Hook 네이밍
export function rfqListHook() { ... }   // 'use' prefix 없음
export function UseRfqList() { ... }    // 함수는 camelCase 시작
export function use_rfq_list() { ... }  // snake_case 금지
```

---

## 📝 특수 파일 네이밍

### 1. Next.js App Router
```
app/
├── layout.tsx              # Root Layout
├── page.tsx                # Home Page
├── error.tsx               # Error Boundary
├── loading.tsx             # Loading UI
├── not-found.tsx           # 404 Page
├── rfq/
│   ├── page.tsx            # /rfq
│   ├── [id]/
│   │   └── page.tsx        # /rfq/:id
│   └── new/
│       └── page.tsx        # /rfq/new
└── api/
    └── rfq/
        └── route.ts        # API Route Handler
```

### 2. 설정 파일
```
프로젝트-root/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── playwright.config.ts
├── .eslintrc.json
├── .prettierrc
└── mkdocs.yml
```

### 3. 문서 파일
```
docs/
├── frontend/
│   ├── FIGMA_SETUP_COMPLETE.md      # 대문자 + snake_case
│   ├── TOKENS_STUDIO_IMPLEMENTATION_PLAN.md
│   ├── tdd-guide.md                 # kebab-case
│   ├── speckit-guide.md
│   └── claude-skills-guide.md
└── README.md
```

**규칙:**
- 중요 문서: `UPPER_SNAKE_CASE.md` (예: README.md, CHANGELOG.md)
- 일반 가이드: `kebab-case.md`

---

## 🎨 Design Token 네이밍

### Figma Token 파일
```
figma-tokens/
├── $metadata.json
├── $themes.json
├── 1. Color modes/
│   ├── Light mode.json
│   └── Dark mode.json
├── 2. Radius/
│   └── Mode 1.json
├── 3. Spacing/
│   └── Mode 1.json
├── 4. Widths/
│   └── Mode 1.json
├── 5. Containers/
│   └── Value.json
├── 6. Typography/
│   └── Value.json
└── _Primitives/
    └── Style.json
```

### TypeScript Token 네이밍
```typescript
// ✅ Token 객체는 camelCase
export const colors = {
  blue60: '#3A5CF3',      // Figma 네이밍 유지
  grayWhite: '#FFFFFF',
} as const;

export const spacing = {
  xl: 16,
  xl2: 20,
} as const;

// ✅ CSS Variables는 kebab-case
:root {
  --color-blue-60: #3A5CF3;
  --spacing-xl: 16px;
}
```

---

## 🔄 Git 관련 네이밍

### Branch 네이밍
```bash
# ✅ 올바른 브랜치명
main                           # 메인 브랜치
develop                        # 개발 브랜치
feature/001-rfq-list          # 기능 브랜치 (Spec Kit 자동 생성)
feature/002-bidding-draft
hotfix/login-error
bugfix/rfq-filter-bug

# ❌ 잘못된 브랜치명
Feature/RFQList               # 대문자 사용 금지
feature_rfq_list              # snake_case 지양
feat/rfq                      # 불명확한 이름
```

### Commit Message (Conventional Commits)
```bash
# ✅ Type: subject (한글 허용)
feat: RFQ 목록 필터링 기능 구현
fix: 로그인 에러 수정
docs: API 문서 업데이트
style: 코드 포맷팅
refactor: RFQ 서비스 리팩토링
test: RFQ 목록 테스트 추가
chore: 의존성 업데이트

# Type 목록
feat      # 새로운 기능
fix       # 버그 수정
docs      # 문서 변경
style     # 코드 포맷팅 (기능 변경 없음)
refactor  # 리팩토링
test      # 테스트 추가/수정
chore     # 빌드/설정 변경
perf      # 성능 개선
ci        # CI/CD 설정
```

---

## 📊 약어 및 용어 표준

### OSM RFQ 도메인 용어
```typescript
// ✅ 표준 약어 (약어 전체 대문자 지양, PascalCase 선호)
Rfq          (✅) vs RFQ    (❌)
Api          (✅) vs API    (❌)
Ui           (✅) vs UI     (❌)
Url          (✅) vs URL    (❌)
Html         (✅) vs HTML   (❌)

// 예외: 상수/Enum은 대문자 허용
const API_BASE_URL = '...';
enum RFQ_STATUS { ... }
```

### 도메인 용어 통일
```typescript
// Request for Quotation
Rfq, RfqList, RfqItem, RfqDetail

// Bidding (견적)
Bidding, BiddingDraft, BiddingRate

// Quotation (견적서)
Quotation, QuotationGenerator

// Email
Email, EmailPreview, EmailComposition
```

---

## ✅ 체크리스트

새 파일/컴포넌트 생성 시 확인:

- [ ] **프로젝트명**에 `osm-` prefix 사용
- [ ] **디렉토리명**은 kebab-case
- [ ] **컴포넌트 파일**은 `index.tsx`
- [ ] **Hook 파일**은 `index.[purpose].hook.ts`
- [ ] **Test 파일**은 `index.[purpose].spec.ts`
- [ ] **함수/변수**는 camelCase
- [ ] **타입/인터페이스**는 PascalCase
- [ ] **상수**는 UPPER_SNAKE_CASE (환경변수) 또는 camelCase (Design Token)
- [ ] **Commit Message**는 Conventional Commits 준수
- [ ] **Branch명**은 `feature/###-descriptive-name` 형식

---

## 📚 참고 자료

- **Reference Project**: `/reference/challenge-02`
- **Conventional Commits**: https://www.conventionalcommits.org/
- **Next.js File Conventions**: https://nextjs.org/docs/app/building-your-application/routing#file-conventions
- **TypeScript Style Guide**: https://google.github.io/styleguide/tsguide.html
- **OSM Constitution**: `/.specify/memory/constitution.md`

---

**Last Updated**: 2025-11-19
**Maintained By**: Ocean Smart Development Team
