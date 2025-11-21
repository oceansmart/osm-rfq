# Layout Wireframe Implementation Guide

> **Version**: 1.1.0
> **Last Updated**: 2025-11-22
> **Figma Channel**: 0cy4goa3
> **Architecture**: Hybrid (CSS Modules for Layout)

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 조건-규칙

아래의 규칙을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.

- `@.claude/rules/frontend-common.md` (v1.1.0 - 하이브리드 아키텍처)
- `@.claude/rules/osm-css-styling-rules.md` (v2.1.0 - 레이어별 CSS 전략)

---

## 조건-파일경로

- **구현될 TSX 파일경로**: `frontend/src/commons/layout/index.tsx`
- **구현될 CSS 파일경로**: `frontend/src/commons/layout/styles.module.css`

---

## 핵심요구사항

### 1. 컴포넌트 연결

완성된 컴포넌트를 페이지에서 import하여 연결시킬 것. (children을 감싸도록 만들 것)

- **연결될 경로**: `frontend/src/app/layout.tsx`

### 2. 와이어프레임 구조

HTML과 flexbox를 활용한 와이어프레임 구조만 만들어낼 것.

- **CSS Modules 사용 (PRIMARY)**
- **Tailwind CSS는 보조적으로만 사용 (SECONDARY)**
- **position: absolute 절대 금지 (Flexbox만 사용)**

### 3. 영역별 수치값 (Figma 노드 기반)

각 영역은 아래의 Figma 노드 수치값을 그대로 반영할 것.

| Figma 노드 ID | 영역 이름 | 수치값 (width * height) | 설명 |
|--------------|----------|------------------------|------|
| 157:9253 | Header | 1640 * 64 | 상단 헤더 영역 |
| 157:9648 | Main Content | 1640 * auto | 메인 콘텐츠 (children) |
| 157:9252 | Sidebar | 280 * 1079 | 좌측 사이드바 |

**Figma Channel**: 0cy4goa3

**레이아웃 구조:**
```
┌─────────────────────────────────────┐
│ Header (1640 * 64)                  │
├─────────┬───────────────────────────┤
│ Sidebar │ Main Content              │
│ (280 *  │ (1640 * auto)             │
│  1079)  │ {children}                │
└─────────┴───────────────────────────┘
```


---

## 필수 준수사항

### 1. CSS Modules 규칙

- **파일명**: `styles.module.css` (필수)
- **클래스명**: camelCase (예: `.header`, `.logoText`, `.tabContainer`)
- **BEM 표기법 금지** (예: `.layout__header` ❌)
- **kebab-case 금지** (예: `.layout-header` ❌)

### 2. CSS 절대 금지 사항

- `:global { }` 사용 금지
- `:root { }` 사용 금지 (컴포넌트 내)
- `!important` 사용 금지
- `position: absolute` 사용 금지
- 하드코딩된 값 금지 (Design Tokens 사용)

### 3. 레이아웃 구현 원칙

- **Flexbox만 사용** (position: absolute 금지)
- 부모-자식 관계 명확히
- 각 영역에 주석 추가 (예: `/* Header: 1168 * 60 */`)

### 4. TypeScript 규칙

```typescript
import styles from './styles.module.css'
```

- `data-testid` 속성 추가 (테스트 가능성)
- `interface` 정의 (LayoutProps)

### 5. 네이밍 규칙 (OSM 표준)

| 항목 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | Layout |
| 함수 | camelCase | getRfqById |
| 변수 | camelCase | rfqList |
| 타입/인터페이스 | PascalCase | LayoutProps |

---

## 체크리스트 반환 항목

### 작업 시작 전

- [ ] package.json 분석 완료
- [ ] 폴더/라우터 구조 분석 완료
- [ ] HTML/CSS 레이아웃 뼈대 분석 완료

### CSS Modules 작성

- [ ] styles.module.css 파일명 사용
- [ ] camelCase 클래스명 사용
- [ ] Flexbox 레이아웃 구현
- [ ] :global, :root, !important 미사용
- [ ] position: absolute 미사용
- [ ] 주석으로 영역 설명 추가

### TypeScript 컴포넌트 작성

- [ ] import styles from './styles.module.css'
- [ ] data-testid 속성 추가
- [ ] LayoutProps 인터페이스 정의
- [ ] children prop 처리

### 레이아웃 구조

- [ ] Header: 1640 * 64 반영 (Figma Node: 157:9253)
- [ ] Sidebar: 280 * 1079 반영 (Figma Node: 157:9252)
- [ ] Main Content: 1640 * auto 반영 (Figma Node: 157:9648)
- [ ] Flexbox 부모-자식 관계 명확히 구현
- [ ] contentWrapper로 Sidebar + Main Content 그룹화

### 작업 완료 후

- [ ] 전체 검토 완료
- [ ] 빠진 부분 확인 완료
- [ ] 디테일 수정 완료
