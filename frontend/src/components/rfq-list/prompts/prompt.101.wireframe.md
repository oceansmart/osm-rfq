# Layout Wireframe Implementation Guide

> **Version**: 2.0.0
> **Last Updated**: 2025-11-22


아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 조건-규칙

아래의 규칙을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.

- `@.claude/rules/010_common.md`
- `@.claude/rules/020_wireframe.md`

---

## 조건-파일경로

- **구현될 TSX 파일경로**: 
   `frontend/src/components/rfq-list/index.tsx`
- **구현될 CSS 파일경로**: 
    `frontend/src/components/rfq-list/styles.module.css`

---

## 핵심요구사항

### 1. 컴포넌트 연결

완성된 컴포넌트를 페이지에서 import하여 연결시킬 것. (children을 감싸도록 만들 것)

- **연결될 경로**: `frontend/src/app/rfq-list/page.tsx`

### 2. 와이어프레임 구조

HTML과 flexbox를 활용한 와이어프레임 구조만 만들어낼 것.

### 3. 영역별 수치값 (Figma 노드 기반)

각 영역은 아래의 Figma 노드 수치값을 그대로 반영할 것. (단위: px)
        {gab} :1609 * 2
        타이틀 :1609 * 72
        {gab} :1609 * 15
        탭: 540*36
        {gab} :1609 * 16
        테이블 :1591*764
        {gab} :1591 * 16
        페이지네이션:1600* 68

