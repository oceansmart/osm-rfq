import type { Meta, StoryObj } from '@storybook/nextjs';
import { RadioButton, RadioGroup } from './index';

const meta: Meta<typeof RadioButton> = {
  title: 'Commons/Components/RadioButtons',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the radio button',
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button',
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the label',
    },
    value: {
      control: 'text',
      description: 'Value of the radio button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the radio button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// 1. Default - 기본 RadioGroup
export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <RadioGroup>
        <RadioButton value="option1" label="Option 1" />
        <RadioButton value="option2" label="Option 2" />
        <RadioButton value="option3" label="Option 3" />
      </RadioGroup>
    </div>
  ),
};

// 2. Sizes - 크기 비교
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Small (sm)</h3>
        <RadioGroup size="sm">
          <RadioButton value="sm1" label="Small option 1" />
          <RadioButton value="sm2" label="Small option 2" />
          <RadioButton value="sm3" label="Small option 3" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Medium (md)</h3>
        <RadioGroup size="md">
          <RadioButton value="md1" label="Medium option 1" />
          <RadioButton value="md2" label="Medium option 2" />
          <RadioButton value="md3" label="Medium option 3" />
        </RadioGroup>
      </div>
    </div>
  ),
};

// 3. WithLabelsAndHints - Label과 Hint 표시
export const WithLabelsAndHints: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">With Labels</h3>
        <RadioGroup>
          <RadioButton value="free" label="Free" />
          <RadioButton value="pro" label="Pro Plan" />
          <RadioButton value="enterprise" label="Enterprise Plan" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With Labels and Hints</h3>
        <RadioGroup>
          <RadioButton
            value="free"
            label="Free"
            hint="Perfect for personal projects"
          />
          <RadioButton
            value="pro"
            label="Pro Plan"
            hint="$29/month - Best for professionals"
          />
          <RadioButton
            value="enterprise"
            label="Enterprise Plan"
            hint="Custom pricing - For large teams"
          />
        </RadioGroup>
      </div>
    </div>
  ),
};

// 4. States - 다양한 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[500px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Normal</h3>
        <RadioGroup>
          <RadioButton value="option1" label="Option 1" />
          <RadioButton value="option2" label="Option 2" />
          <RadioButton value="option3" label="Option 3" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">With Default Selection</h3>
        <RadioGroup defaultValue="option2">
          <RadioButton value="option1" label="Option 1" />
          <RadioButton value="option2" label="Option 2" />
          <RadioButton value="option3" label="Option 3" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Disabled</h3>
        <RadioGroup isDisabled>
          <RadioButton value="option1" label="Option 1" />
          <RadioButton value="option2" label="Option 2" />
          <RadioButton value="option3" label="Option 3" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Individual Disabled</h3>
        <RadioGroup>
          <RadioButton value="option1" label="Option 1" />
          <RadioButton value="option2" label="Option 2 (Disabled)" isDisabled />
          <RadioButton value="option3" label="Option 3" />
        </RadioGroup>
      </div>
    </div>
  ),
};

// 5. WithoutLabels - Label 없이 사용
export const WithoutLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[400px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Without Labels (sm)</h3>
        <RadioGroup size="sm">
          <RadioButton value="option1" />
          <RadioButton value="option2" />
          <RadioButton value="option3" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Without Labels (md)</h3>
        <RadioGroup size="md">
          <RadioButton value="option1" />
          <RadioButton value="option2" />
          <RadioButton value="option3" />
        </RadioGroup>
      </div>
    </div>
  ),
};

// 6. HorizontalLayout - 가로 배치
export const HorizontalLayout: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <div>
        <h3 className="text-sm font-semibold mb-4">Horizontal (with labels)</h3>
        <RadioGroup className="flex-row gap-6">
          <RadioButton value="yes" label="Yes" />
          <RadioButton value="no" label="No" />
          <RadioButton value="maybe" label="Maybe" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Horizontal (without labels)</h3>
        <RadioGroup className="flex-row gap-4">
          <RadioButton value="option1" />
          <RadioButton value="option2" />
          <RadioButton value="option3" />
        </RadioGroup>
      </div>
    </div>
  ),
};

// 7. FormExample - 실제 폼 예시
export const FormExample: Story = {
  render: () => (
    <div className="w-[600px] p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-6">Account Settings</h2>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-md font-semibold mb-4">Notification Preferences</h3>
          <RadioGroup defaultValue="all">
            <RadioButton
              value="all"
              label="All notifications"
              hint="Receive all updates and notifications"
            />
            <RadioButton
              value="important"
              label="Important only"
              hint="Only receive critical notifications"
            />
            <RadioButton
              value="none"
              label="None"
              hint="Turn off all notifications"
            />
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Privacy Settings</h3>
          <RadioGroup defaultValue="public">
            <RadioButton
              value="public"
              label="Public"
              hint="Anyone can view your profile"
            />
            <RadioButton
              value="friends"
              label="Friends only"
              hint="Only your friends can view your profile"
            />
            <RadioButton
              value="private"
              label="Private"
              hint="Only you can view your profile"
            />
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
};

// 8. UseCases - 실전 사용 예시
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[700px]">
      <div>
        <h3 className="text-md font-semibold mb-4">Payment Method</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroup defaultValue="credit">
            <RadioButton
              value="credit"
              label="Credit Card"
              hint="Visa, Mastercard, American Express"
            />
            <RadioButton
              value="paypal"
              label="PayPal"
              hint="Pay with your PayPal account"
            />
            <RadioButton
              value="bank"
              label="Bank Transfer"
              hint="Direct bank transfer (2-3 business days)"
            />
            <RadioButton
              value="crypto"
              label="Cryptocurrency"
              hint="Bitcoin, Ethereum, USDT"
            />
          </RadioGroup>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Shipping Options</h3>
        <div className="p-6 border rounded-lg">
          <RadioGroup defaultValue="standard" size="md">
            <RadioButton
              value="express"
              label="Express Delivery"
              hint="$15.00 - Delivery within 1-2 business days"
            />
            <RadioButton
              value="standard"
              label="Standard Delivery"
              hint="$5.00 - Delivery within 5-7 business days"
            />
            <RadioButton
              value="economy"
              label="Economy Delivery"
              hint="Free - Delivery within 10-14 business days"
            />
          </RadioGroup>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-4">Survey Question</h3>
        <div className="p-6 border rounded-lg">
          <p className="text-md text-secondary mb-4">How satisfied are you with our service?</p>
          <RadioGroup>
            <RadioButton value="5" label="Very Satisfied" />
            <RadioButton value="4" label="Satisfied" />
            <RadioButton value="3" label="Neutral" />
            <RadioButton value="2" label="Dissatisfied" />
            <RadioButton value="1" label="Very Dissatisfied" />
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
};

// 9. Playground - 모든 props 조작 가능
export const Playground: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <RadioGroup size={args.size}>
        <RadioButton
          value="option1"
          label={args.label || "Option 1"}
          hint={args.hint}
          isDisabled={args.isDisabled}
        />
        <RadioButton value="option2" label="Option 2" />
        <RadioButton value="option3" label="Option 3" />
      </RadioGroup>
    </div>
  ),
  args: {
    size: 'sm',
    label: 'Option 1',
    hint: '',
    isDisabled: false,
  },
};
