# Untitled UI 정식 제품 설치 및 사용 가이드

> **Untitled UI React + Untitled UI Figma 정식 구매 버전 사용 가이드**
> 새로운 프로젝트에 적용하기 위한 완벽한 단계별 가이드

---

## 🎉 축하합니다!

**Untitled UI React**와 **Untitled UI Figma**를 구매하셨습니다!

### 구매한 제품

✅ **Untitled UI React** - PRO 버전
✅ **Untitled UI Figma** - 완전한 디자인 시스템

### PRO 버전 혜택

- ✅ **수백 개의 고급 UI 컴포넌트**
- ✅ **250+ 대시보드, 설정 페이지, 마케팅 페이지 예제**
- ✅ **평생 무료 업데이트**
- ✅ **우선 지원**

---

## 🚀 빠른 시작 (Quick Start)

### 1단계: 로그인 확인

구매 시 사용한 이메일로 로그인하세요:
- **이메일**: redpoint2761@seoultech.ac.kr

### 2단계: 새 프로젝트 생성

#### Option 1: CLI로 빠른 시작 (권장)

```bash
# 새 Next.js 프로젝트 생성 및 Untitled UI 설정
npx untitledui@latest init --nextjs

# 프로젝트 이름 입력
# 브랜드 색상 선택
```

**CLI가 자동으로 설정하는 것**:
- ✅ Next.js 14+ 프로젝트
- ✅ Tailwind CSS v4.1 구성
- ✅ TypeScript v5.8 설정
- ✅ React Aria v1.9 통합
- ✅ 디자인 토큰 (theme.css)
- ✅ 필수 플러그인
- ✅ 유틸리티 함수

#### Option 2: 기존 프로젝트에 추가

```bash
cd your-existing-project
npx untitledui@latest init
```

---

## 📦 필수 패키지 설치

### Core 패키지

```bash
npm install @untitledui/icons react-aria-components tailwindcss-react-aria-components tailwind-merge tailwindcss-animate
```

### 패키지 설명

| 패키지 | 용도 |
|--------|------|
| `@untitledui/icons` | Untitled UI 아이콘 세트 |
| `react-aria-components` | 접근성 컴포넌트 |
| `tailwindcss-react-aria-components` | React Aria Tailwind 플러그인 |
| `tailwind-merge` | Tailwind 클래스 병합 유틸리티 |
| `tailwindcss-animate` | 애니메이션 플러그인 |

---

## 🎨 프로젝트 구조 설정

### 1. 디렉토리 구조

```
your-project/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/           # Untitled UI 컴포넌트
│   │   ├── ui/              # Base UI 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── modal.tsx
│   │   └── application-ui/  # Application UI 컴포넌트
│   ├── utils/               # 유틸리티 함수
│   │   └── cx.ts
│   └── styles/
│       └── theme.css        # 디자인 토큰
├── public/
└── package.json
```

### 2. theme.css 설정

**src/styles/theme.css** 파일을 생성하세요:

```css
@layer base {
  :root {
    /* Fonts */
    --font-sans: 'Inter', system-ui, sans-serif;

    /* Colors */
    --color-primary-50: #f0f7ff;
    --color-primary-500: #3b82f6;
    --color-primary-600: #2563eb;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
  }
}
```

### 3. globals.css 확장

**src/app/globals.css** 파일:

```css
@import "tailwindcss";
@import "../styles/theme.css";

@plugin "@tailwindcss/forms";
@plugin "tailwindcss-animate";
@plugin "tailwindcss-react-aria-components";

@layer utilities {
  /* 커스텀 유틸리티 */
}
```

### 4. 유틸리티 함수 생성

**src/utils/cx.ts** 파일:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스를 병합하는 유틸리티 함수
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🔧 컴포넌트 사용 방법

### 방법 1: CLI로 컴포넌트 추가 (권장)

```bash
# Button 컴포넌트 추가
npx untitledui@latest add button

# Modal 컴포넌트 추가
npx untitledui@latest add modal

# 여러 컴포넌트 한 번에 추가
npx untitledui@latest add button input modal
```

**CLI가 자동으로**:
- ✅ 컴포넌트 코드 다운로드
- ✅ 의존성 확인 및 설치
- ✅ 올바른 위치에 배치

### 방법 2: 수동으로 복사 & 붙여넣기

