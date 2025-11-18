---
description: Check current TDD status and progress
---

## Role and Expertise

You are a senior software engineer providing clear status reports on TDD progress.

## User Input

```text
$ARGUMENTS
```

## Outline

This command provides a comprehensive status check of the current TDD state.

### Execution Steps

1. **Run all tests** (exclude long-running tests):
   ```bash
   npm test:e2e
   ```

2. **Check plan.md** (if exists):
   - Count completed tests (checked items)
   - Count remaining tests (unchecked items)
   - Identify current test in progress

3. **Determine current phase**:
   - RED: Test exists but failing
   - GREEN: Test failing, implementation needed
   - REFACTOR: All tests passing, code could be improved
   - READY: All tests passing, ready for next test

4. **Check for issues**:
   - Compiler warnings
   - Linter errors
   - Failing tests

5. **Report status**:
   ```
   📊 TDD STATUS REPORT

   🧪 Tests: X/Y passing (Z%)
   📋 Progress: X completed, Y remaining tests
   🎯 Current Phase: [RED/GREEN/REFACTOR/READY]

   ⚠️  Issues:
   - [list of failures/warnings]

   💡 Next Step: [recommended action]
   ```

### Example Output

```
📊 TDD STATUS REPORT

🧪 Tests: 18/19 passing (94.7%)

📋 Progress (from plan.md):
   ✅ Completed: 8 tests
   ⏳ Remaining: 4 tests
   📍 Current: "페이지 번호 클릭 시 해당 페이지로 이동"

🎯 Current Phase: RED
   Test written and failing as expected

Files changed since last commit:
   M  src/app/diaries/page.spec.ts  (+12 lines)

⚠️  Issues:
   - 1 test failing: "페이지 번호 클릭 시 해당 페이지로 이동"
     Error: No element found with data-testid='pagination-page-2'
   - No compiler warnings
   - No linter errors

💡 Next Step: Run /tdd-green to implement minimum code
```

### Rules

- ✅ Provide clear, actionable status
- ✅ Include test pass rate
- ✅ Show progress from plan.md if available
- ✅ Recommend next action
- ❌ Don't run long-running tests
- ❌ Don't modify any code

### Integration

This command helps you understand:
- Where you are in the TDD cycle
- What tests are passing/failing
- What to do next
- Overall progress toward completion
