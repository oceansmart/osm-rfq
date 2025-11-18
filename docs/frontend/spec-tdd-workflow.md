# Spec Kit + TDD 통합 워크플로우

> **명세서 기반 테스트 시나리오 생성 및 TDD 구현 가이드**

---

## 📚 개요

OSM RFQ 프로젝트는 **Spec Kit**과 **TDD**를 통합하여 체계적인 개발 워크플로우를 제공합니다.

### 핵심 철학

```
명세서 (spec.md) → 계획 (plan.md) → 테스트 시나리오 (tasks.md) → TDD 구현
```

**왜 이 순서인가?**

1. **spec.md**: 무엇을 만들 것인가 (WHAT) - 비기술적 요구사항
2. **plan.md**: 어떻게 만들 것인가 (HOW) - 기술적 설계
3. **tasks.md**: 어떤 순서로 만들 것인가 (ORDER) - TDD 테스트 시나리오
4. **TDD**: 실제 구현 (IMPLEMENTATION) - Red-Green-Refactor

---

## 🔄 전체 워크플로우

### Phase 1: 명세 작성 (Spec Kit)

```bash
# 1. Constitution 확인 (최초 1회)
/speckit.constitution

# 2. 기능 명세 작성
/speckit.specify "사용자 프로필 관리 기능"

# 3. 불명확한 부분 명확화 (선택)
/speckit.clarify

# 4. 기술 계획 수립
/speckit.plan "Next.js, TanStack Query, Zod"
```

**산출물**:
- `specs/001-user-profile/spec.md` - 기능 명세서
- `specs/001-user-profile/plan.md` - 구현 계획
- `specs/001-user-profile/data-model.md` - 데이터 모델

### Phase 2: 테스트 시나리오 생성 (Spec Kit)

```bash
# 5. 작업 분해 (테스트 시나리오 포함)
/speckit.tasks
```

**산출물**:
- `specs/001-user-profile/tasks.md` - TDD 테스트 시나리오

### Phase 3: TDD 구현

```bash
# 6. TDD 사이클 시작
/tdd-cycle

# 또는 수동으로
/tdd-red    # tasks.md의 첫 번째 테스트 구현
/tdd-green
/tdd-refactor
/tdd-commit
```

---

## 📋 plan.md의 역할

### plan.md 구조

`/speckit.plan` 실행 시 생성되는 `plan.md`는 다음을 포함합니다:

```markdown
# Implementation Plan: 사용자 프로필 관리

## Technical Context
- **Framework**: Next.js 14 App Router
- **State Management**: TanStack Query
- **Validation**: Zod
- **Testing**: Playwright (E2E)

## Constitution Check
- [x] Design System Consistency
- [x] Test-Driven Development
- [x] TypeScript Strict Mode

## Phase 0: Research
- Zod schema 패턴 조사
- TanStack Query mutation 패턴

## Phase 1: Design
- 데이터 모델 설계 (data-model.md)
- API 계약 정의 (contracts/api.json)
- 컴포넌트 구조 설계

## Phase 2: Implementation Planning
→ tasks.md 생성으로 위임됨
```

### plan.md vs tasks.md

| 항목 | plan.md | tasks.md |
|------|---------|----------|
| **목적** | 기술 설계 및 아키텍처 | 실행 가능한 작업 목록 |
| **관점** | WHAT (무엇을 설계) | HOW (어떻게 구현) |
| **사용 시점** | `/speckit.plan` | `/speckit.tasks` |
| **TDD 연관** | 간접적 (기술 스택 정의) | 직접적 (테스트 시나리오) |

**plan.md**는 설계 문서이고, **tasks.md**가 실제 TDD 테스트 시나리오를 담습니다.

---

## ✅ tasks.md: TDD 테스트 시나리오

### tasks.md 구조

`/speckit.tasks` 실행 시 생성되는 `tasks.md`는 **테스트 우선** 접근으로 작성됩니다:

