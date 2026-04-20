import * as React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Variant palette ──────────────────────────────────────────────────────────

type StatCardVariant = 'default' | 'success' | 'critical' | 'warning' | 'brand'

const VARIANT: Record<
  StatCardVariant,
  { border: string; value: string; iconBg: string; iconFg: string }
> = {
  default: {
    border:  'var(--lyra-color-border-default)',
    value:   'var(--lyra-color-fg-default)',
    iconBg:  'var(--lyra-color-bg-surface-shell)',
    iconFg:  'var(--lyra-color-fg-secondary)',
  },
  success: {
    border:  'var(--lyra-color-status-success-medium)',
    value:   'var(--lyra-color-status-success-strong)',
    iconBg:  'var(--lyra-color-status-success-subtle)',
    iconFg:  'var(--lyra-color-status-success-strong)',
  },
  critical: {
    border:  'var(--lyra-color-status-critical-medium)',
    value:   'var(--lyra-color-status-critical-strong)',
    iconBg:  'var(--lyra-color-status-critical-subtle)',
    iconFg:  'var(--lyra-color-status-critical-strong)',
  },
  warning: {
    border:  'var(--lyra-color-status-warning-medium)',
    value:   'var(--lyra-color-status-warning-strong)',
    iconBg:  'var(--lyra-color-status-warning-subtle)',
    iconFg:  'var(--lyra-color-status-warning-strong)',
  },
  brand: {
    border:  'var(--lyra-color-accent-blue-soft)',
    value:   'var(--lyra-color-bg-primary)',
    iconBg:  'var(--lyra-color-bg-active-subtle)',
    iconFg:  'var(--lyra-color-fg-active-strong)',
  },
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface StatCardProps {
  /** Short descriptor above the value */
  label: string
  /** Primary metric value (e.g. `"247"`, `"76.5%"`) */
  value: string | number
  /** Secondary line below the value */
  subLabel?: string
  /** Direction of change */
  trend?: 'up' | 'down' | 'neutral'
  /** Formatted change string (e.g. `"+12"`, `"−3.2%"`) */
  trendValue?: string
  /** Colour variant */
  variant?: StatCardVariant
  /** Icon rendered in the top-right corner */
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * StatCard
 *
 * KPI summary card used on dashboards and overview pages.
 * Colour is driven by the `variant` prop which maps to Lyra status tokens.
 *
 * @example
 * <StatCard label="In Adherence" value={189} variant="success" trend="up" trendValue="+5" />
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      subLabel,
      trend,
      trendValue,
      variant = 'default',
      icon,
      className,
      onClick,
    },
    ref,
  ) => {
    const v = VARIANT[variant]

    const TrendIcon =
      trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

    const trendColor =
      trend === 'up'
        ? 'var(--lyra-color-status-success-strong)'
        : trend === 'down'
          ? 'var(--lyra-color-status-critical-strong)'
          : 'var(--lyra-color-fg-secondary)'

    return (
      <div
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
        className={cn(
          'flex flex-col gap-3 rounded-md border p-4',
          '!bg-[var(--lyra-color-bg-surface-base)]',
          onClick && 'cursor-pointer hover:shadow-sm transition-shadow',
          className,
        )}
        style={{ borderColor: v.border }}
      >
        {/* ── Header: label + icon ──────────────────────────────────── */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-medium !text-[var(--lyra-color-fg-secondary)] leading-none">
            {label}
          </span>
          {icon && (
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm"
              style={{ backgroundColor: v.iconBg, color: v.iconFg }}
            >
              {icon}
            </div>
          )}
        </div>

        {/* ── Value + trend ─────────────────────────────────────────── */}
        <div className="flex items-end gap-2">
          <span
            className="text-[26px] font-semibold leading-none tracking-tight"
            style={{ color: v.value }}
          >
            {value}
          </span>
          {trend && trendValue && (
            <div
              className="mb-0.5 flex items-center gap-0.5 text-xs font-medium"
              style={{ color: trendColor }}
            >
              <TrendIcon className="h-3 w-3" aria-hidden />
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* ── Sub-label ─────────────────────────────────────────────── */}
        {subLabel && (
          <span className="text-[11px] leading-none !text-[var(--lyra-color-fg-secondary)]">
            {subLabel}
          </span>
        )}
      </div>
    )
  },
)
StatCard.displayName = 'StatCard'

export { StatCard }
export default StatCard
