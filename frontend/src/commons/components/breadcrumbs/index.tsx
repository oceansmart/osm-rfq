"use client";

import React, { type ReactNode, type HTMLAttributes, type FC, createContext, useState, useContext, isValidElement } from "react";
import { ChevronRight, SlashDivider } from "@untitledui/icons";
import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
  type BreadcrumbProps as AriaBreadcrumbProps,
  Link as AriaLink
} from "react-aria-components";
import { cx } from "@/commons/utils/cx";
import { isReactComponent } from "@/commons/utils/is-react-component";

// ============================================================================
// Types
// ============================================================================

export type BreadcrumbType = "text" | "text-line" | "button";

// ============================================================================
// Context
// ============================================================================

export const BreadcrumbsContext = createContext<{ divider: "chevron" | "slash"; type: BreadcrumbType }>({
    divider: "chevron",
    type: "text",
});

// ============================================================================
// BreadcrumbBase Component (Internal)
// ============================================================================

const baseStyles = {
    text: {
        root: "",
        icon: "text-fg-quaternary group-hover:text-fg-quaternary_hover",
        label: "text-quaternary group-hover:text-tertiary_hover",
        current: { root: "", icon: "text-fg-brand-primary group-hover:text-fg-brand-primary", label: "text-brand-secondary group-hover:text-brand-secondary" },
    },
    button: {
        root: "p-1 hover:bg-primary_hover",
        icon: "text-fg-quaternary group-hover:text-fg-quaternary_hover",
        label: "px-1 text-quaternary group-hover:text-tertiary_hover",
        current: { root: "bg-primary_hover", icon: "text-fg-quaternary_hover", label: "text-fg-tertiary_hover" },
    },
};

interface BreadcrumbItemBaseProps extends HTMLAttributes<Element> {
    href?: string;
    icon?: FC<{ className?: string }> | ReactNode;
    type?: "text" | "button";
    current?: boolean;
    children?: ReactNode;
}

const BreadcrumbBase = ({ href, children, icon: Icon, type = "text", current, className, ...otherProps }: BreadcrumbItemBaseProps) => {
    const Wrapper = href ? AriaLink : "button";

    return (
        <Wrapper
            {...otherProps}
            href={href}
            className={cx(
                "group inline-flex cursor-pointer items-center justify-center gap-1 rounded-md outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 in-current:max-w-full",
                baseStyles[type].root,
                current && baseStyles[type].current.root,
                !href && !otherProps.onClick && "cursor-default",
                className,
            )}
        >
            {isReactComponent(Icon) && (
                <Icon className={cx("size-5 transition-inherit-all", baseStyles[type].icon, current && baseStyles[type].current.icon)} />
            )}
            {isValidElement(Icon) && Icon}

            {children && (
                <span
                    className={cx(
                        "text-sm font-semibold whitespace-nowrap transition-inherit-all in-current:truncate",
                        baseStyles[type].label,
                        current && baseStyles[type].current.label,
                    )}
                >
                    {children}
                </span>
            )}
        </Wrapper>
    );
};

// ============================================================================
// BreadcrumbItem Component
// ============================================================================

interface BreadcrumbItemProps extends AriaBreadcrumbProps {
    href?: string;
    divider?: "chevron" | "slash";
    type?: BreadcrumbType;
    isEllipsis?: boolean;
    children?: ReactNode;
    icon?: FC<{ className?: string }> | ReactNode;
    onClick?: () => void;
}

export const BreadcrumbItem = ({ href, icon, divider, type, isEllipsis, children, onClick, ...otherProps }: BreadcrumbItemProps) => {
    const context = useContext(BreadcrumbsContext);

    type = context.type || "text";
    divider = context.divider || "chevron";

    return (
        <AriaBreadcrumb
            {...otherProps}
            className={cx("flex items-center current:overflow-hidden", type === "text" || type === "text-line" ? "gap-1.5 md:gap-2" : "gap-0.5 md:gap-1")}
        >
            {({ isCurrent }) => (
                <>
                    {isEllipsis ? (
                        <BreadcrumbBase
                            // The label for screen readers.
                            aria-label="See all breadcrumb items"
                            type={type === "text-line" ? "text" : type}
                            onClick={onClick}
                        >
                            ...
                        </BreadcrumbBase>
                    ) : (
                        <BreadcrumbBase href={href} icon={icon} current={isCurrent} type={type === "text-line" ? "text" : type} onClick={onClick}>
                            {children}
                        </BreadcrumbBase>
                    )}

                    {/* Divider */}
                    {!isCurrent && (
                        <div className="shrink-0 text-fg-quaternary">
                            {divider === "slash" ? <SlashDivider className="size-5" /> : <ChevronRight className="size-4" />}
                        </div>
                    )}
                </>
            )}
        </AriaBreadcrumb>
    );
};

// ============================================================================
// Breadcrumbs Component
// ============================================================================

interface BreadcrumbsProps {
    divider?: "chevron" | "slash";
    children: ReactNode;
    type?: BreadcrumbType;
    className?: string;
    /**
     * The maximum number of visible items. If the number of items
     * exceeds this value, the breadcrumbs will collapse into a single
     * item with an ellipsis that can be expanded.
     */
    maxVisibleItems?: number;
}

const styles = {
    text: "gap-1.5 md:gap-2",
    "text-line": "pl-2 gap-1.5 md:gap-2 py-2 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-t after:border-secondary",
    button: "gap-0.5 md:gap-1",
};

const Breadcrumbs = ({ children, divider = "chevron", type = "text", className, maxVisibleItems = 4 }: BreadcrumbsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const visibleItems = (() => {
        const childrenArray = React.Children.toArray(children);

        if (!maxVisibleItems || childrenArray.length <= maxVisibleItems || isExpanded) {
            return childrenArray;
        }

        const firstItems = childrenArray.slice(0, Math.ceil(maxVisibleItems / 2));
        const lastItems = childrenArray.slice(-Math.floor((maxVisibleItems - 1) / 2));
        const ellipsisItem = <BreadcrumbItem isEllipsis divider={divider} type={type} onClick={() => setIsExpanded(true)} key="ellipsis" />;

        return [...firstItems, ellipsisItem, ...lastItems];
    })();

    return (
        <nav aria-label="Breadcrumbs" className={cx("min-w-0", className)}>
            <BreadcrumbsContext.Provider value={{ divider, type }}>
                <AriaBreadcrumbs className={cx("relative flex", styles[type])}>{visibleItems}</AriaBreadcrumbs>
            </BreadcrumbsContext.Provider>
        </nav>
    );
};

Breadcrumbs.Item = BreadcrumbItem;

export { Breadcrumbs };