```markdown
# Tasks: 사용자 프로필 관리

## Phase 1: Setup & Data Model (TDD)

### Task 1.1: 프로필 데이터 모델 타입 정의
**Depends on**: -
**Estimated effort**: 30min
**Test Scenario**:
- [ ] 🔴 RED: Profile 타입 테스트 작성
  - `test("Profile 타입이 필수 필드를 포함함")`
  - TypeScript 컴파일 에러 확인
- [ ] 🟢 GREEN: Profile interface 정의
  - id, name, email, avatar 필드 추가
- [ ] ♻️ REFACTOR: 타입 최적화 (필요 시)
- [ ] 💾 COMMIT: `feat: define Profile type`

### Task 1.2: Zod 스키마 작성
**Depends on**: 1.1
**Estimated effort**: 1h
**Test Scenario**:
- [ ] 🔴 RED: Zod validation 테스트 작성
  - `test("유효한 프로필 데이터를 통과시킴")`
  - `test("이메일 형식이 잘못되면 실패함")`
- [ ] 🟢 GREEN: profileSchema 구현
- [ ] ♻️ REFACTOR: 스키마 구조 개선
- [ ] 💾 COMMIT: `feat: add profile validation schema`

## Phase 2: UI Components (TDD)

### Task 2.1: 프로필 카드 컴포넌트
**Depends on**: 1.1, 1.2
**Estimated effort**: 2h
**Test Scenario**:
- [ ] 🔴 RED: E2E 테스트 작성 (Playwright)
  - `test("프로필 카드에 사용자 이름이 표시됨")`
  - `test("프로필 카드에 이메일이 표시됨")`
  - `test("아바타 이미지가 표시됨")`
- [ ] 🟢 GREEN: ProfileCard 컴포넌트 최소 구현
  - 이름, 이메일, 아바타 표시
- [ ] ♻️ REFACTOR: 컴포넌트 구조 개선
  - 디자인 토큰 적용
  - Typography 유틸리티 사용
- [ ] 💾 COMMIT (분리):
  - `refactor: apply design tokens to ProfileCard`
  - `feat: implement ProfileCard component`

### Task 2.2: 프로필 편집 폼
**Depends on**: 2.1
**Estimated effort**: 3h
**Test Scenario**:
- [ ] 🔴 RED: E2E 폼 테스트 작성
  - `test("이름 입력 필드가 표시됨")`
  - `test("이메일 입력 필드가 표시됨")`
  - `test("저장 버튼 클릭 시 업데이트됨")`
  - `test("잘못된 이메일 입력 시 에러 표시")`
- [ ] 🟢 GREEN: ProfileEditForm 구현
  - React Hook Form + Zod 통합
  - 기본 폼 필드
- [ ] ♻️ REFACTOR: 폼 로직 Hook으로 추출
  - useProfileForm custom hook
- [ ] 💾 COMMIT (분리):
  - `refactor: extract useProfileForm hook`
  - `feat: implement profile edit form`

## Phase 3: API Integration (TDD)

### Task 3.1: 프로필 조회 Query
**Depends on**: 1.1, 1.2
**Estimated effort**: 2h
**Test Scenario**:
- [ ] 🔴 RED: API 레벨 테스트 작성
  - `test("GET /api/profile 호출 시 프로필 반환")`
  - Mock API 응답 설정
- [ ] 🟢 GREEN: useProfileQuery Hook 구현
  - TanStack Query 설정
  - API Route 생성
- [ ] ♻️ REFACTOR: Query 옵션 최적화
  - staleTime, cacheTime 설정
- [ ] 💾 COMMIT: `feat: implement profile query`

### Task 3.2: 프로필 업데이트 Mutation
**Depends on**: 3.1
**Estimated effort**: 2h
**Test Scenario**:
- [ ] 🔴 RED: Mutation 테스트 작성
  - `test("PUT /api/profile 호출 시 업데이트됨")`
  - `test("업데이트 성공 시 캐시 무효화됨")`
- [ ] 🟢 GREEN: useProfileMutation Hook 구현
- [ ] ♻️ REFACTOR: Optimistic update 추가
- [ ] 💾 COMMIT: `feat: implement profile mutation`
```

---

## 🎯 tasks.md → TDD 워크플로우

### 1. tasks.md의 테스트 시나리오 읽기

```bash
# tasks.md 확인
cat specs/001-user-profile/tasks.md

# Task 1.1의 테스트 시나리오:
# - [ ] 🔴 RED: Profile 타입 테스트 작성
# - [ ] 🟢 GREEN: Profile interface 정의
# - [ ] ♻️ REFACTOR: 타입 최적화
# - [ ] 💾 COMMIT: feat: define Profile type
```

### 2. TDD 명령어로 구현

```bash
# RED: tasks.md의 첫 번째 테스트 구현
/tdd-red

Claude:
🔴 RED Phase

📋 From tasks.md: Task 1.1 - Profile 타입 테스트
📝 Test written: "Profile 타입이 필수 필드를 포함함"

// src/types/profile.spec.ts
test("Profile 타입이 필수 필드를 포함함", () => {
  const profile: Profile = {
    id: "1",
    name: "테스트",
    email: "test@example.com",
    avatar: "https://example.com/avatar.jpg"
  };

  expect(profile).toBeDefined();
});

❌ FAIL: Cannot find name 'Profile'

💡 Next: /tdd-green
```

