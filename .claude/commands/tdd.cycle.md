---
description: Run complete RED → GREEN → REFACTOR cycle automatically
---

## Role and Expertise

You are a senior software engineer following Kent Beck's TDD methodology. This command automates the complete TDD cycle with user confirmation at each step.

## User Input

```text
$ARGUMENTS
```

## Outline

This command runs the full **RED → GREEN → REFACTOR** cycle with user interaction.

### Execution Flow

```
🔴 RED → [user: "실행"] → 🟢 GREEN → [user: "실행"] → ♻️ REFACTOR → [user: "커밋"]
```

### Steps

1. **Find next test from plan.md** (or use $ARGUMENTS)
2. **RED Phase**:
   - Write failing test
   - Run and verify failure
   - Report: `🔴 Test written. Type "실행" to implement.`
   - **WAIT for user confirmation**

3. **GREEN Phase** (after user types "실행"):
   - Implement minimum code
   - Run all tests
   - Report: `🟢 Implementation complete. Type "실행" to refactor or "커밋" to commit.`
   - **WAIT for user confirmation**

4. **REFACTOR Phase** (after user types "실행"):
   - Identify code smells
   - Apply one refactoring
   - Run tests
   - Report: `♻️ Refactored. Type "커밋" to commit.`
   - **WAIT for user confirmation**

5. **COMMIT** (after user types "커밋"):
   - Run /tdd-commit
   - Commit with appropriate message
   - Report: `💾 Committed. Run /tdd-cycle for next test.`

### Rules

- ✅ **ALWAYS** wait for user confirmation between phases
- ✅ **ALWAYS** allow skipping refactor if not needed
- ❌ **NEVER** proceed without user input
- ❌ **NEVER** combine multiple phases automatically

### Example Session

```
User: /tdd-cycle

Claude:
📋 Next test from plan.md: "페이지 번호 클릭 시 해당 페이지로 이동"

🔴 RED Phase

test("페이지 번호 클릭 시 해당 페이지로 이동", async ({ page }) => {
  await page.goto("/diaries");
  await page.click("[data-testid='pagination-page-2']");
  const activePage = page.locator(".active");
  await expect(activePage).toHaveText("2");
});

❌ FAIL: No element found with data-testid='pagination-page-2'

Type "실행" to implement or "취소" to stop.

User: 실행

Claude:
🟢 GREEN Phase

Implementation:
- Added onClick handler to page buttons
- setCurrentPage on click
- Applied 'active' class based on currentPage

✅ PASS: All tests passing (19/19)

Type "실행" to refactor or "커밋" to commit.

User: 실행

Claude:
♻️ REFACTOR Phase

Code smell: Inline arrow function in map
Refactoring: Extract handlePageClick function

✅ PASS: All tests passing (19/19)

Type "커밋" to commit.

User: 커밋

Claude:
💾 COMMIT

Commits created:
1. refactor: extract handlePageClick function
2. feat: implement page navigation on click

✅ Committed successfully

Run /tdd-cycle for next test.
```

### Integration with Other Commands

This command internally calls:
- `/tdd-red` for RED phase
- `/tdd-green` for GREEN phase
- `/tdd-refactor` for REFACTOR phase (optional)
- `/tdd-commit` for final commit

### Important Notes

- User can type "취소" at any point to stop
- User can skip refactor by typing "커밋" directly
- Each phase waits for explicit user confirmation
- Follows Constitution and Tidy First principles throughout
