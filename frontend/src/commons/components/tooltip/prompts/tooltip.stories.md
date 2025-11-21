# Tooltip Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/tooltip/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/tooltip/index.stories.tsx
```

## 🎯 핵심요구사항

### Tooltip 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

## 📊 구현 범위

### Variants: Positions (12가지)

**Top Group**:
- `top` - 상단 중앙
- `top start` - 상단 좌측 (또는 `top left`)
- `top end` - 상단 우측 (또는 `top right`)

**Bottom Group**:
- `bottom` - 하단 중앙
- `bottom start` - 하단 좌측 (또는 `bottom left`)
- `bottom end` - 하단 우측 (또는 `bottom right`)

**Left Group**:
- `left` - 좌측 중앙
- `left start` - 좌측 상단
- `left end` - 좌측 하단

**Right Group**:
- `right` - 우측 중앙
- `right start` - 우측 상단
- `right end` - 우측 하단

### Props

**필수 Props**:
- `title` (ReactNode): Tooltip 제목
- `children` (ReactNode): Trigger 요소 (TooltipTrigger로 감싸야 함)

**선택적 Props**:
- `description` (ReactNode): Tooltip 설명 (제목 아래 표시)
- `arrow` (boolean): 화살표 표시 여부 (default: false)
- `delay` (number): 표시 딜레이 (default: 300ms)
- `closeDelay` (number): 숨김 딜레이 (default: 0ms)
- `placement` (Placement): Tooltip 위치 (default: "top")
- `trigger` ("hover" | "focus"): 트리거 타입
- `isDisabled` (boolean): Tooltip 비활성화
- `isOpen` (boolean): 수동 제어용 open 상태
- `offset` (number): Trigger와의 거리 (default: 6)
- `crossOffset` (number): 교차축 오프셋

### Triggers

**Hover (Default)**:
- 마우스를 Trigger 위에 올리면 Tooltip 표시
- 기본 동작이므로 명시적으로 `trigger="hover"` 지정 불필요

**Focus**:
- Trigger에 포커스가 갈 때 Tooltip 표시
- 키보드 접근성 향상
- `trigger="focus"` 명시 필요

### States

**Normal**:
- 기본 상태
- Hover/Focus 시 Tooltip 표시

**Disabled**:
- `isDisabled={true}` 설정
- Tooltip이 표시되지 않음
- Trigger 스타일링으로 비활성 상태 시각화 권장

**Controlled Open**:
- `isOpen={true}` 설정
- 항상 표시되는 Tooltip
- 데모 또는 튜토리얼에서 유용

### Content Types

**Title Only**:
- 짧은 힌트 텍스트
- `title` prop만 사용
- 가장 일반적인 사용 사례

**Title + Description**:
- 상세 설명이 필요한 경우
- `title` + `description` props 사용
- Description은 더 작은 폰트로 렌더링됨

**With Arrow**:
- `arrow={true}` 설정
- Tooltip과 Trigger의 연결을 시각적으로 강조
- 위치에 따라 화살표 방향 자동 회전

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 12가지 Placement 모두 렌더링 확인
- [ ] Hover 트리거 동작 확인
- [ ] Focus 트리거 동작 확인 (Tab 키로 접근)
- [ ] Arrow 표시/숨김 확인
- [ ] Description 유무에 따른 패딩 변화 확인
- [ ] Delay 설정 동작 확인
- [ ] Disabled 상태에서 Tooltip 미표시 확인
- [ ] Controlled isOpen 동작 확인

### 접근성 (A11y) 검증
- [ ] `aria-describedby` 자동 생성 확인 (React Aria 자동 처리)
- [ ] 키보드 내비게이션 (Tab/Shift+Tab) 동작
- [ ] 스크린리더 호환성 (VoiceOver/NVDA 테스트 권장)
- [ ] Esc 키로 Tooltip 닫기 (React Aria 자동 처리)
- [ ] Focus trap 없음 (Tooltip은 non-modal)

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] A11y 애드온에서 경고 없음
- [ ] Playground Story에서 실시간 prop 변경 확인
- [ ] 각 Story가 독립적으로 렌더링됨

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 타입 추론 정확함
- [ ] Import path `@/commons/components/tooltip` 정상 동작

### UI/UX 검증
- [ ] 최대 너비 (`max-w-xs`) 적용 확인
- [ ] 긴 텍스트 줄바꿈 확인
- [ ] Dark mode 배경색 (`bg-primary-solid`) 확인
- [ ] 애니메이션 (fade-in, zoom-in, slide) 부드럽게 동작
- [ ] Cross offset 자동 계산 (top/bottom left/right 위치)

## 🎨 Story 구성 예시

### 1. Default Story
- 기본 Tooltip (title만, placement: top)
- Playground의 시작점

### 2. AllPlacements Story
- 12가지 위치를 그룹별로 시연
- Top/Bottom/Left/Right 그룹 시각화

### 3. WithDescription Story
- Title만 vs Title+Description 비교
- Description 패딩 변화 확인

### 4. WithArrow Story
- Arrow 없는 버전 vs 있는 버전
- Arrow + Description 조합

### 5. TriggerTypes Story
- Hover (default) vs Focus
- 키보드 접근성 데모

### 6. Delays Story
- 즉시 표시 (delay: 0)
- 기본 딜레이 (delay: 300)
- 긴 딜레이 (delay: 1000)

### 7. WithIcons Story
- Icon 버튼과 Tooltip 조합
- Info, Help, Alert 아이콘 예시

### 8. States Story
- Normal, Disabled, Always Open 비교

### 9. LongContent Story
- 긴 텍스트 줄바꿈 및 max-width 테스트

### 10. Playground Story
- 모든 props 실시간 조작
- Storybook Controls 패널 활용

## 💡 구현 팁

### TooltipTrigger 사용법
Tooltip 컴포넌트는 반드시 `TooltipTrigger`로 감싼 Trigger 요소를 자식으로 받아야 합니다:

```tsx
<Tooltip title="Tooltip text">
  <TooltipTrigger>
    <button>Trigger Button</button>
  </TooltipTrigger>
</Tooltip>
```

### Icon 사용 시
아이콘을 Trigger로 사용할 때는 적절한 호버 효과를 추가하세요:

```tsx
<TooltipTrigger>
  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
    <InfoIcon className="w-5 h-5" />
  </button>
</TooltipTrigger>
```

### Placement 테스트
AllPlacements Story는 충분한 여백(`p-32`)을 제공하여 모든 방향의 Tooltip이 잘릴 수 없도록 합니다.

### Dark Mode
Tooltip은 `bg-primary-solid`를 사용하므로 자동으로 어두운 배경을 가집니다. 별도의 dark mode variant는 필요 없습니다.

## 📚 참고 자료

- [Button Stories](../button/index.stories.tsx): Story 구조 참고
- [React Aria Tooltip Docs](https://react-spectrum.adobe.com/react-aria/Tooltip.html): API 상세 정보
- [Storybook Args](https://storybook.js.org/docs/writing-stories/args): Playground 구현 방법

**구현 완료 후 위 체크리스트를 모두 검증하고 결과를 반환하세요!**
