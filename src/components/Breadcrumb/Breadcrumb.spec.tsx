import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

const items = [
  { label: 'Home',       href: '/'         },
  { label: 'Level 2',    href: '/level-2'  },
  { label: 'Level 3',    href: '/level-2/level-3' },
  { label: 'Page Title' },
]

describe('Breadcrumb', () => {
  it('renders all item labels', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
    expect(screen.getByText('Level 3')).toBeInTheDocument()
    expect(screen.getByText('Page Title')).toBeInTheDocument()
  })

  it('renders ancestor items as links with correct hrefs', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Level 2' })).toHaveAttribute('href', '/level-2')
    expect(screen.getByRole('link', { name: 'Level 3' })).toHaveAttribute('href', '/level-2/level-3')
  })

  it('renders the last item as plain text, not a link', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.queryByRole('link', { name: 'Page Title' })).toBeNull()
    expect(screen.getByText('Page Title').tagName).toBe('SPAN')
  })

  it('marks the last item with aria-current="page"', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Page Title')).toHaveAttribute('aria-current', 'page')
  })

  it('does not mark ancestor items with aria-current', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('renders the correct number of separators', () => {
    const { container } = render(<Breadcrumb items={items} />)
    // 4 items → 3 separators
    const separators = container.querySelectorAll('[aria-hidden="true"]')
    expect(separators).toHaveLength(3)
  })

  it('renders a single-item breadcrumb with aria-current', () => {
    render(<Breadcrumb items={[{ label: 'Only Page' }]} />)
    expect(screen.getByText('Only Page')).toHaveAttribute('aria-current', 'page')
  })

  it('renders items without href as plain text (not a link)', () => {
    const mixed = [
      { label: 'Home', href: '/' },
      { label: 'No Link' },
    ]
    render(<Breadcrumb items={mixed} />)
    expect(screen.queryByRole('link', { name: 'No Link' })).toBeNull()
  })

  it('has a nav landmark with accessible label', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })
})
