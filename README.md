# OSM RFQ

견적 요청 및 관리 시스템 (Request for Quotation Management System)

## 📋 프로젝트 개요

OSM RFQ는 견적 요청과 관리를 위한 풀스택 웹 애플리케이션입니다.

## 🏗️ 프로젝트 구조

```
osm-rfq/
├── frontend/           # Next.js 프론트엔드
├── backend/            # Backend API 서버
├── docs/               # 통합 문서
├── scripts/            # 빌드 및 자동화 스크립트
└── reference/          # 참조 프로젝트
```

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **Design System**: Figma Design Tokens
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Testing**: Playwright
- **Documentation**: Storybook 9.1.13

### Backend
- 향후 추가 예정

## 🚀 Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend 개발 서버: [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
# 향후 추가 예정
```

### 문서 서버

```bash
# 루트 디렉토리에서
npm install
npm run docs:serve
```

문서 서버: [http://localhost:8000](http://localhost:8000)

## 📚 문서

통합 문서 시스템을 통해 Frontend와 Backend 문서를 제공합니다.

- [전체 문서](http://localhost:8000) - 문서 서버 실행 후 접속
- [Frontend 문서](docs/frontend/index.md)
- [Backend 문서](docs/backend/index.md)

### 문서 작성

- Frontend 문서: `docs/frontend/`
- Backend 문서: `docs/backend/`

## 🔧 개발 스크립트

### Frontend

```bash
npm run dev              # 개발 서버
npm run build            # 프로덕션 빌드
npm run storybook        # Storybook 실행
npm run test:e2e         # E2E 테스트
```

### 문서

```bash
npm run docs:serve       # 문서 서버 실행
npm run docs:build       # 문서 빌드
npm run docs:validate    # 문서 검증
```

## 🎨 디자인 시스템

- CSS Variables 기반 디자인 토큰
- Figma Tokens Studio 통합
- Light/Dark 모드 지원
- 반응형 타이포그래피

자세한 내용은 [디자인 시스템 문서](docs/frontend/design-system/index.md)를 참조하세요.

## 🧪 테스팅

- **E2E Testing**: Playwright
- **Component Testing**: Storybook
- **Unit Testing**: 향후 추가 예정

## 📖 추가 리소스

- [프로젝트 문서](docs/index.md)
- [Frontend 시작하기](docs/frontend/getting-started.md)
- [Backend 시작하기](docs/backend/getting-started.md)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

Copyright © 2025 OSM RFQ Team

## 👥 팀

OSM RFQ Development Team
