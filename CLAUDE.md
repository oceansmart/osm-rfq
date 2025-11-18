# OSM RFQ Project Guide

This file provides essential context for working with the OSM RFQ codebase.

## Project Overview

OSM RFQ is a Request for Quotation Management System built as a monorepo with:
- **Frontend**: Next.js 14.2.33 with App Router, TypeScript, Tailwind CSS
- **Backend**: Planned (placeholder structure exists)
- **Unified Documentation**: MkDocs Material theme serving both frontend and backend docs

## Commonly Used Commands

### Frontend Development (run from `/frontend` directory)
```bash
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint
npm run storybook        # Component documentation (localhost:6006)
npm test:e2e             # Playwright E2E tests
npm test:e2e:ui          # Playwright UI mode
```

### Documentation (run from root `/` or `/frontend` directory)
```bash
npm run docs:serve       # Start MkDocs server (localhost:8000)
npm run docs:build       # Build static documentation
npm run docs:validate    # Validate documentation links
```

### Figma Design Tokens (run from `/frontend` directory)
```bash
npm run figma:create-primitive    # Create primitive token collection
npm run figma:update-primitive    # Update primitive variables
```

### Spec Kit CLI (run from root `/` directory)
```bash
specify --help           # Show all available commands
specify version          # Show version info
specify check            # Check installed tools
```

## High-Level Architecture

### Monorepo Structure with Unified Documentation

The project uses a monorepo structure where documentation is centralized at the root level:

```
osm-rfq/
├── docs/                    # Root-level documentation
│   ├── frontend/           # Frontend-specific docs
│   └── backend/            # Backend-specific docs
├── frontend/               # Next.js application
│   └── package.json        # docs scripts delegate to root
├── backend/                # Future backend implementation
├── mkdocs.yml              # Unified documentation config
└── package.json            # Root scripts for documentation
```

**Key Insight**: The frontend `package.json` scripts for documentation (`docs:serve`, `docs:build`, etc.) execute `cd .. && npm run docs:*` to use the root-level documentation server. This allows both frontend and backend to share a single documentation system.

### CSS Variables-Based Design Token System

The design system uses a two-layer token architecture:

