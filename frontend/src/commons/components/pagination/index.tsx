"use client";

import type { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";
import React, { cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/commons/components/button-group";
import { Button } from "@/commons/components/button";
import { useBreakpoint } from "@/commons/hooks/use-breakpoint";
import { cx } from "@/commons/utils/cx";

// ============================================================================
// Types
// ============================================================================

type PaginationPage = {
    /** The type of the pagination item. */
    type: "page";
    /** The value of the pagination item. */
    value: number;
    /** Whether the pagination item is the current page. */
    isCurrent: boolean;
};

type PaginationEllipsisType = {
    type: "ellipsis";
    key: number;
};

type PaginationItemType = PaginationPage | PaginationEllipsisType;

interface PaginationContextType {
    /** The pages of the pagination. */
    pages: PaginationItemType[];
    /** The current page of the pagination. */
    currentPage: number;
    /** The total number of pages. */
    total: number;
    /** The function to call when the page changes. */
    onPageChange: (page: number) => void;
}

export interface PaginationRootProps {
    /** Number of sibling pages to show on each side of the current page */
    siblingCount?: number;
    /** Current active page number */
    page: number;
    /** Total number of pages */
    total: number;
    children: ReactNode;
    /** The style of the pagination root. */
    style?: CSSProperties;
    /** The class name of the pagination root. */
    className?: string;
    /** Callback function that's called when the page changes with the new page number. */
    onPageChange?: (page: number) => void;
}

export interface PaginationItemProps {
    /** The value of the pagination item. */
    value: number;
    /** Whether the pagination item is the current page. */
    isCurrent: boolean;
    /** The children of the pagination item. Can be a render prop or a valid element. */
    children?: ReactNode | ((props: PaginationItemRenderProps) => ReactNode);
    /** The style object of the pagination item. */
    style?: CSSProperties;
    /** The class name of the pagination item. */
    className?: string | ((args: { isSelected: boolean }) => string);
    /** The aria label of the pagination item. */
    ariaLabel?: string;
    /** If true, the child element will be cloned and passed down the prop of the item. */
    asChild?: boolean;
}

interface TriggerRenderProps {
    isDisabled: boolean;
    onClick: () => void;
}

interface TriggerProps {
    /** The children of the trigger. Can be a render prop or a valid element. */
    children: ReactNode | ((props: TriggerRenderProps) => ReactNode);
    /** The style of the trigger. */
    style?: CSSProperties;
    /** The class name of the trigger. */
    className?: string | ((args: { isDisabled: boolean }) => string);
    /** If true, the child element will be cloned and passed down the prop of the trigger. */
    asChild?: boolean;
    /** The direction of the trigger. */
    direction: "prev" | "next";
    /** The aria label of the trigger. */
    ariaLabel?: string;
}

interface PaginationItemRenderProps {
    isSelected: boolean;
    onClick: () => void;
    value: number;
    "aria-current"?: "page";
    "aria-label"?: string;
}

interface PaginationEllipsisProps {
    key: number;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string | (() => string);
}

interface PaginationContextComponentProps {
    children: (pagination: PaginationContextType) => ReactNode;
}

// ============================================================================
// Context
// ============================================================================

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

// ============================================================================
// Utils
// ============================================================================

/**
 * Creates an array of numbers from start to end.
 * @param start - The start number.
 * @param end - The end number.
 * @returns An array of numbers from start to end.
 */
const range = (start: number, end: number): number[] => {
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => index + start);
};

// ============================================================================
// PaginationRoot Component
// ============================================================================

const PaginationRoot = ({ total, siblingCount = 1, page, onPageChange, children, style, className }: PaginationRootProps) => {
    const [pages, setPages] = useState<PaginationItemType[]>([]);

    const createPaginationItems = useCallback((): PaginationItemType[] => {
        const items: PaginationItemType[] = [];
        // Calculate the maximum number of pagination elements (pages, potential ellipsis, first and last) to show
        const totalPageNumbers = siblingCount * 2 + 5;

        // If the total number of items to show is greater than or equal to the total pages,
        // we can simply list all pages without needing to collapse with ellipsis
        if (totalPageNumbers >= total) {
            for (let i = 1; i <= total; i++) {
                items.push({
                    type: "page",
                    value: i,
                    isCurrent: i === page,
                });
            }
        } else {
            // Calculate left and right sibling boundaries around the current page
            const leftSiblingIndex = Math.max(page - siblingCount, 1);
            const rightSiblingIndex = Math.min(page + siblingCount, total);

            // Determine if we need to show ellipsis on either side
            const showLeftEllipsis = leftSiblingIndex > 2;
            const showRightEllipsis = rightSiblingIndex < total - 1;

            // Case 1: No left ellipsis, but right ellipsis is needed
            if (!showLeftEllipsis && showRightEllipsis) {
                // Calculate how many page numbers to show starting from the beginning
                const leftItemCount = siblingCount * 2 + 3;
                const leftRange = range(1, leftItemCount);

                leftRange.forEach((pageNum) =>
                    items.push({
                        type: "page",
                        value: pageNum,
                        isCurrent: pageNum === page,
                    }),
                );

                // Insert ellipsis after the left range and add the last page
                items.push({ type: "ellipsis", key: leftItemCount + 1 });
                items.push({
                    type: "page",
                    value: total,
                    isCurrent: total === page,
                });
            }
            // Case 2: Left ellipsis needed, but right ellipsis is not needed
            else if (showLeftEllipsis && !showRightEllipsis) {
                // Determine how many items from the end should be shown
                const rightItemCount = siblingCount * 2 + 3;
                const rightRange = range(total - rightItemCount + 1, total);

                // Always show the first page, then add an ellipsis to indicate skipped pages
                items.push({
                    type: "page",
                    value: 1,
                    isCurrent: page === 1,
                });
                items.push({ type: "ellipsis", key: total - rightItemCount });
                rightRange.forEach((pageNum) =>
                    items.push({
                        type: "page",
                        value: pageNum,
                        isCurrent: pageNum === page,
                    }),
                );
            }
            // Case 3: Both left and right ellipsis are needed
            else if (showLeftEllipsis && showRightEllipsis) {
                // Always show the first page
                items.push({
                    type: "page",
                    value: 1,
                    isCurrent: page === 1,
                });
                // Insert left ellipsis after the first page
                items.push({ type: "ellipsis", key: leftSiblingIndex - 1 });

                // Show a range of pages around the current page
                const middleRange = range(leftSiblingIndex, rightSiblingIndex);
                middleRange.forEach((pageNum) =>
                    items.push({
                        type: "page",
                        value: pageNum,
                        isCurrent: pageNum === page,
                    }),
                );

                // Insert right ellipsis and finally the last page
                items.push({ type: "ellipsis", key: rightSiblingIndex + 1 });
                items.push({
                    type: "page",
                    value: total,
                    isCurrent: total === page,
                });
            }
        }

        return items;
    }, [total, siblingCount, page]);

    useEffect(() => {
        const paginationItems = createPaginationItems();
        setPages(paginationItems);
    }, [createPaginationItems]);

    const onPageChangeHandler = (newPage: number) => {
        onPageChange?.(newPage);
    };

    const paginationContextValue: PaginationContextType = {
        pages,
        currentPage: page,
        total,
        onPageChange: onPageChangeHandler,
    };

    return (
        <PaginationContext.Provider value={paginationContextValue}>
            <nav aria-label="Pagination Navigation" style={style} className={className}>
                {children}
            </nav>
        </PaginationContext.Provider>
    );
};

// ============================================================================
// Trigger Component
// ============================================================================

const Trigger: FC<TriggerProps> = ({ children, style, className, asChild = false, direction, ariaLabel }) => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("Pagination components must be used within a Pagination.Root");
    }

    const { currentPage, total, onPageChange } = context;

    const isDisabled = direction === "prev" ? currentPage <= 1 : currentPage >= total;

    const handleClick = () => {
        if (isDisabled) return;

        const newPage = direction === "prev" ? currentPage - 1 : currentPage + 1;
        onPageChange?.(newPage);
    };

    const computedClassName = typeof className === "function" ? className({ isDisabled }) : className;

    const defaultAriaLabel = direction === "prev" ? "Previous Page" : "Next Page";

    // If the children is a render prop, we need to pass the isDisabled and onClick to the render prop.
    if (typeof children === "function") {
        return <>{children({ isDisabled, onClick: handleClick })}</>;
    }

    // If the children is a valid element, we need to clone it and pass the isDisabled and onClick to the cloned element.
    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            onClick: handleClick,
            disabled: isDisabled,
            isDisabled,
            "aria-label": ariaLabel || defaultAriaLabel,
            style: { ...(children.props as HTMLAttributes<HTMLElement>).style, ...style },
            className: [computedClassName, (children.props as HTMLAttributes<HTMLElement>).className].filter(Boolean).join(" ") || undefined,
        } as HTMLAttributes<HTMLElement>);
    }

    return (
        <button aria-label={ariaLabel || defaultAriaLabel} onClick={handleClick} disabled={isDisabled} style={style} className={computedClassName}>
            {children}
        </button>
    );
};

