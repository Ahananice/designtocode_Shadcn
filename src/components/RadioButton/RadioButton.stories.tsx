import type { Meta, StoryObj } from '@storybook/react'
import { RadioButton } from './RadioButton'
import { RadioButtonGroup } from './RadioButtonGroup'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Individual states ────────────────────────────────────────────────────────

/**
 * Mirrors the Figma state grid (10 rows):
 * 3× unchecked (default / hover / pressed)
 * 3× checked   (default / hover / pressed)
 * 1× read-only checked
 * 2× disabled  (unchecked / unchecked-alt)
 * 1× disabled  checked
 *
 * Hover and pressed states require mouse interaction.
 */
export const AllStates: Story = {
  render: () => {
    const states: {
      label: string
      note?: string
      value: string
      checked?: boolean
      disabled?: boolean
      readOnly?: boolean
    }[] = [
      { label: 'Unchecked — default',               value: 'a' },
      { label: 'Unchecked — hover',   note: '(interact)', value: 'b' },
      { label: 'Unchecked — pressed', note: '(interact)', value: 'c' },
      { label: 'Checked — default',                  value: 'd', checked: true },
      { label: 'Checked — hover',     note: '(interact)', value: 'e', checked: true },
      { label: 'Checked — pressed',   note: '(interact)', value: 'f', checked: true },
      { label: 'Read-only checked',                  value: 'g', checked: true, readOnly: true },
      { label: 'Disabled unchecked',                 value: 'h', disabled: true },
      { label: 'Disabled unchecked (alt)',            value: 'i', disabled: true },
      { label: 'Disabled checked',                   value: 'j', checked: true, disabled: true },
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
                Radio label
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lyra-border-subtle">
            {states.map((s, i) => (
              <tr key={i}>
                <td className="px-3 py-2 text-xs text-lyra-fg-secondary font-medium whitespace-nowrap">
                  {s.label}
                  {s.note && (
                    <span className="ml-1 text-lyra-fg-disabled font-normal">{s.note}</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {/* Wrap each item in an isolated group so checked state works */}
                  <RadioButtonGroup
                    defaultValue={s.checked ? s.value : undefined}
                    readOnly={!!s.readOnly}
                    disabled={s.disabled}
                  >
                    <RadioButton value={s.value} label="Radio label" />
                  </RadioButtonGroup>
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
    <RadioButtonGroup defaultValue="b">
      <RadioButton value="a" label="Radio label" />
      <RadioButton
        value="b"
        label="Radio label"
        description="Secondary Text"
      />
    </RadioButtonGroup>
  ),
}

// ─── Group — vertical (default) ───────────────────────────────────────────────

export const GroupVertical: Story = {
  render: () => (
    <RadioButtonGroup label="Input Label" defaultValue="a" orientation="vertical">
      <RadioButton value="a" label="Radio label" />
      <RadioButton value="b" label="Radio label" />
      <RadioButton value="c" label="Radio label" />
    </RadioButtonGroup>
  ),
}

// ─── Group — horizontal ───────────────────────────────────────────────────────

export const GroupHorizontal: Story = {
  render: () => (
    <RadioButtonGroup label="Input Label" defaultValue="a" orientation="horizontal">
      <RadioButton value="a" label="Radio label" />
      <RadioButton value="b" label="Radio label" />
      <RadioButton value="c" label="Radio label" />
    </RadioButtonGroup>
  ),
}

// ─── Group — read-only ────────────────────────────────────────────────────────

export const GroupReadOnly: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioButtonGroup
        label="Input Label"
        defaultValue="a"
        orientation="vertical"
        readOnly
      >
        <RadioButton value="a" label="Radio label" />
        <RadioButton value="b" label="Radio label" />
        <RadioButton value="c" label="Radio label" />
      </RadioButtonGroup>

      <RadioButtonGroup
        label="Input Label"
        defaultValue="a"
        orientation="horizontal"
        readOnly
      >
        <RadioButton value="a" label="Radio label" />
        <RadioButton value="b" label="Radio label" />
        <RadioButton value="c" label="Radio label" />
      </RadioButtonGroup>
    </div>
  ),
}

// ─── Group — disabled ─────────────────────────────────────────────────────────

export const GroupDisabled: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioButtonGroup
        label="Input Label"
        defaultValue="a"
        orientation="vertical"
        disabled
      >
        <RadioButton value="a" label="Radio label" />
        <RadioButton value="b" label="Radio label" />
        <RadioButton value="c" label="Radio label" />
      </RadioButtonGroup>

      <RadioButtonGroup
        label="Input Label"
        defaultValue="a"
        orientation="horizontal"
        disabled
      >
        <RadioButton value="a" label="Radio label" />
        <RadioButton value="b" label="Radio label" />
        <RadioButton value="c" label="Radio label" />
      </RadioButtonGroup>
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
        <RadioButtonGroup label="Input Label" defaultValue="a">
          <RadioButton value="a" label="Radio label" />
          <RadioButton value="b" label="Radio label" />
          <RadioButton value="c" label="Radio label" />
        </RadioButtonGroup>
      </div>

      {/* Vertical — read-only */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Vertical — read-only
        </p>
        <RadioButtonGroup label="Input Label" defaultValue="a" readOnly>
          <RadioButton value="a" label="Radio label" />
          <RadioButton value="b" label="Radio label" />
          <RadioButton value="c" label="Radio label" />
        </RadioButtonGroup>
      </div>

      {/* Vertical — disabled */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Vertical — disabled
        </p>
        <RadioButtonGroup label="Input Label" defaultValue="a" disabled>
          <RadioButton value="a" label="Radio label" />
          <RadioButton value="b" label="Radio label" />
          <RadioButton value="c" label="Radio label" />
        </RadioButtonGroup>
      </div>

      {/* Horizontal — normal */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Horizontal — normal
        </p>
        <RadioButtonGroup label="Input Label" defaultValue="a" orientation="horizontal">
          <RadioButton value="a" label="Radio label" />
          <RadioButton value="b" label="Radio label" />
          <RadioButton value="c" label="Radio label" />
        </RadioButtonGroup>
      </div>

      {/* Horizontal — read-only */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Horizontal — read-only
        </p>
        <RadioButtonGroup label="Input Label" defaultValue="a" orientation="horizontal" readOnly>
          <RadioButton value="a" label="Radio label" />
          <RadioButton value="b" label="Radio label" />
          <RadioButton value="c" label="Radio label" />
        </RadioButtonGroup>
      </div>

      {/* Horizontal — disabled */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Horizontal — disabled
        </p>
        <RadioButtonGroup label="Input Label" defaultValue="a" orientation="horizontal" disabled>
          <RadioButton value="a" label="Radio label" />
          <RadioButton value="b" label="Radio label" />
          <RadioButton value="c" label="Radio label" />
        </RadioButtonGroup>
      </div>
    </div>
  ),
}

// ─── With descriptions ────────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  render: () => (
    <RadioButtonGroup label="Subscription plan" defaultValue="pro">
      <RadioButton
        value="free"
        label="Free"
        description="Up to 3 projects, community support"
      />
      <RadioButton
        value="pro"
        label="Pro"
        description="Unlimited projects, priority support"
      />
      <RadioButton
        value="ent"
        label="Enterprise"
        description="Custom limits, dedicated account manager"
      />
    </RadioButtonGroup>
  ),
}
