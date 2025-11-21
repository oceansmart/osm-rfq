"use client";

import type { HTMLAttributes, PropsWithChildren } from "react";
import { Fragment, useContext, useState } from "react";
import type { CalendarDate } from "@internationalized/date";
import { endOfMonth, endOfWeek, getDayOfWeek, getLocalTimeZone, isToday, startOfMonth, startOfWeek, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { useDateFormatter, useLocale } from "react-aria";
import type {
    CalendarCellProps as AriaCalendarCellProps,
    CalendarProps as AriaCalendarProps,
    DateInputProps as AriaDateInputProps,
    DatePickerProps as AriaDatePickerProps,
    DateRangePickerProps as AriaDateRangePickerProps,
    DateValue,
    RangeCalendarProps as AriaRangeCalendarProps,
} from "react-aria-components";
import {
    Calendar as AriaCalendar,
    CalendarCell as AriaCalendarCell,
    CalendarContext as AriaCalendarContext,
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarGridHeader as AriaCalendarGridHeader,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    CalendarStateContext as AriaCalendarStateContext,
    DateInput as AriaDateInput,
    DatePicker as AriaDatePicker,
    DateRangePicker as AriaDateRangePicker,
    DateSegment as AriaDateSegment,
    Dialog as AriaDialog,
    Group as AriaGroup,
    Heading as AriaHeading,
    Popover as AriaPopover,
    RangeCalendar as AriaRangeCalendar,
    RangeCalendarContext,
    RangeCalendarStateContext,
    useSlottedContext,
} from "react-aria-components";
import { Button } from "@/commons/components/button";
import { useBreakpoint } from "@/commons/hooks/use-breakpoint";
import { cx } from "@/commons/utils/cx";

// ============================================================================
// DateInput Component
// ============================================================================

interface DateInputProps extends Omit<AriaDateInputProps, "children"> {}

export const DateInput = (props: DateInputProps) => {
    return (
        <AriaDateInput
            {...props}
            className={cx(
                "flex rounded-lg bg-primary px-2.5 py-2 text-md shadow-xs ring-1 ring-primary ring-inset focus-within:ring-2 focus-within:ring-brand",
                typeof props.className === "string" && props.className,
            )}
        >
            {(segment) => (
                <AriaDateSegment
                    segment={segment}
                    className={cx(
                        "rounded px-0.5 text-primary tabular-nums caret-transparent focus:bg-brand-solid focus:font-medium focus:text-white focus:outline-hidden",
                        // The placeholder segment.
                        segment.isPlaceholder && "text-placeholder uppercase",
                        // The separator "/" segment.
                        segment.type === "literal" && "text-fg-quaternary",
                    )}
                />
            )}
        </AriaDateInput>
    );
};

// ============================================================================
// CalendarCell Component
// ============================================================================

interface CalendarCellProps extends AriaCalendarCellProps {
    /** Whether the calendar is a range calendar. */
    isRangeCalendar?: boolean;
    /** Whether the cell is highlighted. */
    isHighlighted?: boolean;
}

export const CalendarCell = ({ date, isHighlighted, ...props }: CalendarCellProps) => {
    const { locale } = useLocale();
    const dayOfWeek = getDayOfWeek(date, locale);
    const rangeCalendarContext = useSlottedContext(RangeCalendarContext);

    const isRangeCalendar = !!rangeCalendarContext;

    const start = rangeCalendarContext?.value?.start;
    const end = rangeCalendarContext?.value?.end;

    const isAfterStart = start ? date.compare(start) > 0 : true;
    const isBeforeEnd = end ? date.compare(end) < 0 : true;

    const isAfterOrOnStart = start && date.compare(start) >= 0;
    const isBeforeOrOnEnd = end && date.compare(end) <= 0;
    const isInRange = isAfterOrOnStart && isBeforeOrOnEnd;

    const lastDayOfMonth = new Date(date.year, date.month, 0).getDate();
    const isLastDayOfMonth = date.day === lastDayOfMonth;
    const isFirstDayOfMonth = date.day === 1;

    const isTodayDate = isToday(date, getLocalTimeZone());

    return (
        <AriaCalendarCell
            {...props}
            date={date}
            className={({ isDisabled, isFocusVisible, isSelectionStart, isSelectionEnd, isSelected, isOutsideMonth }) => {
                const isRoundedLeft = isSelectionStart || dayOfWeek === 0;
                const isRoundedRight = isSelectionEnd || dayOfWeek === 6;

                return cx(
                    "relative size-10 focus:outline-none",
                    isRoundedLeft && "rounded-l-full",
                    isRoundedRight && "rounded-r-full",
                    isInRange && isDisabled && "bg-active",
                    isSelected && isRangeCalendar && "bg-active",
                    isDisabled ? "pointer-events-none" : "cursor-pointer",
                    isFocusVisible ? "z-10" : "z-0",
                    isRangeCalendar && isOutsideMonth && "hidden",

                    // Show gradient on last day of month if it's within the selected range.
                    isLastDayOfMonth &&
                        isSelected &&
                        isBeforeEnd &&
                        isRangeCalendar &&
                        "after:absolute after:inset-0 after:translate-x-full after:bg-gradient-to-l after:from-transparent after:to-bg-active in-[[role=gridcell]:last-child]:after:hidden",

                    // Show gradient on first day of month if it's within the selected range.
                    isFirstDayOfMonth &&
                        isSelected &&
                        isAfterStart &&
                        isRangeCalendar &&
                        "after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:to-bg-active in-[[role=gridcell]:first-child]:after:hidden",
                );
            }}
        >
            {({ isDisabled, isFocusVisible, isSelectionStart, isSelectionEnd, isSelected, formattedDate }) => {
                const markedAsSelected = isSelectionStart || isSelectionEnd || (isSelected && !isDisabled && !isRangeCalendar);

                return (
                    <div
                        className={cx(
                            "relative flex size-full items-center justify-center rounded-full text-sm",
                            // Disabled state.
                            isDisabled ? "text-disabled" : "text-secondary hover:text-secondary_hover",
                            // Focus ring, visible while the cell has keyboard focus.
                            isFocusVisible ? "outline-2 outline-offset-2 outline-focus-ring" : "",
                            // Hover state for cells in the middle of the range.
                            isSelected && !isDisabled && isRangeCalendar ? "font-medium" : "",
                            markedAsSelected && "bg-brand-solid font-medium text-white hover:bg-brand-solid_hover hover:text-white",
                            // Hover state for non-selected cells.
                            !isSelected && !isDisabled ? "hover:bg-primary_hover hover:font-medium!" : "",
                            !isSelected && isTodayDate ? "bg-active font-medium hover:bg-secondary_hover" : "",
                        )}
                    >
                        {formattedDate}

                        {(isHighlighted || isTodayDate) && (
                            <div
                                className={cx(
                                    "absolute bottom-1 left-1/2 size-1.25 -translate-x-1/2 rounded-full",
                                    isDisabled ? "bg-fg-disabled" : markedAsSelected ? "bg-fg-white" : "bg-fg-brand-primary",
                                )}
                            />
                        )}
                    </div>
                );
            }}
        </AriaCalendarCell>
    );
};

// ============================================================================
// RangePresetButton Component
// ============================================================================

interface RangePresetButtonProps extends HTMLAttributes<HTMLButtonElement> {
    value: { start: DateValue; end: DateValue };
}

export const RangePresetButton = ({ value, className, children, ...props }: RangePresetButtonProps) => {
    const context = useSlottedContext(RangeCalendarContext);

    const isSelected = context?.value?.start?.compare(value.start) === 0 && context?.value?.end?.compare(value.end) === 0;

    return (
        <button
            {...props}
            className={cx(
                "cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
                isSelected ? "bg-active text-secondary_hover hover:bg-secondary_hover" : "text-secondary hover:bg-primary_hover hover:text-secondary_hover",
                className,
            )}
        >
            {children}
        </button>
    );
};

// ============================================================================
// Calendar Component
// ============================================================================

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {
    const [value, onChange] = useState<DateValue | null>(null);
    const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

    return <AriaCalendarContext.Provider value={{ value, onChange, focusedValue, onFocusChange }}>{children}</AriaCalendarContext.Provider>;
};

const PresetButton = ({ value, children, ...props }: HTMLAttributes<HTMLButtonElement> & { value: CalendarDate }) => {
    const context = useContext(AriaCalendarStateContext);

    if (!context) {
        throw new Error("Preset must be used within a Calendar component");
    }

    const handleClick = () => {
        context.setValue(value);
        context.setFocusedDate(value);
    };

    return (
        <Button
            {...props}
            // It's important to give `null` explicitly to the `slot` prop
            // otherwise the button will throw an error due to not using one of
            // the required slots inside the Calendar component.
            // Passing `null` will tell the button to not use a slot context.
            slot={null}
            size="md"
            color="secondary"
            onClick={handleClick}
        >
            {children}
        </Button>
    );
};

interface CalendarProps extends AriaCalendarProps<DateValue> {
    /** The dates to highlight. */
    highlightedDates?: DateValue[];
}

export const Calendar = ({ highlightedDates, className, ...props }: CalendarProps) => {
    const context = useSlottedContext(AriaCalendarContext)!;

    const ContextWrapper = context ? Fragment : CalendarContextProvider;

    return (
        <ContextWrapper>
            <AriaCalendar {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
                <header className="flex items-center justify-between">
                    <Button slot="previous" iconLeading={ChevronLeft} size="sm" color="tertiary" className="size-8" />
                    <AriaHeading className="text-sm font-semibold text-fg-secondary" />
                    <Button slot="next" iconLeading={ChevronRight} size="sm" color="tertiary" className="size-8" />
                </header>

                <div className="flex gap-3">
                    <DateInput className="flex-1" />
                    <PresetButton value={today(getLocalTimeZone())}>Today</PresetButton>
                </div>

                <AriaCalendarGrid weekdayStyle="short" className="w-max">
                    <AriaCalendarGridHeader className="border-b-4 border-transparent">
                        {(day) => (
                            <AriaCalendarHeaderCell className="p-0">
                                <div className="flex size-10 items-center justify-center text-sm font-medium text-secondary">{day.slice(0, 2)}</div>
                            </AriaCalendarHeaderCell>
                        )}
                    </AriaCalendarGridHeader>
                    <AriaCalendarGridBody className="[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none">
                        {(date) => (
                            <CalendarCell date={date} isHighlighted={highlightedDates?.some((highlightedDate) => date.compare(highlightedDate) === 0)} />
                        )}
                    </AriaCalendarGridBody>
                </AriaCalendarGrid>
            </AriaCalendar>
        </ContextWrapper>
    );
};

// ============================================================================
// RangeCalendar Component
// ============================================================================

export const RangeCalendarContextProvider = ({ children }: PropsWithChildren) => {
    const [value, onChange] = useState<{ start: DateValue; end: DateValue } | null>(null);
    const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

    return <RangeCalendarContext.Provider value={{ value, onChange, focusedValue, onFocusChange }}>{children}</RangeCalendarContext.Provider>;
};

const RangeCalendarTitle = ({ part }: { part: "start" | "end" }) => {
    const context = useContext(RangeCalendarStateContext);

    if (!context) {
        throw new Error("<RangeCalendarTitle /> must be used within a <RangeCalendar /> component.");
    }

    const formatter = useDateFormatter({
        month: "long",
        year: "numeric",
        calendar: context.visibleRange.start.calendar.identifier,
        timeZone: context.timeZone,
    });

    return part === "start"
        ? formatter.format(context.visibleRange.start.toDate(context.timeZone))
        : formatter.format(context.visibleRange.end.toDate(context.timeZone));
};

const MobilePresetButton = ({ value, children, ...props }: HTMLAttributes<HTMLButtonElement> & { value: { start: DateValue; end: DateValue } }) => {
    const context = useContext(RangeCalendarStateContext);

    return (
        <Button
            {...props}
            slot={null}
            size="sm"
            color="link-color"
            onClick={() => {
                context?.setValue(value);
                context?.setFocusedDate(value.start as CalendarDate);
            }}
        >
            {children}
        </Button>
    );
};

interface RangeCalendarProps extends AriaRangeCalendarProps<DateValue> {
    /** The dates to highlight. */
    highlightedDates?: DateValue[];
    /** The date presets to display. */
    presets?: Record<string, { label: string; value: { start: DateValue; end: DateValue } }>;
}

export const RangeCalendar = ({ presets, ...props }: RangeCalendarProps) => {
    const isDesktop = useBreakpoint("md");
    const context = useSlottedContext(RangeCalendarContext);

    const ContextWrapper = context ? Fragment : RangeCalendarContextProvider;

    return (
        <ContextWrapper>
            <AriaRangeCalendar
                className="flex items-start"
                visibleDuration={{
                    months: isDesktop ? 2 : 1,
                }}
                {...props}
            >
                <div className="flex flex-col gap-3 px-6 py-5">
                    <header className="relative flex items-center justify-between md:justify-start">
                        <Button slot="previous" iconLeading={ChevronLeft} size="sm" color="tertiary" className="size-8" />

                        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-fg-secondary">
                            <RangeCalendarTitle part="start" />
                        </h2>

                        <Button slot="next" iconLeading={ChevronRight} size="sm" color="tertiary" className="size-8 md:hidden" />
                    </header>

                    {!isDesktop && (
                        <div className="flex items-center gap-2 md:hidden">
                            <DateInput slot="start" className="flex-1" />
                            <div className="text-md text-quaternary">–</div>
                            <DateInput slot="end" className="flex-1" />
                        </div>
                    )}

                    {!isDesktop && presets && (
                        <div className="mt-1 flex justify-between gap-3 px-2 md:hidden">
                            {Object.values(presets).map((preset) => (
                                <MobilePresetButton key={preset.label} value={preset.value}>
                                    {preset.label}
                                </MobilePresetButton>
                            ))}
                        </div>
                    )}

                    <AriaCalendarGrid weekdayStyle="short" className="w-max">
                        <AriaCalendarGridHeader>
                            {(day) => (
                                <AriaCalendarHeaderCell className="border-b-4 border-transparent p-0">
                                    <div className="flex size-10 items-center justify-center text-sm font-medium text-secondary">{day.slice(0, 2)}</div>
                                </AriaCalendarHeaderCell>
                            )}
                        </AriaCalendarGridHeader>
                        <AriaCalendarGridBody className="[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none">
                            {(date) => <CalendarCell date={date} />}
                        </AriaCalendarGridBody>
                    </AriaCalendarGrid>
                </div>

                {isDesktop && (
                    <div className="flex flex-col gap-3 border-l border-secondary px-6 py-5">
                        <header className="relative flex items-center justify-end">
                            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-fg-secondary">
                                <RangeCalendarTitle part="end" />
                            </h2>

                            <Button slot="next" iconLeading={ChevronRight} size="sm" color="tertiary" className="size-8" />
                        </header>

                        <AriaCalendarGrid weekdayStyle="short" offset={{ months: 1 }} className="w-max">
                            <AriaCalendarGridHeader>
                                {(day) => (
                                    <AriaCalendarHeaderCell className="border-b-4 border-transparent p-0">
                                        <div className="flex size-10 items-center justify-center text-sm font-medium text-secondary">{day.slice(0, 2)}</div>
                                    </AriaCalendarHeaderCell>
                                )}
                            </AriaCalendarGridHeader>
                            <AriaCalendarGridBody className="[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none">
                                {(date) => <CalendarCell date={date} />}
                            </AriaCalendarGridBody>
                        </AriaCalendarGrid>
                    </div>
                )}
            </AriaRangeCalendar>
        </ContextWrapper>
    );
};

// ============================================================================
// DatePicker Component
// ============================================================================

const highlightedDates = [today(getLocalTimeZone())];

interface DatePickerProps extends AriaDatePickerProps<DateValue> {
    /** The function to call when the apply button is clicked. */
    onApply?: () => void;
    /** The function to call when the cancel button is clicked. */
    onCancel?: () => void;
}

export const DatePicker = ({ value: valueProp, defaultValue, onChange, onApply, onCancel, ...props }: DatePickerProps) => {
    const formatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const [value, setValue] = useControlledState(valueProp, defaultValue || null, onChange);

    const formattedDate = value ? formatter.format(value.toDate(getLocalTimeZone())) : "Select date";

    return (
        <AriaDatePicker shouldCloseOnSelect={false} {...props} value={value} onChange={setValue}>
            <AriaGroup>
                <Button size="md" color="secondary" iconLeading={CalendarIcon}>
                    {formattedDate}
                </Button>
            </AriaGroup>
            <AriaPopover
                offset={8}
                placement="bottom right"
                className={({ isEntering, isExiting }) =>
                    cx(
                        "origin-(--trigger-anchor-point) will-change-transform",
                        isEntering &&
                            "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                        isExiting &&
                            "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                    )
                }
            >
                <AriaDialog className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt">
                    {({ close }) => (
                        <>
                            <div className="flex px-6 py-5">
                                <Calendar highlightedDates={highlightedDates} />
                            </div>
                            <div className="grid grid-cols-2 gap-3 border-t border-secondary p-4">
                                <Button
                                    size="md"
                                    color="secondary"
                                    onClick={() => {
                                        onCancel?.();
                                        close();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    color="primary"
                                    onClick={() => {
                                        onApply?.();
                                        close();
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDatePicker>
    );
};

// ============================================================================
// DateRangePicker Component
// ============================================================================

const now = today(getLocalTimeZone());

interface DateRangePickerProps extends AriaDateRangePickerProps<DateValue> {
    /** The function to call when the apply button is clicked. */
    onApply?: () => void;
    /** The function to call when the cancel button is clicked. */
    onCancel?: () => void;
}

export const DateRangePicker = ({ value: valueProp, defaultValue, onChange, onApply, onCancel, ...props }: DateRangePickerProps) => {
    const { locale } = useLocale();
    const formatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const [value, setValue] = useControlledState(valueProp, defaultValue || null, onChange);
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

    const formattedStartDate = value?.start ? formatter.format(value.start.toDate(getLocalTimeZone())) : "Select date";
    const formattedEndDate = value?.end ? formatter.format(value.end.toDate(getLocalTimeZone())) : "Select date";

    const presets = useState(
        () => ({
            today: { label: "Today", value: { start: now, end: now } },
            yesterday: { label: "Yesterday", value: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) } },
            thisWeek: { label: "This week", value: { start: startOfWeek(now, locale), end: endOfWeek(now, locale) } },
            lastWeek: {
                label: "Last week",
                value: {
                    start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                    end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                },
            },
            thisMonth: { label: "This month", value: { start: startOfMonth(now), end: endOfMonth(now) } },
            lastMonth: {
                label: "Last month",
                value: {
                    start: startOfMonth(now).subtract({ months: 1 }),
                    end: endOfMonth(now).subtract({ months: 1 }),
                },
            },
            thisYear: { label: "This year", value: { start: startOfMonth(now.set({ month: 1 })), end: endOfMonth(now.set({ month: 12 })) } },
            lastYear: {
                label: "Last year",
                value: {
                    start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                    end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                },
            },
            allTime: {
                label: "All time",
                value: {
                    start: now.set({ year: 2000, month: 1, day: 1 }),
                    end: now,
                },
            },
        }),
    )[0];

    return (
        <AriaDateRangePicker aria-label="Date range picker" shouldCloseOnSelect={false} {...props} value={value} onChange={setValue}>
            <AriaGroup>
                <Button size="md" color="secondary" iconLeading={CalendarIcon}>
                    {!value ? <span className="text-placeholder">Select dates</span> : `${formattedStartDate} – ${formattedEndDate}`}
                </Button>
            </AriaGroup>
            <AriaPopover
                placement="bottom right"
                offset={8}
                className={({ isEntering, isExiting }) =>
                    cx(
                        "origin-(--trigger-anchor-point) will-change-transform",
                        isEntering &&
                            "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                        isExiting &&
                            "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                    )
                }
            >
                <AriaDialog className="flex rounded-2xl bg-primary shadow-xl ring ring-secondary_alt focus:outline-hidden">
                    {({ close }) => (
                        <>
                            <div className="hidden w-38 flex-col gap-0.5 border-r border-solid border-secondary p-3 lg:flex">
                                {Object.values(presets).map((preset) => (
                                    <RangePresetButton
                                        key={preset.label}
                                        value={preset.value}
                                        onClick={() => {
                                            setValue(preset.value);
                                            setFocusedValue(preset.value.start);
                                        }}
                                    >
                                        {preset.label}
                                    </RangePresetButton>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <RangeCalendar
                                    focusedValue={focusedValue}
                                    onFocusChange={setFocusedValue}
                                    highlightedDates={highlightedDates}
                                    presets={{
                                        lastWeek: presets.lastWeek,
                                        lastMonth: presets.lastMonth,
                                        lastYear: presets.lastYear,
                                    }}
                                />
                                <div className="flex justify-between gap-3 border-t border-secondary p-4">
                                    <div className="hidden items-center gap-3 md:flex">
                                        <DateInput slot="start" className="w-36" />
                                        <div className="text-md text-quaternary">–</div>
                                        <DateInput slot="end" className="w-36" />
                                    </div>
                                    <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto">
                                        <Button
                                            size="md"
                                            color="secondary"
                                            onClick={() => {
                                                onCancel?.();
                                                close();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="md"
                                            color="primary"
                                            onClick={() => {
                                                onApply?.();
                                                close();
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDateRangePicker>
    );
};
