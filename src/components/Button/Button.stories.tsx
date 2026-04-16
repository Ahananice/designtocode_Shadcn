import type { Meta, StoryObj } from '@storybook/react'
import { MoreVertical } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'primary', 'destructive', 'ghost'] },
    size:    { control: 'radio', options: ['default', 'sm', 'lg', 'icon'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single variants ──────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: 'default', children: 'Button' },
}

export const Primary: Story = {
  args: { variant: 'primary', children: 'Button' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Button' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Button' },
}

// ─── Disabled state ───────────────────────────────────────────────────────────

export const DefaultDisabled: Story = {
  args: { variant: 'default', children: 'Button', disabled: true },
}

export const PrimaryDisabled: Story = {
  args: { variant: 'primary', children: 'Button', disabled: true },
}

export const DestructiveDisabled: Story = {
  args: { variant: 'destructive', children: 'Button', disabled: true },
}

// ─── Icon-only (right panel in design) ───────────────────────────────────────

export const IconDefault: Story = {
  args: { variant: 'default', size: 'icon', 'aria-label': 'More options', children: <MoreVertical /> },
}

export const IconPrimary: Story = {
  args: { variant: 'primary', size: 'icon', 'aria-label': 'More options', children: <MoreVertical /> },
}

export const IconDestructive: Story = {
  args: { variant: 'destructive', size: 'icon', 'aria-label': 'More options', children: <MoreVertical /> },
}

export const IconGhost: Story = {
  args: { variant: 'ghost', size: 'icon', 'aria-label': 'More options', children: <MoreVertical /> },
}

export const IconDisabled: Story = {
  args: { variant: 'primary', size: 'icon', 'aria-label': 'More options', disabled: true, children: <MoreVertical /> },
}

// ─── Full design matrix (all variants × all states) ──────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Text buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Text buttons</p>
        <div className="grid grid-cols-4 gap-3">
          <Button variant="default">Button</Button>
          <Button variant="primary">Button</Button>
          <Button variant="destructive">Button</Button>
          <Button variant="ghost">Button</Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <Button variant="default" disabled>Button</Button>
          <Button variant="primary" disabled>Button</Button>
          <Button variant="destructive" disabled>Button</Button>
          <Button variant="ghost" disabled>Button</Button>
        </div>
      </div>

      {/* Icon buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Icon buttons</p>
        <div className="flex gap-3">
          <Button variant="default" size="icon" aria-label="More"><MoreVertical /></Button>
          <Button variant="primary" size="icon" aria-label="More"><MoreVertical /></Button>
          <Button variant="destructive" size="icon" aria-label="More"><MoreVertical /></Button>
          <Button variant="ghost" size="icon" aria-label="More"><MoreVertical /></Button>
        </div>
        <div className="flex gap-3">
          <Button variant="default" size="icon" aria-label="More" disabled><MoreVertical /></Button>
          <Button variant="primary" size="icon" aria-label="More" disabled><MoreVertical /></Button>
          <Button variant="destructive" size="icon" aria-label="More" disabled><MoreVertical /></Button>
          <Button variant="ghost" size="icon" aria-label="More" disabled><MoreVertical /></Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Sizes</p>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="default">Default</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
    </div>
  ),
}
