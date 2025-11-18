# Spec Kit 사용 가이드

> **OSM RFQ 프로젝트의 Spec-Driven Development 워크플로우를 마스터하세요**

---

## 📚 Spec Kit이란?

**Spec Kit**은 Claude Code를 활용한 **명세 기반 개발 워크플로우** 시스템입니다.

### 주요 특징

- ✅ **체계적 개발** - Constitution → Specify → Plan → Tasks → Implement
- ✅ **품질 보증** - 각 단계별 검증 및 체크리스트
- ✅ **자동화** - 브랜치 생성, 문서 구조화, 작업 관리
- ✅ **일관성** - 프로젝트 원칙(Constitution) 준수 보장

---

## 🎯 핵심 철학

### Why Spec-Driven Development?

**전통적 개발 방식의 문제점**:
```
💬 "사용자 로그인 기능 만들어줘"
   ↓
🤔 "어떤 로그인? OAuth? 이메일? 소셜?"
   ↓
⚠️  불명확한 요구사항 → 잦은 수정 → 시간 낭비
```

**Spec Kit 워크플로우**:
```
📝 Specify: 명확한 명세서 작성
   ↓
🔍 Clarify: 불명확한 부분 질문 (최대 3개)
   ↓
🛠️  Plan: 기술 설계 및 아키텍처
   ↓
✅ Tasks: 단위 작업으로 분해
   ↓
🚀 Implement: TDD로 구현
```

---

## 🚀 Quick Start

### 1단계: Constitution 수립 (프로젝트 최초 1회)

```bash
/speckit.constitution
```

**목적**: 프로젝트의 핵심 원칙과 품질 기준을 정의합니다.

**생성되는 파일**: [.specify/memory/constitution.md](/.specify/memory/constitution.md)

**포함 내용**:
- 디자인 시스템 일관성 원칙
- TDD 필수 준수 규칙
- TypeScript Strict Mode
- 컴포넌트 아키텍처 가이드라인
- 코드 품질 표준

**언제 실행?**
- 프로젝트 초기 설정 시
- 팀 가이드라인 변경 시
- 새 개발자 온보딩 시

---

### 2단계: 기능 명세 작성 (Specify)

```bash
/speckit.specify "사용자 인증 기능 구현"
```

**동작 과정**:

1. **브랜치 자동 생성**: `001-user-auth`
2. **명세서 생성**: `specs/001-user-auth/spec.md`
3. **검증 체크리스트**: `specs/001-user-auth/checklists/requirements.md`

**명세서 구조**:

```markdown
# Feature Specification: 사용자 인증

## User Scenarios & Testing
### User Story 1 - 이메일 로그인 (Priority: P1)
**Given** 사용자가 로그인 페이지에 접속했을 때
**When** 유효한 이메일과 비밀번호를 입력하면
**Then** 대시보드로 리디렉션된다

## Requirements
- **FR-001**: 시스템은 이메일/비밀번호 인증을 지원해야 함
- **FR-002**: 비밀번호는 최소 8자 이상이어야 함

## Success Criteria
- **SC-001**: 사용자가 2분 이내에 로그인을 완료할 수 있어야 함
- **SC-002**: 로그인 성공률 95% 이상
```

**검증 항목** (`requirements.md`):
- [ ] 구현 세부사항 없음 (언어, 프레임워크, API)
- [ ] 사용자 가치 중심
- [ ] 모든 요구사항이 테스트 가능
- [ ] Success Criteria가 측정 가능

**Best Practices**:
- 구체적으로 작성 (모호한 표현 지양)
- "MUST", "SHOULD" 사용하여 우선순위 명확화
- 기술 스택 언급 금지 (무엇을 할지, 어떻게는 나중에)

---

### 3단계: 요구사항 명확화 (Clarify) - 선택사항

```bash
/speckit.clarify
```

**목적**: 명세서의 불명확한 부분을 식별하고 질문합니다.

**동작 방식**:

1. 명세서 분석
2. 최대 3개의 핵심 질문 생성
3. 옵션 제시 (A/B/C/Custom)
4. 사용자 응답 기반 명세서 업데이트

**예시 질문**:

