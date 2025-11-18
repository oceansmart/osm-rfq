# 컬러 토큰

OSM RFQ Frontend의 컬러 시스템은 CSS Variables를 사용하여 일관된 컬러를 제공합니다.

## 🎨 기본 컬러 팔레트

### Blue (Primary)

| 변수 | 색상 | 용도 |
|------|------|------|
| `--blue-05` | #F0F7FF | 아주 연한 파랑 |
| `--blue-10` | #DBEEFF | 연한 파랑 |
| `--blue-20` | #BDDBFF | 밝은 파랑 |
| `--blue-30` | #93BEFF | 중간 밝은 파랑 |
| `--blue-40` | #6DA5FA | 중간 파랑 |
| `--blue-50` | #497CFF | 기본 파랑 |
| `--blue-60` | #3A5CF3 | Primary 컬러 |
| `--blue-70` | #274AE1 | 진한 파랑 |
| `--blue-80` | #1530A6 | 아주 진한 파랑 |
| `--blue-90` | #0B2184 | 가장 진한 파랑 |

### Gray Scale

| 변수 | 색상 | 용도 |
|------|------|------|
| `--gray-white` | #FFFFFF | 흰색 |
| `--gray-05` | #F2F2F2 | 아주 연한 회색 |
| `--gray-10` | #E4E4E4 | 연한 회색 |
| `--gray-20` | #D4D3D3 | 밝은 회색 |
| `--gray-30` | #C7C7C7 | 중간 밝은 회색 |
| `--gray-40` | #ABABAB | 중간 회색 |
| `--gray-50` | #919191 | 기본 회색 |
| `--gray-60` | #777777 | 중간 진한 회색 |
| `--gray-70` | #5F5F5F | 진한 회색 |
| `--gray-80` | #333333 | 아주 진한 회색 |
| `--gray-90` | #1C1C1C | 거의 검은색 |
| `--gray-black` | #000000 | 검은색 |

### Red (Error)

| 변수 | 색상 | 용도 |
|------|------|------|
| `--red-05` | #FDD7DC | 아주 연한 빨강 |
| `--red-10` | #F797A4 | 연한 빨강 |
| `--red-20` | #F4677A | 밝은 빨강 |
| `--red-30` | #F03851 | 기본 빨강 (Error) |
| `--red-40` | #E4112E | 진한 빨강 |
| `--red-50` | #B40E24 | 아주 진한 빨강 |

### Green (Success)

| 변수 | 색상 | 용도 |
|------|------|------|
| `--green-05` | #D3F3E0 | 아주 연한 초록 |
| `--green-10` | #92E6B9 | 연한 초록 |
| `--green-20` | #15D66F | 밝은 초록 |
| `--green-30` | #12B75F | 기본 초록 (Success) |
| `--green-40` | #109C51 | 진한 초록 |
| `--green-50` | #0E723C | 아주 진한 초록 |

### Yellow (Warning)

| 변수 | 색상 | 용도 |
|------|------|------|
| `--yellow-05` | #FFE499 | 아주 연한 노랑 |
| `--yellow-10` | #FFD666 | 연한 노랑 |
| `--yellow-20` | #FFC933 | 밝은 노랑 |
| `--yellow-30` | #FFB300 | 기본 노랑 (Warning) |
| `--yellow-40` | #EBA500 | 진한 노랑 |
| `--yellow-50` | #D69600 | 아주 진한 노랑 |

## 🎯 시맨틱 컬러

### Light Mode

```css
:root {
  /* Primary 컬러 */
  --color-primary: var(--blue-60);
  --color-primary-hover: var(--blue-70);
  --color-primary-active: var(--blue-80);
  --color-primary-disabled: var(--blue-20);

  /* 배경 컬러 */
  --color-bg-primary: var(--gray-white);
  --color-bg-secondary: var(--gray-05);
  --color-bg-tertiary: var(--gray-10);

  /* 텍스트 컬러 */
  --color-text-primary: var(--gray-90);
  --color-text-secondary: var(--gray-70);
  --color-text-tertiary: var(--gray-60);
  --color-text-disabled: var(--gray-40);
  --color-text-inverse: var(--gray-white);

  /* 테두리 컬러 */
  --color-border-primary: var(--gray-20);
  --color-border-secondary: var(--gray-10);
  --color-border-focus: var(--blue-60);

  /* 상태 컬러 */
  --color-success: var(--green-30);
  --color-error: var(--red-30);
  --color-warning: var(--yellow-30);
  --color-info: var(--blue-50);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: var(--blue-50);
    --color-primary-hover: var(--blue-40);
    --color-primary-active: var(--blue-30);

    --color-bg-primary: var(--gray-90);
    --color-bg-secondary: var(--gray-80);
    --color-bg-tertiary: var(--gray-70);

    --color-text-primary: var(--gray-05);
    --color-text-secondary: var(--gray-20);
    --color-text-tertiary: var(--gray-30);

    --color-success: var(--green-20);
    --color-error: var(--red-20);
    --color-warning: var(--yellow-20);
  }
}
```

## 🌈 그라디언트

```css
:root {
  --gradient-primary: linear-gradient(135deg, #3A5CF3 0%, #497CFF 100%);
  --gradient-skeleton: linear-gradient(90deg, #F2F2F2 0%, #E4E4E4 50%, #F2F2F2 100%);
}
```

## 💡 사용 예제

### CSS

```css
.button-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.button-primary:hover {
  background-color: var(--color-primary-hover);
}

.card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
}

.error-message {
  color: var(--color-error);
}
```

### Tailwind CSS

```tsx
<button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
  Primary Button
</button>

<div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]">
  Card Content
</div>

<p className="text-[var(--color-error)]">
  Error Message
</p>
```

## 📋 접근성 가이드

- 텍스트와 배경 간 최소 명암비: **4.5:1** (WCAG AA)
- 큰 텍스트(18px 이상)의 최소 명암비: **3:1**
- Primary 컬러는 모든 배경에서 가독성 확보

## 🔗 관련 문서

- [타이포그래피](typography.md)
- [디자인 시스템 개요](index.md)
- [컴포넌트 가이드](../components/index.md)
