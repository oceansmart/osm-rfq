# Provider Stack 구현 프롬프트

> OSM RFQ 시스템의 Provider 계층 구조 구현 가이드

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

1. `src/app/layout.tsx` - Provider 계층 구조 구현 (UPDATE)

### 참조할 파일 (읽기 전용):

- `/Users/kimjongwook/project/challenge-02/src/app/layout.tsx` - 레퍼런스 Provider Stack
- 현재 구현된 Provider들:
  - `src/commons/providers/modal/modal.provider.tsx`

---

## 🎯 핵심 요구사항

### 요구사항 1: Provider 계층 구조 설정

**완성된 Provider들을 layout에서 import하여 children을 감싸도록 구현할 것**

연결될 경로: `src/app/layout.tsx`

Provider 중첩 순서 (외부 → 내부):
```
ModalProvider
  └─ children
```

향후 확장 가능한 구조 (예시):
```
AuthProvider (미래)
  └─ ReactQueryProvider (미래)
      └─ NextThemesProvider (미래)
          └─ ModalProvider (구현됨)
              └─ AuthGuard (미래)
                  └─ Layout (미래)
                      └─ children
```

### 요구사항 2: 현재 단계 구현

**현재는 ModalProvider만 연결할 것**

이유:
- 다른 Provider들은 아직 구현되지 않음
- 점진적 확장 가능한 구조 유지
- 필요할 때 Provider 추가

---

## 💡 구현 예시 (Reference)

### 1. 현재 단계 (ModalProvider만 적용)

```tsx
import type { Metadata } from "next";
import "./globals.css";
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
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
```

### 2. 향후 확장 단계 (참고용 - 구현하지 말 것)

```tsx
// 미래에 Provider들이 추가되면 이런 구조가 될 예정
import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/commons/providers/auth/auth.provider";
import AuthGuard from "@/commons/providers/auth/auth.guard";
import ModalProvider from "@/commons/providers/modal/modal.provider";
import NextThemesProvider from "@/commons/providers/next-themes/next-themes.provider";
import ReactQueryProvider from "@/commons/providers/react-query/react-query.provider";
import Layout from "@/commons/layout";

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
        <AuthProvider>
          <ReactQueryProvider>
            <NextThemesProvider>
              <ModalProvider>
                <AuthGuard>
                  <Layout>{children}</Layout>
                </AuthGuard>
              </ModalProvider>
            </NextThemesProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## 🔍 레퍼런스 프로젝트 분석 결과

### 1. Provider Stack 구조

**위치**: `/Users/kimjongwook/project/challenge-02/src/app/layout.tsx`

**계층 순서**:
```
AuthProvider (인증 상태 제공)
  └─ ReactQueryProvider (서버 상태 관리)
      └─ NextThemesProvider (테마 관리)
          └─ ModalProvider (모달 관리)
              └─ AuthGuard (인증 가드)
                  └─ Layout (공통 레이아웃)
                      └─ children (페이지 컨텐츠)
```

**설계 원칙**:
- 외부에서 내부로 갈수록 구체적인 기능
- 상위 Provider의 Context를 하위에서 사용 가능
- 각 Provider는 독립적으로 동작

### 2. Provider별 역할

| Provider | 역할 | 의존성 |
|----------|------|--------|
| AuthProvider | 사용자 인증 상태 관리 | 없음 |
| ReactQueryProvider | API 데이터 캐싱 | AuthProvider |
| NextThemesProvider | 다크모드/라이트모드 | 없음 |
| ModalProvider | 전역 모달 관리 | 없음 |
| AuthGuard | 라우트 보호 | AuthProvider |
| Layout | 공통 레이아웃 | 모든 Provider |

### 3. OSM RFQ 프로젝트 현재 상태

**구현됨**:
- ✅ ModalProvider

**미구현** (향후 추가 예정):
- ⏳ AuthProvider
- ⏳ ReactQueryProvider
- ⏳ NextThemesProvider
- ⏳ AuthGuard
- ⏳ Layout

---

## ✅ 구현 완료 체크리스트

구현 완료 후 아래 체크리스트를 반환할 것:

### Frontend Common Rules 적용

- [ ] 명시된 파일만 수정 (layout.tsx)
- [ ] 새 라이브러리 설치 없음
- [ ] OSM 네이밍 표준 준수

### Provider Stack 구현

- [ ] layout.tsx에서 ModalProvider import 완료
- [ ] ModalProvider로 children 감싸기 완료
- [ ] html lang="ko" 속성 유지 확인
- [ ] metadata 정보 유지 확인

### TypeScript 검증

- [ ] TypeScript 컴파일 에러 없음
- [ ] 타입 안전성 확인 완료

### 전체 검토

- [ ] Provider 중첩 구조 확인
- [ ] 향후 확장 가능한 구조 확인
- [ ] 불필요한 Provider 추가하지 않았는지 확인

---

## 📝 주의사항

### 현재 단계에서 하지 말아야 할 것

1. **AuthProvider 추가하지 말 것** - 아직 구현되지 않음
2. **ReactQueryProvider 추가하지 말 것** - 아직 구현되지 않음
3. **NextThemesProvider 추가하지 말 것** - 아직 구현되지 않음
4. **AuthGuard 추가하지 말 것** - 아직 구현되지 않음
5. **Layout 추가하지 말 것** - 아직 구현되지 않음

### 현재 단계에서 해야 할 것

1. **ModalProvider만 추가** - 이미 구현됨
2. **기존 metadata 유지** - OSM RFQ Frontend
3. **기존 lang 속성 유지** - lang="ko"

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**OSM Naming Convention**: ✅ 준수
**Reference**: challenge-02/layout.tsx
