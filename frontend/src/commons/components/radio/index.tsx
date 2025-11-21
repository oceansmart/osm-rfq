"use client";

import type { FC, ReactNode } from "react";
import type { RadioGroupProps } from "react-aria-components";
import { Label as AriaLabel, Radio as AriaRadio, RadioGroup as AriaRadioGroup, Text as AriaText } from "react-aria-components";
import { Avatar as AvatarComponent } from "@/commons/components/avatar";
import { BadgeWithDot } from "@/commons/components/badge";
import { Button } from "@/commons/components/button";
import { CheckboxBase } from "@/commons/components/checkbox";
import { FeaturedIcon } from "@/commons/components/featured-icon";
import { cx } from "@/commons/utils/cx";

// ============================================================================
// Type Definitions
// ============================================================================

type RadioGroupItemType = {
    value: string;
    title: string;
    disabled?: boolean;
    description: string;
    secondaryTitle: string;
    icon: FC<{ className?: string }>;
};

interface AvatarItemType {
    id: string;
    name: string;
    username: string;
    title: string;
    avatarUrl: string;
    disabled?: boolean;
}

type IconCardItemType = {
    value: string;
    title: string;
    description: string;
    secondaryTitle?: string;
    disabled?: boolean;
    price?: string;
    badge?: ReactNode;
    icon: FC<{ className?: string }>;
};

interface PaymentCardItemType {
    value: string;
    title: string;
    description: string;
    logo: ReactNode;
    disabled?: boolean;
}

// ============================================================================
// RadioGroupRadioButton Component
// ============================================================================

interface RadioGroupRadioButtonProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: RadioGroupItemType[];
}

export const RadioGroupRadioButton = ({ items, size = "sm", className, ...props }: RadioGroupRadioButtonProps) => {
    return (
        <AriaRadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((plan) => (
                <AriaRadio
                    isDisabled={plan.disabled}
                    key={plan.value}
                    value={plan.value}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative flex cursor-pointer rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            size === "md" ? "gap-3" : "gap-2",
                            isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isSelected, isDisabled, isFocusVisible }) => (
                        <>
                            <div
                                className={cx(
                                    "relative mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full ring-inset",
                                    size === "md" ? "size-5" : "size-4",
                                    isSelected ? "bg-brand-solid" : "ring-1 ring-primary",
                                    isDisabled && "bg-disabled_subtle ring-1 ring-disabled",
                                    isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                                )}
                            >
                                <div
                                    className={cx(
                                        "absolute rounded-full bg-fg-white opacity-0",
                                        size === "md" ? "size-2" : "size-1.5",
                                        isSelected ? "opacity-100" : "opacity-0",
                                        isDisabled && "bg-fg-disabled_subtle",
                                    )}
                                />
                            </div>

                            <div className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}>
                                <AriaLabel className={cx("pointer-events-none flex", size === "md" ? "gap-1.5" : "gap-1")}>
                                    <span className={cx("text-sm font-medium text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}>
                                        {plan.title}
                                    </span>
                                    <span className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{plan.secondaryTitle}</span>
                                </AriaLabel>
                                <AriaText slot="description" className={cx("text-sm text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                    {plan.description}
                                </AriaText>
                            </div>
                        </>
                    )}
                </AriaRadio>
            ))}
        </AriaRadioGroup>
    );
};

// ============================================================================
// RadioGroupCheckbox Component
// ============================================================================

interface RadioGroupCheckboxProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: RadioGroupItemType[];
}

