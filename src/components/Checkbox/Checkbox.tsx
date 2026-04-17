import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CheckboxGroupContext } from './CheckboxContext'
import styles from './Checkbox.module.css'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'defaultChecked' | 'onCheckedChange'
  > {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean
  /** Initial checked state (uncontrolled) */
  defaultChecked?: boolean
  /** Called when the checked state changes */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  /**
   * When true the checkbox renders in an indeterminate state:
   * — track uses the checked colour (blue)
   * — shows a minus (–) icon instead of a check
   */
  indeterminate?: boolean
  /**
   * Shows selection but prevents changes.
   * Indicator turns gray.
   */
  readOnly?: boolean
  /** Primary label text rendered to the right of the checkbox */
  label?: string
  /** Optional secondary description rendered below the label */
  description?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Checkbox
 *
 * Design-system checkbox built on `@radix-ui/react-checkbox`.
 * All colours use Lyra design tokens from `src/tokens/lyra-tokens.css`.
 *
 * States rendered:
 * - Unchecked / Checked / Indeterminate (default, hover, pressed)
 * - Disabled (unchecked + checked + indeterminate)
 * - Read-only (checked indicator turns gray)
 *
 * @example
 * <Checkbox label="Accept terms" defaultChecked />
 * <Checkbox label="Partial selection" indeterminate />
 * <Checkbox label="Read-only" checked readOnly />
 */
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      indeterminate = false,
      readOnly: readOnlyProp,
      label,
      description,
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const ctx = React.useContext(CheckboxGroupContext)
    const isDisabled = disabled || ctx.disabled
    const isReadOnly = readOnlyProp ?? ctx.readOnly

    const autoId = React.useId()
    const inputId = id ?? autoId

    // ── Internal state — drives Radix in controlled mode always ──────────
    // Keeps readOnly locked and allows uncontrolled toggle behaviour.
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState<
      boolean | 'indeterminate'
    >(indeterminate ? 'indeterminate' : (checked ?? defaultChecked ?? false))

    React.useEffect(() => {
      setInternalChecked(
        indeterminate ? 'indeterminate' : isControlled ? checked! : internalChecked,
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indeterminate, isControlled, checked])

    const radixChecked = indeterminate
      ? 'indeterminate'
      : isControlled
        ? checked!
        : internalChecked

    const handleCheckedChange = React.useCallback(
      (val: boolean | 'indeterminate') => {
        if (isReadOnly) return
        if (!isControlled) setInternalChecked(val)
        onCheckedChange?.(val)
      },
      [isReadOnly, isControlled, onCheckedChange],
    )

    return (
      <div className={cn('flex items-start gap-2', className)}>
        {/* ── Square ─────────────────────────────────────────────────── */}
        <CheckboxPrimitive.Root
          ref={ref}
          id={inputId}
          checked={radixChecked}
          onCheckedChange={handleCheckedChange}
          disabled={isDisabled}
          // Prevent pointer interaction when readOnly
          onClick={isReadOnly ? (e) => e.preventDefault() : undefined}
          className={cn(
            styles.square,
            // Base shape — 16 × 16 px, 1 px border, 2 px radius
            'mt-[1px] shrink-0 h-4 w-4 rounded-sm border transition-colors duration-150',
            'focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-[var(--lyra-color-border-focus)] focus-visible:ring-offset-1',

            // ── Read-only ──────────────────────────────────────────────
            isReadOnly && [
              'cursor-default pointer-events-none',
              // Unchecked
              'data-[state=unchecked]:!border-[var(--lyra-color-border-medium)] data-[state=unchecked]:!bg-white',
              // Checked / Indeterminate — gray fill
              'data-[state=checked]:!border-[var(--lyra-color-fg-secondary)] data-[state=checked]:!bg-[var(--lyra-color-fg-secondary)]',
              'data-[state=indeterminate]:!border-[var(--lyra-color-fg-secondary)] data-[state=indeterminate]:!bg-[var(--lyra-color-fg-secondary)]',
            ],

            // ── Disabled ───────────────────────────────────────────────
            isDisabled && [
              'cursor-not-allowed',
              'data-[state=unchecked]:!border-[var(--lyra-color-border-disabled)] data-[state=unchecked]:!bg-[var(--lyra-color-bg-disabled)]',
              'data-[state=checked]:!border-[var(--lyra-color-border-disabled)] data-[state=checked]:!bg-[var(--lyra-color-bg-disabled)]',
              'data-[state=indeterminate]:!border-[var(--lyra-color-border-disabled)] data-[state=indeterminate]:!bg-[var(--lyra-color-bg-disabled)]',
            ],

            // ── Normal interactive ─────────────────────────────────────
            !isDisabled && !isReadOnly && [
              'cursor-pointer',
              // Unchecked — default / hover / pressed
              'data-[state=unchecked]:!border-[var(--lyra-color-border-medium)] data-[state=unchecked]:!bg-white',
              'data-[state=unchecked]:hover:!border-[var(--lyra-color-border-strong)]',
              'data-[state=unchecked]:active:!border-[var(--lyra-color-fg-default)]',
              // Checked — default / hover / pressed
              'data-[state=checked]:!border-lyra-bg-primary data-[state=checked]:!bg-lyra-bg-primary',
              'data-[state=checked]:hover:!border-[var(--lyra-color-state-hover-primary)] data-[state=checked]:hover:!bg-[var(--lyra-color-state-hover-primary)]',
              'data-[state=checked]:active:!border-[var(--lyra-color-state-pressed-primary)] data-[state=checked]:active:!bg-[var(--lyra-color-state-pressed-primary)]',
              // Indeterminate — default / hover / pressed (same blue as checked)
              'data-[state=indeterminate]:!border-lyra-bg-primary data-[state=indeterminate]:!bg-lyra-bg-primary',
              'data-[state=indeterminate]:hover:!border-[var(--lyra-color-state-hover-primary)] data-[state=indeterminate]:hover:!bg-[var(--lyra-color-state-hover-primary)]',
              'data-[state=indeterminate]:active:!border-[var(--lyra-color-state-pressed-primary)] data-[state=indeterminate]:active:!bg-[var(--lyra-color-state-pressed-primary)]',
            ],
          )}
          {...props}
        >
          {/* ── Indicator (icon) ───────────────────────────────────── */}
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {radixChecked === 'indeterminate' ? (
              <Minus
                className={cn(
                  'h-3 w-3',
                  isDisabled
                    ? 'text-[var(--lyra-color-fg-disabled)]'
                    : '!text-white',
                )}
                strokeWidth={2.5}
              />
            ) : (
              <Check
                className={cn(
                  'h-3 w-3',
                  isDisabled
                    ? 'text-[var(--lyra-color-fg-disabled)]'
                    : '!text-white',
                )}
                strokeWidth={2.5}
              />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {/* ── Label area ──────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'flex flex-col gap-0.5 leading-none',
              isDisabled
                ? 'cursor-not-allowed'
                : isReadOnly
                  ? 'cursor-default'
                  : 'cursor-pointer',
            )}
          >
            <span
              className={cn(
                'text-sm font-normal leading-none',
                isDisabled ? 'text-lyra-fg-disabled' : 'text-lyra-fg-default',
              )}
            >
              {label}
            </span>
            {description && (
              <span
                className={cn(
                  'text-xs leading-snug',
                  isDisabled
                    ? 'text-lyra-fg-disabled'
                    : 'text-lyra-fg-secondary',
                )}
              >
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
export default Checkbox
