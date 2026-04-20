import type { Meta, StoryObj } from '@storybook/react'
import { AppHeader } from './AppHeader'

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPageTitle: Story = {
  args: { pageTitle: 'Realtime Adherence' },
}

export const NoNotifications: Story = {
  args: { notificationCount: 0 },
}

export const ManyNotifications: Story = {
  args: { notificationCount: 12, pageTitle: 'Dashboard' },
}
