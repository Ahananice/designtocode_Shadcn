import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox label="Accept" />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders checked when defaultChecked is true', () => {
    render(<Checkbox label="Accept" defaultChecked />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('data-state', 'checked')
  })

  it('renders indeterminate state', () => {
    render(<Checkbox label="Partial" indeterminate />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('data-state', 'indeterminate')
  })

  it('calls onCheckedChange when clicked', () => {
    const onChange = jest.fn()
    render(<Checkbox label="Accept" onCheckedChange={onChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not call onCheckedChange when readOnly', () => {
    const onChange = jest.fn()
    render(<Checkbox label="Accept" readOnly onCheckedChange={onChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox label="Accept" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })
})

describe('CheckboxGroup', () => {
  it('propagates disabled to children', () => {
    render(
      <CheckboxGroup disabled>
        <Checkbox label="A" />
        <Checkbox label="B" />
      </CheckboxGroup>,
    )
    screen.getAllByRole('checkbox').forEach((cb) => {
      expect(cb).toBeDisabled()
    })
  })

  it('propagates readOnly to children', () => {
    const onChange = jest.fn()
    render(
      <CheckboxGroup readOnly>
        <Checkbox label="A" checked onCheckedChange={onChange} />
      </CheckboxGroup>,
    )
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders horizontal orientation', () => {
    const { container } = render(
      <CheckboxGroup orientation="horizontal">
        <Checkbox label="A" />
        <Checkbox label="B" />
      </CheckboxGroup>,
    )
    const row = container.querySelector('.flex.flex-row')
    expect(row).toBeTruthy()
  })
})
