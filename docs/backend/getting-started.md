# Backend 시작하기

OSM RFQ Backend 프로젝트를 시작하는 방법을 안내합니다.

## 📋 사전 요구사항

향후 결정될 예정입니다. 예상 요구사항:

- Node.js 18+ / Python 3.10+ / Go 1.21+
- PostgreSQL 14+ / MySQL 8+ / MongoDB 6+
- Docker (선택사항)

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
cd backend

# Node.js 예시
npm install

# Python 예시
pip install -r requirements.txt

# Go 예시
go mod download
```

### 2. 환경 변수 설정

`.env` 파일을 생성하여 필요한 환경 변수를 설정합니다:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/osm_rfq

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Email (선택사항)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password

# Server
PORT=8000
NODE_ENV=development
```

### 3. 데이터베이스 마이그레이션

```bash
# Prisma 예시
npx prisma migrate dev

# SQLAlchemy 예시
alembic upgrade head

# GORM 예시
go run cmd/migrate/main.go
```

### 4. 개발 서버 실행

```bash
# Node.js
npm run dev

# Python
uvicorn main:app --reload

# Go
go run cmd/server/main.go
```

서버가 [http://localhost:8000](http://localhost:8000)에서 실행됩니다.

## 🐳 Docker 사용

```bash
# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f backend
```

## 📝 사용 가능한 스크립트

향후 추가될 예정입니다:

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run test` | 테스트 실행 |
| `npm run migrate` | 데이터베이스 마이그레이션 |
| `npm run seed` | 시드 데이터 삽입 |

## 🧪 API 테스팅

### Swagger UI

개발 서버 실행 후 [http://localhost:8000/docs](http://localhost:8000/docs)에서 API 문서를 확인할 수 있습니다.

### Postman / Thunder Client

API 컬렉션 파일을 사용하여 테스트할 수 있습니다.

## 📚 다음 단계

- [API 문서](api/index.md)
- [데이터베이스 구조](database/index.md)
- [Frontend 연동](../frontend/api/index.md)
