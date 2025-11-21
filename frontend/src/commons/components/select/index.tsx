"use client";

import type { FC, FocusEventHandler, PointerEventHandler, ReactNode, Ref, RefAttributes, RefObject } from "react";
import { createContext, isValidElement, useCallback, useContext, useRef, useState } from "react";
import { Check, ChevronDown, SearchLg as SearchIcon } from "@untitledui/icons";
import type {
    ComboBoxProps as AriaComboBoxProps,
    GroupProps as AriaGroupProps,
    ListBoxItemProps as AriaListBoxItemProps,
    ListBoxProps as AriaListBoxProps,
    PopoverProps as AriaPopoverProps,
    SelectProps as AriaSelectProps,
} from "react-aria-components";
import {
    Button as AriaButton,
    ComboBox as AriaComboBox,
    ComboBoxStateContext,
    Group as AriaGroup,
    Input as AriaInput,
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    Popover as AriaPopover,
    Select as AriaSelect,
    SelectValue as AriaSelectValue,
    Text as AriaText,
} from "react-aria-components";
import { Avatar } from "@/commons/components/avatar";
import { HintText } from "@/commons/components/input";
import { Label } from "@/commons/components/input";
import { cx } from "@/commons/utils/cx";
import { isReactComponent } from "@/commons/utils/is-react-component";
import { useResizeObserver } from "./use-resize-observer";

// ============================================================================
// Types and Constants
// ============================================================================

export type SelectItemType = {
    id: string;
    label?: string;
    avatarUrl?: string;
    isDisabled?: boolean;
    supportingText?: string;
    icon?: FC | ReactNode;
};

export interface CommonProps {
    hint?: string;
    label?: string;
    tooltip?: string;
    size?: "sm" | "md";
    placeholder?: string;
}

export const sizes = {
    sm: { root: "py-2 px-3", shortcut: "pr-2.5" },
    md: { root: "py-2.5 px-3.5", shortcut: "pr-3" },
};

const itemSizes = {
    sm: "p-2 pr-2.5",
    md: "p-2.5 pl-2",
};

export const SelectContext = createContext<{ size: "sm" | "md" }>({ size: "sm" });

// ============================================================================
// Popover Component
// ============================================================================

interface PopoverProps extends AriaPopoverProps, RefAttributes<HTMLElement> {
    size: "sm" | "md";
}

