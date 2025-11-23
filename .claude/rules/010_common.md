---
description: OSM RFQ 프론트엔드 개발 공통 규칙
globs:
alwaysApply: false
---

> **Version**: 1.2.0
> **Last Updated**: 2025-11-22
> **Status**: ✅ Active

아래의 조건 및 주의사항을 모두 적용하여 코드를 작성할 것.

---

## 1. 공통조건

### 1.1 명시된 파일만 수정
- 명시된 파일 이외에는 절대로 수정하지 말 것
- 추가 파일 수정이 필요한 경우 먼저 승인 받을 것

### 1.2 명시하지 않은 라이브러리 설치 금지
- package.json에 없는 라이브러리 무단 설치 금지 (JEST 등)
- 새 라이브러리 필요 시 승인 요청 후 설치

### 1.3 독립적인 부품의 조립 형태
- 추후 수정이 쉽도록 독립적인 컴포넌트로 구현
- 각 컴포넌트는 독립적으로 동작하도록 설계

### 1.4 표준 규칙 준수
- **네이밍**: [@.claude/rules/120_osm-naming-convention.md](120_osm-naming-convention.md)


---

## 2. 최종 주의사항

### 2.1 피그마 링크 제공 시
**작업 시작 전 전체적인 피그마 구조를 먼저 step-by-step으로 분석할 것**

Step 1: 피그마 구조 분석 (페이지, 컴포넌트, 디자인 토큰, 반응형)
Step 2: 구현 계획 수립 (우선순위, 단계별 작업)
Step 3: 승인 후 step-by-step 구현

### 2.2 package.json 확인
**사용 가능한 라이브러리와 버전을 먼저 step-by-step으로 분석할 것**

Step 1: 설치된 라이브러리 확인
Step 2: 버전 호환성 검토
Step 3: 사용 가능 기능 파악
Step 4: 승인 후 진행

### 2.3 폴더/라우터/레이아웃 구조 분석
**먼저 step-by-step으로 분석할 것**

Step 1: 폴더 구조 분석
Step 2: 라우터 구조 파악
Step 3: HTML/CSS 레이아웃 뼈대 분석
Step 4: 새 파일 위치 결정
Step 5: 승인 후 진행

### 2.4 작업 완료 후 검토
**step-by-step으로 전체를 검토하여 빠진 부분을 채우고 디테일 수정할 것**

Step 1: 전체 기능 검토
Step 2: 빠진 부분 확인
Step 3: 디테일 수정 항목 정리
Step 4: 승인 후 수정

---

## 3. CSS 스타일링 방법론 (하이브리드 아키텍처)

OSM RFQ 프로젝트는 **레이어별로 최적화된 CSS 방법론**을 사용합니다:

### Layout & Page 레이어 → CSS Modules (PRIMARY)
**적용 대상:**
- `commons/layout/` - 전체 레이아웃 구조
- `app/**/page.tsx` - 페이지 컴포넌트
- 복수 프레임으로 구성된 섹션

**이유:** 구조적 명확성, Flexbox 중첩 구조 표현, 정확한 픽셀 수치 반영

### Component 레이어 → Tailwind CSS (PRIMARY)
**적용 대상:**
- `commons/components/**` - 공통 컴포넌트 (Button, Input, Badge 등)
- 재사용 가능한 UI 조각
- Variant 기반 동적 스타일링

**이유:** 기존 50+ 컴포넌트 유지, Variant 기반 스타일링, 빠른 프로토타이핑

**상세 규칙:** [@.claude/rules/osm-css-styling-rules.md](osm-css-styling-rules.md)

---

## 4. 사용 방법

이 규칙을 적용하려면:

```
@.claude/rules/frontend-common.md 규칙을 따라주세요
```

---

**작성일**: 2025-11-18
**버전**: 1.2.0 (간결화 및 핵심 정리)
**최종 수정**: 2025-11-22
**기반**: Reference challenge-02/01-common.mdc
