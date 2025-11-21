import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Avatar,
  AvatarLabelGroup,
  AvatarProfilePhoto,
  AvatarAddButton,
  AvatarCompanyIcon
} from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Commons/Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size variant',
    },
    src: {
      control: 'text',
      description: 'Image URL',
    },
    alt: {
      control: 'text',
      description: 'Image alt text',
    },
    initials: {
      control: 'text',
      description: 'Initials to display',
    },
    status: {
      control: 'radio',
      options: [undefined, 'online', 'offline'],
      description: 'Online/offline status indicator',
    },
    verified: {
      control: 'boolean',
      description: 'Show verified tick',
    },
    contrastBorder: {
      control: 'boolean',
      description: 'Show contrast border',
    },
    focusable: {
      control: 'boolean',
      description: 'Enable focus ring',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// 1. Default - 기본 Avatar
export const Default: Story = {
  args: {
    initials: 'OU',
    size: 'md',
  },
};

// 2. All Sizes - 7가지 사이즈 비교
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">XXS</h3>
        <Avatar initials="OU" size="xxs" />
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="Avatar" size="xxs" />
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">XS</h3>
        <Avatar initials="OU" size="xs" />
        <Avatar src="https://i.pravatar.cc/150?img=2" alt="Avatar" size="xs" />
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">SM</h3>
        <Avatar initials="OU" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="Avatar" size="sm" />
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">MD</h3>
        <Avatar initials="OU" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="Avatar" size="md" />
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">LG</h3>
        <Avatar initials="OU" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=5" alt="Avatar" size="lg" />
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">XL</h3>
        <Avatar initials="OU" size="xl" />
        <Avatar src="https://i.pravatar.cc/150?img=6" alt="Avatar" size="xl" />
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-semibold w-16">2XL</h3>
        <Avatar initials="OU" size="2xl" />
        <Avatar src="https://i.pravatar.cc/150?img=7" alt="Avatar" size="2xl" />
      </div>
    </div>
  ),
};

// 3. With Image - 이미지 포함
export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=11" alt="Olivia Rhye" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=12" alt="Phoenix Baker" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=13" alt="Lana Steiner" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=14" alt="Demi Wilkinson" size="md" />
    </div>
  ),
};

// 4. With Initials - 이니셜 표시
export const WithInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="OR" size="md" />
      <Avatar initials="PB" size="md" />
      <Avatar initials="LS" size="md" />
      <Avatar initials="DW" size="md" />
    </div>
  ),
};

// 5. With Status - 온라인/오프라인 상태
export const WithStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Online</h3>
        <div className="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/150?img=21" alt="Avatar" size="sm" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=22" alt="Avatar" size="md" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=23" alt="Avatar" size="lg" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=24" alt="Avatar" size="xl" status="online" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Offline</h3>
        <div className="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/150?img=25" alt="Avatar" size="sm" status="offline" />
          <Avatar src="https://i.pravatar.cc/150?img=26" alt="Avatar" size="md" status="offline" />
          <Avatar src="https://i.pravatar.cc/150?img=27" alt="Avatar" size="lg" status="offline" />
          <Avatar src="https://i.pravatar.cc/150?img=28" alt="Avatar" size="xl" status="offline" />
        </div>
      </div>
    </div>
  ),
};

// 6. With Badge - 회사 아이콘 배지
export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://i.pravatar.cc/150?img=31"
        alt="Avatar"
        size="md"
        badge={<AvatarCompanyIcon src="https://logo.clearbit.com/google.com" alt="Company" size="md" />}
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=32"
        alt="Avatar"
        size="lg"
        badge={<AvatarCompanyIcon src="https://logo.clearbit.com/microsoft.com" alt="Company" size="lg" />}
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=33"
        alt="Avatar"
        size="xl"
        badge={<AvatarCompanyIcon src="https://logo.clearbit.com/apple.com" alt="Company" size="xl" />}
      />
    </div>
  ),
};

