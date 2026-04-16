import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  // ── Baseline ────────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<TextArea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders a label and associates it with the textarea', () => {
    render(<TextArea label="Notes" />)
    const label = screen.getByText('Notes')
    const textarea = screen.getByRole('textbox')
    expect(label).toHaveAttribute('for', textarea.id)
  })

  it('renders without a label when label is omitted', () => {
    const { container } = render(<TextArea />)
    expect(container.querySelector('label')).toBeNull()
  })

  // ── Character count ─────────────────────────────────────────────────────

  it('shows char count when maxLength is set', () => {
    render(<TextArea maxLength={100} defaultValue="hello" />)
    expect(screen.getByText('5/100')).toBeInTheDocument()
  })

  it('updates char count as the user types', async () => {
    render(<TextArea maxLength={100} />)
    await userEvent.type(screen.getByRole('textbox'), 'abc')
    expect(screen.getByText('3/100')).toBeInTheDocument()
  })

  it('hides char count when error is present', () => {
    render(<TextArea maxLength={100} error="Required" />)
    expect(screen.queryByText(/\/100/)).not.toBeInTheDocument()
  })

  // ── Error state ─────────────────────────────────────────────────────────

  it('shows error message and sets aria-invalid', () => {
    render(<TextArea error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links aria-describedby to the error element', () => {
    render(<TextArea error="Required" />)
    const textarea = screen.getByRole('textbox')
    const errorId = textarea.getAttribute('aria-describedby')
    expect(document.getElementById(errorId!)).toHaveTextContent('Required')
  })

  // ── Disabled / read-only ────────────────────────────────────────────────

  it('disables the textarea', () => {
    render(<TextArea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('marks the textarea as read-only', () => {
    render(<TextArea readOnly value="hello" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  // ── Interaction ─────────────────────────────────────────────────────────

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn()
    render(<TextArea onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('forwards ref to the textarea element', () => {
    const ref = { current: null }
    render(<TextArea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  // ── AI variant ──────────────────────────────────────────────────────────

  it('renders AI footer buttons when variant="ai"', () => {
    render(<TextArea variant="ai" />)
    expect(screen.getByRole('button', { name: /ai assist/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /thumbs up/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /thumbs down/i })).toBeInTheDocument()
  })

  it('renders action buttons in AI footer', () => {
    render(
      <TextArea
        variant="ai"
        actions={[{ label: 'Action 1' }, { label: 'Action 2' }]}
      />,
    )
    expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument()
  })

  it('calls onThumbsUp when thumbs-up button is clicked', async () => {
    const handleUp = vi.fn()
    render(<TextArea variant="ai" onThumbsUp={handleUp} />)
    await userEvent.click(screen.getByRole('button', { name: /thumbs up/i }))
    expect(handleUp).toHaveBeenCalled()
  })

  it('calls onThumbsDown when thumbs-down button is clicked', async () => {
    const handleDown = vi.fn()
    render(<TextArea variant="ai" onThumbsDown={handleDown} />)
    await userEvent.click(screen.getByRole('button', { name: /thumbs down/i }))
    expect(handleDown).toHaveBeenCalled()
  })

  it('calls onAiClick when AI button is clicked', async () => {
    const handleAi = vi.fn()
    render(<TextArea variant="ai" onAiClick={handleAi} />)
    await userEvent.click(screen.getByRole('button', { name: /ai assist/i }))
    expect(handleAi).toHaveBeenCalled()
  })

  it('does not render AI footer for default variant', () => {
    render(<TextArea />)
    expect(screen.queryByRole('button', { name: /ai assist/i })).not.toBeInTheDocument()
  })
})
