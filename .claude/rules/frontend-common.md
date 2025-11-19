# Frontend Common Rules

> OSM RFQ 프론트엔드 개발 공통 규칙
> 아래의 조건 및 주의사항을 모두 적용하여 코드를 작성할 것.

---

## 1. 공통조건

### 1.1 명시된 파일 이외에는 절대로 수정하지 말 것

- 사용자가 명시한 파일만 수정
- 추가 파일 수정이 필요한 경우 먼저 제안 후 승인 받을 것
- 관련 있다고 판단되어도 무단 수정 금지

### 1.2 명시하지 않은 라이브러리를 설치하지 말 것

- package.json에 없는 라이브러리 무단 설치 금지
- 새 라이브러리가 필요한 경우:
  1. 필요성 설명
  2. 대안 검토
  3. 승인 요청
  4. 승인 후 설치

### 1.3 독립적인 부품들의 조립 형태로 구현할 것

- 추후 수정이 쉽도록 설계
- 각 컴포넌트는 독립적으로 동작
- 조합 가능한 구조로 구현

### 1.4 OSM 네이밍 표준을 준수할 것

- **[.claude/rules/osm-naming-convention.md](osm-naming-convention.md) 필수 준수**
- 모든 파일, 디렉토리, 변수, 함수, 컴포넌트 네이밍 시 표준 규칙 적용
- 프로젝트 레벨 명명에는 `osm-` prefix 필수
- 코드 리뷰 시 네이밍 표준 위반 여부 확인

**주요 규칙:**
- 디렉토리: kebab-case (`rfq-list`, `bidding-draft`)
- 컴포넌트 파일: `index.tsx` (디렉토리 기반)
- Hook 파일: `index.[purpose].hook.ts` (예: `index.binding.hook.ts`)
- Test 파일: `index.[purpose].spec.ts`
- 변수/함수: camelCase (`rfqList`, `getRfqById`)
- 타입/인터페이스: PascalCase (`RfqItem`, `RfqStatus`)
- 컴포넌트: PascalCase (`RfqList`, `BiddingDraft`)
- 약어: 첫 글자만 대문자 (`Rfq` ✅, `RFQ` ❌)

---

## 2. 최종 주의사항

### 2.1 피그마 링크가 제공되면

**작업 시작 전 전체적인 피그마 구조를 먼저 분석하고, step-by-step으로 구현할 것**

Step 1: 피그마 구조 분석
- 페이지 구조
- 컴포넌트 구조
- 디자인 토큰
- 반응형 디자인

Step 2: 구현 계획 수립
- 우선순위 정의
- 단계별 작업 분해

Step 3: 승인 후 step-by-step 구현

### 2.2 package.json을 확인하여

**사용 가능한 라이브러리와 버전을 먼저 step-by-step으로 분석할 것**

Step 1: 설치된 라이브러리 확인
Step 2: 버전 호환성 검토
Step 3: 사용 가능 기능 파악
Step 4: 승인 후 진행

### 2.3 폴더구조, 라우터구조, HTML, CSS 뼈대 layout 구조를

**먼저 step-by-step으로 분석할 것**

Step 1: 폴더 구조 분석
Step 2: 라우터 구조 파악
Step 3: 레이아웃 계층 확인
Step 4: 새 파일 위치 결정
Step 5: 승인 후 진행

### 2.4 모든 작업이 끝나면

**step-by-step으로 전체를 검토하여, 빠진 부분을 채우고 디테일 수정할 것**

Step 1: 전체 기능 검토
Step 2: 빠진 부분 확인
Step 3: 디테일 수정 항목 정리
Step 4: 승인 후 수정

---

## 3. 사용 방법

이 규칙을 적용하려면:

```
@.claude/rules/frontend-common.md 규칙을 따라주세요
```

---

**작성일**: 2025-11-18
**버전**: 1.0.0
**기반**: Reference challenge-02/01-common.mdc
