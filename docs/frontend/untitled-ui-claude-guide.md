# Untitled UI + Claude Code 통합 가이드

> **Untitled UI React를 Claude Code와 함께 수초 안에 설정하세요.** 스타터 킷에는 provider, 라우팅, 그리고 시작에 필요한 모든 것이 포함되어 있습니다.

---

## 📚 Untitled UI React란?

**Untitled UI React**는 세계에서 가장 크고 인기 있는 Figma UI 킷 및 디자인 시스템을 기반으로 한 **오픈소스 React 컴포넌트 라이브러리**입니다.

> "픽셀 완벽한, 제품 준비 완료 상태의 컴포넌트로 수개월의 디자인 및 개발 시간을 건너뛰세요." - Untitled UI

### 주요 특징

- ✅ **세계 최대 규모** - 1,325+ 컴포넌트
- ✅ **Tailwind CSS v4.1** + **React Aria v1.9** 기반
- ✅ **TypeScript v5.8** 완벽 지원
- ✅ **React v19.1** 호환
- ✅ **접근성 우선** - "접근성은 선택사항이 아닙니다"
- ✅ **오픈소스** - MIT 라이센스, 상업적 사용 무료
- ✅ **Copy & Paste** - "복사, 붙여넣기, 빌드"

### 전통적인 라이브러리와의 차이점

**기존 라이브러리**:

```bash
npm install some-ui-library  # 의존성으로 설치
```

- ❌ 패키지 의존성 관리 필요
- ❌ 벤더 lock-in
- ❌ 커스터마이징 제한

**Untitled UI React**:

```text
컴포넌트 선택 → 소스 코드 복사 → 프로젝트에 붙여넣기
```

- ✅ **소스 코드 직접 소유**
- ✅ **의존성 없음**
- ✅ **완전한 커스터마이징**
- ✅ **수정, 확장, 적응 자유**

---

## 🛠️ 기술 스택 (Tech Stack)

Untitled UI는 최소한의 기술 스택으로 구성되어 있어 개발에 집중할 수 있습니다:

| 기술 | 버전 | 용도 |
|------|------|------|
| **React** | v19.1 | UI 프레임워크 |
| **Tailwind CSS** | v4.1 | 스타일링 |
| **TypeScript** | v5.8 | 타입 안정성 |
| **React Aria** | v1.9 | 접근성 |

---

## 🚀 사전 요구사항 (Prerequisites)

Untitled UI와 Claude Code로 프로젝트를 빠르게 시작하려면, 먼저 **Claude Code를 설치**해야 합니다.