1. **Primitive Tokens** ([globals.css:1-100](/frontend/src/app/globals.css#L1-L100))
   - Base color values (e.g., `--blue-60: #3A5CF3`)
   - Typography scales (e.g., `--typo-headline01-font-size: 48px`)
   - Spacing values

2. **Semantic Tokens** ([globals.css:100-150](/frontend/src/app/globals.css#L100-L150))
   - Mapped to primitives (e.g., `--color-primary: var(--blue-60)`)
   - Dark mode overrides via `@media (prefers-color-scheme: dark)`
   - Context-specific meanings (primary, secondary, error, success)

**Token Flow**: Figma Tokens Studio → JSON files (`figma-tokens/*.json`) → CSS Variables (`globals.css`) → Tailwind config → Components

### Next.js App Router Architecture

The frontend uses Next.js 14 App Router with a specific directory structure:

- `src/app/` - App Router pages and layouts
- `src/components/` - Reusable React components
- `src/commons/` - Shared utilities and types
- All directories are configured in [tailwind.config.ts](/frontend/tailwind.config.ts#L1-L20) for CSS scanning

**Layout Pattern** ([layout.tsx](/frontend/src/app/layout.tsx#L1-L20)):
- Root layout sets `lang="ko"` for Korean language support
- Loads global design tokens via `globals.css`
- Provides base HTML structure for all pages

### Playwright E2E Testing with Dynamic Ports

The Playwright configuration uses a unique approach for parallel testing:

```typescript
// playwright.config.ts
const agentIndex = Number(process.env.PLAYWRIGHT_AGENT_INDEX ?? 0);
const basePort = 3000 + agentIndex;
```

**Why**: Allows multiple Playwright test agents to run in parallel without port conflicts. Each agent gets its own dev server instance (3000, 3001, 3002, etc.).

Tests are located alongside source files with `*.spec.ts` naming convention.

### Storybook Component Documentation

Storybook configuration ([.storybook/main.ts](/frontend/.storybook/main.ts#L1-L30)):
- Stories located alongside components: `src/**/*.stories.@(js|jsx|ts|tsx)`
- MDX documentation support: `src/**/*.mdx`
- Next.js framework integration
- Accessibility addon (a11y) enabled by default

**Best Practice**: Every component should have a corresponding `.stories.tsx` file documenting its variants and props.

## Design System Guidelines

### Typography Utility Classes

The design system provides utility classes for consistent typography:

```css
.typo-web-headline01    /* 48px/56px - Page titles */
.typo-web-headline02    /* 40px/48px - Section titles */
.typo-web-body01        /* 16px/24px - Body text */
.typo-web-body02        /* 14px/20px - Secondary text */
```

Responsive variants exist for mobile (`typo-mobile-*`). Use these instead of custom font sizes to maintain design consistency.

### Color Usage Pattern

1. Use semantic tokens for UI elements:
   - `--color-primary` for primary actions
   - `--color-text-primary` for main text
   - `--color-background` for backgrounds

2. Avoid direct primitive token usage in components (e.g., don't use `--blue-60` directly)

3. Dark mode is automatic via CSS media queries - no manual theme switching needed

## Important File Locations

- **Design Tokens**: [frontend/figma-tokens/](/frontend/figma-tokens/)
- **Global Styles**: [frontend/src/app/globals.css](/frontend/src/app/globals.css)
- **Documentation Config**: [mkdocs.yml](/mkdocs.yml)
- **Frontend Docs**: [docs/frontend/](/docs/frontend/)
- **E2E Tests**: `frontend/src/**/*.spec.ts`
- **Component Stories**: `frontend/src/**/*.stories.tsx`
- **Constitution**: [.specify/memory/constitution.md](/.specify/memory/constitution.md)
- **Spec Templates**: [.specify/templates/](/.specify/templates/)
- **Spec Kit Commands**: [.claude/commands/](/.claude/commands/)
- **Claude Skills**: [.claude/skills/](/.claude/skills/) (프로젝트 커스텀 스킬)
- **Skills Guide**: [docs/frontend/claude-skills-guide.md](/docs/frontend/claude-skills-guide.md)
- **TDD Commands**: [.claude/commands/tdd.*.md](/.claude/commands/) (TDD Slash 명령어)
- **Feature Specs**: `specs/` (생성될 디렉토리)

## Development Workflow

### Traditional Development

1. **Starting Development**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Component Development**:
   - Create component in `src/components/`
   - Create `.stories.tsx` for Storybook
   - Use design token utility classes
   - Run `npm run storybook` to preview

3. **Documentation Updates**:
   - Edit files in `docs/frontend/` or `docs/backend/`
   - Run `npm run docs:serve` from root or frontend directory
   - Validate with `npm run docs:validate`

4. **Design Token Updates**:
   - Update tokens in Figma Tokens Studio
   - Export to `figma-tokens/*.json`
   - Update `globals.css` if needed
   - Run `npm run figma:update-primitive` to sync

### Spec-Driven Development (Recommended)

**새 기능 개발 시 Spec Kit 워크플로우를 따르세요:**

1. **Constitution** (프로젝트 최초 1회):
   ```bash
   /speckit.constitution
   ```
   - 프로젝트 원칙 및 가이드라인 수립
   - [.specify/memory/constitution.md](/.specify/memory/constitution.md) 생성됨

2. **Specify** (새 기능 시작 시):
   ```bash
   /speckit.specify [기능 설명]
   ```
   - 자연어 기능 설명을 구조화된 명세서로 변환
   - `specs/001-feature-name/spec.md` 생성
   - 기능별 브랜치 자동 생성 (`001-feature-name`)

3. **Clarify** (선택사항, 권장):
   ```bash
   /speckit.clarify
   ```
   - 명세서의 불명확한 부분 식별
   - 엣지 케이스 및 제약 조건 검증

4. **Plan** (구현 계획):
   ```bash
   /speckit.plan [기술 스택 및 아키텍처]
   ```
   - `plan.md`, `data-model.md`, `api.json` 생성
   - Constitution 준수 확인

5. **Tasks** (작업 분해):
   ```bash
   /speckit.tasks
   ```
   - `tasks.md` 생성 (의존성 순서로 정렬된 작업 목록)
   - 체크리스트로 활용

6. **Implement** (TDD 구현):
   ```bash
   # tasks.md의 테스트 시나리오를 TDD로 구현
   /tdd-cycle    # 자동 사이클 (권장)
   # 또는
   /tdd-red      # 테스트 작성
   /tdd-green    # 최소 구현
   /tdd-refactor # 리팩토링
   /tdd-commit   # 커밋
   ```
   - tasks.md의 테스트 시나리오 기반 TDD
   - Red-Green-Refactor 사이클 엄수
   - Constitution 원칙 준수

7. **Ship** (배포):
   ```bash
   git add .
   git commit -m "feat: [feature description]"
   git push origin 001-feature-name
   gh pr create
   ```

### Spec Kit 추가 명령어

- `/speckit.analyze` - 명세서 일관성 검증 (tasks 후, implement 전)
- `/speckit.checklist` - 품질 체크리스트 생성 (plan 후)

### Claude Skills Usage

**Claude Skills**는 도메인별 작업을 자동화하는 모듈형 기능입니다.

#### 사용 가능한 공식 Skills

```bash
/skill frontend-design      # 프론트엔드 UI 디자인
/skill mcp-builder          # MCP 서버 생성
/skill skill-creator        # 커스텀 스킬 생성 도구
/skill canvas-design        # PNG/PDF 디자인 생성
```

#### Skills vs Spec Kit

| 구분 | Spec Kit | Claude Skills |
|------|----------|---------------|
| **용도** | 프로젝트 워크플로우 | 도메인별 작업 자동화 |
| **위치** | `.claude/commands/` | `.claude/skills/` |
| **예시** | `/speckit.specify` | `/skill frontend-design` |

#### 함께 사용하기

```bash
# 1. Spec Kit으로 기능 명세
/speckit.specify "사용자 카드 컴포넌트 구현"

# 2. Skills로 UI 디자인
/skill frontend-design
"UserCard 컴포넌트를 디자인해줘"

# 3. Spec Kit으로 작업 관리
/speckit.tasks
```

자세한 내용은 다음 가이드를 참조하세요:

- [TDD 가이드](/docs/frontend/tdd-guide.md) - Kent Beck의 TDD 원칙 및 Slash 명령어
- [Spec Kit 가이드](/docs/frontend/speckit-guide.md) - 명세 기반 개발 워크플로우
- [Claude Skills 가이드](/docs/frontend/claude-skills-guide.md) - Skills 활용법

## Git Repository

- **Remote**: https://github.com/oceansmart/osm-rfq.git
- **Main Branch**: `main`
- **Excluded**: `reference/` directory (contains reference project, excluded to avoid embedded git repository issues)

## State Management

- **Server State**: TanStack Query (React Query) for API data fetching and caching
- **Forms**: React Hook Form + Zod for validation
- **Theme**: next-themes for dark mode support

## Dependencies to Know

- **Next.js 14.2.33**: App Router only, not Pages Router
- **TypeScript 5**: Strict mode enabled
- **Tailwind CSS 3.4.1**: Configured with CSS Variables extension
- **Storybook 9.1.13**: Latest version with Vitest integration
- **Playwright**: E2E testing framework

## Avoiding Common Pitfalls

1. **Don't run documentation commands from frontend directory expecting local server**: The frontend `docs:*` scripts delegate to root level. Always be aware you're running the unified documentation server.

2. **Don't use arbitrary Tailwind values for typography**: Use the predefined `.typo-*` utility classes to maintain design system consistency.

3. **Don't modify globals.css without updating Figma tokens**: The CSS Variables should be synchronized with Figma token JSON files.

4. **Don't forget to update Storybook stories**: Component changes should be reflected in their corresponding `.stories.tsx` files.

5. **Don't commit the reference/ directory**: It's excluded in `.gitignore` to prevent embedded git repository issues.

6. **Don't skip the Constitution**: Always reference [.specify/memory/constitution.md](/.specify/memory/constitution.md) before implementing features. It defines the project's core principles and quality standards.

7. **Don't implement without specs**: Use Spec Kit workflow (`/speckit.specify`) for all non-trivial features. This ensures clear requirements and prevents scope creep.
