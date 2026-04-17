import type { Meta, StoryObj } from '@storybook/react'
import { SideNav } from './SideNav'

const meta = {
  title: 'Components/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ height: '600px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideNav>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  args: { activeId: 'realtime', collapsed: false },
}

export const Collapsed: Story = {
  args: { activeId: 'realtime', collapsed: true },
}

export const ActiveDashboard: Story = {
  args: { activeId: 'dashboard', collapsed: false },
}
