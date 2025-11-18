# TDD (Test-Driven Development) 가이드

> **Kent Beck의 TDD와 Tidy First 원칙을 따르는 OSM RFQ 개발 워크플로우**

---

## 📚 TDD란?

**Test-Driven Development (테스트 주도 개발)**은 Kent Beck이 제시한 소프트웨어 개발 방법론으로, 테스트를 먼저 작성하고 그 테스트를 통과하는 최소한의 코드를 구현한 후 리팩토링하는 방식입니다.

### 왜 TDD인가?

- ✅ **높은 코드 품질** - 테스트로 검증된 안정적인 코드
- ✅ **리팩토링 자신감** - 테스트가 안전망 역할
- ✅ **명확한 요구사항** - 테스트가 문서 역할
- ✅ **버그 감소** - 조기 발견 및 수정
- ✅ **설계 개선** - 테스트 가능한 코드는 좋은 설계

---

## 🔄 Red-Green-Refactor 사이클

```
🔴 RED → 🟢 GREEN → ♻️ REFACTOR → 🔴 RED → ...
```

### 🔴 RED (빨강)

**목표**: 실패하는 테스트 작성

**규칙**:
- 가장 간단한 테스트부터 시작
- 한 번에 하나의 동작만 테스트
- 테스트 실패를 확인
- 구현 코드는 절대 작성하지 않음

**예시**:
```typescript
test("페이지 로드 시 첫 페이지 표시", async ({ page }) => {
  await page.goto("/diaries");
  const pagination = page.locator("[data-testid='pagination-page-1']");
  await expect(pagination).toHaveClass(/active/);
});

// ❌ FAIL: element not found
```

### 🟢 GREEN (초록)

**목표**: 테스트를 통과하는 최소 코드 작성

**규칙**:
- 테스트를 통과할 만큼만 구현
- 과도한 설계 금지
- 하드코딩도 허용 (테스트가 통과하면 됨)
- 모든 테스트가 통과해야 함

**예시**:
```typescript
// 최소 구현 (하드코딩도 OK)
const [currentPage] = useState(1);

return (
  <div data-testid={`pagination-page-${currentPage}`} className="active">
    {currentPage}
  </div>
);

// ✅ PASS
```

### ♻️ REFACTOR (리팩토링)

**목표**: 코드 구조 개선 (동작 변경 없음)

**규칙**:
- 테스트가 통과 상태일 때만 수행
- 한 번에 하나의 리팩토링
- 각 변경 후 테스트 실행
- 중복 제거 및 명확성 개선

**예시**:
```typescript
// Before: Magic number
const paginatedDiaries = diaries.slice(0, 12);

// After: Named constant
const ITEMS_PER_PAGE = 12;
const paginatedDiaries = diaries.slice(0, ITEMS_PER_PAGE);

// ✅ PASS (리팩토링 후에도)
```

---

## 🛠️ TDD Slash 명령어

OSM RFQ 프로젝트에서는 TDD 워크플로우를 위한 6개의 Slash 명령어를 제공합니다.

### 명령어 목록

| 명령어 | 목적 | 단계 |
|--------|------|------|
| `/tdd-red` | 실패하는 테스트 작성 | 🔴 RED |
| `/tdd-green` | 최소 구현 | 🟢 GREEN |
| `/tdd-refactor` | 리팩토링 | ♻️ REFACTOR |
| `/tdd-cycle` | 전체 사이클 자동 실행 | 🔄 ALL |
| `/tdd-status` | 현재 상태 확인 | 📊 CHECK |
| `/tdd-commit` | 규율 있는 커밋 | 💾 COMMIT |

---

## 🚀 기본 워크플로우

### 방법 1: 수동 진행 (권장 - 학습용)

```bash
# 1. 실패 테스트 작성
/tdd-red

# 2. 최소 구현
/tdd-green

# 3. 리팩토링 (선택)
/tdd-refactor

# 4. 커밋
/tdd-commit

# 5. 다음 테스트로 반복
/tdd-red
```

### 방법 2: 자동 사이클 (권장 - 생산성)

```bash
# 전체 사이클 시작
/tdd-cycle

# 각 단계마다 "실행" 입력
User: 실행  # RED → GREEN
User: 실행  # GREEN → REFACTOR
User: 커밋  # REFACTOR → COMMIT
```

---

## 💡 실전 예제

### 예제 1: 페이지네이션 기능 구현

#### Step 1: RED - 첫 번째 테스트

```bash
/tdd-red
```

