import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { Button as ButtonBase } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import styles from './Button.module.css'

/**
 * Design-specific colour and size classes layered on top of the Shadcn/ui Button primitive.
 * The base Button (`ui/button.tsx`) contributes: layout, Slot support, focus ring,
 * and ref forwarding. These classes supply Lyra design-token colours and dimensions.
 *
 * All colour values reference `--lyra-color-*` variables from `src/tokens/lyra-tokens.css`.
 */
const designVariants = cva(
  // Shared: Lyra font scale, smooth transitions.
  // !important on disabled:opacity ensures the base primitive's disabled:opacity-50 never wins.
  'text-lyra-sm font-medium transition-colors disabled:!opacity-100 disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        /** Secondary — white bg, default border, action text */
        secondary:
          'border border-lyra-border-default bg-lyra-bg-secondary text-lyra-fg-action ' +
          'hover:!bg-lyra-state-hover-secondary hover:!text-lyra-fg-action ' +
          'active:!bg-lyra-state-pressed-secondary ' +
          'disabled:!bg-lyra-bg-disabled disabled:!text-lyra-fg-disabled disabled:!border-lyra-border-disabled',

        /** Primary — filled brand blue */
        primary:
          'border border-transparent bg-lyra-bg-primary text-lyra-fg-on-primary ' +
          'hover:!bg-lyra-state-hover-primary hover:!text-lyra-fg-on-primary ' +
          'active:!bg-lyra-state-pressed-primary ' +
          'disabled:!bg-lyra-bg-disabled disabled:!text-lyra-fg-disabled',

        /** Destructive — filled red */
        destructive:
          'border border-transparent bg-lyra-bg-destructive text-lyra-fg-on-destructive ' +
          'hover:!bg-lyra-state-hover-critical-strong hover:!text-lyra-fg-on-destructive ' +
          'active:!bg-lyra-state-pressed-critical-strong ' +
          'disabled:!bg-lyra-bg-disabled disabled:!text-lyra-fg-disabled',

        /** Ghost — no background or border */
        ghost:
          'border border-transparent bg-transparent text-lyra-fg-action ' +
          'hover:!bg-lyra-state-hover-opacity hover:!text-lyra-fg-action ' +
          'active:!bg-lyra-state-pressed-opacity ' +
          'disabled:!text-lyra-fg-disabled',
      },
      size: {
        /** 36px tall — Lyra large */
        lg:        'h-9 px-4 py-0 rounded-md',
        /** 32px tall — Lyra medium (default) */
        default:   'h-8 px-3 py-0 rounded-md',
        /** 24px tall — Lyra small */
        sm:        'h-6 px-2 py-0 rounded-sm',
        /** Icon-only square, medium 32×32 */
        icon:      'h-8 w-8 rounded-md p-0',
        /** Icon-only square, large 36×36 */
        'icon-lg': 'h-9 w-9 rounded-md p-0',
        /** Icon-only square, small 24×24 */
        'icon-sm': 'h-6 w-6 rounded-sm p-0',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'default' },
  }
)

export type DesignVariant = NonNullable<VariantProps<typeof designVariants>['variant']>
export type DesignSize = NonNullable<VariantProps<typeof designVariants>['size']>

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ButtonBase>, 'variant' | 'size'> {
  /**
   * `secondary`   — outline (white bg, default border)
   * `primary`     — filled brand blue
   * `destructive` — filled red
   * `ghost`       — text only, no background
   */
  variant?: DesignVariant
  /**
   * `lg`       — 36px tall
   * `default`  — 32px tall
   * `sm`       — 24px tall
   * `icon`     — square 32×32 icon button
   * `icon-lg`  — square 36×36 icon button
   * `icon-sm`  — square 24×24 icon button
   */
  size?: DesignSize
}

/**
 * Button
 *
 * Design-system button built on the Shadcn/ui `Button` primitive.
 * All colours and dimensions use Lyra design tokens from `src/tokens/lyra-tokens.css`.
 *
 * @example
 * <Button variant="primary">Save</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button variant="secondary" size="icon" aria-label="More"><MoreVertical /></Button>
 */
const Button = React.forwardRef<
  React.ComponentRef<typeof ButtonBase>,
  ButtonProps
>(({ variant = 'secondary', size = 'default', className, ...props }, ref) => (
  <ButtonBase
    ref={ref}
    // Use Shadcn "ghost" + "default" as the structural base — no colour or size
    // of its own, so our Lyra design classes in className apply without conflicts.
    variant="ghost"
    size="default"
    className={cn(styles.root, designVariants({ variant, size }), className)}
    {...props}
  />
))
Button.displayName = 'Button'

export { Button }
export default Button
