"use client";

import type { RefAttributes } from "react";
import { XClose } from "@untitledui/icons";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  Tag as AriaTag,
  type TagProps as AriaTagProps,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList as AriaTagList,
  type TagListProps as AriaTagListProps,
  Label,
  Text,
} from "react-aria-components";
import { cx } from "@/commons/utils/cx";

// ============ TagCloseX Component ============

interface TagCloseXProps extends AriaButtonProps, RefAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const closeXStyles = {
  sm: { root: "p-0.5", icon: "size-2.5" },
  md: { root: "p-0.5", icon: "size-3" },
  lg: { root: "p-0.75", icon: "size-3.5" },
};

export const TagCloseX = ({ size = "md", className, ...otherProps }: TagCloseXProps) => {
  return (
    <AriaButton
      slot="remove"
      aria-label="Remove this tag"
      className={cx(
        "flex cursor-pointer rounded-[3px] text-fg-quaternary outline-transparent transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed",
        closeXStyles[size].root,
        className,
      )}
      {...otherProps}
    >
      <XClose className={cx("transition-inherit-all", closeXStyles[size].icon)} strokeWidth="3" />
    </AriaButton>
  );
};

// ============ Tag Component ============

interface TagProps extends AriaTagProps, RefAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "outlined-plain" | "subtle" | "plain";
  color?: "brand" | "gray" | "success" | "warning" | "error";
  showRemoveButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

const tagStyles = {
  size: {
    sm: "gap-1 px-2 py-0.5 text-xs font-medium leading-[18px]",
    md: "gap-1.5 px-2.5 py-1 text-sm font-medium leading-5",
    lg: "gap-1.5 px-3 py-1.5 text-sm font-semibold leading-5",
  },
  variant: {
    outlined: {
      brand: "border border-utility-brand-500 bg-utility-brand-50 text-utility-brand-700",
      gray: "border border-utility-gray-300 bg-white text-utility-gray-700",
      success: "border border-utility-success-500 bg-utility-success-50 text-utility-success-700",
      warning: "border border-utility-warning-500 bg-utility-warning-50 text-utility-warning-700",
      error: "border border-utility-error-500 bg-utility-error-50 text-utility-error-700",
    },
    "outlined-plain": {
      brand: "border border-utility-brand-300 bg-white text-utility-brand-700",
      gray: "border border-utility-gray-300 bg-white text-utility-gray-700",
      success: "border border-utility-success-300 bg-white text-utility-success-700",
      warning: "border border-utility-warning-300 bg-white text-utility-warning-700",
      error: "border border-utility-error-300 bg-white text-utility-error-700",
    },
    subtle: {
      brand: "bg-utility-brand-50 text-utility-brand-700",
      gray: "bg-utility-gray-100 text-utility-gray-700",
      success: "bg-utility-success-50 text-utility-success-700",
      warning: "bg-utility-warning-50 text-utility-warning-700",
      error: "bg-utility-error-50 text-utility-error-700",
    },
    plain: {
      brand: "text-utility-brand-700",
      gray: "text-utility-gray-700",
      success: "text-utility-success-700",
      warning: "text-utility-warning-700",
      error: "text-utility-error-700",
    },
  },
};

export const Tag = ({
  size = "md",
  variant = "outlined",
  color = "gray",
  showRemoveButton = false,
  className,
  children,
  ...otherProps
}: TagProps) => {
  return (
    <AriaTag
      className={cx(
        "flex items-center justify-center rounded-md",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        tagStyles.size[size],
        tagStyles.variant[variant][color],
        className,
      )}
      {...otherProps}
    >
      {({ allowsRemoving }) => (
        <>
          <span className="flex-1">{children}</span>
          {(allowsRemoving || showRemoveButton) && <TagCloseX size={size} />}
        </>
      )}
    </AriaTag>
  );
};

// ============ TagList Component ============

interface TagListProps<T> extends AriaTagListProps<T> {
  className?: string;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export const TagList = <T extends object>({ className, children, ...otherProps }: TagListProps<T>) => {
  return (
    <AriaTagList className={cx("flex flex-wrap gap-2", className)} {...otherProps}>
      {children}
    </AriaTagList>
  );
};

// ============ TagGroup Component ============

interface TagGroupProps<T> extends Omit<AriaTagGroupProps, "children">, RefAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export const TagGroup = <T extends object>({
  label,
  description,
  errorMessage,
  className,
  children,
  ...otherProps
}: TagGroupProps<T>) => {
  return (
    <AriaTagGroup className={cx("flex flex-col gap-1.5", className)} {...otherProps}>
      {label && (
        <Label className="text-sm font-medium leading-5 text-utility-gray-700">
          {label}
        </Label>
      )}
      {description && (
        <Text slot="description" className="text-sm leading-5 text-utility-gray-600">
          {description}
        </Text>
      )}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm leading-5 text-utility-error-600">
          {errorMessage}
        </Text>
      )}
      {children as React.ReactNode}
    </AriaTagGroup>
  );
};
