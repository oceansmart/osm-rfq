import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextArea } from './index';

const meta: Meta<typeof TextArea> = {
  title: 'Commons/Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the textarea',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip message displayed after the label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Visible height of textarea in rows',
    },
    cols: {
      control: 'number',
      description: 'Visible width of textarea in columns',
    },
    isRequired: {
      control: 'boolean',
      description: 'Marks the textarea as required',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the textarea',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Marks the textarea as invalid',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Makes the textarea read-only',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// 1. Default - 기본 TextArea
export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

// 2. Sizes - 다양한 rows 크기
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small (3 rows)</h3>
        <TextArea label="Comment" placeholder="Add a comment..." rows={3} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Medium (5 rows)</h3>
        <TextArea label="Description" placeholder="Enter description..." rows={5} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Large (8 rows)</h3>
        <TextArea label="Content" placeholder="Write your content..." rows={8} />
      </div>
    </div>
  ),
};

// 3. With Helper Text - 힌트 텍스트
export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself..."
        hint="Maximum 500 characters"
        rows={4}
      />

      <TextArea
        label="Feedback"
        placeholder="Share your thoughts..."
        hint="Your feedback helps us improve"
        rows={4}
      />
    </div>
  ),
};

// 4. With Tooltip - 툴팁 표시
export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <TextArea
        label="API Configuration"
        placeholder="Enter configuration..."
        tooltip="JSON format configuration for the API endpoint"
        rows={6}
      />

      <TextArea
        label="Custom CSS"
        placeholder="Enter custom CSS..."
        tooltip="Advanced: Add custom CSS styles"
        rows={6}
      />
    </div>
  ),
};

// 5. States - 다양한 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Normal</h3>
        <TextArea label="Message" placeholder="Enter your message..." rows={4} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Required</h3>
        <TextArea
          label="Message"
          placeholder="Enter your message..."
          rows={4}
          isRequired
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled</h3>
        <TextArea
          label="Message"
          placeholder="Enter your message..."
          rows={4}
          isDisabled
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Read-only</h3>
        <TextArea
          label="Message"
          value="This is a read-only message that cannot be edited."
          rows={4}
          isReadOnly
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Invalid</h3>
        <TextArea
          label="Message"
          placeholder="Enter your message..."
          rows={4}
          isInvalid
          hint="Message is required and must be at least 10 characters"
        />
      </div>
    </div>
  ),
};

// 6. Resizable - 크기 조절 가능
export const Resizable: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <h3 className="text-sm font-semibold mb-3">Vertical Resize</h3>
        <TextArea
          label="Notes"
          placeholder="Drag the corner to resize..."
          rows={4}
          hint="You can resize this textarea vertically"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Both Directions</h3>
        <TextArea
          label="Content"
          placeholder="Drag the corner to resize..."
          rows={4}
          hint="You can resize this textarea in both directions"
        />
      </div>
    </div>
  ),
};

// 7. Form Example - 실제 폼 예시
export const FormExample: Story = {
  render: () => (
    <div className="w-[500px] p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Contact Form</h2>

      <div className="flex flex-col gap-4">
        <TextArea
          label="Subject"
          placeholder="Brief summary of your message"
          rows={2}
          isRequired
        />

        <TextArea
          label="Message"
          placeholder="Describe your issue or question in detail..."
          rows={6}
          isRequired
          hint="Minimum 20 characters required"
        />

        <TextArea
          label="Additional Notes"
          placeholder="Any additional information (optional)"
          rows={4}
        />
      </div>
    </div>
  ),
};

// 8. Validation States - 검증 상태
export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <TextArea
        label="Comment"
        value="This is a valid comment with sufficient length."
        rows={3}
        hint="Comment looks good!"
      />

      <TextArea
        label="Comment"
        value="Too short"
        rows={3}
        isInvalid
        hint="Comment must be at least 20 characters"
      />

      <TextArea
        label="Bio"
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        rows={5}
        hint="500/500 characters (Maximum reached)"
      />
    </div>
  ),
};

// 9. Use Cases - 실전 사용 예시
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Bug Report</h3>
        <div className="flex flex-col gap-4 p-4 border rounded-lg">
          <TextArea
            label="Steps to Reproduce"
            placeholder="1. Go to... 2. Click on... 3. See error..."
            rows={4}
            isRequired
          />

          <TextArea
            label="Expected Behavior"
            placeholder="Describe what should happen..."
            rows={3}
            isRequired
          />

          <TextArea
            label="Actual Behavior"
            placeholder="Describe what actually happens..."
            rows={3}
            isRequired
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Code Review</h3>
        <div className="flex flex-col gap-4 p-4 border rounded-lg">
          <TextArea
            label="Review Comments"
            placeholder="Add your review comments..."
            rows={6}
            hint="Be constructive and specific"
          />

          <TextArea
            label="Suggested Changes"
            placeholder="Describe your suggested improvements..."
            rows={5}
          />
        </div>
      </div>
    </div>
  ),
};

// 10. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    hint: 'Helper text',
    rows: 4,
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
  },
};
