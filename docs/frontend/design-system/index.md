# 디자인 시스템

OSM RFQ Frontend의 디자인 시스템은 Figma Design Tokens를 기반으로 CSS Variables를 사용합니다.

## 🎨 개요

디자인 시스템은 다음과 같은 요소로 구성됩니다:

- **컬러 토큰** - 브랜드 컬러 및 시맨틱 컬러
- **타이포그래피** - 폰트, 크기, 행간
- **스페이싱** - 여백 및 간격
- **컴포넌트** - 재사용 가능한 UI 요소

## 📦 구성 요소

### 1. [컬러 토큰](colors.md)
- Primary, Secondary, Tertiary 컬러
- 시맨틱 컬러 (Success, Error, Warning, Info)
- Gray Scale
- Light/Dark 모드 지원

### 2. [타이포그래피](typography.md)
- Headline (Web/Mobile)
- Title & Subtitle
- Body Text
- Caption
- 반응형 폰트 크기

### 3. 스페이싱
- 8px 기반 그리드 시스템
- Margin & Padding 토큰

## 🛠️ 사용 방법

### CSS Variables 사용

```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  font-size: var(--typo-body01-font-size);
  padding: var(--spacing-4);
}
```

### Tailwind CSS 클래스

```tsx
<div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
  <h1 className="typo-headline01">제목</h1>
  <p className="typo-body01">본문 텍스트</p>
</div>
```

## 🎯 디자인 토큰 구조

```
:root {
  /* 기본 컬러 팔레트 */
  --blue-50: #497CFF;
  --gray-90: #1C1C1C;

  /* 시맨틱 컬러 */
  --color-primary: var(--blue-60);
  --color-bg-primary: var(--gray-white);
  --color-text-primary: var(--gray-90);

  /* 타이포그래피 */
  --typo-headline01-font-size: 48px;
  --typo-headline01-line-height: 60px;
}
```

## 🌓 다크 모드

다크 모드는 자동으로 시스템 설정을 따르며, 수동 토글도 지원합니다.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: var(--blue-50);
    --color-bg-primary: var(--gray-90);
    --color-text-primary: var(--gray-05);
  }
}

.dark {
  /* 수동 다크 모드 클래스 */
}
```

## 📱 반응형 디자인

모바일과 데스크톱에서 최적화된 타이포그래피를 제공합니다.

```css
@media (max-width: 767px) {
  :root {
    --typo-web-headline01-font-size: 32px;
    --typo-web-headline01-line-height: 40px;
  }
}
```

## 🔗 Figma 연동

Figma Tokens Studio 플러그인을 통해 디자인 토큰을 동기화합니다.

```bash
# Figma primitive collection 생성
npm run figma:create-primitive

# Figma variables 업데이트
npm run figma:update-primitive
```

## 📚 참고 자료

- [컬러 토큰 상세](colors.md)
- [타이포그래피 상세](typography.md)
- [컴포넌트 가이드](../components/index.md)
