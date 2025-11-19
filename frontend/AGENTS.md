# Repository Guidelines

## Project Structure & Module Organization
The Next.js entry point lives in `src/app` (`layout.tsx`, `page.tsx`, and `globals.css`). Shared UI and logic sit in `src/commons`, split into `components`, `constants`, `providers`, and `utils` so that new widgets or hooks land beside their peers. Reusable helpers that do not depend on React belong in `src/utils`. Static assets go in `public/`, while design tokens synced from Specify reside in `figma-tokens/`. Design handoff scripts live in `scripts/figma/`, and AI prompt bundles stay in `prompts-libray/`.

## Build, Test, and Development Commands
- `npm run dev` – starts the Next.js dev server with hot reload.
- `npm run build` / `npm run start` – creates and serves the production bundle.
- `npm run lint` – runs `next lint` with the shared ESLint config; required before opening a PR.
- `npm run storybook` / `npm run build-storybook` – develop or statically bundle component stories.
- `npm run stagewise` – runs the Stagewise agent review harness for automated QA.
- `npm run test:e2e` (plus `:ui` or `:headed`) – executes Playwright specs defined in `src/**/*.spec.ts` using the config in `playwright.config.ts`.

## Coding Style & Naming Conventions
TypeScript with strict typings is the default; keep React components as typed functions (`const Widget = () => { ... }`). Use 2-space indentation, `PascalCase` for components/directories, and `camelCase` for helpers. Tailwind CSS powers styling—prefer utility classes over bespoke CSS and co-locate any tokens in `globals.css`. Import order should follow: external packages, absolute aliases, then relative paths. Run `npm run lint` or enable the ESLint plugin in your editor to catch deviations early.

## Testing Guidelines
End-to-end coverage relies on Playwright (`@playwright/test`); place specs near the feature under test (`src/commons/components/Button/Button.spec.ts`). Tests share the dev server spawned by the config, so avoid hard-coded ports and reference `baseURL`. Use `test.describe` blocks per flow and keep selectors tied to `data-testid` attributes for resilience. Visual or interaction regressions must also gain a Storybook story for Chromatic/Stagewise checks.

## Commit & Pull Request Guidelines
Commits follow a Conventional Commit flavor (`feat:`, `docs:`, `revert:`) as seen in `git log`. Write imperative subjects under 75 characters and group related changes together. Every PR should include: a short summary, linked Linear/Jira issue (if applicable), screenshots or recordings for UI updates, and confirmation that `npm run lint` and `npm run test:e2e` pass. Request review from an owner of the touched module and note any follow-up tasks explicitly.
