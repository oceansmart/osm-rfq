import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tag, TagGroup, TagList } from './index';

const TagDocsExample = (args: React.ComponentProps<typeof Tag>) => (
  <TagGroup>
    <TagList>
      <Tag {...args} />
    </TagList>
  </TagGroup>
);

const meta: Meta<typeof TagDocsExample> = {
  title: 'Commons/Components/Tags',
  component: TagDocsExample,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size variant',
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'outlined-plain', 'subtle', 'plain'],
      description: 'Tag style variant',
    },
    color: {
      control: 'select',
      options: ['brand', 'gray', 'success', 'warning', 'error'],
      description: 'Tag color variant',
    },
    showRemoveButton: {
      control: 'boolean',
      description: 'Show remove button',
    },
    children: {
      control: 'text',
      description: 'Tag text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 Tag
export const Default: Story = {
  args: {
    children: 'Label',
    size: 'md',
    variant: 'outlined',
    color: 'gray',
    showRemoveButton: false,
  },
};

// 2. All Variants - 4가지 변형 비교
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag variant="outlined" color="brand">Outlined</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">outlined - Border + Background fill</span>
      </div>
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag variant="outlined-plain" color="brand">Outlined Plain</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">outlined-plain - Border + White background</span>
      </div>
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag variant="subtle" color="brand">Subtle</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">subtle - No border, light background</span>
      </div>
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag variant="plain" color="brand">Plain</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">plain - Text only, no background</span>
      </div>
    </div>
  ),
};

// 3. All Sizes - 3가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag size="sm" color="brand">Small</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">sm - px-2 py-0.5 text-xs</span>
      </div>
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag size="md" color="brand">Medium</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">md - px-2.5 py-1 text-sm (Default)</span>
      </div>
      <div className="flex items-center gap-4">
        <TagGroup>
          <TagList>
            <Tag size="lg" color="brand">Large</Tag>
          </TagList>
        </TagGroup>
        <span className="text-sm text-gray-500">lg - px-3 py-1.5 text-sm font-semibold</span>
      </div>
    </div>
  ),
};

// 4. All Colors - 5가지 컬러 비교
export const AllColors: Story = {
  render: () => (
    <TagGroup>
      <TagList className="flex flex-wrap gap-3">
        <Tag color="brand">Brand</Tag>
        <Tag color="gray">Gray</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="error">Error</Tag>
      </TagList>
    </TagGroup>
  ),
};

// 5. With Remove Button - 제거 버튼이 있는 태그
export const WithRemoveButton: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <TagGroup>
        <TagList>
          <Tag color="brand" showRemoveButton>
            Removable Tag
          </Tag>
        </TagList>
      </TagGroup>
      <div className="text-sm text-gray-500">Click the X button to remove</div>
    </div>
  ),
};

// 6. Color Matrix - Variant별 Color 조합
export const ColorMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Outlined variant */}
      <div>
        <div className="text-sm font-semibold mb-2 text-gray-700">Outlined</div>
        <TagGroup>
          <TagList className="flex flex-wrap gap-2">
            <Tag variant="outlined" color="brand">Brand</Tag>
            <Tag variant="outlined" color="gray">Gray</Tag>
            <Tag variant="outlined" color="success">Success</Tag>
            <Tag variant="outlined" color="warning">Warning</Tag>
            <Tag variant="outlined" color="error">Error</Tag>
          </TagList>
        </TagGroup>
      </div>

      {/* Outlined Plain variant */}
      <div>
        <div className="text-sm font-semibold mb-2 text-gray-700">Outlined Plain</div>
        <TagGroup>
          <TagList className="flex flex-wrap gap-2">
            <Tag variant="outlined-plain" color="brand">Brand</Tag>
            <Tag variant="outlined-plain" color="gray">Gray</Tag>
            <Tag variant="outlined-plain" color="success">Success</Tag>
            <Tag variant="outlined-plain" color="warning">Warning</Tag>
            <Tag variant="outlined-plain" color="error">Error</Tag>
          </TagList>
        </TagGroup>
      </div>

      {/* Subtle variant */}
      <div>
        <div className="text-sm font-semibold mb-2 text-gray-700">Subtle</div>
        <TagGroup>
          <TagList className="flex flex-wrap gap-2">
            <Tag variant="subtle" color="brand">Brand</Tag>
            <Tag variant="subtle" color="gray">Gray</Tag>
            <Tag variant="subtle" color="success">Success</Tag>
            <Tag variant="subtle" color="warning">Warning</Tag>
            <Tag variant="subtle" color="error">Error</Tag>
          </TagList>
        </TagGroup>
      </div>

      {/* Plain variant */}
      <div>
        <div className="text-sm font-semibold mb-2 text-gray-700">Plain</div>
        <TagGroup>
          <TagList className="flex flex-wrap gap-2">
            <Tag variant="plain" color="brand">Brand</Tag>
            <Tag variant="plain" color="gray">Gray</Tag>
            <Tag variant="plain" color="success">Success</Tag>
            <Tag variant="plain" color="warning">Warning</Tag>
            <Tag variant="plain" color="error">Error</Tag>
          </TagList>
        </TagGroup>
      </div>
    </div>
  ),
};

