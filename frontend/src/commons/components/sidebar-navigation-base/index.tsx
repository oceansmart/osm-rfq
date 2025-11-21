"use client";

import type { FC, HTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Placement } from "@react-types/overlays";
import {
    BookOpen01,
    ChevronDown,
    ChevronSelectorVertical,
    LogOut01,
    Menu02,
    Plus,
    Settings01,
    Share04,
    User01,
    X,
    X as CloseIcon,
} from "@untitledui/icons";
import { useFocusManager } from "react-aria";
import type { DialogProps as AriaDialogProps } from "react-aria-components";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Link as AriaLink,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    Popover as AriaPopover,
    Pressable,
} from "react-aria-components";
import { AvatarLabelGroup } from "@/commons/components/avatar";
import { Badge } from "@/commons/components/badge";
import { Button } from "@/commons/components/button";
import { ProgressBarCircle } from "@/commons/components/progress-circles";
import { ProgressBar } from "@/commons/components/progress-indicators";
import { CheckboxBase } from "@/commons/components/checkbox";
import { Tooltip } from "@/commons/components/tooltip";
import { useBreakpoint } from "@/commons/hooks/use-breakpoint";
import { cx, sortCx } from "@/commons/utils/cx";

// ============================================================================
// Types
// ============================================================================

export type NavItemType = {
    /** Label text for the nav item. */
    label: string;
    /** URL to navigate to when the nav item is clicked. */
    href?: string;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Badge to display. */
    badge?: ReactNode;
    /** List of sub-items to display. */
    items?: { label: string; href: string; icon?: FC<{ className?: string }>; badge?: ReactNode }[];
    /** Whether this nav item is a divider. */
    divider?: boolean;
};

export type NavItemDividerType = Omit<NavItemType, "icon" | "label" | "divider"> & {
    /** Label text for the divider. */
    label?: string;
    /** Whether this nav item is a divider. */
    divider: true;
};

// ============================================================================
// Temporary Components (TODO: Install official components)
// ============================================================================

// Temporary CloseButton component - TODO: Install official close-button component
const CloseButton = ({ onClick, size = "sm" }: { onClick: () => void; size?: "sm" }) => (
    <button
        onClick={onClick}
        className="flex items-center justify-center rounded-md p-1.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label="Close"
    >
        <X className="size-4" />
    </button>
);

// Temporary Logo component - TODO: Create proper logo component
const UntitledLogo = () => (
    <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid text-white font-semibold">
            U
        </div>
        <span className="text-lg font-semibold text-primary">Untitled UI</span>
    </div>
);

// ============================================================================
// FeaturedCard Components
// ============================================================================

interface FeaturedCardCommonProps {
    title: string;
    description: ReactNode;
    confirmLabel: string;
    className?: string;
    onDismiss: () => void;
    onConfirm: () => void;
}

