# Radio Component - Storybook Stories Implementation Guide

## Component Overview

The Radio component provides 6 distinct variants for radio group selections:
1. **RadioButton** - Classic radio button with custom styling
2. **Checkbox** - Radio group with checkbox-style indicators
3. **Avatar** - User selection with avatar images
4. **IconSimple** - Radio with featured icons
5. **IconCard** - Card-style radio with pricing/badge support
6. **PaymentIcon** - Payment method selection interface

## File Structure

```
src/commons/components/radio/
├── index.tsx              # Main component (6 variants)
├── index.stories.tsx      # Storybook stories
└── prompts/
    └── radio.stories.md   # This guide
```

## Component Exports

```typescript
// Individual exports
export const RadioGroupRadioButton;
export const RadioGroupCheckbox;
export const RadioGroupAvatar;
export const RadioGroupIconSimple;
export const RadioGroupIconCard;
export const RadioGroupPaymentIcon;

// Namespace export
export const RadioGroup = {
    RadioButton: RadioGroupRadioButton,
    Checkbox: RadioGroupCheckbox,
    Avatar: RadioGroupAvatar,
    IconSimple: RadioGroupIconSimple,
    IconCard: RadioGroupIconCard,
    PaymentIcon: RadioGroupPaymentIcon,
};
```

## Dependencies

All dependencies exist in `/commons/components/`:
- `Avatar` - User avatar component
- `BadgeWithDot` - Badge with dot indicator
- `Button` - Button component
- `CheckboxBase` - Base checkbox component
- `FeaturedIcon` - Icon with background styling
- `cx` utility from `@/utils/cx`

## Props Interface

### RadioGroupRadioButton Props

```typescript
interface RadioGroupRadioButtonProps extends RadioGroupProps {
    size?: "sm" | "md";           // Default: "sm"
    items: RadioGroupItemType[];  // Required
}

type RadioGroupItemType = {
    value: string;           // Unique identifier
    title: string;           // Main label
    disabled?: boolean;      // Disable option
    description: string;     // Supporting text
    secondaryTitle: string;  // Secondary label (e.g., price)
    icon: FC<{ className?: string }>; // Icon component
};
```

### RadioGroupCheckbox Props

Same as RadioGroupRadioButton, but uses CheckboxBase for visual indicator.

### RadioGroupAvatar Props

```typescript
interface RadioGroupAvatarProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: AvatarItemType[];
}

interface AvatarItemType {
    id: string;          // Unique identifier
    name: string;        // Display name
    username: string;    // Username/handle
    title: string;       // Role/title
    avatarUrl: string;   // Avatar image URL
    disabled?: boolean;
}
```

### RadioGroupIconCard Props

```typescript
interface RadioGroupIconCardProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: IconCardItemType[];
}

type IconCardItemType = {
    value: string;
    title: string;
    description: string;
    secondaryTitle?: string;  // Optional secondary text
    disabled?: boolean;
    price?: string;           // Pricing display
    badge?: ReactNode;        // Badge content (e.g., "Popular")
    icon: FC<{ className?: string }>;
};
```

### RadioGroupPaymentIcon Props

```typescript
interface RadioGroupPaymentIconProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: PaymentCardItemType[];
}

interface PaymentCardItemType {
    value: string;
    title: string;       // Card description (e.g., "Visa ending in 1234")
    description: string; // Additional info (e.g., expiry date)
    logo: ReactNode;     // Card logo/icon
    disabled?: boolean;
}
```

## Storybook Stories Checklist

### 1. RadioButton Variant (3 stories)
- [x] **RadioButtonSm** - Small size, default value "basic"
- [x] **RadioButtonMd** - Medium size, default value "pro"
- [x] **RadioButtonControlled** - Controlled state with display

### 2. Checkbox Variant (2 stories)
- [x] **CheckboxSm** - Small size
- [x] **CheckboxMd** - Medium size