1. [Untitled UI 문서](https://www.untitledui.com/react/docs)에서 원하는 컴포넌트 선택
2. 소스 코드 복사
3. `src/components/ui/` 디렉토리에 붙여넣기

**예시: Button 컴포넌트**

```typescript
// src/components/ui/button.tsx
import { cx } from "@/utils/cx";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", children }: ButtonProps) {
  return (
    <button
      className={cx(
        "rounded-lg font-semibold",
        variant === "primary" && "bg-primary-600 text-white",
        variant === "secondary" && "bg-gray-100 text-gray-900",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-5 py-2.5 text-lg"
      )}
    >
      {children}
    </button>
  );
}
```

### 방법 3: Figma에서 디자인 가져오기

1. **Untitled UI Figma** 파일 열기
2. 원하는 컴포넌트/페이지 선택
3. Figma → Code 플러그인 사용
4. 생성된 코드를 프로젝트에 추가

---

## 🎨 Figma와 React 연동 워크플로우

### 1. Figma에서 디자인

```
Untitled UI Figma 파일
  ↓
원하는 페이지/컴포넌트 선택
  ↓
색상, 간격, 타이포그래피 커스터마이징
```

### 2. React로 구현

**Option A: Figma → Code 플러그인**
```
Figma 디자인 선택
  ↓
플러그인으로 코드 생성
  ↓
React 컴포넌트로 변환
```

**Option B: Claude Code 활용**
```
Figma 디자인 확인
  ↓
Claude Code에게 프롬프트
"Figma 디자인대로 React 컴포넌트를 만들어줘"
  ↓
자동 생성
```

### 3. Untitled UI React 컴포넌트 사용

```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export default function LoginPage() {
  return (
    <div>
      <Input placeholder="이메일" />
      <Input type="password" placeholder="비밀번호" />
      <Button>로그인</Button>
    </div>
  );
}
```

---

## 💎 PRO 버전 독점 기능

### 추가 컴포넌트 (PRO Only)

1. **Application UI**
   - 대시보드 레이아웃
   - 데이터 테이블
   - 차트 컴포넌트
   - 설정 페이지

2. **Marketing UI**
   - 랜딩 페이지
   - 가격 표
   - 팀 섹션
   - CTA 블록

3. **250+ 페이지 예제**
   - 완성된 페이지 템플릿
   - 복사해서 바로 사용 가능

---

## 🚀 새 프로젝트 시작하기

### Step 1: Next.js 프로젝트 생성

```bash
# Untitled UI CLI로 새 프로젝트 생성
npx untitledui@latest init --nextjs

# 또는 수동으로
npx create-next-app@latest my-project
cd my-project
npx untitledui@latest init
```

### Step 2: 로그인 (PRO 버전)

```bash
# 구매 시 사용한 이메일로 로그인
npx untitledui login

# Email: redpoint2761@seoultech.ac.kr
```

### Step 3: 컴포넌트 추가

```bash
# 필요한 컴포넌트 추가
npx untitledui add button input modal

# PRO 전용 컴포넌트도 사용 가능
npx untitledui add dashboard sidebar data-table
```

### Step 4: 개발 서버 실행

```bash
npm run dev
```

---

## 🎯 실전 예제

### 예제 1: 로그인 페이지 만들기

#### 1. Figma에서 디자인 확인
```
Untitled UI Figma → Authentication → Login
```

#### 2. 필요한 컴포넌트 추가
```bash
npx untitledui add button input card
```

#### 3. 페이지 구현
```typescript
// app/auth/login/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="이메일"
          />
          <Input
            type="password"
            placeholder="비밀번호"
          />
          <Button className="w-full">
            로그인
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

### 예제 2: 대시보드 페이지 (PRO)

```bash
# PRO 전용 대시보드 템플릿 추가
npx untitledui add dashboard-layout sidebar stats-card

# 또는 완성된 페이지 템플릿 복사
# Untitled UI 문서 → Application UI → Dashboards
```

---

## 📚 Figma 디자인 시스템 활용

### Figma 파일 구조

```
Untitled UI Figma/
├── 🎨 Foundation
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Icons
├── 🧩 Components
│   ├── Buttons
│   ├── Forms
│   ├── Navigation
│   └── Feedback
├── 📱 Application UI
│   ├── Dashboards
│   ├── Settings
│   └── Data Display
└── 🌐 Marketing
    ├── Hero Sections
    ├── Features
    └── Pricing
```

### Figma → React 워크플로우

1. **Figma에서 디자인**
   - Untitled UI Figma 파일 열기
   - 원하는 컴포넌트/페이지 선택
   - 색상, 간격 커스터마이징

2. **디자인 토큰 추출**
   - Figma Tokens 플러그인 사용
   - CSS 변수로 내보내기
   - theme.css에 복사

3. **React 컴포넌트 구현**
   - Untitled UI React에서 해당 컴포넌트 찾기
   - CLI 또는 수동으로 추가
   - Figma 디자인에 맞게 커스터마이징

---

## 🎯 Claude Code로 Figma → React 최적화 방법

### 방법 1: Figma MCP 활용 (가장 효율적)

#### 1단계: Figma MCP 설정

**~/.claude/config.json**:
```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["@sethdouglasford/mcp-figma@latest"],
      "env": {
        "FIGMA_TOKEN": "your-figma-token",
        "FIGMA_WEBSOCKET_PORT": "3055"
      }
    }
  }
}
```

#### 2단계: Figma 소켓 실행

```bash
bunx cursor-talk-to-figma-socket
```

#### 3단계: Figma 플러그인에서 연결

1. Figma 파일 열기
2. Plugins → Cursor Talk To Figma MCP Plugin
3. 채널 코드 입력하여 연결

#### 4단계: Claude에게 정확한 지시

```
"Figma 채널 [채널코드]에 연결해줘
노드 ID [노드ID]를 분석해서 Untitled UI 스타일로 React 컴포넌트를 만들어줘

