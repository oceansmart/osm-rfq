import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import {
  ArrowRight,
  Plus,
  Download,
  Trash,
  Star,
  Check,
  Send,
  Edit,
} from '@/commons/components/icons';

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size variant',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'link-gray',
        'link-color',
        'primary-destructive',
        'secondary-destructive',
        'tertiary-destructive',
        'link-destructive',
      ],
      description: 'Button color variant',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    showTextWhileLoading: {
      control: 'boolean',
      description: 'Keep text visible during loading',
    },
    iconLeading: {
      control: false,
      description: 'Icon to show before text',
    },
    iconTrailing: {
      control: false,
      description: 'Icon to show after text',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Default - 기본 Primary 버튼
export const Default: Story = {
  args: {
    children: 'Button',
    size: 'md',
    color: 'primary',
  },
};

// 2. All Sizes - 4가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <span className="text-sm text-gray-500">sm - px-3 py-2</span>
      </div>
      <div className="flex items-center gap-4">
        <Button size="md">Medium</Button>
        <span className="text-sm text-gray-500">md - px-3.5 py-2.5 (Default)</span>
      </div>
      <div className="flex items-center gap-4">
        <Button size="lg">Large</Button>
        <span className="text-sm text-gray-500">lg - px-4 py-2.5</span>
      </div>
      <div className="flex items-center gap-4">
        <Button size="xl">Extra Large</Button>
        <span className="text-sm text-gray-500">xl - px-4.5 py-3</span>
      </div>
    </div>
  ),
};

// 3. All Colors - 10가지 컬러 비교
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Primary Group */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Primary Group</h3>
        <div className="flex flex-wrap gap-3">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="tertiary">Tertiary</Button>
        </div>
      </div>

      {/* Link Group */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Link Group</h3>
        <div className="flex flex-wrap gap-3">
          <Button color="link-gray">Link Gray</Button>
          <Button color="link-color">Link Color</Button>
        </div>
      </div>

      {/* Destructive Group */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Destructive Group</h3>
        <div className="flex flex-wrap gap-3">
          <Button color="primary-destructive">Primary Destructive</Button>
          <Button color="secondary-destructive">Secondary Destructive</Button>
          <Button color="tertiary-destructive">Tertiary Destructive</Button>
          <Button color="link-destructive">Link Destructive</Button>
        </div>
      </div>
    </div>
  ),
};

// 4. With Icons - Leading/Trailing/Only 아이콘
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Leading</h3>
        <div className="flex gap-3">
          <Button iconLeading={ArrowRight}>Continue</Button>
          <Button iconLeading={Plus} color="secondary">
            Add New
          </Button>
          <Button iconLeading={Download} color="tertiary">
            Download
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Trailing</h3>
        <div className="flex gap-3">
          <Button iconTrailing={Send}>Send Message</Button>
          <Button iconTrailing={ArrowRight} color="link-color">
            Learn More
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Only</h3>
        <div className="flex gap-3">
          <Button iconLeading={Edit} size="sm" />
          <Button iconLeading={Star} size="md" />
          <Button iconLeading={Check} size="lg" color="secondary" />
          <Button iconLeading={Trash} size="xl" color="primary-destructive" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Both Icons</h3>
        <Button iconLeading={Download} iconTrailing={ArrowRight}>
          Download Report
        </Button>
      </div>
    </div>
  ),
};

// 5. States - Disabled/Loading 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default State</h3>
        <div className="flex gap-3">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="tertiary">Tertiary</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled State</h3>
        <div className="flex gap-3">
          <Button color="primary" isDisabled>
            Primary Disabled
          </Button>
          <Button color="secondary" isDisabled>
            Secondary Disabled
          </Button>
          <Button color="tertiary" isDisabled>
            Tertiary Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Loading State</h3>
        <div className="flex gap-3">
          <Button color="primary" isLoading>
            Loading
          </Button>
          <Button color="secondary" isLoading>
            Loading
          </Button>
          <Button color="tertiary" isLoading>
            Loading
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Loading with Text Visible</h3>
        <div className="flex gap-3">
          <Button color="primary" isLoading showTextWhileLoading>
            Loading...
          </Button>
          <Button color="secondary" isLoading showTextWhileLoading>
            Loading...
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 6. Link Variant - href prop 사용
export const LinkVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Button as Link</h3>
        <div className="flex gap-3">
          <Button href="https://example.com" color="primary">
            Primary Link
          </Button>
          <Button href="https://example.com" color="secondary">
            Secondary Link
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Link Colors</h3>
        <div className="flex gap-3">
          <Button href="https://example.com" color="link-gray">
            Link Gray
          </Button>
          <Button href="https://example.com" color="link-color">
            Link Color
          </Button>
          <Button href="https://example.com" color="link-destructive">
            Link Destructive
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled Link</h3>
        <Button href="https://example.com" color="primary" isDisabled>
          Disabled Link (href removed)
        </Button>
      </div>
    </div>
  ),
};

// 7. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    children: 'Click me',
    size: 'md',
    color: 'primary',
    isDisabled: false,
    isLoading: false,
    showTextWhileLoading: false,
  },
  render: (args) => <Button {...args} />,
};

// Additional: Size x Color Matrix
export const SizeColorMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex gap-3 items-center">
          <span className="w-8 text-sm text-gray-500">{size}</span>
          <Button size={size} color="primary">
            Primary
          </Button>
          <Button size={size} color="secondary">
            Secondary
          </Button>
          <Button size={size} color="tertiary">
            Tertiary
          </Button>
        </div>
      ))}
    </div>
  ),
};

// Additional: Destructive Variants
export const DestructiveVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Normal State</h3>
        <div className="flex gap-3">
          <Button color="primary-destructive">Delete</Button>
          <Button color="secondary-destructive">Remove</Button>
          <Button color="tertiary-destructive">Cancel</Button>
          <Button color="link-destructive">Delete permanently</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Icons</h3>
        <div className="flex gap-3">
          <Button color="primary-destructive" iconLeading={Trash}>
            Delete
          </Button>
          <Button color="secondary-destructive" iconTrailing={Trash}>
            Remove
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Loading State</h3>
        <div className="flex gap-3">
          <Button color="primary-destructive" isLoading>
            Deleting...
          </Button>
          <Button color="secondary-destructive" isLoading showTextWhileLoading>
            Removing...
          </Button>
        </div>
      </div>
    </div>
  ),
};
