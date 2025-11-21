# Pagination Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/pagination/index.tsx
구현된 STORIES 파일경로: frontend/src/commons/components/pagination/index.stories.tsx
```

## 🎯 핵심요구사항

### Pagination 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

## 📊 구현 범위

### 1. Pagination Variants

#### Page Pagination
- **PaginationPageDefault**: Previous/Next 버튼 + 페이지 번호
- **PaginationPageMinimalCenter**: 중앙 정렬 버전

#### Card Pagination
- **PaginationCardDefault**: 카드 스타일 컨테이너
- **PaginationCardMinimal**: 간소화된 카드 버전 (align: left/center/right)

#### Button Group Pagination
- **PaginationButtonGroup**: 버튼 그룹으로 통합된 스타일 (align: left/center/right)

#### Visual Indicators
- **PaginationDot**: 점(dot) 스타일 페이지네이션
  - Sizes: md, lg
  - Variants: default, framed, brand colors
- **PaginationLine**: 라인(line) 스타일 페이지네이션
  - Sizes: md, lg
  - Variants: default, framed

### 2. Props

#### Core Props (PaginationRootProps)
- `page: number` - 현재 활성 페이지 번호
- `total: number` - 전체 페이지 수
- `siblingCount?: number` - 현재 페이지 양옆에 표시할 페이지 수 (기본값: 1)
- `onPageChange?: (page: number) => void` - 페이지 변경 콜백

#### Style Props
- `rounded?: boolean` - 둥근 버튼 스타일 (PaginationItem)
- `size?: 'md' | 'lg'` - 크기 (Dot, Line)
- `align?: 'left' | 'center' | 'right'` - 정렬 (CardMinimal, ButtonGroup)
- `framed?: boolean` - 프레임 배경 (Dot, Line)
- `isBrand?: boolean` - 브랜드 컬러 사용 (Dot)

### 3. Low-Level API

#### Pagination.Root
기본 Context Provider 및 페이지 계산 로직

#### Pagination.Context
Render prop으로 페이지 상태 접근:
```tsx
<Pagination.Context>
  {({ pages, currentPage, total, onPageChange }) => (
    // Custom UI
  )}
</Pagination.Context>
```

#### Pagination.Item
개별 페이지 버튼:
- `value: number` - 페이지 번호
- `isCurrent: boolean` - 현재 페이지 여부
- `asChild?: boolean` - 자식 컴포넌트에 props 전달

#### Pagination.PrevTrigger / NextTrigger
이전/다음 페이지 버튼:
- 자동으로 첫 페이지/마지막 페이지에서 disabled 처리
- `asChild` 지원으로 커스텀 버튼 사용 가능

#### Pagination.Ellipsis
생략 표시 (...):
- 페이지 수가 많을 때 자동 삽입

### 4. State Management

모든 Stories는 `useState`를 사용하여 페이지 상태를 관리해야 합니다:

```tsx
const [page, setPage] = useState(1);

<PaginationPageDefault
  page={page}
  total={10}
  onPageChange={setPage}
/>
```

### 5. Stories 구성

#### 필수 Stories
1. **Default**: 기본 PaginationPageDefault
2. **AllVariants**: 모든 페이지네이션 스타일 비교
3. **RoundedVariants**: 둥근/각진 버튼 비교
4. **SiblingCount**: siblingCount 옵션 시연 (1, 2, 3)
5. **Alignment**: 정렬 옵션 비교 (left, center, right)
6. **DotVariants**: Dot 스타일 모든 옵션
7. **LineVariants**: Line 스타일 모든 옵션
8. **EdgeCases**: 엣지 케이스 테스트
   - 페이지 1개
   - 페이지 3개
   - 첫 페이지 (많은 페이지)
   - 마지막 페이지 (많은 페이지)
9. **Playground**: 인터랙티브 테스트
10. **LowLevelAPI**: Low-Level API 사용 예제

## ✅ 검증 체크리스트

### 기능 검증
- [x] 모든 variants 렌더링 확인
- [x] 페이지 변경 동작 확인 (useState 연동)
- [x] Previous/Next 버튼 동작 확인
- [x] 첫 페이지/마지막 페이지에서 버튼 disabled 확인
- [x] Ellipsis 자동 생성 확인 (페이지 많을 때)
- [x] siblingCount 옵션 동작 확인
- [x] 정렬 옵션 동작 확인

### Storybook 통합
- [x] Controls 패널에서 모든 props 조작 가능
- [x] Meta argTypes 정의 완료
- [x] 각 Story별 적절한 초기값 설정
- [x] 반응형 동작 확인 (모바일/데스크톱)

### 타입 안전성
- [x] TypeScript strict mode 에러 없음
- [x] 모든 props 타입 정의 확인

### 접근성
- [x] aria-label 자동 생성 확인 (Previous Page, Next Page, Page N)
- [x] aria-current="page" 적용 확인
- [x] 키보드 내비게이션 지원 (Tab, Enter)
- [x] 스크린리더 호환성

## 📝 구현 완료

Pagination 컴포넌트의 모든 variants가 Storybook Stories로 성공적으로 구현되었습니다.

### 생성된 Stories:
1. ✅ Default - 기본 페이지 Pagination
2. ✅ AllVariants - 모든 Pagination 스타일 비교
3. ✅ RoundedVariants - 둥근/각진 버튼 비교
4. ✅ SiblingCount - 형제 페이지 수 조절
5. ✅ Alignment - 정렬 옵션 (left, center, right)
6. ✅ DotVariants - Dot 스타일 모든 옵션
7. ✅ LineVariants - Line 스타일 모든 옵션
8. ✅ EdgeCases - 엣지 케이스 테스트
9. ✅ Playground - 인터랙티브 테스트
10. ✅ LowLevelAPI - Low-Level API 사용 예제

### Storybook 확인:
```bash
npm run storybook
# http://localhost:6006/?path=/story/commons-components-pagination--default
```

## 🎨 디자인 토큰 사용

Pagination 컴포넌트는 다음 디자인 토큰을 사용합니다:

### Colors
- `text-quaternary`: 비활성 페이지 번호
- `text-secondary`: 활성 페이지 번호
- `bg-primary_hover`: 호버/선택 배경
- `border-secondary`: 테두리
- `text-fg-secondary`: 보조 텍스트
- `bg-fg-brand-primary_alt`: 브랜드 강조색
- `bg-fg-white`: 흰색 배경

### Focus States
- `outline-focus-ring`: 포커스 링
- `focus-visible:outline-2`: 포커스 아웃라인 두께
- `focus-visible:outline-offset-2`: 포커스 오프셋

### Transitions
- `transition duration-100 ease-linear`: 부드러운 상태 전환
