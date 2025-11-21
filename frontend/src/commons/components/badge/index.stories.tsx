import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Badge,
  BadgeWithDot,
  BadgeWithIcon,
  BadgeWithFlag,
  BadgeWithImage,
  BadgeWithButton,
  BadgeIcon,
} from './index';
import { Star, Mail, Bell, Check } from '@/commons/components/icons';

const meta: Meta<typeof Badge> = {
  title: 'Commons/Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['pill-color', 'color', 'modern'],
      description: 'Badge shape variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size variant',
    },
    color: {
      control: 'select',
      options: [
        'gray',
        'brand',
        'error',
        'warning',
        'success',
        'gray-blue',
        'blue-light',
        'blue',
        'indigo',
        'purple',
        'pink',
        'orange',
      ],
      description: 'Badge color variant',
    },
    children: {
      control: 'text',
      description: 'Badge text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// 1. Default - 기본 Badge
export const Default: Story = {
  args: {
    children: 'Label',
    type: 'pill-color',
    size: 'md',
    color: 'gray',
  },
};

// 2. All Types - 3가지 타입 비교
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <Badge type="pill-color" color="brand">Pill Color</Badge>
        <span className="text-sm text-gray-500">pill-color - Rounded full</span>
      </div>
      <div className="flex items-center gap-4">
        <Badge type="color" color="brand">Badge Color</Badge>
        <span className="text-sm text-gray-500">color - Rounded md</span>
      </div>
      <div className="flex items-center gap-4">
        <Badge type="modern" color="gray">Badge Modern</Badge>
        <span className="text-sm text-gray-500">modern - With shadow</span>
      </div>
    </div>
  ),
};

// 3. All Sizes - 3가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <Badge size="sm" color="brand">Small</Badge>
        <span className="text-sm text-gray-500">sm - px-2 py-0.5 text-xs</span>
      </div>
      <div className="flex items-center gap-4">
        <Badge size="md" color="brand">Medium</Badge>
        <span className="text-sm text-gray-500">md - px-2.5 py-0.5 text-sm (Default)</span>
      </div>
      <div className="flex items-center gap-4">
        <Badge size="lg" color="brand">Large</Badge>
        <span className="text-sm text-gray-500">lg - px-3 py-1 text-sm</span>
      </div>
    </div>
  ),
};

// 4. All Colors - 12가지 컬러 비교
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Base Colors */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Base Colors</h3>
        <div className="flex flex-wrap gap-3">
          <Badge color="gray">Gray</Badge>
          <Badge color="brand">Brand</Badge>
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Status Colors</h3>
        <div className="flex flex-wrap gap-3">
          <Badge color="error">Error</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="success">Success</Badge>
        </div>
      </div>

      {/* Extended Colors */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Extended Colors</h3>
        <div className="flex flex-wrap gap-3">
          <Badge color="gray-blue">Gray Blue</Badge>
          <Badge color="blue-light">Blue Light</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="indigo">Indigo</Badge>
          <Badge color="purple">Purple</Badge>
          <Badge color="pink">Pink</Badge>
          <Badge color="orange">Orange</Badge>
        </div>
      </div>
    </div>
  ),
};

// 5. Badge with Dot - 점 표시가 있는 Badge
export const WithDot: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Pill Color Type</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithDot type="pill-color" color="brand">Active</BadgeWithDot>
          <BadgeWithDot type="pill-color" color="success">Online</BadgeWithDot>
          <BadgeWithDot type="pill-color" color="error">Offline</BadgeWithDot>
          <BadgeWithDot type="pill-color" color="warning">Pending</BadgeWithDot>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Badge Color Type</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithDot type="color" color="brand" size="sm">Small</BadgeWithDot>
          <BadgeWithDot type="color" color="brand" size="md">Medium</BadgeWithDot>
          <BadgeWithDot type="color" color="brand" size="lg">Large</BadgeWithDot>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Type</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithDot type="modern" color="gray">Processing</BadgeWithDot>
        </div>
      </div>
    </div>
  ),
};

// 6. Badge with Icon - 아이콘이 있는 Badge
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Leading</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithIcon iconLeading={Star} color="brand">Featured</BadgeWithIcon>
          <BadgeWithIcon iconLeading={Mail} color="success">New Message</BadgeWithIcon>
          <BadgeWithIcon iconLeading={Bell} color="warning">Alert</BadgeWithIcon>
          <BadgeWithIcon iconLeading={Check} color="gray">Verified</BadgeWithIcon>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Trailing</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithIcon iconTrailing={Star} color="brand">Premium</BadgeWithIcon>
          <BadgeWithIcon iconTrailing={Check} color="success">Completed</BadgeWithIcon>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithIcon iconLeading={Star} color="brand" size="sm">Small</BadgeWithIcon>
          <BadgeWithIcon iconLeading={Star} color="brand" size="md">Medium</BadgeWithIcon>
          <BadgeWithIcon iconLeading={Star} color="brand" size="lg">Large</BadgeWithIcon>
        </div>
      </div>
    </div>
  ),
};