```bash
# GREEN: 최소 구현
/tdd-green

Claude:
🟢 GREEN Phase

✅ Implementation:
- Created: src/types/profile.ts
- Added: Profile interface with required fields

// src/types/profile.ts
export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

✅ PASS: All tests passing (1/1)

💡 Next: /tdd-refactor or /tdd-commit
```

```bash
# COMMIT
/tdd-commit

Claude:
💾 COMMIT SUCCESSFUL

Type: Behavioral
Message: feat: define Profile type

✅ Task 1.1 체크 완료!
📋 다음: Task 1.2 - Zod 스키마 작성

💡 Next: /tdd-red for Task 1.2
```

### 3. tasks.md 체크리스트 업데이트

```bash
# tasks.md를 수동으로 업데이트하거나
# Claude가 자동으로 체크 표시

## Task 1.1: 프로필 데이터 모델 타입 정의
- [x] 🔴 RED: Profile 타입 테스트 작성 ✅
- [x] 🟢 GREEN: Profile interface 정의 ✅
- [x] 💾 COMMIT: `feat: define Profile type` ✅

## Task 1.2: Zod 스키마 작성
- [ ] 🔴 RED: Zod validation 테스트 작성
...
```

---

## 🔧 통합 워크플로우 예시

### 완전한 사이클: Spec → Plan → Tasks → TDD

#### Step 1: Specify

```bash
/speckit.specify "사용자 프로필 카드 표시 기능"
```

**spec.md 생성**:
```markdown
## User Scenarios & Testing

### User Story 1 - 프로필 정보 표시 (Priority: P1)

사용자가 프로필 페이지에 접속하면 자신의 이름, 이메일, 아바타가 카드 형태로 표시된다.

**Acceptance Scenarios**:
- **Given** 사용자가 로그인 상태일 때
- **When** 프로필 페이지에 접속하면
- **Then** 프로필 카드에 이름이 표시됨
- **And** 이메일이 표시됨
- **And** 아바타 이미지가 표시됨
```

#### Step 2: Plan

```bash
/speckit.plan "Next.js, TanStack Query, Zod, Playwright"
```

**plan.md 생성**:
```markdown
## Technical Context
- Framework: Next.js 14 App Router
- State Management: TanStack Query
- Validation: Zod
- Testing: Playwright

## Constitution Check
- [x] Design System (CSS Variables)
- [x] TDD (Playwright E2E)
- [x] TypeScript Strict
```

#### Step 3: Tasks (테스트 시나리오)

```bash
/speckit.tasks
```

**tasks.md 생성** (TDD 시나리오 포함):
```markdown
### Task 1.1: Profile 타입 정의
**Test Scenario**:
- [ ] 🔴 RED: Profile 타입 테스트
- [ ] 🟢 GREEN: interface 정의
- [ ] 💾 COMMIT

### Task 1.2: ProfileCard 컴포넌트
**Test Scenario**:
- [ ] 🔴 RED: E2E 테스트 (이름, 이메일, 아바타 표시)
- [ ] 🟢 GREEN: 컴포넌트 구현
- [ ] ♻️ REFACTOR: 디자인 토큰 적용
- [ ] 💾 COMMIT (분리)
```

#### Step 4: TDD 구현

```bash
# 자동 사이클
/tdd-cycle

# 또는 수동
/tdd-red     # Task 1.1의 RED
/tdd-green   # Task 1.1의 GREEN
/tdd-commit  # Task 1.1 완료

/tdd-red     # Task 1.2의 RED
/tdd-green   # Task 1.2의 GREEN
/tdd-refactor # Task 1.2의 REFACTOR
/tdd-commit  # Task 1.2 완료 (구조적 + 동작적 분리)
```

---

## 📊 plan.md vs tasks.md 비교

### plan.md (설계 문서)

**목적**: 기술적 설계 및 아키텍처 정의

**내용**:
```markdown
## Technical Context
- Framework, Libraries, Tools

## Constitution Check
- 원칙 준수 여부 확인

## Phase 0: Research
- 기술 조사 결과

## Phase 1: Design
- 데이터 모델 (data-model.md)
- API 계약 (contracts/api.json)
- 컴포넌트 구조
```

