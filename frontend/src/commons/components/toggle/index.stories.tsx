import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toggle } from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Toggle size variant',
    },
    slim: {
      control: 'boolean',
      description: 'Slim variant with ring border',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below label',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the toggle',
    },
    isSelected: {
      control: 'boolean',
      description: 'Toggle on/off state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// 1. Default - Basic Toggle
export const Default: Story = {
  args: {
    size: 'sm',
    slim: false,
  },
};

// 2. All Sizes - sm and md comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small (sm)</h3>
        <div className="flex items-center gap-4">
          <Toggle size="sm" />
          <span className="text-sm text-gray-500">h-5 w-9 (default)</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Medium (md)</h3>
        <div className="flex items-center gap-4">
          <Toggle size="md" />
          <span className="text-sm text-gray-500">h-6 w-11</span>
        </div>
      </div>
    </div>
  ),
};

// 3. With Label
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle label="Enable notifications" size="sm" />
      <Toggle label="Auto-save changes" size="md" />
    </div>
  ),
};

// 4. With Label and Hint
export const WithLabelAndHint: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <Toggle
        label="Email notifications"
        hint="Receive email notifications about your account activity"
        size="sm"
      />
      <Toggle
        label="Marketing emails"
        hint={<span>Get updates about new features and special offers. <a href="#" className="text-blue-600 underline">Learn more</a></span>}
        size="md"
      />
    </div>
  ),
};

// 5. Slim Variant
export const SlimVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small Slim</h3>
        <Toggle slim size="sm" label="Enable slim mode" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Medium Slim</h3>
        <Toggle slim size="md" label="Enable slim mode" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Slim with Hint</h3>
        <Toggle
          slim
          size="md"
          label="Dark mode"
          hint="Use dark theme across the application"
        />
      </div>
    </div>
  ),
};

// 6. States - Default, Selected, Disabled
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Off State (Default)</h3>
        <div className="flex gap-6">
          <Toggle label="Default toggle" />
          <Toggle slim label="Slim toggle" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">On State (Selected)</h3>
        <div className="flex gap-6">
          <Toggle label="Enabled" isSelected defaultSelected />
          <Toggle slim label="Enabled (Slim)" isSelected defaultSelected />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled State</h3>
        <div className="flex gap-6">
          <Toggle label="Disabled (Off)" isDisabled />
          <Toggle label="Disabled (On)" isDisabled isSelected defaultSelected />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled Slim State</h3>
        <div className="flex gap-6">
          <Toggle slim label="Disabled Slim (Off)" isDisabled />
          <Toggle slim label="Disabled Slim (On)" isDisabled isSelected defaultSelected />
        </div>
      </div>
    </div>
  ),
};

// 7. Size x Variant Matrix
export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="flex gap-6 items-center">
          <span className="w-12 text-sm text-gray-500">{size}</span>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Default</span>
              <Toggle size={size} label="Toggle" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Slim</span>
              <Toggle slim size={size} label="Toggle" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Selected</span>
              <Toggle size={size} label="Toggle" isSelected defaultSelected />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Disabled</span>
              <Toggle size={size} label="Toggle" isDisabled />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// 8. Interactive Examples
export const InteractiveExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div className="p-4 border rounded-lg">
        <Toggle
          label="Privacy settings"
          hint="Control who can see your profile information"
          size="md"
        />
      </div>

      <div className="p-4 border rounded-lg">
        <Toggle
          slim
          label="Two-factor authentication"
          hint="Add an extra layer of security to your account"
          size="md"
        />
      </div>

      <div className="p-4 border rounded-lg bg-gray-50">
        <Toggle
          label="Beta features"
          hint="Try out experimental features before they're released"
          size="md"
          defaultSelected
        />
      </div>
    </div>
  ),
};

// 9. Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-sm font-semibold mb-3">Uncontrolled (defaultSelected)</h3>
        <Toggle
          label="Uncontrolled toggle"
          hint="State managed internally by React Aria"
          defaultSelected
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Controlled (isSelected + onChange)</h3>
        <Toggle
          label="Controlled toggle"
          hint="State managed by parent component"
          isSelected={true}
          onChange={(isSelected) => console.log('Toggle changed:', isSelected)}
        />
      </div>
    </div>
  ),
};

// 10. Playground - All props adjustable
export const Playground: Story = {
  args: {
    label: 'Toggle Label',
    hint: 'This is a hint text',
    size: 'sm',
    slim: false,
    isDisabled: false,
    defaultSelected: false,
  },
};

// 11. Real-world Use Cases
export const RealWorldUseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[480px]">
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Settings Panel</h3>
        <div className="flex flex-col gap-4">
          <Toggle
            label="Show desktop notifications"
            hint="Get notified about important events"
            size="md"
            defaultSelected
          />
          <Toggle
            label="Auto-play videos"
            hint="Videos will play automatically when visible"
            size="md"
          />
          <Toggle
            slim
            label="Use system theme"
            hint="Automatically switch between light and dark mode"
            size="md"
          />
        </div>
      </div>

      <div className="p-6 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Privacy Controls</h3>
        <div className="flex flex-col gap-4">
          <Toggle
            label="Profile visibility"
            hint="Make your profile visible to other users"
            size="md"
            defaultSelected
          />
          <Toggle
            label="Show activity status"
            hint="Let others see when you're online"
            size="md"
          />
          <Toggle
            label="Allow messages from anyone"
            hint="Receive messages from all users, not just connections"
            size="md"
            isDisabled
          />
        </div>
      </div>
    </div>
  ),
};
