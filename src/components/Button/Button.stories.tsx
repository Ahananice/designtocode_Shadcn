import type { Meta, StoryObj } from '@storybook/react'
import { MoreVertical } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['secondary', 'primary', 'destructive', 'ghost'] },
    size:    { control: 'radio', options: ['default', 'sm', 'lg', 'icon', 'icon-lg', 'icon-sm'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single variants ──────────────────────────────────────────────────────────

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Button' },
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

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeLarge: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Large 36px' },
}

export const SizeDefault: Story = {
  args: { variant: 'primary', size: 'default', children: 'Default 32px' },
}

export const SizeSmall: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Small 24px' },
}

// ─── All states per variant (hover + active + disabled visible without interaction) ──

/**
 * Force-applies hover, active and disabled appearances so they are visible
 * without mouse interaction. Uses `className` overrides that twMerge resolves
 * to the correct Lyra state token on the button background.
 */
export const AllStates: Story = {
  render: () => {
    const states = [
      { label: 'Default',                  extra: {}                                                       },
      { label: 'Hover',    forced: true,   extra: { secondary: 'bg-lyra-state-hover-secondary',
                                                     primary:   'bg-lyra-state-hover-primary',
                                                     destr:     'bg-lyra-state-hover-critical-strong',
                                                     ghost:     'bg-lyra-state-hover-opacity'             } },
      { label: 'Pressed',  forced: true,   extra: { secondary: 'bg-lyra-state-pressed-secondary',
                                                     primary:   'bg-lyra-state-pressed-primary',
                                                     destr:     'bg-lyra-state-pressed-critical-strong',
                                                     ghost:     'bg-lyra-state-pressed-opacity'           } },
      { label: 'Disabled',                 extra: { disabled: true }                                       },
    ]

    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-lyra-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">
                Variant
              </th>
              {states.map(s => (
                <th key={s.label} className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">
                  {s.label}
                  {s.forced && <span className="ml-1 font-normal lowercase text-lyra-fg-disabled">(simulated)</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-lyra-border-subtle">
            {/* Secondary */}
            <tr>
              <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Secondary</td>
              <td className="px-3 py-3"><Button variant="secondary">Button</Button></td>
              <td className="px-3 py-3"><Button variant="secondary" className="bg-lyra-state-hover-secondary">Button</Button></td>
              <td className="px-3 py-3"><Button variant="secondary" className="bg-lyra-state-pressed-secondary">Button</Button></td>
              <td className="px-3 py-3"><Button variant="secondary" disabled>Button</Button></td>
            </tr>
            {/* Primary */}
            <tr>
              <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Primary</td>
              <td className="px-3 py-3"><Button variant="primary">Button</Button></td>
              <td className="px-3 py-3"><Button variant="primary" className="bg-lyra-state-hover-primary">Button</Button></td>
              <td className="px-3 py-3"><Button variant="primary" className="bg-lyra-state-pressed-primary">Button</Button></td>
              <td className="px-3 py-3"><Button variant="primary" disabled>Button</Button></td>
            </tr>
            {/* Destructive */}
            <tr>
              <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Destructive</td>
              <td className="px-3 py-3"><Button variant="destructive">Button</Button></td>
              <td className="px-3 py-3"><Button variant="destructive" className="bg-lyra-state-hover-critical-strong">Button</Button></td>
              <td className="px-3 py-3"><Button variant="destructive" className="bg-lyra-state-pressed-critical-strong">Button</Button></td>
              <td className="px-3 py-3"><Button variant="destructive" disabled>Button</Button></td>
            </tr>
            {/* Ghost */}
            <tr>
              <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Ghost</td>
              <td className="px-3 py-3"><Button variant="ghost">Button</Button></td>
              <td className="px-3 py-3"><Button variant="ghost" className="bg-lyra-state-hover-opacity">Button</Button></td>
              <td className="px-3 py-3"><Button variant="ghost" className="bg-lyra-state-pressed-opacity">Button</Button></td>
              <td className="px-3 py-3"><Button variant="ghost" disabled>Button</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
}

// ─── Icon button states ───────────────────────────────────────────────────────

export const IconStates: Story = {
  render: () => (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-lyra-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">Variant</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">Default</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">Hover <span className="font-normal lowercase text-lyra-fg-disabled">(sim.)</span></th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">Pressed <span className="font-normal lowercase text-lyra-fg-disabled">(sim.)</span></th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">Disabled</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-lyra-border-subtle">
          <tr>
            <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Secondary</td>
            <td className="px-3 py-3"><Button variant="secondary" size="icon" aria-label="default"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="secondary" size="icon" className="bg-lyra-state-hover-secondary" aria-label="hover"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="secondary" size="icon" className="bg-lyra-state-pressed-secondary" aria-label="pressed"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="secondary" size="icon" disabled aria-label="disabled"><MoreVertical /></Button></td>
          </tr>
          <tr>
            <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Primary</td>
            <td className="px-3 py-3"><Button variant="primary" size="icon" aria-label="default"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="primary" size="icon" className="bg-lyra-state-hover-primary" aria-label="hover"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="primary" size="icon" className="bg-lyra-state-pressed-primary" aria-label="pressed"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="primary" size="icon" disabled aria-label="disabled"><MoreVertical /></Button></td>
          </tr>
          <tr>
            <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Destructive</td>
            <td className="px-3 py-3"><Button variant="destructive" size="icon" aria-label="default"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="destructive" size="icon" className="bg-lyra-state-hover-critical-strong" aria-label="hover"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="destructive" size="icon" className="bg-lyra-state-pressed-critical-strong" aria-label="pressed"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="destructive" size="icon" disabled aria-label="disabled"><MoreVertical /></Button></td>
          </tr>
          <tr>
            <td className="px-3 py-3 text-lyra-fg-secondary font-medium">Ghost</td>
            <td className="px-3 py-3"><Button variant="ghost" size="icon" aria-label="default"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="ghost" size="icon" className="bg-lyra-state-hover-opacity" aria-label="hover"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="ghost" size="icon" className="bg-lyra-state-pressed-opacity" aria-label="pressed"><MoreVertical /></Button></td>
            <td className="px-3 py-3"><Button variant="ghost" size="icon" disabled aria-label="disabled"><MoreVertical /></Button></td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Text buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-lyra-fg-secondary">Text buttons</p>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-lyra-fg-secondary">Sizes (primary)</p>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="lg">Large 36px</Button>
          <Button variant="primary" size="default">Default 32px</Button>
          <Button variant="primary" size="sm">Small 24px</Button>
        </div>
      </div>

      {/* Icon buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-lyra-fg-secondary">Icon buttons (lg / md / sm)</p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="icon-lg" aria-label="lg"><MoreVertical /></Button>
          <Button variant="primary" size="icon-lg" aria-label="lg"><MoreVertical /></Button>
          <Button variant="destructive" size="icon-lg" aria-label="lg"><MoreVertical /></Button>
          <Button variant="ghost" size="icon-lg" aria-label="lg"><MoreVertical /></Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="icon" aria-label="md"><MoreVertical /></Button>
          <Button variant="primary" size="icon" aria-label="md"><MoreVertical /></Button>
          <Button variant="destructive" size="icon" aria-label="md"><MoreVertical /></Button>
          <Button variant="ghost" size="icon" aria-label="md"><MoreVertical /></Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="icon-sm" aria-label="sm"><MoreVertical /></Button>
          <Button variant="primary" size="icon-sm" aria-label="sm"><MoreVertical /></Button>
          <Button variant="destructive" size="icon-sm" aria-label="sm"><MoreVertical /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="sm"><MoreVertical /></Button>
        </div>
      </div>
    </div>
  ),
}
