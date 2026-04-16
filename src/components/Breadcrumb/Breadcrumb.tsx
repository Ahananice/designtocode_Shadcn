import { cn } from '@/lib/utils'
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import styles from './Breadcrumb.module.css'

/**
 * A single crumb — provide `href` for a link, omit it for the current (last) page.
 */
export interface BreadcrumbItem {
  label: string
  /** Navigation target. Omit for the current page (renders as plain text). */
  href?: string
}

export interface BreadcrumbProps {
  /** Ordered list of crumbs. The last item is the current page. */
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumb
 *
 * Built on Shadcn/ui `BreadcrumbRoot`, `BreadcrumbList`, `BreadcrumbItem`,
 * `BreadcrumbLink`, `BreadcrumbPage`, and `BreadcrumbSeparator` primitives
 * from `src/components/ui/breadcrumb.tsx`.
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Level 2', href: '/level-2' },
 *     { label: 'Page Title' },
 *   ]}
 * />
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <BreadcrumbRoot className={cn(styles.nav, className)}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <BreadcrumbItem key={index}>
              {index > 0 && <BreadcrumbSeparator />}

              {isLast || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}

export default Breadcrumb
