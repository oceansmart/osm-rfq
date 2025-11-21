import type { Meta, StoryObj } from '@storybook/nextjs';
import { Table, TableCard, TableRowActionsDropdown } from './index';

const meta: Meta<typeof Table> = {
  title: 'Commons/Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the table',
      defaultValue: 'md',
    },
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple'],
      description: 'Selection mode for table rows',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleUsers: User[] = [
  { id: 1, name: '김철수', email: 'chulsoo@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: '이영희', email: 'younghee@example.com', role: 'User', status: 'active' },
  { id: 3, name: '박민수', email: 'minsoo@example.com', role: 'Manager', status: 'inactive' },
  { id: 4, name: '정수진', email: 'soojin@example.com', role: 'User', status: 'active' },
  { id: 5, name: '최동욱', email: 'dongwook@example.com', role: 'Admin', status: 'active' },
];

/**
 * ## Overview
 *
 * Table 컴포넌트는 데이터를 행과 열로 구조화하여 표시하는 컴포넌트입니다.
 * React Aria Components의 Table 기반으로 구축되어 접근성과 키보드 내비게이션을 지원합니다.
 *
 * ### 주요 기능
 * - 행 선택 (단일/다중)
 * - 정렬 기능
 * - 2가지 크기 (sm, md)
 * - 카드 컨테이너 지원
 * - 액션 드롭다운
 */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-full max-w-5xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Table</h3>
        <Table aria-label="Basic user table">
          <Table.Header>
            <Table.Head label="이름" />
            <Table.Head label="이메일" />
            <Table.Head label="역할" />
            <Table.Head label="상태" />
          </Table.Header>
          <Table.Body>
            {sampleUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <span className={user.status === 'active' ? 'text-success-fg' : 'text-error-fg'}>
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Table with Selection</h3>
        <Table aria-label="User table with selection" selectionMode="multiple">
          <Table.Header>
            <Table.Head label="이름" />
            <Table.Head label="이메일" />
            <Table.Head label="역할" />
          </Table.Header>
          <Table.Body>
            {sampleUsers.slice(0, 3).map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  ),
};

/**
 * ## Basic Table
 *
 * 가장 기본적인 테이블 형태입니다.
 */
export const BasicTable: Story = {
  render: (args) => (
    <Table aria-label="User table" {...args}>
      <Table.Header>
        <Table.Head label="이름" />
        <Table.Head label="이메일" />
        <Table.Head label="역할" />
        <Table.Head label="상태" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <span className={user.status === 'active' ? 'text-success-fg' : 'text-error-fg'}>
                {user.status === 'active' ? '활성' : '비활성'}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## With Single Selection
 *
 * 단일 행 선택이 가능한 테이블입니다.
 */
export const WithSingleSelection: Story = {
  render: (args) => (
    <Table aria-label="User table with single selection" selectionMode="single" {...args}>
      <Table.Header>
        <Table.Head label="이름" />
        <Table.Head label="이메일" />
        <Table.Head label="역할" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## With Multiple Selection
 *
 * 다중 행 선택이 가능한 테이블입니다. 헤더의 체크박스로 전체 선택/해제가 가능합니다.
 */
export const WithMultipleSelection: Story = {
  render: (args) => (
    <Table aria-label="User table with multiple selection" selectionMode="multiple" {...args}>
      <Table.Header>
        <Table.Head label="이름" />
        <Table.Head label="이메일" />
        <Table.Head label="역할" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## With Sorting
 *
 * 열 헤더를 클릭하여 정렬할 수 있는 테이블입니다.
 */
export const WithSorting: Story = {
  render: (args) => (
    <Table aria-label="Sortable user table" {...args}>
      <Table.Header>
        <Table.Head label="이름" allowsSorting />
        <Table.Head label="이메일" allowsSorting />
        <Table.Head label="역할" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## With Tooltip
 *
 * 열 헤더에 툴팁을 표시하여 추가 정보를 제공합니다.
 */
export const WithTooltip: Story = {
  render: (args) => (
    <Table aria-label="User table with tooltips" {...args}>
      <Table.Header>
        <Table.Head label="이름" tooltip="사용자의 전체 이름" />
        <Table.Head label="이메일" tooltip="사용자의 이메일 주소" />
        <Table.Head label="역할" tooltip="시스템 내 사용자 권한" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.slice(0, 3).map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## With Actions Dropdown
 *
 * 각 행에 액션 드롭다운을 포함한 테이블입니다.
 */
export const WithActionsDropdown: Story = {
  render: (args) => (
    <Table aria-label="User table with actions" {...args}>
      <Table.Header>
        <Table.Head label="이름" />
        <Table.Head label="이메일" />
        <Table.Head label="역할" />
        <Table.Head label="액션" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.slice(0, 3).map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <TableRowActionsDropdown />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## Table Card Container
 *
 * TableCard 컴포넌트로 감싸서 카드 형태로 표시합니다.
 */
export const TableCardContainer: Story = {
  render: (args) => (
    <TableCard.Root size={args.size}>
      <TableCard.Header
        title="사용자 목록"
        badge="5"
        description="시스템에 등록된 사용자 목록입니다."
      />
      <Table aria-label="User table in card" size={args.size}>
        <Table.Header>
          <Table.Head label="이름" />
          <Table.Head label="이메일" />
          <Table.Head label="역할" />
          <Table.Head label="상태" />
        </Table.Header>
        <Table.Body>
          {sampleUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <span className={user.status === 'active' ? 'text-success-fg' : 'text-error-fg'}>
                  {user.status === 'active' ? '활성' : '비활성'}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </TableCard.Root>
  ),
  args: {
    size: 'md',
  },
};

/**
 * ## Small Size
 *
 * 작은 크기(sm)의 테이블입니다.
 */
export const SmallSize: Story = {
  render: () => (
    <Table aria-label="Small user table" size="sm">
      <Table.Header>
        <Table.Head label="이름" />
        <Table.Head label="이메일" />
        <Table.Head label="역할" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.slice(0, 3).map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/**
 * ## Size Comparison
 *
 * 두 가지 크기(sm, md)를 비교합니다.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h3 className="text-md font-semibold mb-2">Small (sm)</h3>
        <Table aria-label="Small table" size="sm">
          <Table.Header>
            <Table.Head label="이름" />
            <Table.Head label="이메일" />
            <Table.Head label="역할" />
          </Table.Header>
          <Table.Body>
            {sampleUsers.slice(0, 2).map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Medium (md)</h3>
        <Table aria-label="Medium table" size="md">
          <Table.Header>
            <Table.Head label="이름" />
            <Table.Head label="이메일" />
            <Table.Head label="역할" />
          </Table.Header>
          <Table.Body>
            {sampleUsers.slice(0, 2).map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  ),
};

/**
 * ## Use Cases
 *
 * 실제 사용 예시들을 보여줍니다.
 */
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-full max-w-5xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">User Management Dashboard</h3>
        <TableCard.Root>
          <TableCard.Header
            title="팀 멤버"
            badge="5"
            description="현재 프로젝트에 참여 중인 팀 멤버 목록입니다."
          />
          <Table aria-label="Team members" selectionMode="multiple">
            <Table.Header>
              <Table.Head label="이름" allowsSorting />
              <Table.Head label="이메일" />
              <Table.Head label="역할" />
              <Table.Head label="상태" />
              <Table.Head label="" />
            </Table.Header>
            <Table.Body>
              {sampleUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <span className="font-medium text-primary">{user.name}</span>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <span className={user.status === 'active' ? 'text-success-fg' : 'text-error-fg'}>
                      {user.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <TableRowActionsDropdown />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>
    </div>
  ),
};

/**
 * ## Playground
 *
 * 인터랙티브하게 props를 조정하여 테이블을 테스트할 수 있습니다.
 */
export const Playground: Story = {
  render: (args) => (
    <Table aria-label="Playground table" {...args}>
      <Table.Header>
        <Table.Head label="이름" allowsSorting />
        <Table.Head label="이메일" allowsSorting />
        <Table.Head label="역할" />
        <Table.Head label="상태" />
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <span className={user.status === 'active' ? 'text-success-fg' : 'text-error-fg'}>
                {user.status === 'active' ? '활성' : '비활성'}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  args: {
    size: 'md',
    selectionMode: 'none',
  },
};
