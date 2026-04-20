import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'shrink-0 h-4 w-4 rounded-sm border',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-[var(--lyra-color-border-focus)] focus-visible:ring-offset-1',
      'disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  />
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
