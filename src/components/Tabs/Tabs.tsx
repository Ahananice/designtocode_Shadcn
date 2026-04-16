import { cn } from '@/lib/utils'
import {
  Tabs as TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import styles from './Tabs.module.css'

/**
 * A single tab definition.
 */
export interface TabItem {
  /** Unique identifier matched to content panels */
  value: string
  /** Visible label */
  label: string
  /** Optional icon rendered to the left of the label */
  icon?: React.ReactNode
  /** Content rendered in the panel for this tab */
  content?: React.ReactNode
  /** Disables this specific tab */
  disabled?: boolean
}

export interface TabsProps {
  /** Ordered list of tabs */
  items: TabItem[]
  /**
   * `compact` — tabs are auto-width (default)
   * `full`    — tabs share the container width equally
   */
  variant?: 'compact' | 'full'
  /**
   * `horizontal` — tab list on top, indicator on bottom (default)
   * `vertical`   — tab list on left, indicator on right
   */
  orientation?: 'horizontal' | 'vertical'
  /** Initially active tab — uncontrolled */
  defaultValue?: string
  /** Active tab — controlled */
  value?: string
  /** Called when the active tab changes */
  onValueChange?: (value: string) => void
  className?: string
}

/**
 * Tabs
 *
 * Composite tab component built on Shadcn/ui `TabsList`, `TabsTrigger`,
 * and `TabsContent` primitives (`src/components/ui/tabs.tsx`).
 *
 * @example
 * // Horizontal (default)
 * <Tabs
 *   defaultValue="tab1"
 *   items={[
 *     { value: 'tab1', label: 'First Tab',  content: <p>Panel 1</p> },
 *     { value: 'tab2', label: 'Second Tab', content: <p>Panel 2</p> },
 *   ]}
 * />
 *
 * @example
 * // Vertical, full-width list
 * <Tabs
 *   orientation="vertical"
 *   variant="full"
 *   defaultValue="tab1"
 *   items={[...]}
 * />
 */
export function Tabs({
  items,
  variant = 'compact',
  orientation = 'horizontal',
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  const resolvedDefault = defaultValue ?? items[0]?.value

  return (
    <TabsRoot
      orientation={orientation}
      defaultValue={resolvedDefault}
      value={value}
      onValueChange={onValueChange}
      className={cn(
        styles.root,
        orientation === 'vertical' ? 'flex flex-row' : 'flex flex-col',
        className,
      )}
    >
      <TabsList
        className={cn(
          variant === 'full' && orientation === 'horizontal' && 'w-full',
          variant === 'full' && orientation === 'vertical' && 'h-full',
        )}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              styles.trigger,
              variant === 'full' && orientation === 'horizontal' && 'flex-1 justify-center',
              variant === 'full' && orientation === 'vertical' && 'w-full',
              orientation === 'vertical' && 'justify-start',
            )}
          >
            {item.icon && (
              <span className="shrink-0 text-[inherit]">{item.icon}</span>
            )}
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map(
        (item) =>
          item.content !== undefined && (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
            </TabsContent>
          ),
      )}
    </TabsRoot>
  )
}

export default Tabs
