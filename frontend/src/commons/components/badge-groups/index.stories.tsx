import type { Meta, StoryObj } from '@storybook/nextjs';
import { BadgeGroup } from './index';
import { ChevronRight, Plus, X } from '@/commons/components/icons';

const meta: Meta<typeof BadgeGroup> = {
  title: 'Commons/Components/BadgeGroup',
  component: BadgeGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'BadgeGroup size variant',
    },
    color: {
      control: 'select',
      options: ['brand', 'gray', 'error', 'warning', 'success'],
      description: 'BadgeGroup color variant',
    },
    theme: {
      control: 'radio',
      options: ['light', 'modern'],
      description: 'BadgeGroup theme variant',
    },
    align: {
      control: 'radio',
      options: ['leading', 'trailing'],
      description: 'Alignment of the addon element',
    },
    addonText: {
      control: 'text',
      description: 'Text displayed in the addon section',
    },
    children: {
      control: 'text',
      description: 'Main badge content',
    },
    iconTrailing: {
      control: false,
      description: 'Trailing icon component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeGroup>;

// 1. Default - 기본 BadgeGroup
export const Default: Story = {
  args: {
    children: 'Label',
    addonText: '100',
    size: 'md',
    color: 'brand',
    theme: 'light',
    align: 'leading',
  },
};

// 2. All Sizes - 2가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex items-center gap-4">
        <BadgeGroup addonText="100" color="brand" size="md">
          Medium Badge
        </BadgeGroup>
        <span className="text-sm text-gray-500">md - py-1 text-xs</span>
      </div>

      <div className="flex items-center gap-4">
        <BadgeGroup addonText="100" color="brand" size="lg">
          Large Badge
        </BadgeGroup>
        <span className="text-sm text-gray-500">lg - py-1 text-sm</span>
      </div>
    </div>
  ),
};

// 3. All Colors - 5가지 컬러 비교
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Light Theme Colors</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeGroup addonText="100" color="brand">
            Brand
          </BadgeGroup>
          <BadgeGroup addonText="100" color="gray">
            Gray
          </BadgeGroup>
          <BadgeGroup addonText="100" color="error">
            Error
          </BadgeGroup>
          <BadgeGroup addonText="100" color="warning">
            Warning
          </BadgeGroup>
          <BadgeGroup addonText="100" color="success">
            Success
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Theme Colors</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeGroup addonText="100" color="brand" theme="modern">
            Brand
          </BadgeGroup>
          <BadgeGroup addonText="100" color="gray" theme="modern">
            Gray
          </BadgeGroup>
          <BadgeGroup addonText="100" color="error" theme="modern">
            Error
          </BadgeGroup>
          <BadgeGroup addonText="100" color="warning" theme="modern">
            Warning
          </BadgeGroup>
          <BadgeGroup addonText="100" color="success" theme="modern">
            Success
          </BadgeGroup>
        </div>
      </div>
    </div>
  ),
};

// 4. Themes - Light vs Modern
export const Themes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Light Theme</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" theme="light">
            Notifications
          </BadgeGroup>
          <BadgeGroup addonText="25" color="error" theme="light">
            Errors
          </BadgeGroup>
          <BadgeGroup addonText="5" color="success" theme="light">
            Completed
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Theme (with dot indicator)</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" theme="modern">
            Notifications
          </BadgeGroup>
          <BadgeGroup addonText="25" color="error" theme="modern">
            Errors
          </BadgeGroup>
          <BadgeGroup addonText="5" color="success" theme="modern">
            Completed
          </BadgeGroup>
        </div>
      </div>
    </div>
  ),
};

// 5. Alignment - Leading vs Trailing
export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Leading Addon</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" align="leading">
            Messages
          </BadgeGroup>
          <BadgeGroup addonText="25" color="error" align="leading">
            Alerts
          </BadgeGroup>
          <BadgeGroup addonText="5" color="success" align="leading">
            Tasks
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Trailing Addon</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" align="trailing">
            Messages
          </BadgeGroup>
          <BadgeGroup addonText="25" color="error" align="trailing">
            Alerts
          </BadgeGroup>
          <BadgeGroup addonText="5" color="success" align="trailing">
            Tasks
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Trailing Addon (Modern Theme)</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" align="trailing" theme="modern">
            Messages
          </BadgeGroup>
          <BadgeGroup addonText="25" color="error" align="trailing" theme="modern">
            Alerts
          </BadgeGroup>
          <BadgeGroup addonText="5" color="success" align="trailing" theme="modern">
            Tasks
          </BadgeGroup>
        </div>
      </div>
    </div>
  ),
};

// 6. With Icons - Trailing icon variants
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default Icon (ArrowRight)</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand">
            Messages
          </BadgeGroup>
          <BadgeGroup addonText="25" color="error" align="trailing">
            Alerts
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Custom Icons</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" iconTrailing={ChevronRight}>
            Next
          </BadgeGroup>
          <BadgeGroup addonText="New" color="success" iconTrailing={Plus}>
            Add Item
          </BadgeGroup>
          <BadgeGroup addonText="5" color="error" iconTrailing={X} align="trailing">
            Remove
          </BadgeGroup>
        </div>
      </div>
    </div>
  ),
};

// 7. Without Text - Addon only
export const AddonOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Leading Addon Only</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" align="leading" />
          <BadgeGroup addonText="25" color="error" align="leading" />
          <BadgeGroup addonText="5" color="success" align="leading" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Trailing Addon Only</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" align="trailing" />
          <BadgeGroup addonText="25" color="error" align="trailing" />
          <BadgeGroup addonText="5" color="success" align="trailing" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Theme - Addon Only</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="100" color="brand" theme="modern" align="trailing" />
          <BadgeGroup addonText="25" color="error" theme="modern" align="trailing" />
          <BadgeGroup addonText="5" color="success" theme="modern" align="trailing" />
        </div>
      </div>
    </div>
  ),
};

// 8. Use Cases - 실제 사용 사례
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Notification Badges</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="12" color="brand" size="md">
            Unread Messages
          </BadgeGroup>
          <BadgeGroup addonText="3" color="error" size="md">
            Critical Alerts
          </BadgeGroup>
          <BadgeGroup addonText="99+" color="gray" size="md">
            All Notifications
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Status Counters</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="45" color="success" theme="modern">
            Completed
          </BadgeGroup>
          <BadgeGroup addonText="12" color="warning" theme="modern">
            In Progress
          </BadgeGroup>
          <BadgeGroup addonText="3" color="error" theme="modern">
            Failed
          </BadgeGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Category Filters</h3>
        <div className="flex gap-3">
          <BadgeGroup addonText="156" color="brand" align="trailing" size="lg">
            All Items
          </BadgeGroup>
          <BadgeGroup addonText="42" color="gray" align="trailing" size="lg">
            Favorites
          </BadgeGroup>
          <BadgeGroup addonText="8" color="success" align="trailing" size="lg">
            Recent
          </BadgeGroup>
        </div>
      </div>
    </div>
  ),
};

// 9. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    children: 'Badge Label',
    addonText: '42',
    size: 'md',
    color: 'brand',
    theme: 'light',
    align: 'leading',
  },
};