const PaginationPrevTrigger: FC<Omit<TriggerProps, "direction">> = (props) => <Trigger {...props} direction="prev" />;

const PaginationNextTrigger: FC<Omit<TriggerProps, "direction">> = (props) => <Trigger {...props} direction="next" />;

// ============================================================================
// PaginationItem Component
// ============================================================================

const PaginationItem = ({ value, isCurrent, children, style, className, ariaLabel, asChild = false }: PaginationItemProps) => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("Pagination components must be used within a <Pagination.Root />");
    }

    const { onPageChange } = context;

    const isSelected = isCurrent;

    const handleClick = () => {
        onPageChange?.(value);
    };

    const computedClassName = typeof className === "function" ? className({ isSelected }) : className;

    // If the children is a render prop, we need to pass the necessary props to the render prop.
    if (typeof children === "function") {
        return (
            <>
                {children({
                    isSelected,
                    onClick: handleClick,
                    value,
                    "aria-current": isCurrent ? "page" : undefined,
                    "aria-label": ariaLabel || `Page ${value}`,
                })}
            </>
        );
    }

    // If the children is a valid element, we need to clone it and pass the necessary props to the cloned element.
    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            onClick: handleClick,
            "aria-current": isCurrent ? "page" : undefined,
            "aria-label": ariaLabel || `Page ${value}`,
            style: { ...(children.props as HTMLAttributes<HTMLElement>).style, ...style },
            className: [computedClassName, (children.props as HTMLAttributes<HTMLElement>).className].filter(Boolean).join(" ") || undefined,
        } as HTMLAttributes<HTMLElement>);
    }

    return (
        <button
            onClick={handleClick}
            style={style}
            className={computedClassName}
            aria-current={isCurrent ? "page" : undefined}
            aria-label={ariaLabel || `Page ${value}`}
            role="listitem"
        >
            {children}
        </button>
    );
};

