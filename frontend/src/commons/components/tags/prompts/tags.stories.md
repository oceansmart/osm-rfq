# Tags Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/tags/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/tags/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Tags 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Variant Types (4가지)

- outlined (기본, 테두리 + 배경 채움)
- outlined-plain (테두리 + 흰색 배경)
- subtle (테두리 없음, 연한 배경)
- plain (텍스트만, 배경 없음)

| Variant | Border | Background | Use Case |
|---------|--------|------------|----------|
| `outlined` | ✅ | Color fill | 기본 태그, 강조된 라벨 |
| `outlined-plain` | ✅ | White | 깔끔한 태그, 필터 |
| `subtle` | ❌ | Light fill | 미묘한 라벨, 상태 표시 |
| `plain` | ❌ | Transparent | 텍스트 강조, 인라인 태그 |

### 2. Size Variants (3가지)

- sm
- md
- lg

| Size | Padding | Font | Use Case |
|------|---------|------|----------|
| `sm` | `px-2 py-0.5` | `text-xs` | Compact UI, 인라인 태그 |
| `md` | `px-2.5 py-1` | `text-sm` | Default size, 일반 라벨 |
| `lg` | `px-3 py-1.5` | `text-sm font-semibold` | 강조된 라벨 |

### 3. Color Variants (5가지)

**Base Colors:**
- brand
- gray

**Status Colors:**
- success
- warning
- error

| Color | Use Case |
|-------|----------|
| `brand` | 브랜드 컬러, 기본 태그 |
| `gray` | 중립적 태그, 기본값 |
| `success` | 성공, 활성, 긍정 상태 |
| `warning` | 경고, 주의 상태 |
| `error` | 오류, 실패, 부정 상태 |

### 4. Component Variants (4가지)

1. **Tag** - 기본 Tag
2. **TagCloseX** - 제거 버튼 (X 아이콘)
3. **TagList** - 태그 목록 컨테이너
4. **TagGroup** - 라벨, 설명, 에러 메시지가 있는 태그 그룹

### 5. Interactive Features

- Tag의 showRemoveButton prop으로 제거 버튼 표시
- TagGroup의 onRemove 이벤트로 태그 제거 처리
- React Aria Components의 allowsRemoving 기능 활용
- 키보드 접근성 (Enter, Space로 제거)

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React Aria Components 사용 (Tag, TagGroup, TagList)
- Storybook CSF3 (Component Story Format v3) 준수
- Controls addon을 통한 인터랙티브 props 조작
- Autodocs 자동 생성 (`tags: ['autodocs']`)

---

## 📖 Story 구조

### 필수 Story 목록 (10개)

1. **Default** - 기본 Tag (Interactive controls)
2. **AllVariants** - 4가지 variant 비교 (outlined, outlined-plain, subtle, plain)
3. **AllSizes** - 3가지 size 비교 (sm, md, lg)
4. **AllColors** - 5가지 color 비교 (brand, gray, success, warning, error)
5. **WithRemoveButton** - 제거 버튼이 있는 Tag
6. **ColorMatrix** - Variant별 Color 조합 (4 variants × 5 colors = 20개 조합)
7. **TagGroupExample** - 라벨과 설명이 있는 TagGroup
8. **TagGroupWithRemove** - 제거 가능한 TagGroup (useState 활용)
9. **SizeComparisonWithRemove** - 크기별 제거 버튼 비교
10. **RealWorldExample** - 실제 사용 예시 (Product Tags, Status, Filter Tags)

---

## 🎨 Story 예제 구조

### Default Story (Interactive)

```tsx
export const Default: Story = {
  args: {
    children: 'Label',
    size: 'md',
    variant: 'outlined',
    color: 'gray',
    showRemoveButton: false,
  },
};
```

### AllVariants Story (Visual Comparison)

```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      {variants.map(variant => (
        <div key={variant} className="flex items-center gap-4">
          <Tag variant={variant} color="brand">{variant}</Tag>
          <span className="text-sm text-gray-500">설명</span>
        </div>
      ))}
    </div>
  ),
};
```

### TagGroup with State Management

```tsx
export const TagGroupWithRemove: Story = {
  render: () => {
    const [items, setItems] = React.useState([...]);
    return (
      <TagGroup onRemove={(keys) => setItems(...)}>
        <TagList items={items}>
          {(item) => <Tag>{item.name}</Tag>}
        </TagList>
      </TagGroup>
    );
  },
};
```

---

## 📝 ArgTypes 정의

```tsx
argTypes: {
  size: {
    control: 'radio',
    options: ['sm', 'md', 'lg'],
    description: 'Tag size variant',
  },
  variant: {
    control: 'radio',
    options: ['outlined', 'outlined-plain', 'subtle', 'plain'],
    description: 'Tag style variant',
  },
  color: {
    control: 'select',
    options: ['brand', 'gray', 'success', 'warning', 'error'],
    description: 'Tag color variant',
  },
  showRemoveButton: {
    control: 'boolean',
    description: 'Show remove button',
  },
  children: {
    control: 'text',
    description: 'Tag text content',
  },
}
```

---

## ✅ 체크리스트

구현 완료 후 다음 항목들을 확인하세요:

### Story 구현
- [ ] Default Story (Interactive controls)
- [ ] AllVariants Story (4가지 variant 비교)
- [ ] AllSizes Story (3가지 size 비교)
- [ ] AllColors Story (5가지 color 비교)
- [ ] WithRemoveButton Story
- [ ] ColorMatrix Story (Variant × Color 조합)
- [ ] TagGroupExample Story
- [ ] TagGroupWithRemove Story (useState)
- [ ] SizeComparisonWithRemove Story
- [ ] RealWorldExample Story

### 기술 요구사항
- [ ] TypeScript strict mode 오류 없음
- [ ] React Aria Components 사용 (Tag, TagGroup, TagList)
- [ ] CSF3 형식 준수
- [ ] ArgTypes 정의 완료
- [ ] Autodocs 활성화 (`tags: ['autodocs']`)
- [ ] Interactive controls 동작 확인

### 접근성
- [ ] 키보드 네비게이션 지원 (Tab, Enter, Space)
- [ ] aria-label 적용 (TagCloseX에 "Remove this tag")
- [ ] Focus ring 표시 (focus-visible:outline-*)

### 시각적 품질
- [ ] 모든 variant/size/color 조합 렌더링 확인
- [ ] Hover/Focus 상태 스타일 동작
- [ ] 제거 버튼 아이콘 표시 및 동작
- [ ] 설명 텍스트 가독성 확인

### Storybook 실행
- [ ] `npm run storybook` 실행 성공
- [ ] `localhost:6006` 접속 확인
- [ ] "Commons/Components/Tags" 카테고리 표시
- [ ] 각 Story 정상 렌더링
- [ ] Controls 패널에서 props 조작 가능

---

## 🚀 실행 및 확인

```bash
# Storybook 실행
cd frontend
npm run storybook

# 브라우저에서 확인
open http://localhost:6006
```

**확인 경로**: Commons > Components > Tags

---

## 📚 참고 자료

- **React Aria Components - Tag**: https://react-spectrum.adobe.com/react-aria/TagGroup.html
- **Storybook CSF3**: https://storybook.js.org/docs/react/api/csf
- **OSM RFQ Badge Stories**: `frontend/src/commons/components/badge/index.stories.tsx`
- **Untitled UI PRO**: Design system reference
