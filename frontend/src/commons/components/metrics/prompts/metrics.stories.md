# Metrics Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components + Recharts
- **Documentation**: Storybook 9.1.13

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/metrics/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/metrics/index.stories.tsx
```

## 🎯 핵심요구사항

### Metrics 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

## 📊 구현 범위

### 1. MetricChangeIndicator

**Variants**:
- Type: `simple` | `trend` | `modern`
- Trend: `positive` | `negative`
- Value: 변화율 표시 (예: "12%")

**States**:
- Positive trend (success colors)
- Negative trend (error colors)

**A11y**:
- 색상과 함께 화살표 아이콘으로 방향 표시
- Screen reader를 위한 의미있는 텍스트

### 2. MetricsSimple

**Variants**:
- Type: `simple` | `trend` | `modern`
- With/without footer
- With/without actions dropdown

**Props**:
- `title`: 메인 메트릭 값
- `subtitle`: 메트릭 설명
- `type`: 변화 표시 타입
- `trend`: 긍정/부정 트렌드
- `change`: 변화율
- `footer`: 추가 정보 표시

**States**:
- Default
- With footer
- Actions enabled/disabled

### 3. MetricsIcon01-04

**공통 Props**:
- `title`: 메트릭 값
- `subtitle`: 메트릭 설명
- `footer`: 선택적 하단 정보

**Variants**:
- MetricsIcon01: Featured icon with modern change indicator
- MetricsIcon02: Icon with simple change indicator
- MetricsIcon03: Icon with trend indicator and actions
- MetricsIcon04: Horizontal layout with modern indicator

**A11y**:
- Icon은 decorative로 표시 (텍스트로 의미 전달)
- 키보드로 Actions dropdown 접근 가능

### 4. MetricsChart01-04

**공통 Props**:
- `title`: 메트릭 값
- `subtitle`: 메트릭 설명
- `change`: 변화율
- `changeTrend`: 긍정/부정
- `chartData`: 차트 데이터 배열
- `footer`: 선택적 하단 정보

**Chart Features**:
- Recharts AreaChart 사용
- Gradient fill
- Responsive design
- Custom dot for highlighted points
- Dynamic color based on trend

**Variants**:
- MetricsChart01: Simple area chart with highlighted dot
- MetricsChart02: Two-layer area chart with icon
- MetricsChart03: Full-width responsive chart
- MetricsChart04: Card with nested chart container

**A11y**:
- Chart는 decorative (데이터는 텍스트로 제공)
- 키보드 내비게이션 지원
- Color-blind friendly 색상 사용

### 5. ActionsDropdown

**Features**:
- View more
- Share
- Copy link

**States**:
- Open/Closed
- Hover/Focus states

**A11y**:
- 키보드로 열기/닫기
- Arrow keys로 메뉴 아이템 내비게이션
- Escape로 닫기

## 📚 Stories 구성

### 필수 Stories

1. **ChangeIndicatorSimple**: 모든 타입의 변화 표시기
2. **SimpleMetrics**: 기본 메트릭 카드 variants
3. **SimpleMetricsWithFooter**: Footer가 있는 메트릭
4. **IconMetrics01-04**: 각 아이콘 메트릭 variant
5. **ChartMetrics01-04**: 각 차트 메트릭 variant
6. **AllVariants**: 모든 메트릭 타입 한눈에 보기
7. **Playground**: Interactive controls

### Story 구조

```typescript
export const StoryName: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <MetricsComponent
        title="Value"
        subtitle="Label"
        // ... props
      />
    </div>
  ),
};
```

## 🎨 시각적 레이아웃

### Grid Layout (AllVariants)

```typescript
<div className="grid grid-cols-2 gap-6 max-w-4xl">
  {/* 각 variant를 2열 그리드로 표시 */}
</div>
```

### Vertical Stack (Individual Stories)

```typescript
<div className="flex flex-col gap-6 w-[400px]">
  {/* 같은 타입의 variants 수직 배열 */}
</div>
```

## ✅ 검증 체크리스트

### 기능 검증

- [ ] 모든 MetricChangeIndicator types 렌더링 확인
- [ ] MetricsSimple의 3가지 types 동작 확인
- [ ] MetricsIcon01-04 모든 variants 표시 확인
- [ ] MetricsChart01-04 차트 렌더링 확인
- [ ] ActionsDropdown 열기/닫기 동작 확인
- [ ] Positive/Negative trends 색상 차이 확인
- [ ] Footer 표시/숨김 동작 확인

### Storybook 통합

- [ ] Controls 패널에서 모든 props 조작 가능 (Playground)
- [ ] A11y 애드온 경고 없음
- [ ] 차트가 정상적으로 렌더링됨
- [ ] Actions dropdown이 스토리에서 동작함

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] 모든 props 타입 정의 확인
- [ ] Icon props 타입 체크 (FC<{ className?: string }>)

### 차트 데이터

- [ ] chartData prop이 올바른 형식인지 확인
- [ ] Gradient ID 충돌 없음 (useId 사용)
- [ ] Responsive 동작 확인

### 시각적 품질

- [ ] 모든 variants가 400px width에 맞게 표시됨
- [ ] Grid layout이 max-w-4xl에서 정렬됨
- [ ] Gap spacing이 일관됨 (gap-4 또는 gap-6)
- [ ] Dark mode에서도 차트가 보임

**구현 완료 후 체크리스트를 반환하세요!**

## 💡 구현 팁

### Recharts 사용 시

```typescript
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

// Gradient 정의
<defs>
  <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="currentColor" className={chartColor} stopOpacity="1" />
    <stop offset="95%" stopColor="currentColor" className={chartColor} stopOpacity="0" />
  </linearGradient>
</defs>

// Area 차트
<Area
  dataKey="value"
  type="monotone"
  stroke="currentColor"
  strokeWidth={2}
  fill={`url(#gradient-${id})`}
  fillOpacity={0.2}
/>
```

### Icon Import

```typescript
import { TrendUp01, Eye, Zap } from '@untitledui/icons';
```

### 데이터 샘플

```typescript
const lineData = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 20, highlight: true }, // Custom dot 표시
];
```

## 🔍 테스트 시나리오

1. **Positive Trend**: change="12%", trend="positive" → 초록색 화살표
2. **Negative Trend**: change="8%", trend="negative" → 빨간색 화살표
3. **Chart Rendering**: chartData가 비어있지 않은지 확인
4. **Actions Dropdown**: 클릭 시 메뉴 표시
5. **Footer**: footer prop이 있을 때만 하단 섹션 렌더링
6. **Responsive**: 작은 화면에서도 차트 크기 조절됨

## 📖 참고 자료

- [Button Stories 패턴](../../button/index.stories.tsx)
- [Recharts 공식 문서](https://recharts.org/)
- [Untitled UI Icons](https://icons.untitledui.com/)
