import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Commons/Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Checkbox size variant',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the label',
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// 1. Default - 기본 체크박스
export const Default: Story = {
  args: {
    label: 'Remember me',
    size: 'sm',
  },
};

// 2. All Sizes - 2가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <Checkbox size="sm" label="Small checkbox" />
        <span className="text-sm text-gray-500">sm - 16px (Default)</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox size="md" label="Medium checkbox" />
        <span className="text-sm text-gray-500">md - 20px</span>
      </div>
    </div>
  ),
};

// 3. All States - 체크박스 상태 비교
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default States</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultSelected />
          <Checkbox label="Indeterminate" isIndeterminate />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled States</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Disabled unchecked" isDisabled />
          <Checkbox label="Disabled checked" isDisabled defaultSelected />
          <Checkbox label="Disabled indeterminate" isDisabled isIndeterminate />
        </div>
      </div>
    </div>
  ),
};

// 4. With Labels and Hints
export const WithLabelsAndHints: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Label Only</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Subscribe to newsletter" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Hint Text</h3>
        <div className="flex flex-col gap-3">
          <Checkbox
            label="Enable notifications"
            hint="Get notified about important updates"
          />
          <Checkbox
            label="Remember my preferences"
            hint="Save your settings for next time"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Without Label</h3>
        <Checkbox />
      </div>
    </div>
  ),
};

// 5. Indeterminate State (Select All Pattern)
export const IndeterminatePattern: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 border rounded-lg max-w-sm">
      <Checkbox label="Select all" isIndeterminate size="md" />
      <div className="ml-6 flex flex-col gap-3">
        <Checkbox label="Option 1" defaultSelected />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" defaultSelected />
      </div>
    </div>
  ),
};

// 6. Size Variants with States
export const SizeStateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="flex gap-6 items-start">
          <span className="w-8 text-sm text-gray-500">{size}</span>
          <div className="flex flex-col gap-3">
            <Checkbox size={size} label="Unchecked" />
            <Checkbox size={size} label="Checked" defaultSelected />
            <Checkbox size={size} label="Indeterminate" isIndeterminate />
            <Checkbox size={size} label="Disabled" isDisabled />
          </div>
        </div>
      ))}
    </div>
  ),
};

// 7. Form Integration Example
export const FormIntegration: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 border rounded-lg max-w-md">
      <h3 className="text-lg font-semibold">Preferences</h3>
      <div className="flex flex-col gap-4">
        <Checkbox
          label="Email notifications"
          hint="Receive email updates about your account"
          defaultSelected
        />
        <Checkbox
          label="SMS notifications"
          hint="Get text messages for important alerts"
        />
        <Checkbox
          label="Push notifications"
          hint="Receive push notifications on your device"
          defaultSelected
        />
        <Checkbox
          label="Marketing emails"
          hint="Stay updated with our latest offers"
        />
      </div>
    </div>
  ),
};

// 8. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    label: 'Checkbox label',
    hint: 'Helper text',
    size: 'sm',
    isSelected: false,
    isIndeterminate: false,
    isDisabled: false,
  },
  render: (args) => <Checkbox {...args} />,
};
