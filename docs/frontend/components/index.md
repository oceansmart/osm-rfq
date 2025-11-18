# 컴포넌트

OSM RFQ Frontend의 재사용 가능한 UI 컴포넌트 가이드입니다.

## 📦 컴포넌트 구조

모든 컴포넌트는 `src/components/` 디렉토리에 위치합니다.

```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   └── index.ts
└── ...
```

## 🎨 컴포넌트 개발 원칙

### 1. TypeScript 사용
모든 컴포넌트는 TypeScript로 작성되며, Props 인터페이스를 명확히 정의합니다.

```typescript
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}
```

### 2. 디자인 토큰 사용
CSS Variables를 사용하여 일관된 디자인을 유지합니다.

```tsx
<button className="bg-[var(--color-primary)] text-white">
  {label}
</button>
```

### 3. Storybook 문서화
모든 컴포넌트는 Storybook 스토리를 포함해야 합니다.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
```

## 📚 컴포넌트 카탈로그

### 기본 컴포넌트
- **Button** - 버튼 컴포넌트
- **Input** - 입력 필드
- **Select** - 드롭다운 선택
- **Checkbox** - 체크박스
- **Radio** - 라디오 버튼

### 폼 컴포넌트
- **Form** - React Hook Form 래퍼
- **FormField** - 폼 필드 컨테이너
- **FormError** - 에러 메시지 표시

### 레이아웃 컴포넌트
- **Container** - 컨테이너
- **Grid** - 그리드 시스템
- **Flex** - Flexbox 레이아웃

## 🚀 컴포넌트 사용 예제

### Button 컴포넌트

```tsx
import { Button } from '@/components/Button';

function MyPage() {
  return (
    <Button
      variant="primary"
      size="md"
      label="클릭하세요"
      onClick={() => console.log('Clicked!')}
    />
  );
}
```

## 🧪 테스팅

컴포넌트는 Storybook을 통해 테스트하고 문서화합니다.

```bash
npm run storybook
```

## 📖 더 알아보기

- [디자인 시스템](../design-system/index.md)
- [Storybook 가이드](https://storybook.js.org/)
