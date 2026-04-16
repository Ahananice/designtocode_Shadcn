import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from './Search'

// Helper — get the underlying <input> element
const getInput = () => screen.getByRole('textbox')

describe('Search', () => {
  it('renders without crashing', () => {
    render(<Search />)
    expect(getInput()).toBeInTheDocument()
  })

  it('shows the default placeholder "Search"', () => {
    render(<Search />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('accepts a custom placeholder', () => {
    render(<Search placeholder="Find something…" />)
    expect(screen.getByPlaceholderText('Find something…')).toBeInTheDocument()
  })

  it('calls onChange when the user types', async () => {
    const handleChange = vi.fn()
    render(<Search onChange={handleChange} />)
    await userEvent.type(getInput(), 'react')
    expect(handleChange).toHaveBeenCalled()
  })

  it('calls onSearch with the current value when Enter is pressed', async () => {
    const handleSearch = vi.fn()
    render(<Search onSearch={handleSearch} />)
    await userEvent.type(getInput(), 'tailwind{Enter}')
    expect(handleSearch).toHaveBeenCalledWith('tailwind')
  })

  it('does not call onSearch when non-Enter keys are pressed', async () => {
    const handleSearch = vi.fn()
    render(<Search onSearch={handleSearch} />)
    await userEvent.type(getInput(), 'abc')
    expect(handleSearch).not.toHaveBeenCalled()
  })

  it('renders as disabled', () => {
    render(<Search disabled />)
    expect(getInput()).toBeDisabled()
  })

  it('forwards ref to the underlying input element', () => {
    const ref = { current: null }
    render(<Search ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('has inputMode="search" on the underlying input', () => {
    const { container } = render(<Search />)
    expect(container.querySelector('input')).toHaveAttribute('inputmode', 'search')
  })

  it('renders the magnifying-glass icon', () => {
    const { container } = render(<Search />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