### 3. Avatar Variant (3 stories)
- [x] **AvatarSm** - Small avatars
- [x] **AvatarMd** - Medium avatars
- [x] **AvatarControlled** - Controlled with name display

### 4. IconSimple Variant (2 stories)
- [x] **IconSimpleSm** - Small icons
- [x] **IconSimpleMd** - Medium icons

### 5. IconCard Variant (3 stories)
- [x] **IconCardSm** - Small card layout
- [x] **IconCardMd** - Medium card layout
- [x] **IconCardControlled** - Controlled with plan display

### 6. PaymentIcon Variant (3 stories)
- [x] **PaymentIconSm** - Small payment cards
- [x] **PaymentIconMd** - Medium payment cards
- [x] **PaymentIconControlled** - Controlled with card display

### 7. Comparison Stories
- [x] **AllVariants** - Side-by-side comparison of all 6 variants

### 8. Real-World Use Cases (2 stories)
- [x] **SubscriptionPlanSelector** - Pricing plan selection
- [x] **TeamMemberSelector** - Team member assignment

**Total: 21 stories**

## Required Icons

Import from `@untitledui/icons`:
```typescript
import {
    Star01 as Star,
    Heart,
    Settings01 as Settings,
    User01 as User,
    Mail01 as Mail,
    CreditCard01 as CreditCard,
    CheckCircle
} from "@untitledui/icons";
```

## Sample Data Structures

### Plan Items (for RadioButton, Checkbox, IconSimple)
```typescript
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
```

### Avatar Items
```typescript
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
```

### Icon Card Items
```typescript
const iconCardItems = [
    {
        value: "starter",
        title: "Starter",
        price: "$10",
        secondaryTitle: "per month",
        description: "Perfect for individuals and small teams",
        badge: "Popular",  // Shows BadgeWithDot
        icon: Star,
    },
    // ... more items
];
```

### Payment Items
```typescript
const paymentItems = [
    {
        value: "visa",
        title: "Visa ending in 1234",
        description: "Expiry 06/2024",
        logo: <CreditCard className="size-8 text-secondary" />,
    },
    // ... more items
];
```

## State Management Patterns

### Uncontrolled (Default)
```typescript
<RadioGroupRadioButton
    size="md"
    items={planItems}
    defaultValue="basic"
/>
```

### Controlled
```typescript
const [selected, setSelected] = useState("basic");

<RadioGroupRadioButton
    size="md"
    items={planItems}
    value={selected}
    onChange={(value) => setSelected(value as string)}
/>
```

## Styling Notes

### Size Variants
- **sm**: Compact layout, `text-sm`, smaller icons, tighter spacing
- **md**: Standard layout, `text-md`, larger icons, comfortable spacing

### States
- **Default**: `ring-1 ring-secondary`
- **Selected**: `ring-2 ring-brand`
- **Disabled**: `bg-disabled_subtle ring-disabled_subtle cursor-not-allowed`
- **Focus**: `outline-2 outline-offset-2 outline-focus-ring`

### Layout Classes
All variants use:
- `flex flex-col gap-3` for vertical stacking
- `rounded-xl` for card borders
- `bg-primary` for card backgrounds
- `p-4` for padding

## Accessibility Features

- Uses React Aria Components foundation
- `AriaRadioGroup` provides ARIA semantics
- `AriaLabel` for accessible labels
- `AriaText` with `slot="description"` for descriptions
- Keyboard navigation support
- Focus visible states
- Disabled state properly announced

## React Aria Components Props

Inherited from `RadioGroupProps`:
- `value` / `defaultValue` - Selected value
- `onChange` - Change handler
- `isDisabled` - Disable entire group
- `name` - Form name attribute
- `orientation` - Layout direction (auto-handled per variant)

## Story Organization

### Meta Configuration
```typescript
const meta = {
    title: "Commons/Components/Radio",
    component: RadioGroupRadioButton,  // Primary variant
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupRadioButton>;
```