// 7. TagGroup - 라벨과 설명이 있는 태그 그룹
export const TagGroupExample: Story = {
  render: () => (
    <TagGroup label="Select categories" description="Choose one or more categories">
      <TagList>
        <Tag color="brand">Design</Tag>
        <Tag color="success">Development</Tag>
        <Tag color="warning">Marketing</Tag>
        <Tag color="error">Sales</Tag>
      </TagList>
    </TagGroup>
  ),
};

// 8. TagGroup with Remove - 제거 가능한 태그 그룹
export const TagGroupWithRemove: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = React.useState([
      { id: 1, name: 'React' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'Next.js' },
    ]);

    return (
      <TagGroup
        label="Selected technologies"
        description="Remove tags to deselect"
        onRemove={(keys) => {
          setSelectedTags((prev) => prev.filter((tag) => !keys.has(tag.id)));
        }}
      >
        <TagList items={selectedTags}>
          {(item) => <Tag color="brand">{item.name}</Tag>}
        </TagList>
      </TagGroup>
    );
  },
};

// 9. Size Comparison with Remove Button
export const SizeComparisonWithRemove: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <TagGroup>
        <TagList>
          <Tag size="sm" color="brand" showRemoveButton>Small Tag</Tag>
        </TagList>
      </TagGroup>
      <TagGroup>
        <TagList>
          <Tag size="md" color="brand" showRemoveButton>Medium Tag</Tag>
        </TagList>
      </TagGroup>
      <TagGroup>
        <TagList>
          <Tag size="lg" color="brand" showRemoveButton>Large Tag</Tag>
        </TagList>
      </TagGroup>
    </div>
  ),
};

// 10. Real World Example - 실제 사용 예시
export const RealWorldExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      {/* Product Tags */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-900">Product Tags</h3>
        <TagGroup>
          <TagList className="flex flex-wrap gap-2">
            <Tag variant="outlined" color="brand" showRemoveButton>New Arrival</Tag>
            <Tag variant="outlined" color="success" showRemoveButton>In Stock</Tag>
            <Tag variant="outlined" color="warning">Limited</Tag>
          </TagList>
        </TagGroup>
      </div>

      {/* Status Tags */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-900">Status</h3>
        <TagGroup>
          <TagList className="flex flex-wrap gap-2">
            <Tag variant="subtle" color="success" size="sm">Active</Tag>
            <Tag variant="subtle" color="gray" size="sm">Pending</Tag>
            <Tag variant="subtle" color="error" size="sm">Inactive</Tag>
          </TagList>
        </TagGroup>
      </div>

      {/* Filter Tags */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-900">Active Filters</h3>
        <TagGroup description="Click X to remove filters">
          <TagList>
            <Tag variant="outlined-plain" color="brand" showRemoveButton>Price: $0-$50</Tag>
            <Tag variant="outlined-plain" color="brand" showRemoveButton>Category: Electronics</Tag>
            <Tag variant="outlined-plain" color="brand" showRemoveButton>Rating: 4★ & up</Tag>
          </TagList>
        </TagGroup>
      </div>
    </div>
  ),
};
