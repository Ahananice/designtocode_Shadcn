import type { Meta, StoryObj } from '@storybook/react'
import { RealtimeAdherencePage } from './RealtimeAdherencePage'
import type { AgentRow } from './RealtimeAdherencePage'

const meta = {
  title: 'Pages/RealtimeAdherence',
  component: RealtimeAdherencePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-screen workforce management page. Composed of AppHeader, SideNav, StatCards, filter toolbar, and an interactive agent adherence table.',
      },
    },
  },
} satisfies Meta<typeof RealtimeAdherencePage>

export default meta
type Story = StoryObj<typeof meta>

// ─── Default (mock data) ──────────────────────────────────────────────────────

export const Default: Story = {}

// ─── High exception rate ──────────────────────────────────────────────────────

const HIGH_EXCEPTION_AGENTS: AgentRow[] = [
  { id: '1',  name: 'Sarah Wilson',   initials: 'SW', team: 'Team Alpha', scheduledActivity: 'phone',    currentActivity: 'break',     status: 'exception', duration: '0:14:22', adherencePct: 51.2, exceptions: 6 },
  { id: '2',  name: 'John Smith',     initials: 'JS', team: 'Team Beta',  scheduledActivity: 'available',currentActivity: 'offline',   status: 'exception', duration: '0:32:10', adherencePct: 44.7, exceptions: 8 },
  { id: '3',  name: 'Maria Garcia',   initials: 'MG', team: 'Team Alpha', scheduledActivity: 'phone',    currentActivity: 'phone',     status: 'adherent',  duration: '0:08:30', adherencePct: 88.5, exceptions: 1 },
  { id: '4',  name: 'James Chen',     initials: 'JC', team: 'Team Gamma', scheduledActivity: 'lunch',    currentActivity: 'available', status: 'exception', duration: '0:22:00', adherencePct: 38.3, exceptions: 9 },
  { id: '5',  name: 'Emily Davis',    initials: 'ED', team: 'Team Beta',  scheduledActivity: 'phone',    currentActivity: 'phone',     status: 'adherent',  duration: '0:41:18', adherencePct: 91.7, exceptions: 0 },
  { id: '6',  name: 'Robert Martinez',initials: 'RM', team: 'Team Delta', scheduledActivity: 'meeting',  currentActivity: 'away',      status: 'at-risk',   duration: '0:07:05', adherencePct: 73.9, exceptions: 3 },
]

export const HighExceptionRate: Story = {
  args: { agents: HIGH_EXCEPTION_AGENTS },
}

// ─── All adherent ─────────────────────────────────────────────────────────────

const ALL_ADHERENT_AGENTS: AgentRow[] = [
  { id: '1', name: 'Sarah Wilson',  initials: 'SW', team: 'Team Alpha', scheduledActivity: 'phone',    currentActivity: 'phone',    status: 'adherent', duration: '0:23:45', adherencePct: 97.2, exceptions: 0 },
  { id: '2', name: 'John Smith',    initials: 'JS', team: 'Team Beta',  scheduledActivity: 'break',    currentActivity: 'break',    status: 'adherent', duration: '0:04:12', adherencePct: 99.1, exceptions: 0 },
  { id: '3', name: 'Maria Garcia',  initials: 'MG', team: 'Team Alpha', scheduledActivity: 'phone',    currentActivity: 'phone',    status: 'adherent', duration: '0:55:30', adherencePct: 96.8, exceptions: 0 },
  { id: '4', name: 'James Chen',    initials: 'JC', team: 'Team Gamma', scheduledActivity: 'training', currentActivity: 'training', status: 'adherent', duration: '1:02:00', adherencePct: 98.4, exceptions: 0 },
  { id: '5', name: 'Emily Davis',   initials: 'ED', team: 'Team Beta',  scheduledActivity: 'meeting',  currentActivity: 'meeting',  status: 'adherent', duration: '0:17:22', adherencePct: 95.1, exceptions: 0 },
]

export const AllAdherent: Story = {
  args: { agents: ALL_ADHERENT_AGENTS },
}

// ─── Empty state ──────────────────────────────────────────────────────────────

export const EmptyState: Story = {
  args: { agents: [] },
}

