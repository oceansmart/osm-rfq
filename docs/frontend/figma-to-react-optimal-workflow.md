# Untitled UI Figma → React 최적화 워크플로우 및 프롬프트

> **Untitled UI Figma 디자인을 Untitled UI React로 완벽하게 구현하는 방법**
> Claude Code를 활용한 최적의 개발 프로세스

---

## 🎯 개요

**목표**: Untitled UI Figma에서 디자인된 컴포넌트를 Untitled UI React로 **픽셀 완벽하게** 구현

**핵심 전략**:
- ✅ Figma와 React가 **같은 디자인 시스템 사용** (Untitled UI)
- ✅ Claude Code가 **자동으로 변환**
- ✅ **일관성 보장** (Figma = React)

---

## 🚀 최적화 워크플로우 (5단계)

### 📋 Step 1: Figma 디자인 분석 및 준비

#### 1-1. Figma에서 컴포넌트 확인

```
Untitled UI Figma 파일 열기
  ↓
원하는 화면/컴포넌트 선택
  ↓
우측 패널에서 정보 확인:
  - 노드 ID (중요!)
  - 크기 (width × height)
  - 색상 (hex)
  - 간격 (padding, gap)
  - 폰트 (family, size, weight)
```

#### 1-2. 노드 ID 복사

```
1. Figma에서 컴포넌트 선택
2. 우클릭 → "Copy/Paste as" → "Copy link"
3. URL에서 노드 ID 추출
   예: ?node-id=3:140 → 노드 ID: 3:140
```

#### 1-3. 사용된 Untitled UI 컴포넌트 파악

```
이 디자인에 사용된 기본 컴포넌트 확인:
- Button? → npx untitledui add button
- Input? → npx untitledui add input
- Modal? → npx untitledui add modal
- Card? → npx untitledui add card
```

---

### 🔗 Step 2: Figma MCP 연결 (권장)

#### 2-1. Figma 소켓 실행

```bash
bunx cursor-talk-to-figma-socket
```

#### 2-2. Figma 플러그인 연결

```
1. Figma 파일에서 Plugins → Cursor Talk To Figma
2. WebSocket Server Port: 3055
3. 채널 생성 (자동 생성된 코드 복사)
```

#### 2-3. Claude에게 연결 요청

```
"Figma 채널 [채널코드]에 연결해줘"
```

---

### 🎨 Step 3: Claude에게 최적 프롬프트 전달

#### 🏆 골드 프롬프트 템플릿

```
Figma 노드 [노드ID]를 분석해서 Untitled UI React 컴포넌트로 구현해줘

## 프로젝트 환경
- Untitled UI React (구매 버전)
- React 19.1
- TypeScript 5.8 strict mode
- Tailwind CSS 4.1
- React Aria 1.9
- Next.js 15 App Router

## Figma 분석 요청
1. 레이아웃 구조 (flex/grid, direction, alignment)
2. 모든 색상 (hex → Tailwind class 변환)
3. 모든 간격 (px → Tailwind spacing 변환)
4. 타이포그래피 (font-family, size, weight → Tailwind)
5. Border (radius, width, color)
6. Shadow (Figma elevation → Tailwind shadow)
7. 상태 (default, hover, focus, active, disabled)
8. 애니메이션/트랜지션
9. 중첩 컴포넌트 (Button, Input 등)

## 구현 필수 사항
1. **Untitled UI React 패턴 준수**
   - cx() 유틸리티 함수 사용
   - Tailwind 클래스로 스타일링
   - React Aria 컴포넌트 사용

2. **컴포넌트 구조**
   ```typescript
   interface [Component]Props {
     variant?: "primary" | "secondary" | ...
     size?: "sm" | "md" | "lg"
     className?: string
     children?: React.ReactNode
   }

   export function [Component]({ variant, size, className, children }: [Component]Props) {
     return (
       <div className={cx(
         "base-classes",
         variant === "primary" && "variant-classes",
         size === "md" && "size-classes",
         className
       )}>
         {children}
       </div>
     );
   }
   ```

3. **스타일 변환**
   - Figma px → Tailwind spacing (4px=1, 8px=2, 16px=4...)
   - Figma hex → Tailwind color class
   - Figma font-size → Tailwind text-[size]

4. **접근성**
   - React Aria 컴포넌트 래핑
   - ARIA 속성 추가
   - 키보드 네비게이션
   - 포커스 관리

5. **TypeScript**
   - 모든 Props 타입 정의
   - strict mode 준수
   - nullable 체크
   - 반환 타입 명시

6. **테스트**
   - data-testid 추가
   - 모든 상태 테스트 가능하도록

## 파일 위치
- src/components/ui/[component-name].tsx

## 검증
구현 후 Figma 디자인과 비교해서:
1. 크기가 정확한지
2. 색상이 일치하는지
3. 간격이 동일한지
4. 폰트가 같은지
5. 상태 변화가 자연스러운지

차이점이 있으면 수정해줘
```

