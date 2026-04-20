import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { RadioButtonGroupContext } from './RadioButtonContext'

export interface RadioButtonGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    'orientation'
  > {
  /** Group label rendered above the options */
  label?: string
  /**
   * `vertical`   — options stacked top-to-bottom (default)
   * `horizontal` — options laid out side-by-side
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Shows selection but prevents changes.
   * Label remains at full opacity; the checked indicator turns gray.
   */
  readOnly?: boolean
}

/**
 * RadioButtonGroup
 *
 * Container for a set of `<RadioButton>` items built on `@radix-ui/react-radio-group`.
 * Propagates `disabled` and `readOnly` to all child RadioButtons via context.
 *
 * @example
 * <RadioButtonGroup label="Subscription" defaultValue="pro" orientation="vertical">
 *   <RadioButton value="free" label="Free" />
 *   <RadioButton value="pro"  label="Pro"  description="All features included" />
 *   <RadioButton value="ent"  label="Enterprise" />
 * </RadioButtonGroup>
 */
const RadioButtonGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioButtonGroupProps
>(
  (
    {
      label,
      orientation = 'vertical',
      readOnly = false,
      disabled,
      className,
      onValueChange,
      value,
      defaultValue,
      children,
      ...props
    },
    ref,
  ) => {
    const ctx = React.useMemo(
      () => ({ readOnly, disabled: !!disabled }),
      [readOnly, disabled],
    )

    // For readOnly: track value internally so Radix stays controlled and
    // cannot update when the user clicks.
    const [controlled, setControlled] = React.useState(value ?? defaultValue)
    React.useEffect(() => {
      if (value !== undefined) setControlled(value)
    }, [value])

    const handleValueChange = React.useCallback(
      (v: string) => {
        if (!readOnly) {
          if (value === undefined) setControlled(v) // uncontrolled
          onValueChange?.(v)
        }
      },
      [readOnly, value, onValueChange],
    )

    return (
      <RadioButtonGroupContext.Provider value={ctx}>
        <div className={cn('flex flex-col gap-2', className)}>
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
          <RadioGroupPrimitive.Root
            ref={ref}
            disabled={disabled}
            // Controlled value when readOnly so Radix cannot switch selection
            value={readOnly ? controlled : value}
            defaultValue={readOnly ? undefined : defaultValue}
            onValueChange={handleValueChange}
            className={cn(
              orientation === 'horizontal'
                ? 'flex flex-row flex-wrap gap-x-6 gap-y-2'
                : 'flex flex-col gap-2',
            )}
            {...props}
          >
            {children}
          </RadioGroupPrimitive.Root>
        </div>
      </RadioButtonGroupContext.Provider>
    )
  },
)
RadioButtonGroup.displayName = 'RadioButtonGroup'

export { RadioButtonGroup }
export default RadioButtonGroup
