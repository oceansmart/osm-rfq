# Backend 개요

OSM RFQ Backend 프로젝트에 오신 것을 환영합니다.

## 📋 프로젝트 소개

OSM RFQ Backend는 견적 요청 및 관리를 위한 REST API 서버입니다.

## 🛠️ 기술 스택

향후 결정될 예정입니다. 예상 기술 스택:

- **Runtime**: Node.js / Python / Go
- **Framework**: Express / FastAPI / Gin
- **Database**: PostgreSQL / MySQL / MongoDB
- **ORM**: Prisma / SQLAlchemy / GORM
- **Authentication**: JWT
- **Documentation**: OpenAPI/Swagger

## 📁 프로젝트 구조 (예상)

```
backend/
├── src/
│   ├── controllers/    # API 컨트롤러
│   ├── services/       # 비즈니스 로직
│   ├── models/         # 데이터 모델
│   ├── routes/         # API 라우트
│   └── utils/          # 유틸리티 함수
├── tests/              # 테스트 파일
├── migrations/         # 데이터베이스 마이그레이션
└── docs/               # API 문서
```

## 🚀 주요 기능

향후 구현될 기능:

- 사용자 인증 및 권한 관리
- 견적 요청 관리 (CRUD)
- 파일 업로드 및 관리
- 이메일 알림
- 데이터 검색 및 필터링

## 📚 문서

- [시작하기](getting-started.md) - 개발 환경 설정
- [API 문서](api/index.md) - REST API 엔드포인트
- [데이터베이스](database/index.md) - 스키마 및 모델

## 🔗 관련 링크

- [Frontend 문서](../frontend/index.md)
- [전체 프로젝트 개요](../index.md)
