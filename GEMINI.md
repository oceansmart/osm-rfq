# GEMINI Project Context

## Project Overview

This is a web application built with Next.js 14, TypeScript, and React. It appears to be a "RFQ" (Request for Quotation) application. The project is structured using the Next.js App Router.

The frontend is styled with Tailwind CSS. State management is handled by a combination of React's built-in Context API and TanStack/React-Query for server state. Forms are managed using React Hook Form with Zod for schema validation.

A significant emphasis is placed on testing, with a comprehensive End-to-End (E2E) testing setup using Playwright. Component-driven development is supported by Storybook.

## Building and Running

### Key Dependencies
- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI**: React 18
- **Styling**: Tailwind CSS
- **State Management**: TanStack/React-Query, React Context
- **Forms**: react-hook-form, zod
- **Testing**: Playwright (E2E), Storybook (Component)
- **Linting**: ESLint

### Commands

- **Run Development Server:**
  ```bash
  cd frontend
  npm run dev
  ```
  The application will be available at `http://localhost:3000`.

- **Build for Production:**
  ```bash
  cd frontend
  npm run build
  ```

- **Run Production Server:**
  ```bash
  cd frontend
  npm run start
  ```

- **Run E2E Tests:**
  ```bash
  cd frontend
  npm run test:e2e
  ```
  This command will automatically start the development server and run all Playwright tests.

- **Run E2E Tests with UI:**
  ```bash
  cd frontend
  npm run test:e2e:ui
  ```
  This opens the Playwright UI for a more interactive testing experience.

- **Run Storybook:**
  ```bash
  cd frontend
  npm run storybook
  ```
  The component library will be available at `http://localhost:6006`.

- **Lint Code:**
  ```bash
  cd frontend
  npm run lint
  ```

## Development Conventions

- **Project Structure**: The `frontend/src` directory is the main container for the application code.
  - `frontend/src/app`: Contains the pages and layouts for the Next.js App Router.
  - `frontend/src/commons`: Holds shared code, including reusable components (`/components`), constants (`/constants`), and global providers (`/providers`).
  - `frontend/src/components`: Contains feature-specific components.
- **Testing**: The project follows a Test-Driven Development (TDD) or Behavior-Driven Development (BDD) approach. E2E tests are written with Playwright.
- **State Management**: Global state is managed via React Context in `frontend/src/commons/providers`. Server state, caching, and data fetching are handled by React Query.
- **Styling**: Utility-first styling is done with Tailwind CSS.
- **Code Quality**: Code quality is enforced using ESLint, configured with `eslint-config-next`.
