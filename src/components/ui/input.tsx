import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout
          'flex h-control-xl w-full rounded-md border px-3',
          // Typography
          'text-lyra-sm !text-[var(--lyra-color-fg-default)]',
          // Default state
          '!border-[var(--lyra-color-border-medium)]',
          '!bg-[var(--lyra-color-bg-field)]',
          'placeholder:!text-[var(--lyra-color-fg-secondary)]',
          'transition-colors duration-150',
          // Hover
          'hover:!border-[var(--lyra-color-border-strong)]',
          // Focus
          'focus-visible:outline-none',
          'focus-visible:!border-[var(--lyra-color-border-active)]',
          'focus-visible:!ring-2',
          'focus-visible:!ring-[var(--lyra-color-border-focus)]',
          'focus-visible:!ring-offset-1',
          // Read-only
          'read-only:cursor-default',
          'read-only:!bg-[var(--lyra-color-bg-disabled)]',
          'read-only:!border-[var(--lyra-color-border-disabled)]',
          'read-only:hover:!border-[var(--lyra-color-border-disabled)]',
          'read-only:!text-[var(--lyra-color-fg-secondary)]',
          'read-only:focus-visible:!ring-0',
          // Disabled
          'disabled:cursor-not-allowed',
          'disabled:!opacity-100',
          'disabled:!bg-[var(--lyra-color-bg-disabled)]',
          'disabled:!border-[var(--lyra-color-border-disabled)]',
          'disabled:!text-[var(--lyra-color-fg-disabled)]',
          'disabled:hover:!border-[var(--lyra-color-border-disabled)]',
          // File input
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
