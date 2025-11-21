# DatePicker Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components + @internationalized/date
- **Documentation**: Storybook 9.1.13

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/date-picker/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/date-picker/index.stories.tsx
```

## 🎯 핵심요구사항

### DatePicker 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

## 📊 구현 범위

### 1. DatePicker (단일 날짜 선택)

**Features**:
- Single date selection
- Calendar popover with Apply/Cancel buttons
- DateInput for manual entry
- Today preset button
- Highlighted dates support
- shouldCloseOnSelect: false (Apply 버튼으로만 닫힘)

**Props**:
- `value`: DateValue | null
- `onChange`: (value: DateValue | null) => void
- `onApply`: () => void
- `onCancel`: () => void
- `isDisabled`: boolean

**States**:
- Empty (no date selected)
- Selected date
- Disabled
- Popover open/closed

**A11y**:
- DatePicker ARIA role
- Keyboard navigation (Arrow keys, Enter, Escape)
- Focus management
- Screen reader announcements

### 2. DateRangePicker (날짜 범위 선택)

**Features**:
- Date range selection (start & end)
- Dual calendar view (desktop: 2 months, mobile: 1 month)
- Preset sidebar (desktop only)
- Mobile presets (Last week, Last month, Last year)
- DateInput for start/end manual entry
- Range visual feedback (gradient on month boundaries)

**Props**:
- `value`: { start: DateValue; end: DateValue } | null
- `onChange`: (value: { start: DateValue; end: DateValue } | null) => void
- `onApply`: () => void
- `onCancel`: () => void
- `isDisabled`: boolean

**Presets** (9가지):
- Today
- Yesterday
- This week
- Last week
- This month
- Last month
- This year
- Last year
- All time

**States**:
- Empty (no range selected)
- Partial selection (start only)
- Complete range selection
- Disabled
- Popover open/closed

**Responsive**:
- Desktop (md+): 2 calendars side by side, preset sidebar
- Mobile: 1 calendar, presets as buttons below DateInputs

### 3. Calendar (Standalone)

**Features**:
- Month navigation (previous/next buttons)
- Week day headers (2-letter abbreviations)
- Date cells with states
- DateInput for manual entry
- Today preset button
- Highlighted dates with dot indicator

**Cell States**:
- Default
- Today (active background + dot)
- Selected (brand background)
- Highlighted (dot indicator)
- Disabled (gray text)
- Hovered (hover background)
- Focused (focus ring)

**A11y**:
- Calendar grid role
- Row/column headers
- Keyboard navigation
- Date announcements

### 4. RangeCalendar (Standalone)

**Features**:
- Dual month view (responsive)
- Range selection visualization
- Range background (active color between dates)
- Start/End date highlighting
- Month boundary gradients
- Mobile/Desktop layouts

**Cell States**:
- Default
- In range (active background)
- Range start (brand background, rounded left)
- Range end (brand background, rounded right)
- Disabled
- Hovered
- Focused

**A11y**:
- RangeCalendar ARIA role
- Start/End date announcements
- Keyboard range selection

### 5. Supporting Components

**DateInput**:
- Segmented input (month/day/year)
- Placeholder segments (uppercase)
- Focus states (brand background on focused segment)
- Tabular nums for alignment
- Literal separators ("/")

**CalendarCell**:
- Complex state management
- Gradient overlays for month boundaries
- Dot indicators for highlighted/today dates
- Rounded corners for range edges

**RangePresetButton**:
- Selected state visualization
- Hover states
- Keyboard focus

## 📚 Stories 구성

### 필수 Stories

1. **DefaultDatePicker**: 빈 상태의 DatePicker
2. **DatePickerWithDefaultValue**: 기본 날짜가 설정된 상태
3. **DatePickerDisabled**: 비활성화된 DatePicker
4. **DefaultDateRangePicker**: 빈 상태의 DateRangePicker
5. **DateRangePickerWithDefaultValue**: 기본 범위가 설정된 상태
6. **DateRangePickerDisabled**: 비활성화된 DateRangePicker
7. **StandaloneCalendar**: 독립적인 Calendar 컴포넌트
8. **CalendarWithDefaultValue**: 기본 날짜가 있는 Calendar
9. **StandaloneRangeCalendar**: 독립적인 RangeCalendar
10. **RangeCalendarWithDefaultValue**: 기본 범위가 있는 RangeCalendar
11. **AllVariants**: 모든 변형 한눈에 보기
12. **Playground**: Interactive DatePicker
13. **RangePlayground**: Interactive DateRangePicker

### Story 구조

```typescript
import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import type { DateValue } from 'react-aria-components';

