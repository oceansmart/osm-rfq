import type { Meta, StoryObj } from '@storybook/nextjs';
import { Slider } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Commons/Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    labelPosition: {
      control: 'radio',
      options: ['default', 'bottom', 'top-floating'],
      description: 'Position of the value label',
    },
    minValue: {
      control: 'number',
      description: 'Minimum slider value',
    },
    maxValue: {
      control: 'number',
      description: 'Maximum slider value',
    },
    defaultValue: {
      control: 'number',
      description: 'Default slider value',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the slider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// 1. Default - 기본 슬라이더
export const Default: Story = {
  args: {
    defaultValue: 50,
    minValue: 0,
    maxValue: 100,
    labelPosition: 'default',
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
};

// 2. Label Positions - 라벨 위치 비교
export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-4">Default (Hidden)</h3>
        <Slider defaultValue={50} labelPosition="default" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Bottom</h3>
        <Slider defaultValue={50} labelPosition="bottom" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Top Floating</h3>
        <Slider defaultValue={50} labelPosition="top-floating" />
      </div>
    </div>
  ),
};

// 3. Range Values - 다양한 값 범위
export const RangeValues: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">0-100 (Default)</h3>
        <Slider defaultValue={50} labelPosition="bottom" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">0-10</h3>
        <Slider
          defaultValue={5}
          minValue={0}
          maxValue={10}
          labelPosition="bottom"
          labelFormatter={(value) => `${value}`}
          formatOptions={undefined}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">1-5 (Star Rating)</h3>
        <Slider
          defaultValue={3}
          minValue={1}
          maxValue={5}
          step={1}
          labelPosition="bottom"
          labelFormatter={(value) => `${'⭐'.repeat(value)}`}
          formatOptions={undefined}
        />
      </div>
    </div>
  ),
};

// 4. Custom Formatters - 커스텀 라벨 포맷
export const CustomFormatters: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Percentage (Default)</h3>
        <Slider defaultValue={75} labelPosition="top-floating" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Currency</h3>
        <Slider
          defaultValue={50}
          labelPosition="top-floating"
          labelFormatter={(value) => `$${value}`}
          formatOptions={undefined}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Temperature</h3>
        <Slider
          defaultValue={22}
          minValue={0}
          maxValue={40}
          labelPosition="top-floating"
          labelFormatter={(value) => `${value}°C`}
          formatOptions={undefined}
        />
      </div>
    </div>
  ),
};

// 5. States - 슬라이더 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default</h3>
        <Slider defaultValue={50} labelPosition="bottom" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Disabled</h3>
        <Slider defaultValue={50} labelPosition="bottom" isDisabled />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Min Value</h3>
        <Slider defaultValue={0} labelPosition="bottom" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Max Value</h3>
        <Slider defaultValue={100} labelPosition="bottom" />
      </div>
    </div>
  ),
};

// 6. Range Slider (Two Thumbs)
export const RangeSlider: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <Slider
          defaultValue={[25, 75]}
          labelPosition="top-floating"
          labelFormatter={(value) => `$${value}`}
          formatOptions={undefined}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Temperature Range</h3>
        <Slider
          defaultValue={[18, 24]}
          minValue={0}
          maxValue={40}
          labelPosition="top-floating"
          labelFormatter={(value) => `${value}°C`}
          formatOptions={undefined}
        />
      </div>
    </div>
  ),
};

// 7. Step Intervals - 단계별 증가
export const StepIntervals: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-80">
      <div>
        <h3 className="text-sm font-semibold mb-2">Step: 1 (Default)</h3>
        <Slider defaultValue={50} labelPosition="bottom" step={1} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Step: 10</h3>
        <Slider defaultValue={50} labelPosition="bottom" step={10} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Step: 25</h3>
        <Slider defaultValue={50} labelPosition="bottom" step={25} />
      </div>
    </div>
  ),
};

// 8. Interactive Example - 실제 사용 예시
export const InteractiveExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 border rounded-lg max-w-md">
      <h3 className="text-lg font-semibold">Volume Control</h3>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Master Volume</label>
          <Slider
            defaultValue={70}
            labelPosition="top-floating"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Music</label>
          <Slider
            defaultValue={80}
            labelPosition="top-floating"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Effects (Disabled)</label>
          <Slider
            defaultValue={50}
            labelPosition="top-floating"
            isDisabled
          />
        </div>
      </div>
    </div>
  ),
};

// 9. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    defaultValue: 50,
    minValue: 0,
    maxValue: 100,
    step: 1,
    labelPosition: 'top-floating',
    isDisabled: false,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
};