// ============================================================================
// PaginationEllipsis Component
// ============================================================================

const PaginationEllipsis: FC<PaginationEllipsisProps> = ({ children, style, className }) => {
    const computedClassName = typeof className === "function" ? className() : className;

    return (
        <span style={style} className={computedClassName} aria-hidden="true">
            {children}
        </span>
    );
};

// ============================================================================
// PaginationContext Component
// ============================================================================

const PaginationContextComponent: FC<PaginationContextComponentProps> = ({ children }) => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("Pagination components must be used within a Pagination.Root");
    }

    return <>{children(context)}</>;
};

// ============================================================================
// Base Pagination Export
// ============================================================================

export const Pagination = {
    Root: PaginationRoot,
    PrevTrigger: PaginationPrevTrigger,
    NextTrigger: PaginationNextTrigger,
    Item: PaginationItem,
    Ellipsis: PaginationEllipsis,
    Context: PaginationContextComponent,
};

// ============================================================================
// High-Level Pagination Variants
// ============================================================================

interface PaginationProps extends Partial<Omit<PaginationRootProps, "children">> {
    /** Whether the pagination buttons are rounded. */
    rounded?: boolean;
}

const PaginationItemComponent = ({ value, rounded, isCurrent }: { value: number; rounded?: boolean; isCurrent: boolean }) => {
    return (
        <Pagination.Item
            value={value}
            isCurrent={isCurrent}
            className={({ isSelected }) =>
                cx(
                    "flex size-10 cursor-pointer items-center justify-center p-3 text-sm font-medium text-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-secondary focus-visible:z-10 focus-visible:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                    rounded ? "rounded-full" : "rounded-lg",
                    isSelected && "bg-primary_hover text-secondary",
                )
            }
        >
            {value}
        </Pagination.Item>
    );
};

interface MobilePaginationProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
}

