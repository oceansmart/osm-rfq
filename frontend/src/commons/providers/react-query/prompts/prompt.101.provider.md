# React Query Provider 구현 프롬프트

> OSM RFQ 시스템의 서버 상태 관리를 위한 React Query Provider 구현

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

1. `src/commons/providers/react-query/react-query.provider.tsx` - React Query Provider 구현 (NEW)
2. `src/app/layout.tsx` - Provider 연결 (UPDATE)

### 참조할 파일 (읽기 전용):

- `/Users/kimjongwook/project/challenge-02/src/commons/providers/react-query/react-query.provider.tsx` - 레퍼런스 구현

---

## 🎯 핵심 요구사항

### 요구사항 1: React Query Provider 기본 구현

**@tanstack/react-query를 사용하여 기본적인 client-cache 셋팅을 구현할 것**

필수 기능:
- `@tanstack/react-query`의 `QueryClient`, `QueryClientProvider` 사용
- useState로 QueryClient 인스턴스 생성 (리렌더링 시 재생성 방지)
- defaultOptions 설정:
  - `staleTime: 60 * 1000` (1분) - 데이터가 신선한 것으로 간주되는 시간
  - `gcTime: 5 * 60 * 1000` (5분) - 캐시 보관 시간 (구 cacheTime)
  - `refetchOnWindowFocus: false` - 윈도우 포커스 시 자동 재요청 비활성화
  - `retry: 1` - 실패 시 재시도 횟수 1회로 제한

### 요구사항 2: Layout 연결

**완성된 컴포넌트를 layout에서 import하여 children을 감싸도록 연결할 것**

연결될 경로: `src/app/layout.tsx`

Provider 중첩 순서:
```
ReactQueryProvider (NEW)
  └─ NextThemesProvider
      └─ ModalProvider
          └─ children
```

---

## 💡 구현 예시 (Reference)

### 1. react-query.provider.tsx 구조

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 2. layout.tsx 연결

```tsx
import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/commons/providers/react-query/react-query.provider";
import NextThemesProvider from "@/commons/providers/next-themes/next-themes.provider";
import ModalProvider from "@/commons/providers/modal/modal.provider";

export const metadata: Metadata = {
  title: "OSM RFQ Frontend",
  description: "OSM RFQ Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <NextThemesProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </NextThemesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

### 3. 사용 예시 (useQuery hook)

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

// API 함수
async function fetchRfqList() {
  const response = await fetch("/api/rfq/list");
  if (!response.ok) throw new Error("Failed to fetch RFQ list");
  return response.json();
}

export default function RfqListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rfqList"],
    queryFn: fetchRfqList,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      {data.map((rfq: any) => (
        <div key={rfq.id}>{rfq.title}</div>
      ))}
    </div>
  );
}
```

---

## 🔍 @tanstack/react-query 라이브러리 설명

### React Query란?

React 애플리케이션에서 **서버 상태 관리**를 쉽게 할 수 있게 해주는 라이브러리입니다.

### 서버 상태 vs 클라이언트 상태

| 구분 | 서버 상태 (React Query) | 클라이언트 상태 (useState) |
|------|------------------------|---------------------------|
| **위치** | 서버 데이터베이스 | 브라우저 메모리 |
| **예시** | RFQ 목록, 입찰 내역 | 모달 열림/닫힘, 폼 입력값 |
| **동기화** | 필요 (서버와 항상 다를 수 있음) | 불필요 |
| **캐싱** | 필요 (네트워크 요청 최소화) | 불필요 |

### 주요 defaultOptions 설명

| Option | 값 | 의미 |
|--------|-----|------|
| `staleTime` | `60 * 1000` (1분) | 데이터가 "신선한" 상태로 유지되는 시간. 이 시간 동안은 서버에 재요청하지 않음 |
| `gcTime` | `5 * 60 * 1000` (5분) | 캐시된 데이터가 메모리에 보관되는 시간. 이 시간 이후 메모리에서 제거됨 |
| `refetchOnWindowFocus` | `false` | 브라우저 탭을 다시 클릭했을 때 자동으로 데이터를 다시 가져올지 여부 |
| `retry` | `1` | 요청 실패 시 재시도 횟수 |

### staleTime vs gcTime 차이

```
시간 흐름: 0초 -------- 60초 -------- 300초 -------→

[staleTime: 60초]
 └─ 0~60초: 데이터 "신선" → 서버 요청 안 함
 └─ 60초~: 데이터 "오래됨" → 서버 재요청 가능

[gcTime: 300초]
 └─ 0~300초: 캐시 메모리 유지
 └─ 300초~: 캐시 메모리에서 제거
```

### useState로 QueryClient 생성하는 이유

```tsx
// ❌ 잘못된 방법 - 리렌더링마다 새 인스턴스 생성
const queryClient = new QueryClient();

// ✅ 올바른 방법 - 최초 1회만 생성
const [queryClient] = useState(() => new QueryClient());
```

