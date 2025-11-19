# Modal Provider 구현 프롬프트

> OSM RFQ 시스템의 전역 모달 관리를 위한 Provider 구현

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
1. `src/commons/providers/modal/modal.provider.tsx` - Modal Provider 구현 (NEW)
2. `src/app/layout.tsx` - Provider 연결 (UPDATE)

### 참조할 파일 (읽기 전용):
- `/Users/kimjongwook/project/challenge-02/src/commons/providers/modal/modal.provider.tsx` - 레퍼런스 구현
- `/Users/kimjongwook/project/challenge-02/src/app/layout.tsx` - 레퍼런스 layout

---

## 🎯 핵심 요구사항

### 요구사항 1: Modal Provider 기본 구현

**createPortal을 사용하여 기본적인 modal 셋팅을 구현할 것**

필수 기능:
- React Context API 기반 전역 모달 상태 관리
- `createPortal`을 사용하여 `document.body`에 모달 렌더링
- 중첩 모달 지원 (여러 모달 동시 열기)
- z-index 자동 관리 (50 + index)
- body 스크롤 제어 (모달 열릴 때 스크롤 비활성화)

### 요구사항 2: Modal Context API

**다음 API를 제공할 것:**

```typescript
interface ModalContextType {
  openModal: (content: ReactNode) => void;      // 모달 열기
  closeModal: () => void;                        // 가장 최근 모달 닫기
  closeAllModals: () => void;                    // 모든 모달 닫기
}
```

### 요구사항 3: Modal 스타일 수정

**모달 wrapper의 `max-w-md`, `w-full` 제거할 것**

레퍼런스:
```tsx
// ❌ 제거할 스타일
<div className="relative max-w-md w-full bg-white rounded-lg shadow-xl">

// ✅ 적용할 스타일
<div className="relative bg-white rounded-lg shadow-xl">
```

이유: 모달 컨텐츠의 크기는 내부 컴포넌트가 결정하도록 함

### 요구사항 4: Layout 연결

**완성된 컴포넌트를 layout에서 import하여 children을 감싸도록 연결할 것**

연결될 경로: `src/app/layout.tsx`

```tsx
import ModalProvider from "@/commons/providers/modal/modal.provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

---

## 💡 구현 예시 (Reference)

### 1. modal.provider.tsx 구조

```tsx
"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Modal {
  id: string;
  content: ReactNode;
}

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<Modal[]>([]);

  // 모달 열기 (중첩 지원)
  const openModal = useCallback((content: ReactNode) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModals((prev) => [...prev, { id, content }]);
  }, []);

  // 가장 최근 모달 닫기
  const closeModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  // 모든 모달 닫기
  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  // body 스크롤 제어
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modals.length]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {typeof window !== "undefined" &&
        modals.map((modal, index) =>
          createPortal(
            <div
              key={modal.id}
              className="fixed inset-0 flex items-center justify-center"
              style={{ zIndex: 50 + index }}
              data-testid={`modal-overlay-${index}`}
            >
              {/* Backdrop - 각 모달마다 독립적으로 생성 */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={index === modals.length - 1 ? closeModal : undefined}
                aria-hidden="true"
                data-testid={`modal-backdrop-${index}`}
              />
              {/* Modal Content - max-w-md, w-full 제거됨 */}
              <div className="relative bg-white rounded-lg shadow-xl">
                {modal.content}
              </div>
            </div>,
            document.body
          )
        )}
    </ModalContext.Provider>
  );
}
```

### 2. 사용 예시

```tsx
"use client";

import { useModal } from "@/commons/providers/modal/modal.provider";

export default function SampleComponent() {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p>Modal content goes here</p>
        <button onClick={closeModal} className="mt-4">
          Close
        </button>
      </div>
    );
  };

  return <button onClick={handleOpenModal}>Open Modal</button>;
}
```

---

## 🔍 레퍼런스 프로젝트 분석 결과

### 1. Modal Provider 구조
- **위치**: `/Users/kimjongwook/project/challenge-02/src/commons/providers/modal/modal.provider.tsx`
- **특징**:
  - Context API 기반 전역 상태 관리
  - `createPortal`로 `document.body`에 직접 렌더링
  - 중첩 모달 지원 (배열로 관리)
  - z-index 자동 증가 (50 + index)
  - SSR 대응 (`typeof window !== "undefined"`)

### 2. Layout 연결 방식
- **위치**: `/Users/kimjongwook/project/challenge-02/src/app/layout.tsx`
- **연결 순서**:
  ```
  AuthProvider
    └─ ReactQueryProvider
        └─ NextThemesProvider
            └─ ModalProvider
                └─ AuthGuard
                    └─ Layout
                        └─ children
  ```

### 3. 주요 수정 사항
레퍼런스와 다른 점:
- ✅ **모달 wrapper에서 `max-w-md`, `w-full` 제거됨**
- ✅ **모달 컨텐츠 크기는 내부 컴포넌트가 결정**

---

## ✅ 구현 완료 체크리스트

구현 완료 후 아래 체크리스트를 반환할 것:

### Frontend Common Rules 적용
- [ ] 명시된 파일만 수정 (modal.provider.tsx, layout.tsx)
- [ ] 새 라이브러리 설치 없음 (기존 React, react-dom 사용)
- [ ] 독립적인 컴포넌트로 구현 (재사용 가능)
- [ ] OSM 네이밍 표준 준수 (camelCase, PascalCase)

### Modal Provider 구현
- [ ] modal.provider.tsx 파일 생성 완료
- [ ] "use client" 디렉티브 추가 (Client Component)
- [ ] ModalContext 생성 완료
- [ ] useModal hook 구현 완료
- [ ] ModalProvider 컴포넌트 구현 완료
- [ ] openModal 함수 구현 완료 (중첩 지원)
- [ ] closeModal 함수 구현 완료 (최근 모달 닫기)
- [ ] closeAllModals 함수 구현 완료 (전체 모달 닫기)
- [ ] createPortal 사용하여 document.body에 렌더링
- [ ] z-index 자동 관리 (50 + index)
- [ ] body 스크롤 제어 구현 완료
- [ ] SSR 대응 (typeof window !== "undefined")

### Modal 스타일
- [ ] 모달 wrapper에서 max-w-md 제거 완료
- [ ] 모달 wrapper에서 w-full 제거 완료
- [ ] 기본 스타일 유지 (bg-white, rounded-lg, shadow-xl)

### Layout 연결
- [ ] layout.tsx에서 ModalProvider import 완료
- [ ] ModalProvider로 children 감싸기 완료
- [ ] TypeScript 타입 에러 없음

### 테스트 속성
- [ ] data-testid 속성 추가 (modal-overlay, modal-backdrop)
- [ ] 접근성 속성 추가 (aria-hidden)

### 전체 검토
- [ ] TypeScript 컴파일 에러 없음
- [ ] ESLint 에러 없음
- [ ] 중첩 모달 동작 확인
- [ ] Backdrop 클릭 시 모달 닫기 확인
- [ ] body 스크롤 제어 확인

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**OSM Naming Convention**: ✅ 준수
**Reference**: challenge-02/modal.provider.tsx