**사용자**: 개발자, 아키텍트

**생성 시점**: `/speckit.plan`

### tasks.md (실행 계획)

**목적**: TDD 테스트 시나리오 및 구현 순서

**내용**:
```markdown
## Phase N: [작업 그룹]

### Task N.M: [작업명]
**Depends on**: [의존성]
**Estimated effort**: [예상 시간]
**Test Scenario**:
- [ ] 🔴 RED: [테스트 작성]
- [ ] 🟢 GREEN: [구현]
- [ ] ♻️ REFACTOR: [리팩토링]
- [ ] 💾 COMMIT: [커밋]
```

**사용자**: 개발자 (TDD 구현자)

**생성 시점**: `/speckit.tasks`

---

## ✅ Best Practices

### 1. Spec → Plan → Tasks 순서 엄수

```bash
# ❌ Bad: tasks부터 생성
/speckit.tasks  # spec.md와 plan.md 없이 실행

# ✅ Good: 순서대로 진행
/speckit.specify "기능 설명"
/speckit.plan "기술 스택"
/speckit.tasks
```

### 2. tasks.md의 테스트 시나리오 활용

```bash
# tasks.md 확인 후
cat specs/001-feature/tasks.md

# TDD 명령어가 자동으로 tasks.md 참조
/tdd-red    # tasks.md의 다음 unchecked 테스트 찾기
/tdd-green
/tdd-commit # tasks.md에 체크 표시
```

### 3. 테스트 시나리오는 구체적으로

**❌ Bad** (모호함):
```markdown
### Task 1.1: 프로필 구현
- [ ] 테스트 작성
- [ ] 구현
```

**✅ Good** (구체적):
```markdown
### Task 1.1: ProfileCard 컴포넌트
**Test Scenario**:
- [ ] 🔴 RED: "프로필 카드에 사용자 이름 표시" 테스트
- [ ] 🔴 RED: "프로필 카드에 이메일 표시" 테스트
- [ ] 🔴 RED: "아바타 이미지 표시" 테스트
- [ ] 🟢 GREEN: ProfileCard 컴포넌트 구현
- [ ] ♻️ REFACTOR: 디자인 토큰 적용
- [ ] 💾 COMMIT: `refactor: apply design tokens`
- [ ] 💾 COMMIT: `feat: implement ProfileCard`
```

### 4. Constitution 준수 확인

모든 테스트는 Constitution 원칙을 따라야 합니다:

```markdown
### Task 2.1: UI 컴포넌트
**Test Scenario**:
- [ ] 🔴 RED: Playwright E2E 테스트 (Constitution: TDD 필수)
- [ ] 🟢 GREEN: TypeScript strict mode로 구현 (Constitution: TS strict)
- [ ] ♻️ REFACTOR: CSS Variables 사용 (Constitution: Design System)
- [ ] 💾 COMMIT: 테스트 통과 확인 (Constitution: Quality Gates)
```

---

## 🎉 요약

### 통합 워크플로우

```
1. /speckit.specify    → spec.md (WHAT)
2. /speckit.plan       → plan.md (HOW - 기술 설계)
3. /speckit.tasks      → tasks.md (ORDER - TDD 시나리오)
4. /tdd-cycle          → 실제 구현 (RED-GREEN-REFACTOR)
```

### plan.md의 역할

- ✅ 기술 스택 정의
- ✅ Constitution 준수 확인
- ✅ 아키텍처 설계
- ❌ 테스트 시나리오는 **tasks.md**에 위임

### tasks.md의 역할

- ✅ TDD 테스트 시나리오 제공
- ✅ 구현 순서 정의 (의존성 기반)
- ✅ RED-GREEN-REFACTOR-COMMIT 단계 명시
- ✅ `/tdd-red`가 참조하는 소스

### 핵심 원칙

1. **Spec First**: 명세서 없이 구현 금지
2. **Test Scenarios in tasks.md**: TDD 시나리오는 tasks.md에
3. **TDD Commands Follow tasks.md**: `/tdd-red`는 tasks.md 참조
4. **Constitution Always**: 모든 단계에서 Constitution 준수

**OSM RFQ 프로젝트는 명세 기반 TDD로 높은 품질을 보장합니다!** 🚀

---

**작성일**: 2025-11-18
**버전**: 1.0.0
**관련 문서**:
- [Spec Kit 가이드](/docs/frontend/speckit-guide.md)
- [TDD 가이드](/docs/frontend/tdd-guide.md)
- [Constitution](/.specify/memory/constitution.md)
