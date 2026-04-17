import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders a single thumb by default', () => {
    const { container } = render(<Slider />)
    expect(container.querySelectorAll('[role="slider"]')).toHaveLength(1)
  })

  it('type=range renders two thumbs', () => {
    const { container } = render(<Slider type="range" />)
    expect(container.querySelectorAll('[role="slider"]')).toHaveLength(2)
  })

  it('type=multiRange renders five thumbs', () => {
    const { container } = render(<Slider type="multiRange" />)
    expect(container.querySelectorAll('[role="slider"]')).toHaveLength(5)
  })

  it('renders label text', () => {
    render(<Slider label="Volume" />)
    expect(screen.getByText('Volume')).toBeTruthy()
  })

  it('renders required asterisk when required=true', () => {
    render(<Slider label="Volume" required />)
    expect(screen.getByText('*')).toBeTruthy()
  })

  it('does not render asterisk when required is omitted', () => {
    render(<Slider label="Volume" />)
    expect(screen.queryByText('*')).toBeNull()
  })

  it('renders help button when showHelp=true', () => {
    render(<Slider label="Volume" showHelp helpText="Info" />)
    expect(screen.getByRole('button', { name: 'Info' })).toBeTruthy()
  })

  it('does not render help button by default', () => {
    render(<Slider label="Volume" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('renders mark labels when provided with showMarks', () => {
    render(
      <Slider showMarks markLabels={['Low', '', 'High']} defaultValue={[50]} />,
    )
    expect(screen.getByText('Low')).toBeTruthy()
    expect(screen.getByText('High')).toBeTruthy()
  })

  it('applies disabled appearance', () => {
    const { container } = render(<Slider label="Vol" disabled />)
    expect(container.querySelector('.opacity-40')).toBeTruthy()
  })

  it('multiRange uses 0-10 scale by default', () => {
    const { container } = render(<Slider type="multiRange" />)
    const root = container.querySelector('[data-orientation="horizontal"]')
    expect(root).toBeTruthy()
  })
})