**Output**:
```
🔴 RED Phase

📝 Test written: "페이지 로드 시 첫 페이지 표시"

test("페이지 로드 시 첫 페이지 표시", async ({ page }) => {
  await page.goto("/diaries");
  const pagination = page.locator("[data-testid='pagination-page-1']");
  await expect(pagination).toHaveClass(/active/);
});

❌ FAIL: element not found
```

#### Step 2: GREEN - 최소 구현

```bash
/tdd-green
```

**Output**:
```
🟢 GREEN Phase

✅ Implementation:
- Added: const [currentPage] = useState(1);
- Added: <div data-testid={`pagination-page-${currentPage}`} className="active">

✅ PASS: All tests passing (16/16)
```

#### Step 3: COMMIT

```bash
/tdd-commit
```

**Output**:
```
💾 COMMIT SUCCESSFUL

Type: Behavioral
Message: feat: 페이지네이션 첫 페이지 기본 표시 기능 구현
```

#### Step 4: RED - 다음 테스트

```bash
/tdd-red
```

**Output**:
```
🔴 RED Phase

📝 Test written: "한 페이지에 12개 카드 표시"

test("한 페이지에 12개 카드 표시", async ({ page }) => {
  await page.goto("/diaries");
  const cards = page.locator("[data-testid^='diary-card-']");
  await expect(cards).toHaveCount(12);
});

❌ FAIL: Expected 12, received 36
```

#### Step 5: GREEN

```bash
/tdd-green
```

**Output**:
```
🟢 GREEN Phase

✅ Implementation:
- Added: const paginatedDiaries = diaries.slice(0, 12);

✅ PASS: All tests passing (17/17)
```

#### Step 6: REFACTOR - 상수 추출

```bash
/tdd-refactor
```

**Output**:
```
♻️ REFACTOR Phase

🔍 Code smell: Magic number 12

Refactoring: Extract Constant
- Added: const ITEMS_PER_PAGE = 12;
- Changed: diaries.slice(0, ITEMS_PER_PAGE)

✅ PASS: All tests passing (17/17)
```

#### Step 7: COMMIT (구조적 + 동작적 분리)

```bash
/tdd-commit
```

**Output**:
```
💾 COMMITS CREATED

1. refactor: extract ITEMS_PER_PAGE constant
2. feat: 페이지네이션 12개 단위 표시 기능 구현
```

---

## 📐 Tidy First 원칙

Kent Beck의 "Tidy First"는 변경을 두 가지 유형으로 분리합니다:

### 구조적 변경 (Structural)

**특징**:
- 동작을 변경하지 않음
- 코드 재배열만
- `refactor:` 커밋 메시지

**예시**:
- 변수/함수 이름 변경
- 메서드 추출
- 코드 이동
- 중복 제거

**커밋 예시**:
```bash
refactor: 함수명 변경으로 의도 명확화
refactor: 중복 코드 제거
refactor: 메서드 추출로 가독성 개선
```

### 동작적 변경 (Behavioral)

**특징**:
- 실제 기능 추가/수정
- 사용자에게 보이는 변경
- `feat:` 또는 `fix:` 커밋 메시지

**예시**:
- 새로운 기능 추가
- 버그 수정
- API 변경

**커밋 예시**:
```bash
feat: 페이지네이션 기능 추가
fix: 검색 결과 필터링 버그 수정
```

### 분리 원칙

- ❌ 동일한 커밋에 구조적 + 동작적 변경 혼합
- ✅ 구조적 변경 먼저, 동작적 변경은 나중에
- ✅ 각각 별도 커밋

**올바른 커밋 순서**:
```bash
# 1. 구조적 변경
git commit -m "refactor: extract ITEMS_PER_PAGE constant"

# 2. 동작적 변경
git commit -m "feat: implement page change functionality"
```

---

## ✅ Constitution 준수

TDD는 OSM RFQ Constitution의 **핵심 원칙**입니다.

### Constitution 요구사항

```markdown
## II. Test-Driven Development (NON-NEGOTIABLE)

모든 기능은 테스트 우선으로 개발되어야 합니다.

- E2E 테스트: Playwright로 핵심 사용자 플로우 커버
- 컴포넌트 테스트: Storybook으로 모든 컴포넌트 문서화
- 테스트 커버리지: 80% 이상 유지
- TDD 사이클: Red → Green → Refactor 엄격히 준수
- 테스트 없이 PR 머지 불가
```

### TDD + Constitution 체크리스트

**RED Phase**:
- [ ] Playwright E2E 테스트 작성
- [ ] TypeScript strict 모드로 작성
- [ ] 명확한 테스트 이름 (한글 또는 영문)
- [ ] `data-testid` 사용 (신뢰성)

**GREEN Phase**:
- [ ] 디자인 토큰 사용 (UI 컴포넌트)
- [ ] TypeScript 타입 명시
- [ ] 50줄 이하 컴포넌트 유지
- [ ] Props interface 정의

