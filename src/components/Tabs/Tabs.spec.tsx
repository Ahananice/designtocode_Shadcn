import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const items = [
  { value: 'tab1', label: 'First Tab',  content: <p>Panel One</p>   },
  { value: 'tab2', label: 'Second Tab', content: <p>Panel Two</p>   },
  { value: 'tab3', label: 'Third Tab',  content: <p>Panel Three</p> },
]

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tab', { name: 'First Tab' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Second Tab' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Third Tab' })).toBeInTheDocument()
  })

  it('activates the first tab by default', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tab', { name: 'First Tab' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Second Tab' })).toHaveAttribute('data-state', 'inactive')
  })

  it('respects a custom defaultValue', () => {
    render(<Tabs items={items} defaultValue="tab2" />)
    expect(screen.getByRole('tab', { name: 'Second Tab' })).toHaveAttribute('data-state', 'active')
  })

  it('shows the active panel content', () => {
    render(<Tabs items={items} defaultValue="tab1" />)
    expect(screen.getByText('Panel One')).toBeInTheDocument()
  })

  it('switches panel when a tab is clicked', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} defaultValue="tab1" />)

    await user.click(screen.getByRole('tab', { name: 'Second Tab' }))

    expect(screen.getByRole('tab', { name: 'Second Tab' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByText('Panel Two')).toBeVisible()
  })

  it('calls onValueChange when a tab is clicked', async () => {
    const user = userEvent.setup()
    const spy = vi.fn()
    render(<Tabs items={items} onValueChange={spy} />)

    await user.click(screen.getByRole('tab', { name: 'Third Tab' }))

    expect(spy).toHaveBeenCalledWith('tab3')
  })

  it('does not activate a disabled tab', async () => {
    const user = userEvent.setup()
    const disabledItems = [
      ...items.slice(0, 1),
      { ...items[1], disabled: true },
      items[2],
    ]
    render(<Tabs items={disabledItems} defaultValue="tab1" />)

    await user.click(screen.getByRole('tab', { name: 'Second Tab' }))

    expect(screen.getByRole('tab', { name: 'First Tab' })).toHaveAttribute('data-state', 'active')
  })

  it('renders with horizontal orientation by default', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tablist')).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('renders with vertical orientation when specified', () => {
    render(<Tabs items={items} orientation="vertical" />)
    expect(screen.getByRole('tablist')).toHaveAttribute('data-orientation', 'vertical')
  })

  it('renders an icon when provided', () => {
    const withIcon = [
      { value: 'tab1', label: 'Home', icon: <svg data-testid="icon" />, content: <p>Content</p> },
    ]
    render(<Tabs items={withIcon} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