const MobilePagination = ({ page = 1, total = 10, className, onPageChange }: MobilePaginationProps) => {
    return (
        <nav aria-label="Pagination" className={cx("flex items-center justify-between md:hidden", className)}>
            <Button
                aria-label="Go to previous page"
                iconLeading={ArrowLeft}
                color="secondary"
                size="sm"
                onClick={() => onPageChange?.(Math.max(0, page - 1))}
            />

            <span className="text-sm text-fg-secondary">
                Page <span className="font-medium">{page}</span> of <span className="font-medium">{total}</span>
            </span>

            <Button
                aria-label="Go to next page"
                iconLeading={ArrowRight}
                color="secondary"
                size="sm"
                onClick={() => onPageChange?.(Math.min(total, page + 1))}
            />
        </nav>
    );
};

export const PaginationPageDefault = ({ rounded, page = 1, total = 10, className, ...props }: PaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className={cx("flex w-full items-center justify-between gap-3 border-t border-secondary pt-4 md:pt-5", className)}
        >
            <div className="hidden flex-1 justify-start md:flex">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="link-gray" size="sm">
                        {isDesktop ? "Previous" : undefined}{" "}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.PrevTrigger asChild className="md:hidden">
                <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                    {isDesktop ? "Previous" : undefined}
                </Button>
            </Pagination.PrevTrigger>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItemComponent key={index} rounded={rounded} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="flex size-10 shrink-0 items-center justify-center text-tertiary">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="flex justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{total}</span>
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="hidden flex-1 justify-end md:flex">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="link-gray" size="sm">
                        {isDesktop ? "Next" : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
            <Pagination.NextTrigger asChild className="md:hidden">
                <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                    {isDesktop ? "Next" : undefined}
                </Button>
            </Pagination.NextTrigger>
        </Pagination.Root>
    );
};

export const PaginationPageMinimalCenter = ({ rounded, page = 1, total = 10, className, ...props }: PaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className={cx("flex w-full items-center justify-between gap-3 border-t border-secondary pt-4 md:pt-5", className)}
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? "Previous" : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItemComponent key={index} rounded={rounded} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="flex size-10 shrink-0 items-center justify-center text-tertiary">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="flex justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{total}</span>
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? "Next" : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

export const PaginationCardDefault = ({ rounded, page = 1, total = 10, ...props }: PaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className="flex w-full items-center justify-between gap-3 border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4"
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? "Previous" : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItemComponent key={index} rounded={rounded} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="flex size-10 shrink-0 items-center justify-center text-tertiary">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="flex justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{total}</span>
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? "Next" : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

interface PaginationCardMinimalProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The alignment of the pagination. */
    align?: "left" | "center" | "right";
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
}

export const PaginationCardMinimal = ({ page = 1, total = 10, align = "left", onPageChange, className }: PaginationCardMinimalProps) => {
    return (
        <div className={cx("border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4", className)}>
            <MobilePagination page={page} total={total} onPageChange={onPageChange} />

            <nav aria-label="Pagination" className={cx("hidden items-center gap-3 md:flex", align === "center" && "justify-between")}>
                <div className={cx(align === "center" && "flex flex-1 justify-start")}>
                    <Button isDisabled={page === 1} color="secondary" size="sm" onClick={() => onPageChange?.(Math.max(0, page - 1))}>
                        Previous
                    </Button>
                </div>

                <span
                    className={cx(
                        "text-sm font-medium text-fg-secondary",
                        align === "right" && "order-first mr-auto",
                        align === "left" && "order-last ml-auto",
                    )}
                >
                    Page {page} of {total}
                </span>

                <div className={cx(align === "center" && "flex flex-1 justify-end")}>
                    <Button isDisabled={page === total} color="secondary" size="sm" onClick={() => onPageChange?.(Math.min(total, page + 1))}>
                        Next
                    </Button>
                </div>
            </nav>
        </div>
    );
};

interface PaginationButtonGroupProps extends Partial<Omit<PaginationRootProps, "children">> {
    /** The alignment of the pagination. */
    align?: "left" | "center" | "right";
}

export const PaginationButtonGroup = ({ align = "left", page = 1, total = 10, ...props }: PaginationButtonGroupProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <div
            className={cx(
                "flex border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4",
                align === "left" && "justify-start",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
            )}
        >
            <Pagination.Root {...props} page={page} total={total}>
                <Pagination.Context>
                    {({ pages }) => (
                        <ButtonGroup size="md">
                            <Pagination.PrevTrigger asChild>
                                <ButtonGroupItem iconLeading={ArrowLeft}>{isDesktop ? "Previous" : undefined}</ButtonGroupItem>
                            </Pagination.PrevTrigger>

                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <Pagination.Item key={index} {...page} asChild>
                                        <ButtonGroupItem isSelected={page.isCurrent} className="size-10 items-center justify-center">
                                            {page.value}
                                        </ButtonGroupItem>
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Ellipsis key={index}>
                                        <ButtonGroupItem className="pointer-events-none size-10 items-center justify-center rounded-none!">
                                            &#8230;
                                        </ButtonGroupItem>
                                    </Pagination.Ellipsis>
                                ),
                            )}

                            <Pagination.NextTrigger asChild>
                                <ButtonGroupItem iconTrailing={ArrowRight}>{isDesktop ? "Next" : undefined}</ButtonGroupItem>
                            </Pagination.NextTrigger>
                        </ButtonGroup>
                    )}
                </Pagination.Context>
            </Pagination.Root>
        </div>
    );
};

