import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RadioButton } from './RadioButton'
import { RadioButtonGroup } from './RadioButtonGroup'

// Helper: render a standard group
function Group(props: {
  defaultValue?: string
  disabled?: boolean
  readOnly?: boolean
  label?: string
}) {
  return (
    <RadioButtonGroup {...props}>
      <RadioButton value="a" label="Option A" />
      <RadioButton value="b" label="Option B" description="Secondary" />
      <RadioButton value="c" label="Option C" />
    </RadioButtonGroup>
  )
}

describe('RadioButton', () => {
  it('renders label text', () => {
    render(<Group />)
    expect(screen.getByText('Option A')).toBeTruthy()
  })

  it('renders description when provided', () => {
    render(<Group />)
    expect(screen.getByText('Secondary')).toBeTruthy()
  })

  it('renders group label when provided', () => {
    render(<Group label="Choose plan" />)
    expect(screen.getByText('Choose plan')).toBeTruthy()
  })

  it('checks the default value', () => {
    render(<Group defaultValue="b" />)
    const radios = screen.getAllByRole('radio')
    expect(radios[1].getAttribute('data-state')).toBe('checked')
    expect(radios[0].getAttribute('data-state')).toBe('unchecked')
  })

  it('changes selection on click', () => {
    const onChange = vi.fn()
    render(
      <RadioButtonGroup onValueChange={onChange}>
        <RadioButton value="a" label="A" />
        <RadioButton value="b" label="B" />
      </RadioButtonGroup>,
    )
    fireEvent.click(screen.getByRole('radio', { name: 'B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('does not change selection when disabled', () => {
    const onChange = vi.fn()
    render(
      <RadioButtonGroup onValueChange={onChange} disabled>
        <RadioButton value="a" label="A" />
        <RadioButton value="b" label="B" />
      </RadioButtonGroup>,
    )
    fireEvent.click(screen.getByRole('radio', { name: 'A' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not change selection when readOnly', () => {
    const onChange = vi.fn()
    render(
      <RadioButtonGroup onValueChange={onChange} readOnly defaultValue="a">
        <RadioButton value="a" label="A" />
        <RadioButton value="b" label="B" />
      </RadioButtonGroup>,
    )
    fireEvent.click(screen.getByRole('radio', { name: 'B' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('marks all radios as disabled when group is disabled', () => {
    render(<Group disabled />)
    const radios = screen.getAllByRole('radio')
    radios.forEach(r => expect(r).toBeDisabled())
  })

  it('renders three radio buttons', () => {
    render(<Group />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })
})
