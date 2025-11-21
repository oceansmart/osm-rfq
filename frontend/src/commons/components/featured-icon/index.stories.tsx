import type { Meta, StoryObj } from '@storybook/nextjs';
import { FeaturedIcon } from './index';
import {
  Star,
  Check,
  Trash,
  AlertTriangle,
  Download,
  Send,
  Edit,
  Plus,
} from '@/commons/components/icons';

const meta: Meta<typeof FeaturedIcon> = {
  title: 'Commons/Components/FeaturedIcon',
  component: FeaturedIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Icon container size',
    },
    color: {
      control: 'select',
      options: ['brand', 'gray', 'success', 'warning', 'error'],
      description: 'Color variant',
    },
    theme: {
      control: 'select',
      options: ['light', 'gradient', 'dark', 'outline', 'modern', 'modern-neue'],
      description: 'Visual theme variant',
    },
    icon: {
      control: false,
      description: 'Icon component or element to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeaturedIcon>;

// 1. Default - 기본 FeaturedIcon
export const Default: Story = {
  args: {
    icon: Star,
    size: 'md',
    color: 'brand',
    theme: 'light',
  },
};

// 2. All Sizes - 4가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <FeaturedIcon icon={Star} size="sm" color="brand" />
        <span className="text-sm text-gray-500">sm - 8x8 container</span>
      </div>
      <div className="flex items-center gap-4">
        <FeaturedIcon icon={Star} size="md" color="brand" />
        <span className="text-sm text-gray-500">md - 10x10 container (Default)</span>
      </div>
      <div className="flex items-center gap-4">
        <FeaturedIcon icon={Star} size="lg" color="brand" />
        <span className="text-sm text-gray-500">lg - 12x12 container</span>
      </div>
      <div className="flex items-center gap-4">
        <FeaturedIcon icon={Star} size="xl" color="brand" />
        <span className="text-sm text-gray-500">xl - 14x14 container</span>
      </div>
    </div>
  ),
};

// 3. All Themes - 6가지 테마 비교
export const AllThemes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Light Theme</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} theme="light" color="brand" />
          <FeaturedIcon icon={Check} theme="light" color="gray" />
          <FeaturedIcon icon={AlertTriangle} theme="light" color="warning" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Gradient Theme</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} theme="gradient" color="brand" />
          <FeaturedIcon icon={Check} theme="gradient" color="gray" />
          <FeaturedIcon icon={AlertTriangle} theme="gradient" color="warning" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Dark Theme</h3>
        <div className="flex gap-3 p-4 bg-gray-900 rounded">
          <FeaturedIcon icon={Star} theme="dark" color="brand" />
          <FeaturedIcon icon={Check} theme="dark" color="gray" />
          <FeaturedIcon icon={AlertTriangle} theme="dark" color="warning" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Outline Theme</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} theme="outline" color="brand" />
          <FeaturedIcon icon={Check} theme="outline" color="gray" />
          <FeaturedIcon icon={AlertTriangle} theme="outline" color="warning" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Theme</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} theme="modern" color="brand" />
          <FeaturedIcon icon={Check} theme="modern" color="gray" />
          <FeaturedIcon icon={AlertTriangle} theme="modern" color="warning" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Modern Neue Theme</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} theme="modern-neue" color="brand" />
          <FeaturedIcon icon={Check} theme="modern-neue" color="gray" />
          <FeaturedIcon icon={AlertTriangle} theme="modern-neue" color="warning" />
        </div>
      </div>
    </div>
  ),
};

// 4. All Colors - 5가지 색상 비교
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Light Theme Colors</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} color="brand" theme="light" />
          <FeaturedIcon icon={Check} color="gray" theme="light" />
          <FeaturedIcon icon={Check} color="success" theme="light" />
          <FeaturedIcon icon={AlertTriangle} color="warning" theme="light" />
          <FeaturedIcon icon={Trash} color="error" theme="light" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Gradient Theme Colors</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Star} color="brand" theme="gradient" />
          <FeaturedIcon icon={Check} color="gray" theme="gradient" />
          <FeaturedIcon icon={Check} color="success" theme="gradient" />
          <FeaturedIcon icon={AlertTriangle} color="warning" theme="gradient" />
          <FeaturedIcon icon={Trash} color="error" theme="gradient" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Dark Theme Colors</h3>
        <div className="flex gap-3 p-4 bg-gray-900 rounded">
          <FeaturedIcon icon={Star} color="brand" theme="dark" />
          <FeaturedIcon icon={Check} color="gray" theme="dark" />
          <FeaturedIcon icon={Check} color="success" theme="dark" />
          <FeaturedIcon icon={AlertTriangle} color="warning" theme="dark" />
          <FeaturedIcon icon={Trash} color="error" theme="dark" />
        </div>
      </div>
    </div>
  ),
};

// 5. With Various Icons - 다양한 아이콘 사용
export const WithVariousIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Success Icons</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Check} color="success" theme="light" />
          <FeaturedIcon icon={Check} color="success" theme="gradient" />
          <FeaturedIcon icon={Check} color="success" theme="outline" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Warning Icons</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={AlertTriangle} color="warning" theme="light" />
          <FeaturedIcon icon={AlertTriangle} color="warning" theme="gradient" />
          <FeaturedIcon icon={AlertTriangle} color="warning" theme="outline" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Error Icons</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Trash} color="error" theme="light" />
          <FeaturedIcon icon={Trash} color="error" theme="gradient" />
          <FeaturedIcon icon={Trash} color="error" theme="outline" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Action Icons</h3>
        <div className="flex gap-3">
          <FeaturedIcon icon={Download} color="brand" theme="light" />
          <FeaturedIcon icon={Send} color="brand" theme="light" />
          <FeaturedIcon icon={Edit} color="brand" theme="light" />
          <FeaturedIcon icon={Plus} color="brand" theme="light" />
        </div>
      </div>
    </div>
  ),
};

// 6. Size x Theme Matrix
export const SizeThemeMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex gap-3 items-center">
          <span className="w-8 text-sm text-gray-500">{size}</span>
          <FeaturedIcon icon={Star} size={size} theme="light" color="brand" />
          <FeaturedIcon icon={Star} size={size} theme="gradient" color="brand" />
          <FeaturedIcon icon={Star} size={size} theme="outline" color="brand" />
          <FeaturedIcon icon={Star} size={size} theme="modern" color="brand" />
        </div>
      ))}
    </div>
  ),
};

// 7. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    icon: Star,
    size: 'md',
    color: 'brand',
    theme: 'light',
  },
  render: (args) => <FeaturedIcon {...args} />,
};