export const StoryName: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);

    return (
      <div className="w-[400px]">
        <DatePicker
          value={value}
          onChange={setValue}
          onApply={() => console.log('Apply clicked', value)}
          onCancel={() => console.log('Cancel clicked')}
        />
      </div>
    );
  },
};
```

## 🎨 시각적 레이아웃

### Width Constraints

- DatePicker/DateRangePicker: `w-[400px]`
- Calendar (standalone): Natural width with padding
- RangeCalendar: Responsive (1 or 2 months)

### Responsive Behavior

```typescript
// Desktop (md+)
- RangeCalendar: 2 months side by side
- Preset sidebar visible
- DateInputs in footer

// Mobile
- RangeCalendar: 1 month
- Mobile preset buttons
- DateInputs above calendar
```

## ✅ 검증 체크리스트

### 기능 검증

- [ ] DatePicker 날짜 선택 동작 확인
- [ ] DateRangePicker 범위 선택 동작 확인
- [ ] Apply/Cancel 버튼 동작 확인
- [ ] Preset 버튼 동작 확인 (9가지 모두)
- [ ] DateInput 수동 입력 확인
- [ ] Today preset 버튼 동작 확인
- [ ] Highlighted dates 표시 확인
- [ ] Disabled 상태 확인
- [ ] Popover 열기/닫기 동작 확인
- [ ] Responsive 동작 확인 (1 month ↔ 2 months)

### Storybook 통합

- [ ] Controls 패널에서 props 조작 가능 (Playground)
- [ ] A11y 애드온 경고 없음
- [ ] 모든 날짜 형식이 올바르게 표시됨
- [ ] Calendar grid가 정상적으로 렌더링됨

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] DateValue 타입 정확함
- [ ] @internationalized/date 타입 사용 확인

### 시각적 품질

- [ ] Calendar cells 정렬 확인
- [ ] Range selection 시각 효과 (background, gradients)
- [ ] Dot indicators 위치 확인
- [ ] Hover states 부드러움
- [ ] Focus ring 정확한 위치
- [ ] Responsive breakpoint 동작 확인

### React Aria 통합

- [ ] Calendar/RangeCalendar ARIA roles
- [ ] Keyboard navigation (Arrow keys)
- [ ] Focus management
- [ ] Date announcements

**구현 완료 후 체크리스트를 반환하세요!**

## 💡 구현 팁

### Date Value 사용

```typescript
import { today, getLocalTimeZone } from '@internationalized/date';

// Today
const now = today(getLocalTimeZone());

// Add days
const future = now.add({ days: 7 });

// Subtract days
const past = now.subtract({ days: 7 });

// Format
const formatter = useDateFormatter({
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const formatted = formatter.format(value.toDate(getLocalTimeZone()));
```

### State Management

```typescript
// Single date
const [value, setValue] = useState<DateValue | null>(null);

// Date range
const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);

// Focused value (for RangeCalendar)
const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);
```

### Highlighted Dates

```typescript
const highlightedDates = [today(getLocalTimeZone())];

<Calendar highlightedDates={highlightedDates} />
```

### Presets 사용

```typescript
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from '@internationalized/date';

const now = today(getLocalTimeZone());
const { locale } = useLocale();

const presets = {
  thisWeek: {
    label: 'This week',
    value: {
      start: startOfWeek(now, locale),
      end: endOfWeek(now, locale),
    },
  },
  // ... more presets
};
```

## 🔍 테스트 시나리오

1. **Single Date Selection**: DatePicker에서 날짜 선택 → Apply
2. **Date Range Selection**: DateRangePicker에서 start → end 선택 → Apply
3. **Preset Usage**: Preset 버튼 클릭 → 범위 자동 설정 확인
4. **Manual Input**: DateInput에 직접 입력 → 유효성 검증
5. **Cancel**: 날짜 선택 후 Cancel → 이전 값 유지 확인
6. **Keyboard Navigation**: Arrow keys로 날짜 이동 → Enter로 선택
7. **Responsive**: 화면 크기 변경 → 1 month ↔ 2 months 전환 확인
8. **Disabled State**: isDisabled prop → 클릭 불가 확인
9. **Highlighted Dates**: 특정 날짜에 dot indicator 표시 확인
10. **Range Gradients**: 월 경계에서 gradient 표시 확인

## 📖 참고 자료

- [Button Stories 패턴](../../button/index.stories.tsx)
- [React Aria DatePicker](https://react-spectrum.adobe.com/react-aria/DatePicker.html)
- [React Aria DateRangePicker](https://react-spectrum.adobe.com/react-aria/DateRangePicker.html)
- [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/)
- [useBreakpoint Hook](/src/hooks/use-breakpoint.ts)
