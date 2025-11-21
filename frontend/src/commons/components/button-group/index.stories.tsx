import type { Meta, StoryObj } from '@storybook/nextjs';
import { ButtonGroup, ButtonGroupItem } from './index';
import {
  ArrowRight,
  Plus,
  Download,
  Trash,
  Star,
  Check,
} from '@/commons/components/icons';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Commons/Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'ButtonGroup size variant',
    },
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Selection mode for button group',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables all buttons in the group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// 1. Default - 기본 ButtonGroup
export const Default: Story = {
  args: {
    size: 'md',
    selectionMode: 'single',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="left">Left</ButtonGroupItem>
      <ButtonGroupItem id="center">Center</ButtonGroupItem>
      <ButtonGroupItem id="right">Right</ButtonGroupItem>
    </ButtonGroup>
  ),
};

// 2. All Sizes - 3가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex items-center gap-4">
        <ButtonGroup size="sm">
          <ButtonGroupItem id="1">Small</ButtonGroupItem>
          <ButtonGroupItem id="2">Group</ButtonGroupItem>
          <ButtonGroupItem id="3">Buttons</ButtonGroupItem>
        </ButtonGroup>
        <span className="text-sm text-gray-500">sm - gap-1.5 px-3.5 py-2</span>
      </div>

      <div className="flex items-center gap-4">
        <ButtonGroup size="md">
          <ButtonGroupItem id="1">Medium</ButtonGroupItem>
          <ButtonGroupItem id="2">Group</ButtonGroupItem>
          <ButtonGroupItem id="3">Buttons</ButtonGroupItem>
        </ButtonGroup>
        <span className="text-sm text-gray-500">md - gap-1.5 px-4 py-2.5 (Default)</span>
      </div>

      <div className="flex items-center gap-4">
        <ButtonGroup size="lg">
          <ButtonGroupItem id="1">Large</ButtonGroupItem>
          <ButtonGroupItem id="2">Group</ButtonGroupItem>
          <ButtonGroupItem id="3">Buttons</ButtonGroupItem>
        </ButtonGroup>
        <span className="text-sm text-gray-500">lg - gap-2 px-4.5 py-2.5</span>
      </div>
    </div>
  ),
};

// 3. With Icons - Leading/Trailing/Only 아이콘
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Leading</h3>
        <ButtonGroup>
          <ButtonGroupItem id="download" iconLeading={Download}>
            Download
          </ButtonGroupItem>
          <ButtonGroupItem id="upload" iconLeading={Plus}>
            Upload
          </ButtonGroupItem>
          <ButtonGroupItem id="delete" iconLeading={Trash}>
            Delete
          </ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Trailing</h3>
        <ButtonGroup>
          <ButtonGroupItem id="prev" iconTrailing={ArrowRight}>
            Previous
          </ButtonGroupItem>
          <ButtonGroupItem id="next" iconTrailing={ArrowRight}>
            Next
          </ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Only</h3>
        <ButtonGroup>
          <ButtonGroupItem id="star" iconLeading={Star} />
          <ButtonGroupItem id="check" iconLeading={Check} />
          <ButtonGroupItem id="trash" iconLeading={Trash} />
        </ButtonGroup>
      </div>
    </div>
  ),
};

// 4. States - Selected/Disabled 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default State</h3>
        <ButtonGroup>
          <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
          <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
          <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Default Selection</h3>
        <ButtonGroup defaultSelectedKeys={["2"]}>
          <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
          <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
          <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled Group</h3>
        <ButtonGroup isDisabled>
          <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
          <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
          <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Individual Disabled Items</h3>
        <ButtonGroup>
          <ButtonGroupItem id="1">Enabled</ButtonGroupItem>
          <ButtonGroupItem id="2" isDisabled>
            Disabled
          </ButtonGroupItem>
          <ButtonGroupItem id="3">Enabled</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// 5. Selection Modes
export const SelectionModes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Single Selection (Default)</h3>
        <ButtonGroup selectionMode="single">
          <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
          <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
          <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Multiple Selection</h3>
        <ButtonGroup selectionMode="multiple">
          <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
          <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
          <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// 6. Use Cases - 실제 사용 사례
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Text Alignment</h3>
        <ButtonGroup size="sm">
          <ButtonGroupItem id="left">Left</ButtonGroupItem>
          <ButtonGroupItem id="center">Center</ButtonGroupItem>
          <ButtonGroupItem id="right">Right</ButtonGroupItem>
          <ButtonGroupItem id="justify">Justify</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">View Mode Selector</h3>
        <ButtonGroup defaultSelectedKeys={["grid"]}>
          <ButtonGroupItem id="list">List</ButtonGroupItem>
          <ButtonGroupItem id="grid">Grid</ButtonGroupItem>
          <ButtonGroupItem id="timeline">Timeline</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Filter Options</h3>
        <ButtonGroup selectionMode="multiple" size="sm">
          <ButtonGroupItem id="active">Active</ButtonGroupItem>
          <ButtonGroupItem id="pending">Pending</ButtonGroupItem>
          <ButtonGroupItem id="completed">Completed</ButtonGroupItem>
          <ButtonGroupItem id="archived">Archived</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// 7. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    size: 'md',
    selectionMode: 'single',
    isDisabled: false,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="1">Option 1</ButtonGroupItem>
      <ButtonGroupItem id="2">Option 2</ButtonGroupItem>
      <ButtonGroupItem id="3">Option 3</ButtonGroupItem>
    </ButtonGroup>
  ),
};
