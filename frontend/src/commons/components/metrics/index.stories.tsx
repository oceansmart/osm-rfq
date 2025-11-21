import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  MetricChangeIndicator,
  MetricsSimple,
  MetricsIcon01,
  MetricsIcon02,
  MetricsIcon03,
  MetricsIcon04,
  MetricsChart01,
  MetricsChart02,
  MetricsChart03,
  MetricsChart04,
} from './index';
import { TrendUp01, Eye, Zap } from '@untitledui/icons';

const meta: Meta<typeof MetricsSimple> = {
  title: 'Commons/Components/Metrics',
  component: MetricsSimple,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MetricsSimple>;

// ============================================================================
// MetricChangeIndicator Stories
// ============================================================================

export const ChangeIndicatorSimple: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Simple Indicator</h3>
        <div className="flex gap-4">
          <MetricChangeIndicator type="simple" trend="positive" value="12%" />
          <MetricChangeIndicator type="simple" trend="negative" value="8%" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Trend Indicator</h3>
        <div className="flex gap-4">
          <MetricChangeIndicator type="trend" trend="positive" value="12%" />
          <MetricChangeIndicator type="trend" trend="negative" value="8%" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Modern Indicator</h3>
        <div className="flex gap-4">
          <MetricChangeIndicator type="modern" trend="positive" value="12%" />
          <MetricChangeIndicator type="modern" trend="negative" value="8%" />
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// MetricsSimple Stories
// ============================================================================

export const SimpleMetrics: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <MetricsSimple
        title="2,420"
        subtitle="Total Views"
        type="simple"
        trend="positive"
        change="12%"
      />
      <MetricsSimple
        title="1,890"
        subtitle="Active Users"
        type="trend"
        trend="negative"
        change="8%"
      />
      <MetricsSimple
        title="3,200"
        subtitle="Conversions"
        type="modern"
        trend="positive"
        change="24%"
      />
    </div>
  ),
};

export const SimpleMetricsWithFooter: Story = {
  render: () => (
    <div className="w-[400px]">
      <MetricsSimple
        title="2,420"
        subtitle="Total Views"
        type="modern"
        trend="positive"
        change="12%"
        footer={
          <span className="text-sm text-tertiary">Updated 5 min ago</span>
        }
      />
    </div>
  ),
};

// ============================================================================
// MetricsIcon Stories
// ============================================================================

export const IconMetrics01: Story = {
  render: () => (
    <div className="w-[400px]">
      <MetricsIcon01
        title="2,420"
        subtitle="Total Revenue"
      />
    </div>
  ),
};

export const IconMetrics02: Story = {
  render: () => (
    <div className="w-[400px]">
      <MetricsIcon02
        title="1,890"
        subtitle="Active Campaigns"
      />
    </div>
  ),
};

export const IconMetrics03: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <MetricsIcon03
        icon={TrendUp01}
        title="2,420"
        subtitle="Total Sales"
        change="15%"
        changeTrend="positive"
        actions={true}
      />
      <MetricsIcon03
        icon={Eye}
        title="890"
        subtitle="Page Views"
        change="5%"
        changeTrend="negative"
        actions={true}
      />
    </div>
  ),
};

export const IconMetrics04: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <MetricsIcon04
        icon={Zap}
        title="3,200"
        subtitle="Energy Usage"
        change="18%"
        changeTrend="positive"
        actions={true}
      />
      <MetricsIcon04
        icon={TrendUp01}
        title="1,450"
        subtitle="Performance Score"
        change="3%"
        changeTrend="negative"
        actions={false}
      />
    </div>
  ),
};

// ============================================================================
// MetricsChart Stories
// ============================================================================

export const ChartMetrics01: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <MetricsChart01
        title="2,420"
        subtitle="Revenue Trend"
        change="12%"
        changeDescription="vs last month"
        trend="positive"
        actions={true}
      />
      <MetricsChart01
        title="890"
        subtitle="Traffic Decline"
        change="8%"
        changeDescription="vs last week"
        trend="negative"
        actions={true}
      />
    </div>
  ),
};

export const ChartMetrics02: Story = {
  render: () => (
    <div className="w-[400px]">
      <MetricsChart02
        icon={Eye}
        title="3,200"
        subtitle="User Engagement"
        change="24%"
        changeTrend="positive"
      />
    </div>
  ),
};

export const ChartMetrics03: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <MetricsChart03
        title="2,420"
        subtitle="Sales Performance"
        type="trend"
        change="15%"
        changeTrend="positive"
        changeDescription="vs last quarter"
      />
      <MetricsChart03
        title="1,890"
        subtitle="Customer Retention"
        type="modern"
        change="5%"
        changeTrend="negative"
        changeDescription="vs last month"
      />
    </div>
  ),
};

export const ChartMetrics04: Story = {
  render: () => (
    <div className="w-[400px]">
      <MetricsChart04
        title="3,200"
        subtitle="Monthly Growth"
        type="simple"
        change="18%"
        changeTrend="positive"
        changeDescription="vs previous period"
      />
    </div>
  ),
};

// ============================================================================
// All Variants Overview
// ============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Simple Metrics</h3>
        <MetricsSimple
          title="2,420"
          subtitle="Total Views"
          type="modern"
          trend="positive"
          change="12%"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Icon Metrics 01</h3>
        <MetricsIcon01
          title="1,890"
          subtitle="Revenue"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Icon Metrics 02</h3>
        <MetricsIcon02
          title="3,200"
          subtitle="Active Users"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Icon Metrics 03</h3>
        <MetricsIcon03
          icon={TrendUp01}
          title="2,650"
          subtitle="Conversions"
          change="24%"
          changeTrend="positive"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Icon Metrics 04</h3>
        <MetricsIcon04
          icon={Zap}
          title="1,450"
          subtitle="Performance"
          change="8%"
          changeTrend="positive"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Chart Metrics 01</h3>
        <MetricsChart01
          title="3,800"
          subtitle="Growth"
          change="15%"
          trend="positive"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Chart Metrics 02</h3>
        <MetricsChart02
          icon={Eye}
          title="2,100"
          subtitle="Engagement"
          change="12%"
          changeTrend="positive"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Chart Metrics 03</h3>
        <MetricsChart03
          title="4,200"
          subtitle="Analytics"
          change="18%"
          changeTrend="positive"
        />
      </div>
    </div>
  ),
};

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  args: {
    title: '2,420',
    subtitle: 'Total Views',
    type: 'modern',
    trend: 'positive',
    change: '12%',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['simple', 'trend', 'modern'],
      description: 'Change indicator type',
    },
    trend: {
      control: 'radio',
      options: ['positive', 'negative'],
      description: 'Trend direction',
    },
    title: {
      control: 'text',
      description: 'Main metric value',
    },
    subtitle: {
      control: 'text',
      description: 'Metric label',
    },
    change: {
      control: 'text',
      description: 'Change percentage',
    },
  },
};