// ============================================================================
// PaginationDot Component
// ============================================================================

interface PaginationDotProps extends Omit<PaginationRootProps, "children"> {
    /** The size of the pagination dot. */
    size?: "md" | "lg";
    /** Whether the pagination uses brand colors. */
    isBrand?: boolean;
    /** Whether the pagination is displayed in a card. */
    framed?: boolean;
}

export const PaginationDot = ({ framed, className, size = "md", isBrand, ...props }: PaginationDotProps) => {
    const sizes = {
        md: {
            root: cx("gap-3", framed && "p-2"),
            button: "h-2 w-2 after:-inset-x-1.5 after:-inset-y-2",
        },
        lg: {
            root: cx("gap-4", framed && "p-3"),
            button: "h-2.5 w-2.5 after:-inset-x-2 after:-inset-y-3",
        },
    };

    return (
        <Pagination.Root {...props} className={cx("flex h-max w-max", sizes[size].root, framed && "rounded-full bg-alpha-white/90 backdrop-blur", className)}>
            <Pagination.Context>
                {({ pages }) =>
                    pages.map((page, index) =>
                        page.type === "page" ? (
                            <Pagination.Item
                                {...page}
                                asChild
                                key={index}
                                className={cx(
                                    "relative cursor-pointer rounded-full bg-quaternary outline-focus-ring after:absolute focus-visible:outline-2 focus-visible:outline-offset-2",
                                    sizes[size].button,
                                    page.isCurrent && "bg-fg-brand-primary_alt",
                                    isBrand && "bg-fg-brand-secondary",
                                    isBrand && page.isCurrent && "bg-fg-white",
                                )}
                            ></Pagination.Item>
                        ) : (
                            <Pagination.Ellipsis {...page} key={index} />
                        ),
                    )
                }
            </Pagination.Context>
        </Pagination.Root>
    );
};

// ============================================================================
// PaginationLine Component
// ============================================================================

interface PaginationLineProps extends Omit<PaginationRootProps, "children"> {
    /** The size of the pagination line. */
    size?: "md" | "lg";
    /** Whether the pagination is displayed in a card. */
    framed?: boolean;
}

export const PaginationLine = ({ framed, className, size = "md", ...props }: PaginationLineProps) => {
    const sizes = {
        md: {
            root: cx("gap-2", framed && "p-2"),
            button: "h-1.5 w-full after:-inset-x-1.5 after:-inset-y-2",
        },
        lg: {
            root: cx("gap-3", framed && "p-3"),
            button: "h-2 w-full after:-inset-x-2 after:-inset-y-3",
        },
    };

    return (
        <Pagination.Root {...props} className={cx("flex h-max w-max", sizes[size].root, framed && "rounded-full bg-alpha-white/90 backdrop-blur", className)}>
            <Pagination.Context>
                {({ pages }) =>
                    pages.map((page, index) =>
                        page.type === "page" ? (
                            <Pagination.Item
                                {...page}
                                asChild
                                key={index}
                                className={cx(
                                    "relative cursor-pointer rounded-full bg-quaternary outline-focus-ring after:absolute focus-visible:outline-2 focus-visible:outline-offset-2",
                                    sizes[size].button,
                                    page.isCurrent && "bg-fg-brand-primary_alt",
                                )}
                            />
                        ) : (
                            <Pagination.Ellipsis {...page} key={index} />
                        ),
                    )
                }
            </Pagination.Context>
        </Pagination.Root>
    );
};