export const RadioGroupCheckbox = ({ items, size = "sm", className, ...props }: RadioGroupCheckboxProps) => {
    return (
        <AriaRadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((plan) => (
                <AriaRadio
                    isDisabled={plan.disabled}
                    key={plan.value}
                    value={plan.value}
                    className={({ isDisabled, isFocusVisible, isSelected }) =>
                        cx(
                            "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            size === "md" ? "gap-3" : "gap-2",
                            isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <CheckboxBase
                                size={size === "md" ? "md" : "sm"}
                                isDisabled={isDisabled}
                                isSelected={isSelected}
                                isFocusVisible={isFocusVisible}
                                className="mt-0.5"
                            />

                            <div
                                className={cx(
                                    "flex flex-col",

                                    size === "md" ? "gap-0.5" : "",
                                )}
                            >
                                <AriaLabel className={cx("pointer-events-none flex", size === "md" ? "gap-1.5" : "gap-1")}>
                                    <span className={cx("text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}>{plan.title}</span>
                                    <span className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{plan.secondaryTitle}</span>
                                </AriaLabel>
                                <AriaText slot="description" className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                    {plan.description}
                                </AriaText>
                            </div>
                        </>
                    )}
                </AriaRadio>
            ))}
        </AriaRadioGroup>
    );
};

// ============================================================================
// RadioGroupAvatar Component
// ============================================================================

interface RadioGroupAvatarProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: AvatarItemType[];
}

export const RadioGroupAvatar = ({ items, size = "sm", className, ...props }: RadioGroupAvatarProps) => {
    return (
        <AriaRadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((person) => (
                <AriaRadio
                    isDisabled={person.disabled}
                    key={person.id}
                    value={person.id}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <div className={cx("flex flex-1", size === "md" ? "gap-3 md:gap-4" : "gap-3")}>
                                <AvatarComponent alt={person.name} src={person.avatarUrl} size={size === "md" ? "md" : "sm"} />

                                <div className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}>
                                    <AriaLabel className={cx("pointer-events-none flex", size === "md" ? "gap-1.5" : "gap-1")}>
                                        <span className={cx("text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}>
                                            {person.name}
                                        </span>
                                        <span className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{person.username}</span>
                                    </AriaLabel>
                                    <AriaText slot="description" className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                        {person.title}
                                    </AriaText>
                                </div>
                            </div>
                            <CheckboxBase size={size === "md" ? "md" : "sm"} isDisabled={isDisabled} isSelected={isSelected} isFocusVisible={isFocusVisible} />
                        </>
                    )}
                </AriaRadio>
            ))}
        </AriaRadioGroup>
    );
};

// ============================================================================
// RadioGroupIconSimple Component
// ============================================================================

interface RadioGroupIconSimpleProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: RadioGroupItemType[];
}

export const RadioGroupIconSimple = ({ items, size = "sm", className, ...props }: RadioGroupIconSimpleProps) => {
    return (
        <AriaRadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((plan) => (
                <AriaRadio
                    isDisabled={plan.disabled}
                    key={plan.value}
                    value={plan.value}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <div className="flex flex-1 gap-3">
                                <FeaturedIcon
                                    icon={plan.icon}
                                    size={size === "md" ? "md" : "sm"}
                                    color="gray"
                                    theme="modern"
                                    className={cx(isDisabled && "bg-disabled text-fg-disabled")}
                                />

                                <div className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}>
                                    <AriaLabel className={cx("pointer-events-none flex", size === "md" ? "gap-1.5" : "gap-1")}>
                                        <span className={cx("text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}>
                                            {plan.title}
                                        </span>
                                        <span className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{plan.secondaryTitle}</span>
                                    </AriaLabel>
                                    <AriaText slot="description" className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                        {plan.description}
                                    </AriaText>
                                </div>
                            </div>

                            <CheckboxBase size={size === "md" ? "md" : "sm"} isDisabled={isDisabled} isSelected={isSelected} isFocusVisible={isFocusVisible} />
                        </>
                    )}
                </AriaRadio>
            ))}
        </AriaRadioGroup>
    );
};

// ============================================================================
// RadioGroupIconCard Component
// ============================================================================

interface RadioGroupIconCardProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: IconCardItemType[];
}

