import * as React from 'react'
import {
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppHeader } from '@/components/AppHeader'
import { SideNav } from '@/components/SideNav'
import { StatCard } from '@/components/StatCard'

// ─── Data types ───────────────────────────────────────────────────────────────

export type ActivityType =
  | 'phone'
  | 'available'
  | 'break'
  | 'lunch'
  | 'training'
  | 'meeting'
  | 'away'
  | 'offline'

export type AdherenceStatus = 'adherent' | 'exception' | 'at-risk'

export interface AgentRow {
  id: string
  name: string
  initials: string
  team: string
  scheduledActivity: ActivityType
  currentActivity: ActivityType
  status: AdherenceStatus
  duration: string   // e.g. "0:23:45"
  adherencePct: number
  exceptions: number
}

type SortKey = keyof Pick<AgentRow, 'name' | 'team' | 'status' | 'adherencePct' | 'duration'>
type SortDir = 'asc' | 'desc' | null

// ─── Activity badge ───────────────────────────────────────────────────────────

const ACTIVITY_STYLE: Record<ActivityType, { bg: string; fg: string; label: string }> = {
  phone:     { bg: 'var(--lyra-color-accent-blue-soft)',    fg: 'var(--lyra-color-accent-blue-fg)',    label: 'Phone'     },
  available: { bg: 'var(--lyra-color-accent-green-soft)',   fg: 'var(--lyra-color-accent-green-fg)',   label: 'Available' },
  break:     { bg: 'var(--lyra-color-accent-yellow-soft)',  fg: 'var(--lyra-color-accent-yellow-fg)',  label: 'Break'     },
  lunch:     { bg: 'var(--lyra-color-accent-orange-soft)',  fg: 'var(--lyra-color-accent-orange-fg)',  label: 'Lunch'     },
  training:  { bg: 'var(--lyra-color-accent-purple-soft)',  fg: 'var(--lyra-color-accent-purple-fg)',  label: 'Training'  },
  meeting:   { bg: 'var(--lyra-color-accent-teal-soft)',    fg: 'var(--lyra-color-accent-teal-fg)',    label: 'Meeting'   },
  away:      { bg: 'var(--lyra-color-bg-disabled)',         fg: 'var(--lyra-color-fg-secondary)',      label: 'Away'      },
  offline:   { bg: 'var(--lyra-color-bg-disabled)',         fg: 'var(--lyra-color-fg-disabled)',       label: 'Offline'   },
}

function ActivityBadge({ type }: { type: ActivityType }) {
  const s = ACTIVITY_STYLE[type]
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium leading-none whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  )
}

// ─── Adherence status badge ───────────────────────────────────────────────────

const STATUS_STYLE: Record<AdherenceStatus, { dot: string; label: string; bg: string; fg: string }> = {
  adherent:  { dot: 'var(--lyra-color-status-success-strong)',  label: 'Adherent',  bg: 'var(--lyra-color-status-success-subtle)',  fg: 'var(--lyra-color-status-success-strong)'  },
  exception: { dot: 'var(--lyra-color-status-critical-strong)', label: 'Exception', bg: 'var(--lyra-color-status-critical-subtle)', fg: 'var(--lyra-color-status-critical-strong)' },
  'at-risk': { dot: 'var(--lyra-color-status-warning-strong)',  label: 'At Risk',   bg: 'var(--lyra-color-status-warning-subtle)',  fg: 'var(--lyra-color-status-warning-strong)'  },
}

function StatusBadge({ status }: { status: AdherenceStatus }) {
  const s = STATUS_STYLE[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: s.dot }} aria-hidden />
      {s.label}
    </span>
  )
}

// ─── Adherence bar ────────────────────────────────────────────────────────────

