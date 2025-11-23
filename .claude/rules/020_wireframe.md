---
description: Wireframe 구현 시 CSS 규칙
globs:
alwaysApply: false
---

아래의 조건 및 주의사항을 모두 적용하여 코드를 작성할 것.

---

## 공통경로

- **글로벌 CSS**: `frontend/src/styles/globals.css`
- **Design Tokens**: `frontend/src/styles/theme.css` (자동 생성)

---

## 1. CSS 조건

### 1.1 CSS Modules 전용
- CSS는 **CSS Modules만 사용**할 것 (`styles.module.css`)
- Layout/Page 레이어: CSS Modules PRIMARY
- Component 레이어: Tailwind CSS PRIMARY

### 1.2 금지 키워드
- `:global` - 사용하지 말 것 (스타일 격리 원칙 위반)
- `:root` - 사용하지 말 것 (개별 컴포넌트에서 금지)
- `!important` - 사용하지 말 것 (특정성 전쟁 유발)
- `position: absolute` - 사용하지 말 것 (Flexbox 사용)

### 1.3 globals.css 관리
- `globals.css`는 공통경로의 파일을 사용할 것
- 개별 독립적인 파일을 위해서는 변경하지 말 것
- 변경 전, 다시 한 번 **전역을 위해 필요한 작업인지 확인**할 것
- 전역 영향이 확실한 경우에만 변경할 것

### 1.4 레이아웃 구현 원칙
- 추후 수정이 쉽도록 **부모-자식 관계를 명확히** 형성할 것
- **Flexbox 방식으로만** 구현할 것
- `position: absolute` 금지 (반응형 레이아웃 고려)

### 1.5 구현 범위
- 추가적인 애니메이션 등은 넣지 말 것
- Figma 디자인을 **있는 그대로만 완벽히 구현**할 것
- 명시되지 않은 기능 추가 금지

---

## 2. Design Tokens 사용

### 2.1 CSS Variables 사용 (필수)
```css
/* ✅ 올바른 예 */
.header {
    padding: var(--spacing-xl);
    background: var(--color-white);
    color: var(--color-text-primary);
}

/* ❌ 잘못된 예 */
.header {
    padding: 16px;          /* 하드코딩 금지 */
    background: #FFFFFF;    /* 하드코딩 금지 */
    color: #333333;         /* 하드코딩 금지 */
}
```

### 2.2 반응형 디자인
```css
/* ✅ width: 100% + max-width 패턴 */
.header {
    width: 100%;        /* 반응형 */
    max-width: 1640px;  /* Figma 수치 */
    height: 64px;
}

/* ❌ 고정 너비 금지 */
.header {
    width: 1640px;      /* 작은 화면에서 스크롤 발생 */
    height: 64px;
}
```

---

## 3. 참고 규칙

- **공통 규칙**: [@.claude/rules/010_common.md](010_common.md)
- **Figma 노드 추출**: [@.claude/rules/110_figma-node-extraction.md](110_figma-node-extraction.md)
- **네이밍 규칙**: [@.claude/rules/120_osm-naming-convention.md](120_osm-naming-convention.md)

---

**작성일**: 2025-11-22
**버전**: 1.0.0
**기반**: Reference challenge-02/020_wireframe.mdc
