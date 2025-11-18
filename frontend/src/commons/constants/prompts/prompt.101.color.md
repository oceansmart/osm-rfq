# Color Token 구현 프롬프트

> Figma Tokens의 Color 시스템을 TypeScript와 CSS Variables로 변환하여 프로젝트 전반에서 사용 가능하도록 구현

---

## 🚨 CRITICAL RULES

### 적용할 규칙
**반드시 아래 규칙을 먼저 읽고 적용할 것:**
```
@.claude/rules/frontend-common.md
```

### 규칙 적용 결과
작업 완료 후 다음 형식으로 체크리스트 반환:
```
✅ 1.1 명시된 파일만 수정 - [수정된 파일 목록]
✅ 1.2 라이브러리 설치 없음 - [설치한 라이브러리 또는 "없음"]
✅ 1.3 독립적인 구조로 구현 - [설명]
✅ 2.1 Figma 구조 분석 완료
✅ 2.2 package.json 분석 완료
✅ 2.3 폴더 구조 분석 완료
✅ 2.4 전체 검토 및 디테일 수정 완료
```

---

## 📁 구현 파일 경로

### 수정/생성할 파일 (명시된 파일만):
1. `src/commons/constants/color.ts` - TypeScript Color Tokens
2. `src/app/globals.css` - CSS Variables 정의

### 참조할 파일 (읽기 전용):
- `figma-tokens/1. Color modes/Light mode.json` - Semantic tokens (1,302줄)
- `figma-tokens/1. Color modes/Dark mode.json` - Dark mode tokens
- `figma-tokens/_Primitives/Style.json` - Primitive color definitions

---

## 🎯 핵심 요구사항

### 요구사항 1: Figma Tokens Color 파일 분석 및 토큰화

**목표**: `figma-tokens/` 디렉토리 중 color 값이 들어가 있는 파일들을 찾아 Dark mode를 포함하여 모든 경우에 color를 토큰화하여 사용할 수 있도록 설정

#### 분석할 Figma Tokens 파일:
```
figma-tokens/
├── 1. Color modes/
│   ├── Light mode.json     ✅ Light mode colors
│   └── Dark mode.json      ✅ Dark mode colors
├── _Primitives/Style.json  ✅ Primitive colors
└── rfq-mgmt.json           ✅ 프로젝트 custom colors
```

### 요구사항 2: CSS에서 color token 변수 사용 가능하도록 globals.css 설정

**목표**: CSS Variables로 변환하여 `var(--color-name)` 형태로 사용 가능하도록 구현

---

## 🔄 구현 순서 (Step-by-step)

### Phase 1: 분석

```
Step 1-1: Figma Tokens 파일 읽기
- figma-tokens/_Primitives/Style.json
- figma-tokens/1. Color modes/Light mode.json
- figma-tokens/1. Color modes/Dark mode.json
- figma-tokens/rfq-mgmt.json

Step 1-2: Color Token 구조 파악
- Primitive colors 목록
- Semantic tokens 카테고리
- Dark mode overrides

Step 1-3: 기존 파일 확인
- src/app/globals.css 현재 상태
- src/commons/constants/ 디렉토리 구조

✋ 승인 요청: "위 분석 결과를 바탕으로 진행해도 될까요?"
```

### Phase 2: TypeScript 구현 (color.ts)

```
Step 2-1: Primitive colors 정의
Step 2-2: Light mode semantic tokens
Step 2-3: Dark mode semantic tokens
Step 2-4: Type 정의 및 Helper 함수

✋ 승인 요청: "TypeScript 구현 완료. 확인해주세요."
```

### Phase 3: CSS Variables 구현 (globals.css)

```
Step 3-1: Primitive tokens (:root)
Step 3-2: Semantic tokens (:root)
Step 3-3: Dark mode overrides (@media)
Step 3-4: Component colors

✋ 승인 요청: "CSS Variables 구현 완료. 확인해주세요."
```

### Phase 4: 검증

```
Step 4-1: TypeScript 컴파일 확인
Step 4-2: CSS Variables 테스트
Step 4-3: Dark mode 전환 테스트

✋ 승인 요청: "검증 완료. 최종 확인해주세요."
```

### Phase 5: 최종 검토

```
Step 5-1: 전체 토큰 매핑 확인
Step 5-2: 빠진 부분 확인
Step 5-3: 디테일 수정
Step 5-4: 체크리스트 작성

✋ 승인 요청: "최종 검토 완료."
```

---

## ✅ 구현 완료 체크리스트 템플릿

```markdown
# Color Token 구현 완료 체크리스트

## 📋 Frontend Common Rules 적용 결과
✅ 1.1 명시된 파일만 수정: [파일 목록]
✅ 1.2 라이브러리 설치: [없음/목록]
✅ 1.3 독립적인 구조: [설명]
✅ 2.1 Figma 구조 분석 완료
✅ 2.2 package.json 분석 완료
✅ 2.3 폴더 구조 분석 완료
✅ 2.4 전체 검토 완료

## 🎨 구현 결과
- TypeScript (color.ts): XXX개 토큰
- CSS Variables (globals.css): XXX개 변수
- Dark mode: 지원 여부

## 💡 사용 예시
TypeScript: `import { lightModeColors } from '@/commons/constants/color'`
CSS: `color: var(--text-primary);`
```

---

**작성일**: 2025-11-18
**버전**: 2.0.0 (LLM 최적화)
