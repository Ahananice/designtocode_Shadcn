import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputField } from './InputField'

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

describe('InputField', () => {
  // ── Baseline ────────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<InputField placeholder="Text" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the label and associates it with the input', () => {
    render(<InputField label="Input Label" placeholder="Text" />)
    const label = screen.getByText('Input Label')
    const input = screen.getByRole('textbox')
    expect(label).toHaveAttribute('for', input.id)
  })

  it('renders without a label when label prop is omitted', () => {
    const { container } = render(<InputField placeholder="Text" />)
    expect(container.querySelector('label')).toBeNull()
  })

  // ── Error state ─────────────────────────────────────────────────────────

  it('shows the error message and sets aria-invalid', () => {
    render(<InputField label="Input Label" error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not render an error element when error is absent', () => {
    render(<InputField label="Input Label" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')
  })

  it('links aria-describedby to the error element id', () => {
    render(<InputField label="Input Label" error="Required" />)
    const input = screen.getByRole('textbox')
    const errorId = input.getAttribute('aria-describedby')
    expect(document.getElementById(errorId!)).toHaveTextContent('Required')
  })

  // ── Disabled / read-only ────────────────────────────────────────────────

  it('forwards the disabled prop', () => {
    render(<InputField label="Input Label" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards the readOnly prop', () => {
    render(
      <InputField label="Input Label" readOnly value="Text" onChange={() => {}} />,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  // ── Interaction ─────────────────────────────────────────────────────────

  it('calls onChange when the user types', async () => {
    const handleChange = vi.fn()
    render(<InputField label="Input Label" onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('accepts a custom id and links label to it', () => {
    render(<InputField id="my-field" label="Input Label" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-field')
    expect(screen.getByText('Input Label')).toHaveAttribute('for', 'my-field')
  })

  it('forwards ref to the input element', () => {
    const ref = { current: null }
    render(<InputField ref={ref} label="Input Label" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  // ── Password ────────────────────────────────────────────────────────────

  it('renders a password input with hidden text by default', () => {
    render(<InputField type="password" label="Password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('toggles password visibility when the eye button is clicked', async () => {
    render(<InputField type="password" label="Password" />)
    const input = screen.getByLabelText('Password')
    const toggle = screen.getByRole('button', { name: /show password/i })
    expect(input).toHaveAttribute('type', 'password')
    await userEvent.click(toggle)
    expect(input).toHaveAttribute('type', 'text')
    await userEvent.click(screen.getByRole('button', { name: /hide password/i }))
    expect(input).toHaveAttribute('type', 'password')
  })

  // ── Number ──────────────────────────────────────────────────────────────

  it('renders a number input', () => {
    render(<InputField type="number" label="Qty" />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  // ── Date ────────────────────────────────────────────────────────────────

  it('renders a date input', () => {
    const { container } = render(<InputField type="date" label="Birth date" />)
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument()
  })

  // ── Time ────────────────────────────────────────────────────────────────

  it('renders a time input', () => {
    const { container } = render(<InputField type="time" label="Start time" />)
    expect(container.querySelector('input[type="time"]')).toBeInTheDocument()
  })

  // ── Email ───────────────────────────────────────────────────────────────

  it('renders an email input', () => {
    const { container } = render(
      <InputField type="email" label="Email" placeholder="you@example.com" />,
    )
    expect(container.querySelector('input[type="email"]')).toBeInTheDocument()
  })

  // ── Select ──────────────────────────────────────────────────────────────

  it('renders a select trigger when type="select"', () => {
    render(<InputField type="select" label="Country" options={OPTIONS} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders the select placeholder', () => {
    render(
      <InputField
        type="select"
        label="Country"
        placeholder="Select..."
        options={OPTIONS}
      />,
    )
    expect(screen.getByText('Select...')).toBeInTheDocument()
  })

  it('calls onValueChange when a select option is chosen', async () => {
    const handleChange = vi.fn()
    render(
      <InputField
        type="select"
        label="Country"
        options={OPTIONS}
        onValueChange={handleChange}
      />,
    )
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Option A'))
    expect(handleChange).toHaveBeenCalledWith('a')
  })

  it('disables the select trigger when disabled', () => {
    render(
      <InputField type="select" label="Country" disabled options={OPTIONS} />,
    )
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('shows error on select', () => {
    render(
      <InputField
        type="select"
        label="Country"
        error="Required"
        options={OPTIONS}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })
})