요구사항:
- Tailwind CSS 사용
- React Aria로 접근성 구현
- TypeScript 타입 완벽히 정의
- cx() 유틸리티 함수로 클래스 병합
- Figma의 모든 스타일 속성 정확히 반영
  - 색상 (Figma color → Tailwind class)
  - 간격 (padding, margin, gap)
  - 폰트 (font-family, size, weight)
  - 크기 (width, height)
  - border-radius
"
```

### 방법 2: Figma 스크린샷 활용

#### 1단계: Figma에서 스크린샷

```
1. Figma에서 컴포넌트 선택
2. Cmd+Shift+4 (Mac) 또는 Print Screen (Windows)
3. 스크린샷 저장
```

#### 2단계: Claude에게 이미지와 함께 요청

```
[이미지 첨부]

"이 Figma 디자인을 Untitled UI React 컴포넌트로 구현해줘

디자인 분석 요청:
- 레이아웃 구조 (flex, grid 등)
- 색상 팔레트
- 간격 (padding, margin, gap)
- 타이포그래피 (font, size, weight)
- Border radius, shadow

구현 요구사항:
- Tailwind CSS 사용
- React Aria로 접근성
- TypeScript strict mode
- cx() 유틸리티 함수
- 반응형 디자인 (mobile-first)
- data-testid 추가

컴포넌트 구조:
- Props interface 정의
- variant, size props 지원
- children 지원
- className prop으로 확장 가능
"
```

### 방법 3: Figma 노드 정보 직접 제공

#### 1단계: Figma에서 정보 수집

Figma에서 컴포넌트 선택 후 우측 패널 확인:

```
크기: 480 × 200
배경: #FFFFFF
border-radius: 24px
padding: 24px
gap: 16px

텍스트:
- 제목: 24px, Bold, #000000
- 설명: 16px, Medium, #6B7280

버튼:
- 크기: 104 × 48px
- 배경: #000000
- 텍스트: 18px, SemiBold, #FFFFFF
```

#### 2단계: Claude에게 상세 정보와 함께 요청

```
"다음 Figma 디자인을 Untitled UI React 컴포넌트로 구현해줘

## 디자인 스펙
컨테이너:
- 크기: 480 × 200px
- 배경: white
- border-radius: 24px
- padding: 24px

제목:
- font-size: 24px
- font-weight: 700
- color: black
- text-align: center

설명:
- font-size: 16px
- font-weight: 500
- color: gray-500
- text-align: center

버튼:
- 크기: 104 × 48px
- 배경: black
- 텍스트: 18px, 600, white
- border-radius: 8px

레이아웃:
- display: flex
- flex-direction: column
- align-items: center
- justify-content: space-between
- gap: 16px

