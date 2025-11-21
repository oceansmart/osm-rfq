import type { Meta, StoryObj } from '@storybook/nextjs';
import { Select } from './index';
import { User01 as User, Mail01 as Mail, Home01 as Home, Settings01 as Settings, HelpCircle, Star01 as Star, SearchLg as Search } from '@untitledui/icons';

const meta: Meta<typeof Select> = {
  title: 'Commons/Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Select size variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below select',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
    isRequired: {
      control: 'boolean',
      description: 'Marks the select as required',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Shows error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample data for Select items
const basicItems = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5' },
];

const itemsWithIcons = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'user', label: 'Profile', icon: User },
  { id: 'mail', label: 'Messages', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

const itemsWithSupportingText = [
  { id: 'basic', label: 'Basic Plan', supportingText: '$9/month' },
  { id: 'pro', label: 'Pro Plan', supportingText: '$29/month' },
  { id: 'enterprise', label: 'Enterprise', supportingText: '$99/month' },
];

const itemsWithAvatars = [
  { id: '1', label: 'John Doe', avatarUrl: 'https://i.pravatar.cc/150?img=1', supportingText: 'john@example.com' },
  { id: '2', label: 'Jane Smith', avatarUrl: 'https://i.pravatar.cc/150?img=2', supportingText: 'jane@example.com' },
  { id: '3', label: 'Bob Wilson', avatarUrl: 'https://i.pravatar.cc/150?img=3', supportingText: 'bob@example.com' },
];

const itemsWithDisabled = [
  { id: '1', label: 'Available Option' },
  { id: '2', label: 'Disabled Option', isDisabled: true },
  { id: '3', label: 'Another Available' },
  { id: '4', label: 'Also Disabled', isDisabled: true },
  { id: '5', label: 'Last Available' },
];

// 1. Default - Basic Select
export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    size: 'sm',
  },
  render: (args) => (
    <div className="w-80">
      <Select {...args}>
        {basicItems.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} />
        ))}
      </Select>
    </div>
  ),
};

// 2. All Sizes - sm and md comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Small (sm)</h3>
        <Select placeholder="Small select" size="sm">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Medium (md)</h3>
        <Select placeholder="Medium select" size="md">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>
    </div>
  ),
};

// 3. With Label and Hint
export const WithLabelAndHint: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Select label="Country" hint="Select your country of residence" placeholder="Select country">
        {basicItems.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} />
        ))}
      </Select>

      <Select label="Plan" hint="Choose the plan that fits your needs" placeholder="Select plan" isRequired>
        {itemsWithSupportingText.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} supportingText={item.supportingText} />
        ))}
      </Select>
    </div>
  ),
};

// 4. With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Icon Leading</h3>
        <Select label="Navigation" placeholder="Select page">
          {itemsWithIcons.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} icon={item.icon} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Placeholder Icon</h3>
        <Select label="Search" placeholder="Search..." placeholderIcon={Search}>
          {itemsWithIcons.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} icon={item.icon} />
          ))}
        </Select>
      </div>
    </div>
  ),
};

// 5. With Avatars
export const WithAvatars: Story = {
  render: () => (
    <div className="w-96">
      <Select label="Assign to" placeholder="Select team member" hint="Choose a team member to assign this task">
        {itemsWithAvatars.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} avatarUrl={item.avatarUrl} supportingText={item.supportingText} />
        ))}
      </Select>
    </div>
  ),
};

// 6. With Supporting Text
export const WithSupportingText: Story = {
  render: () => (
    <div className="w-80">
      <Select label="Subscription Plan" placeholder="Choose your plan" hint="You can change your plan at any time">
        {itemsWithSupportingText.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} supportingText={item.supportingText} />
        ))}
      </Select>
    </div>
  ),
};

// 7. States - Disabled, Required, Invalid
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default State</h3>
        <Select label="Country" placeholder="Select country">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Required State</h3>
        <Select label="Country" placeholder="Select country" isRequired hint="This field is required">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Invalid State</h3>
        <Select label="Country" placeholder="Select country" isInvalid hint="Please select a valid country">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Disabled State</h3>
        <Select label="Country" placeholder="Select country" isDisabled hint="This field is currently disabled">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>
    </div>
  ),
};

// 8. Disabled Items
export const DisabledItems: Story = {
  render: () => (
    <div className="w-80">
      <Select label="Options" placeholder="Select an option" hint="Some options are disabled">
        {itemsWithDisabled.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} isDisabled={item.isDisabled} />
        ))}
      </Select>
    </div>
  ),
};

// 9. ComboBox - Searchable Select
export const ComboBox: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Basic ComboBox</h3>
        <Select.ComboBox label="Search Options" placeholder="Search..." hint="Type to filter options">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select.ComboBox>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">ComboBox with Icons</h3>
        <Select.ComboBox label="Search Pages" placeholder="Search pages...">
          {itemsWithIcons.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} icon={item.icon} />
          ))}
        </Select.ComboBox>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">ComboBox with Avatars</h3>
        <Select.ComboBox label="Search Team Members" placeholder="Search members..." size="md">
          {itemsWithAvatars.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} avatarUrl={item.avatarUrl} supportingText={item.supportingText} />
          ))}
        </Select.ComboBox>
      </div>
    </div>
  ),
};

// 10. ComboBox without Shortcut
export const ComboBoxNoShortcut: Story = {
  render: () => (
    <div className="w-80">
      <Select.ComboBox label="Search" placeholder="Type to search..." shortcut={false} hint="ComboBox without keyboard shortcut badge">
        {basicItems.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} />
        ))}
      </Select.ComboBox>
    </div>
  ),
};

// 11. Playground - All props adjustable
export const Playground: Story = {
  args: {
    label: 'Select Label',
    placeholder: 'Choose an option',
    hint: 'This is a hint text',
    size: 'sm',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
  },
  render: (args) => (
    <div className="w-80">
      <Select {...args}>
        {basicItems.map((item) => (
          <Select.Item key={item.id} id={item.id} label={item.label} />
        ))}
      </Select>
    </div>
  ),
};

// 12. Multiple Variants Comparison
export const VariantsComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-96">
      <div>
        <h3 className="text-sm font-semibold mb-3">Basic Select</h3>
        <Select label="Basic" placeholder="Select option">
          {basicItems.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Icons</h3>
        <Select label="With Icons" placeholder="Select page">
          {itemsWithIcons.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} icon={item.icon} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Supporting Text</h3>
        <Select label="Subscription" placeholder="Choose plan">
          {itemsWithSupportingText.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} supportingText={item.supportingText} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Avatars</h3>
        <Select label="Team Member" placeholder="Select member">
          {itemsWithAvatars.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} avatarUrl={item.avatarUrl} supportingText={item.supportingText} />
          ))}
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Searchable ComboBox</h3>
        <Select.ComboBox label="Search" placeholder="Search...">
          {itemsWithIcons.map((item) => (
            <Select.Item key={item.id} id={item.id} label={item.label} icon={item.icon} />
          ))}
        </Select.ComboBox>
      </div>
    </div>
  ),
};
