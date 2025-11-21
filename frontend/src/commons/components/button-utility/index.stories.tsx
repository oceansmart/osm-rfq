import type { Meta, StoryObj } from '@storybook/nextjs';
import { ButtonUtility } from './index';
import {
  ArrowRight,
  Plus,
  Download,
  Trash,
  Star,
  Check,
  Send,
  Edit,
  Settings,
  MoreVertical,
  X,
} from '@/commons/components/icons';

const meta: Meta<typeof ButtonUtility> = {
  title: 'Commons/Components/ButtonUtility',
  component: ButtonUtility,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm'],
      description: 'Button size variant',
    },
    color: {
      control: 'select',
      options: ['secondary', 'tertiary'],
      description: 'Button color variant',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    icon: {
      control: false,
      description: 'Icon to display in the button',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text',
    },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip placement',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonUtility>;

// 1. Default - 기본 버튼
export const Default: Story = {
  args: {
    icon: Settings,
    size: 'sm',
    color: 'secondary',
  },
};

// 2. All Sizes - 2가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <ButtonUtility icon={Settings} size="xs" />
        <span className="text-sm text-gray-500">xs - Extra Small (16px icon)</span>
      </div>
      <div className="flex items-center gap-4">
        <ButtonUtility icon={Settings} size="sm" />
        <span className="text-sm text-gray-500">sm - Small (20px icon, Default)</span>
      </div>
    </div>
  ),
};

// 3. All Colors - 2가지 컬러 비교
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Secondary (Default)</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} color="secondary" />
          <ButtonUtility icon={Plus} color="secondary" />
          <ButtonUtility icon={Download} color="secondary" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Tertiary</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} color="tertiary" />
          <ButtonUtility icon={Plus} color="tertiary" />
          <ButtonUtility icon={Download} color="tertiary" />
        </div>
      </div>
    </div>
  ),
};

// 4. Common Icons - 자주 사용하는 아이콘
export const CommonIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Navigation & Actions</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={ArrowRight} />
          <ButtonUtility icon={Plus} />
          <ButtonUtility icon={Check} />
          <ButtonUtility icon={X} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">File Operations</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Download} />
          <ButtonUtility icon={Send} />
          <ButtonUtility icon={Edit} />
          <ButtonUtility icon={Trash} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">UI Controls</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} />
          <ButtonUtility icon={MoreVertical} />
          <ButtonUtility icon={Star} />
        </div>
      </div>
    </div>
  ),
};

// 5. With Tooltips - 툴팁과 함께
export const WithTooltips: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-16">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default Placement (Top)</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} tooltip="Settings" />
          <ButtonUtility icon={Download} tooltip="Download file" />
          <ButtonUtility icon={Trash} tooltip="Delete item" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">All Tooltip Placements</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} tooltip="Top placement" tooltipPlacement="top" />
          <ButtonUtility icon={Settings} tooltip="Right placement" tooltipPlacement="right" />
          <ButtonUtility icon={Settings} tooltip="Bottom placement" tooltipPlacement="bottom" />
          <ButtonUtility icon={Settings} tooltip="Left placement" tooltipPlacement="left" />
        </div>
      </div>
    </div>
  ),
};

// 6. States - Disabled
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Normal State</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} color="secondary" />
          <ButtonUtility icon={Download} color="tertiary" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled State</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={Settings} color="secondary" isDisabled />
          <ButtonUtility icon={Download} color="tertiary" isDisabled />
        </div>
      </div>
    </div>
  ),
};

// 7. As Link - href prop 사용
export const AsLink: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Button as Link</h3>
        <div className="flex gap-3">
          <ButtonUtility icon={ArrowRight} href="https://example.com" tooltip="Navigate to example.com" />
          <ButtonUtility icon={Download} href="/download" tooltip="Download" />
          <ButtonUtility icon={Settings} href="/settings" tooltip="Settings" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled Link</h3>
        <ButtonUtility icon={ArrowRight} href="https://example.com" isDisabled tooltip="Disabled link (href removed)" />
      </div>
    </div>
  ),
};

// 8. Size x Color Matrix
export const SizeColorMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['xs', 'sm'] as const).map((size) => (
        <div key={size} className="flex gap-3 items-center">
          <span className="w-8 text-sm text-gray-500">{size}</span>
          <ButtonUtility size={size} icon={Settings} color="secondary" />
          <ButtonUtility size={size} icon={Plus} color="tertiary" />
        </div>
      ))}
    </div>
  ),
};

// 9. Real Use Cases - 실제 사용 예시
export const RealUseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Table Row Actions</h3>
        <div className="flex items-center gap-1 p-2 border rounded">
          <span className="flex-1 text-sm">John Doe</span>
          <ButtonUtility icon={Edit} tooltip="Edit" size="xs" />
          <ButtonUtility icon={Download} tooltip="Download" size="xs" />
          <ButtonUtility icon={Trash} tooltip="Delete" size="xs" color="tertiary" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Header Toolbar</h3>
        <div className="flex items-center gap-2 p-3 border rounded">
          <h2 className="flex-1 font-semibold">Document Title</h2>
          <ButtonUtility icon={Star} tooltip="Add to favorites" />
          <ButtonUtility icon={Send} tooltip="Share" />
          <ButtonUtility icon={Download} tooltip="Download" />
          <ButtonUtility icon={MoreVertical} tooltip="More options" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Card Actions</h3>
        <div className="w-64 p-4 border rounded">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold">Card Title</h3>
            <ButtonUtility icon={MoreVertical} tooltip="Options" size="xs" color="tertiary" />
          </div>
          <p className="text-sm text-gray-600 mb-3">Card description goes here</p>
          <div className="flex gap-2">
            <ButtonUtility icon={Edit} tooltip="Edit" size="xs" />
            <ButtonUtility icon={Star} tooltip="Favorite" size="xs" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// 10. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    icon: Settings,
    size: 'sm',
    color: 'secondary',
    tooltip: 'Click me',
    tooltipPlacement: 'top',
    isDisabled: false,
  },
};