---

### 🔍 Step 4: 검증 및 비교

#### 4-1. 자동 비교 요청

```
"방금 구현한 컴포넌트를 Figma 노드 [노드ID]와 비교해서
차이점을 테이블로 정리하고 수정해줘

비교 항목:
| 속성 | Figma | 현재 구현 | 일치 여부 |
|------|-------|----------|----------|
| width | 480px | ? | ? |
| height | 200px | ? | ? |
| padding | 24px | ? | ? |
| gap | 16px | ? | ? |
| bg-color | #FFFFFF | ? | ? |
| border-radius | 24px | ? | ? |
| title font-size | 24px | ? | ? |
| title font-weight | 700 | ? | ? |
"
```

#### 4-2. 시각적 확인

```
"브라우저에서 확인할 수 있도록 Storybook 스토리를 생성해줘

모든 variant와 size 조합을 보여주는 스토리:
- variant: primary, secondary, danger
- size: sm, md, lg
- state: default, hover, focus, disabled
"
```

---

### ✅ Step 5: 반복 및 완성도 향상

#### 5-1. 반응형 확인

```
"mobile, tablet, desktop에서 모두 테스트해줘

반응형 브레이크포인트:
- mobile: ~640px (sm:)
- tablet: 640px~1024px (md:)
- desktop: 1024px~ (lg:)

각 브레이크포인트에서:
- 레이아웃 조정
- 폰트 크기 조정
- 간격 조정
"
```

#### 5-2. 다크모드 지원

```
"다크모드를 추가해줘

Untitled UI Figma의 Dark Mode 변형 참고:
- 배경색 dark: 변환
- 텍스트색 dark: 변환
- 테두리색 dark: 변환

Tailwind 다크모드 클래스:
- dark:bg-gray-900
- dark:text-white
- dark:border-gray-700
"
```

---

## 🎯 실전 워크플로우 예시

### 시나리오: 로그인 페이지 구현

#### Phase 1: 준비 (5분)

```bash
# 1. Figma MCP 연결
bunx cursor-talk-to-figma-socket

# 2. 필요한 Untitled UI 컴포넌트 추가
npx untitledui login
npx untitledui add button input card
```

#### Phase 2: Figma 분석 (2분)

```
Figma에서:
1. "Login" 페이지 선택
2. 노드 ID 복사: 5:234
3. 사용된 컴포넌트: Card, Input, Button
4. 레이아웃: 중앙 정렬 Card
```

#### Phase 3: Claude 프롬프트 (1분)

```
"Figma 채널 [채널코드]에 연결하고
노드 5:234 (Login 페이지)를 분석해서 구현해줘

페이지 구조:
- 중앙 정렬 Card (480px)
- 제목 "로그인"
- Email Input
- Password Input
- 로그인 Button (full width)
- 회원가입 링크

Untitled UI React 컴포넌트 사용:
- @/components/ui/card
- @/components/ui/input
- @/components/ui/button

구현 요구사항:
- Tailwind CSS로 레이아웃
- React Hook Form + Zod 검증
- TypeScript strict mode
- 반응형 디자인
- 다크모드 지원

파일:
- src/app/auth/login/page.tsx
"
```

