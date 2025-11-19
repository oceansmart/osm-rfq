# Next Themes Provider 구현 프롬프트

> OSM RFQ 시스템의 테마(다크모드/라이트모드) 관리를 위한 Provider 구현

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

1. `src/commons/providers/next-themes/next-themes.provider.tsx` - Next Themes Provider 구현 (NEW)
2. `src/app/layout.tsx` - Provider 연결 (UPDATE)

### 참조할 파일 (읽기 전용):

- `/Users/kimjongwook/project/challenge-02/src/commons/providers/next-themes/next-themes.provider.tsx` - 레퍼런스 구현

---

## 🎯 핵심 요구사항

### 요구사항 1: Next Themes Provider 기본 구현

**next-themes 라이브러리를 사용하여 기본적인 theme 셋팅을 구현할 것**

필수 기능:
- `next-themes` 라이브러리의 `ThemeProvider` 사용
- 시스템 테마 자동 감지 (`enableSystem`)
- 기본 테마를 시스템 설정으로 설정 (`defaultTheme="system"`)
- 테마 전환 시 깜빡임 방지 (`disableTransitionOnChange`)
- `class` 속성으로 테마 적용 (`attribute="class"`)

### 요구사항 2: Layout 연결

**완성된 컴포넌트를 layout에서 import하여 children을 감싸도록 연결할 것**

연결될 경로: `src/app/layout.tsx`

Provider 중첩 순서:
```
NextThemesProvider
  └─ ModalProvider
      └─ children
```

---

## 💡 구현 예시 (Reference)

### 1. next-themes.provider.tsx 구조

```tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface NextThemesProviderProps {
  children: ReactNode;
}

export default function NextThemesProvider({
  children,
}: NextThemesProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

### 2. layout.tsx 연결

```tsx
import type { Metadata } from "next";
import "./globals.css";
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
        <NextThemesProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
```

### 3. 사용 예시 (useTheme hook)

```tsx
"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      현재 테마: {theme}
    </button>
  );
}
```

---

## 🔍 next-themes 라이브러리 설명

### next-themes란?

Next.js 앱에서 **다크모드/라이트모드**를 쉽게 구현할 수 있게 해주는 라이브러리입니다.

### 주요 Props 설명

| Prop | 값 | 의미 |
|------|-----|------|
| `attribute` | `"class"` | HTML 요소에 `class="dark"` 또는 `class="light"` 추가 |
| `defaultTheme` | `"system"` | 처음 방문 시 시스템 설정 따름 |
| `enableSystem` | `true` | 시스템 테마 자동 감지 활성화 |
| `disableTransitionOnChange` | `true` | 테마 전환 시 깜빡임 방지 |

### Tailwind CSS와 연동

`globals.css`에서 다크모드 변수 정의:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #000000;
    --foreground: #ffffff;
  }
}
```

또는 Tailwind 클래스 사용:

```tsx
<div className="bg-white dark:bg-black text-black dark:text-white">
  컨텐츠
</div>
```

---

## 📦 패키지 정보

### 설치 상태

- ✅ `next-themes` 이미 설치됨 (버전: 0.4.6)
- ✅ package.json에 포함되어 있음
- ✅ 별도 설치 불필요

### 만약 설치가 필요하다면 (참고용)

```bash
npm install next-themes
```

---

## 🔍 레퍼런스 프로젝트 분석 결과

### 1. Next Themes Provider 구조

**위치**: `/Users/kimjongwook/project/challenge-02/src/commons/providers/next-themes/next-themes.provider.tsx`

**특징**:
- `'use client'` 디렉티브 필수 (Client Component)
- `ThemeProvider` 컴포넌트 래핑
- 간단한 설정으로 전역 테마 관리
- 시스템 설정 자동 감지

### 2. Layout 연결 방식

**위치**: `/Users/kimjongwook/project/challenge-02/src/app/layout.tsx`

**연결 순서** (외부 → 내부):
```
AuthProvider
  └─ ReactQueryProvider
      └─ NextThemesProvider ← 여기
          └─ ModalProvider
              └─ AuthGuard
                  └─ Layout
                      └─ children
```

### 3. OSM RFQ 프로젝트 적용

**현재 상태**:
```
ModalProvider
  └─ children
```

**적용 후**:
```
NextThemesProvider (추가)
  └─ ModalProvider
      └─ children
```

---

## ✅ 구현 완료 체크리스트

구현 완료 후 아래 체크리스트를 반환할 것:

### Frontend Common Rules 적용

- [ ] 명시된 파일만 수정 (next-themes.provider.tsx, layout.tsx)
- [ ] 새 라이브러리 설치 없음 (이미 설치됨)
- [ ] 독립적인 컴포넌트로 구현 (재사용 가능)
- [ ] OSM 네이밍 표준 준수 (camelCase, PascalCase)

### Next Themes Provider 구현

- [ ] next-themes.provider.tsx 파일 생성 완료
- [ ] 'use client' 디렉티브 추가 (Client Component)
- [ ] ThemeProvider import 완료
- [ ] NextThemesProviderProps 인터페이스 정의 완료
- [ ] NextThemesProvider 컴포넌트 구현 완료
- [ ] attribute="class" 설정 완료
- [ ] defaultTheme="system" 설정 완료
- [ ] enableSystem 설정 완료
- [ ] disableTransitionOnChange 설정 완료

### Layout 연결

- [ ] layout.tsx에서 NextThemesProvider import 완료
- [ ] Provider 중첩 순서 확인 (NextThemesProvider → ModalProvider)
- [ ] html lang="ko" 속성 유지 확인
- [ ] metadata 정보 유지 확인

### TypeScript 검증

- [ ] TypeScript 컴파일 에러 없음
- [ ] 타입 안전성 확인 완료

### 전체 검토

- [ ] Provider 중첩 구조 확인
- [ ] next-themes 라이브러리 정상 작동 확인
- [ ] 시스템 테마 감지 확인

---

## 📝 주의사항

### 필수 사항

1. **'use client' 디렉티브 필수** - ThemeProvider는 Client Component
2. **Provider 순서 중요** - NextThemesProvider가 ModalProvider 바깥에 있어야 함
3. **attribute="class" 사용** - Tailwind CSS dark 모드와 호환

### 테마 적용 확인

테마가 제대로 적용되었는지 확인하는 방법:

1. 브라우저 개발자 도구 열기
2. `<html>` 요소 확인
3. `class="dark"` 또는 `class="light"` 속성이 있는지 확인

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**OSM Naming Convention**: ✅ 준수
**Reference**: challenge-02/next-themes.provider.tsx
**Package**: next-themes@0.4.6 (설치됨)
