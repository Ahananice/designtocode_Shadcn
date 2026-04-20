import type { Meta, StoryObj } from '@storybook/react'
import { Users, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'
import { StatCard } from './StatCard'

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Agents',
    value: 247,
    subLabel: 'Scheduled today',
    icon: <Users className="h-4 w-4" />,
  },
}

export const Success: Story = {
  args: {
    label: 'In Adherence',
    value: 189,
    subLabel: '76.5% of total',
    variant: 'success',
    trend: 'up',
    trendValue: '+5',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
}

export const Critical: Story = {
  args: {
    label: 'Exceptions',
    value: 58,
    subLabel: '42 exceptions · 16 at risk',
    variant: 'critical',
    trend: 'down',
    trendValue: '−8',
    icon: <AlertCircle className="h-4 w-4" />,
  },
}

export const Brand: Story = {
  args: {
    label: 'Adherence Rate',
    value: '76.5%',
    subLabel: 'Rolling today',
    variant: 'brand',
    trend: 'up',
    trendValue: '+2.1%',
    icon: <TrendingUp className="h-4 w-4" />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <StatCard label="Total Agents"    value={247}      subLabel="Scheduled today"       variant="default"  icon={<Users className="h-4 w-4" />} />
      <StatCard label="In Adherence"    value={189}      subLabel="76.5% of total"        variant="success"  trend="up"   trendValue="+5"    icon={<CheckCircle2 className="h-4 w-4" />} />
      <StatCard label="Exceptions"      value={58}       subLabel="42 exc · 16 at risk"   variant="critical" trend="down" trendValue="−8"    icon={<AlertCircle className="h-4 w-4" />} />
      <StatCard label="Adherence Rate"  value="76.5%"    subLabel="Rolling today"         variant="brand"    trend="up"   trendValue="+2.1%" icon={<TrendingUp className="h-4 w-4" />} />
    </div>
  ),
}
