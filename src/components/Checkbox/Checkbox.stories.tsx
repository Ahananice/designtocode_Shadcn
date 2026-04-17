import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// ─── All individual states ────────────────────────────────────────────────────

/**
 * Mirrors the Figma state grid:
 * 3× unchecked      (default / hover / pressed)
 * 3× checked        (default / hover / pressed)
 * 3× indeterminate  (default / hover / pressed)
 * 1× read-only unchecked
 * 1× read-only checked
 * 1× read-only indeterminate
 * 3× disabled       (unchecked / checked / indeterminate)
 *
 * Hover and pressed states require mouse interaction.
 */
export const AllStates: Story = {
  render: () => {
    type StateRow = {
      label: string
      note?: string
      checked?: boolean
      indeterminate?: boolean
      disabled?: boolean
      readOnly?: boolean
    }

    const states: StateRow[] = [
      // Unchecked
      { label: 'Unchecked — default' },
      { label: 'Unchecked — hover',        note: '(interact)' },
      { label: 'Unchecked — pressed',      note: '(interact)' },
      // Checked
      { label: 'Checked — default',        checked: true },
      { label: 'Checked — hover',          note: '(interact)', checked: true },
      { label: 'Checked — pressed',        note: '(interact)', checked: true },
      // Indeterminate
      { label: 'Indeterminate — default',  indeterminate: true },
      { label: 'Indeterminate — hover',    note: '(interact)', indeterminate: true },
      { label: 'Indeterminate — pressed',  note: '(interact)', indeterminate: true },
      // Read-only
      { label: 'Read-only unchecked',      readOnly: true },
      { label: 'Read-only checked',        readOnly: true, checked: true },
      { label: 'Read-only indeterminate',  readOnly: true, indeterminate: true },
      // Disabled
      { label: 'Disabled unchecked',       disabled: true },
      { label: 'Disabled checked',         disabled: true, checked: true },
      { label: 'Disabled indeterminate',   disabled: true, indeterminate: true },
    ]

    return (
      <div className="w-full max-w-md">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
                State
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
                Checkbox
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lyra-border-subtle">
            {states.map((s, i) => (
              <tr key={i}>
                <td className="px-3 py-2 text-xs text-lyra-fg-secondary font-medium whitespace-nowrap">
                  {s.label}
                  {s.note && (
                    <span className="ml-1 text-lyra-fg-disabled font-normal">
                      {s.note}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <Checkbox
                    label="Checkbox label"
                    checked={s.checked}
                    indeterminate={s.indeterminate}
                    disabled={s.disabled}
                    readOnly={s.readOnly}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}

// ─── Base variants (label only / label + description) ─────────────────────────

export const BaseVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Checkbox label" defaultChecked />
      <Checkbox
        label="Checkbox label"
        description="Secondary Text"
        defaultChecked
      />
    </div>
  ),
}

// ─── Group — vertical (default) ───────────────────────────────────────────────

export const GroupVertical: Story = {
  render: () => (
    <CheckboxGroup label="Input Label" orientation="vertical">
      <Checkbox label="Checkbox label" defaultChecked />
      <Checkbox label="Checkbox label" />
      <Checkbox label="Checkbox label" />
    </CheckboxGroup>
  ),
}

// ─── Group — horizontal ───────────────────────────────────────────────────────

export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup label="Input Label" orientation="horizontal">
      <Checkbox label="Checkbox label" defaultChecked />
      <Checkbox label="Checkbox label" />
      <Checkbox label="Checkbox label" />
    </CheckboxGroup>
  ),
}

// ─── Group — read-only ────────────────────────────────────────────────────────

export const GroupReadOnly: Story = {
  render: () => (
    <div className="space-y-6">
      <CheckboxGroup label="Input Label" orientation="vertical" readOnly>
        <Checkbox label="Checkbox label" checked />
        <Checkbox label="Checkbox label" />
        <Checkbox label="Checkbox label" checked />
      </CheckboxGroup>

      <CheckboxGroup label="Input Label" orientation="horizontal" readOnly>
        <Checkbox label="Checkbox label" checked />
        <Checkbox label="Checkbox label" />
        <Checkbox label="Checkbox label" checked />
      </CheckboxGroup>
    </div>
  ),
}

// ─── Group — disabled ─────────────────────────────────────────────────────────

export const GroupDisabled: Story = {
  render: () => (
    <div className="space-y-6">
      <CheckboxGroup label="Input Label" orientation="vertical" disabled>
        <Checkbox label="Checkbox label" checked />
        <Checkbox label="Checkbox label" />
        <Checkbox label="Checkbox label" checked />
      </CheckboxGroup>

      <CheckboxGroup label="Input Label" orientation="horizontal" disabled>
        <Checkbox label="Checkbox label" checked />
        <Checkbox label="Checkbox label" />
        <Checkbox label="Checkbox label" checked />
      </CheckboxGroup>
    </div>
  ),
}

// ─── All group variants (mirrors Figma grid) ──────────────────────────────────

export const AllGroupVariants: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-8">
      {/* Vertical — normal */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Vertical — normal
        </p>
        <CheckboxGroup label="Input Label" orientation="vertical">
          <Checkbox label="Checkbox label" defaultChecked />
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label" defaultChecked />
        </CheckboxGroup>
      </div>

      {/* Vertical — read-only */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Vertical — read-only
        </p>
        <CheckboxGroup label="Input Label" orientation="vertical" readOnly>
          <Checkbox label="Checkbox label" checked />
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label" checked />
        </CheckboxGroup>
      </div>

      {/* Vertical — disabled */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Vertical — disabled
        </p>
        <CheckboxGroup label="Input Label" orientation="vertical" disabled>
          <Checkbox label="Checkbox label" checked />
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label" checked />
        </CheckboxGroup>
      </div>

      {/* Horizontal — normal */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Horizontal — normal
        </p>
        <CheckboxGroup label="Input Label" orientation="horizontal">
          <Checkbox label="Checkbox label" defaultChecked />
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label" defaultChecked />
        </CheckboxGroup>
      </div>

      {/* Horizontal — read-only */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Horizontal — read-only
        </p>
        <CheckboxGroup label="Input Label" orientation="horizontal" readOnly>
          <Checkbox label="Checkbox label" checked />
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label" checked />
        </CheckboxGroup>
      </div>

      {/* Horizontal — disabled */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Horizontal — disabled
        </p>
        <CheckboxGroup label="Input Label" orientation="horizontal" disabled>
          <Checkbox label="Checkbox label" checked />
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label" checked />
        </CheckboxGroup>
      </div>
    </div>
  ),
}

// ─── With descriptions ────────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  render: () => (
    <CheckboxGroup label="Notification preferences">
      <Checkbox
        label="Email notifications"
        description="Receive updates via email"
        defaultChecked
      />
      <Checkbox
        label="SMS alerts"
        description="Get critical alerts via text message"
      />
      <Checkbox
        label="Weekly digest"
        description="A summary of activity every Monday"
        defaultChecked
      />
    </CheckboxGroup>
  ),
}
