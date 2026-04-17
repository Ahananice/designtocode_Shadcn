import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:          { control: 'radio', options: ['default', 'sm'] },
    disabled:      { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    showIcon:      { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single variants ──────────────────────────────────────────────────────────

export const Checked: Story = {
  args: { label: 'Switch Label', defaultChecked: true },
}

export const Unchecked: Story = {
  args: { label: 'Switch Label', defaultChecked: false },
}

export const DisabledChecked: Story = {
  args: { label: 'Switch Label', defaultChecked: true, disabled: true },
}

export const DisabledUnchecked: Story = {
  args: { label: 'Switch Label', defaultChecked: false, disabled: true },
}

export const Indeterminate: Story = {
  args: { label: 'Switch Label', indeterminate: true },
}

export const CheckedWithIcon: Story = {
  args: { label: 'Switch Label', defaultChecked: true, showIcon: true },
}

export const SmChecked: Story = {
  args: { label: 'Switch Label', size: 'sm', defaultChecked: true },
}

export const SmUnchecked: Story = {
  args: { label: 'Switch Label', size: 'sm', defaultChecked: false },
}

// ─── All states — mirrors the Figma grid ─────────────────────────────────────

/**
 * Matches the Figma layout: 10 states × 2 sizes.
 * Hover and pressed states require mouse interaction; all other states
 * are visible without interaction.
 */
export const AllStates: Story = {
  render: () => {
    const rows: {
      label: string
      note?: string
      defaultChecked?: boolean
      checked?: boolean
      disabled?: boolean
      indeterminate?: boolean
      showIcon?: boolean
    }[] = [
      { label: 'Switch Label', defaultChecked: true },
      { label: 'Switch Label', defaultChecked: true,  note: '(hover — interact to see)' },
      { label: 'Switch Label', defaultChecked: true,  note: '(pressed — interact to see)' },
      { label: 'Switch Label', defaultChecked: false },
      { label: 'Switch Label', defaultChecked: false, note: '(hover — interact to see)' },
      { label: 'Switch Label', defaultChecked: false, note: '(pressed — interact to see)' },
      { label: 'Switch Label', defaultChecked: true,  disabled: true },
      { label: 'Switch Label', defaultChecked: false, disabled: true },
      { label: 'Switch Label', indeterminate: true },
      { label: 'Switch Label', defaultChecked: true,  showIcon: true },
    ]

    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary w-48">
                State
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
                Default
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
                Small
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lyra-border-subtle">
            {rows.map((row, i) => {
              const stateLabel = [
                'Checked — default',
                'Checked — hover',
                'Checked — pressed',
                'Unchecked — default',
                'Unchecked — hover',
                'Unchecked — pressed',
                'Disabled (checked)',
                'Disabled (unchecked)',
                'Indeterminate',
                'Checked + icon',
              ][i]
              return (
                <tr key={i}>
                  <td className="px-3 py-3 text-xs text-lyra-fg-secondary font-medium align-middle">
                    {stateLabel}
                    {row.note && (
                      <span className="ml-1 text-lyra-fg-disabled font-normal">
                        {row.note}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-middle">
                    <Switch size="default" {...row} />
                  </td>
                  <td className="px-3 py-3 align-middle">
                    <Switch size="sm" {...row} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  },
}

// ─── Interactive playground ───────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Switch Label',
    defaultChecked: false,
    size: 'default',
    disabled: false,
    indeterminate: false,
    showIcon: false,
  },
}
