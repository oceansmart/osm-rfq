---
description: Implement minimum code to pass the test (GREEN phase of TDD cycle)
---

## Role and Expertise

You are a senior software engineer following Kent Beck's Test-Driven Development (TDD) methodology. Your goal is to implement the **minimum code** necessary to make the failing test pass.

## User Input

```text
$ARGUMENTS
```

## Outline

This command implements the **GREEN** phase of the TDD cycle.

### Objectives

1. Implement **only enough code** to make the current failing test pass
2. **No premature optimization** or over-engineering
3. **No anticipating future requirements**
4. Verify **all tests pass** after implementation

### Execution Steps

1. **Identify the failing test**:
   - Run tests to find the current failing test
   - Read the test to understand what needs to be implemented
   - Identify the simplest solution

2. **Implement minimum code**:
   - Write the simplest code that makes the test pass
   - Hardcoding is acceptable if it passes the test
   - Don't add extra features "just in case"
   - Follow OSM RFQ project structure and Constitution

3. **Run all tests**:
   - Execute: `npm test:e2e`
   - Verify the previously failing test now passes
   - Ensure no other tests were broken

4. **Report results**:
   ```
   🟢 GREEN Phase

   ✅ Implementation: [brief description]

   Changes made:
   - [file path]: [what was added/changed]

   ✅ Test result: PASS
   All tests passing: X/X (100%)

   💡 Next step:
   - Run /tdd-refactor if code needs improvement
   - Run /tdd-commit to commit changes
   - Run /tdd-red for next test
   ```

### Rules

- ❌ **NEVER** implement more than needed for current test
- ❌ **NEVER** anticipate future requirements
- ❌ **NEVER** over-engineer the solution
- ✅ **ALWAYS** implement the simplest solution
- ✅ **ALWAYS** verify all tests pass
- ✅ **ALWAYS** check no existing tests broke

### Implementation Guidelines

**Good implementation** (minimum, focused):
```typescript
// Test: "페이지 로드 시 첫 페이지 표시"
// Minimum implementation:
const [currentPage, setCurrentPage] = useState(1);

return (
  <div data-testid={`pagination-page-${currentPage}`} className="active">
    {currentPage}
  </div>
);
```

**Bad implementation** (over-engineered):
```typescript
// Too much! Not needed for current test
const usePagination = (items, options) => {
  const {
    itemsPerPage = 12,
    enableInfiniteScroll,
    cacheStrategy,
    lazyLoading
  } = options;
  // 100 lines of complex logic...
};
```

**Good implementation** (even hardcoding is OK initially):
```typescript
// Test: "한 페이지에 12개 카드 표시"
// Simplest implementation (can be refined later):
const paginatedDiaries = diaries.slice(0, 12);
```

**Bad implementation** (premature abstraction):
```typescript
// Not needed yet!
const ITEMS_PER_PAGE = 12;
const calculatePagination = (items, page, perPage) => {
  // Complex calculation logic...
};
```

### Examples

**Example 1: Simple state implementation**

Failing test:
```typescript
test("페이지 로드 시 첫 페이지 표시", async ({ page }) => {
  await page.goto("/diaries");
  const pagination = page.locator("[data-testid='pagination-page-1']");
  await expect(pagination).toHaveClass(/active/);
});
```

User runs: `/tdd-green`

Output:
```
🟢 GREEN Phase

✅ Implementation: Added currentPage state with default value 1

Changes made:
- src/app/diaries/page.tsx:
  • Added: const [currentPage, setCurrentPage] = useState(1);
  • Added: <div data-testid={`pagination-page-${currentPage}`} className="active">
             {currentPage}
           </div>

✅ Test result: PASS
Test "페이지 로드 시 첫 페이지 표시" now passes
All tests passing: 16/16 (100%)

💡 Next step:
- No refactoring needed (code is simple)
- Run /tdd-commit to commit this change
- Run /tdd-red to write next test
```

**Example 2: Simple filtering logic**

Failing test:
```typescript
test("검색어 입력 시 필터링된 결과 표시", async ({ page }) => {
  await page.goto("/diaries");
  const searchInput = page.locator("[data-testid='search-input']");
  await searchInput.fill("행복");

  const cards = page.locator("[data-testid^='diary-card-']");
  await expect(cards.first()).toContainText("행복");
});
```

User runs: `/tdd-green`

Output:
```
🟢 GREEN Phase

✅ Implementation: Added search input and basic title filtering

Changes made:
- src/app/diaries/page.tsx:
  • Added: const [searchKeyword, setSearchKeyword] = useState("");
  • Added: <input
             data-testid="search-input"
             value={searchKeyword}
             onChange={(e) => setSearchKeyword(e.target.value)}
           />
  • Added: const filteredDiaries = diaries.filter(d =>
             d.title.includes(searchKeyword)
           );

✅ Test result: PASS
Test "검색어 입력 시 필터링된 결과 표시" now passes
All tests passing: 17/17 (100%)

💡 Next step:
- Run /tdd-refactor to extract filter logic (optional)
- Run /tdd-commit to commit this change
```

**Example 3: Hardcoding is acceptable**

Failing test:
```typescript
test("총 페이지 수가 3으로 표시됨", async ({ page }) => {
  await page.goto("/diaries");
  const totalPages = page.locator("[data-testid='total-pages']");
  await expect(totalPages).toHaveText("3");
});
```

User runs: `/tdd-green`

Output:
```
🟢 GREEN Phase

✅ Implementation: Hardcoded total pages (can be generalized later)

Changes made:
- src/app/diaries/page.tsx:
  • Added: <span data-testid="total-pages">3</span>

✅ Test result: PASS
Test "총 페이지 수가 3으로 표시됨" now passes
All tests passing: 18/18 (100%)

⚠️  Note: Hardcoded value. Will be generalized when more tests require it.

💡 Next step:
- Run /tdd-commit to commit this change
- Run /tdd-red to write test for dynamic calculation
```

### Integration with OSM RFQ Constitution

Ensure implementation follows Constitution principles:

- **Design System Consistency**:
  - Use CSS Variables for colors: `var(--color-primary)`
  - Use typography utilities: `.typo-web-body01`
  - Follow Tailwind + CSS Variables pattern

- **TypeScript Strict Mode**:
  - Properly type all variables and functions
  - No `any` types
  - Define interfaces for props

- **Component Architecture**:
  - Keep components under 50 lines when possible
  - Prefer composition over inheritance
  - Separate business logic from UI

**Example with Constitution compliance**:
```typescript
// Good: Follows Constitution
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          data-testid={`pagination-page-${i + 1}`}
          className={`typo-web-body02 ${
            currentPage === i + 1
              ? 'bg-[var(--color-primary)]'
              : 'bg-[var(--color-background)]'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
```

### Important Reminders

- Implement ONLY what's needed for the current test
- Hardcoding is acceptable if it makes the test pass
- Generalize only when you have multiple tests requiring it
- All tests must pass before moving to refactor phase
- Follow Constitution principles even in minimum implementation
- Keep implementation simple and readable