## 구현 요구사항
1. Tailwind CSS 클래스로 스타일링
2. cx() 유틸리티 함수 사용
3. TypeScript interface로 Props 정의
4. variant props 지원 (info, danger)
5. actions props 지원 (single, dual)
6. React Aria로 접근성
7. 완전한 타입 안정성
"
```

### 방법 4: 단계별 점진적 구현

#### Step 1: 구조 먼저

```
"Figma 디자인을 분석해서 HTML 구조만 먼저 만들어줘
- semantic HTML 사용
- div, section, button 등 적절한 태그
- 중첩 구조 명확히
"
```

#### Step 2: 스타일 추가

```
"이제 Tailwind CSS 클래스를 추가해줘
- Figma의 모든 스타일 속성 반영
- 색상, 간격, 폰트, 크기, radius
- 반응형 클래스 (sm:, md:, lg:)
"
```

#### Step 3: Props와 타입

```
"TypeScript interface를 추가하고 Props를 구현해줘
- variant, size, theme props
- children 지원
- className prop으로 확장 가능
- onClick 등 이벤트 핸들러
"
```

#### Step 4: 접근성

```
"React Aria를 추가해서 접근성을 구현해줘
- ARIA 속성
- 키보드 네비게이션
- 스크린 리더 지원
"
```

---

## 🎨 Claude Code 최적화 팁

### 1. 명확한 컨텍스트 제공

```
"Untitled UI Figma의 Modal 컴포넌트를 React로 구현해줘

기존 프로젝트 정보:
- 스타일링: Tailwind CSS v4.1
- 프레임워크: Next.js 15
- 타입: TypeScript strict mode
- 유틸리티: cx() 함수 사용 (tailwind-merge)

참고 컴포넌트:
- Button: @/components/ui/button
- Input: @/components/ui/input

기존 패턴 유지:
- variant, size, theme props 구조
- data-testid 추가
- JSDoc 주석
"
```

### 2. 참조 파일 활용

```
"@src/components/ui/button.tsx 파일을 참고해서
동일한 패턴으로 Modal 컴포넌트를 만들어줘

Button과 동일하게:
- Props interface
- cx() 유틸리티 사용
- variant 시스템
- TypeScript strict mode
"
```

### 3. 규칙 파일 활용

```
"@.cursor/rules/02-wireframe.mdc 규칙을 준수하여
Figma 디자인을 React 컴포넌트로 구현해줘

추가 요구사항:
- Untitled UI 스타일 가이드 준수
- Tailwind CSS 사용
- flexbox만 사용
- !important 금지
"
```

### 4. 반복적 개선

```
Step 1: "먼저 기본 구조만 구현해줘"
  → 확인

Step 2: "이제 Tailwind 스타일을 정확히 추가해줘"
  → 확인

Step 3: "variant와 size props를 추가해줘"
  → 확인

Step 4: "React Aria로 접근성을 추가해줘"
  → 완성
```

### 5. 비교 요청

```
"Figma 디자인과 현재 구현을 비교해서
차이점을 알려주고 수정해줘

비교 항목:
- 크기 (width, height)
- 색상
- 간격 (padding, margin, gap)
- 폰트 (family, size, weight)
- border-radius
- shadow
"
```

---

## 🚀 Claude Code 최적 프롬프트 템플릿

### Template 1: Figma MCP 사용 시

```
Figma 채널: [채널코드]
노드 ID: [노드ID]

이 Figma 노드를 분석해서 Untitled UI React 컴포넌트로 구현해줘

기술 스택:
- React 19.1
- TypeScript 5.8
- Tailwind CSS 4.1
- React Aria 1.9

구현 요구사항:
1. 모든 스타일 속성 정확히 반영 (색상, 크기, 간격, 폰트)
2. cx() 유틸리티로 클래스 병합
3. variant, size, theme props 시스템
4. React Aria로 접근성 구현
5. TypeScript strict mode
6. data-testid 추가
7. JSDoc 주석

파일 구조:
- src/components/ui/[component-name].tsx
- interface [Component]Props { }
- export function [Component]() { }

참조:
- 기존 Button: @src/components/ui/button.tsx
- 기존 Modal: @src/components/ui/modal.tsx
```

### Template 2: 스크린샷 사용 시

```
[Figma 스크린샷 첨부]

이 디자인을 Untitled UI React 컴포넌트로 구현해줘

