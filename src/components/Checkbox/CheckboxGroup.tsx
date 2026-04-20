import * as React from 'react'
import { cn } from '@/lib/utils'
import { CheckboxGroupContext } from './CheckboxContext'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CheckboxGroupProps {
  /** Group label rendered above the checkboxes */
  label?: string
  /**
   * `vertical`   — checkboxes stacked top-to-bottom (default)
   * `horizontal` — checkboxes laid out side-by-side
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Shows selection but prevents changes.
   * Checked indicators turn gray; labels remain at full opacity.
   */
  readOnly?: boolean
  /** Disables all child checkboxes */
  disabled?: boolean
  /** Additional class names for the outer wrapper */
  className?: string
  children?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CheckboxGroup
 *
 * Container for a set of `<Checkbox>` items.
 * Propagates `disabled` and `readOnly` to all child Checkboxes via context.
 *
 * @example
 * <CheckboxGroup label="Preferences" orientation="vertical">
 *   <Checkbox label="Email notifications" defaultChecked />
 *   <Checkbox label="SMS alerts" />
 *   <Checkbox label="Weekly digest" />
 * </CheckboxGroup>
 */
const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      orientation = 'vertical',
      readOnly = false,
      disabled = false,
      className,
      children,
    },
    ref,
  ) => {
    const ctx = React.useMemo(
      () => ({ readOnly, disabled }),
      [readOnly, disabled],
    )

    return (
      <CheckboxGroupContext.Provider value={ctx}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
          {/* ── Group label ────────────────────────────────────────── */}
          {label && (
            <span
              className={cn(
                'text-sm font-medium leading-none',
                disabled ? 'text-lyra-fg-disabled' : 'text-lyra-fg-default',
              )}
            >
              {label}
            </span>
          )}

          {/* ── Items ──────────────────────────────────────────────── */}
          <div
            className={cn(
              orientation === 'horizontal'
                ? 'flex flex-row flex-wrap gap-x-6 gap-y-2'
                : 'flex flex-col gap-2',
            )}
          >
            {children}
          </div>
        </div>
      </CheckboxGroupContext.Provider>
    )
  },
)
CheckboxGroup.displayName = 'CheckboxGroup'

export { CheckboxGroup }
export default CheckboxGroup