function AdherenceBar({ pct }: { pct: number }) {
  const color =
    pct >= 90
      ? 'var(--lyra-color-status-success-strong)'
      : pct >= 75
        ? 'var(--lyra-color-status-warning-strong)'
        : 'var(--lyra-color-status-critical-strong)'

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full !bg-[var(--lyra-color-bg-disabled)]">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs tabular-nums !text-[var(--lyra-color-fg-default)]">
        {pct.toFixed(1)}%
      </span>
    </div>
  )
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir: SortDir }) {
  if (dir === 'asc')  return <ChevronUp   className="h-3 w-3 shrink-0" />
  if (dir === 'desc') return <ChevronDown className="h-3 w-3 shrink-0" />
  return <ChevronsUpDown className="h-3 w-3 shrink-0 !text-[var(--lyra-color-fg-disabled)]" />
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_AGENTS: AgentRow[] = [
  { id:  '1', name: 'Sarah Wilson',    initials: 'SW', team: 'Team Alpha',   scheduledActivity: 'phone',    currentActivity: 'phone',    status: 'adherent',  duration: '0:23:45', adherencePct: 94.2, exceptions: 0 },
  { id:  '2', name: 'John Smith',      initials: 'JS', team: 'Team Beta',    scheduledActivity: 'break',    currentActivity: 'phone',    status: 'exception', duration: '0:05:12', adherencePct: 78.1, exceptions: 2 },
  { id:  '3', name: 'Maria Garcia',    initials: 'MG', team: 'Team Alpha',   scheduledActivity: 'available',currentActivity: 'available',status: 'adherent',  duration: '0:08:30', adherencePct: 97.5, exceptions: 0 },
  { id:  '4', name: 'James Chen',      initials: 'JC', team: 'Team Gamma',   scheduledActivity: 'lunch',    currentActivity: 'available',status: 'exception', duration: '0:12:00', adherencePct: 65.3, exceptions: 3 },
  { id:  '5', name: 'Emily Davis',     initials: 'ED', team: 'Team Beta',    scheduledActivity: 'phone',    currentActivity: 'phone',    status: 'adherent',  duration: '0:41:18', adherencePct: 91.7, exceptions: 1 },
  { id:  '6', name: 'Robert Martinez', initials: 'RM', team: 'Team Delta',   scheduledActivity: 'training', currentActivity: 'training', status: 'adherent',  duration: '1:02:05', adherencePct: 88.4, exceptions: 0 },
  { id:  '7', name: 'Lisa Thompson',   initials: 'LT', team: 'Team Alpha',   scheduledActivity: 'phone',    currentActivity: 'away',     status: 'exception', duration: '0:03:47', adherencePct: 72.9, exceptions: 4 },
  { id:  '8', name: 'Kevin Anderson',  initials: 'KA', team: 'Team Gamma',   scheduledActivity: 'meeting',  currentActivity: 'meeting',  status: 'adherent',  duration: '0:17:22', adherencePct: 95.1, exceptions: 0 },
  { id:  '9', name: 'Amanda White',    initials: 'AW', team: 'Team Beta',    scheduledActivity: 'available',currentActivity: 'phone',    status: 'at-risk',   duration: '0:09:55', adherencePct: 82.6, exceptions: 1 },
  { id: '10', name: 'Daniel Lee',      initials: 'DL', team: 'Team Delta',   scheduledActivity: 'phone',    currentActivity: 'phone',    status: 'adherent',  duration: '0:33:10', adherencePct: 93.8, exceptions: 0 },
  { id: '11', name: 'Patricia Harris', initials: 'PH', team: 'Team Alpha',   scheduledActivity: 'break',    currentActivity: 'break',    status: 'adherent',  duration: '0:04:30', adherencePct: 89.2, exceptions: 1 },
  { id: '12', name: 'Christopher Brown', initials: 'CB', team: 'Team Gamma', scheduledActivity: 'phone',    currentActivity: 'lunch',    status: 'exception', duration: '0:22:15', adherencePct: 61.7, exceptions: 5 },
  { id: '13', name: 'Jessica Taylor',  initials: 'JT', team: 'Team Beta',    scheduledActivity: 'training', currentActivity: 'training', status: 'adherent',  duration: '0:55:00', adherencePct: 96.3, exceptions: 0 },
  { id: '14', name: 'Matthew Wilson',  initials: 'MW', team: 'Team Delta',   scheduledActivity: 'available',currentActivity: 'available',status: 'adherent',  duration: '0:12:45', adherencePct: 90.0, exceptions: 0 },
  { id: '15', name: 'Nancy Jackson',   initials: 'NJ', team: 'Team Alpha',   scheduledActivity: 'phone',    currentActivity: 'break',    status: 'exception', duration: '0:07:03', adherencePct: 74.4, exceptions: 2 },
]

// ─── Toolbar / filter bar ─────────────────────────────────────────────────────

interface ToolbarProps {
  search: string
  onSearchChange: (v: string) => void
  statusFilter: AdherenceStatus | 'all'
  onStatusFilterChange: (v: AdherenceStatus | 'all') => void
  onRefresh: () => void
  lastUpdated: string
  totalShown: number
  totalAgents: number
}

function Toolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onRefresh,
  lastUpdated,
  totalShown,
  totalAgents,
}: ToolbarProps) {
  const STATUS_OPTIONS: { value: AdherenceStatus | 'all'; label: string }[] = [
    { value: 'all',       label: 'All statuses'  },
    { value: 'adherent',  label: 'Adherent'      },
    { value: 'exception', label: 'Exception'     },
    { value: 'at-risk',   label: 'At Risk'       },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none !text-[var(--lyra-color-fg-secondary)]"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search agents…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              'h-8 w-52 rounded-md border pl-8 pr-3 text-xs',
              '!border-[var(--lyra-color-border-medium)] !bg-[var(--lyra-color-bg-field)]',
              '!text-[var(--lyra-color-fg-default)] placeholder:!text-[var(--lyra-color-fg-secondary)]',
              'focus:outline-none focus:!border-[var(--lyra-color-border-active)]',
              'focus:!ring-2 focus:!ring-[var(--lyra-color-border-focus)] focus:!ring-offset-0',
              'transition-colors',
            )}
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <Filter
            className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 pointer-events-none !text-[var(--lyra-color-fg-secondary)]"
            aria-hidden
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as AdherenceStatus | 'all')}
            className={cn(
              'h-8 appearance-none rounded-md border pl-7 pr-6 text-xs',
              '!border-[var(--lyra-color-border-medium)] !bg-[var(--lyra-color-bg-field)]',
              '!text-[var(--lyra-color-fg-default)]',
              'focus:outline-none focus:!border-[var(--lyra-color-border-active)]',
              'focus:!ring-2 focus:!ring-[var(--lyra-color-border-focus)] focus:!ring-offset-0',
              'transition-colors cursor-pointer',
            )}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 pointer-events-none !text-[var(--lyra-color-fg-secondary)]" aria-hidden />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs !text-[var(--lyra-color-fg-secondary)]">
          Showing <strong className="!text-[var(--lyra-color-fg-default)]">{totalShown}</strong> of {totalAgents} agents
        </span>
        <span className="text-xs !text-[var(--lyra-color-fg-disabled)]">
          Updated {lastUpdated}
        </span>
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh data"
          className={cn(
            'flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors',
            '!border-[var(--lyra-color-border-medium)] !bg-[var(--lyra-color-bg-field)]',
            '!text-[var(--lyra-color-fg-default)]',
            'hover:!border-[var(--lyra-color-border-strong)] hover:!bg-[var(--lyra-color-bg-surface-shell)]',
          )}
        >
          <RefreshCw className="h-3 w-3" aria-hidden />
          Refresh
        </button>
      </div>
    </div>
  )
}

