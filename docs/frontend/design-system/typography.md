# 타이포그래피

OSM RFQ Frontend의 타이포그래피 시스템은 CSS Variables를 사용하여 일관된 텍스트 스타일을 제공합니다.

## 📐 폰트 패밀리

```css
:root {
  --font-family-korean: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-family-english: 'SUIT Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-family-system: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}
```

## ⚖️ 폰트 굵기

| 변수 | 값 | 용도 |
|------|-----|------|
| `--font-weight-regular` | 400 | 본문 텍스트 |
| `--font-weight-medium` | 500 | 강조 텍스트 |
| `--font-weight-semibold` | 600 | 부제목 |
| `--font-weight-bold` | 700 | 제목 |
| `--font-weight-extrabold` | 800 | 강한 제목 |

## 📏 타이포그래피 스케일

### Web Headline (웹 전용 대형 제목)

| 클래스 | 크기 | 행간 | 굵기 | 모바일 크기 |
|--------|------|------|------|-------------|
| `typo-web-headline01` | 48px | 60px | 600 | 32px/40px |
| `typo-web-headline02` | 36px | 48px | 600 | 28px/36px |
| `typo-web-headline03` | 28px | 36px | 600 | 24px/32px |

### Headline (제목)

| 클래스 | 크기 | 행간 | 굵기 | 모바일 크기 |
|--------|------|------|------|-------------|
| `typo-headline01` | 24px | 32px | 700 | 20px/28px |
| `typo-headline02` | 22px | 30px | 800 | 18px/24px |
| `typo-headline03` | 20px | 28px | 700 | 16px/22px |

### Title (타이틀)

| 클래스 | 크기 | 행간 | 굵기 |
|--------|------|------|------|
| `typo-title01` | 18px | 24px | 700 |
| `typo-title02` | 16px | 22px | 700 |
| `typo-title03` | 14px | 20px | 700 |

### Subtitle (부제목)

| 클래스 | 크기 | 행간 | 굵기 |
|--------|------|------|------|
| `typo-subtitle01` | 14px | 22px | 600 |
| `typo-subtitle02` | 12px | 18px | 600 |

### Body (본문)

| 클래스 | 크기 | 행간 | 굵기 |
|--------|------|------|------|
| `typo-body01-m` | 16px | 24px | 500 |
| `typo-body02-m` | 14px | 22px | 500 |
| `typo-body03` | 12px | 18px | 500 |
| `typo-body01` | 16px | 22px | 400 |
| `typo-body02-s` | 14px | 20px | 400 |
| `typo-body03-regular` | 12px | 16px | 400 |

### Caption (캡션)

| 클래스 | 크기 | 행간 | 굵기 |
|--------|------|------|------|
| `typo-caption01` | 12px | 14px | 600 |
| `typo-caption02-m` | 10px | 12px | 600 |
| `typo-caption02-s` | 10px | 12px | 500 |
| `typo-caption03` | 8px | 12px | 600 |

## 💡 사용 예제

### HTML/CSS

```html
<h1 class="typo-web-headline01">웹 대형 제목</h1>
<h2 class="typo-headline01">제목</h2>
<h3 class="typo-title01">타이틀</h3>
<p class="typo-body01">본문 텍스트입니다.</p>
<span class="typo-caption01">캡션 텍스트</span>
```

### React/Tailwind

```tsx
<h1 className="typo-web-headline01">웹 대형 제목</h1>
<h2 className="typo-headline01">제목</h2>
<h3 className="typo-title01">타이틀</h3>
<p className="typo-body01">본문 텍스트입니다.</p>
<span className="typo-caption01">캡션 텍스트</span>
```

### CSS Variables 직접 사용

```css
.custom-heading {
  font-family: var(--typo-headline01-font-family);
  font-weight: var(--typo-headline01-font-weight);
  font-size: var(--typo-headline01-font-size);
  line-height: var(--typo-headline01-line-height);
}
```

## 📱 반응형 타이포그래피

모바일(767px 이하)에서는 자동으로 크기가 조정됩니다:

```css
@media (max-width: 767px) {
  :root {
    --typo-web-headline01-font-size: 32px;
    --typo-web-headline01-line-height: 40px;
    --typo-web-headline02-font-size: 28px;
    --typo-web-headline02-line-height: 36px;
    --typo-web-headline03-font-size: 24px;
    --typo-web-headline03-line-height: 32px;
    --typo-headline01-font-size: 20px;
    --typo-headline01-line-height: 28px;
    --typo-headline02-font-size: 18px;
    --typo-headline02-line-height: 24px;
    --typo-headline03-font-size: 16px;
    --typo-headline03-line-height: 22px;
  }
}
```

## 📋 사용 가이드

### 제목 계층

1. **Web Headline**: 랜딩 페이지 메인 제목
2. **Headline**: 페이지 제목
3. **Title**: 섹션 제목
4. **Subtitle**: 부제목

### 본문 텍스트

- **Body01-m**: 중요한 본문 (Medium weight)
- **Body01**: 일반 본문 (Regular weight)
- **Body02-m**: 작은 중요 텍스트
- **Body02-s**: 작은 일반 텍스트
- **Body03**: 아주 작은 텍스트

### 캡션

- **Caption01**: 이미지 캡션, 메타 정보
- **Caption02**: 작은 라벨
- **Caption03**: 아주 작은 보조 텍스트

## 🎨 타이포그래피 + 컬러

```tsx
<h1 className="typo-headline01 text-[var(--color-text-primary)]">
  제목
</h1>

<p className="typo-body01 text-[var(--color-text-secondary)]">
  보조 텍스트
</p>

<span className="typo-caption01 text-[var(--color-text-tertiary)]">
  캡션
</span>
```

## 🔗 관련 문서

- [컬러 토큰](colors.md)
- [디자인 시스템 개요](index.md)
- [컴포넌트 가이드](../components/index.md)
