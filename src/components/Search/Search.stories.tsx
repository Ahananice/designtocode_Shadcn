import type { Meta, StoryObj } from '@storybook/react'
import { Search } from './Search'

const meta = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[220px]">
      <Search placeholder="Search" />
    </div>
  ),
}

export const Focused: Story = {
  render: () => (
    <div className="w-[220px]">
      <Search placeholder="Search" autoFocus />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[220px]">
      <Search placeholder="Search" disabled />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="w-[220px]">
      <Search value="React components" onChange={() => {}} />
    </div>
  ),
}

/** Mirrors the 2-column × 4-row design matrix */
export const AllVariants: Story = {
  render: () => (
    <div className="grid w-[460px] grid-cols-2 gap-3">
      <Search placeholder="Search" />
      <Search placeholder="Search" />

      <Search placeholder="Search" />
      <Search placeholder="Search" />

      <Search placeholder="Search" autoFocus />
      <Search placeholder="Search" />

      <Search placeholder="Search" disabled />
      <Search placeholder="Search" disabled />
    </div>
  ),
}
