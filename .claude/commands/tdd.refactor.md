---
description: Improve code structure without changing behavior (REFACTOR phase of TDD cycle)
---

## Role and Expertise

You are a senior software engineer following Kent Beck's Test-Driven Development (TDD) and "Tidy First" principles. Your goal is to improve code structure while maintaining all tests in a passing state.

## User Input

```text
$ARGUMENTS
```

## Outline

This command implements the **REFACTOR** phase of the TDD cycle and follows Kent Beck's **Tidy First** approach.

### Objectives

1. Improve code structure **without changing behavior**
2. Perform **one refactoring at a time**
3. **Run tests after each change**
4. Focus on **removing duplication** and **improving clarity**

### Execution Steps

1. **Verify all tests pass**:
   - Run: `npm test:e2e`
   - Only proceed if all tests are GREEN
   - If any test fails, STOP and fix it first

2. **Identify code smells**:
   - Duplication
   - Unclear names
   - Long functions (>20 lines)
   - Magic numbers
   - Complex conditionals
   - Mixed concerns

3. **Choose ONE refactoring**:
   - Select the most impactful improvement
   - Use established refactoring patterns
   - Keep it small and focused

4. **Apply the refactoring**:
   - Make the structural change
   - Do not change behavior
   - Run tests immediately after

5. **Report results**:
   ```
   ♻️  REFACTOR Phase

   🔍 Code smell identified: [description]

   Refactoring applied: [pattern name]

   Changes made:
   - [file path]: [what was refactored]

   ✅ Test result: PASS
   All tests passing: X/X (100%)

   💡 Next step:
   - Run /tdd-refactor again if more improvements needed
   - Run /tdd-commit to commit structural changes
   - Run /tdd-red for next test
   ```

### Rules

- ❌ **NEVER** refactor when tests are failing (RED)
- ❌ **NEVER** change behavior during refactoring
- ❌ **NEVER** make multiple refactorings at once
- ✅ **ALWAYS** verify tests pass before refactoring
- ✅ **ALWAYS** run tests after each refactoring
- ✅ **ALWAYS** commit refactorings separately from behavior changes

### Common Refactoring Patterns

#### 1. Extract Constant (Remove Magic Numbers)

**Before**:
```typescript
const paginatedDiaries = diaries.slice(0, 12);
const totalPages = Math.ceil(diaries.length / 12);
```

**After**:
```typescript
const ITEMS_PER_PAGE = 12;
const paginatedDiaries = diaries.slice(0, ITEMS_PER_PAGE);
const totalPages = Math.ceil(diaries.length / ITEMS_PER_PAGE);
```

#### 2. Extract Function (Improve Clarity)

**Before**:
```typescript
const filteredDiaries = diaries.filter(d =>
  d.title.includes(keyword) || d.content.includes(keyword)
);
```

**After**:
```typescript
const matchesKeyword = (diary: Diary, keyword: string) =>
  diary.title.includes(keyword) || diary.content.includes(keyword);

const filteredDiaries = diaries.filter(d => matchesKeyword(d, keyword));
```

#### 3. Rename (Clarify Intent)

**Before**:
```typescript
const handleClick = (n: number) => {
  setCurrentPage(n);
};
```

**After**:
```typescript
const handlePageChange = (pageNumber: number) => {
  setCurrentPage(pageNumber);
};
```

#### 4. Remove Duplication

**Before**:
```typescript
// In ComponentA
const filteredDiaries = diaries.filter(d => d.title.includes(keyword));

// In ComponentB
const results = entries.filter(e => e.title.includes(searchTerm));
```

**After**:
```typescript
// In lib/filter.ts
export const filterByTitle = <T extends { title: string }>(
  items: T[],
  keyword: string
) => items.filter(item => item.title.includes(keyword));

// In ComponentA
const filteredDiaries = filterByTitle(diaries, keyword);

// In ComponentB
const results = filterByTitle(entries, searchTerm);
```

#### 5. Simplify Conditionals

**Before**:
```typescript
const isActive = currentPage === pageNumber ? true : false;
```

**After**:
```typescript
const isActive = currentPage === pageNumber;
```

### Examples

**Example 1: Extract Constant**

Current code:
```typescript
const paginatedDiaries = diaries.slice(0, 12);
const totalPages = Math.ceil(diaries.length / 12);
```

User runs: `/tdd-refactor`

Output:
```
♻️  REFACTOR Phase

🔍 Code smell identified: Magic number 12 appears multiple times

Refactoring applied: Extract Constant

Changes made:
- src/app/diaries/page.tsx:
  • Added: const ITEMS_PER_PAGE = 12;
  • Changed: diaries.slice(0, ITEMS_PER_PAGE)
  • Changed: Math.ceil(diaries.length / ITEMS_PER_PAGE)

✅ Test result: PASS
All tests passing: 18/18 (100%)

📝 This is a structural change (Tidy First principle)
   Should be committed separately from behavioral changes

💡 Next step:
- Run /tdd-commit with "refactor:" prefix
- Or run /tdd-refactor again for more improvements
```

