import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  RadioGroupRadioButton,
  RadioGroupCheckbox,
  RadioGroupAvatar,
  RadioGroupIconSimple,
  RadioGroupIconCard,
  RadioGroupPaymentIcon,
} from './index';

// Placeholder icon components for demo
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof RadioGroupRadioButton> = {
  title: 'Commons/Components/RadioGroups',
  component: RadioGroupRadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the radio group items',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the entire radio group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupRadioButton>;

// Sample data
const planItems = [
  {
    value: 'basic',
    title: 'Basic',
    secondaryTitle: '$10/mo',
    description: 'Perfect for individuals',
    icon: PlaceholderIcon,
  },
  {
    value: 'pro',
    title: 'Professional',
    secondaryTitle: '$29/mo',
    description: 'Best for professionals',
    icon: PlaceholderIcon,
  },
  {
    value: 'enterprise',
    title: 'Enterprise',
    secondaryTitle: '$99/mo',
    description: 'For large organizations',
    icon: PlaceholderIcon,
  },
];

const avatarItems = [
  {
    id: '1',
    name: 'John Doe',
    username: '@johndoe',
    title: 'Senior Developer',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: '@janesmith',
    title: 'Product Designer',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    username: '@bobjohnson',
    title: 'Engineering Manager',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
];

const paymentItems = [
  {
    value: 'visa',
    title: 'Visa ending in 1234',
    description: 'Expires 12/2024',
    logo: (
      <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-100 text-xs font-semibold">
        VISA
      </div>
    ),
  },
  {
    value: 'mastercard',
    title: 'Mastercard ending in 5678',
    description: 'Expires 03/2025',
    logo: (
      <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-100 text-xs font-semibold">
        MC
      </div>
    ),
  },
];

const iconCardItems = [
  {
    value: 'starter',
    title: 'Starter',
    price: '$10',
    secondaryTitle: '/month',
    description: 'Up to 5 users, 10GB storage',
    badge: 'Popular',
    icon: PlaceholderIcon,
  },
  {
    value: 'business',
    title: 'Business',
    price: '$49',
    secondaryTitle: '/month',
    description: 'Up to 50 users, 100GB storage',
    icon: PlaceholderIcon,
  },
];

// 1. Overview - 6개 변형 모두 표시
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">1. RadioButton Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupRadioButton size="sm" items={planItems} defaultValue="basic" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">2. Checkbox Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupCheckbox size="sm" items={planItems} defaultValue="pro" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">3. Avatar Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupAvatar size="sm" items={avatarItems} defaultValue="1" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">4. Icon Simple Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupIconSimple size="sm" items={planItems} defaultValue="enterprise" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">5. Icon Card Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupIconCard size="sm" items={iconCardItems} defaultValue="starter" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">6. Payment Icon Style</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroupPaymentIcon size="sm" items={paymentItems} defaultValue="visa" />
        </div>
      </div>
    </div>
  ),
};

// 2. RadioButton Variants - 기본 라디오 버튼 스타일
export const RadioButtonVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupRadioButton size="sm" items={planItems} defaultValue="basic" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupRadioButton size="md" items={planItems} defaultValue="pro" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With Disabled Item</h3>
        <RadioGroupRadioButton
          size="sm"
          items={[
            ...planItems.slice(0, 2),
            { ...planItems[2], disabled: true },
          ]}
          defaultValue="basic"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">All Disabled</h3>
        <RadioGroupRadioButton size="sm" items={planItems} defaultValue="pro" isDisabled />
      </div>
    </div>
  ),
};

// 3. Checkbox Variants - 체크박스 스타일
export const CheckboxVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupCheckbox size="sm" items={planItems} defaultValue="basic" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupCheckbox size="md" items={planItems} defaultValue="pro" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With Disabled Item</h3>
        <RadioGroupCheckbox
          size="sm"
          items={[
            planItems[0],
            { ...planItems[1], disabled: true },
            planItems[2],
          ]}
          defaultValue="enterprise"
        />
      </div>
    </div>
  ),
};

// 4. Avatar Variants - 아바타 스타일
export const AvatarVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupAvatar size="sm" items={avatarItems} defaultValue="1" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupAvatar size="md" items={avatarItems} defaultValue="2" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With Disabled Item</h3>
        <RadioGroupAvatar
          size="sm"
          items={[
            avatarItems[0],
            { ...avatarItems[1], disabled: true },
            avatarItems[2],
          ]}
          defaultValue="3"
        />
      </div>
    </div>
  ),
};

// 5. IconSimple Variants - 아이콘 심플 스타일
export const IconSimpleVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupIconSimple size="sm" items={planItems} defaultValue="basic" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupIconSimple size="md" items={planItems} defaultValue="pro" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With Disabled Item</h3>
        <RadioGroupIconSimple
          size="sm"
          items={[
            planItems[0],
            planItems[1],
            { ...planItems[2], disabled: true },
          ]}
          defaultValue="pro"
        />
      </div>
    </div>
  ),
};

// 6. IconCard Variants - 아이콘 카드 스타일
export const IconCardVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupIconCard size="sm" items={iconCardItems} defaultValue="starter" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupIconCard size="md" items={iconCardItems} defaultValue="business" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With More Options</h3>
        <RadioGroupIconCard
          size="sm"
          items={[
            ...iconCardItems,
            {
              value: 'enterprise',
              title: 'Enterprise',
              price: '$199',
              secondaryTitle: '/month',
              description: 'Unlimited users, 1TB storage',
              badge: 'Best Value',
              icon: PlaceholderIcon,
            },
          ]}
          defaultValue="enterprise"
        />
      </div>
    </div>
  ),
};

