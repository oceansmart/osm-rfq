"use client";

import { type ComponentType, type HTMLAttributes, type ReactNode, type Ref, createContext, useContext } from "react";
import { useControlledState } from "@react-stately/utils";
import { HelpCircle, InfoCircle } from "@untitledui/icons";
import type {
    InputProps as AriaInputProps,
    LabelProps as AriaLabelProps,
    TextFieldProps as AriaTextFieldProps,
    TextProps as AriaTextProps,
} from "react-aria-components";
import { Group as AriaGroup, Input as AriaInput, Label as AriaLabel, TextField as AriaTextField, Text as AriaText } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/commons/components/tooltip";
import { AmexIcon, DiscoverIcon, MastercardIcon, UnionPayIcon, VisaIcon } from "@/commons/components/icons";
import { cx, sortCx } from "@/commons/utils/cx";

// ============================================================================
// HintText Component
// ============================================================================

interface HintTextProps extends AriaTextProps {
    /** Indicates that the hint text is an error message. */
    isInvalid?: boolean;
    ref?: Ref<HTMLElement>;
    children: ReactNode;
}

export const HintText = ({ isInvalid, className, ...props }: HintTextProps) => {
    return (
        <AriaText
            {...props}
            slot={isInvalid ? "errorMessage" : "description"}
            className={cx(
                "text-sm text-tertiary",

                // Invalid state
                isInvalid && "text-error-primary",
                "group-invalid:text-error-primary",

                className,
            )}
        />
    );
};

HintText.displayName = "HintText";

// ============================================================================
// Label Component
// ============================================================================

interface LabelProps extends AriaLabelProps {
    children: ReactNode;
    isRequired?: boolean;
    tooltip?: string;
    tooltipDescription?: string;
    ref?: Ref<HTMLLabelElement>;
}