export const RadioGroupIconCard = ({ items, size = "sm", className, ...props }: RadioGroupIconCardProps) => {
    return (
        <AriaRadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((plan) => (
                <AriaRadio
                    isDisabled={plan.disabled}
                    key={plan.value}
                    value={plan.value}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative block cursor-pointer rounded-xl bg-primary outline-focus-ring ring-inset",
                            isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                            isSelected && isDisabled && "ring-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <div
                                className={cx(
                                    "flex items-center gap-3 rounded-t-xl p-3 pr-5 ring-inset",
                                    isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                                    isDisabled && "ring-disabled",
                                    isSelected && isDisabled && "ring-disabled_subtle",
                                    isFocusVisible && "outline-hidden",
                                )}
                            >
                                <FeaturedIcon
                                    size={size === "md" ? "md" : "sm"}
                                    icon={plan.icon}
                                    color="gray"
                                    theme="modern"
                                    className={cx(isDisabled && "bg-disabled text-fg-disabled")}
                                />

                                <span className={cx("mr-1 text-secondary", size === "md" ? "text-lg font-semibold" : "text-md font-semibold")}>
                                    {plan.title}
                                </span>

                                <CheckboxBase
                                    size={size === "md" ? "md" : "sm"}
                                    className="ml-auto"
                                    isDisabled={isDisabled}
                                    isSelected={isSelected}
                                    isFocusVisible={isFocusVisible}
                                />
                            </div>

                            <div className="flex flex-col-reverse items-start justify-between gap-4 rounded-b-lg p-4 sm:flex-row sm:gap-1">
                                <div className={cx("flex flex-col", size === "md" ? "gap-2" : "gap-1")}>
                                    <p className="flex items-baseline gap-1">
                                        <span
                                            className={cx("text-secondary", size === "md" ? "text-display-md font-semibold" : "text-display-sm font-semibold")}
                                        >
                                            {plan.price}
                                        </span>
                                        <span className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{plan.secondaryTitle}</span>
                                    </p>
                                    <p className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{plan.description}</p>
                                </div>
                                {plan.badge && (
                                    <BadgeWithDot size="sm" type="modern" color="success">
                                        {plan.badge}
                                    </BadgeWithDot>
                                )}
                            </div>
                        </>
                    )}
                </AriaRadio>
            ))}
        </AriaRadioGroup>
    );
};

// ============================================================================
// RadioGroupPaymentIcon Component
// ============================================================================

interface RadioGroupPaymentIconProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: PaymentCardItemType[];
}

export const RadioGroupPaymentIcon = ({ items, size = "sm", className, ...props }: RadioGroupPaymentIconProps) => {
    return (
        <AriaRadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((card) => (
                <AriaRadio
                    isDisabled={card.disabled}
                    key={card.value}
                    value={card.value}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            isSelected ? "ring-2 ring-brand" : "ring-1 ring-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <div className={cx("flex flex-1", size === "md" ? "gap-3 md:gap-4" : "gap-3")}>
                                <span className="shrink-0">{card.logo}</span>
                                <div>
                                    <div className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}>
                                        <AriaLabel
                                            className={cx("pointer-events-none text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}
                                        >
                                            {card.title}
                                        </AriaLabel>
                                        <AriaText slot="description" className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                            {card.description}
                                        </AriaText>
                                    </div>
                                    <div className={cx("flex gap-3", size === "md" ? "mt-3" : "mt-2")}>
                                        <Button color="link-gray" size={size === "md" ? "md" : "sm"} isDisabled={isDisabled}>
                                            Set as default
                                        </Button>
                                        <Button color="link-color" size={size === "md" ? "md" : "sm"} isDisabled={isDisabled}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <CheckboxBase size={size === "md" ? "md" : "sm"} isDisabled={isDisabled} isSelected={isSelected} isFocusVisible={isFocusVisible} />
                        </>
                    )}
                </AriaRadio>
            ))}
        </AriaRadioGroup>
    );
};

// ============================================================================
// RadioGroup Exports
// ============================================================================

export const RadioGroup = {
    RadioButton: RadioGroupRadioButton,
    Checkbox: RadioGroupCheckbox,
    Avatar: RadioGroupAvatar,
    IconSimple: RadioGroupIconSimple,
    IconCard: RadioGroupIconCard,
    PaymentIcon: RadioGroupPaymentIcon,
};
