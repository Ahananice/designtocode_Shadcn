import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 2', href: '/level-2' },
      { label: 'Level 3', href: '/level-2/level-3' },
      { label: 'Page Title' },
    ],
  },
}

export const SingleLevel: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Page Title' },
    ],
  },
}

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Section', href: '/category/sub/section' },
      { label: 'Detail Page' },
    ],
  },
}

export const CurrentPageOnly: Story = {
  args: {
    items: [{ label: 'Page Title' }],
  },
}