export const FeaturedCardProgressBar = ({
    title,
    description,
    confirmLabel,
    progress,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    progress: number;
}) => {
    return (
        <div className={cx("relative flex flex-col rounded-xl bg-secondary p-4", className)}>
            <p className="text-sm font-semibold text-primary">{title}</p>
            <p className="mt-1 text-sm text-tertiary">{description}</p>
            <div className="absolute top-2 right-2">
                <CloseButton onClick={onDismiss} size="sm" />
            </div>
            <div className="mt-4 flex">
                <ProgressBar value={progress} />
            </div>
            <div className="mt-4 flex gap-3">
                <Button onClick={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onClick={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardProgressCircle = ({
    title,
    description,
    confirmLabel,
    progress,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    progress: number;
}) => {
    return (
        <div className={cx("relative flex flex-col rounded-xl bg-secondary p-4", className)}>
            <div className="w-16">
                <ProgressBarCircle value={progress} size="xxs" />
            </div>

            <div className="absolute top-2 right-2">
                <CloseButton onClick={onDismiss} size="sm" />
            </div>
            <div className="mt-3">
                <p className="text-sm font-semibold text-primary">{title}</p>
                <p className="mt-1 text-sm text-tertiary">{description}</p>
            </div>
            <div className="mt-4 flex gap-3">
                <Button onClick={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onClick={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

// ============================================================================
// NavItemBase Component
// ============================================================================

const navItemStyles = sortCx({
    root: "group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
    rootSelected: "bg-active hover:bg-secondary_hover",
});

interface NavItemBaseProps {
    /** Whether the nav item shows only an icon. */
    iconOnly?: boolean;
    /** Whether the collapsible nav item is open. */
    open?: boolean;
    /** URL to navigate to when the nav item is clicked. */
    href?: string;
    /** Type of the nav item. */
    type: "link" | "collapsible" | "collapsible-child";
    /** Icon component to display. */
    icon?: FC<HTMLAttributes<HTMLOrSVGElement>>;
    /** Badge to display. */
    badge?: ReactNode;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Whether to truncate the label text. */
    truncate?: boolean;
    /** Handler for click events. */
    onClick?: MouseEventHandler;
    /** Content to display. */
    children?: ReactNode;
}

export const NavItemBase = ({ current, type, badge, href, icon: Icon, children, truncate = true, onClick }: NavItemBaseProps) => {
    const iconElement = Icon && <Icon aria-hidden="true" className="mr-2 size-5 shrink-0 text-fg-quaternary transition-inherit-all" />;

    const badgeElement =
        badge && (typeof badge === "string" || typeof badge === "number") ? (
            <Badge className="ml-3" color="gray" type="pill-color" size="sm">
                {badge}
            </Badge>
        ) : (
            badge
        );

    const labelElement = (
        <span
            className={cx(
                "flex-1 text-md font-semibold text-secondary transition-inherit-all group-hover:text-secondary_hover",
                truncate && "truncate",
                current && "text-secondary_hover",
            )}
        >
            {children}
        </span>
    );

    const isExternal = href && href.startsWith("http");
    const externalIcon = isExternal && <Share04 className="size-4 stroke-[2.5px] text-fg-quaternary" />;

    if (type === "collapsible") {
        return (
            <summary className={cx("px-3 py-2", navItemStyles.root, current && navItemStyles.rootSelected)} onClick={onClick}>
                {iconElement}

                {labelElement}

                {badgeElement}

                <ChevronDown aria-hidden="true" className="ml-3 size-4 shrink-0 stroke-[2.5px] text-fg-quaternary in-open:-scale-y-100" />
            </summary>
        );
    }

    if (type === "collapsible-child") {
        return (
            <AriaLink
                href={href!}
                target={isExternal ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={cx("py-2 pr-3 pl-10", navItemStyles.root, current && navItemStyles.rootSelected)}
                onClick={onClick}
                aria-current={current ? "page" : undefined}
            >
                {labelElement}
                {externalIcon}
                {badgeElement}
            </AriaLink>
        );
    }

    return (
        <AriaLink
            href={href!}
            target={isExternal ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={cx("px-3 py-2", navItemStyles.root, current && navItemStyles.rootSelected)}
            onClick={onClick}
            aria-current={current ? "page" : undefined}
        >
            {iconElement}
            {labelElement}
            {externalIcon}
            {badgeElement}
        </AriaLink>
    );
};

// ============================================================================
// NavItemButton Component
// ============================================================================

const navItemButtonStyles = {
    md: {
        root: "size-10",
        icon: "size-5",
    },
    lg: {
        root: "size-12",
        icon: "size-6",
    },
};

interface NavItemButtonProps {
    /** Whether the collapsible nav item is open. */
    open?: boolean;
    /** URL to navigate to when the button is clicked. */
    href?: string;
    /** Label text for the button. */
    label: string;
    /** Icon component to display. */
    icon: FC<{ className?: string }>;
    /** Whether the button is currently active. */
    current?: boolean;
    /** Size of the button. */
    size?: "md" | "lg";
    /** Handler for click events. */
    onClick?: MouseEventHandler;
    /** Additional CSS classes to apply to the button. */
    className?: string;
    /** Placement of the tooltip. */
    tooltipPlacement?: "top" | "right" | "bottom" | "left";
}

export const NavItemButton = ({
    current: current,
    label,
    href,
    icon: Icon,
    size = "md",
    className,
    tooltipPlacement = "right",
    onClick,
}: NavItemButtonProps) => {
    return (
        <Tooltip title={label} placement={tooltipPlacement}>
            <Pressable>
                <a
                    href={href}
                    aria-label={label}
                    onClick={onClick}
                    className={cx(
                        "relative flex w-full cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                        current && "bg-active text-fg-quaternary_hover hover:bg-secondary_hover",
                        navItemButtonStyles[size].root,
                        className,
                    )}
                >
                    <Icon aria-hidden="true" className={cx("shrink-0 transition-inherit-all", navItemButtonStyles[size].icon)} />
                </a>
            </Pressable>
        </Tooltip>
    );
};

// ============================================================================
// NavList Component
// ============================================================================

interface NavListProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Additional CSS classes to apply to the list. */
    className?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
}

export const NavList = ({ activeUrl, items, className }: NavListProps) => {
    const [open, setOpen] = useState(false);
    const activeItem = items.find((item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl));
    const [currentItem, setCurrentItem] = useState(activeItem);

    return (
        <ul className={cx("mt-4 flex flex-col px-2 lg:px-4", className)}>
            {items.map((item, index) => {
                if (item.divider) {
                    return (
                        <li key={index} className="w-full px-0.5 py-2">
                            <hr className="h-px w-full border-none bg-border-secondary" />
                        </li>
                    );
                }

                if (item.items?.length) {
                    return (
                        <details
                            key={item.label}
                            open={activeItem?.href === item.href}
                            className="appearance-none py-0.5"
                            onToggle={(e) => {
                                setOpen(e.currentTarget.open);
                                setCurrentItem(item);
                            }}
                        >
                            <NavItemBase href={item.href} badge={item.badge} icon={item.icon} type="collapsible">
                                {item.label}
                            </NavItemBase>

                            <dd>
                                <ul className="py-0.5">
                                    {item.items.map((childItem) => (
                                        <li key={childItem.label} className="py-0.5">
                                            <NavItemBase
                                                href={childItem.href}
                                                badge={childItem.badge}
                                                type="collapsible-child"
                                                current={activeUrl === childItem.href}
                                            >
                                                {childItem.label}
                                            </NavItemBase>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </details>
                    );
                }

                return (
                    <li key={item.label} className="py-0.5">
                        <NavItemBase
                            type="link"
                            badge={item.badge}
                            icon={item.icon}
                            href={item.href}
                            current={currentItem?.href === item.href}
                            open={open && currentItem?.href === item.href}
                        >
                            {item.label}
                        </NavItemBase>
                    </li>
                );
            })}
        </ul>
    );
};

// ============================================================================
// NavAccountCard Components
// ============================================================================

type NavAccountType = {
    /** Unique identifier for the nav item. */
    id: string;
    /** Name of the account holder. */
    name: string;
    /** Email address of the account holder. */
    email: string;
    /** Avatar image URL. */
    avatar: string;
    /** Online status of the account holder. This is used to display the online status indicator. */
    status: "online" | "offline";
};

const placeholderAccounts: NavAccountType[] = [
    {
        id: "olivia",
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        status: "online",
    },
    {
        id: "sienna",
        name: "Sienna Hewitt",
        email: "sienna@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E0E0E0",
        status: "online",
    },
];

export const NavAccountMenu = ({
    className,
    selectedAccountId = "olivia",
    ...dialogProps
}: AriaDialogProps & { className?: string; accounts?: NavAccountType[]; selectedAccountId?: string }) => {
    const focusManager = useFocusManager();
    const dialogRef = useRef<HTMLDivElement>(null);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    focusManager?.focusNext({ tabbable: true, wrap: true });
                    break;
                case "ArrowUp":
                    focusManager?.focusPrevious({ tabbable: true, wrap: true });
                    break;
            }
        },
        [focusManager],
    );

    useEffect(() => {
        const element = dialogRef.current;
        if (element) {
            element.addEventListener("keydown", onKeyDown);
        }

        return () => {
            if (element) {
                element.removeEventListener("keydown", onKeyDown);
            }
        };
    }, [onKeyDown]);

    return (
        <AriaDialog
            {...dialogProps}
            ref={dialogRef}
            className={cx("w-66 rounded-xl bg-secondary_alt shadow-lg ring ring-secondary_alt outline-hidden", className)}
        >
            <div className="rounded-xl bg-primary ring-1 ring-secondary">
                <div className="flex flex-col gap-0.5 py-1.5">
                    <NavAccountCardMenuItem label="View profile" icon={User01} shortcut="⌘K->P" />
                    <NavAccountCardMenuItem label="Account settings" icon={Settings01} shortcut="⌘S" />
                    <NavAccountCardMenuItem label="Documentation" icon={BookOpen01} />
                </div>
                <div className="flex flex-col gap-0.5 border-t border-secondary py-1.5">
                    <div className="px-3 pt-1.5 pb-1 text-xs font-semibold text-tertiary">Switch account</div>

                    <div className="flex flex-col gap-0.5 px-1.5">
                        {placeholderAccounts.map((account) => (
                            <button
                                key={account.id}
                                className={cx(
                                    "relative w-full cursor-pointer rounded-md px-2 py-1.5 text-left outline-focus-ring hover:bg-primary_hover focus:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                                    account.id === selectedAccountId && "bg-primary_hover",
                                )}
                            >
                                <AvatarLabelGroup status="online" size="md" src={account.avatar} title={account.name} subtitle={account.email} />

                                <CheckboxBase isSelected={account.id === selectedAccountId} className="absolute top-2 right-2" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 pt-0.5 pb-2">
                    <Button iconLeading={Plus} color="secondary" size="sm">
                        Add account
                    </Button>
                </div>
            </div>

            <div className="pt-1 pb-1.5">
                <NavAccountCardMenuItem label="Sign out" icon={LogOut01} shortcut="⌥⇧Q" />
            </div>
        </AriaDialog>
    );
};

const NavAccountCardMenuItem = ({
    icon: Icon,
    label,
    shortcut,
    ...buttonProps
}: {
    icon?: FC<{ className?: string }>;
    label: string;
    shortcut?: string;
} & HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...buttonProps} className={cx("group/item w-full cursor-pointer px-1.5 focus:outline-hidden", buttonProps.className)}>
            <div
                className={cx(
                    "flex w-full items-center justify-between gap-3 rounded-md p-2 group-hover/item:bg-primary_hover",
                    // Focus styles.
                    "outline-focus-ring group-focus-visible/item:outline-2 group-focus-visible/item:outline-offset-2",
                )}
            >
                <div className="flex gap-2 text-sm font-semibold text-secondary group-hover/item:text-secondary_hover">
                    {Icon && <Icon className="size-5 text-fg-quaternary" />} {label}
                </div>

                {shortcut && (
                    <kbd className="flex rounded px-1 py-px font-body text-xs font-medium text-tertiary ring-1 ring-secondary ring-inset">{shortcut}</kbd>
                )}
            </div>
        </button>
    );
};

export const NavAccountCard = ({
    popoverPlacement,
    selectedAccountId = "olivia",
    items = placeholderAccounts,
}: {
    popoverPlacement?: Placement;
    selectedAccountId?: string;
    items?: NavAccountType[];
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useBreakpoint("lg");

    const selectedAccount = placeholderAccounts.find((account) => account.id === selectedAccountId);

    if (!selectedAccount) {
        console.warn(`Account with ID ${selectedAccountId} not found in <NavAccountCard />`);
        return null;
    }

    return (
        <div ref={triggerRef} className="relative flex items-center gap-3 rounded-xl p-3 ring-1 ring-secondary ring-inset">
            <AvatarLabelGroup
                size="md"
                src={selectedAccount.avatar}
                title={selectedAccount.name}
                subtitle={selectedAccount.email}
                status={selectedAccount.status}
            />

            <div className="absolute top-1.5 right-1.5">
                <AriaDialogTrigger>
                    <AriaButton className="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 pressed:bg-primary_hover pressed:text-fg-quaternary_hover">
                        <ChevronSelectorVertical className="size-4 shrink-0" />
                    </AriaButton>
                    <AriaPopover
                        placement={popoverPlacement ?? (isDesktop ? "right bottom" : "top right")}
                        triggerRef={triggerRef}
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
                        <NavAccountMenu selectedAccountId={selectedAccountId} accounts={items} />
                    </AriaPopover>
                </AriaDialogTrigger>
            </div>
        </div>
    );
};

// ============================================================================
// MobileNavigationHeader Component
// ============================================================================

export const MobileNavigationHeader = ({ children }: PropsWithChildren) => {
    return (
        <AriaDialogTrigger>
            <header className="flex h-16 items-center justify-between border-b border-secondary bg-primary py-3 pr-2 pl-4 lg:hidden">
                <UntitledLogo />

                <AriaButton
                    aria-label="Expand navigation menu"
                    className="group flex items-center justify-center rounded-lg bg-primary p-2 text-fg-secondary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <Menu02 className="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0" />
                    <CloseIcon className="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100" />
                </AriaButton>
            </header>

            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    cx(
                        "fixed inset-0 z-50 cursor-pointer bg-overlay/70 pr-16 backdrop-blur-md lg:hidden",
                        isEntering && "duration-300 ease-in-out animate-in fade-in",
                        isExiting && "duration-200 ease-in-out animate-out fade-out",
                    )
                }
            >
                {({ state }) => (
                    <>
                        <AriaButton
                            aria-label="Close navigation menu"
                            onPress={() => state.close()}
                            className="fixed top-3 right-2 flex cursor-pointer items-center justify-center rounded-lg p-2 text-fg-white/70 outline-focus-ring hover:bg-white/10 hover:text-fg-white focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <CloseIcon className="size-6" />
                        </AriaButton>

                        <AriaModal className="w-full cursor-auto will-change-transform">
                            <AriaDialog className="h-dvh outline-hidden focus:outline-hidden">{children}</AriaDialog>
                        </AriaModal>
                    </>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
};