#### Phase 4: 검증 (2분)

```
"Figma 디자인과 비교해서 차이점 확인하고 수정해줘

특히 확인:
- Card 크기 정확한지
- Input 간격이 맞는지
- Button 스타일 일치하는지
- 폰트 크기/weight 동일한지
"
```

#### Phase 5: 완성도 (5분)

```
"추가 기능 구현:
1. 이메일 형식 검증 (Zod)
2. 비밀번호 8자 이상 (Zod)
3. 로딩 상태 (isSubmitting)
4. 에러 메시지 표시
5. 성공 시 리다이렉트
6. Playwright 테스트
"
```

**총 소요 시간**: ~15분 (수동 대비 10배 빠름!)

---

## 📝 프롬프트 치트시트

### 🥇 최고의 프롬프트 (All-in-One)

```
# === Untitled UI Figma → React 완벽 변환 ===

Figma 채널: [채널코드]
노드 ID: [노드ID]
컴포넌트명: [컴포넌트명]

## Step 1: Figma ���드 분석
이 노드의 모든 정보를 추출해줘:
1. absoluteBoundingBox (크기와 위치)
2. fills (배경색)
3. strokes (테두리)
4. cornerRadius (border-radius)
5. padding
6. children (중첩 요소)
7. typography (폰트 스타일)

## Step 2: Untitled UI React 컴포넌트 매칭
Figma 컴포넌트와 일치하는 Untitled UI React 컴포넌트 확인:
- Figma "Button" → @/components/ui/button
- Figma "Input" → @/components/ui/input
- Figma "Modal" → @/components/ui/modal
없으면 새로 생성

## Step 3: Tailwind 변환 규칙
정확한 변환:
- Figma 480px width → w-[480px] (정확한 값)
- Figma 24px padding → p-6 (Tailwind 스케일)
- Figma #3B82F6 → bg-blue-500 (가장 가까운 색)
- Figma "Pretendard, 24px, Bold" → font-sans text-2xl font-bold

## Step 4: React 컴포넌트 구현
```typescript
// src/components/ui/[component].tsx
import { cx } from "@/utils/cx";
import { [ReactAriaComponent] } from "react-aria-components";

interface [Component]Props {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
  // Figma에서 확인한 모든 props
}

