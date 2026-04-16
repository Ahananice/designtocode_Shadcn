import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

// Consistent story wrapper — 400px wide so the component is readable
const W = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[400px]">{children}</div>
)

export const Default: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        rows={5}
      />
    </W>
  ),
}

export const Hover: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        rows={5}
        className="border-gray-400"
      />
    </W>
  ),
}

export const Active: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        rows={5}
        autoFocus
      />
    </W>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        readOnly
        value="Text"
        rows={5}
        onChange={() => {}}
      />
    </W>
  ),
}

export const Disabled: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        disabled
        rows={5}
      />
    </W>
  ),
}

export const Error: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        error="Required"
        rows={5}
      />
    </W>
  ),
}

export const AI: Story = {
  render: () => (
    <W>
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        variant="ai"
        rows={5}
        actions={[{ label: 'Action 1' }, { label: 'Action 2' }]}
      />
    </W>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-6">
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        rows={5}
      />
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        rows={5}
        className="border-gray-400"
      />
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        rows={5}
        autoFocus
      />
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        readOnly
        value="Text"
        rows={5}
        onChange={() => {}}
      />
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        disabled
        rows={5}
      />
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        error="Required"
        rows={5}
      />
      <TextArea
        label="Input Label"
        placeholder="Placeholder"
        maxLength={100}
        defaultValue="Text"
        variant="ai"
        rows={5}
        actions={[{ label: 'Action 1' }, { label: 'Action 2' }]}
      />
    </div>
  ),
}