// 7. Badge with Flag - 국가 플래그가 있는 Badge
export const WithFlag: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Country Badges</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithFlag flag="US" color="brand">United States</BadgeWithFlag>
          <BadgeWithFlag flag="GB" color="brand">United Kingdom</BadgeWithFlag>
          <BadgeWithFlag flag="FR" color="brand">France</BadgeWithFlag>
          <BadgeWithFlag flag="DE" color="brand">Germany</BadgeWithFlag>
          <BadgeWithFlag flag="JP" color="brand">Japan</BadgeWithFlag>
          <BadgeWithFlag flag="KR" color="brand">South Korea</BadgeWithFlag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithFlag flag="US" color="gray" size="sm">Small</BadgeWithFlag>
          <BadgeWithFlag flag="US" color="gray" size="md">Medium</BadgeWithFlag>
          <BadgeWithFlag flag="US" color="gray" size="lg">Large</BadgeWithFlag>
        </div>
      </div>
    </div>
  ),
};

// 8. Badge with Image - 커스텀 이미지가 있는 Badge
export const WithImage: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Avatar Badges</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithImage
            imgSrc="https://i.pravatar.cc/32?img=1"
            color="brand"
          >
            John Doe
          </BadgeWithImage>
          <BadgeWithImage
            imgSrc="https://i.pravatar.cc/32?img=2"
            color="gray"
          >
            Jane Smith
          </BadgeWithImage>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithImage
            imgSrc="https://i.pravatar.cc/32?img=3"
            color="brand"
            size="sm"
          >
            Small
          </BadgeWithImage>
          <BadgeWithImage
            imgSrc="https://i.pravatar.cc/32?img=3"
            color="brand"
            size="md"
          >
            Medium
          </BadgeWithImage>
          <BadgeWithImage
            imgSrc="https://i.pravatar.cc/32?img=3"
            color="brand"
            size="lg"
          >
            Large
          </BadgeWithImage>
        </div>
      </div>
    </div>
  ),
};

// 9. Badge with Button - 닫기 버튼이 있는 Badge
export const WithButton: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Dismissible Badges</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithButton
            color="brand"
            buttonLabel="Remove badge"
            onButtonClick={() => alert('Badge removed')}
          >
            Removable
          </BadgeWithButton>
          <BadgeWithButton
            color="success"
            buttonLabel="Close notification"
            onButtonClick={() => alert('Notification closed')}
          >
            New Feature
          </BadgeWithButton>
          <BadgeWithButton
            color="error"
            buttonLabel="Dismiss error"
            onButtonClick={() => alert('Error dismissed')}
          >
            Error
          </BadgeWithButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Types</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithButton type="pill-color" color="brand">Pill Color</BadgeWithButton>
          <BadgeWithButton type="color" color="brand">Badge Color</BadgeWithButton>
          <BadgeWithButton type="modern" color="gray">Modern</BadgeWithButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithButton color="brand" size="sm">Small</BadgeWithButton>
          <BadgeWithButton color="brand" size="md">Medium</BadgeWithButton>
          <BadgeWithButton color="brand" size="lg">Large</BadgeWithButton>
        </div>
      </div>
    </div>
  ),
};

// 10. Icon Only Badge - 아이콘만 있는 Badge
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Different Colors</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeIcon icon={Star} color="brand" />
          <BadgeIcon icon={Check} color="success" />
          <BadgeIcon icon={Bell} color="warning" />
          <BadgeIcon icon={Mail} color="error" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeIcon icon={Star} color="brand" size="sm" />
          <BadgeIcon icon={Star} color="brand" size="md" />
          <BadgeIcon icon={Star} color="brand" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Different Types</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeIcon icon={Star} type="pill-color" color="brand" />
          <BadgeIcon icon={Star} type="color" color="brand" />
          <BadgeIcon icon={Star} type="modern" color="gray" />
        </div>
      </div>
    </div>
  ),
};

// 11. Type Comparison - 모든 타입 비교
export const TypeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Pill Color Type</h3>
        <div className="flex flex-wrap gap-3">
          <Badge type="pill-color" color="brand">Basic</Badge>
          <BadgeWithDot type="pill-color" color="brand">With Dot</BadgeWithDot>
          <BadgeWithIcon type="pill-color" color="brand" iconLeading={Star}>With Icon</BadgeWithIcon>
          <BadgeWithButton type="pill-color" color="brand">With Button</BadgeWithButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Badge Color Type</h3>
        <div className="flex flex-wrap gap-3">
          <Badge type="color" color="brand">Basic</Badge>
          <BadgeWithDot type="color" color="brand">With Dot</BadgeWithDot>
          <BadgeWithIcon type="color" color="brand" iconLeading={Star}>With Icon</BadgeWithIcon>
          <BadgeWithButton type="color" color="brand">With Button</BadgeWithButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Type</h3>
        <div className="flex flex-wrap gap-3">
          <Badge type="modern" color="gray">Basic</Badge>
          <BadgeWithDot type="modern" color="gray">With Dot</BadgeWithDot>
          <BadgeWithIcon type="modern" color="gray" iconLeading={Star}>With Icon</BadgeWithIcon>
          <BadgeWithButton type="modern" color="gray">With Button</BadgeWithButton>
        </div>
      </div>
    </div>
  ),
};

// 12. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    children: 'Label',
    type: 'pill-color',
    size: 'md',
    color: 'brand',
  },
  render: (args) => <Badge {...args} />,
};