export function [Component]({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: [Component]Props) {
  return (
    <[ReactAriaComponent]
      className={cx(
        // Figma 기본 스타일 → Tailwind
        "flex flex-col items-center justify-between",
        "w-[480px] min-h-[200px]",
        "p-6 gap-4",
        "bg-white rounded-3xl",

        // variant
        variant === "primary" && "bg-blue-600 text-white",
        variant === "secondary" && "bg-gray-100 text-gray-900",

        // size
        size === "sm" && "p-4 text-sm",
        size === "md" && "p-6 text-base",
        size === "lg" && "p-8 text-lg",

        // 확장 가능
        className
      )}
      {...props}
    >
      {children}
    </[ReactAriaComponent]>
  );
}
```

## Step 5: 검증
구현 완료 후 Figma와 비교:
1. 크기 일치 확인 (dev tools로 측정)
2. 색상 일치 확인 (hex 비교)
3. 간격 일치 확인 (padding, margin, gap)
4. 폰트 일치 확인 (family, size, weight)
5. 반응형 동작 확인
6. 접근성 확인 (키보드, 스크린리더)

차이점이 있으면 즉시 수정해줘
```

---

## 🎨 컴포넌트별 최적 프롬프트

### Button 컴포넌트

```
Figma 노드 [ID]의 Button을 Untitled UI React로 구현해줘

Figma 분석:
- 크기: [width] × [height]px
- 색상: primary [hex], secondary [hex]
- 폰트: [size]px, [weight]
- radius: [값]px
- 상태: default, hover, focus, active, disabled

Untitled UI React 구현:
1. @/components/ui/button.tsx 참조
2. variant props: primary, secondary, tertiary
3. size props: sm, md, lg
4. React Aria Button 사용
5. Tailwind 클래스로 스타일
6. cx() 유틸리티로 병합

Props Interface:
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary"
  size?: "sm" | "md" | "lg"
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
  onPress?: () => void
}
```

검증:
- Figma의 모든 스타일 속성 100% 일치
- 모든 상태 구현
- 접근성 완벽
```

### Input 컴포넌트

```
Figma 노드 [ID]의 Input을 Untitled UI React로 구현해줘

Figma 분석:
- 크기: full width × [height]px
- 색상: border [hex], focus [hex], error [hex]
- 폰트: [size]px, [weight]
- padding: [값]px
- placeholder 스타일
- 상태: default, focus, error, disabled

Untitled UI React 구현:
1. @/components/ui/input.tsx 참조
2. variant props: default, error
3. size props: sm, md, lg
4. React Aria TextField 사용
5. forwardRef로 ref 전달

Props Interface:
```typescript
interface InputProps {
  variant?: "default" | "error"
  size?: "sm" | "md" | "lg"
  label?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}
```

추가 기능:
- React Hook Form 통합
- Zod 검증
- 에러 메시지 표시
```

### Modal 컴포넌트

```
Figma 노드 [ID]의 Modal을 Untitled UI React로 구현해줘

Figma 분석:
- Overlay: backdrop [color], [opacity]
- Modal 크기: [width] × [height]px
- 위치: 중앙
- 색상: 배경 [hex]
- 간격: padding [값]px, gap [값]px
- 애니메이션: fade-in, scale

Untitled UI React 구현:
1. @/components/ui/modal.tsx 참조 (없으면 생성)
2. React Aria Modal, Dialog, Overlay 사용
3. Portal로 body에 렌더링
4. ESC 키로 닫기
5. 외부 클릭으로 닫기

Props Interface:
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
}
```

구현:
```typescript
<Modal isOpen={isOpen} onClose={onClose}>
  <Dialog className={cx(...)}>
    <Heading>{title}</Heading>
    {description && <Text>{description}</Text>}
    {children}
  </Dialog>
</Modal>
```

접근성:
- 포커스 트랩
- ARIA role="dialog"
- aria-labelledby, aria-describedby
```

---

## 🔄 반복 최적화 프롬프트

### 초기 구현 후 개선

```
"현재 구현된 [컴포넌트]를 개선해줘

## 개선 사항
1. **Figma 정확도**
   - Figma 디자인과 픽셀 단위로 일치하도록
   - dev tools로 측정해서 비교

2. **성능 최적화**
   - 불필요한 리렌더링 방지 (React.memo)
   - 큰 컴포넌트는 lazy loading

3. **접근성 향상**
   - ARIA 속성 완벽히
   - 키보드만으로 모든 기능 사용 가능
   - 스크린 리더 테스트

4. **타입 안정성**
   - Props 타입 더 엄격하게
   - Union type으로 허용 값 제한
   - Generics 활용

5. **재사용성**
   - 더 많은 variant 지원
   - composition 패턴
   - compound components
"
```

---

## 💡 Figma → React 매핑 치트시트

### Figma Auto Layout → Tailwind Flexbox

| Figma Auto Layout | Tailwind |
|-------------------|----------|
| Horizontal | `flex flex-row` |
| Vertical | `flex flex-col` |
| Spacing: 16 | `gap-4` |
| Padding: 24 | `p-6` |
| Align: Center | `items-center` |
| Justify: Space Between | `justify-between` |

### Figma Effects → Tailwind

| Figma Effect | Tailwind |
|--------------|----------|
| Drop Shadow (sm) | `shadow-sm` |
| Drop Shadow (md) | `shadow-md` |
| Drop Shadow (lg) | `shadow-lg` |
| Blur (sm) | `backdrop-blur-sm` |

### Figma Constraints → Tailwind

| Figma Constraint | Tailwind |
|------------------|----------|
| Fill container (width) | `w-full` |
| Fill container (height) | `h-full` |
| Fixed width | `w-[480px]` |
| Min width | `min-w-[320px]` |
| Max width | `max-w-md` |

