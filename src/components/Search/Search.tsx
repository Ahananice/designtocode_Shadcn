/**
 * Search
 * Search input with a leading magnifying-glass icon, slightly rounded corners,
 * and default / focused / disabled states.
 *
 * Built on: lucide-react Search icon + native <input> inside a styled flex wrapper.
 *
 * @example
 * <Search placeholder="Search" />
 * <Search value={q} onChange={(e) => setQ(e.target.value)} onSearch={(v) => console.log(v)} />
 */

import * as React from 'react'
import { Search as SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import styles from './Search.module.css'

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Called when the user presses Enter; receives the current input value */
  onSearch?: (value: string) => void
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    { className, onSearch, onKeyDown, placeholder = 'Search', disabled, ...props },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(e.currentTarget.value)
      }
      onKeyDown?.(e)
    }

    return (
      <div
        className={cn(
          styles.root,
          // Wrapper acts as the visual "input box"
          'flex h-10 w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-3',
          'transition-colors duration-150',
          // Focus ring on the wrapper when the inner input is focused
          'focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/25',
          // Disabled
          disabled && 'cursor-not-allowed border-gray-200 bg-gray-100',
          'dark:bg-gray-900 dark:border-gray-600 dark:focus-within:border-[#2563EB]',
          className,
        )}
      >
        <SearchIcon
          aria-hidden="true"
          className={cn(
            'h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500',
            disabled && 'opacity-50',
          )}
        />
        <input
          ref={ref}
          type="text"
          inputMode="search"
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full flex-1 bg-transparent text-sm text-gray-700 outline-none',
            'placeholder:text-gray-400',
            'disabled:cursor-not-allowed',
            'dark:text-gray-200 dark:placeholder:text-gray-500',
          )}
          {...props}
        />
      </div>
    )
  },
)
Search.displayName = 'Search'

export default Search
