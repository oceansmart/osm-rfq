import type { Meta, StoryObj } from '@storybook/nextjs';
import { Home03, BarChart01, FileCheck02, Users01, Settings01, HelpCircle, LifeBuoy01 } from '@untitledui/icons';
import {
  NavList,
  NavItemButton,
  NavAccountCard,
  FeaturedCardProgressBar,
  FeaturedCardProgressCircle,
  MobileNavigationHeader,
  type NavItemType,
} from './index';

const meta: Meta = {
  title: 'Commons/Components/SidebarNavigationBase',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const sampleNavItems: NavItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home03,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart01,
    badge: '10',
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FileCheck02,
  },
  {
    label: 'Team',
    href: '/team',
    icon: Users01,
  },
];

const sampleNavItemsWithCollapsible: NavItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home03,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart01,
    badge: '10',
    items: [
      { label: 'Overview', href: '/dashboard/overview' },
      { label: 'Analytics', href: '/dashboard/analytics', badge: '5' },
      { label: 'Reports', href: '/dashboard/reports' },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FileCheck02,
    items: [
      { label: 'All Projects', href: '/projects/all' },
      { label: 'Active', href: '/projects/active', badge: '3' },
      { label: 'Archived', href: '/projects/archived' },
    ],
  },
  {
    label: 'Team',
    href: '/team',
    icon: Users01,
  },
];

const sampleNavItemsWithDividers: (NavItemType | { divider: true })[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home03,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart01,
  },
  { divider: true },
  {
    label: 'Projects',
    href: '/projects',
    icon: FileCheck02,
  },
  {
    label: 'Team',
    href: '/team',
    icon: Users01,
  },
  { divider: true },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings01,
  },
  {
    label: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
];

/**
 * ## Overview
 *
 * SidebarNavigationBase 컴포넌트는 애플리케이션의 사이드바 네비게이션을 구성하는 컴포넌트 모음입니다.
 *
 * ### 주요 컴포넌트
 * - **NavList**: 네비게이션 목록 (단순, 접을 수 있는, 구분선 지원)
 * - **NavItemButton**: 아이콘 버튼 네비게이션 (아이콘만 표시)
 * - **NavAccountCard**: 계정 카드 (계정 전환, 프로필 메뉴)
 * - **FeaturedCard**: 특징 카드 (프로그레스 바/서클)
 * - **MobileNavigationHeader**: 모바일 헤더 (햄버거 메뉴)
 */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-full max-w-xs">
      <div>
        <h3 className="text-md font-semibold mb-4">Simple Navigation</h3>
        <NavList activeUrl="/" items={sampleNavItems} />
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">With Collapsible Items</h3>
        <NavList activeUrl="/dashboard/analytics" items={sampleNavItemsWithCollapsible} />
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">With Dividers</h3>
        <NavList activeUrl="/dashboard" items={sampleNavItemsWithDividers} />
      </div>
    </div>
  ),
};

/**
 * ## Simple Navigation
 *
 * 가장 기본적인 네비게이션 목록입니다. 아이콘과 배지를 포함할 수 있습니다.
 */
export const SimpleNavigation: Story = {
  render: () => (
    <div className="w-64">
      <NavList activeUrl="/dashboard" items={sampleNavItems} />
    </div>
  ),
};

/**
 * ## Collapsible Navigation (Dual-tier)
 *
 * 하위 항목을 가진 접을 수 있는 네비게이션입니다.
 */
export const CollapsibleNavigation: Story = {
  render: () => (
    <div className="w-64">
      <NavList activeUrl="/dashboard/analytics" items={sampleNavItemsWithCollapsible} />
    </div>
  ),
};

/**
 * ## With Dividers
 *
 * 구분선으로 섹션을 나눈 네비게이션입니다.
 */
export const WithDividers: Story = {
  render: () => (
    <div className="w-64">
      <NavList activeUrl="/projects" items={sampleNavItemsWithDividers} />
    </div>
  ),
};

/**
 * ## Icon Button Navigation (Slim)
 *
 * 아이콘만 표시하는 콤팩트한 네비게이션 버튼입니다.
 */
export const IconButtonNavigation: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-16">
      <NavItemButton label="Home" href="/" icon={Home03} current={true} size="md" />
      <NavItemButton label="Dashboard" href="/dashboard" icon={BarChart01} size="md" />
      <NavItemButton label="Projects" href="/projects" icon={FileCheck02} size="md" />
      <NavItemButton label="Team" href="/team" icon={Users01} size="md" />
      <NavItemButton label="Settings" href="/settings" icon={Settings01} size="md" />
    </div>
  ),
};

/**
 * ## Large Icon Buttons
 *
 * 큰 크기(lg)의 아이콘 버튼입니다.
 */
export const LargeIconButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-16">
      <NavItemButton label="Home" href="/" icon={Home03} current={true} size="lg" />
      <NavItemButton label="Dashboard" href="/dashboard" icon={BarChart01} size="lg" />
      <NavItemButton label="Projects" href="/projects" icon={FileCheck02} size="lg" />
    </div>
  ),
};

/**
 * ## Account Card
 *
 * 사용자 계정 정보를 표시하고 계정 전환, 프로필 설정 등을 제공하는 카드입니다.
 */