**Example 2: Extract Function**

Current code:
```typescript
const filteredDiaries = diaries.filter(diary =>
  diary.title.toLowerCase().includes(keyword.toLowerCase()) ||
  diary.content.toLowerCase().includes(keyword.toLowerCase())
);
```

User runs: `/tdd-refactor`

Output:
```
♻️  REFACTOR Phase

🔍 Code smell identified: Complex filter logic with duplication

Refactoring applied: Extract Function

Changes made:
- src/app/diaries/page.tsx:
  • Added: const matchesKeyword = (diary: Diary, keyword: string) => {
             const lowerKeyword = keyword.toLowerCase();
             return (
               diary.title.toLowerCase().includes(lowerKeyword) ||
               diary.content.toLowerCase().includes(lowerKeyword)
             );
           };
  • Changed: const filteredDiaries = diaries.filter(d =>
               matchesKeyword(d, keyword)
             );

✅ Test result: PASS
All tests passing: 18/18 (100%)

💡 Next step:
- Run /tdd-commit with "refactor: extract keyword matching logic"
```

**Example 3: Rename for Clarity**

Current code:
```typescript
const handleClick = (n: number) => {
  setCurrentPage(n);
  fetchDiaries(n);
};
```

User runs: `/tdd-refactor 함수명 개선`

Output:
```
♻️  REFACTOR Phase

🔍 Code smell identified: Unclear function name "handleClick"

Refactoring applied: Rename Variable/Function

Changes made:
- src/app/diaries/page.tsx:
  • Renamed: handleClick → handlePageChange
  • Renamed: parameter n → pageNumber
  • Updated all call sites (3 locations)

✅ Test result: PASS
All tests passing: 18/18 (100%)

💡 Next step:
- Run /tdd-commit with "refactor: rename handleClick to handlePageChange for clarity"
```

**Example 4: No Refactoring Needed**

Current code is already clean and simple.

User runs: `/tdd-refactor`

Output:
```
♻️  REFACTOR Phase

✅ Code quality check passed

Current implementation:
- No duplication found
- All names are clear and descriptive
- Functions are appropriately sized
- No magic numbers
- No complex conditionals

🎉 No refactoring needed!

💡 Next step:
- Run /tdd-commit to commit current changes
- Run /tdd-red to write next test
```

### Tidy First Principle

Kent Beck's "Tidy First" approach separates changes into two types:

#### Structural Changes (Tidy First)
- Rename variables/functions
- Extract functions/constants
- Move code
- Remove duplication
- **Commit separately with "refactor:" prefix**

#### Behavioral Changes
- Add new features
- Fix bugs
- Change APIs
- **Commit separately with "feat:" or "fix:" prefix**

**Example commit sequence**:
```bash
# First: Structural changes
git commit -m "refactor: extract ITEMS_PER_PAGE constant"

# Then: Behavioral changes
git commit -m "feat: add page change functionality"
```

### Integration with OSM RFQ Constitution

Follow Constitution principles during refactoring:

- **Design System**: Use design tokens even in extracted utilities
- **TypeScript Strict**: Maintain proper typing during refactoring
- **Component Architecture**:
  - Keep components under 50 lines
  - Extract hooks for complex logic
  - Separate concerns

**Example refactoring following Constitution**:

```typescript
// Before: Mixed concerns, too long
export default function DiariesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const filteredDiaries = diaries.filter(/* ... */);
  const paginatedDiaries = filteredDiaries.slice(/* ... */);

  return (
    <div>
      {/* 100 lines of JSX */}
    </div>
  );
}

// After: Extracted hook, separated components
export function useDiaryPagination(diaries: Diary[], keyword: string) {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDiaries = filterByKeyword(diaries, keyword);
  const paginatedDiaries = paginate(filteredDiaries, currentPage, ITEMS_PER_PAGE);

  return { paginatedDiaries, currentPage, setCurrentPage };
}

export default function DiariesPage() {
  const [keyword, setKeyword] = useState("");
  const { paginatedDiaries, currentPage, setCurrentPage } =
    useDiaryPagination(diaries, keyword);

  return (
    <>
      <SearchInput value={keyword} onChange={setKeyword} />
      <DiaryList diaries={paginatedDiaries} />
      <Pagination current={currentPage} onChange={setCurrentPage} />
    </>
  );
}
```

### Important Reminders

- Only refactor when all tests are GREEN
- Make one refactoring at a time
- Run tests after each refactoring
- Commit structural changes separately
- Do not change behavior
- Follow Constitution principles
- Keep refactorings small and focused
