import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBarCircle, ProgressBarHalfCircle } from './index';

const meta: Meta<typeof ProgressBarCircle> = {
  title: 'Commons/Components/ProgressCircles',
  component: ProgressBarCircle,
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
    size: {
      control: 'radio',
      options: ['xxs', 'xs', 'sm', 'md', 'lg'],
      description: 'Size of the circle',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
    valueFormatter: {
      control: false,
      description: 'Custom value formatter function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBarCircle>;

// 1. Default - 기본 ProgressBarCircle
export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-8">
      <ProgressBarCircle value={65} size="md" />
    </div>
  ),
};

// 2. Sizes - 크기 비교 (Circle)
export const CircleSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">XXS</h3>
        <ProgressBarCircle value={65} size="xxs" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">XS</h3>
        <ProgressBarCircle value={65} size="xs" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">SM</h3>
        <ProgressBarCircle value={65} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">MD</h3>
        <ProgressBarCircle value={65} size="md" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">LG</h3>
        <ProgressBarCircle value={65} size="lg" />
      </div>
    </div>
  ),
};

// 3. Sizes - 크기 비교 (HalfCircle)
export const HalfCircleSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">XXS</h3>
        <ProgressBarHalfCircle value={65} size="xxs" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">XS</h3>
        <ProgressBarHalfCircle value={65} size="xs" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">SM</h3>
        <ProgressBarHalfCircle value={65} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">MD</h3>
        <ProgressBarHalfCircle value={65} size="md" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold">LG</h3>
        <ProgressBarHalfCircle value={65} size="lg" />
      </div>
    </div>
  ),
};

// 4. WithLabels - Label 표시
export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-16 p-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold mb-2">Circle with Label</h3>
        <ProgressBarCircle value={65} size="md" label="Completed" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold mb-2">HalfCircle with Label</h3>
        <ProgressBarHalfCircle value={65} size="md" label="Progress" />
      </div>
    </div>
  ),
};

// 5. WithDifferentValues - 다양한 진행률
export const WithDifferentValues: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xs font-semibold text-tertiary">0%</h3>
        <ProgressBarCircle value={0} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xs font-semibold text-tertiary">25%</h3>
        <ProgressBarCircle value={25} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xs font-semibold text-tertiary">50%</h3>
        <ProgressBarCircle value={50} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xs font-semibold text-tertiary">75%</h3>
        <ProgressBarCircle value={75} size="sm" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xs font-semibold text-tertiary">100%</h3>
        <ProgressBarCircle value={100} size="sm" />
      </div>
    </div>
  ),
};

// 6. CustomFormatters - 사용자 정의 포맷터
export const CustomFormatters: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-16 p-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold mb-2">Default Format</h3>
        <ProgressBarCircle value={65} size="md" label="Progress" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold mb-2">Fraction Format</h3>
        <ProgressBarCircle
          value={65}
          size="md"
          label="Tasks"
          valueFormatter={(value) => `${value}/100`}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-semibold mb-2">Points Format</h3>
        <ProgressBarCircle
          value={750}
          min={0}
          max={1000}
          size="md"
          label="Score"
          valueFormatter={(value) => `${value}`}
        />
      </div>
    </div>
  ),
};

// 7. Comparison - Circle vs HalfCircle
export const Comparison: Story = {
  render: () => (
    <div className="flex flex-col gap-12 p-8">
      <div>
        <h3 className="text-md font-semibold mb-6 text-center">Full Circle Progress</h3>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <ProgressBarCircle value={25} size="sm" label="25%" />
          <ProgressBarCircle value={50} size="sm" label="50%" />
          <ProgressBarCircle value={75} size="sm" label="75%" />
          <ProgressBarCircle value={100} size="sm" label="100%" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-6 text-center">Half Circle Progress</h3>
        <div className="flex flex-wrap items-end justify-center gap-12">
          <ProgressBarHalfCircle value={25} size="sm" label="25%" />
          <ProgressBarHalfCircle value={50} size="sm" label="50%" />
          <ProgressBarHalfCircle value={75} size="sm" label="75%" />
          <ProgressBarHalfCircle value={100} size="sm" label="100%" />
        </div>
      </div>
    </div>
  ),
};

// 8. UseCases - 실전 사용 예시
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[800px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Skills Proficiency</h3>
        <div className="p-6 border rounded-lg">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={90}
                size="md"
                label="React"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={75}
                size="md"
                label="TypeScript"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={60}
                size="md"
                label="Node.js"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Daily Goals</h3>
        <div className="p-6 border rounded-lg">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="flex flex-col items-center gap-3">
              <ProgressBarHalfCircle
                value={8}
                min={0}
                max={10}
                size="sm"
                label="Water"
                valueFormatter={(value) => `${value} cups`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarHalfCircle
                value={7500}
                min={0}
                max={10000}
                size="sm"
                label="Steps"
                valueFormatter={(value) => `${value}`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarHalfCircle
                value={45}
                min={0}
                max={60}
                size="sm"
                label="Exercise"
                valueFormatter={(value) => `${value} min`}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Project Status Dashboard</h3>
        <div className="p-6 border rounded-lg">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={85}
                size="xs"
                label="Backend"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={92}
                size="xs"
                label="Frontend"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={68}
                size="xs"
                label="Testing"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBarCircle
                value={45}
                size="xs"
                label="Docs"
                valueFormatter={(value) => `${value}%`}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Fitness Tracker</h3>
        <div className="p-6 border rounded-lg">
          <div className="flex justify-center">
            <ProgressBarCircle
              value={1250}
              min={0}
              max={2000}
              size="lg"
              label="Calories Burned"
              valueFormatter={(value) => `${value} cal`}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// 9. Playground - Circle
export const PlaygroundCircle: Story = {
  render: (args) => (
    <div className="flex justify-center p-8">
      <ProgressBarCircle {...args} />
    </div>
  ),
  args: {
    value: 65,
    min: 0,
    max: 100,
    size: 'md',
    label: 'Progress',
  },
};

// 10. Playground - HalfCircle
export const PlaygroundHalfCircle: Story = {
  render: (args) => (
    <div className="flex justify-center p-8">
      <ProgressBarHalfCircle {...args} />
    </div>
  ),
  args: {
    value: 65,
    min: 0,
    max: 100,
    size: 'md',
    label: 'Progress',
  },
};
