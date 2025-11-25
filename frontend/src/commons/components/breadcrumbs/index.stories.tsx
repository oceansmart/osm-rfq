import type { Meta, StoryObj } from '@storybook/nextjs';
import { Home, Settings, FileText, Users } from '@/commons/components/icons';
import { Breadcrumbs } from './index';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Commons/Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    divider: {
      control: 'radio',
      options: ['chevron', 'slash'],
      description: 'Divider type between breadcrumb items',
    },
    type: {
      control: 'radio',
      options: ['text', 'text-line', 'button'],
      description: 'Visual style of breadcrumbs',
    },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum number of visible items before collapsing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// 1. Default - 기본 breadcrumbs
export const Default: Story = {
  args: {
    divider: 'chevron',
    type: 'text',
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

// 2. Divider Types - 구분자 타입 비교
export const DividerTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">Chevron Divider (Default)</h3>
        <Breadcrumbs divider="chevron">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/category">Category</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Slash Divider</h3>
        <Breadcrumbs divider="slash">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/category">Category</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 3. Display Types - 표시 타입 비교
export const DisplayTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">Text (Default)</h3>
        <Breadcrumbs type="text">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Text with Line</h3>
        <Breadcrumbs type="text-line">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Button Style</h3>
        <Breadcrumbs type="button">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 4. With Icons - 아이콘이 있는 breadcrumbs
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">Text with Icons</h3>
        <Breadcrumbs type="text">
          <Breadcrumbs.Item href="/" icon={Home}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/settings" icon={Settings}>Settings</Breadcrumbs.Item>
          <Breadcrumbs.Item icon={FileText}>Documents</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Button with Icons</h3>
        <Breadcrumbs type="button">
          <Breadcrumbs.Item href="/" icon={Home}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/team" icon={Users}>Team</Breadcrumbs.Item>
          <Breadcrumbs.Item icon={Settings}>Settings</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Only (Home)</h3>
        <Breadcrumbs type="button">
          <Breadcrumbs.Item href="/" icon={Home} />
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 5. Max Visible Items - ellipsis로 축약
export const MaxVisibleItems: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div>
        <h3 className="text-sm font-semibold mb-3">All Items (8 items)</h3>
        <Breadcrumbs maxVisibleItems={10}>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level1">Level 1</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level2">Level 2</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level3">Level 3</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level4">Level 4</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level5">Level 5</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level6">Level 6</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Max 4 Items (Default) - Click &quot;...&quot; to expand</h3>
        <Breadcrumbs maxVisibleItems={4}>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level1">Level 1</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level2">Level 2</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level3">Level 3</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level4">Level 4</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level5">Level 5</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level6">Level 6</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Max 3 Items</h3>
        <Breadcrumbs maxVisibleItems={3}>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level1">Level 1</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level2">Level 2</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level3">Level 3</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/level4">Level 4</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 6. Short Paths - 짧은 경로
export const ShortPaths: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">2 Items</h3>
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Single Item</h3>
        <Breadcrumbs>
          <Breadcrumbs.Item>Home</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 7. Responsive Example - 반응형 예시
export const ResponsiveExample: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-semibold mb-4">Resize window to see responsive behavior</h3>
        <Breadcrumbs type="text-line">
          <Breadcrumbs.Item href="/" icon={Home}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/documentation">Documentation</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/navigation">Navigation</Breadcrumbs.Item>
          <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 8. Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">E-commerce Navigation</h3>
        <Breadcrumbs type="text">
          <Breadcrumbs.Item href="/" icon={Home}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/electronics">Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/laptops">Laptops</Breadcrumbs.Item>
          <Breadcrumbs.Item>MacBook Pro 16"</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Documentation Navigation</h3>
        <Breadcrumbs type="button" divider="slash">
          <Breadcrumbs.Item href="/" icon={Home}>Docs</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/guides">Guides</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
          <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Admin Dashboard</h3>
        <Breadcrumbs type="text-line">
          <Breadcrumbs.Item href="/dashboard" icon={Home}>Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/users" icon={Users}>Users</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/settings" icon={Settings}>Settings</Breadcrumbs.Item>
          <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// 9. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    divider: 'chevron',
    type: 'text',
    maxVisibleItems: 4,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Breadcrumbs {...args}>
        <Breadcrumbs.Item href="/" icon={Home}>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/category">Category</Breadcrumbs.Item>
        <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  ),
};