// 7. PaymentIcon Variants - 결제 아이콘 스타일
export const PaymentIconVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroupPaymentIcon size="sm" items={paymentItems} defaultValue="visa" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroupPaymentIcon size="md" items={paymentItems} defaultValue="mastercard" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With More Cards</h3>
        <RadioGroupPaymentIcon
          size="sm"
          items={[
            ...paymentItems,
            {
              value: 'amex',
              title: 'American Express ending in 9012',
              description: 'Expires 06/2026',
              logo: (
                <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-100 text-xs font-semibold">
                  AMEX
                </div>
              ),
            },
          ]}
          defaultValue="amex"
        />
      </div>
    </div>
  ),
};

// 8. Sizes Comparison - 모든 변형의 크기 비교
export const SizesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Small (sm) - All Variants</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">RadioButton</p>
            <RadioGroupRadioButton size="sm" items={planItems.slice(0, 2)} defaultValue="basic" />
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">Checkbox</p>
            <RadioGroupCheckbox size="sm" items={planItems.slice(0, 2)} defaultValue="pro" />
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">IconSimple</p>
            <RadioGroupIconSimple size="sm" items={planItems.slice(0, 2)} defaultValue="basic" />
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">Avatar</p>
            <RadioGroupAvatar size="sm" items={avatarItems.slice(0, 2)} defaultValue="1" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Medium (md) - All Variants</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">RadioButton</p>
            <RadioGroupRadioButton size="md" items={planItems.slice(0, 2)} defaultValue="basic" />
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">Checkbox</p>
            <RadioGroupCheckbox size="md" items={planItems.slice(0, 2)} defaultValue="pro" />
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">IconSimple</p>
            <RadioGroupIconSimple size="md" items={planItems.slice(0, 2)} defaultValue="basic" />
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-xs font-semibold mb-3 text-tertiary">Avatar</p>
            <RadioGroupAvatar size="md" items={avatarItems.slice(0, 2)} defaultValue="1" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// 9. UseCases - 실전 사용 예시
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Subscription Plan Selection</h3>
        <div className="p-6 border rounded-lg">
          <p className="text-sm text-tertiary mb-4">Choose your subscription plan</p>
          <RadioGroupIconCard size="md" items={iconCardItems} defaultValue="starter" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Team Member Assignment</h3>
        <div className="p-6 border rounded-lg">
          <p className="text-sm text-tertiary mb-4">Assign task to team member</p>
          <RadioGroupAvatar size="md" items={avatarItems} defaultValue="2" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Payment Method Selection</h3>
        <div className="p-6 border rounded-lg">
          <p className="text-sm text-tertiary mb-4">Select payment method for checkout</p>
          <RadioGroupPaymentIcon size="md" items={paymentItems} defaultValue="visa" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Notification Preferences</h3>
        <div className="p-6 border rounded-lg">
          <p className="text-sm text-tertiary mb-4">How would you like to receive notifications?</p>
          <RadioGroupCheckbox
            size="md"
            items={[
              {
                value: 'email',
                title: 'Email',
                secondaryTitle: 'Recommended',
                description: 'Receive notifications via email',
                icon: PlaceholderIcon,
              },
              {
                value: 'sms',
                title: 'SMS',
                secondaryTitle: '+$2/mo',
                description: 'Receive notifications via text message',
                icon: PlaceholderIcon,
              },
              {
                value: 'push',
                title: 'Push Notifications',
                secondaryTitle: 'Free',
                description: 'Receive in-app push notifications',
                icon: PlaceholderIcon,
              },
            ]}
            defaultValue="email"
          />
        </div>
      </div>
    </div>
  ),
};

// 10. Playground - RadioButton
export const PlaygroundRadioButton: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <RadioGroupRadioButton {...args} items={planItems} />
    </div>
  ),
  args: {
    size: 'sm',
    defaultValue: 'basic',
    isDisabled: false,
  },
};

// 11. Playground - Checkbox
export const PlaygroundCheckbox: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <RadioGroupCheckbox {...args} items={planItems} />
    </div>
  ),
  args: {
    size: 'sm',
    defaultValue: 'pro',
    isDisabled: false,
  },
};

// 12. Playground - Avatar
export const PlaygroundAvatar: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <RadioGroupAvatar {...args} items={avatarItems} />
    </div>
  ),
  args: {
    size: 'sm',
    defaultValue: '1',
    isDisabled: false,
  },
};

// 13. Playground - IconSimple
export const PlaygroundIconSimple: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <RadioGroupIconSimple {...args} items={planItems} />
    </div>
  ),
  args: {
    size: 'sm',
    defaultValue: 'basic',
    isDisabled: false,
  },
};

// 14. Playground - IconCard
export const PlaygroundIconCard: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <RadioGroupIconCard {...args} items={iconCardItems} />
    </div>
  ),
  args: {
    size: 'sm',
    defaultValue: 'starter',
    isDisabled: false,
  },
};

// 15. Playground - PaymentIcon
export const PlaygroundPaymentIcon: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <RadioGroupPaymentIcon {...args} items={paymentItems} />
    </div>
  ),
  args: {
    size: 'sm',
    defaultValue: 'visa',
    isDisabled: false,
  },
};