```markdown
## Question 1: 인증 방법

**Context**: FR-001에서 "시스템은 사용자 인증을 지원해야 함"

**What we need to know**: 어떤 인증 방법을 사용할 것인가?

**Suggested Answers**:

| Option | Answer | Implications |
|--------|--------|--------------|
| A | 이메일/비밀번호 | 간단한 구현, 자체 관리 필요 |
| B | OAuth2 (Google, GitHub) | 복잡한 구현, 보안 위임 |
| C | SSO (Single Sign-On) | 엔터프라이즈 기능, 높은 복잡도 |
| Custom | 직접 입력 | 다른 방식 선택 가능 |

**Your choice**: _
```

**응답 예시**:
```
Q1: A (이메일/비밀번호)
Q2: B (7일 세션 유지)
Q3: Custom - JWT 토큰 사용, 1시간 만료
```

**언제 사용?**
- 명세서에 [NEEDS CLARIFICATION] 마커가 있을 때
- 여러 해석이 가능한 요구사항이 있을 때
- 비즈니스 로직이 불분명할 때

**언제 건너뛰어도 될까?**
- 명세서가 이미 명확할 때
- 표준 패턴을 따를 때 (예: CRUD 구현)
- POC/Prototype 단계일 때

---

### 4단계: 기술 계획 수립 (Plan)

```bash
/speckit.plan "Next.js App Router, TanStack Query, Zod validation"
```

**생성되는 산출물**:

1. **plan.md**: 기술 아키텍처 및 구현 계획
2. **data-model.md**: 데이터 모델 정의
3. **contracts/api.json**: API 계약 (OpenAPI 스펙)
4. **research.md**: 기술 선택 근거 및 대안
5. **quickstart.md**: 개발자 온보딩 가이드

**plan.md 구조**:

```markdown
# Implementation Plan: 사용자 인증

## Technical Context
- **Framework**: Next.js 14 App Router
- **State Management**: TanStack Query
- **Validation**: Zod
- **Testing**: Playwright (E2E)

## Constitution Check
- [x] Design System Consistency
- [x] Test-Driven Development
- [x] TypeScript Strict Mode
- [x] Component Architecture

## Phase 0: Research
- JWT vs Session-based 인증 비교
- Next.js Server Actions vs API Routes
- Zod schema 설계 패턴

## Phase 1: Design
- 데이터 모델 설계
- API 계약 정의
- 컴포넌트 구조 설계
```

**data-model.md 예시**:

```markdown
# Data Model: 사용자 인증

## Entities

### User
**Fields**:
- `id`: string (UUID)
- `email`: string (unique)
- `hashedPassword`: string
- `createdAt`: timestamp
- `lastLoginAt`: timestamp

**Validation**:
- Email: RFC 5322 표준
- Password: 최소 8자, 대소문자 + 숫자 포함
```