// ─── Agent table ──────────────────────────────────────────────────────────────

interface AgentTableProps {
  rows: AgentRow[]
  sortKey: SortKey | null
  sortDir: SortDir
  onSort: (key: SortKey) => void
}

const COLUMNS: { key: SortKey | null; label: string; width?: string }[] = [
  { key: 'name',          label: 'Agent',       width: 'w-52' },
  { key: null,            label: 'Scheduled',   width: 'w-28' },
  { key: null,            label: 'Current',     width: 'w-28' },
  { key: 'status',        label: 'Status',      width: 'w-32' },
  { key: 'duration',      label: 'Duration',    width: 'w-24' },
  { key: 'adherencePct',  label: 'Adherence',   width: 'w-40' },
]

function AgentTable({ rows, sortKey, sortDir, onSort }: AgentTableProps) {
  const AVATAR_COLORS = [
    { bg: 'var(--lyra-color-bg-active-subtle)',           fg: 'var(--lyra-color-fg-active-strong)' },
    { bg: 'var(--lyra-color-status-success-subtle)',      fg: 'var(--lyra-color-status-success-strong)' },
    { bg: 'var(--lyra-color-accent-purple-subtle)',       fg: 'var(--lyra-color-accent-purple-fg)' },
    { bg: 'var(--lyra-color-accent-teal-soft)',           fg: 'var(--lyra-color-accent-teal-fg)' },
    { bg: 'var(--lyra-color-accent-orange-soft)',         fg: 'var(--lyra-color-accent-orange-fg)' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        {/* ── thead ─────────────────────────────────────────────────── */}
        <thead>
          <tr className="!bg-[var(--lyra-color-bg-surface-shell)]">
            {COLUMNS.map((col) => (
              <th
                key={col.label}
                scope="col"
                className={cn(
                  'border-b px-4 py-2.5 text-left font-semibold uppercase tracking-wide',
                  '!border-[var(--lyra-color-border-default)]',
                  '!text-[var(--lyra-color-fg-secondary)]',
                  col.key && 'cursor-pointer select-none hover:!text-[var(--lyra-color-fg-default)] transition-colors',
                  col.width,
                )}
                onClick={col.key ? () => onSort(col.key!) : undefined}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.key && (
                    <SortIcon dir={sortKey === col.key ? sortDir : null} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── tbody ─────────────────────────────────────────────────── */}
        <tbody className="divide-y !divide-[var(--lyra-color-border-subtle)]">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="px-4 py-12 text-center !text-[var(--lyra-color-fg-secondary)]"
              >
                No agents match your filters.
              </td>
            </tr>
          ) : (
            rows.map((agent, idx) => {
              const avatarStyle = AVATAR_COLORS[idx % AVATAR_COLORS.length]
              return (
                <tr
                  key={agent.id}
                  className="!bg-[var(--lyra-color-bg-surface-base)] hover:!bg-[var(--lyra-color-bg-surface-canvas)] transition-colors"
                >
                  {/* Agent cell */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold select-none"
                        style={{ backgroundColor: avatarStyle.bg, color: avatarStyle.fg }}
                        aria-hidden
                      >
                        {agent.initials}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-medium !text-[var(--lyra-color-fg-default)] truncate">
                          {agent.name}
                        </span>
                        <span className="text-[11px] !text-[var(--lyra-color-fg-secondary)] truncate">
                          {agent.team}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Scheduled */}
                  <td className="px-4 py-3">
                    <ActivityBadge type={agent.scheduledActivity} />
                  </td>

                  {/* Current */}
                  <td className="px-4 py-3">
                    <ActivityBadge type={agent.currentActivity} />
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={agent.status} />
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3 tabular-nums !text-[var(--lyra-color-fg-default)]">
                    {agent.duration}
                  </td>

                  {/* Adherence % */}
                  <td className="px-4 py-3">
                    <AdherenceBar pct={agent.adherencePct} />
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export interface RealtimeAdherencePageProps {
  /** Initial agent data; defaults to built-in mock data */
  agents?: AgentRow[]
}

/**
 * RealtimeAdherencePage
 *
 * Full-screen workforce management page showing per-agent adherence status.
 * Composed of: AppHeader, SideNav, KPI StatCards, filter toolbar, AgentTable.
 */
export function RealtimeAdherencePage({
  agents = MOCK_AGENTS,
}: RealtimeAdherencePageProps) {
  const [navCollapsed, setNavCollapsed] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<AdherenceStatus | 'all'>('all')
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)
  const [lastUpdated, setLastUpdated] = React.useState('just now')

  // ── Derived stats ────────────────────────────────────────────────────────────
  const adherentCount  = agents.filter((a) => a.status === 'adherent').length
  const exceptionCount = agents.filter((a) => a.status === 'exception').length
  const atRiskCount    = agents.filter((a) => a.status === 'at-risk').length
  const adherencePct   = agents.length ? (adherentCount / agents.length) * 100 : 0

  // ── Filter + sort ────────────────────────────────────────────────────────────
  const filtered = React.useMemo(() => {
    let rows = [...agents]

    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.team.toLowerCase().includes(q),
      )
    }

    if (statusFilter !== 'all') {
      rows = rows.filter((a) => a.status === statusFilter)
    }

    if (sortKey && sortDir) {
      rows.sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp =
          typeof av === 'number' && typeof bv === 'number'
            ? av - bv
            : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })
    }

    return rows
  }, [agents, search, statusFilter, sortKey, sortDir])

  const handleSort = React.useCallback((key: SortKey) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'))
        if (sortDir === 'desc') return null
        return key
      }
      setSortDir('asc')
      return key
    })
  }, [sortDir])

  const handleRefresh = React.useCallback(() => {
    const now = new Date()
    setLastUpdated(
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    )
  }, [])

  return (
    <div className="flex h-screen flex-col overflow-hidden !bg-[var(--lyra-color-bg-surface-canvas)]">
      {/* ── App header ──────────────────────────────────────────────────── */}
      <AppHeader
        appName="NICE CXone"
        pageTitle="Workforce Management"
        userInitials="AG"
        userName="Ahana Ganguly"
        notificationCount={exceptionCount}
      />

      {/* ── Body: sidenav + main ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <SideNav
          activeId="realtime"
          collapsed={navCollapsed}
          onToggleCollapse={() => setNavCollapsed((v) => !v)}
        />

        {/* ── Main content ──────────────────────────────────────────────── */}
        <main className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          {/* Page heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-base font-semibold !text-[var(--lyra-color-fg-default)]">
                Realtime Adherence
              </h1>
              <p className="mt-0.5 text-xs !text-[var(--lyra-color-fg-secondary)]">
                Live view of agent adherence to scheduled activities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full !bg-[var(--lyra-color-status-success-subtle)] px-2.5 py-1 text-[11px] font-medium !text-[var(--lyra-color-status-success-strong)]">
                <span className="h-1.5 w-1.5 rounded-full !bg-[var(--lyra-color-status-success-strong)] animate-pulse" aria-hidden />
                Live
              </span>
            </div>
          </div>

          {/* ── KPI stat cards ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              label="Total Agents"
              value={agents.length}
              subLabel="Scheduled today"
              variant="default"
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              label="In Adherence"
              value={adherentCount}
              subLabel={`${((adherentCount / agents.length) * 100).toFixed(0)}% of total`}
              variant="success"
              trend="up"
              trendValue={`+${Math.max(0, adherentCount - 12)}`}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              label="Exceptions"
              value={exceptionCount + atRiskCount}
              subLabel={`${exceptionCount} exceptions · ${atRiskCount} at risk`}
              variant={exceptionCount > 3 ? 'critical' : 'warning'}
              trend={exceptionCount > 3 ? 'down' : 'neutral'}
              trendValue={exceptionCount > 3 ? `−${exceptionCount}` : undefined}
              icon={<AlertCircle className="h-4 w-4" />}
            />
            <StatCard
              label="Adherence Rate"
              value={`${adherencePct.toFixed(1)}%`}
              subLabel="Rolling today"
              variant="brand"
              trend="up"
              trendValue="+2.1%"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>

          {/* ── Agent table card ────────────────────────────────────────────── */}
          <div className="flex flex-col overflow-hidden rounded-md border !border-[var(--lyra-color-border-default)] !bg-[var(--lyra-color-bg-surface-base)]">
            {/* Table toolbar */}
            <div className="border-b px-4 py-3 !border-[var(--lyra-color-border-default)]">
              <Toolbar
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                onRefresh={handleRefresh}
                lastUpdated={lastUpdated}
                totalShown={filtered.length}
                totalAgents={agents.length}
              />
            </div>

            {/* Table */}
            <AgentTable
              rows={filtered}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />

            {/* Footer */}
            <div className="border-t px-4 py-2.5 !border-[var(--lyra-color-border-default)] !bg-[var(--lyra-color-bg-surface-shell)]">
              <span className="text-[11px] !text-[var(--lyra-color-fg-secondary)]">
                {filtered.length} agents displayed · Auto-refreshes every 30 seconds
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RealtimeAdherencePage
