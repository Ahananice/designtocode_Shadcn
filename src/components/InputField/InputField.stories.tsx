import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from './InputField'

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
]

const meta = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Input Label',
    placeholder: 'Text',
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

// ── States (text) ──────────────────────────────────────────────────────────

export const Default: Story = {}

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'Text', onChange: () => {} },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Error: Story = {
  args: { error: 'Required' },
}

// ── Input types ────────────────────────────────────────────────────────────

export const Password: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
}

export const Number: Story = {
  args: { type: 'number', label: 'Quantity', placeholder: '0' },
}

export const DateInput: Story = {
  name: 'Date',
  args: { type: 'date', label: 'Birth date' },
}

export const TimeInput: Story = {
  name: 'Time',
  args: { type: 'time', label: 'Start time' },
}

export const Email: Story = {
  args: { type: 'email', label: 'Email', placeholder: 'you@example.com' },
}

export const Tel: Story = {
  args: { type: 'tel', label: 'Phone', placeholder: '+1 555 000 0000' },
}

export const SelectInput: Story = {
  name: 'Select',
  args: {
    type: 'select',
    label: 'Country',
    placeholder: 'Select...',
    options: COUNTRY_OPTIONS,
  },
}

export const SelectDisabled: Story = {
  name: 'Select — disabled',
  args: {
    type: 'select',
    label: 'Country',
    disabled: true,
    options: COUNTRY_OPTIONS,
  },
}

export const SelectError: Story = {
  name: 'Select — error',
  args: {
    type: 'select',
    label: 'Country',
    error: 'Required',
    options: COUNTRY_OPTIONS,
  },
}

// ── Full design matrix ─────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      {/* States */}
      <InputField label="Input Label" placeholder="Text" />
      <InputField
        label="Input Label"
        readOnly
        value="Text"
        onChange={() => {}}
      />
      <InputField label="Input Label" disabled placeholder="Text" />
      <InputField label="Input Label" placeholder="Text" error="Required" />

      <hr className="border-gray-200" />

      {/* Types */}
      <InputField label="Password" type="password" placeholder="••••••••" />
      <InputField label="Quantity" type="number" placeholder="0" />
      <InputField label="Birth date" type="date" />
      <InputField label="Start time" type="time" />
      <InputField label="Email" type="email" placeholder="you@example.com" />

      <hr className="border-gray-200" />

      {/* Select */}
      <InputField
        label="Country"
        type="select"
        placeholder="Select..."
        options={COUNTRY_OPTIONS}
      />
      <InputField
        label="Country"
        type="select"
        disabled
        options={COUNTRY_OPTIONS}
      />
      <InputField
        label="Country"
        type="select"
        error="Required"
        options={COUNTRY_OPTIONS}
      />
    </div>
  ),
}
