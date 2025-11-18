---
description: Commit changes following TDD discipline and Tidy First principles
---

## Role and Expertise

You are a senior software engineer following Kent Beck's TDD and Tidy First principles for disciplined commits.

## User Input

```text
$ARGUMENTS
```

## Outline

This command ensures commits follow TDD discipline and properly separate structural from behavioral changes.

### Pre-Commit Checklist

Before committing, verify:

1. ✅ All tests pass (`npm test:e2e`)
2. ✅ No compiler warnings (`npm run build`)
3. ✅ No linter errors (`npm run lint`)
4. ✅ Changes represent a single logical unit
5. ✅ Commit type is clear (structural vs behavioral)

### Execution Steps

1. **Run pre-commit checks**:
   ```bash
   npm test:e2e
   npm run lint
   npm run build
   ```

2. **Analyze changes**:
   - Check `git diff` and `git status`
   - Determine if changes are:
     - **Structural** (refactor): No behavior change
     - **Behavioral** (feat/fix): Behavior change
   - Verify it's a single logical unit

3. **Generate commit message**:

   **For Structural Changes** (refactor):
   ```
   refactor: [brief description]

   - [detail 1]
   - [detail 2]
   ```

   **For Behavioral Changes** (feat/fix):
   ```
   feat: [brief description]

   - [detail 1]
   - [detail 2]
   - Test passing: [test name]

   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

4. **Execute commit**:
   ```bash
   git add .
   git commit -m "$(cat <<'EOF'
   [commit message here]
   EOF
   )"
   ```

5. **Report completion**:
   ```
   💾 COMMIT SUCCESSFUL

   Type: [structural/behavioral]
   Hash: [commit hash]
   Message: [first line]

   💡 Next step: Run /tdd-red for next test
   ```

### Commit Type Guidelines

#### Structural Changes (Tidy First)

Use `refactor:` prefix for:
- Renaming variables/functions
- Extracting functions/constants
- Moving code
- Removing duplication
- Simplifying conditionals
- **NO behavior change**

**Examples**:
```bash
refactor: extract ITEMS_PER_PAGE constant
refactor: rename handleClick to handlePageChange
refactor: extract keyword matching logic
```

#### Behavioral Changes

Use appropriate prefix:
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding tests only

**Examples**:
```bash
feat: implement page navigation on click
fix: search filter now matches titles only
test: add pagination edge cases
```

### Rules

- ❌ **NEVER** commit with failing tests
- ❌ **NEVER** mix structural and behavioral changes
- ❌ **NEVER** commit with compiler/linter warnings
- ✅ **ALWAYS** verify all tests pass
- ✅ **ALWAYS** use correct commit prefix
- ✅ **ALWAYS** commit small, focused changes

### Example Session

**Example 1: Structural Change**

```
User: /tdd-commit

Claude:
✅ Pre-commit Checklist
   ✅ All tests passing (19/19)
   ✅ No compiler warnings
   ✅ No linter errors
   ✅ Single logical change

🔍 Change Analysis:
   Type: Structural (refactor)
   Files: 1 changed
   - src/app/diaries/page.tsx: Extracted ITEMS_PER_PAGE constant

📝 Commit Message:
refactor: extract ITEMS_PER_PAGE constant

- Replace magic number 12 with named constant
- Improves maintainability and clarity

Execute commit? (yes/no)

User: yes

Claude:
💾 COMMIT SUCCESSFUL

Type: Structural
Hash: a1b2c3d
Message: refactor: extract ITEMS_PER_PAGE constant

💡 Next step:
- Run /tdd-red for next test
- Or run /tdd-refactor for more improvements
```

**Example 2: Behavioral Change**

```
User: /tdd-commit

Claude:
✅ Pre-commit Checklist
   ✅ All tests passing (20/20)
   ✅ No compiler warnings
   ✅ No linter errors
   ✅ Single logical change

🔍 Change Analysis:
   Type: Behavioral (feat)
   Files: 2 changed
   - src/app/diaries/page.tsx: Added onClick handler
   - src/app/diaries/page.spec.ts: New test added

📝 Commit Message:
feat: implement page navigation on click

- Add handlePageChange function
- Update active page on button click
- Test passing: "페이지 번호 클릭 시 해당 페이지로 이동"

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>

Execute commit? (yes/no)

User: yes

Claude:
💾 COMMIT SUCCESSFUL

Type: Behavioral
Hash: d4e5f6g
Message: feat: implement page navigation on click

💡 Next step: Run /tdd-red for next test
```

**Example 3: Mixed Changes (BLOCKED)**

```
User: /tdd-commit

Claude:
❌ COMMIT BLOCKED

⚠️  Mixed Changes Detected:
   - Structural: Renamed handleClick → handlePageChange
   - Behavioral: Added new onClick functionality

🔄 Tidy First Principle Violation

You must separate these into TWO commits:
1. First: Structural changes (refactor)
2. Then: Behavioral changes (feat)

Would you like me to:
A) Commit structural changes only (recommended)
B) Commit behavioral changes only
C) Cancel and manually separate changes

User: A

Claude:
💾 COMMIT SUCCESSFUL (Structural only)

Hash: g7h8i9j
Message: refactor: rename handleClick to handlePageChange

Remaining changes: Behavioral (onClick functionality)
Run /tdd-commit again to commit behavioral changes.
```

### Integration with Constitution

Ensure commits follow OSM RFQ Constitution:
- TDD required - tests must pass
- TypeScript strict - no type errors
- Code quality - linter must pass
- Small commits - focused changes

### Important Notes

- Structural and behavioral changes MUST be separate commits
- Always do structural changes first (Tidy First)
- Keep commits small and focused
- Clear, descriptive commit messages
- Run all checks before committing
