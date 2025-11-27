# Common Component Replacement Guide

> **Version**: 1.0.0
> **Last Updated**: 2025-11-23
> **Description**: 정적 UI를 프로젝트 표준 공통 컴포넌트로 교체하기 위한 가이드

아래의 조건을 모두 적용하여, 정적 마크업을 공통 컴포넌트로 리팩토링할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 조건-규칙

아래의 규칙을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.

- `@.claude/rules/010_common.md`
- `@.claude/rules/030-ui.md`

---

## 조건-대상

- **구현될 TSX 파일경로**: 
   `frontend/src/components/rfq-draft-rate/index.tsx`
- **구현될 CSS 파일경로**: 
    `frontend/src/components/rfq-draft-rate/styles.module.css`

---

## 교체 대상 매핑 (Target Mapping)

> **Note**: 하나의 페이지에서 여러 개의 공통 컴포넌트를 교체해야 할 경우, 아래 목록을 모두 수행할 것.

| 정적 UI 요소 (Selector/Description) | 교체할 공통 컴포넌트 (Import Path) | 주요 변경 사항 |
| :--- | :--- | :--- |
| *예: Pagination div* | `@/commons/components/pagination` | *HTML 구조 변경, 스타일 매핑* |
| *예: Table div* | `@/commons/components/table` | *`use client` 추가, 접근성 속성* |
| *[추가 항목...]* | *[컴포넌트 경로...]* | *...* |

body > div > div > main > div > div.styles_mainContent__g9et2 > div.styles_rightColumn__1FU7r > div.styles_container8__PNib7 > div.styles_container8Header__v3YOa > div.styles_toggleWrapper__OFpWd > div.styles_toggleBase__JnRcO
-> 
/Users/kimjongwook/project/osm-rfq/frontend/src/commons/components/toggle




---

## 핵심 요구사항

### 1. 공통 컴포넌트 통합 (Integration)

- **Import 및 교체**: 지정된 공통 컴포넌트를 import하고, 기존 정적 HTML 태그를 해당 컴포넌트(`Root`, `Trigger`, `Item` 등)로 교체할 것.
- **스타일 동기화**: 기존 CSS Module(`styles.module.css`)의 클래스명을 공통 컴포넌트의 `className` prop으로 전달하여, **교체 전후 렌더링 결과가 100% 동일**하도록 스타일을 유지할 것.
- **구조 재구성**: 공통 컴포넌트의 Composition 패턴(Root > Child 구조)에 맞춰 기존 마크업 계층을 재구성할 것.

### 2. 기능 및 호환성 (Functionality)

- **Props 매핑**: 기존의 이벤트 핸들러, 데이터, 상태 값을 공통 컴포넌트의 적절한 Props로 연결할 것.
- **Server/Client 호환성**: 공통 컴포넌트가 내부적으로 Hooks나 Context를 사용하는 경우, 대상 컴포넌트 최상단에 `"use client";`를 추가하여 런타임 에러를 방지할 것.
- **라이브러리 제약 준수**: `react-aria` 등 기반 라이브러리의 필수 요구사항(예: Table의 `isRowHeader`)을 누락 없이 적용할 것.

### 3. 코드 품질 및 검증 (Verification)

- **Linter 검사**: 작업 완료 후 반드시 `read_lints`를 실행하여 에러를 수정할 것.
- **불필요 코드 제거**: 교체 후 사용되지 않는 import나 레거시 코드는 정리할 것.

### 4. 주의사항 및 문제 해결 (Troubleshooting)

- **Table 컴포넌트 Row 높이 불일치 해결**:
  - **현상**: 공통 `Table` 컴포넌트 교체 시 기본 높이(`h-18`/72px)가 디자인 요구사항(44px)과 불일치.
  - **조치**: `src/commons/components/table/index.tsx`의 `TableRow` 설정을 `size="md"` 기준 `h-11`(44px), `size="sm"` 기준 `h-9`(36px)로 영구 수정.
  - **Check**: 향후 Table 교체 시 `size="md"` 적용 확인 및 실제 렌더링 높이(44px) 검증 필수.

