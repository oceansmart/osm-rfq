import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './index';
import {
  Mail01 as Mail,
  SearchLg as Search,
  Lock01 as Lock,
  User01 as User,
  CreditCard01 as CreditCard
} from '@untitledui/icons';

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Input size variant',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    isRequired: {
      control: 'boolean',
      description: 'Marks the input as required',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Marks the input as invalid',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Makes the input read-only',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Helper text below the input',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text on help icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 1. Default - 기본 Input
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    size: 'sm',
  },
};

// 2. All Sizes - 2가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small (Default)</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" size="sm" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Medium</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" size="md" />
      </div>
    </div>
  ),
};

// 3. With Icons - 아이콘과 함께
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <Input label="Email" placeholder="olivia@untitledui.com" icon={Mail} />
      <Input label="Search" placeholder="Search..." icon={Search} />
      <Input label="Password" placeholder="Enter password" icon={Lock} type="password" />
      <Input label="Username" placeholder="Enter username" icon={User} />
      <Input label="Card Number" placeholder="1234 1234 1234 1234" icon={CreditCard} />
    </div>
  ),
};

// 4. With Helper Text - 힌트 텍스트
export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <Input
        label="Email"
        placeholder="olivia@untitledui.com"
        hint="We'll never share your email with anyone else."
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        hint="Must be at least 8 characters"
      />
    </div>
  ),
};

// 5. With Tooltip - 툴팁 표시
export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <Input
        label="API Key"
        placeholder="sk_live_..."
        tooltip="Your API key can be found in the dashboard settings"
      />

      <Input
        label="Webhook URL"
        placeholder="https://example.com/webhook"
        tooltip="This URL will receive POST requests for events"
      />
    </div>
  ),
};

// 6. States - 다양한 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Normal</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Required</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" isRequired />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled</h3>
        <Input label="Email" placeholder="olivia@untitledui.com" isDisabled />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Read-only</h3>
        <Input label="Email" value="olivia@untitledui.com" isReadOnly />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Invalid</h3>
        <Input
          label="Email"
          placeholder="olivia@untitledui.com"
          isInvalid
          hint="Please enter a valid email address"
        />
      </div>
    </div>
  ),
};

// 7. With Shortcut - 키보드 단축키
export const WithShortcut: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <Input label="Search" placeholder="Search..." icon={Search} shortcut />

      <Input label="Command" placeholder="Type a command..." shortcut="⌘K" />

      <Input label="Quick Action" placeholder="Quick action..." shortcut="Ctrl+/" />
    </div>
  ),
};

// 8. Form Example - 실제 폼 예시
export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Sign Up</h2>

      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          isRequired
        />

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          icon={Mail}
          isRequired
          hint="We'll send a verification email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          isRequired
          hint="Must be at least 8 characters"
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          isRequired
        />
      </div>
    </div>
  ),
};

// 9. Validation States - 검증 상태
export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <Input
        label="Email"
        value="olivia@untitledui.com"
        hint="Valid email format"
      />

      <Input
        label="Email"
        value="invalid-email"
        isInvalid
        hint="Please enter a valid email address"
      />

      <Input
        label="Username"
        value="olivia123"
        hint="Username is available"
      />

      <Input
        label="Username"
        value="admin"
        isInvalid
        hint="Username is already taken"
      />
    </div>
  ),
};

// 10. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    hint: 'Enter your email address',
    size: 'sm',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
  },
};
