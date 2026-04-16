import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

/**
 * Shadcn/ui Tabs — underline-indicator style.
 *
 * Supports both horizontal (default) and vertical orientation via the
 * `orientation` prop on the root `Tabs` component.
 *
 * Usage (primitives):
 *   <Tabs orientation="vertical" defaultValue="a">
 *     <TabsList>
 *       <TabsTrigger value="a">Tab A</TabsTrigger>
 *       <TabsTrigger value="b">Tab B</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="a">Panel A</TabsContent>
 *     <TabsContent value="b">Panel B</TabsContent>
 *   </Tabs>
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex',
      // Horizontal: row + bottom border
      'data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:border-b data-[orientation=horizontal]:border-border',
      // Vertical: column + right border
      'data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r data-[orientation=vertical]:border-border',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base layout — `group` lets the indicator span react to parent data attrs
      'group relative flex items-center gap-1.5 px-4 py-3 text-sm transition-colors',
      'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
      // Inactive
      'text-muted-foreground hover:text-foreground',
      // Active
      'data-[state=active]:text-blue-600 data-[state=active]:font-semibold',
      'dark:data-[state=active]:text-blue-400',
      // Disabled
      'disabled:pointer-events-none disabled:opacity-40',
      className,
    )}
    {...props}
  >
    {children}

    {/*
      Active indicator bar.
      Uses `group-data-[...]` to respond to the parent button's Radix data attrs:
        - data-state="active"              → show the bar
        - data-orientation="horizontal"    → 2px bottom bar
        - data-orientation="vertical"      → 2px right bar
    */}
    <span
      aria-hidden="true"
      className={cn(
        'absolute rounded-full transition-colors',
        // Horizontal: bottom 2px stripe
        'group-data-[orientation=horizontal]:bottom-0',
        'group-data-[orientation=horizontal]:left-0',
        'group-data-[orientation=horizontal]:right-0',
        'group-data-[orientation=horizontal]:h-0.5',
        // Vertical: right 2px stripe
        'group-data-[orientation=vertical]:right-0',
        'group-data-[orientation=vertical]:top-0',
        'group-data-[orientation=vertical]:bottom-0',
        'group-data-[orientation=vertical]:w-0.5',
        // Color — only visible when active
        'group-data-[state=active]:bg-blue-600',
        'dark:group-data-[state=active]:bg-blue-400',
      )}
    />
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      // Horizontal: top margin
      'data-[orientation=horizontal]:mt-4',
      // Vertical: left margin, no top margin
      'data-[orientation=vertical]:ml-4 data-[orientation=vertical]:mt-0 data-[orientation=vertical]:flex-1',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
