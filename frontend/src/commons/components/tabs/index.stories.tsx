import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tabs } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Commons/Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample tab items
const horizontalTabs = [
  { id: 'tab1', label: 'My details', children: 'My details' },
  { id: 'tab2', label: 'Profile', children: 'Profile' },
  { id: 'tab3', label: 'Password', children: 'Password' },
  { id: 'tab4', label: 'Team', children: 'Team' },
  { id: 'tab5', label: 'Billing', children: 'Billing' },
];

const horizontalTabsWithBadge = [
  { id: 'tab1', label: 'My details', children: 'My details', badge: 8 },
  { id: 'tab2', label: 'Profile', children: 'Profile', badge: 12 },
  { id: 'tab3', label: 'Password', children: 'Password' },
  { id: 'tab4', label: 'Team', children: 'Team', badge: 3 },
  { id: 'tab5', label: 'Billing', children: 'Billing', badge: '99+' },
];

const verticalTabs = [
  { id: 'tab1', label: 'My details', children: 'My details' },
  { id: 'tab2', label: 'Profile', children: 'Profile' },
  { id: 'tab3', label: 'Password', children: 'Password' },
];

// ============================================================================
// Default Stories
// ============================================================================

export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <Tabs>
        <Tabs.List items={horizontalTabs} size="sm" type="button-brand" />
        <Tabs.Panel id="tab1">
          <div className="p-6 text-sm text-gray-700">
            My details panel content goes here.
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab2">
          <div className="p-6 text-sm text-gray-700">
            Profile panel content goes here.
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab3">
          <div className="p-6 text-sm text-gray-700">
            Password panel content goes here.
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab4">
          <div className="p-6 text-sm text-gray-700">
            Team panel content goes here.
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab5">
          <div className="p-6 text-sm text-gray-700">
            Billing panel content goes here.
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  ),
};

// ============================================================================
// Horizontal Types
// ============================================================================

export const HorizontalButtonBrand: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Brand - Small</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="sm" type="button-brand" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Brand - Medium</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="button-brand" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

export const HorizontalButtonGray: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Gray - Small</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="sm" type="button-gray" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Gray - Medium</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="button-gray" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

export const HorizontalButtonBorder: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Border - Small</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="sm" type="button-border" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Border - Medium</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="button-border" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

export const HorizontalButtonMinimal: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Minimal - Small</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="sm" type="button-minimal" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Minimal - Medium</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="button-minimal" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

export const HorizontalUnderline: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Underline - Small</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="sm" type="underline" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Underline - Medium</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="underline" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

// ============================================================================
// Vertical Types
// ============================================================================

export const VerticalButtonTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Brand</h3>
        <Tabs orientation="vertical">
          <Tabs.List items={verticalTabs} size="sm" type="button-brand" orientation="vertical" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">My details content</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Gray</h3>
        <Tabs orientation="vertical">
          <Tabs.List items={verticalTabs} size="sm" type="button-gray" orientation="vertical" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">My details content</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Border</h3>
        <Tabs orientation="vertical">
          <Tabs.List items={verticalTabs} size="sm" type="button-border" orientation="vertical" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">My details content</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Button Minimal</h3>
        <Tabs orientation="vertical">
          <Tabs.List items={verticalTabs} size="sm" type="button-minimal" orientation="vertical" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">My details content</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Line</h3>
        <Tabs orientation="vertical">
          <Tabs.List items={verticalTabs} size="sm" type="line" orientation="vertical" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">My details content</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

// ============================================================================
// With Badges
// ============================================================================

export const WithBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Horizontal with Badges</h3>
        <Tabs>
          <Tabs.List items={horizontalTabsWithBadge} size="md" type="button-gray" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Underline with Badges</h3>
        <Tabs>
          <Tabs.List items={horizontalTabsWithBadge} size="md" type="underline" />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

// ============================================================================
// Full Width
// ============================================================================

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Full Width - Button Gray</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="button-gray" fullWidth />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Full Width - Underline</h3>
        <Tabs>
          <Tabs.List items={horizontalTabs} size="md" type="underline" fullWidth />
          <Tabs.Panel id="tab1">
            <div className="p-6 text-sm text-gray-700">Content for My details</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

// ============================================================================
// All Variants Overview
// ============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Horizontal Types</h2>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Button Brand</p>
            <Tabs>
              <Tabs.List items={horizontalTabs} size="sm" type="button-brand" />
            </Tabs>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Button Gray</p>
            <Tabs>
              <Tabs.List items={horizontalTabs} size="sm" type="button-gray" />
            </Tabs>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Button Border</p>
            <Tabs>
              <Tabs.List items={horizontalTabs} size="sm" type="button-border" />
            </Tabs>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Button Minimal</p>
            <Tabs>
              <Tabs.List items={horizontalTabs} size="sm" type="button-minimal" />
            </Tabs>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Underline</p>
            <Tabs>
              <Tabs.List items={horizontalTabs} size="sm" type="underline" />
            </Tabs>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Vertical Types</h2>
        <div className="flex gap-6 flex-wrap">
          <Tabs orientation="vertical">
            <Tabs.List items={verticalTabs} size="sm" type="button-brand" orientation="vertical" />
          </Tabs>
          <Tabs orientation="vertical">
            <Tabs.List items={verticalTabs} size="sm" type="line" orientation="vertical" />
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">With Badges</h2>
        <Tabs>
          <Tabs.List items={horizontalTabsWithBadge} size="md" type="button-gray" />
        </Tabs>
      </div>
    </div>
  ),
};

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  args: {
    children: (
      <>
        <Tabs.List items={horizontalTabs} size="md" type="button-brand" />
        <Tabs.Panel id="tab1">
          <div className="p-6 text-sm text-gray-700">
            My details panel content
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab2">
          <div className="p-6 text-sm text-gray-700">
            Profile panel content
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tab3">
          <div className="p-6 text-sm text-gray-700">
            Password panel content
          </div>
        </Tabs.Panel>
      </>
    ),
  },
};
