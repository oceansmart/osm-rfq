import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextEditor } from './index';
import { useState } from 'react';

const meta: Meta<typeof TextEditor.Root> = {
  title: 'Commons/Components/TextEditor',
  component: TextEditor.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Disables the editor',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Shows error state',
    },
    limit: {
      control: 'number',
      description: 'Character limit for the editor',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the root container',
    },
    inputClassName: {
      control: 'text',
      description: 'Additional CSS classes for the editor input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextEditor.Root>;

// 1. Default - 기본 Text Editor
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root>
        <TextEditor.Label>Description</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 2. With Placeholder - 커스텀 플레이스홀더
export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root placeholder="Start typing your story...">
        <TextEditor.Label>Content</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 3. With Character Limit - 글자 수 제한
export const WithCharacterLimit: Story = {
  render: () => (
    <div className="w-[600px] space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Limit: 100 characters</h3>
        <TextEditor.Root limit={100} placeholder="Enter up to 100 characters...">
          <TextEditor.Label>Short Description</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Limit: 500 characters</h3>
        <TextEditor.Root limit={500} placeholder="Enter up to 500 characters...">
          <TextEditor.Label>Medium Description</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>
      </div>
    </div>
  ),
};

// 4. With Hint Text - 커스텀 힌트 텍스트
export const WithHintText: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root>
        <TextEditor.Label>Comments</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText>
          This field supports Markdown formatting
        </TextEditor.HintText>
      </TextEditor.Root>
    </div>
  ),
};

// 5. Disabled State - 비활성화 상태
export const DisabledState: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root
        isDisabled
        content="This editor is disabled and cannot be edited."
      >
        <TextEditor.Label>Disabled Editor</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText>This editor is read-only</TextEditor.HintText>
      </TextEditor.Root>
    </div>
  ),
};

// 6. Invalid State - 에러 상태
export const InvalidState: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root isInvalid limit={50}>
        <TextEditor.Label>Bio</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText>
          Character limit exceeded. Please shorten your text.
        </TextEditor.HintText>
      </TextEditor.Root>
    </div>
  ),
};

// 7. Without Toolbar - 툴바 없이
export const WithoutToolbar: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root placeholder="Simple text editor without formatting toolbar...">
        <TextEditor.Label>Simple Editor</TextEditor.Label>
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 8. Without Label - 라벨 없이
export const WithoutLabel: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root placeholder="Editor without label...">
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 9. Controlled Editor - 제어 컴포넌트
export const ControlledEditor: Story = {
  render: () => {
    const [content, setContent] = useState('<p>Initial content</p>');

    return (
      <div className="w-[600px] space-y-4">
        <TextEditor.Root
          content={content}
          onUpdate={({ editor }) => {
            setContent(editor.getHTML());
          }}
        >
          <TextEditor.Label>Controlled Editor</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">HTML Output:</h4>
          <pre className="text-xs overflow-auto">{content}</pre>
        </div>
      </div>
    );
  },
};

// 10. Different Sizes - 다양한 크기
export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-[400px]">
        <h3 className="text-sm font-semibold mb-3">Small (400px)</h3>
        <TextEditor.Root placeholder="Small editor...">
          <TextEditor.Label>Small</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
        </TextEditor.Root>
      </div>

      <div className="w-[600px]">
        <h3 className="text-sm font-semibold mb-3">Medium (600px)</h3>
        <TextEditor.Root placeholder="Medium editor...">
          <TextEditor.Label>Medium</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
        </TextEditor.Root>
      </div>

      <div className="w-[800px]">
        <h3 className="text-sm font-semibold mb-3">Large (800px)</h3>
        <TextEditor.Root placeholder="Large editor...">
          <TextEditor.Label>Large</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
        </TextEditor.Root>
      </div>
    </div>
  ),
};

// 11. Pre-filled Content - 미리 채워진 콘텐츠
export const PrefilledContent: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root
        content={`
          <h2>Welcome to the Rich Text Editor</h2>
          <p>This editor supports various formatting options:</p>
          <ul>
            <li><strong>Bold</strong> and <em>italic</em> text</li>
            <li>Bulleted and numbered lists</li>
            <li>Block quotes and code blocks</li>
            <li>Links and images</li>
          </ul>
          <blockquote>
            <p>The best way to predict the future is to invent it.</p>
          </blockquote>
          <p>Try editing this content!</p>
        `}
      >
        <TextEditor.Label>Article Content</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 12. Form Integration - 폼 통합 예시
export const FormIntegration: Story = {
  render: () => (
    <div className="w-[600px]">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter article title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <TextEditor.Root limit={1000} placeholder="Write your article content...">
          <TextEditor.Label>Content</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Publish
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Save Draft
          </button>
        </div>
      </form>
    </div>
  ),
};

// 13. Use Cases - 실제 사용 사례
export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Blog Post */}
      <div className="w-[700px]">
        <h3 className="text-md font-semibold mb-4">Blog Post Editor</h3>
        <TextEditor.Root
          limit={5000}
          placeholder="Write your blog post..."
          content="<h1>My First Blog Post</h1><p>Start writing your amazing content here...</p>"
        >
          <TextEditor.Label>Post Content</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>
      </div>

      {/* Comment Box */}
      <div className="w-[500px]">
        <h3 className="text-md font-semibold mb-4">Comment Box</h3>
        <TextEditor.Root
          limit={500}
          placeholder="Leave a comment..."
        >
          <TextEditor.Label>Your Comment</TextEditor.Label>
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>
      </div>

      {/* Product Description */}
      <div className="w-[600px]">
        <h3 className="text-md font-semibold mb-4">Product Description</h3>
        <TextEditor.Root
          limit={2000}
          placeholder="Describe your product features, specifications, and benefits..."
        >
          <TextEditor.Label>Description</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>
      </div>
    </div>
  ),
};

// 14. Playground - 인터랙티브 플레이그라운드
export const Playground: Story = {
  args: {
    isDisabled: false,
    isInvalid: false,
    limit: undefined,
    placeholder: 'Write something...',
  },
  render: (args) => (
    <div className="w-[600px]">
      <TextEditor.Root {...args}>
        <TextEditor.Label>Editor Playground</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};
