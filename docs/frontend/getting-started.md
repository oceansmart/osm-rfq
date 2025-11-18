# Frontend 시작하기

OSM RFQ Frontend 프로젝트를 시작하는 방법을 안내합니다.

## 📋 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
cd frontend
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
frontend/
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── layout.tsx  # 루트 레이아웃
│   │   ├── page.tsx    # 홈페이지
│   │   └── globals.css # 글로벌 스타일 (디자인 토큰)
│   ├── components/     # 재사용 컴포넌트
│   └── commons/        # 공통 유틸리티
├── public/             # 정적 파일
├── figma-tokens/       # Figma 디자인 토큰
└── scripts/            # 빌드/자동화 스크립트
```

## 🎨 디자인 시스템

프로젝트는 Figma Design Tokens를 사용하여 CSS Variables 기반의 디자인 시스템을 구현합니다.

- [컬러 토큰](design-system/colors.md)
- [타이포그래피](design-system/typography.md)

## 🧪 테스팅

### Storybook

컴포넌트 개발 및 문서화:

```bash
npm run storybook
```

[http://localhost:6006](http://localhost:6006)에서 Storybook이 실행됩니다.

### E2E 테스트 (Playwright)

```bash
# 헤드리스 모드
npm run test:e2e

# UI 모드
npm run test:e2e:ui

# 브라우저 표시
npm run test:e2e:headed
```

## 📝 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint 실행 |
| `npm run storybook` | Storybook 실행 |
| `npm run test:e2e` | Playwright 테스트 |
| `npm run docs:serve` | 문서 서버 실행 |

## 🔧 개발 환경 설정

### VS Code 추천 확장

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript

### 환경 변수

필요한 경우 `.env.local` 파일을 생성하여 환경 변수를 설정합니다.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📚 다음 단계

- [컴포넌트 가이드](components/index.md)
- [디자인 시스템](design-system/index.md)
- [API 연동](api/index.md)
