# Layout UI Implementation Guide

> **Version**: 2.0.0
> **Last Updated**: 2025-11-22
> **Figma Channel**: gwh81l7p

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 조건-규칙

아래의 규칙을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.

- `@.claude/rules/010_common.md`
- `@.claude/rules/020_wireframe.md`
- `@.claude/rules/030-ui.md`

---

## 조건-Figma

**Figma Channel**: `iv0w5hc4`

### 구현될 컴포넌트 노드 ID


- **페이지네이션**: `55:4642`
---

## 조건-파일경로

- **구현될 TSX 파일경로**: 
   `frontend/src/components/rfq-list/index.tsx`
- **구현될 CSS 파일경로**: 
    `frontend/src/components/rfq-list/styles.module.css`

---

## 조건-Design Tokens

- `theme.css`에 명시된 CSS Variables 토큰 활용 

## 핵심요구사항

### 1. Figma MCP 연동

- cursor TalkToFigma MCP를 활용하여 Figma 디자인을 정확히 분석할 것
- 채널명에 접속하여 노드 정보 추출
- 각 컴포넌트의 수치값 정확히 반영

### 2. 디자인 구현

- Figma 디자인을 **그대로** 소스코드로 구현할 것
- 모든 spacing, sizing, color 값을 Figma 노드와 일치시킬 것
- CSS Variables(Design Tokens)를 적극 활용할 것
- 하드코딩된 색상값(#FFFFFF, rgb(...) 등) 사용 금지

### 3. 컴포넌트 구조

- 기존 와이어프레임 구조([prompt.101.wireframe.md](prompt.101.wireframe.md))를 기반으로 UI 추가
- 독립적인 컴포넌트로 구성하여 재사용성 확보
- CSS Modules를 활용한 스타일 격리

### 4. 아이콘/이미지 사용


- **페이지네이션**: `55:4642`
    - 아이콘은 'frontend/public/icons/rfq-list/pagenation' 경로에서 로드

- Next.js Image 컴포넌트 사용 (`import Image from 'next/image'`)
- width/height 명시 필수
- 예시: `<Image src="/icons/layout/home.svg" alt="Home" width={20} height={20} />`

 