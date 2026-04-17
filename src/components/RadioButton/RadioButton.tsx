import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { RadioButtonGroupContext } from './RadioButtonContext'
import styles from './RadioButton.module.css'

export interface RadioButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    'children'
  > {
  /** Primary label text */
  label: string
  /** Optional secondary description rendered below the label */
  description?: string
}

/**
 * RadioButton
 *
 * A single radio-group item built on `@radix-ui/react-radio-group`.
 * Must be used inside a `<RadioButtonGroup>`.
 *
 * All colours use Lyra design tokens from `src/tokens/lyra-tokens.css`.
 *
 * @example
 * <RadioButtonGroup label="Plan" defaultValue="pro">
 *   <RadioButton value="free" label="Free" />
 *   <RadioButton value="pro"  label="Pro"  description="Full access to all features" />
 * </RadioButtonGroup>
 */
const RadioButton = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioButtonProps
>(({ label, description, disabled, className, value, ...props }, ref) => {
  const ctx = React.useContext(RadioButtonGroupContext)

  const isDisabled = disabled || ctx.disabled
  const isReadOnly = ctx.readOnly

  const id = React.useId()

  return (
    <div className={cn('flex items-start gap-2', className)}>
      {/* ── Circle ─────────────────────────────────────────────────── */}
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        value={value}
        disabled={isDisabled}
        // Prevent any change when readOnly
        onClick={isReadOnly ? (e) => e.preventDefault() : undefined}
        className={cn(
          styles.circle,
          // Base shape — 16 × 16 px, 1.5 px border, fully rounded
          'mt-[1px] shrink-0 h-4 w-4 rounded-full border transition-colors duration-150',
          'focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--lyra-color-border-focus)] focus-visible:ring-offset-1',

          // ── Read-only ─────────────────────────────────────────────
          isReadOnly && [
            'cursor-default pointer-events-none',
            // unchecked look stays the same; checked switches to gray (handled via data-state below)
            'data-[state=unchecked]:border-[var(--lyra-color-border-medium)] data-[state=unchecked]:bg-white',
            'data-[state=checked]:border-[var(--lyra-color-fg-secondary)] data-[state=checked]:bg-[var(--lyra-color-fg-secondary)]',
          ],

          // ── Disabled ──────────────────────────────────────────────
          isDisabled && [
            'cursor-not-allowed',
            'data-[state=unchecked]:border-[var(--lyra-color-border-disabled)] data-[state=unchecked]:bg-[var(--lyra-color-bg-disabled)]',
            'data-[state=checked]:border-[var(--lyra-color-border-disabled)] data-[state=checked]:bg-[var(--lyra-color-bg-disabled)]',
          ],

          // ── Normal interactive ─────────────────────────────────────
          !isDisabled && !isReadOnly && [
            'cursor-pointer',
            // Unchecked
            'data-[state=unchecked]:border-[var(--lyra-color-border-medium)] data-[state=unchecked]:bg-white',
            'data-[state=unchecked]:hover:!border-[var(--lyra-color-border-strong)]',
            'data-[state=unchecked]:active:!border-[var(--lyra-color-fg-default)]',
            // Checked
            'data-[state=checked]:border-lyra-bg-primary data-[state=checked]:bg-lyra-bg-primary',
            'data-[state=checked]:hover:!border-[var(--lyra-color-state-hover-primary)] data-[state=checked]:hover:!bg-[var(--lyra-color-state-hover-primary)]',
            'data-[state=checked]:active:!border-[var(--lyra-color-state-pressed-primary)] data-[state=checked]:active:!bg-[var(--lyra-color-state-pressed-primary)]',
          ],
        )}
        {...props}
      >
        {/* ── Inner dot (Indicator) ─────────────────────────────────── */}
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span
            className={cn(
              'block h-[6px] w-[6px] rounded-full',
              isDisabled
                ? 'bg-[var(--lyra-color-fg-disabled)]'
                : 'bg-white',
            )}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {/* ── Label area ──────────────────────────────────────────────── */}
      <label
        htmlFor={id}
        className={cn(
          'flex flex-col gap-0.5 leading-none',
          isDisabled ? 'cursor-not-allowed' : isReadOnly ? 'cursor-default' : 'cursor-pointer',
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
              isDisabled ? 'text-lyra-fg-disabled' : 'text-lyra-fg-secondary',
            )}
          >
            {description}
          </span>
        )}
      </label>
    </div>
  )
})
RadioButton.displayName = 'RadioButton'

export { RadioButton }
export default RadioButton
