import * as React from 'react'
import {
  LayoutDashboard,
  Clock,
  Users,
  BarChart2,
  CalendarDays,
  Settings,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number
  /** Items shown under a group heading */
  group?: string
}

export interface SideNavProps {
  /** ID of the currently active nav item */
  activeId?: string
  /** Called when a nav item is clicked */
  onNavigate?: (id: string) => void
  /** Whether the nav is in collapsed (icon-only) mode */
  collapsed?: boolean
  /** Called when the collapse toggle is clicked */
  onToggleCollapse?: () => void
  className?: string
}

// ─── Default nav items ────────────────────────────────────────────────────────

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',  label: 'Dashboard',           icon: <LayoutDashboard className="h-[18px] w-[18px]" />,  group: 'Monitoring' },
  { id: 'realtime',   label: 'Realtime Adherence',  icon: <Clock className="h-[18px] w-[18px]" />,            group: 'Monitoring' },
  { id: 'agents',     label: 'Agent Management',    icon: <Users className="h-[18px] w-[18px]" />,            group: 'Management' },
  { id: 'schedule',   label: 'Schedules',           icon: <CalendarDays className="h-[18px] w-[18px]" />,     group: 'Management' },
  { id: 'reports',    label: 'Reports',             icon: <BarChart2 className="h-[18px] w-[18px]" />,        group: 'Analytics'  },
  { id: 'settings',   label: 'Settings',            icon: <Settings className="h-[18px] w-[18px]" />,         group: 'System'     },
]

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * SideNav
 *
 * Left-side navigation panel for the CXone shell.
 * Supports collapsed (icon-only) and expanded modes.
 * Uses Lyra design tokens throughout.
 */
const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  (
    {
      activeId = 'realtime',
      onNavigate,
      collapsed = false,
      onToggleCollapse,
      className,
    },
    ref,
  ) => {
    // Group items
    const groups = React.useMemo(() => {
      const map = new Map<string, NavItem[]>()
      DEFAULT_NAV_ITEMS.forEach((item) => {
        const key = item.group ?? ''
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(item)
      })
      return map
    }, [])

    return (
      <nav
        ref={ref}
        className={cn(
          'flex h-full shrink-0 flex-col',
          '!bg-[var(--lyra-color-bg-surface-base)]',
          'border-r !border-[var(--lyra-color-border-default)]',
          collapsed ? 'w-[56px]' : 'w-[220px]',
          'transition-[width] duration-200 ease-in-out',
          className,
        )}
        aria-label="Main navigation"
      >
        {/* ── Nav groups ──────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 gap-4 overflow-y-auto py-3 px-2">
          {Array.from(groups.entries()).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-0.5">
              {/* Group label */}
              {!collapsed && group && (
                <span className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest !text-[var(--lyra-color-fg-disabled)] select-none">
                  {group}
                </span>
              )}

              {items.map((item) => {
                const isActive = item.id === activeId
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={collapsed ? item.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => onNavigate?.(item.id)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-xs transition-colors',
                      isActive
                        ? '!bg-[var(--lyra-color-bg-active-subtle)] !text-[var(--lyra-color-fg-active-strong)] font-semibold'
                        : '!text-[var(--lyra-color-fg-secondary)] hover:!bg-[var(--lyra-color-bg-surface-shell)] hover:!text-[var(--lyra-color-fg-default)] font-normal',
                      collapsed && 'justify-center px-0',
                    )}
                  >
                    {/* Active bar */}
                    {isActive && !collapsed && (
                      <span className="absolute left-0 h-5 w-0.5 rounded-r !bg-[var(--lyra-color-bg-primary)]" aria-hidden />
                    )}

                    <span className="shrink-0">{item.icon}</span>

                    {!collapsed && (
                      <span className="truncate text-left">{item.label}</span>
                    )}

                    {!collapsed && item.badge != null && (
                      <span className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full !bg-[var(--lyra-color-bg-primary)] px-1 text-[10px] font-semibold !text-white leading-none">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* ── Collapse toggle ──────────────────────────────────────────── */}
        <div className="border-t px-2 py-2 !border-[var(--lyra-color-border-default)]">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-xs transition-colors',
              '!text-[var(--lyra-color-fg-secondary)] hover:!bg-[var(--lyra-color-bg-surface-shell)] hover:!text-[var(--lyra-color-fg-default)]',
              collapsed && 'justify-center px-0',
            )}
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                collapsed && 'rotate-180',
              )}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </nav>
    )
  },
)
SideNav.displayName = 'SideNav'

export { SideNav }
export default SideNav
