import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { Button as ButtonBase } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import styles from './Button.module.css'

/**
 * Design-specific colour classes layered on top of the Shadcn/ui Button base.
 * The base Button (`ui/button.tsx`) contributes: layout, Slot support, focus ring,
 * disabled states, size classes, and forwardRef.
 * These classes override the CSS-variable colours with the exact design values.
 */
const designVariants = cva('', {
  variants: {
    variant: {
      /** White background, gray border — Col 1 of the design matrix */
      default:
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800',

      /** Filled blue — Col 2 of the design matrix */
      primary:
        'border-transparent bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500',

      /** Filled red/crimson — Col 3 of the design matrix */
      destructive:
        'border-transparent bg-red-700 text-white hover:bg-red-600 active:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700',

      /** No background or border — Col 4 of the design matrix */
      ghost:
        'border-transparent bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800',
    },
  },
  defaultVariants: { variant: 'default' },
})

export type DesignVariant = NonNullable<VariantProps<typeof designVariants>['variant']>

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ButtonBase>, 'variant'> {
  /**
   * `default`     — outline (white bg, gray border)
   * `primary`     — filled blue
   * `destructive` — filled red
   * `ghost`       — text only
   */
  variant?: DesignVariant
}

/**
 * Button
 *
 * Design-system button built on the Shadcn/ui `Button` primitive
 * (`src/components/ui/button.tsx`). The primitive provides layout, Slot,
 * focus ring, disabled states, size variants, and ref forwarding.
 * This wrapper layers design-specific colours on top.
 *
 * @example
 * <Button variant="primary">Save</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button variant="default" size="icon" aria-label="More"><MoreVertical /></Button>
 */
const Button = React.forwardRef<
  React.ComponentRef<typeof ButtonBase>,
  ButtonProps
>(({ variant = 'default', className, ...props }, ref) => (
  <ButtonBase
    ref={ref}
    // Use Shadcn "ghost" as the structural base — it has no background/border/text
    // colour of its own, so our design classes apply without conflicts.
    variant="ghost"
    className={cn(styles.root, designVariants({ variant }), className)}
    {...props}
  />
))
Button.displayName = 'Button'

export { Button }
export default Button
