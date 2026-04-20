import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from './Switch.module.css'

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SIZE = {
  default: {
    track:     'w-10 h-5 p-[2px]',          // 40 × 20 px
    thumb:     'h-4 w-4',                    // 16 × 16 px
    translate: 'data-[state=checked]:translate-x-5',  // 40-16-2-2 = 20 px
    icon:      'h-[10px] w-[10px]',
    label:     'text-sm',
  },
  sm: {
    track:     'w-8 h-4 p-[2px]',           // 32 × 16 px
    thumb:     'h-3 w-3',                    // 12 × 12 px
    translate: 'data-[state=checked]:translate-x-4',  // 32-12-2-2 = 16 px
    icon:      'h-2 w-2',
    label:     'text-sm',
  },
} as const

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /**
   * `default` — standard switch (default)
   * `sm`      — compact switch
   */
  size?: keyof typeof SIZE
  /**
   * When true the switch renders in an indeterminate state:
   * — track uses the unchecked colour regardless of `checked`
   * — thumb shows a minus (—) icon
   */
  indeterminate?: boolean
  /**
   * When true and `checked` is true, the thumb shows a ✓ icon.
   * Has no effect when `indeterminate` is true.
   */
  showIcon?: boolean
  /** Label text rendered to the right of the switch */
  label?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Switch
 *
 * Design-system toggle switch built on `@radix-ui/react-switch`.
 * All colours use Lyra design tokens from `src/tokens/lyra-tokens.css`.
 *
 * States rendered:
 * - Checked / Unchecked (default, hover, pressed)
 * - Disabled (checked + unchecked)
 * - Indeterminate (minus icon in thumb, unchecked track colour)
 * - Icon variant (check icon in thumb when checked)
 *
 * @example
 * <Switch label="Notifications" defaultChecked />
 * <Switch label="Feature flag" size="sm" />
 * <Switch label="Partial selection" indeterminate />
 * <Switch label="Confirmed" showIcon checked />
 */
const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      size = 'default',
      indeterminate = false,
      showIcon = false,
      label,
      disabled,
      className,
      checked,
      defaultChecked,
      id,
      ...props
    },
    ref,
  ) => {
    const autoId = React.useId()
    const inputId = id ?? autoId
    const sz = SIZE[size]

    // ── Internal state (used for both controlled and uncontrolled modes) ─
    // We track the real checked value separately so that indeterminate can
    // show the unchecked visual without discarding the underlying value or
    // breaking uncontrolled toggle behaviour.
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(
      checked ?? defaultChecked ?? false,
    )
    React.useEffect(() => {
      if (isControlled) setInternalChecked(checked!)
    }, [isControlled, checked])

    const realChecked = isControlled ? checked! : internalChecked
    // Indeterminate: visually unchecked but real value is preserved
    const displayChecked = indeterminate ? false : realChecked

    const handleCheckedChange = React.useCallback(
      (val: boolean) => {
        if (!isControlled) setInternalChecked(val)
        props.onCheckedChange?.(val)
      },
      [isControlled, props],
    )

    return (
      <div className={cn(styles.root, 'inline-flex items-center gap-2', className)}>
        {/* ── Track ──────────────────────────────────────────────────── */}
        <SwitchPrimitive.Root
          ref={ref}
          id={inputId}
          disabled={disabled}
          checked={displayChecked}
          onCheckedChange={handleCheckedChange}
          className={cn(
            // Layout
            'relative inline-flex shrink-0 cursor-pointer items-center rounded-full',
            'border-0 transition-colors duration-150',
            sz.track,

            // Focus ring using Lyra border-focus token
            'focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-[var(--lyra-color-border-focus)] focus-visible:ring-offset-1',

            // ── Unchecked track colours — default / hover / pressed ─
            'data-[state=unchecked]:!bg-[var(--lyra-color-fg-secondary)]',
            'data-[state=unchecked]:hover:!bg-[var(--lyra-color-fg-default)]',
            'data-[state=unchecked]:active:!bg-[rgba(0,0,0,0.9)]',

            // ── Checked track colours — default / hover / pressed ───
            'data-[state=checked]:!bg-lyra-bg-primary',
            'data-[state=checked]:hover:!bg-[var(--lyra-color-state-hover-primary)]',
            'data-[state=checked]:active:!bg-[var(--lyra-color-state-pressed-primary)]',

            // ── Disabled ────────────────────────────────────────────
            'disabled:cursor-not-allowed disabled:!opacity-40',
            'data-[disabled]:cursor-not-allowed data-[disabled]:!opacity-40',
          )}
          {...props}
        >
          {/* ── Thumb ────────────────────────────────────────────── */}
          <SwitchPrimitive.Thumb
            className={cn(
              // Shape
              'pointer-events-none flex items-center justify-center',
              'rounded-full !bg-white',
              'shadow-[0_1px_3px_rgba(0,0,0,0.20)]',
              'transition-transform duration-150',
              sz.thumb,

              // Position: unchecked = left (translate-x-0), checked = right
              'data-[state=unchecked]:translate-x-0',
              sz.translate,
            )}
          >
            {/* Minus icon — indeterminate state */}
            {indeterminate && (
              <Minus
                className={cn(sz.icon, 'text-[var(--lyra-color-fg-secondary)]')}
                strokeWidth={2.5}
              />
            )}

            {/* Check icon — showIcon + checked */}
            {!indeterminate && showIcon && displayChecked && (
              <Check
                className={cn(sz.icon, 'text-[var(--lyra-color-fg-active-strong)]')}
                strokeWidth={2.5}
              />
            )}
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>

        {/* ── Label ────────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              sz.label,
              'leading-none font-medium select-none',
              disabled
                ? 'text-lyra-fg-disabled cursor-not-allowed'
                : 'text-lyra-fg-default cursor-pointer',
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)
Switch.displayName = 'Switch'

export { Switch }
export default Switch