디자인 분석 요청:
1. 레이아웃 구조 (flex/grid, 방향, 정렬)
2. 색상 팔레트 (배경, 텍스트, 테두리)
3. 간격 시스템 (padding, margin, gap - px 단위)
4. 타이포그래피 (font-family, size, weight, line-height)
5. Border (radius, width, color)
6. Shadow (elevation level)
7. 상태 (hover, focus, active, disabled)

Tailwind 변환 규칙:
- Figma px → Tailwind spacing (4px = 1, 8px = 2...)
- Figma color hex → Tailwind color class
- Figma font-size → Tailwind text class

구현 요구사항:
- Tailwind CSS v4.1
- React Aria v1.9
- TypeScript strict
- cx() 유틸리티
- Props: variant, size, theme, className
- 접근성: ARIA 속성, 키보드 네비게이션
- 반응형: sm:, md:, lg: 브레이크포인트

참조 컴포넌트:
@src/components/ui/button.tsx - 기존 패턴 준수
```

### Template 3: 상세 스펙 제공 시

```
다음 스펙으로 Untitled UI React 컴포넌트를 구현해줘

## Component: Modal

### 크기
- width: 480px
- height: auto
- min-height: 200px

### 색상
- 배경: #FFFFFF (white)
- 텍스트 (제목): #000000 (gray-900)
- 텍스트 (설명): #6B7280 (gray-500)
- 버튼 (primary): #000000 (black)
- 버튼 텍스트: #FFFFFF (white)

### 간격
- padding: 24px
- gap (제목-설명): 16px
- gap (설명-버튼): 40px

### 타이포그래피
제목:
- font-family: Pretendard Variable
- font-size: 24px
- font-weight: 700 (Bold)
- line-height: 24px
- letter-spacing: -0.24px

설명:
- font-family: Pretendard Variable
- font-size: 20px
- font-weight: 500 (Medium)
- line-height: 24px
- letter-spacing: -0.2px

### 버튼
- 크기: 104 × 48px (dual), 432 × 48px (single)
- border-radius: 8px
- font-size: 18px
- font-weight: 600

### 레이아웃
- display: flex
- flex-direction: column
- align-items: center
- justify-content: space-between