export const Popover = (props: PopoverProps) => {
    return (
        <AriaPopover
            placement="bottom"
            containerPadding={0}
            offset={4}
            {...props}
            className={(state) =>
                cx(
                    "max-h-64! w-(--trigger-width) origin-(--trigger-anchor-point) overflow-x-hidden overflow-y-auto rounded-lg bg-primary py-1 shadow-lg ring-1 ring-secondary_alt outline-hidden will-change-transform",

                    state.isEntering &&
                        "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                    state.isExiting &&
                        "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                    props.size === "md" && "max-h-80!",

                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

// ============================================================================
// SelectItem Component
// ============================================================================

interface SelectItemProps extends Omit<AriaListBoxItemProps<SelectItemType>, "id">, SelectItemType {}

export const SelectItem = ({ label, id, value, avatarUrl, supportingText, isDisabled, icon: Icon, className, children, ...props }: SelectItemProps) => {
    const { size } = useContext(SelectContext);

    const labelOrChildren = label || (typeof children === "string" ? children : "");
    const textValue = supportingText ? labelOrChildren + " " + supportingText : labelOrChildren;

    return (
        <AriaListBoxItem
            id={id}
            value={
                value ?? {
                    id,
                    label: labelOrChildren,
                    avatarUrl,
                    supportingText,
                    isDisabled,
                    icon: Icon,
                }
            }
            textValue={textValue}
            isDisabled={isDisabled}
            {...props}
            className={(state) => cx("w-full px-1.5 py-px outline-hidden", typeof className === "function" ? className(state) : className)}
        >
            {(state) => (
                <div
                    className={cx(
                        "flex cursor-pointer items-center gap-2 rounded-md outline-hidden select-none",
                        state.isSelected && "bg-active",
                        state.isDisabled && "cursor-not-allowed",
                        state.isFocused && "bg-primary_hover",
                        state.isFocusVisible && "ring-2 ring-focus-ring ring-inset",

                        // Icon styles
                        "*:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary",
                        state.isDisabled && "*:data-icon:text-fg-disabled",

                        itemSizes[size],
                    )}
                >
                    {avatarUrl ? (
                        <Avatar aria-hidden="true" size="xs" src={avatarUrl} alt={label} />
                    ) : isReactComponent(Icon) ? (
                        <Icon data-icon aria-hidden="true" />
                    ) : isValidElement(Icon) ? (
                        Icon
                    ) : null}

                    <div className="flex w-full min-w-0 flex-1 flex-wrap gap-x-2">
                        <AriaText
                            slot="label"
                            className={cx("truncate text-md font-medium whitespace-nowrap text-primary", state.isDisabled && "text-disabled")}
                        >
                            {label || (typeof children === "function" ? children(state) : children)}
                        </AriaText>

                        {supportingText && (
                            <AriaText slot="description" className={cx("text-md whitespace-nowrap text-tertiary", state.isDisabled && "text-disabled")}>
                                {supportingText}
                            </AriaText>
                        )}
                    </div>

                    {state.isSelected && (
                        <Check
                            aria-hidden="true"
                            className={cx(
                                "ml-auto text-fg-brand-primary",
                                size === "sm" ? "size-4 stroke-[2.5px]" : "size-5",
                                state.isDisabled && "text-fg-disabled",
                            )}
                        />
                    )}
                </div>
            )}
        </AriaListBoxItem>
    );
};

// ============================================================================
// Select Component
// ============================================================================

interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    items?: SelectItemType[];
    popoverClassName?: string;
    placeholderIcon?: FC | ReactNode;
    children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
    isOpen: boolean;
    size: "sm" | "md";
    isFocused: boolean;
    isDisabled: boolean;
    placeholder?: string;
    ref?: Ref<HTMLButtonElement>;
    placeholderIcon?: FC | ReactNode;
}

const SelectValue = ({ isOpen, isFocused, isDisabled, size, placeholder, placeholderIcon, ref }: SelectValueProps) => {
    return (
        <AriaButton
            ref={ref}
            className={cx(
                "relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset",
                (isFocused || isOpen) && "ring-2 ring-brand",
                isDisabled && "cursor-not-allowed bg-disabled_subtle text-disabled",
            )}
        >
            <AriaSelectValue<SelectItemType>
                className={cx(
                    "flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle",

                    // Icon styles
                    "*:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled",

                    sizes[size].root,
                )}
            >
                {(state) => {
                    const Icon = state.selectedItem?.icon || placeholderIcon;
                    return (
                        <>
                            {state.selectedItem?.avatarUrl ? (
                                <Avatar size="xs" src={state.selectedItem.avatarUrl} alt={state.selectedItem.label} />
                            ) : isReactComponent(Icon) ? (
                                <Icon data-icon aria-hidden="true" />
                            ) : isValidElement(Icon) ? (
                                Icon
                            ) : null}

                            {state.selectedItem ? (
                                <section className="flex w-full gap-2 truncate">
                                    <p className="truncate text-md font-medium text-primary">{state.selectedItem?.label}</p>
                                    {state.selectedItem?.supportingText && <p className="text-md text-tertiary">{state.selectedItem?.supportingText}</p>}
                                </section>
                            ) : (
                                <p className={cx("text-md text-placeholder", isDisabled && "text-disabled")}>{placeholder}</p>
                            )}

                            <ChevronDown
                                aria-hidden="true"
                                className={cx("ml-auto shrink-0 text-fg-quaternary", size === "sm" ? "size-4 stroke-[2.5px]" : "size-5")}
                            />
                        </>
                    );
                }}
            </AriaSelectValue>
        </AriaButton>
    );
};

const Select = ({ placeholder = "Select", placeholderIcon, size = "sm", children, items, label, hint, tooltip, className, ...rest }: SelectProps) => {
    return (
        <SelectContext.Provider value={{ size }}>
            <AriaSelect {...rest} className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}>
                {(state) => (
                    <>
                        {label && (
                            <Label isRequired={state.isRequired} tooltip={tooltip}>
                                {label}
                            </Label>
                        )}

                        <SelectValue {...state} {...{ size, placeholder }} placeholderIcon={placeholderIcon} />

                        <Popover size={size} className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {hint && <HintText isInvalid={state.isInvalid}>{hint}</HintText>}
                    </>
                )}
            </AriaSelect>
        </SelectContext.Provider>
    );
};

// ============================================================================
// ComboBox Component
// ============================================================================

interface ComboBoxProps extends Omit<AriaComboBoxProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    shortcut?: boolean;
    items?: SelectItemType[];
    popoverClassName?: string;
    shortcutClassName?: string;
    children: AriaListBoxProps<SelectItemType>["children"];
}

interface ComboBoxValueProps extends Omit<AriaGroupProps, 'ref'> {
    size: "sm" | "md";
    shortcut: boolean;
    placeholder?: string;
    shortcutClassName?: string;
    onFocus?: FocusEventHandler;
    onPointerEnter?: PointerEventHandler;
    ref?: RefObject<HTMLDivElement>;
}

const ComboBoxValue = ({ size, shortcut, placeholder, shortcutClassName, ...otherProps }: ComboBoxValueProps) => {
    const state = useContext(ComboBoxStateContext);

    const value = state?.selectedItem?.value || null;
    const inputValue = state?.inputValue || null;

    const first = inputValue?.split(value?.supportingText)?.[0] || "";
    const last = inputValue?.split(first)[1];

    return (
        <AriaGroup
            {...otherProps}
            className={({ isFocusWithin, isDisabled }) =>
                cx(
                    "relative flex w-full items-center gap-2 rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset",
                    isDisabled && "cursor-not-allowed bg-disabled_subtle",
                    isFocusWithin && "ring-2 ring-brand",
                    sizes[size].root,
                )
            }
        >
            {({ isDisabled }) => (
                <>
                    <SearchIcon className="pointer-events-none size-5 shrink-0 text-fg-quaternary" />

                    <div className="relative flex w-full items-center gap-2">
                        {inputValue && (
                            <span className="absolute top-1/2 z-0 inline-flex w-full -translate-y-1/2 gap-2 truncate" aria-hidden="true">
                                <p className={cx("text-md font-medium text-primary", isDisabled && "text-disabled")}>{first}</p>
                                {last && <p className={cx("-ml-0.75 text-md text-tertiary", isDisabled && "text-disabled")}>{last}</p>}
                            </span>
                        )}

                        <AriaInput
                            placeholder={placeholder}
                            className="z-10 w-full appearance-none bg-transparent text-md text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled"
                        />
                    </div>

                    {shortcut && (
                        <div
                            className={cx(
                                "absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8",
                                isDisabled && "to-bg-disabled_subtle",
                                sizes[size].shortcut,
                                shortcutClassName,
                            )}
                        >
                            <span
                                className={cx(
                                    "pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset",
                                    isDisabled && "bg-transparent text-disabled",
                                )}
                                aria-hidden="true"
                            >
                                ⌘K
                            </span>
                        </div>
                    )}
                </>
            )}
        </AriaGroup>
    );
};

export const ComboBox = ({ placeholder = "Search", shortcut = true, size = "sm", children, items, shortcutClassName, ...otherProps }: ComboBoxProps) => {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [popoverWidth, setPopoverWidth] = useState("");

    // Resize observer for popover width
    const onResize = useCallback(() => {
        if (!placeholderRef.current) return;

        const divRect = placeholderRef.current?.getBoundingClientRect();

        setPopoverWidth(divRect.width + "px");
    }, [placeholderRef, setPopoverWidth]);

    useResizeObserver({
        ref: placeholderRef,
        box: "border-box",
        onResize,
    });

    return (
        <SelectContext.Provider value={{ size }}>
            <AriaComboBox menuTrigger="focus" {...otherProps}>
                {(state) => (
                    <div className="flex flex-col gap-1.5">
                        {otherProps.label && (
                            <Label isRequired={state.isRequired} tooltip={otherProps.tooltip}>
                                {otherProps.label}
                            </Label>
                        )}

                        <ComboBoxValue
                            ref={placeholderRef}
                            placeholder={placeholder}
                            shortcut={shortcut}
                            shortcutClassName={shortcutClassName}
                            size={size}
                            // This is a workaround to correctly calculating the trigger width
                            // while using ResizeObserver wasn't 100% reliable.
                            onFocus={onResize}
                            onPointerEnter={onResize}
                        />

                        <Popover size={size} triggerRef={placeholderRef} style={{ width: popoverWidth }} className={otherProps.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {otherProps.hint && <HintText isInvalid={state.isInvalid}>{otherProps.hint}</HintText>}
                    </div>
                )}
            </AriaComboBox>
        </SelectContext.Provider>
    );
};

// ============================================================================
// Exports
// ============================================================================

const _Select = Select as typeof Select & {
    ComboBox: typeof ComboBox;
    Item: typeof SelectItem;
};
_Select.ComboBox = ComboBox;
_Select.Item = SelectItem;

export { _Select as Select };
