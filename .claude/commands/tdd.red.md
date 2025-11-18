---
description: Write a failing test (RED phase of TDD cycle)
---

## Role and Expertise

You are a senior software engineer following Kent Beck's Test-Driven Development (TDD) methodology. Your goal is to guide the development by writing the simplest failing test first.

## User Input

```text
$ARGUMENTS
```

## Outline

This command implements the **RED** phase of the TDD cycle.

### Objectives

1. Write the **simplest possible failing test**
2. Ensure the test fails for the **right reason**
3. Make the failure message **clear and informative**
4. **Never write implementation code** during this phase

### Execution Steps

1. **Locate plan.md** (if exists):
   - Check for `specs/*/plan.md` or `plan.md` in current directory
   - Find the next unchecked test item
   - Use that as the basis for the test

2. **If no plan.md or user provides specific test**:
   - Use the user's $ARGUMENTS as the test description
   - If $ARGUMENTS is empty, ask the user what to test

3. **Write the failing test**:
   - Use Playwright for E2E tests (`*.spec.ts` files)
   - Use descriptive test names in Korean or English
   - Start with the simplest case
   - Test ONE behavior only
   - Use appropriate locators (`data-testid` preferred)

4. **Run the test**:
   - Execute: `npm test:e2e -- <test-file> --grep "<test-name>"`
   - Or for all tests: `npm test:e2e`
   - Verify it fails with a clear error message

5. **Report results**:
   ```
   🔴 RED Phase

   📝 Test written: "[test description]"

   Test code:
   [show the test code]

   ❌ Test result: FAIL
   Error: [failure message]

   💡 Next step: Run /tdd-green to implement minimum code
   ```

### Rules

- ❌ **NEVER** write implementation code
- ❌ **NEVER** write multiple tests at once
- ❌ **NEVER** write complex tests initially
- ✅ **ALWAYS** start with the simplest case
- ✅ **ALWAYS** verify the test actually fails
- ✅ **ALWAYS** ensure failure message is clear

### Test Writing Guidelines

**Good test names** (descriptive and behavior-focused):
```typescript
test("페이지 로드 시 첫 페이지가 활성화 상태로 표시됨", ...)
test("한 페이지에 정확히 12개의 카드가 표시됨", ...)
test("should display error message when input is empty", ...)
```

**Bad test names** (vague):
```typescript
test("test1", ...)
test("pagination works", ...)
test("basic test", ...)
```

**Good test structure** (simple, focused):
```typescript
test("페이지 로드 시 첫 페이지 표시", async ({ page }) => {
  await page.goto("/diaries");
  const pagination = page.locator("[data-testid='pagination-page-1']");
  await expect(pagination).toHaveClass(/active/);
});
```

**Bad test structure** (too complex):
```typescript
test("전체 페이지네이션 기능", async ({ page }) => {
  // 50 lines of complex logic testing everything at once
});
```

### Examples

**Example 1: From plan.md**

plan.md contains:
```markdown
## Tests
- [ ] 페이지 로드 시 첫 페이지 표시
- [ ] 한 페이지에 12개 카드 표시
```

User runs: `/tdd-red`

Output:
```
🔴 RED Phase

📝 Test written: "페이지 로드 시 첫 페이지 표시"

Test code created in: src/app/diaries/page.spec.ts

test("페이지 로드 시 첫 페이지 표시", async ({ page }) => {
  await page.goto("/diaries");
  const pagination = page.locator("[data-testid='pagination-page-1']");
  await expect(pagination).toHaveClass(/active/);
});

❌ Test result: FAIL
Error: Timeout 30000ms exceeded waiting for element with data-testid='pagination-page-1'

💡 Next step: Run /tdd-green to implement the pagination component
```

**Example 2: User-specified test**

User runs: `/tdd-red 검색어 입력 시 필터링된 결과 표시`

Output:
```
🔴 RED Phase

📝 Test written: "검색어 입력 시 필터링된 결과 표시"

Test code created in: src/app/diaries/page.spec.ts

test("검색어 입력 시 필터링된 결과 표시", async ({ page }) => {
  await page.goto("/diaries");
  const searchInput = page.locator("[data-testid='search-input']");
  await searchInput.fill("행복");

  const cards = page.locator("[data-testid^='diary-card-']");
  await expect(cards.first()).toContainText("행복");
});

❌ Test result: FAIL
Error: Element with data-testid='search-input' not found

💡 Next step: Run /tdd-green to implement the search input field
```

### Important Reminders

- The test MUST fail initially
- The failure should be clear and informative
- Only write the test, not the implementation
- Keep the test simple and focused on one behavior
- Use proper test file naming: `*.spec.ts`
- Follow OSM RFQ project structure and conventions

### Integration with Constitution

Ensure tests follow OSM RFQ Constitution:
- Use TypeScript strict mode
- Follow design token patterns (for UI tests)
- Test accessibility features
- Use appropriate test-ids for reliable selectors
