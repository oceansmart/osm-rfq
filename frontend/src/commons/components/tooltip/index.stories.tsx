import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip, TooltipTrigger } from './index';
import { Info, Settings, AlertCircle } from '@/commons/components/icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Commons/Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the tooltip',
    },
    description: {
      control: 'text',
      description: 'The description of the tooltip',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show the arrow on the tooltip',
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before the tooltip is shown',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top start',
        'top end',
        'bottom',
        'bottom start',
        'bottom end',
        'left',
        'left start',
        'left end',
        'right',
        'right start',
        'right end',
      ],
      description: 'Placement of the tooltip relative to the trigger',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus'],
      description: 'Trigger type for showing the tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 1. Default - 기본 Tooltip
export const Default: Story = {
  args: {
    title: 'Tooltip title',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover me</button>
      </TooltipTrigger>
    </Tooltip>
  ),
};

// 2. All Placements - 12가지 위치 비교
export const AllPlacements: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-32">
      {/* Top Placements */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Top Placements</h3>
        <div className="flex gap-4">
          <Tooltip title="Top Start" placement="top start">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Top Start</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Top" placement="top">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Top</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Top End" placement="top end">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Top End</button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>

      {/* Bottom Placements */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Bottom Placements</h3>
        <div className="flex gap-4">
          <Tooltip title="Bottom Start" placement="bottom start">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Bottom Start</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Bottom" placement="bottom">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Bottom</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Bottom End" placement="bottom end">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Bottom End</button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>

      {/* Left Placements */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Left Placements</h3>
        <div className="flex gap-4">
          <Tooltip title="Left Top" placement="left top">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Left Top</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Left" placement="left">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Left</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Left Bottom" placement="left bottom">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Left Bottom</button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>

      {/* Right Placements */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Right Placements</h3>
        <div className="flex gap-4">
          <Tooltip title="Right Top" placement="right top">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Right Top</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Right" placement="right">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Right</button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip title="Right Bottom" placement="right bottom">
            <TooltipTrigger>
              <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Right Bottom</button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};

// 3. With Description - 제목 + 설명
export const WithDescription: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip title="Title Only" placement="top">
        <TooltipTrigger>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">Title Only</button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip
        title="Account Settings"
        description="Manage your account preferences, password, and security settings"
        placement="top"
      >
        <TooltipTrigger>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">With Description</button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  ),
};

// 4. With Arrow - 화살표 표시
export const WithArrow: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip title="Without Arrow" placement="top" arrow={false}>
        <TooltipTrigger>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">No Arrow</button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip title="With Arrow" placement="top" arrow={true}>
        <TooltipTrigger>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">With Arrow</button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip
        title="Arrow + Description"
        description="This tooltip has both arrow and description"
        placement="top"
        arrow={true}
      >
        <TooltipTrigger>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">Arrow + Description</button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  ),
};

// 5. Trigger Types - Hover/Focus 트리거
export const TriggerTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Hover Trigger (Default)</h3>
        <Tooltip title="Hover me" trigger="hover">
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Hover to show</button>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Focus Trigger</h3>
        <Tooltip title="Focus me" trigger="focus">
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Click/Tab to show</button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </div>
  ),
};

// 6. Delays - 표시/숨김 딜레이
export const Delays: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">No Delay</h3>
        <Tooltip title="Instant tooltip" delay={0} closeDelay={0}>
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Instant</button>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Default Delay (300ms)</h3>
        <Tooltip title="Default delay tooltip">
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Default (300ms)</button>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Long Delay (1000ms)</h3>
        <Tooltip title="Long delay tooltip" delay={1000}>
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Long (1000ms)</button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </div>
  ),
};

// 7. With Icons - 아이콘과 함께 사용
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip title="Information" description="This is an informational tooltip">
        <TooltipTrigger>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Info className="w-5 h-5 text-blue-500" />
          </button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip title="Settings" description="Configure your preferences and options">
        <TooltipTrigger>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip title="Alert" description="Action required: Please review your settings" arrow>
        <TooltipTrigger>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  ),
};

// 8. States - Disabled/Controlled
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Normal State</h3>
        <Tooltip title="Normal tooltip">
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Hover me</button>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled State</h3>
        <Tooltip title="This tooltip is disabled" isDisabled>
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
              Tooltip Disabled
            </button>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Always Open (Controlled)</h3>
        <Tooltip title="This tooltip is always visible" isOpen>
          <TooltipTrigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Always Open</button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </div>
  ),
};

// 9. Long Content - 긴 텍스트
export const LongContent: Story = {
  render: () => (
    <Tooltip
      title="Privacy Policy"
      description="We respect your privacy. Your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent. For more details, please review our full privacy policy document."
      placement="top"
      arrow
    >
      <TooltipTrigger>
        <button className="px-4 py-2 bg-gray-600 text-white rounded">View Privacy Info</button>
      </TooltipTrigger>
    </Tooltip>
  ),
};

// 10. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    title: 'Playground Tooltip',
    description: 'Try changing the props!',
    arrow: false,
    delay: 300,
    placement: 'top',
    trigger: 'hover',
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Interactive Tooltip</button>
      </TooltipTrigger>
    </Tooltip>
  ),
};
