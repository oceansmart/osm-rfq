import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import {
    Star01 as Star,
    Heart,
    Settings01 as Settings,
    User01 as User,
    CreditCard01 as CreditCard,
} from "@untitledui/icons";
import {
    RadioGroupRadioButton,
    RadioGroupCheckbox,
    RadioGroupAvatar,
    RadioGroupIconSimple,
    RadioGroupIconCard,
    RadioGroupPaymentIcon,
} from ".";

// ============================================================================
// Meta
// ============================================================================

const meta = {
    title: "Commons/Components/Radio",
    component: RadioGroupRadioButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupRadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// ============================================================================
// Data
// ============================================================================

const planItems = [
    {
        value: "basic",
        title: "Basic",
        secondaryTitle: "$10/month",
        description: "Perfect for individuals and small teams",
        icon: Star,
    },
    {
        value: "pro",
        title: "Professional",
        secondaryTitle: "$25/month",
        description: "For growing businesses and organizations",
        icon: Heart,
    },
    {
        value: "enterprise",
        title: "Enterprise",
        secondaryTitle: "Custom",
        description: "Advanced features for large-scale deployments",
        icon: Settings,
        disabled: true,
    },
];

const avatarItems = [
    {
        id: "olivia",
        name: "Olivia Rhye",
        username: "@olivia",
        title: "Product Designer",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: "phoenix",
        name: "Phoenix Baker",
        username: "@phoenix",
        title: "Frontend Developer",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
        id: "lana",
        name: "Lana Steiner",
        username: "@lana",
        title: "Backend Developer",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        disabled: true,
    },
];

const iconCardItems = [
    {
        value: "starter",
        title: "Starter",
        price: "$10",
        secondaryTitle: "per month",
        description: "Perfect for individuals and small teams",
        badge: "Popular",
        icon: Star,
    },
    {
        value: "business",
        title: "Business",
        price: "$25",
        secondaryTitle: "per month",
        description: "For growing businesses and organizations",
        icon: Heart,
    },
    {
        value: "enterprise",
        title: "Enterprise",
        price: "Custom",
        secondaryTitle: "pricing",
        description: "Advanced features for large-scale deployments",
        icon: Settings,
        disabled: true,
    },
];

// Payment items generator function to avoid JSX in module scope
const getPaymentItems = () => [
    {
        value: "visa",
        title: "Visa ending in 1234",
        description: "Expiry 06/2024",
        logo: <CreditCard className="size-8 text-secondary" />,
    },
    {
        value: "mastercard",
        title: "Mastercard ending in 5678",
        description: "Expiry 09/2025",
        logo: <CreditCard className="size-8 text-secondary" />,
    },
    {
        value: "amex",
        title: "Amex ending in 9012",
        description: "Expiry 12/2026",
        logo: <CreditCard className="size-8 text-secondary" />,
        disabled: true,
    },
];

// ============================================================================
// Stories - RadioButton Variant
// ============================================================================

export const RadioButtonSm: Story = {
    args: {
        size: "sm",
        items: planItems,
        defaultValue: "basic",
    },
};

export const RadioButtonMd: Story = {
    args: {
        size: "md",
        items: planItems,
        defaultValue: "pro",
    },
};

export const RadioButtonControlled: Story = {
    args: undefined as unknown as Story["args"],
    render: () => {
        const [selected, setSelected] = useState("basic");
        return (
            <div className="flex flex-col gap-4">
                <RadioGroupRadioButton
                    size="md"
                    items={planItems}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
                <div className="text-sm text-tertiary">Selected: {selected}</div>
            </div>
        );
    },
};

// ============================================================================
// Stories - Checkbox Variant
// ============================================================================

export const CheckboxSm: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupCheckbox
            size="sm"
            items={planItems}
            defaultValue="basic"
        />
    ),
};

export const CheckboxMd: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupCheckbox
            size="md"
            items={planItems}
            defaultValue="pro"
        />
    ),
};

// ============================================================================
// Stories - Avatar Variant
// ============================================================================

export const AvatarSm: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupAvatar
            size="sm"
            items={avatarItems}
            defaultValue="olivia"
        />
    ),
};

export const AvatarMd: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupAvatar
            size="md"
            items={avatarItems}
            defaultValue="phoenix"
        />
    ),
};

export const AvatarControlled: Story = {
    args: undefined as unknown as Story["args"],
    render: () => {
        const [selected, setSelected] = useState("olivia");
        return (
            <div className="flex flex-col gap-4">
                <RadioGroupAvatar
                    size="md"
                    items={avatarItems}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
                <div className="text-sm text-tertiary">
                    Selected: {avatarItems.find(item => item.id === selected)?.name}
                </div>
            </div>
        );
    },
};

// ============================================================================
// Stories - IconSimple Variant
// ============================================================================

export const IconSimpleSm: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupIconSimple
            size="sm"
            items={planItems}
            defaultValue="basic"
        />
    ),
};

export const IconSimpleMd: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupIconSimple
            size="md"
            items={planItems}
            defaultValue="pro"
        />
    ),
};

// ============================================================================
// Stories - IconCard Variant
// ============================================================================