export const AccountCard: Story = {
  render: () => (
    <div className="w-64">
      <NavAccountCard selectedAccountId="olivia" popoverPlacement="right bottom" />
    </div>
  ),
};

/**
 * ## Featured Card with Progress Bar
 *
 * 프로그레스 바를 포함한 특징 카드입니다. 사이드바 하단에 공지사항이나 진행 상황을 표시하는 데 사용됩니다.
 */
export const FeaturedCardWithProgressBar: Story = {
  render: () => (
    <div className="w-64">
      <FeaturedCardProgressBar
        title="Complete your profile"
        description={
          <>
            <span className="font-semibold">70%</span> completed. Finish your profile to unlock all features.
          </>
        }
        confirmLabel="Complete profile"
        progress={70}
        onDismiss={() => console.log('Dismissed')}
        onConfirm={() => console.log('Confirmed')}
      />
    </div>
  ),
};

/**
 * ## Featured Card with Progress Circle
 *
 * 프로그레스 서클을 포함한 특징 카드입니다.
 */
export const FeaturedCardWithProgressCircle: Story = {
  render: () => (
    <div className="w-64">
      <FeaturedCardProgressCircle
        title="Storage usage"
        description={
          <>
            <span className="font-semibold">8.5 GB</span> of 10 GB used. Upgrade for more storage.
          </>
        }
        confirmLabel="Upgrade plan"
        progress={85}
        onDismiss={() => console.log('Dismissed')}
        onConfirm={() => console.log('Confirmed')}
      />
    </div>
  ),
};

/**
 * ## Mobile Navigation Header
 *
 * 모바일 기기에서 사용되는 네비게이션 헤더입니다. 햄버거 메뉴를 클릭하면 전체 화면 오버레이로 네비게이션을 표시합니다.
 */
export const MobileNavigation: Story = {
  render: () => (
    <div className="w-full">
      <MobileNavigationHeader>
        <div className="h-full overflow-y-auto bg-primary">
          <NavList activeUrl="/dashboard" items={sampleNavItemsWithCollapsible} />
          <div className="px-4 mt-4">
            <NavAccountCard selectedAccountId="olivia" />
          </div>
        </div>
      </MobileNavigationHeader>
    </div>
  ),
};

/**
 * ## Complete Sidebar Example
 *
 * 모든 요소를 포함한 완전한 사이드바 예제입니다.
 */
export const CompleteSidebar: Story = {
  render: () => (
    <div className="flex h-screen w-64 flex-col bg-primary border-r border-secondary">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-6 pb-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid text-white font-semibold">
          U
        </div>
        <span className="text-lg font-semibold text-primary">Untitled UI</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <NavList activeUrl="/dashboard/analytics" items={sampleNavItemsWithCollapsible} />
      </div>

      {/* Featured Card */}
      <div className="px-4 py-4">
        <FeaturedCardProgressBar
          title="Complete your profile"
          description={
            <>
              <span className="font-semibold">70%</span> completed
            </>
          }
          confirmLabel="Complete"
          progress={70}
          onDismiss={() => {}}
          onConfirm={() => {}}
        />
      </div>

      {/* Account Card */}
      <div className="px-4 pb-6">
        <NavAccountCard selectedAccountId="olivia" popoverPlacement="top right" />
      </div>

      {/* Help & Support */}
      <div className="border-t border-secondary px-4 py-4">
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
            <HelpCircle className="size-5 text-fg-quaternary" />
            Help & Support
          </button>
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
            <LifeBuoy01 className="size-5 text-fg-quaternary" />
            Give feedback
          </button>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Use Cases
 *
 * 실제 사용 시나리오를 보여줍니다.
 */
export const UseCases: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Desktop Sidebar (Expanded)</h3>
        <div className="flex h-[600px] w-64 flex-col bg-primary border border-secondary rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 pt-6 pb-4">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid text-white font-semibold">
              U
            </div>
            <span className="text-lg font-semibold text-primary">Untitled UI</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavList activeUrl="/projects/active" items={sampleNavItemsWithCollapsible} />
          </div>
          <div className="px-4 pb-6">
            <NavAccountCard selectedAccountId="olivia" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Desktop Sidebar (Collapsed)</h3>
        <div className="flex h-[600px] w-20 flex-col items-center bg-primary border border-secondary rounded-xl overflow-hidden py-4">
          <div className="mb-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-solid text-white font-semibold text-lg">
              U
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <NavItemButton label="Home" href="/" icon={Home03} size="lg" />
            <NavItemButton label="Dashboard" href="/dashboard" icon={BarChart01} current={true} size="lg" />
            <NavItemButton label="Projects" href="/projects" icon={FileCheck02} size="lg" />
            <NavItemButton label="Team" href="/team" icon={Users01} size="lg" />
            <NavItemButton label="Settings" href="/settings" icon={Settings01} size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Playground
 *
 * 인터랙티브하게 네비게이션을 테스트할 수 있습니다.
 */
export const Playground: Story = {
  render: () => (
    <div className="w-64">
      <NavList activeUrl="/dashboard" items={sampleNavItemsWithCollapsible} />
    </div>
  ),
};