**contracts/api.json 예시**:

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/api/auth/login": {
      "post": {
        "summary": "사용자 로그인",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string", "format": "email" },
                  "password": { "type": "string", "minLength": 8 }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Constitution 준수 검증**:
- Design Token 사용 여부
- TDD 계획 여부
- TypeScript strict 모드
- 접근성 고려사항

---

### 5단계: 작업 분해 (Tasks)

```bash
/speckit.tasks
```

**생성되는 파일**: `specs/001-user-auth/tasks.md`

**tasks.md 구조**:

```markdown
# Tasks: 사용자 인증

## Phase 1: Setup (3 tasks)

### Task 1.1: 프로젝트 설정
**Depends on**: -
**Estimated effort**: 30min
**Deliverable**:
- [ ] Zod 패키지 설치
- [ ] TanStack Query 설정
- [ ] 타입 정의 파일 생성

### Task 1.2: 데이터 모델 구현
**Depends on**: 1.1
**Estimated effort**: 1h
**Deliverable**:
- [ ] User 타입 정의 (TypeScript)
- [ ] Zod 스키마 작성
- [ ] 테스트 작성

## Phase 2: Authentication Logic (4 tasks)

### Task 2.1: 로그인 API 엔드포인트
**Depends on**: 1.2
**Estimated effort**: 2h
**Deliverable**:
- [ ] `/api/auth/login` API Route 생성
- [ ] Playwright E2E 테스트 (TDD - Red)
- [ ] 로그인 로직 구현 (Green)
- [ ] 리팩토링 (Refactor)
```

**작업 우선순위**:
- **의존성 순서**: 선행 작업이 완료되어야 다음 작업 시작
- **Phase 분리**: 논리적으로 관련된 작업 그룹화
- **Effort 추정**: 작업 크기 명시 (30min, 1h, 2h 등)

**체크리스트 활용**:
```bash
# 작업 진행 중
- [x] Task 1.1: 프로젝트 설정 ✅
- [x] Task 1.2: 데이터 모델 구현 ✅
- [ ] Task 2.1: 로그인 API 엔드포인트 (진행 중)
- [ ] Task 2.2: 로그인 UI 컴포넌트
```

---

### 6단계: 구현 (Implement)

```bash
# AI 에이전트와 함께 tasks.md 따라 진행
"Task 1.1부터 시작하자. TDD로 진행해줘."
```

**TDD 사이클** (Constitution 필수):

```
🔴 Red: 실패하는 테스트 작성
   ↓
🟢 Green: 테스트를 통과하는 최소 코드 작성
   ↓
🔵 Refactor: 코드 개선 및 중복 제거
   ↓
   반복
```

**예시 워크플로우**:

1. **Red - 테스트 작성**:
```typescript
// src/app/api/auth/login.spec.ts
test('should return 200 on valid credentials', async () => {
  const response = await request(app).post('/api/auth/login').send({
    email: 'user@example.com',
    password: 'Password123'
  });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});
```

2. **Green - 구현**:
```typescript
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/auth/schemas';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = loginSchema.parse(body);

  // 로그인 로직
  const token = await authenticateUser(email, password);

  return NextResponse.json({ token });
}
```

3. **Refactor - 개선**:
```typescript
// 중복 제거, 에러 핸들링 추가
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);
    const token = await authService.login(validatedData);

    return NextResponse.json({ token });
  } catch (error) {
    return handleAuthError(error);
  }
}
```

**Constitution 체크포인트**:
- [ ] Design Token 사용 (UI 컴포넌트)
- [ ] TypeScript strict 모드
- [ ] Playwright E2E 테스트 작성
- [ ] Storybook 스토리 추가 (컴포넌트)
- [ ] 접근성 검증 (a11y)

---

### 7단계: 배포 (Ship)

```bash
# 변경사항 커밋
git add .
git commit -m "feat: implement user authentication"

# 원격 브랜치에 푸시
git push origin 001-user-auth

# Pull Request 생성
gh pr create --title "feat: User Authentication" \
  --body "Implements email/password authentication. See specs/001-user-auth/spec.md"
```

**PR 체크리스트** (Constitution):
- [ ] `npm run build` 성공
- [ ] `npm run lint` 에러 0개
- [ ] `npm run test:e2e` 통과
- [ ] TypeScript 컴파일 에러 0개
- [ ] Storybook 빌드 성공

---

## 🔧 추가 명령어

### speckit.analyze

**용도**: 명세서, 계획, 작업 간 일관성 검증

```bash
/speckit.analyze
```

**검증 항목**:
- spec.md의 요구사항이 plan.md에 반영되었는가?
- tasks.md가 모든 요구사항을 커버하는가?
- Constitution 원칙 준수 여부
- 누락된 테스트 케이스 식별

**언제 사용?**
- `/speckit.tasks` 후, `/speckit.implement` 전
- 명세서 변경 후
- 품질 검증이 필요할 때

---

### speckit.checklist

**용도**: 도메인별 품질 체크리스트 생성

```bash
/speckit.checklist "authentication"
```

**생성되는 파일**: `specs/001-user-auth/checklists/authentication.md`

**체크리스트 예시**:

```markdown
# Authentication Quality Checklist

## Security
- [ ] 비밀번호 해싱 (bcrypt/argon2)
- [ ] SQL Injection 방지
- [ ] XSS 방지
- [ ] CSRF 토큰 사용

## User Experience
- [ ] 명확한 에러 메시지
- [ ] 로딩 상태 표시
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원

## Performance
- [ ] 로그인 응답 시간 < 1초
- [ ] Rate limiting 구현
- [ ] 세션 타임아웃 설정
```

**도메인별 체크리스트**:
- `authentication`: 인증/인가
- `forms`: 폼 처리
- `api`: API 설계
- `ui`: UI/UX
- `performance`: 성능 최적화

---

### speckit.taskstoissues

**용도**: tasks.md를 GitHub Issues로 변환

```bash
/speckit.taskstoissues
```

**생성되는 이슈**:

```
Issue #1: [001-user-auth] Task 1.1 - 프로젝트 설정
Labels: feature, phase-1
Assignees: @you

**Description**: Zod 패키지 설치, TanStack Query 설정, 타입 정의 파일 생성

**Depends on**: -
**Estimated effort**: 30min

**Checklist**:
- [ ] Zod 패키지 설치
- [ ] TanStack Query 설정
- [ ] 타입 정의 파일 생성
```

**언제 사용?**
- 팀 협업 시
- GitHub Projects와 연동
- 작업 추적이 필요할 때

---

## 📦 디렉토리 구조

### Spec Kit 파일 위치

```
osm-rfq/
├── .specify/
│   ├── memory/
│   │   └── constitution.md          # 프로젝트 원칙
│   ├── templates/
│   │   ├── spec-template.md         # 명세서 템플릿
│   │   ├── plan-template.md         # 계획 템플릿
│   │   └── tasks-template.md        # 작업 템플릿
│   └── scripts/
│       └── bash/
│           ├── create-new-feature.sh
│           ├── setup-plan.sh
│           └── update-agent-context.sh
├── .claude/
│   └── commands/
│       ├── speckit.constitution.md  # Constitution 명령어
│       ├── speckit.specify.md       # Specify 명령어
│       ├── speckit.clarify.md       # Clarify 명령어
│       ├── speckit.plan.md          # Plan 명령어
│       ├── speckit.tasks.md         # Tasks 명령어
│       ├── speckit.implement.md     # Implement 명령어
│       ├── speckit.analyze.md       # Analyze 명령어
│       └── speckit.checklist.md     # Checklist 명령어
└── specs/                           # 기능별 명세서 (생성됨)
    ├── 001-user-auth/
    │   ├── spec.md                  # 기능 명세서
    │   ├── plan.md                  # 구현 계획
    │   ├── data-model.md            # 데이터 모델
    │   ├── research.md              # 기술 조사
    │   ├── tasks.md                 # 작업 목록
    │   ├── contracts/               # API 계약
    │   │   └── api.json
    │   └── checklists/              # 품질 체크리스트
    │       ├── requirements.md
    │       └── authentication.md
    └── 002-rfq-management/
        └── ...
```

---

## 🎨 Spec Kit vs Claude Skills

| 항목 | Spec Kit | Claude Skills |
|------|----------|---------------|
| **위치** | `.claude/commands/` | `.claude/skills/` |
| **용도** | 프로젝트 워크플로우 | 도메인별 작업 자동화 |
| **예시** | `/speckit.specify` | `/skill frontend-design` |
| **구조** | Markdown 명령어 | SKILL.md + 리소스 |
| **범위** | 프로젝트 전반 | 특정 작업/도메인 |
| **의존성** | Constitution 기반 | 독립 실행 가능 |

### 함께 사용하기

```bash
# 1. Spec Kit으로 기능 명세
/speckit.specify "사용자 프로필 컴포넌트 구현"

# 2. Skills로 UI 디자인
/skill frontend-design
"UserProfile 컴포넌트를 디자인해줘 - 카드 형태, 아바타 + 이름 + 이메일"

# 3. Spec Kit으로 계획 수립
/speckit.plan "Next.js, Tailwind CSS, CSS Variables"

# 4. Skills로 컴포넌트 생성 (향후 커스텀 스킬)
/skill component-generator
"UserProfile 컴포넌트와 Storybook 생성"

# 5. Spec Kit으로 작업 관리
/speckit.tasks
```

---

## 💡 Best Practices

### 1. Constitution을 먼저 읽어라

**Constitution은 프로젝트의 법전입니다**. 모든 결정은 Constitution을 기준으로 합니다.

**체크포인트**:
- [ ] 디자인 토큰 사용하는가?
- [ ] TDD로 개발하는가?
- [ ] TypeScript strict 모드인가?
- [ ] 접근성을 고려했는가?

### 2. 명세서는 비기술적으로 작성

**좋은 예**:
```markdown
- 사용자는 이메일과 비밀번호로 로그인할 수 있어야 함
- 로그인 성공 시 대시보드로 이동해야 함
- 잘못된 비밀번호 입력 시 에러 메시지를 표시해야 함
```

**나쁜 예** (기술 세부사항 포함):
```markdown
- Next.js API Route `/api/auth/login`을 POST로 호출
- JWT 토큰을 localStorage에 저장
- React Query의 useMutation 훅 사용
```

### 3. Clarify는 최대 3개 질문만

**우선순위**:
1. **Scope** (기능 범위): 가장 큰 영향
2. **Security/Privacy** (보안): 되돌리기 어려운 결정
3. **UX** (사용자 경험): 사용자 만족도
4. **Technical Details** (기술 세부사항): 나중에 변경 가능

**좋은 질문**:
- "이 기능의 범위에 소셜 로그인이 포함되나요?"
- "사용자 데이터를 얼마나 보관해야 하나요?"
- "다국어 지원이 필요한가요?"

**나쁜 질문** (너무 구체적):
- "비밀번호 해싱에 bcrypt를 쓸까요, argon2를 쓸까요?"
- "API 응답 포맷은 JSON이어야 하나요?"

### 4. TDD는 NON-NEGOTIABLE

**Constitution에 명시된 필수 원칙**:

```
모든 기능은 테스트 우선으로 개발되어야 합니다.
- E2E 테스트: Playwright로 핵심 사용자 플로우 커버
- 컴포넌트 테스트: Storybook으로 모든 컴포넌트 문서화
- 테스트 커버리지: 80% 이상 유지
- TDD 사이클: Red → Green → Refactor 엄격히 준수
- 테스트 없이 PR 머지 불가
```

**TDD 체크리스트**:
- [ ] 실패하는 테스트를 먼저 작성했는가?
- [ ] 테스트가 통과하는 최소 코드만 작성했는가?
- [ ] 리팩토링 후에도 테스트가 통과하는가?

### 5. 작은 단위로 커밋

**좋은 커밋 습관**:
```bash
# 작은 단위로 자주 커밋
git commit -m "feat: add login form UI"
git commit -m "test: add login E2E test"
git commit -m "feat: implement login API endpoint"
git commit -m "refactor: extract auth service"
```

**나쁜 커밋 습관**:
```bash
# 큰 덩어리로 한 번에 커밋
git commit -m "feat: implement entire authentication system"
```

---

## 🚧 문제 해결 (Troubleshooting)

### 브랜치 번호 충돌

**문제**: `001-user-auth` 브랜치가 이미 존재합니다.

**해결**:
```bash
# 기존 브랜치 확인
git branch -a | grep user-auth

# 삭제하거나 다른 번호 사용
git branch -d 001-user-auth  # 로컬 삭제
git push origin --delete 001-user-auth  # 원격 삭제

# 또는 다음 번호로 자동 증가
/speckit.specify "사용자 인증 기능 구현"  # 002-user-auth로 생성됨
```

### [NEEDS CLARIFICATION] 마커가 너무 많음

**문제**: 명세서에 5개 이상의 [NEEDS CLARIFICATION]이 있습니다.

**해결**:
1. **우선순위 정리**: Scope > Security > UX > Technical
2. **상위 3개만 유지**: 나머지는 합리적 추측으로 채우기
3. **Constitution 참조**: 표준 패턴 적용

### 테스트가 실패합니다

**문제**: `npm test:e2e`에서 에러가 발생합니다.

**해결**:
```bash
# 테스트 디버그 모드 실행
npm run test:e2e:ui

# 특정 테스트만 실행
npx playwright test login.spec.ts

# 로그 확인
npx playwright test --debug
```

### Constitution 위반

**문제**: PR에서 Constitution 위반이 감지되었습니다.

**해결**:
1. **Constitution 재확인**: [.specify/memory/constitution.md](/.specify/memory/constitution.md)
2. **자동 검증 실행**:
```bash
npm run lint     # ESLint 에러 확인
npm run build    # TypeScript 컴파일 에러 확인
npm test:e2e     # E2E 테스트 확인
```
3. **체크리스트 검토**: `specs/*/checklists/*.md`

---

## 📚 참고 자료

### 내부 문서

- [CLAUDE.md](/CLAUDE.md) - 프로젝트 전체 가이드
- [Constitution](/.specify/memory/constitution.md) - 프로젝트 원칙
- [Claude Skills 가이드](/docs/frontend/claude-skills-guide.md) - Skills 활용법

### 템플릿 파일

- [Spec Template](/.specify/templates/spec-template.md)
- [Plan Template](/.specify/templates/plan-template.md)
- [Tasks Template](/.specify/templates/tasks-template.md)

### 스크립트

- [create-new-feature.sh](/.specify/scripts/bash/create-new-feature.sh)
- [setup-plan.sh](/.specify/scripts/bash/setup-plan.sh)
- [update-agent-context.sh](/.specify/scripts/bash/update-agent-context.sh)

---

## 🎯 실전 예제

### 예제 1: 간단한 CRUD 기능

```bash
# 1. 명세 작성
/speckit.specify "할 일 목록 관리 기능 (생성, 읽기, 수정, 삭제)"

# 2. 명확화 (선택사항)
/speckit.clarify
# Q1: A (로컬 스토리지 사용)
# Q2: B (체크박스로 완료 표시)

# 3. 계획 수립
/speckit.plan "Next.js, localStorage, Zod"

# 4. 작업 분해
/speckit.tasks

# 5. 구현
"Task 1.1부터 시작. TDD로 진행해줘."
```

### 예제 2: 복잡한 인증 시스템

```bash
# 1. Constitution 확인
cat .specify/memory/constitution.md

# 2. 명세 작성 (상세하게)
/speckit.specify "
사용자 인증 시스템:
- 이메일/비밀번호 로그인
- 소셜 로그인 (Google, GitHub)
- 비밀번호 재설정
- 이메일 인증
- 세션 관리
"

# 3. 명확화 (필수)
/speckit.clarify
# Q1: B (OAuth2 + JWT)
# Q2: A (7일 세션)
# Q3: Custom - 비밀번호 재설정은 이메일 링크 방식

# 4. 계획 수립
/speckit.plan "Next.js, NextAuth.js, Prisma, PostgreSQL"

# 5. 분석 (품질 검증)
/speckit.analyze

# 6. 체크리스트 생성
/speckit.checklist "authentication"

# 7. 작업 분해
/speckit.tasks

# 8. GitHub Issues 생성
/speckit.taskstoissues

# 9. 구현 (TDD)
"Phase 1부터 시작. 각 작업마다 테스트 먼저 작성해줘."
```

### 예제 3: UI 컴포넌트 + Skills 연계

```bash
# 1. Spec Kit으로 명세
/speckit.specify "카드 형태의 RFQ 목록 컴포넌트"

# 2. Skills로 디자인
/skill frontend-design
"RFQCard 컴포넌트 디자인:
- 제목, 상태, 기간, 담당자 표시
- Hover 상태
- 클릭 시 상세 페이지 이동
- OSM RFQ 디자인 토큰 사용"

# 3. Spec Kit으로 계획
/speckit.plan "Next.js, Tailwind CSS, Storybook"

# 4. 작업 분해
/speckit.tasks

# 5. 구현
"Task 1.1 시작. Storybook 스토리부터 작성해줘 (TDD)."
```

---

## 🎉 결론

Spec Kit을 활용하면:

- ✅ **명확한 요구사항** - 불명확한 부분 사전 해결
- ✅ **체계적 개발** - Constitution 기반 일관성
- ✅ **품질 보증** - TDD + 자동 검증
- ✅ **효율적 협업** - 문서화된 명세서 + 작업 추적
- ✅ **빠른 온보딩** - 신규 개발자도 쉽게 이해

**OSM RFQ 프로젝트의 모든 기능은 Spec Kit 워크플로우를 따릅니다.** 🚀

---

**작성일**: 2025-11-18
**버전**: 1.0.0
**관련 문서**: [CLAUDE.md](/CLAUDE.md), [Constitution](/.specify/memory/constitution.md), [Claude Skills 가이드](/docs/frontend/claude-skills-guide.md)