아직 설치하지 않았다면 [Claude Code 공식 문서](https://docs.anthropic.com/claude-code)를 참조하여 설치하세요.

---

## 💻 Untitled UI React 설치 방법

### 방법 1: CLI를 통한 빠른 설치 (권장)

Next.js 프로젝트의 경우:

```bash
npx untitledui@latest init --nextjs
```

설치 중 다음 질문에 답변합니다:

- 프로젝트 이름
- 브랜드 색상 선택

**CLI가 자동으로 설정**:

- ✅ Tailwind CSS 구성
- ✅ 테마 토큰 (색상, 폰트, 그림자 등)
- ✅ 필수 플러그인
- ✅ 유틸리티 함수

### 방법 2: 수동 설치

#### 1단계: 필수 패키지 설치

```bash
npm install @untitledui/icons react-aria-components tailwindcss-react-aria-components tailwind-merge tailwindcss-animate
```

#### 2단계: Tailwind CSS 설정

**theme.css** 파일 생성:

```css
@layer base {
  :root {
    /* 디자인 토큰 정의 */
    --font-sans: ...;
    --color-primary: ...;
    --shadow-sm: ...;
    --radius-lg: ...;
  }
}
```

#### 3단계: globals.css 확장

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "tailwindcss-animate";
@plugin "tailwindcss-react-aria-components";
```

#### 4단계: 유틸리티 함수 추가

```typescript
// utils/cx.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🚀 Claude Code와 함께 시작하기

### 1단계: 프레임워크 선택

Claude Code와 함께 사용할 수 있는 스타터 킷을 선택하세요:

#### 📦 Next.js 스타터 킷 (권장)

```bash
git clone https://github.com/untitleduico/untitledui-nextjs-starter-kit
cd untitledui-nextjs-starter-kit
npm install
```

**포함 사항**:

- ✅ Next.js 14+ App Router
- ✅ TypeScript 설정
- ✅ Provider 구조 (Auth, Theme, Modal)
- ✅ 라우팅 설정 완료
- ✅ 기본 컴포넌트 라이브러리

#### ⚡ Vite 스타터 킷 (대안)

```bash
git clone https://github.com/untitleduico/untitledui-vite-starter-kit
cd untitledui-vite-starter-kit
npm install
```

**포함 사항**:

- ✅ Vite 빌드 시스템
- ✅ React Router
- ✅ 빠른 HMR (Hot Module Replacement)
- ✅ 최적화된 개발 환경

---

### 2단계: Claude Code 실행

스타터 킷을 로컬에 복제한 후, 프로젝트 디렉토리에서 다음 명령어를 실행하세요:

```bash
claude
```

이제 **Claude Code에게 자유롭게 프롬프트를 입력**하여 프로젝트 개발을 계속할 수 있습니다.

---

## 💬 Claude Code 프롬프트 예시

### 컴포넌트 생성

```
"Button 컴포넌트를 variant(primary, secondary), size(small, medium, large) props와 함께 만들어줘"
```

### 페이지 구현

```
"로그인 페이지를 react-hook-form과 zod를 사용해서 만들어줘. 이메일, 비밀번호 필드와 검증이 필요해"
```

### API 연동

```
"GraphQL mutation으로 createUser API를 호출하는 Hook을 만들어줘"
```

### Figma 디자인 구현

```
"Figma 노드 3:140을 분석해서 그대로 구현해줘"
```

---

## ✨ 주요 기능

### Claude Code가 도와주는 것

1. **컴포넌트 생성**
   - Props 타입 정의
   - 스타일링
   - Storybook 작성

2. **페이지 구현**
   - UI 구조
   - 상태 관리
   - API 연동

3. **API 연동**
   - GraphQL/REST API
   - react-query 설정
   - 에러 처리

4. **스타일링**
   - CSS Module
   - Tailwind CSS
   - Responsive 디자인

5. **디버깅**
   - 문제 분석
   - 해결 방안 제시
   - 코드 수정

---

## 🎨 스타터 킷 구조

### 디렉토리 구조

```
project/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 홈 페이지
│   ├── components/          # 페이지 컴포넌트
│   ├── commons/             # 공통 요소
│   │   ├── components/      # 공통 컴포넌트
│   │   ├── providers/       # Context Provider
│   │   ├── constants/       # 상수
│   │   └── layout/          # 레이아웃
│   └── styles/              # 전역 스타일
├── public/                  # 정적 파일
│   ├── images/
│   └── icons/
└── docs/                    # 문서
```

### Provider 구조

```typescript
// src/app/layout.tsx
<AuthProvider>
  <ReactQueryProvider>
    <NextThemesProvider>
      <ModalProvider>
        <Layout>{children}</Layout>
      </ModalProvider>
    </NextThemesProvider>
  </ReactQueryProvider>
</AuthProvider>
```

---

## 🔧 우리 프로젝트 적용 사례

### 구현된 컴포넌트 (7개)

1. **Button** - variant, size, theme props
2. **Input** - forwardRef, 검증 지원
3. **Modal** - 중첩 모달 스택
4. **Pagination** - 페이지 네비게이션
5. **Searchbar** - 검색 입력
6. **Selectbox** - 드롭다운
7. **Toggle** - 스위치

### Provider 시스템 (4개)

#### AuthProvider

```typescript
const { isLoggedIn, user, login, logout } = useAuth();
```

- 로그인 상태 관리
- 로컬스토리지 기반
- 실시간 동기화

#### ModalProvider

```typescript
const { openModal, closeModal, closeAllModals } = useModal();
```

- 중첩 모달 지원
- Portal 기반
- body 스크롤 제어

#### ReactQueryProvider

```typescript
const { data, isLoading } = useQuery({ ... });
```

- API 상태 관리
- 캐싱
- 자동 재시도

#### NextThemesProvider

- 다크모드 지원
- 시스템 테마 감지

### 페이지 구현 (5개)

1. **/diaries** - 일기 목록 (로컬스토리지)
2. **/diaries/[id]** - 일기 상세
3. **/pictures** - 사진 갤러리 (Dog API + 무한스크롤)
4. **/auth/signup** - 회원가입 (GraphQL)
5. **/auth/login** - 로그인 (GraphQL)

---

## 💡 Claude Code 활용 팁

### 1. 명확한 요구사항

```
❌ "페이지 만들어줘"
✅ "react-hook-form과 zod를 사용해서 회원가입 페이지를 만들어줘. 이메일(형식 검증), 비밀번호(8자 이상), 비밀번호 확인, 이름 필드가 필요해"
```

### 2. 단계별 진행 (TDD)

```
1. "Playwright 테스트를 먼저 작성해줘"
2. "테스트를 통과하도록 Hook을 구현해줘"
3. "컴포넌트에 Hook을 적용해줘"
```

### 3. 기존 패턴 참고

```
"Diaries 컴포넌트처럼 Pictures 컴포넌트를 만들어줘"
```

### 4. Figma 연동

```
"Figma 채널 rfxkj7p5에 연결하고 노드 3:140을 분석해서 구현해줘"
```

### 5. 커서 규칙 준수

```
"@.cursor/rules/01-common.mdc 규칙을 준수하여 구현해줘"
```

---

## 🎯 Best Practices

### 개발 원칙

- ✅ **TDD 기반** - 테스트 먼저 작성
- ✅ **CSS Module** - 스타일 격리
- ✅ **공통 컴포넌트 재사용** - DRY 원칙
- ✅ **Provider 패턴** - 전역 상태 관리

### 코드 스타일

- ✅ **TypeScript** - 타입 안정성
- ✅ **Interface** - 타입 정의
- ✅ **JSDoc** - 함수/타입 주석
- ✅ **일관된 네이밍** - camelCase, PascalCase

### 테스트

- ✅ **Playwright** - E2E 테스트
- ✅ **data-testid** - 요소 식별
- ✅ **실제 API** - Mock 금지
- ✅ **적절한 timeout** - 2000ms 미만

---

## 📈 성능 최적화

### 이미지 최적화

```typescript
import Image from "next/image";

// next.config.mjs에 외부 도메인 추가
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.dog.ceo",
      pathname: "/**",
    },
  ],
}
```

### 코드 스플리팅

```typescript
// 동적 import
const Modal = dynamic(() => import("@/commons/components/modal"));
```

---

## 🐛 문제 해결

### Playwright webServer timeout

```typescript
// playwright.config.ts
webServer: {
  command: 'npm run dev',
  port: 3000,  // url 대신 port 사용
  timeout: 120 * 1000,  // 120초
  reuseExistingServer: !process.env.CI,
}
```

### CSS gap이 작동하지 않음

```css
/* 부모 높이를 auto로 */
.main {
  min-height: auto;  /* 고정 높이 제거 */
}

/* flex-basis 명시 */
.card {
  flex: 0 0 640px;
}
```

---

## 📚 참고 자료

### 공식 문서

- [Untitled UI](https://www.untitledui.com)
- [Claude Code](https://docs.anthropic.com/claude-code)
- [Next.js](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query)

### GitHub 저장소

- [Untitled UI React GitHub](https://github.com/untitleduico)
- [Next.js 스타터 킷](https://github.com/untitleduico/untitledui-nextjs-starter-kit)
- [Vite 스타터 킷](https://github.com/untitleduico/untitledui-vite-starter-kit)

### Untitled UI 리소스

- [Untitled UI Figma](https://untitledui.com/figma) - 원본 Figma 디자인 시스템
- [FAQs](https://www.untitledui.com/react/docs/faqs) - 자주 묻는 질문

---

## ❓ FAQ (자주 묻는 질문)

### Q: 라이센스는 무엇인가요?

A: Untitled UI React는 오픈소스이며, 상업적 사용이 가능합니다. 자세한 내용은 [FAQ 페이지](https://www.untitledui.com/react/docs/faqs)를 참조하세요.

### Q: 기존 프로젝트에 추가할 수 있나요?

A: 네! 컴포넌트를 복사해서 붙여넣기만 하면 됩니다. 의존성 설치가 필요 없습니다.

### Q: Tailwind CSS 없이 사용할 수 있나요?

A: 가능하지만 권장하지 않습니다. 컴포넌트가 Tailwind CSS로 스타일링되어 있습니다.

### Q: Claude Code 없이 사용할 수 있나요?

A: 네! Claude Code는 선택사항입니다. 하지만 Claude Code를 사용하면 훨씬 빠르게 개발할 수 있습니다.

### Q: 어떻게 기여할 수 있나요?

A: [GitHub 저장소](https://github.com/untitleduico)에서 이슈를 열거나 Pull Request를 보내주세요!

---

## 🎉 결론

Untitled UI + Claude Code 조합으로:

- ✅ **빠른 개발** - 수 시간 → 수 분
- ✅ **일관된 품질** - 컴포넌트 재사용
- ✅ **모범 사례 적용** - TDD, TypeScript
- ✅ **자동 테스트 생성** - Playwright

**프로젝트를 빠르고 효율적으로 완성할 수 있습니다!** 🚀

---

## 📝 우리 프로젝트 통계

- ✅ **16개 커밋**
- ✅ **10개 페이지**
- ✅ **7개 공통 컴포넌트**
- ✅ **4개 Provider**
- ✅ **12개 E2E 테스트**
- ✅ **커서 규칙 100% 준수**

**Claude Code로 모든 것을 구현했습니다!** 🎉
