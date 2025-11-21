import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBar, ProgressBarBase } from './index';

const meta: Meta<typeof ProgressBar> = {
  title: 'Commons/Components/ProgressIndicators',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    min: {
      control: 'number',
      description: 'Minimum value (default: 0)',
    },
    max: {
      control: 'number',
      description: 'Maximum value (default: 100)',
    },
    labelPosition: {
      control: 'radio',
      options: ['right', 'bottom', 'top-floating', 'bottom-floating'],
      description: 'Position of the value label',
    },
    valueFormatter: {
      control: false,
      description: 'Custom value formatter function',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for container',
    },
    progressClassName: {
      control: 'text',
      description: 'Additional CSS classes for progress indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// 1. Default - 기본 ProgressBar
export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <ProgressBarBase value={45} />
    </div>
  ),
};

// 2. WithDifferentValues - 다양한 진행률
export const WithDifferentValues: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">0% - Not Started</h3>
        <ProgressBarBase value={0} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">25% - Getting Started</h3>
        <ProgressBarBase value={25} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">50% - Half Way</h3>
        <ProgressBarBase value={50} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">75% - Almost There</h3>
        <ProgressBarBase value={75} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">100% - Complete</h3>
        <ProgressBarBase value={100} />
      </div>
    </div>
  ),
};

// 3. LabelPositions - Label 위치 비교
export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Label Right</h3>
        <ProgressBar value={65} labelPosition="right" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Label Bottom</h3>
        <ProgressBar value={65} labelPosition="bottom" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-6">Label Top Floating</h3>
        <ProgressBar value={65} labelPosition="top-floating" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Label Bottom Floating</h3>
        <ProgressBar value={65} labelPosition="bottom-floating" />
      </div>
    </div>
  ),
};

// 4. CustomFormatters - 사용자 정의 포맷터
export const CustomFormatters: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Default Format (Percentage)</h3>
        <ProgressBar value={45} labelPosition="right" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Custom Format - Fraction</h3>
        <ProgressBar
          value={45}
          labelPosition="right"
          valueFormatter={(value, percentage) => `${value}/100`}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Custom Format - Points</h3>
        <ProgressBar
          value={750}
          min={0}
          max={1000}
          labelPosition="right"
          valueFormatter={(value) => `${value} pts`}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Custom Format - MB</h3>
        <ProgressBar
          value={350}
          min={0}
          max={500}
          labelPosition="right"
          valueFormatter={(value, percentage) => `${value}MB / 500MB`}
        />
      </div>
    </div>
  ),
};

// 5. CustomRange - 사용자 정의 범위
export const CustomRange: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Range 0-100 (Default)</h3>
        <ProgressBar value={50} min={0} max={100} labelPosition="right" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Range 0-1000</h3>
        <ProgressBar
          value={500}
          min={0}
          max={1000}
          labelPosition="right"
          valueFormatter={(value) => `${value}/1000`}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Range 20-80</h3>
        <ProgressBar
          value={50}
          min={20}
          max={80}
          labelPosition="right"
          valueFormatter={(value) => `${value}`}
        />
      </div>
    </div>
  ),
};

// 6. Sizes - 높이 커스터마이징
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Extra Small (h-1)</h3>
        <ProgressBarBase value={65} className="h-1" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Small (h-2 - Default)</h3>
        <ProgressBarBase value={65} className="h-2" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Medium (h-3)</h3>
        <ProgressBarBase value={65} className="h-3" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Large (h-4)</h3>
        <ProgressBarBase value={65} className="h-4" />
      </div>
    </div>
  ),
};

// 7. Colors - 색상 커스터마이징
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default (Brand Primary)</h3>
        <ProgressBarBase value={65} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Success (Green)</h3>
        <ProgressBarBase value={65} progressClassName="bg-fg-success" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Warning (Yellow)</h3>
        <ProgressBarBase value={65} progressClassName="bg-fg-warning" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Error (Red)</h3>
        <ProgressBarBase value={65} progressClassName="bg-fg-error" />
      </div>
    </div>
  ),
};

// 8. UseCases - 실전 사용 예시
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">File Upload Progress</h3>
        <div className="p-6 border rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Uploading document.pdf</p>
            <p className="text-xs text-tertiary">Estimated time: 2 minutes</p>
          </div>
          <ProgressBar
            value={342}
            min={0}
            max={500}
            labelPosition="right"
            valueFormatter={(value, percentage) => `${percentage.toFixed(0)}%`}
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Profile Completion</h3>
        <div className="p-6 border rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Complete your profile</p>
            <p className="text-xs text-tertiary">3 out of 5 sections completed</p>
          </div>
          <ProgressBar
            value={3}
            min={0}
            max={5}
            labelPosition="right"
            valueFormatter={(value, percentage) => `${percentage.toFixed(0)}%`}
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Storage Usage</h3>
        <div className="p-6 border rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Storage Space</p>
            <p className="text-xs text-tertiary">7.5 GB of 15 GB used</p>
          </div>
          <ProgressBar
            value={7.5}
            min={0}
            max={15}
            labelPosition="bottom-floating"
            valueFormatter={(value) => `${value.toFixed(1)} GB`}
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Download Progress</h3>
        <div className="p-6 border rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Downloading software.zip</p>
            <p className="text-xs text-tertiary">450 MB / 1.2 GB</p>
          </div>
          <ProgressBar
            value={450}
            min={0}
            max={1200}
            labelPosition="top-floating"
            valueFormatter={(value, percentage) => `${percentage.toFixed(0)}%`}
          />
        </div>
      </div>
    </div>
  ),
};

// 9. Playground - 모든 props 조작 가능
export const Playground: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <ProgressBar {...args} />
    </div>
  ),
  args: {
    value: 65,
    min: 0,
    max: 100,
    labelPosition: 'right',
  },
};