// 7. With Verified - 인증 틱
export const WithVerified: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=41" alt="Avatar" size="sm" verified />
      <Avatar src="https://i.pravatar.cc/150?img=42" alt="Avatar" size="md" verified />
      <Avatar src="https://i.pravatar.cc/150?img=43" alt="Avatar" size="lg" verified />
      <Avatar src="https://i.pravatar.cc/150?img=44" alt="Avatar" size="xl" verified />
    </div>
  ),
};

// 8. Profile Photo - 프로필 사진 (대형)
export const ProfilePhoto: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">With Image</h3>
        <div className="flex items-center gap-4">
          <AvatarProfilePhoto src="https://i.pravatar.cc/300?img=51" alt="Profile" size="sm" />
          <AvatarProfilePhoto src="https://i.pravatar.cc/300?img=52" alt="Profile" size="md" />
          <AvatarProfilePhoto src="https://i.pravatar.cc/300?img=53" alt="Profile" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Initials</h3>
        <div className="flex items-center gap-4">
          <AvatarProfilePhoto initials="OR" size="sm" />
          <AvatarProfilePhoto initials="PB" size="md" />
          <AvatarProfilePhoto initials="LS" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Status & Verified</h3>
        <div className="flex items-center gap-4">
          <AvatarProfilePhoto src="https://i.pravatar.cc/300?img=54" alt="Profile" size="md" status="online" />
          <AvatarProfilePhoto src="https://i.pravatar.cc/300?img=55" alt="Profile" size="md" verified />
        </div>
      </div>
    </div>
  ),
};

// 9. Label Group - 라벨이 있는 아바타
export const LabelGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <AvatarLabelGroup
        src="https://i.pravatar.cc/150?img=61"
        alt="Olivia Rhye"
        size="sm"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />

      <AvatarLabelGroup
        src="https://i.pravatar.cc/150?img=62"
        alt="Phoenix Baker"
        size="md"
        title="Phoenix Baker"
        subtitle="Product Designer"
      />

      <AvatarLabelGroup
        src="https://i.pravatar.cc/150?img=63"
        alt="Lana Steiner"
        size="lg"
        title="Lana Steiner"
        subtitle="Software Engineer"
      />

      <AvatarLabelGroup
        initials="DW"
        size="xl"
        title="Demi Wilkinson"
        subtitle="Frontend Developer"
        status="online"
      />
    </div>
  ),
};

// 10. Add Button - 추가 버튼
export const AddButton: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Sizes</h3>
        <div className="flex items-center gap-4">
          <AvatarAddButton size="xs" />
          <AvatarAddButton size="sm" />
          <AvatarAddButton size="md" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Avatars</h3>
        <div className="flex items-center gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=71" alt="User 1" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=72" alt="User 2" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=73" alt="User 3" size="md" />
          <AvatarAddButton size="md" title="Add team member" />
        </div>
      </div>
    </div>
  ),
};

// 11. Use Cases - 실제 사용 예시
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[400px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Team Members</h3>
        <div className="flex flex-col gap-3">
          <AvatarLabelGroup
            src="https://i.pravatar.cc/150?img=81"
            alt="Olivia Rhye"
            size="md"
            title="Olivia Rhye"
            subtitle="Product Designer"
            status="online"
          />
          <AvatarLabelGroup
            src="https://i.pravatar.cc/150?img=82"
            alt="Phoenix Baker"
            size="md"
            title="Phoenix Baker"
            subtitle="Engineering Manager"
            verified
          />
          <AvatarLabelGroup
            initials="LS"
            size="md"
            title="Lana Steiner"
            subtitle="Software Engineer"
            status="offline"
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">User Profile</h3>
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <AvatarProfilePhoto
            src="https://i.pravatar.cc/300?img=85"
            alt="Profile"
            size="lg"
            verified
          />
          <div className="text-center">
            <h4 className="text-lg font-semibold">Olivia Rhye</h4>
            <p className="text-sm text-tertiary">olivia@untitledui.com</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// 12. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    initials: 'OU',
    size: 'md',
    contrastBorder: true,
    focusable: false,
  },
};
