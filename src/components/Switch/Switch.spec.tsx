import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders without label', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('button[role="switch"]')).toBeTruthy()
  })

  it('renders label text', () => {
    render(<Switch label="Notifications" />)
    expect(screen.getByText('Notifications')).toBeTruthy()
  })

  it('label is associated with the switch via htmlFor/id', () => {
    render(<Switch label="Notifications" />)
    const label = screen.getByText('Notifications').closest('label')
    const switchEl = screen.getByRole('switch')
    expect(label?.htmlFor).toBe(switchEl.id)
  })

  it('renders unchecked by default', () => {
    render(<Switch label="Test" />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl.getAttribute('aria-checked')).toBe('false')
    expect(switchEl.getAttribute('data-state')).toBe('unchecked')
  })

  it('renders checked when defaultChecked=true', () => {
    render(<Switch label="Test" defaultChecked />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl.getAttribute('aria-checked')).toBe('true')
  })

  it('is disabled when disabled=true', () => {
    render(<Switch label="Test" disabled />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeDisabled()
  })

  it('renders in unchecked state when indeterminate=true', () => {
    render(<Switch label="Test" indeterminate defaultChecked />)
    // indeterminate overrides checked — should show unchecked
    const switchEl = screen.getByRole('switch')
    expect(switchEl.getAttribute('data-state')).toBe('unchecked')
  })

  it('renders minus icon when indeterminate=true', () => {
    const { container } = render(<Switch indeterminate />)
    // Lucide Minus renders an SVG — check it exists inside thumb
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('renders check icon when showIcon=true and checked', () => {
    const { container } = render(<Switch showIcon defaultChecked />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('does not render icon when showIcon=true but unchecked', () => {
    const { container } = render(<Switch showIcon defaultChecked={false} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeNull()
  })

  it('renders in sm size', () => {
    const { container } = render(<Switch size="sm" label="Test" />)
    // sm track has h-4 class
    const root = container.querySelector('.h-4')
    expect(root).toBeTruthy()
  })
})
