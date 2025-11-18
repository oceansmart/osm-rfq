# Backend API 문서

OSM RFQ Backend REST API 엔드포인트 문서입니다.

## 🌐 Base URL

```
http://localhost:8000/api
```

프로덕션: `https://api.osm-rfq.com`

## 🔐 인증

모든 인증이 필요한 엔드포인트는 JWT Bearer Token을 사용합니다.

```
Authorization: Bearer <token>
```

### 토큰 발급

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## 📚 API 엔드포인트

### 인증 (Authentication)

#### 회원가입
```http
POST /api/auth/register

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

#### 로그인
```http
POST /api/auth/login

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 로그아웃
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

---

### 사용자 (Users)

#### 사용자 목록 조회
```http
GET /api/users
Authorization: Bearer <token>
```

#### 특정 사용자 조회
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### 사용자 생성
```http
POST /api/users
Authorization: Bearer <token>

{
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user"
}
```

#### 사용자 수정
```http
PUT /api/users/:id
Authorization: Bearer <token>

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### 사용자 삭제
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

---

### 견적 요청 (RFQs)

#### 견적 요청 목록 조회
```http
GET /api/rfqs
Authorization: Bearer <token>

Query Parameters:
- page: number (기본값: 1)
- limit: number (기본값: 10)
- status: string (pending | approved | rejected)
- search: string
```

#### 특정 견적 요청 조회
```http
GET /api/rfqs/:id
Authorization: Bearer <token>
```

#### 견적 요청 생성
```http
POST /api/rfqs
Authorization: Bearer <token>

{
  "title": "견적 요청 제목",
  "description": "상세 설명",
  "items": [
    {
      "name": "상품명",
      "quantity": 10,
      "specifications": "상세 사양"
    }
  ]
}
```

#### 견적 요청 수정
```http
PUT /api/rfqs/:id
Authorization: Bearer <token>

{
  "title": "수정된 제목",
  "description": "수정된 설명"
}
```

#### 견적 요청 삭제
```http
DELETE /api/rfqs/:id
Authorization: Bearer <token>
```

---

## 📋 응답 형식

### 성공 응답

```json
{
  "success": true,
  "data": {
    // 응답 데이터
  }
}
```

### 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {}
  }
}
```

### HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성됨 |
| 400 | 잘못된 요청 |
| 401 | 인증 실패 |
| 403 | 권한 없음 |
| 404 | 찾을 수 없음 |
| 500 | 서버 오류 |

## 🔍 필터링 & 정렬

대부분의 목록 조회 API는 다음 쿼리 파라미터를 지원합니다:

```http
GET /api/resource?page=1&limit=10&sort=createdAt&order=desc&search=keyword
```

- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지 당 항목 수 (기본값: 10, 최대: 100)
- `sort`: 정렬 필드
- `order`: 정렬 순서 (`asc` | `desc`)
- `search`: 검색 키워드

## 📦 페이지네이션

목록 조회 응답에는 페이지네이션 정보가 포함됩니다:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

## 🛠️ API 테스팅

### Swagger UI

개발 환경에서 [http://localhost:8000/docs](http://localhost:8000/docs)에서 인터랙티브 API 문서를 확인할 수 있습니다.

### Postman Collection

Postman 컬렉션 파일을 임포트하여 API를 테스트할 수 있습니다.

## 🔗 관련 문서

- [데이터베이스 스키마](../database/index.md)
- [Frontend API 연동](../../frontend/api/index.md)
