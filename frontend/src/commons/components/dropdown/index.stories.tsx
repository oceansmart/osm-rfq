import type { Meta, StoryObj } from '@storybook/nextjs';
import { Dropdown } from './index';
import {
  Settings01 as Settings,
  User01 as User,
  Edit05 as Edit,
  Trash01 as Trash,
  Download01 as Download,
  Copy01 as Copy,
  Star01 as Star,
  File02 as File,
  FolderClosed as Folder,
  SearchLg as Search,
} from '@untitledui/icons';

const meta: Meta<typeof Dropdown.Root> = {
  title: 'Commons/Components/Dropdown',
  component: Dropdown.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown.Root>;

// 1. Default - 기본 Dropdown
export const Default: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Edit" icon={Edit} />
          <Dropdown.Item label="Duplicate" icon={Copy} />
          <Dropdown.Item label="Folder" icon={Folder} />
          <Dropdown.Separator />
          <Dropdown.Item label="Delete" icon={Trash} />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 2. With Icons - 아이콘이 있는 메뉴 아이템
export const WithIcons: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Profile" icon={User} />
          <Dropdown.Item label="Settings" icon={Settings} />
          <Dropdown.Item label="Favorites" icon={Star} />
          <Dropdown.Separator />
          <Dropdown.Item label="Download" icon={Download} />
          <Dropdown.Item label="Copy" icon={Copy} />
          <Dropdown.Separator />
          <Dropdown.Item label="Logout" icon={User} />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 3. With Addons - Badge/카운터가 있는 아이템
export const WithAddons: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Messages" icon={User} addon="12" />
          <Dropdown.Item label="Notifications" icon={Settings} addon="3" />
          <Dropdown.Item label="Updates" icon={Download} addon="New" />
          <Dropdown.Separator />
          <Dropdown.Item label="Folder" icon={Folder} addon="99+" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 4. Disabled Items - 비활성화된 아이템
export const DisabledItems: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Edit" icon={Edit} />
          <Dropdown.Item label="Duplicate" icon={Copy} isDisabled />
          <Dropdown.Item label="Folder" icon={Folder} />
          <Dropdown.Separator />
          <Dropdown.Item label="Delete" icon={Trash} isDisabled />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 5. With Sections - 섹션으로 그룹화
export const WithSections: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.SectionHeader>Account</Dropdown.SectionHeader>
            <Dropdown.Item label="Profile" icon={User} />
            <Dropdown.Item label="Settings" icon={Settings} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Actions</Dropdown.SectionHeader>
            <Dropdown.Item label="Edit" icon={Edit} />
            <Dropdown.Item label="Download" icon={Download} />
            <Dropdown.Item label="Copy" icon={Copy} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Danger Zone</Dropdown.SectionHeader>
            <Dropdown.Item label="Folder" icon={Folder} />
            <Dropdown.Item label="Delete" icon={Trash} />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 6. Icon Only Items - 아이콘만 있는 아이템
export const IconOnlyItems: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item icon={Edit} aria-label="Edit">
            {(state) => <span className="sr-only">Edit</span>}
          </Dropdown.Item>
          <Dropdown.Item icon={Copy} aria-label="Copy">
            {(state) => <span className="sr-only">Copy</span>}
          </Dropdown.Item>
          <Dropdown.Item icon={Download} aria-label="Download">
            {(state) => <span className="sr-only">Download</span>}
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item icon={Trash} aria-label="Delete">
            {(state) => <span className="sr-only">Delete</span>}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 7. Use Cases - 실제 사용 사례
export const UseCases: Story = {
  render: () => (
    <div className="flex gap-8">
      {/* User Menu */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">User Menu</h3>
        <Dropdown.Root>
          <Dropdown.DotsButton />
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item label="Profile" icon={User} />
              <Dropdown.Item label="Settings" icon={Settings} />
              <Dropdown.Separator />
              <Dropdown.Item label="Logout" icon={User} />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      {/* Actions Menu */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Actions Menu</h3>
        <Dropdown.Root>
          <Dropdown.DotsButton />
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item label="Edit" icon={Edit} />
              <Dropdown.Item label="Duplicate" icon={Copy} />
              <Dropdown.Item label="Download" icon={Download} />
              <Dropdown.Item label="Copy" icon={Copy} />
              <Dropdown.Separator />
              <Dropdown.Item label="Folder" icon={Folder} />
              <Dropdown.Item label="Delete" icon={Trash} />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      {/* Notifications Menu */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <Dropdown.Root>
          <Dropdown.DotsButton />
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item label="Messages" icon={User} addon="12" />
              <Dropdown.Item label="Updates" icon={Download} addon="New" />
              <Dropdown.Item label="Favorites" icon={Star} addon="3" />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>
    </div>
  ),
};

// 8. Long Menu - 긴 메뉴 목록
export const LongMenu: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Item 1" icon={User} />
          <Dropdown.Item label="Item 2" icon={Settings} />
          <Dropdown.Item label="Item 3" icon={Edit} />
          <Dropdown.Item label="Item 4" icon={Copy} />
          <Dropdown.Item label="Item 5" icon={Download} />
          <Dropdown.Item label="Item 6" icon={Copy} />
          <Dropdown.Item label="Item 7" icon={Folder} />
          <Dropdown.Item label="Item 8" icon={Star} />
          <Dropdown.Separator />
          <Dropdown.Item label="Item 9" icon={Trash} />
          <Dropdown.Item label="Item 10" icon={User} />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// 9. Playground - 인터랙티브 플레이그라운드
export const Playground: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Edit" icon={Edit} />
          <Dropdown.Item label="Duplicate" icon={Copy} />
          <Dropdown.Item label="Folder" icon={Folder} addon="New" />
          <Dropdown.Separator />
          <Dropdown.Item label="Delete" icon={Trash} isDisabled />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};