**이유**:
- QueryClient는 앱 전체의 캐시를 관리
- 리렌더링마다 새로 생성하면 캐시가 초기화됨
- useState의 lazy initialization으로 최초 1회만 생성 보장

---

## 📦 패키지 정보

### 설치 상태

- ✅ `@tanstack/react-query` 이미 설치됨 (버전: 5.90.5)
- ✅ package.json에 포함되어 있음
- ✅ 별도 설치 불필요

### 만약 설치가 필요하다면 (참고용)

```bash
npm install @tanstack/react-query
```

---

## 🔍 레퍼런스 프로젝트 분석 결과

### 1. React Query Provider 구조

**위치**: `/Users/kimjongwook/project/challenge-02/src/commons/providers/react-query/react-query.provider.tsx`

**특징**:
- `'use client'` 디렉티브 필수 (Client Component)
- `QueryClientProvider` 컴포넌트 래핑
- useState로 QueryClient 인스턴스 관리
- defaultOptions로 글로벌 설정

### 2. Layout 연결 방식

**위치**: `/Users/kimjongwook/project/challenge-02/src/app/layout.tsx`

**연결 순서** (외부 → 내부):
```
AuthProvider
  └─ ReactQueryProvider ← 여기
      └─ NextThemesProvider
          └─ ModalProvider
              └─ AuthGuard
                  └─ Layout
                      └─ children
```

### 3. OSM RFQ 프로젝트 적용

**현재 상태**:
```
NextThemesProvider
  └─ ModalProvider
      └─ children
```

**적용 후**:
```
ReactQueryProvider (추가)
  └─ NextThemesProvider
      └─ ModalProvider
          └─ children
```

---

## ✅ 구현 완료 체크리스트

구현 완료 후 아래 체크리스트를 반환할 것:

### Frontend Common Rules 적용

- [ ] 명시된 파일만 수정 (react-query.provider.tsx, layout.tsx)
- [ ] 새 라이브러리 설치 없음 (이미 설치됨)
- [ ] 독립적인 컴포넌트로 구현 (재사용 가능)
- [ ] OSM 네이밍 표준 준수 (camelCase, PascalCase)

### React Query Provider 구현

- [ ] react-query.provider.tsx 파일 생성 완료
- [ ] 'use client' 디렉티브 추가 (Client Component)
- [ ] QueryClient, QueryClientProvider import 완료
- [ ] ReactQueryProviderProps 인터페이스 정의 완료
- [ ] useState로 QueryClient 인스턴스 생성 완료
- [ ] defaultOptions.queries.staleTime 설정 완료 (60 * 1000)
- [ ] defaultOptions.queries.gcTime 설정 완료 (5 * 60 * 1000)
- [ ] defaultOptions.queries.refetchOnWindowFocus 설정 완료 (false)
- [ ] defaultOptions.queries.retry 설정 완료 (1)
- [ ] QueryClientProvider로 children 래핑 완료

### Layout 연결

- [ ] layout.tsx에서 ReactQueryProvider import 완료
- [ ] Provider 중첩 순서 확인 (ReactQueryProvider → NextThemesProvider → ModalProvider)
- [ ] html lang="ko" 속성 유지 확인
- [ ] metadata 정보 유지 확인

### TypeScript 검증

- [ ] TypeScript 컴파일 에러 없음
- [ ] 타입 안전성 확인 완료

### 전체 검토

- [ ] Provider 중첩 구조 확인
- [ ] React Query 라이브러리 정상 작동 확인
- [ ] QueryClient 인스턴스가 리렌더링 시 재생성되지 않는지 확인

---

## 📝 주의사항

### 필수 사항

1. **'use client' 디렉티브 필수** - QueryClientProvider는 Client Component
2. **useState로 QueryClient 생성** - 리렌더링 시 재생성 방지
3. **Provider 순서 중요** - ReactQueryProvider가 가장 바깥쪽에 있어야 함

### React Query 사용 패턴

React Query는 다음과 같은 경우에 사용:

- ✅ 서버 데이터 가져오기 (GET 요청)
- ✅ 서버 데이터 수정하기 (POST/PUT/DELETE 요청)
- ✅ 데이터 캐싱 및 동기화
- ✅ 로딩/에러 상태 관리

사용하지 않는 경우:

- ❌ 모달 열림/닫힘 상태
- ❌ 폼 입력값
- ❌ UI 인터랙션 상태

### 성능 최적화 팁

1. **staleTime 조정**: 자주 변경되지 않는 데이터는 staleTime을 늘려서 불필요한 요청 방지
2. **gcTime 조정**: 메모리 절약이 필요하면 gcTime 단축
3. **refetchOnWindowFocus**: 실시간 동기화가 필요하면 `true`로 설정

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**OSM Naming Convention**: ✅ 준수
**Reference**: challenge-02/react-query.provider.tsx
**Package**: @tanstack/react-query@5.90.5 (설치됨)