export const IconCardSm: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupIconCard
            size="sm"
            items={iconCardItems}
            defaultValue="starter"
        />
    ),
};

export const IconCardMd: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupIconCard
            size="md"
            items={iconCardItems}
            defaultValue="business"
        />
    ),
};

export const IconCardControlled: Story = {
    args: undefined as unknown as Story["args"],
    render: () => {
        const [selected, setSelected] = useState("starter");
        return (
            <div className="flex flex-col gap-4">
                <RadioGroupIconCard
                    size="md"
                    items={iconCardItems}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
                <div className="text-sm text-tertiary">Selected plan: {selected}</div>
            </div>
        );
    },
};

// ============================================================================
// Stories - PaymentIcon Variant
// ============================================================================

export const PaymentIconSm: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupPaymentIcon
            size="sm"
            items={getPaymentItems()}
            defaultValue="visa"
        />
    ),
};

export const PaymentIconMd: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <RadioGroupPaymentIcon
            size="md"
            items={getPaymentItems()}
            defaultValue="mastercard"
        />
    ),
};

export const PaymentIconControlled: Story = {
    args: undefined as unknown as Story["args"],
    render: () => {
        const [selected, setSelected] = useState("visa");
        const paymentItems = getPaymentItems();
        return (
            <div className="flex flex-col gap-4">
                <RadioGroupPaymentIcon
                    size="md"
                    items={paymentItems}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
                <div className="text-sm text-tertiary">
                    Selected payment: {paymentItems.find(item => item.value === selected)?.title}
                </div>
            </div>
        );
    },
};

// ============================================================================
// Stories - All Variants Comparison
// ============================================================================

export const AllVariants: Story = {
    args: undefined as unknown as Story["args"],
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-md font-semibold">Radio Button Variant</h3>
                <RadioGroupRadioButton size="sm" items={planItems} defaultValue="basic" />
            </div>

            <div>
                <h3 className="mb-4 text-md font-semibold">Checkbox Variant</h3>
                <RadioGroupCheckbox size="sm" items={planItems} defaultValue="pro" />
            </div>

            <div>
                <h3 className="mb-4 text-md font-semibold">Avatar Variant</h3>
                <RadioGroupAvatar size="sm" items={avatarItems} defaultValue="olivia" />
            </div>

            <div>
                <h3 className="mb-4 text-md font-semibold">Icon Simple Variant</h3>
                <RadioGroupIconSimple size="sm" items={planItems} defaultValue="basic" />
            </div>

            <div>
                <h3 className="mb-4 text-md font-semibold">Icon Card Variant</h3>
                <RadioGroupIconCard size="sm" items={iconCardItems} defaultValue="starter" />
            </div>

            <div>
                <h3 className="mb-4 text-md font-semibold">Payment Icon Variant</h3>
                <RadioGroupPaymentIcon size="sm" items={getPaymentItems()} defaultValue="visa" />
            </div>
        </div>
    ),
};

// ============================================================================
// Stories - Real-World Use Cases
// ============================================================================

export const SubscriptionPlanSelector: Story = {
    args: undefined as unknown as Story["args"],
    render: () => {
        const [selected, setSelected] = useState("pro");
        const plans = [
            {
                value: "free",
                title: "Free",
                price: "$0",
                secondaryTitle: "forever",
                description: "Basic features for individuals",
                icon: User,
            },
            {
                value: "pro",
                title: "Pro",
                price: "$15",
                secondaryTitle: "per month",
                description: "Advanced features for professionals",
                badge: "Most Popular",
                icon: Star,
            },
            {
                value: "team",
                title: "Team",
                price: "$49",
                secondaryTitle: "per month",
                description: "Collaboration tools for teams",
                icon: Heart,
            },
        ];

        return (
            <div className="w-full max-w-2xl">
                <h2 className="mb-6 text-display-sm font-semibold">Choose your plan</h2>
                <RadioGroupIconCard
                    size="md"
                    items={plans}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
                <div className="mt-6 rounded-lg bg-primary p-4">
                    <p className="text-sm text-secondary">
                        You selected: <span className="font-semibold">{plans.find(p => p.value === selected)?.title}</span>
                    </p>
                </div>
            </div>
        );
    },
};

export const TeamMemberSelector: Story = {
    args: undefined as unknown as Story["args"],
    render: () => {
        const [selected, setSelected] = useState("olivia");
        const team = [
            {
                id: "olivia",
                name: "Olivia Rhye",
                username: "@olivia",
                title: "Product Designer • 5 years experience",
                avatarUrl: "https://i.pravatar.cc/150?img=1",
            },
            {
                id: "phoenix",
                name: "Phoenix Baker",
                username: "@phoenix",
                title: "Senior Developer • 8 years experience",
                avatarUrl: "https://i.pravatar.cc/150?img=2",
            },
            {
                id: "lana",
                name: "Lana Steiner",
                username: "@lana",
                title: "UX Researcher • 3 years experience",
                avatarUrl: "https://i.pravatar.cc/150?img=3",
            },
        ];

        return (
            <div className="w-full max-w-2xl">
                <h2 className="mb-6 text-display-sm font-semibold">Assign task to</h2>
                <RadioGroupAvatar
                    size="md"
                    items={team}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
            </div>
        );
    },
};