### Story Template Pattern
```typescript
export const StoryName: Story = {
    args: {
        size: "md",
        items: dataItems,
        defaultValue: "initialValue",
    },
};

// OR for controlled/complex stories
export const ControlledStory: Story = {
    render: () => {
        const [selected, setSelected] = useState("initial");
        return (
            <div className="flex flex-col gap-4">
                <RadioGroup.Variant
                    size="md"
                    items={items}
                    value={selected}
                    onChange={(value) => setSelected(value as string)}
                />
                <div className="text-sm text-tertiary">
                    Selected: {selected}
                </div>
            </div>
        );
    },
};
```

## Common Pitfalls

1. **Icon Import Names**: Use specific exports from `@untitledui/icons`:
   ```typescript
   // ✅ Correct
   import { Star01 as Star } from "@untitledui/icons";

   // ❌ Incorrect
   import { Star } from "@untitledui/icons";
   ```

2. **Avatar URLs**: Use placeholder services like `pravatar.cc` or local assets
   ```typescript
   avatarUrl: "https://i.pravatar.cc/150?img=1"  // ✅ Works
   avatarUrl: "https://example.com/broken.jpg"   // ❌ May fail
   ```

3. **Type Safety**: Cast onChange value to string
   ```typescript
   onChange={(value) => setSelected(value as string)}  // ✅
   onChange={(value) => setSelected(value)}            // ❌ Type error
   ```

4. **Badge Content**: IconCard variant accepts ReactNode for badge
   ```typescript
   badge: "Popular"              // ✅ Simple text
   badge: <CustomBadge />        // ✅ Custom component
   badge: undefined              // ✅ No badge shown
   ```

5. **Payment Logo**: Must be ReactNode, not string
   ```typescript
   logo: <CreditCard className="size-8" />  // ✅
   logo: "credit-card-icon.png"             // ❌ Won't render
   ```

## Testing Recommendations

### Visual Tests (Storybook)
- Size variants (sm/md) for each type
- Disabled states
- Selected/unselected states
- Focus states (keyboard navigation)
- Long text content handling
- Badge positioning (IconCard)
- Avatar image loading (Avatar variant)

### Interaction Tests
- Click selection
- Keyboard navigation (Tab, Arrow keys)
- onChange callback triggers
- Disabled items cannot be selected
- Controlled vs uncontrolled behavior

## Real-World Examples

### Subscription Plan Selector
Use **IconCard** variant for rich pricing displays with badges showing "Most Popular" or promotional tags.

### Team Member Assignment
Use **Avatar** variant for visually identifying team members with profile pictures and role descriptions.

### Payment Method Selection
Use **PaymentIcon** variant with inline action buttons ("Set as default", "Edit") for managing payment methods.

### Simple Choice Lists
Use **RadioButton** or **Checkbox** variants for straightforward option selections without visual complexity.

## Next Steps

1. ✅ Verify all 21 stories render in Storybook
2. ✅ Test keyboard navigation across all variants
3. ✅ Validate ARIA attributes with accessibility tools
4. ✅ Test responsive behavior on mobile viewports
5. ✅ Ensure icon imports resolve correctly
6. ✅ Verify avatar images load properly
7. ✅ Test disabled states for all variants
8. ✅ Confirm controlled state updates work

## Related Components

- [Avatar](/src/commons/components/avatar/) - User avatar images
- [Badge](/src/commons/components/badge/) - Badge indicators
- [Button](/src/commons/components/button/) - Action buttons
- [Checkbox](/src/commons/components/checkbox/) - Checkbox base
- [FeaturedIcon](/src/commons/components/featured-icon/) - Styled icons

## References

- React Aria Components: https://react-spectrum.adobe.com/react-aria/RadioGroup.html
- Untitled UI Radio Groups: https://www.untitledui.com/react/components/radio-groups
- Storybook Args: https://storybook.js.org/docs/react/writing-stories/args
