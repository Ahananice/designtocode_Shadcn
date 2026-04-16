import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  // ── Rendering ────────────────────────────────────────────────────────────

  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('is a <button> element by default', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement)
  })

  // ── Variants ─────────────────────────────────────────────────────────────

  it.each(['default', 'primary', 'destructive', 'ghost'] as const)(
    'renders variant "%s" without throwing',
    (variant) => {
      expect(() => render(<Button variant={variant}>Btn</Button>)).not.toThrow()
    },
  )

  // ── Sizes ────────────────────────────────────────────────────────────────

  it.each(['default', 'sm', 'lg', 'icon'] as const)(
    'renders size "%s" without throwing',
    (size) => {
      expect(() => render(<Button size={size}>Btn</Button>)).not.toThrow()
    },
  )

  // ── Disabled ─────────────────────────────────────────────────────────────

  it('is not disabled by default', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const spy = vi.fn()
    render(<Button disabled onClick={spy}>Click</Button>)

    await user.click(screen.getByRole('button'))

    expect(spy).not.toHaveBeenCalled()
  })

  // ── Interactions ──────────────────────────────────────────────────────────

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const spy = vi.fn()
    render(<Button onClick={spy}>Click</Button>)

    await user.click(screen.getByRole('button'))

    expect(spy).toHaveBeenCalledOnce()
  })

  it('is keyboard-accessible — fires on Enter', async () => {
    const user = userEvent.setup()
    const spy = vi.fn()
    render(<Button onClick={spy}>Click</Button>)

    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')

    expect(spy).toHaveBeenCalledOnce()
  })

  it('is keyboard-accessible — fires on Space', async () => {
    const user = userEvent.setup()
    const spy = vi.fn()
    render(<Button onClick={spy}>Click</Button>)

    screen.getByRole('button').focus()
    await user.keyboard(' ')

    expect(spy).toHaveBeenCalledOnce()
  })

  // ── asChild ───────────────────────────────────────────────────────────────

  it('renders as a child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/home')
  })

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('forwards aria-label to the element', () => {
    render(<Button aria-label="Close dialog">✕</Button>)
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  })

  it('forwards ref to the button element', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref test</Button>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })
})