**REFACTOR Phase**:
- [ ] 디자인 시스템 일관성 유지
- [ ] 타입 안정성 유지
- [ ] 접근성 (a11y) 고려

**COMMIT Phase**:
- [ ] `npm run build` 성공
- [ ] `npm run lint` 에러 0개
- [ ] `npm test:e2e` 통과
- [ ] TypeScript 컴파일 에러 0개

---

## 📊 상태 확인

언제든지 현재 TDD 상태를 확인할 수 있습니다:

```bash
/tdd-status
```

**Output 예시**:
```
📊 TDD STATUS REPORT

🧪 Tests: 18/19 passing (94.7%)
📋 Progress: 8 completed, 4 remaining
🎯 Current Phase: RED

⚠️  Issues:
- 1 test failing: "페이지 번호 클릭 시 해당 페이지로 이동"

💡 Next Step: Run /tdd-green to implement
```

---

## 🎯 Best Practices

### 1. 작은 단계로 진행

**❌ Bad**:
```typescript
test("페이지네이션 전체 기능", async ({ page }) => {
  // 50줄의 복잡한 테스트
});
```

**✅ Good**:
```typescript
test("페이지 로드 시 첫 페이지 표시", ...);
test("한 페이지에 12개 카드 표시", ...);
test("페이지 번호 클릭 시 해당 페이지로 이동", ...);
```

### 2. 최소 구현

**❌ Bad** (과도한 설계):
```typescript
const usePagination = (diaries, options) => {
  const { itemsPerPage = 12, enableInfiniteScroll, cacheStrategy } = options;
  // 100 lines of complex logic...
};
```

**✅ Good** (최소 구현):
```typescript
const paginatedDiaries = diaries.slice(0, 12);
```

### 3. 명확한 테스트 이름

**❌ Bad**:
```typescript
test("test1", ...);
test("pagination works", ...);
```

**✅ Good**:
```typescript
test("페이지 로드 시 첫 페이지가 활성화 상태로 표시됨", ...);
test("한 페이지에 정확히 12개의 일기 카드가 표시됨", ...);
```

### 4. 자주 커밋

**❌ Bad**:
```bash
# 하루 종일 작업 후 한 번에 커밋
git commit -m "오늘 작업 내용"
```

**✅ Good**:
```bash
# 작은 단위로 자주 커밋
/tdd-commit  # feat: 첫 페이지 표시
/tdd-commit  # feat: 12개 단위 표시
/tdd-commit  # refactor: 상수 추출
/tdd-commit  # feat: 페이지 변경 기능
```

---

## 🔗 관련 가이드

- [Spec Kit 가이드](/docs/frontend/speckit-guide.md) - 명세 기반 개발
- [Claude Skills 가이드](/docs/frontend/claude-skills-guide.md) - Skills 활용
- [Constitution](/.specify/memory/constitution.md) - 프로젝트 원칙

---

## 📚 참고 자료

### Kent Beck의 TDD 원칙

1. **작은 단계로**: 한 번에 하나의 작은 기능만
2. **테스트 먼저**: 구현 전에 테스트 작성
3. **최소 구현**: 테스트를 통과할 만큼만
4. **자주 리팩토링**: 중복 제거, 명확성 개선
5. **빠른 피드백**: 테스트를 자주 실행

### Tidy First 원칙

1. **분리**: 구조적 변경과 동작적 변경 분리
2. **구조 먼저**: 구조적 변경을 먼저 수행
3. **작은 커밋**: 각 변경은 별도 커밋
4. **테스트 유지**: 변경 전후 테스트 통과

---

## 🎉 요약

### TDD 치트시트

```
기본 워크플로우:
/tdd-red → /tdd-green → /tdd-refactor → /tdd-commit → 반복

자동 워크플로우:
/tdd-cycle → "실행" → "실행" → "커밋" → 반복

상태 확인:
/tdd-status
```

### 핵심 원칙

1. ✅ Red → Green → Refactor 순서 준수
2. ✅ 작은 단계로 진행
3. ✅ 테스트 먼저, 구현 나중
4. ✅ 최소 구현
5. ✅ 자주 리팩토링
6. ✅ 구조적/동작적 변경 분리
7. ✅ 작고 자주 커밋

**OSM RFQ 프로젝트에서 TDD는 NON-NEGOTIABLE입니다!** 🚀

---

**작성일**: 2025-11-18
**버전**: 1.0.0
**관련 문서**: [Constitution](/.specify/memory/constitution.md), [Spec Kit 가이드](/docs/frontend/speckit-guide.md)