### Props Interface
interface ModalProps {
  variant: "info" | "danger"
  actions: "single" | "dual"
  title: string
  description: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

구현:
1. Tailwind CSS로 모든 스타일 변환
2. cx() 유틸리티로 조건부 클래스
3. React Aria Modal 컴포넌트 사용
4. TypeScript strict mode
5. data-testid 추가
6. 완벽한 접근성
```

---

## 🎯 Figma 속성 → Tailwind 변환 가이드

### 색상 변환

| Figma | Tailwind |
|-------|----------|
| #FFFFFF | `bg-white` |
| #000000 | `bg-black` |
| #3B82F6 | `bg-blue-500` |
| #6B7280 | `text-gray-500` |

### 간격 변환

| Figma (px) | Tailwind | 값 |
|------------|----------|-----|
| 4px | `p-1` | 0.25rem |
| 8px | `p-2` | 0.5rem |
| 16px | `p-4` | 1rem |
| 24px | `p-6` | 1.5rem |
| 32px | `p-8` | 2rem |
| 40px | `p-10` | 2.5rem |

### 폰트 변환

| Figma | Tailwind |
|-------|----------|
| 12px | `text-xs` |
| 14px | `text-sm` |
| 16px | `text-base` |
| 18px | `text-lg` |
| 20px | `text-xl` |
| 24px | `text-2xl` |

### Border Radius 변환

| Figma | Tailwind |
|-------|----------|
| 4px | `rounded` |
| 8px | `rounded-lg` |
| 16px | `rounded-2xl` |
| 24px | `rounded-3xl` |
| 9999px | `rounded-full` |

---

## 💡 Claude에게 효과적으로 요청하는 7가지 원칙

### 1. 명확한 기술 스택 명시

```
✅ "Tailwind CSS v4.1, React Aria v1.9, TypeScript v5.8로 구현해줘"
❌ "React로 만들어줘"
```

### 2. 참조 파일 제공

```
✅ "@src/components/ui/button.tsx 패턴을 따라서 구현해줘"
❌ "비슷하게 만들어줘"
```

### 3. 정확한 수치 제공

```
✅ "width: 480px, height: 200px, padding: 24px, gap: 16px"
❌ "적당한 크기로"
```

### 4. 모든 상태 명시

```
✅ "default, hover, focus, active, disabled 상태 모두 구현"
❌ "기본 버튼 만들어줘"
```

### 5. Props 구조 미리 정의

```
✅ "Props: variant(info|danger), actions(single|dual), title, description"
❌ "모달 만들어줘"
```

### 6. 접근성 요구사항

```
✅ "React Aria Modal, ARIA 속성, 키보드 ESC로 닫기, 포커스 트랩"
❌ "접근성 좋게 해줘"
```

### 7. 검증 기준 제시

```
✅ "Figma와 비교해서 차이점을 알려주고 수정해줘"
❌ "잘 만들어줘"
```

---

## 🛠️ 환경 구성 (상세)

### 1. Tailwind CSS 구성

**tailwind.config.ts**:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--color-primary-50)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("tailwindcss-react-aria-components"),
  ],
};

export default config;
```

### 2. TypeScript 설정

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 3. 디자인 토큰 (theme.css)

**src/styles/theme.css**:

```css
@layer base {
  :root {
    /* Typography */
    --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Primary Colors */
    --color-primary-50: #f0f7ff;
    --color-primary-100: #dbeeff;
    --color-primary-500: #3b82f6;
    --color-primary-600: #2563eb;
    --color-primary-700: #1d4ed8;

    /* Gray Scale */
    --color-gray-50: #f9fafb;
    --color-gray-100: #f3f4f6;
    --color-gray-500: #6b7280;
    --color-gray-900: #111827;

    /* Spacing */
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-4: 1rem;

    /* Shadows */
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    /* Border Radius */
    --radius-none: 0;
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-full: 9999px;
  }
}
```

---

## 💡 컴포넌트 커스터마이징

### 소스 코드 직접 수정

Untitled UI React의 **가장 큰 장점**:

```typescript
// src/components/ui/button.tsx
// 이 파일은 YOUR 프로젝트에 있습니다!
// 마음대로 수정하세요

export function Button({ variant, size, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        "rounded-lg font-semibold transition-colors",
        // 여기를 수정해서 스타일 변경
        variant === "primary" && "bg-blue-600 hover:bg-blue-700",
        // 새로운 variant 추가
        variant === "danger" && "bg-red-600 hover:bg-red-700",
        // ...
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**장점**:
- ✅ 코드를 완전히 소유
- ✅ 업데이트 걱정 없음
- ✅ 무한 커스터마이징

---

## 📖 PRO 버전 사용 가이드

### PRO 컴포넌트 접근

로그인 후 PRO 전용 컴포넌트를 사용할 수 있습니다:

```bash
# 로그인
npx untitledui login
# Email: redpoint2761@seoultech.ac.kr

# PRO 컴포넌트 추가
npx untitledui add dashboard-sidebar
npx untitledui add data-table
npx untitledui add kanban-board
```

### 페이지 템플릿 사용

**250+ 완성된 페이지 템플릿**:

1. [Untitled UI 문서](https://www.untitledui.com/react) 접속
2. Application UI → Dashboards 선택
3. 원하는 템플릿 선택
4. "Copy code" 클릭
5. 프로젝트에 붙여넣기

---

## 🔄 업데이트 방법

### 평생 무료 업데이트

```bash
# CLI 업데이트
npm install -g untitledui@latest

# 컴포넌트 업데이트 확인
npx untitledui update

# 특정 컴포넌트 재설치
npx untitledui add button --force
```

**참고**: 소스 코드를 직접 소유하므로, 업데이트는 **선택사항**입니다.

---

## 🎯 우리 프로젝트와의 비교

### 현재 프로젝트 구조

우리는 **Untitled UI와 유사한 구조**를 이미 구축했습니다:

| 항목 | Untitled UI | 우리 프로젝트 | 상태 |
|------|-------------|--------------|------|
| **컴포넌트 시스템** | 1,325+ | 7개 | ✅ 기본 완성 |
| **Provider 구조** | Auth, Theme, Modal | Auth, Modal, ReactQuery, NextThemes | ✅ 유사 |
| **스타일링** | Tailwind CSS | CSS Module | ⚠️ 다름 |
| **접근성** | React Aria | 기본 HTML | ⚠️ 개선 가능 |
| **타입** | TypeScript | TypeScript | ✅ 동일 |

### Untitled UI 적용 시 이점

1. **컴포넌트 확장**
   - 현재 7개 → 1,325+ 컴포넌트 사용 가능

2. **접근성 향상**
   - React Aria로 자동 WCAG 준수

3. **디자인 시스템**
   - Figma와 완벽 동기화

---

## 🚧 마이그레이션 가이드

### 기존 프로젝트에 Untitled UI 추가

#### 1단계: 점진적 도입

```bash
# 기존 프로젝트 유지
# Untitled UI 컴포넌트만 추가
npx untitledui add button input modal

# 기존 컴포넌트와 공존 가능
```

#### 2단계: Tailwind CSS 통합

```bash
# Tailwind 이미 사용 중이라면
npm install tailwindcss-animate tailwindcss-react-aria-components
```

#### 3단계: 순차적 교체

```typescript
// 기존 Button 유지
import Button from "@/commons/components/button";

// Untitled UI Button은 다른 이름으로
import { Button as UiButton } from "@/components/ui/button";
```

---

## 📚 학습 리소스

### 공식 문서

- [Introduction](https://www.untitledui.com/react/docs/introduction)
- [Installation](https://www.untitledui.com/react/docs/installation)
- [Components](https://www.untitledui.com/react/docs/components)
- [Examples](https://www.untitledui.com/react/docs/examples)

### GitHub

- [Untitled UI React GitHub](https://github.com/untitleduico/react)
- [Issues & Support](https://github.com/untitleduico/react/issues)

### Figma

- [Untitled UI Figma Community](https://untitledui.com/figma)
- [Design Tokens](https://www.untitledui.com/figma/design-tokens)

---

## ❓ FAQ (PRO 버전)

### Q: PRO 버전과 무료 버전의 차이는?

A:
- **무료**: 기본 UI 컴포넌트
- **PRO**: 고급 컴포넌트 + 250+ 페이지 템플릿 + 우선 지원

### Q: 라이센스는 어떻게 되나요?

A:
- ✅ 무제한 프로젝트 사용
- ✅ 상업적 사용 가능
- ✅ 팀원과 공유 가능

### Q: Figma 파일도 수정할 수 있나요?

A: 네! Figma 파일을 복사해서 완전히 커스터마이징할 수 있습니다.

### Q: 기술 지원은 어떻게 받나요?

A:
- 이메일 지원
- GitHub Issues
- 커뮤니티 포럼

### Q: 환불 정책은?

A: 구매 후 30일 이내 환불 가능합니다.

---

## 🎉 다음 단계

### 1. 첫 프로젝트 만들기

```bash
npx untitledui@latest init --nextjs my-awesome-app
cd my-awesome-app
npx untitledui login
npx untitledui add button input modal
npm run dev
```

### 2. Figma 디자인 탐색

- Untitled UI Figma 파일 열기
- 마음에 드는 페이지/컴포넌트 찾기
- 색상, 스타일 커스터마이징

### 3. Claude Code와 함께 개발

```bash
claude
```

프롬프트 예시:
```
"Untitled UI의 Button과 Input을 사용해서 로그인 폼을 만들어줘"
```

---

## 💪 성공적인 사용을 위한 팁

1. ✅ **Figma 먼저** - 디자인을 먼저 확정
2. ✅ **CLI 활용** - 수동보다 CLI가 빠름
3. ✅ **문서 참조** - 각 컴포넌트의 Props 확인
4. ✅ **점진적 도입** - 한 번에 하나씩
5. ✅ **커스터마이징** - 코드를 소유하므로 마음대로 수정

---

## 🎊 결론

**Untitled UI React + Untitled UI Figma**로:

- ✅ **수개월의 디자인 시간 절약**
- ✅ **픽셀 완벽한 구현**
- ✅ **접근성 자동 준수**
- ✅ **무한 커스터마이징**
- ✅ **평생 무료 업데이트**

**새 프로젝트를 빠르게 시작하세요!** 🚀

---

## 📞 지원

문제가 있거나 질문이 있으신가요?

- 📧 **이메일**: support@untitledui.com
- 💬 **GitHub**: [Issues](https://github.com/untitleduico/react/issues)
- 📖 **문서**: [docs.untitledui.com](https://www.untitledui.com/react/docs)

**구매해 주셔서 감사합니다!** 🙏