---

## 🚀 고급 워크플로우

### 복잡한 페이지 구현

```
"Figma 노드 [노드ID] (Dashboard 페이지)를 분석해서
여러 Untitled UI React 컴포넌트를 조합해서 구현해줘

페이지 분석:
1. 레이아웃 구조 파악
   - Header
   - Sidebar
   - Main Content
   - Footer

2. 각 영역의 컴포넌트 확인
   - Header: Logo, Navigation, User Menu
   - Sidebar: Menu Items, Icons
   - Main: Cards, Tables, Charts

3. 필요한 Untitled UI 컴포넌트
   - npx untitledui add card table chart sidebar

4. 순차적 구현
   Step 1: Layout 구조 (Grid/Flex)
   Step 2: Header 컴포넌트
   Step 3: Sidebar 컴포넌트
   Step 4: Main Content
   Step 5: 통합 및 상태 관리

5. 상태 관리
   - Zustand 또는 Context API
   - 사이드바 open/close
   - 테마 전환
   - 사용자 데이터

각 단계마다 Figma와 비교해서 정확도 확인
"
```

---

## 🎯 프롬프트 최적화 체크리스트

### ✅ 필수 포함 사항

- [ ] Figma 노드 ID 또는 스크린샷
- [ ] 기술 스택 명시 (Untitled UI React, Tailwind v4.1, React Aria v1.9)
- [ ] 정확한 수��� (px 단위)
- [ ] Props 구조 정의
- [ ] 접근성 요구사항
- [ ] 참조 파일 (@파일경로)
- [ ] 검증 기준

### ✅ 권장 포함 사항

- [ ] 기존 프로젝트 컨텍스트
- [ ] 커서 규칙 (@.cursor/rules)
- [ ] 상태 정의 (hover, focus, disabled)
- [ ] 반응형 브레이크포인트
- [ ] 다크모드 지원
- [ ] 테스트 요구사항

### ❌ 지양할 것

- [ ] 모호한 요청 ("예쁘게", "적당히")
- [ ] 기술 스택 미명시
- [ ] 수치 없이 "큰/작은"
- [ ] 상태 누락
- [ ] 검증 기준 없음

---

## 🎉 성공 사례: 우리 프로젝트

### 구현한 컴포넌트 (Figma → React)

| 컴포넌트 | Figma 노드 | 소요 시간 | 정확도 |
|----------|-----------|----------|--------|
| Modal | 3:1046, 3:670 | 10분 | 100% |
| DiariesNew | 3:837 | 15분 | 100% |
| Pictures | 5807:1095 | 20분 | 100% |

### 성공 요인

1. ✅ **Figma MCP 사용** - 노드 ID로 정확한 분석
2. ✅ **상세한 프롬프트** - 모든 요구사항 명시
3. ✅ **단계별 검증** - 구현 후 즉시 비교
4. ✅ **참조 파일 활용** - 기존 패턴 준수
5. ✅ **커서 규칙 준수** - 일관성 유지

---

## 📚 참고 자료

### Untitled UI

- [Untitled UI React Docs](https://www.untitledui.com/react/docs)
- [Untitled UI Figma](https://untitledui.com/figma)
- [Component Library](https://www.untitledui.com/react/docs/components)

### Tailwind CSS

- [Tailwind CSS v4.1 Docs](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

### React Aria

- [React Aria Docs](https://react-spectrum.adobe.com/react-aria/)
- [Component Examples](https://react-spectrum.adobe.com/react-aria/examples/)

---

## 🎯 결론

**Untitled UI Figma + Untitled UI React + Claude Code** 조합으로:

- ✅ **개발 시간 90% 단축** (수 시간 → 수 분)
- ✅ **픽셀 완벽 구현** (100% Figma 일치)
- ✅ **접근성 자동 준수** (React Aria)
- ✅ **타입 안전성** (TypeScript strict)
- ✅ **일관성 보장** (같은 디자인 시스템)

**최고의 프론트엔드 개발 경험을 누리세요!** 🚀
