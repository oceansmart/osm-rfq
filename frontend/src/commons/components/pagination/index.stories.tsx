import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Pagination,
  PaginationPageDefault,
  PaginationPageMinimalCenter,
  PaginationCardDefault,
  PaginationCardMinimal,
  PaginationButtonGroup,
  PaginationDot,
  PaginationLine,
} from './index';
import { useState } from 'react';

const meta: Meta<typeof PaginationPageDefault> = {
  title: 'Commons/Components/Pagination',
  component: PaginationPageDefault,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      description: 'Current active page number',
    },
    total: {
      control: 'number',
      description: 'Total number of pages',
    },
    siblingCount: {
      control: 'number',
      description: 'Number of sibling pages to show on each side',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the pagination buttons are rounded',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationPageDefault>;

// 1. Default - 기본 페이지 Pagination
export const Default: Story = {
  args: {
    page: 1,
    total: 10,
  },
};

// 2. All Variants - 모든 Pagination 스타일
export const AllVariants: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    const [page4, setPage4] = useState(1);
    const [page5, setPage5] = useState(1);

    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Page Default</h3>
          <PaginationPageDefault
            page={page1}
            total={10}
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Page Minimal Center</h3>
          <PaginationPageMinimalCenter
            page={page2}
            total={10}
            onPageChange={setPage2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Card Default</h3>
          <PaginationCardDefault
            page={page3}
            total={10}
            onPageChange={setPage3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Card Minimal (Center)</h3>
          <PaginationCardMinimal
            page={page4}
            total={10}
            align="center"
            onPageChange={setPage4}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Button Group (Center)</h3>
          <PaginationButtonGroup
            page={page5}
            total={10}
            align="center"
            onPageChange={setPage5}
          />
        </div>
      </div>
    );
  },
};

// 3. Rounded vs Square
export const RoundedVariants: Story = {
  render: () => {
    const [page1, setPage1] = useState(5);
    const [page2, setPage2] = useState(5);

    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Square Buttons (Default)</h3>
          <PaginationPageDefault
            page={page1}
            total={10}
            rounded={false}
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Rounded Buttons</h3>
          <PaginationPageDefault
            page={page2}
            total={10}
            rounded={true}
            onPageChange={setPage2}
          />
        </div>
      </div>
    );
  },
};

// 4. Sibling Count - 형제 페이지 수 조절
export const SiblingCount: Story = {
  render: () => {
    const [page1, setPage1] = useState(5);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(5);

    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Sibling Count: 1 (Default)</h3>
          <PaginationPageDefault
            page={page1}
            total={20}
            siblingCount={1}
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Sibling Count: 2</h3>
          <PaginationPageDefault
            page={page2}
            total={20}
            siblingCount={2}
            onPageChange={setPage2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Sibling Count: 3</h3>
          <PaginationPageDefault
            page={page3}
            total={20}
            siblingCount={3}
            onPageChange={setPage3}
          />
        </div>
      </div>
    );
  },
};

// 5. Alignment - 정렬 옵션
export const Alignment: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);

    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Left Aligned</h3>
          <PaginationCardMinimal
            page={page1}
            total={10}
            align="left"
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Center Aligned</h3>
          <PaginationCardMinimal
            page={page2}
            total={10}
            align="center"
            onPageChange={setPage2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Right Aligned</h3>
          <PaginationCardMinimal
            page={page3}
            total={10}
            align="right"
            onPageChange={setPage3}
          />
        </div>
      </div>
    );
  },
};

// 6. Dot Pagination
export const DotVariants: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    const [page4, setPage4] = useState(1);

    return (
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Medium</h3>
          <PaginationDot
            page={page1}
            total={5}
            size="md"
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Large</h3>
          <PaginationDot
            page={page2}
            total={5}
            size="lg"
            onPageChange={setPage2}
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Framed</h3>
          <PaginationDot
            page={page3}
            total={5}
            size="md"
            framed
            onPageChange={setPage3}
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Brand Colors</h3>
          <PaginationDot
            page={page4}
            total={5}
            size="md"
            isBrand
            onPageChange={setPage4}
          />
        </div>
      </div>
    );
  },
};

// 7. Line Pagination
export const LineVariants: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);

    return (
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Medium</h3>
          <PaginationLine
            page={page1}
            total={5}
            size="md"
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Large</h3>
          <PaginationLine
            page={page2}
            total={5}
            size="lg"
            onPageChange={setPage2}
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold">Framed</h3>
          <PaginationLine
            page={page3}
            total={5}
            size="md"
            framed
            onPageChange={setPage3}
          />
        </div>
      </div>
    );
  },
};

// 8. Edge Cases
export const EdgeCases: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    const [page4, setPage4] = useState(50);

    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Single Page</h3>
          <PaginationPageDefault
            page={page1}
            total={1}
            onPageChange={setPage1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Few Pages (3)</h3>
          <PaginationPageDefault
            page={page2}
            total={3}
            onPageChange={setPage2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">First Page of Many</h3>
          <PaginationPageDefault
            page={page3}
            total={100}
            onPageChange={setPage3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Last Page of Many</h3>
          <PaginationPageDefault
            page={page4}
            total={50}
            onPageChange={setPage4}
          />
        </div>
      </div>
    );
  },
};

// 9. Playground - 사용자 인터랙션 테스트
export const Playground: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Current Page: {page}</span>
          <button
            onClick={() => setPage(1)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Reset to Page 1
          </button>
        </div>
        <PaginationPageDefault
          page={page}
          total={20}
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// 10. Low-Level API
export const LowLevelAPI: Story = {
  render: () => {
    const [page, setPage] = useState(5);

    return (
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <h3 className="text-sm font-semibold">Custom Pagination with Low-Level API</h3>
        <Pagination.Root page={page} total={10} onPageChange={setPage}>
          <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
            <Pagination.PrevTrigger className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Previous
            </Pagination.PrevTrigger>

            <Pagination.Context>
              {({ pages, currentPage, total }) => (
                <div className="flex items-center gap-2">
                  {pages.map((page, index) =>
                    page.type === 'page' ? (
                      <Pagination.Item
                        key={index}
                        {...page}
                        className={({ isSelected }) =>
                          `px-3 py-1 text-sm rounded ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        {page.value}
                      </Pagination.Item>
                    ) : (
                      <Pagination.Ellipsis key={index} className="px-2 text-gray-500">
                        ...
                      </Pagination.Ellipsis>
                    )
                  )}
                </div>
              )}
            </Pagination.Context>

            <Pagination.NextTrigger className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Next
            </Pagination.NextTrigger>
          </div>
        </Pagination.Root>
      </div>
    );
  },
};
