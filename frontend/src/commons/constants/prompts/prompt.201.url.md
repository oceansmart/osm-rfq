# URL 상수 구현 프롬프트

> OSM RFQ 시스템의 모든 URL 경로를 중앙 집중식으로 관리하기 위한 상수 파일 구현

---

## 🚨 CRITICAL RULES

### 적용할 규칙
**반드시 아래 규칙을 먼저 읽고 적용할 것:**
```
@.claude/rules/frontend-common.md
@.claude/rules/osm-naming-convention.md
```

---

## 📁 구현 파일 경로

### 수정/생성할 파일 (명시된 파일만):
1. `src/commons/constants/url.ts` - URL 경로 상수 정의 (NEW)

### 참조할 파일 (읽기 전용):
- 없음 (프로젝트 요구사항 기반 구현)

---

## 🎯 핵심 요구사항

### 요구사항 1: URL 경로 중앙 관리

**해당 파일에서 URL 경로에 관한 모든 것을 한 번에 관리할 수 있도록 할 것**
- 다이나믹 라우팅에 유의할 것
- Link 컴포넌트 이동 시 사용 가능하도록 설계
- 타입 안전성 보장

### 요구사항 2: 접근 권한 관리

각 페이지별 접근 가능 상태 정의:
- `all`: 누구나 접근 가능
- `user`: 로그인 사용자만 접근 가능
- `admin`: 관리자만 접근 가능

---

## 📋 URL 경로별 상세 지시사항

### 1. 로그인 (Log in)
- **경로명**: `/auth/login`
- **접근가능상태**: `all` (누구나)
- **컴포넌트 경로**: `frontend/src/components/auth-login`

### 2. 대시보드 (Dashboard)
- **경로명**: `/`
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/dashboard`

### 3. RFQ 목록 (RFQ Management List)
- **경로명**: `/rfq`
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/rfq-list`

### 4. RFQ 상세 (RFQ Management List - Detail)
- **경로명**: `/rfq/[id]` (다이나믹 라우팅)
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/rfq-detail/[id]`

### 5. 이메일 미리보기 (Email Preview)
- **경로명**: `/rfq/email-preview`
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/email-preview`

### 6. 견적 작성 (Create Draft Rate)
- **경로명**: `/bidding/draft/create`
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/draft-rate`

### 7. 견적서 생성 (Quotation Generator)
- **경로명**: `/bidding/quotation`
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/quotation-generator`

### 8. 이메일 작성 (Email Composition)
- **경로명**: `/bidding/email`
- **접근가능상태**: `user` (로그인 사용자)
- **컴포넌트 경로**: `frontend/src/components/email-composition`

---

## 💡 구현 예시 (Reference)

### TypeScript Interface 구조

```typescript
// src/commons/constants/url.ts

/**
 * 접근 권한 타입
 */
export type AccessLevel = 'all' | 'user' | 'admin';

/**
 * Route 설정 인터페이스
 */
export interface RouteConfig {
  path: string;
  name: string;
  access: AccessLevel;
  componentPath: string;
}

/**
 * 전체 Routes 맵
 */
export const ROUTES: Record<string, RouteConfig> = {
  LOGIN: {
    path: '/auth/login',
    name: 'Log in',
    access: 'all',
    componentPath: 'frontend/src/components/auth-login',
  },

  DASHBOARD: {
    path: '/',
    name: 'Dashboard',
    access: 'user',
    componentPath: 'frontend/src/components/dashboard',
  },

  RFQ_LIST: {
    path: '/rfq',
    name: 'RFQ Management List',
    access: 'user',
    componentPath: 'frontend/src/components/rfq-list',
  },

  RFQ_DETAIL: {
    path: '/rfq/[id]',
    name: 'RFQ Detail',
    access: 'user',
    componentPath: 'frontend/src/components/rfq-detail/[id]',
  },

  EMAIL_PREVIEW: {
    path: '/rfq/email-preview',
    name: 'Email Preview',
    access: 'user',
    componentPath: 'frontend/src/components/email-preview',
  },

  DRAFT_RATE: {
    path: '/bidding/draft/create',
    name: 'Create Draft Rate',
    access: 'user',
    componentPath: 'frontend/src/components/draft-rate',
  },

  QUOTATION_GENERATOR: {
    path: '/bidding/quotation',
    name: 'Quotation Generator',
    access: 'user',
    componentPath: 'frontend/src/components/quotation-generator',
  },

  EMAIL_COMPOSITION: {
    path: '/bidding/email',
    name: 'Email Composition',
    access: 'user',
    componentPath: 'frontend/src/components/email-composition',
  },
} as const;

/**
 * Helper 함수: 경로에 따른 RouteConfig 가져오기
 */
export function getLayoutConfig(pathname: string): RouteConfig | undefined {
  return Object.values(ROUTES).find(route => {
    // 다이나믹 라우트 처리
    if (route.path.includes('[id]')) {
      const pattern = route.path.replace('[id]', '\\d+');
      return new RegExp(`^${pattern}$`).test(pathname);
    }
    return route.path === pathname;
  });
}

/**
 * Helper 함수: 다이나믹 경로 생성
 */
export function createDynamicPath(routeKey: string, params: Record<string, string | number>): string {
  const route = ROUTES[routeKey as keyof typeof ROUTES];
  if (!route) return '/';

  let path = route.path;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`[${key}]`, String(value));
  });

  return path;
}
```

### 사용 예시

```typescript
// Link 컴포넌트에서 사용
import Link from 'next/link';
import { ROUTES, createDynamicPath } from '@/commons/constants/url';

// 정적 경로
<Link href={ROUTES.RFQ_LIST.path}>RFQ 목록</Link>

// 다이나믹 경로
const rfqId = '123';
<Link href={createDynamicPath('RFQ_DETAIL', { id: rfqId })}>
  RFQ 상세
</Link>
```

---

## ✅ 구현 완료 체크리스트

구현 완료 후 아래 체크리스트를 반환할 것:

- [ ] url.ts 파일 생성 완료
- [ ] AccessLevel 타입 정의 완료 ('all' | 'user' | 'admin')
- [ ] RouteConfig 인터페이스 정의 완료 (path, name, access, componentPath)
- [ ] 8개 Route 정의 완료 (LOGIN, DASHBOARD, RFQ_LIST, RFQ_DETAIL, EMAIL_PREVIEW, DRAFT_RATE, QUOTATION_GENERATOR, EMAIL_COMPOSITION)
- [ ] getLayoutConfig 헬퍼 함수 구현 완료
- [ ] createDynamicPath 헬퍼 함수 구현 완료
- [ ] 다이나믹 라우팅 처리 로직 구현 완료 (/rfq/[id])
- [ ] TypeScript 타입 안전성 검증 완료
- [ ] OSM 네이밍 표준 준수 확인 완료 (camelCase, PascalCase)

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**OSM Naming Convention**: ✅ 준수
