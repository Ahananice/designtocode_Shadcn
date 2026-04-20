import type { Meta, StoryObj } from '@storybook/react'
import { Search, Mail, User, Lock, DollarSign, Globe } from 'lucide-react'
import { InputField } from './InputField'

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Input Label',
    placeholder: 'Text',
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

// ─── All states ───────────────────────────────────────────────────────────────

/**
 * Design matrix: all interactive states for the text type.
 * Hover and focus states require mouse/keyboard interaction.
 */
export const AllStates: Story = {
  render: () => {
    type Row = { label: string; note?: string; props: React.ComponentProps<typeof InputField> }
    const rows: Row[] = [
      { label: 'Default',            props: { placeholder: 'Text' } },
      { label: 'Hover',              note: '(interact)', props: { placeholder: 'Text' } },
      { label: 'Focus',              note: '(interact)', props: { placeholder: 'Text' } },
      { label: 'With value',         props: { value: 'Text value', onChange: () => {} } },
      { label: 'Placeholder',        props: { placeholder: 'Placeholder text' } },
      { label: 'Read-only',          props: { readOnly: true, value: 'Read-only value', onChange: () => {} } },
      { label: 'Disabled',           props: { disabled: true, placeholder: 'Text' } },
      { label: 'Disabled with value',props: { disabled: true, value: 'Disabled value', onChange: () => {} } },
      { label: 'Error',              props: { placeholder: 'Text', error: 'This field is required' } },
      { label: 'Error with value',   props: { value: 'Bad value', onChange: () => {}, error: 'Invalid input' } },
      { label: 'Required',           props: { placeholder: 'Text', required: true } },
      { label: 'With helper text',   props: { placeholder: 'Text', helperText: 'This is helper text' } },
    ]

    return (
      <div className="w-full max-w-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary w-44">
                State
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
                Control
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lyra-border-subtle">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="px-3 py-3 text-xs text-lyra-fg-secondary font-medium whitespace-nowrap">
                  {r.label}
                  {r.note && (
                    <span className="ml-1 text-lyra-fg-disabled font-normal">{r.note}</span>
                  )}
                </td>
                <td className="px-3 py-3 w-64">
                  <InputField label="Input Label" {...r.props} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}

// ─── Individual states ────────────────────────────────────────────────────────

export const Default: Story = {}

export const WithValue: Story = {
  args: { value: 'Text value', onChange: () => {} },
}

export const Required: Story = {
  args: { required: true },
}

export const WithHelperText: Story = {
  args: { helperText: 'This is helper text.' },
}

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'Read-only value', onChange: () => {} },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Error: Story = {
  args: { error: 'This field is required', placeholder: 'Text' },
}

export const ErrorWithValue: Story = {
  args: { value: 'invalid@', onChange: () => {}, error: 'Please enter a valid email' },
}

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search…',
    leadingIcon: <Search className="h-4 w-4" />,
  },
}

export const WithTrailingIcon: Story = {
  args: {
    label: 'Website',
    placeholder: 'example.com',
    trailingIcon: <Globe className="h-4 w-4" />,
  },
}

export const WithBothIcons: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    leadingIcon: <Mail className="h-4 w-4" />,
  },
}

export const WithLeadingIconError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    leadingIcon: <User className="h-4 w-4" />,
    error: 'Username already taken',
  },
}

// ─── Prefix / Suffix ──────────────────────────────────────────────────────────

export const WithPrefix: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    prefix: '$',
  },
}

export const WithSuffix: Story = {
  args: {
    label: 'Domain',
    placeholder: 'yoursite',
    suffix: '.com',
  },
}

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Price range',
    type: 'number',
    placeholder: '0',
    prefix: '$',
    suffix: 'USD',
  },
}

// ─── Input types ─────────────────────────────────────────────────────────────

export const Password: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
}

export const PasswordDisabled: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••', disabled: true },
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

// ─── Select ───────────────────────────────────────────────────────────────────

export const SelectInput: Story = {
  name: 'Select',
  args: {
    type: 'select',
    label: 'Country',
    placeholder: 'Select…',
    options: COUNTRY_OPTIONS,
  },
}

export const SelectRequired: Story = {
  name: 'Select — required',
  args: {
    type: 'select',
    label: 'Country',
    required: true,
    placeholder: 'Select…',
    options: COUNTRY_OPTIONS,
  },
}

export const SelectReadOnly: Story = {
  name: 'Select — read-only',
  args: {
    type: 'select',
    label: 'Country',
    readOnly: true,
    value: 'us',
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

// ─── Full design matrix ───────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
        Text states
      </p>
      <InputField label="Input Label" placeholder="Text" />
      <InputField label="Input Label" placeholder="Text" required />
      <InputField label="Input Label" readOnly value="Read-only" onChange={() => {}} />
      <InputField label="Input Label" disabled placeholder="Text" />
      <InputField label="Input Label" placeholder="Text" error="Required" />
      <InputField label="Input Label" placeholder="Text" helperText="Hint text here" />

      <hr className="border-lyra-border-subtle" />
      <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
        Icons &amp; adornments
      </p>
      <InputField label="Search" placeholder="Search…" leadingIcon={<Search className="h-4 w-4" />} />
      <InputField label="Website" placeholder="example.com" trailingIcon={<Globe className="h-4 w-4" />} />
      <InputField label="Amount" type="number" placeholder="0.00" prefix="$" />
      <InputField label="Domain" placeholder="yoursite" suffix=".com" />

      <hr className="border-lyra-border-subtle" />
      <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
        Specialised types
      </p>
      <InputField label="Password" type="password" placeholder="••••••••" />
      <InputField label="Date" type="date" />
      <InputField label="Time" type="time" />
      <InputField label="Email" type="email" placeholder="you@example.com" />

      <hr className="border-lyra-border-subtle" />
      <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
        Select
      </p>
      <InputField label="Country" type="select" placeholder="Select…" options={COUNTRY_OPTIONS} />
      <InputField label="Country" type="select" readOnly value="us" options={COUNTRY_OPTIONS} />
      <InputField label="Country" type="select" disabled options={COUNTRY_OPTIONS} />
      <InputField label="Country" type="select" error="Required" options={COUNTRY_OPTIONS} />
    </div>
  ),
}
