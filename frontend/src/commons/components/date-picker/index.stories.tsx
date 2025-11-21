import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import { DatePicker, DateRangePicker, Calendar, RangeCalendar } from './index';
import type { DateValue } from 'react-aria-components';

const meta: Meta<typeof DatePicker> = {
  title: 'Commons/Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ============================================================================
// DatePicker Stories
// ============================================================================

export const DefaultDatePicker: Story = {
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

export const DatePickerWithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));

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

export const DatePickerDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);

    return (
      <div className="w-[400px]">
        <DatePicker
          value={value}
          onChange={setValue}
          isDisabled
        />
      </div>
    );
  },
};

// ============================================================================
// DateRangePicker Stories
// ============================================================================

export const DefaultDateRangePicker: Story = {
  render: () => {
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);

    return (
      <div className="w-[400px]">
        <DateRangePicker
          value={value}
          onChange={setValue}
          onApply={() => console.log('Apply clicked', value)}
          onCancel={() => console.log('Cancel clicked')}
        />
      </div>
    );
  },
};

export const DateRangePickerWithDefaultValue: Story = {
  render: () => {
    const now = today(getLocalTimeZone());
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>({
      start: now,
      end: now.add({ days: 7 }),
    });

    return (
      <div className="w-[400px]">
        <DateRangePicker
          value={value}
          onChange={setValue}
          onApply={() => console.log('Apply clicked', value)}
          onCancel={() => console.log('Cancel clicked')}
        />
      </div>
    );
  },
};

export const DateRangePickerDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);

    return (
      <div className="w-[400px]">
        <DateRangePicker
          value={value}
          onChange={setValue}
          isDisabled
        />
      </div>
    );
  },
};

// ============================================================================
// Calendar Component Stories
// ============================================================================

export const StandaloneCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const highlightedDates = [today(getLocalTimeZone())];

    return (
      <div className="flex justify-center p-6">
        <Calendar
          value={value}
          onChange={setValue}
          highlightedDates={highlightedDates}
        />
      </div>
    );
  },
};

export const CalendarWithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));
    const highlightedDates = [today(getLocalTimeZone())];

    return (
      <div className="flex justify-center p-6">
        <Calendar
          value={value}
          onChange={setValue}
          highlightedDates={highlightedDates}
        />
      </div>
    );
  },
};

// ============================================================================
// RangeCalendar Component Stories
// ============================================================================

export const StandaloneRangeCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);
    const highlightedDates = [today(getLocalTimeZone())];

    return (
      <div className="flex justify-center p-6">
        <RangeCalendar
          value={value}
          onChange={setValue}
          focusedValue={focusedValue}
          onFocusChange={setFocusedValue}
          highlightedDates={highlightedDates}
        />
      </div>
    );
  },
};

export const RangeCalendarWithDefaultValue: Story = {
  render: () => {
    const now = today(getLocalTimeZone());
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>({
      start: now,
      end: now.add({ days: 7 }),
    });
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);
    const highlightedDates = [today(getLocalTimeZone())];

    return (
      <div className="flex justify-center p-6">
        <RangeCalendar
          value={value}
          onChange={setValue}
          focusedValue={focusedValue}
          onFocusChange={setFocusedValue}
          highlightedDates={highlightedDates}
        />
      </div>
    );
  },
};

// ============================================================================
// All Variants Overview
// ============================================================================

export const AllVariants: Story = {
  render: () => {
    const [singleDate, setSingleDate] = useState<DateValue | null>(null);
    const [dateRange, setDateRange] = useState<{ start: DateValue; end: DateValue } | null>(null);

    return (
      <div className="flex flex-col gap-8 max-w-4xl p-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Date Picker</h2>
          <DatePicker
            value={singleDate}
            onChange={setSingleDate}
            onApply={() => console.log('Apply clicked')}
            onCancel={() => console.log('Cancel clicked')}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Date Range Picker</h2>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            onApply={() => console.log('Apply clicked')}
            onCancel={() => console.log('Cancel clicked')}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Disabled States</h2>
          <div className="flex gap-4">
            <DatePicker
              value={singleDate}
              onChange={setSingleDate}
              isDisabled
            />
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              isDisabled
            />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);

    return (
      <div className="w-[400px]">
        <DatePicker
          value={value}
          onChange={setValue}
          onApply={() => alert(`Selected date: ${value?.toString()}`)}
          onCancel={() => alert('Cancelled')}
        />

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-700">
            Selected value: {value ? value.toString() : 'None'}
          </p>
        </div>
      </div>
    );
  },
};

export const RangePlayground: Story = {
  render: () => {
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(null);

    return (
      <div className="w-[400px]">
        <DateRangePicker
          value={value}
          onChange={setValue}
          onApply={() => alert(`Selected range: ${value?.start.toString()} - ${value?.end.toString()}`)}
          onCancel={() => alert('Cancelled')}
        />

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-700">
            Selected range: {value ? `${value.start.toString()} - ${value.end.toString()}` : 'None'}
          </p>
        </div>
      </div>
    );
  },
};