export const Label = ({ isRequired, tooltip, tooltipDescription, className, ...props }: LabelProps) => {
    return (
        <AriaLabel
            // Used for conditionally hiding/showing the label element via CSS:
            // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
            // or
            // <Input label="Visible only on mobile" className="lg:label:hidden" />
            data-label="true"
            {...props}
            className={cx("flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary", className)}
        >
            {props.children}

            <span className={cx("hidden text-brand-tertiary", isRequired && "block", typeof isRequired === "undefined" && "group-required:block")}>*</span>

            {tooltip && (
                <Tooltip title={tooltip} description={tooltipDescription} placement="top">
                    <TooltipTrigger
                        // `TooltipTrigger` inherits the disabled state from the parent form field
                        // but we don't that. We want the tooltip be enabled even if the parent
                        // field is disabled.
                        isDisabled={false}
                        className="cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover"
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}
        </AriaLabel>
    );
};

Label.displayName = "Label";

// ============================================================================
// TextField Context & Component
// ============================================================================

interface BaseProps {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
}

interface TextFieldProps
    extends BaseProps,
        AriaTextFieldProps,
        Pick<InputBaseProps, "size" | "wrapperClassName" | "inputClassName" | "iconClassName" | "tooltipClassName"> {
    ref?: Ref<HTMLDivElement>;
}

const TextFieldContext = createContext<TextFieldProps>({});

export const TextField = ({ className, ...props }: TextFieldProps) => {
    return (
        <TextFieldContext.Provider value={props}>
            <AriaTextField
                {...props}
                data-input-wrapper
                className={(state) =>
                    cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
                }
            />
        </TextFieldContext.Provider>
    );
};

TextField.displayName = "TextField";

// ============================================================================
// InputBase Component
// ============================================================================

export interface InputBaseProps extends TextFieldProps {
    /** Tooltip message on hover. */
    tooltip?: string;
    /**
     * Input size.
     * @default "sm"
     */
    size?: "sm" | "md";
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the icon. */
    iconClassName?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    /** Class name for the tooltip. */
    tooltipClassName?: string;
    /** Keyboard shortcut to display. */
    shortcut?: string | boolean;
    ref?: Ref<HTMLInputElement>;
    groupRef?: Ref<HTMLDivElement>;
    /** Icon component to display on the left side of the input. */
    icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
}

export const InputBase = ({
    ref,
    tooltip,
    shortcut,
    groupRef,
    size = "sm",
    isInvalid,
    isDisabled,
    icon: Icon,
    placeholder,
    wrapperClassName,
    tooltipClassName,
    inputClassName,
    iconClassName,
    // Omit this prop to avoid invalid HTML attribute warning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isRequired: _isRequired,
    ...inputProps
}: Omit<InputBaseProps, "label" | "hint">) => {
    // Check if the input has a leading icon or tooltip
    const hasTrailingIcon = tooltip || isInvalid;
    const hasLeadingIcon = Icon;

    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = useContext(TextFieldContext);

    const inputSize = context?.size || size;

    const sizes = sortCx({
        sm: {
            root: cx("px-3 py-2", hasTrailingIcon && "pr-9", hasLeadingIcon && "pl-10"),
            iconLeading: "left-3",
            iconTrailing: "right-3",
            shortcut: "pr-2.5",
        },
        md: {
            root: cx("px-3.5 py-2.5", hasTrailingIcon && "pr-9.5", hasLeadingIcon && "pl-10.5"),
            iconLeading: "left-3.5",
            iconTrailing: "right-3.5",
            shortcut: "pr-3",
        },
    });

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset",

                    isFocusWithin && !isDisabled && "ring-2 ring-brand",

                    // Disabled state styles
                    isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                    "group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled",

                    // Invalid state styles
                    isInvalid && "ring-error_subtle",
                    "group-invalid:ring-error_subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "ring-2 ring-error",
                    isFocusWithin && "group-invalid:ring-2 group-invalid:ring-error",

                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {/* Leading icon and Payment icon */}
            {Icon && (
                <Icon
                    className={cx(
                        "pointer-events-none absolute size-5 text-fg-quaternary",
                        isDisabled && "text-fg-disabled",
                        sizes[inputSize].iconLeading,
                        context?.iconClassName,
                        iconClassName,
                    )}
                />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full bg-transparent text-md text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary",
                    isDisabled && "cursor-not-allowed text-disabled",
                    sizes[inputSize].root,
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {/* Tooltip and help icon */}
            {tooltip && !isInvalid && (
                <Tooltip title={tooltip} placement="top">
                    <TooltipTrigger
                        className={cx(
                            "absolute cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover",
                            sizes[inputSize].iconTrailing,
                            context?.tooltipClassName,
                            tooltipClassName,
                        )}
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}

            {/* Invalid icon */}
            {isInvalid && (
                <InfoCircle
                    className={cx(
                        "pointer-events-none absolute size-4 text-fg-error-secondary",
                        sizes[inputSize].iconTrailing,
                        context?.tooltipClassName,
                        tooltipClassName,
                    )}
                />
            )}

            {/* Shortcut */}
            {shortcut && (
                <div
                    className={cx(
                        "pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8",
                        sizes[inputSize].shortcut,
                    )}
                >
                    <span
                        className={cx(
                            "pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset",
                            isDisabled && "bg-transparent text-disabled",
                        )}
                        aria-hidden="true"
                    >
                        {typeof shortcut === "string" ? shortcut : "⌘K"}
                    </span>
                </div>
            )}
        </AriaGroup>
    );
};

InputBase.displayName = "InputBase";

// ============================================================================
// Input Component
// ============================================================================

interface InputProps extends InputBaseProps, BaseProps {
    /** Whether to hide required indicator from label */
    hideRequiredIndicator?: boolean;
}

export const Input = ({
    size = "sm",
    placeholder,
    icon: Icon,
    label,
    hint,
    shortcut,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    tooltip,
    iconClassName,
    inputClassName,
    wrapperClassName,
    tooltipClassName,
    ...props
}: InputProps) => {
    return (
        <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {({ isRequired, isInvalid }) => (
                <>
                    {label && <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}>{label}</Label>}

                    <InputBase
                        {...{
                            ref,
                            groupRef,
                            size,
                            placeholder,
                            icon: Icon,
                            shortcut,
                            iconClassName,
                            inputClassName,
                            wrapperClassName,
                            tooltipClassName,
                            tooltip,
                        }}
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

Input.displayName = "Input";

// ============================================================================
// InputGroup Component
// ============================================================================

interface InputPrefixProps extends HTMLAttributes<HTMLDivElement> {
    /** The position of the prefix. */
    position?: "leading" | "trailing";
    /** The size of the prefix. */
    size?: "sm" | "md";
    /** Indicates that the prefix is disabled. */
    isDisabled?: boolean;
}

export const InputPrefix = ({ isDisabled, children, ...props }: InputPrefixProps) => (
    <span
        {...props}
        className={cx(
            "flex text-md text-tertiary shadow-xs ring-1 ring-border-primary ring-inset",
            // Styles when the prefix is within an `InputGroup`
            "in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-l-lg",
            "in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-r-lg",
            // Size styles based on size when within an `InputGroup`
            "in-data-input-wrapper:in-data-[input-size=md]:py-2.5 in-data-input-wrapper:in-data-[input-size=md]:pr-3 in-data-input-wrapper:in-data-[input-size=md]:pl-3.5 in-data-input-wrapper:in-data-[input-size=sm]:px-3 in-data-input-wrapper:in-data-[input-size=sm]:py-2",
            // Disabled styles
            isDisabled && "border-disabled bg-disabled_subtle text-tertiary",
            "in-data-input-wrapper:group-disabled:bg-disabled_subtle in-data-input-wrapper:group-disabled:text-disabled in-data-input-wrapper:group-disabled:ring-border-disabled",

            props.className,
        )}
    >
        {children}
    </span>
);

// `${string}ClassName` is used to omit any className prop that ends with a `ClassName` suffix
interface InputGroupProps extends Omit<InputBaseProps, "type" | "icon" | "placeholder" | "tooltip" | "shortcut" | `${string}ClassName`> {
    /** A prefix text that is displayed in the same box as the input.*/
    prefix?: string;
    /** A leading addon that is displayed with visual separation from the input. */
    leadingAddon?: ReactNode;
    /** A trailing addon that is displayed with visual separation from the input. */
    trailingAddon?: ReactNode;
    /** The class name to apply to the input group. */
    className?: string;
    /** The children of the input group (i.e `<InputBase />`) */
    children: ReactNode;
}

export const InputGroup = ({ size = "sm", prefix, leadingAddon, trailingAddon, label, hint, children, ...props }: InputGroupProps) => {
    const hasLeading = !!leadingAddon;
    const hasTrailing = !!trailingAddon;

    const paddings = sortCx({
        sm: {
            input: cx(
                // Apply padding styles when select element is passed as a child
                hasLeading && "group-has-[&>select]:px-2.5 group-has-[&>select]:pl-2.5",
                hasTrailing && (prefix ? "group-has-[&>select]:pr-6 group-has-[&>select]:pl-0" : "group-has-[&>select]:pr-6 group-has-[&>select]:pl-3"),
            ),
            leadingText: "pl-3",
        },
        md: {
            input: cx(
                // Apply padding styles when select element is passed as a child
                hasLeading && "group-has-[&>select]:px-3 group-has-[&>select]:pl-3",
                hasTrailing && (prefix ? "group-has-[&>select]:pr-6 group-has-[&>select]:pl-0" : "group-has-[&>select]:pr-6 group-has-[&>select]:pl-3"),
            ),
            leadingText: "pl-3.5",
        },
    });

    return (
        <TextField
            size={size}
            aria-label={label || undefined}
            inputClassName={cx(paddings[size].input)}
            tooltipClassName={cx(hasTrailing && !hasLeading && "group-has-[&>select]:right-0")}
            wrapperClassName={cx(
                "z-10",
                // Apply styles based on the presence of leading or trailing elements
                hasLeading && "rounded-l-none",
                hasTrailing && "rounded-r-none",
                // When select element is passed as a child
                "group-has-[&>select]:bg-transparent group-has-[&>select]:shadow-none group-has-[&>select]:ring-0 group-has-[&>select]:focus-within:ring-0",
                // In `Input` component, there is "group-disabled" class so here we need to use "group-disabled:group-has-[&>select]" to avoid conflict
                "group-disabled:group-has-[&>select]:bg-transparent",
            )}
            {...props}
        >
            {({ isDisabled, isInvalid, isRequired }) => (
                <>
                    {label && <Label isRequired={isRequired}>{label}</Label>}

                    <div
                        data-input-size={size}
                        className={cx(
                            "group relative flex h-max w-full flex-row justify-center rounded-lg bg-primary transition-all duration-100 ease-linear",

                            // Only apply focus ring when child is select and input is focused
                            "has-[&>select]:shadow-xs has-[&>select]:ring-1 has-[&>select]:ring-border-primary has-[&>select]:ring-inset has-[&>select]:has-[input:focus]:ring-2 has-[&>select]:has-[input:focus]:ring-border-brand",

                            isDisabled && "cursor-not-allowed has-[&>select]:bg-disabled_subtle has-[&>select]:ring-border-disabled",
                            isInvalid && "has-[&>select]:ring-border-error_subtle has-[&>select]:has-[input:focus]:ring-border-error",
                        )}
                    >
                        {leadingAddon && <section data-leading={hasLeading || undefined}>{leadingAddon}</section>}

                        {prefix && (
                            <span className={cx("my-auto grow pr-2", paddings[size].leadingText)}>
                                <p className={cx("text-md text-tertiary", isDisabled && "text-disabled")}>{prefix}</p>
                            </span>
                        )}

                        {children}

                        {trailingAddon && <section data-trailing={hasTrailing || undefined}>{trailingAddon}</section>}
                    </div>

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

InputGroup.Prefix = InputPrefix;

InputGroup.displayName = "InputGroup";

// ============================================================================
// PaymentInput Component
// ============================================================================

const cardTypes = [
    {
        name: "Visa",
        pattern: /^4[0-9]{3,}$/, // Visa card numbers start with 4 and are 13 or 16 digits long
        card: "visa",
        icon: VisaIcon,
    },
    {
        name: "MasterCard",
        pattern: /^5[1-5][0-9]{2,}$/, // MasterCard numbers start with 51-55 and are 16 digits long
        card: "mastercard",
        icon: MastercardIcon,
    },
    {
        name: "American Express",
        pattern: /^3[47][0-9]{2,}$/, // American Express numbers start with 34 or 37 and are 15 digits long
        card: "amex",
        icon: AmexIcon,
    },
    {
        name: "Discover",
        pattern: /^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/, // Discover card numbers start with 6011 or 65 and are 16 digits long
        card: "discover",
        icon: DiscoverIcon,
    },
    {
        name: "UnionPay",
        pattern: /^(62|88)[0-9]{14,17}$/, // UnionPay card numbers start with 62 or 88 and are between 15-19 digits long
        card: "unionpay",
        icon: UnionPayIcon,
    },
    {
        name: "Unknown",
        pattern: /.*/, // Fallback pattern for unknown cards
        card: "unknown",
        icon: MastercardIcon,
    },
];

/**
 * Detect the card type based on the card number.
 * @param number The card number to detect the type for.
 * @returns The matching card type object.
 */
const detectCardType = (number: string) => {
    // Remove all spaces
    const sanitizedNumber = number.replace(/\D/g, "");

    // Find the matching card type
    const card = cardTypes.find((cardType) => cardType.pattern.test(sanitizedNumber));

    return card || cardTypes[cardTypes.length - 1];
};

/**
 * Format the card number in groups of 4 digits (i.e. 1234 5678 9012 3456).
 */
export const formatCardNumber = (number: string) => {
    // Remove non-numeric characters
    const cleaned = number.replace(/\D/g, "");

    // Format the card number in groups of 4 digits
    const match = cleaned.match(/\d{1,4}/g);

    if (match) {
        return match.join(" ");
    }

    return cleaned;
};

interface PaymentInputProps extends Omit<InputBaseProps, "icon"> {
    /** Maximum length of the card number input */
    maxLength?: number;
    /** Change handler for card number */
    onChange?: (value: string) => void;
    /** Controlled value */
    value?: string;
    /** Default value for uncontrolled mode */
    defaultValue?: string;
}

export const PaymentInput = ({ onChange, value, defaultValue, className, maxLength = 19, label, hint, ...props }: PaymentInputProps) => {
    const [cardNumber, setCardNumber] = useControlledState(value, defaultValue || "", (value) => {
        // Remove all non-numeric characters
        value = value.replace(/\D/g, "");

        onChange?.(value || "");
    });

    const card = detectCardType(cardNumber);

    return (
        <TextField
            aria-label={!label ? props?.placeholder : undefined}
            {...props}
            className={className}
            inputMode="numeric"
            maxLength={maxLength}
            value={formatCardNumber(cardNumber)}
            onChange={setCardNumber}
        >
            {({ isDisabled, isInvalid, isRequired }) => (
                <>
                    {label && <Label isRequired={isRequired}>{label}</Label>}

                    <InputBase
                        {...props}
                        isDisabled={isDisabled}
                        isInvalid={isInvalid}
                        icon={card.icon}
                        inputClassName="pl-13"
                        iconClassName="left-2.5 h-6 w-8.5"
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

PaymentInput.displayName = "PaymentInput";
