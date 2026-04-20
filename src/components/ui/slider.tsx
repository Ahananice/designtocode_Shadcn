import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

export interface SliderPrimitiveProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /**
   * Optional per-segment fill colours.
   * Length must equal (thumbCount + 1).
   * When provided the default Range fill is replaced by individually coloured
   * absolute-positioned divs, one per gap (before first thumb, between thumbs,
   * after last thumb).
   */
  segmentColors?: string[]
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderPrimitiveProps
>(
  (
    {
      className,
      segmentColors,
      value,
      defaultValue,
      min = 0,
      max = 100,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    // ── internal value tracking (needed to recompute segment positions) ──
    const [tracked, setTracked] = React.useState<number[]>(
      value ?? defaultValue ?? [0],
    )

    React.useEffect(() => {
      if (value !== undefined) setTracked(value)
    }, [value])

    const handleChange = React.useCallback(
      (val: number[]) => {
        setTracked(val)
        onValueChange?.(val)
      },
      [onValueChange],
    )

    const thumbCount = tracked.length

    // ── coloured segments ────────────────────────────────────────────────
    type Seg = { color: string; left: number; width: number }
    const segments: Seg[] | null = segmentColors
      ? (() => {
          const range = max - min
          // Boundaries: [min, v0, v1, …, vN, max]
          const boundaries = [min, ...tracked, max]
          return segmentColors.map<Seg>((color, i) => {
            const left = ((boundaries[i] - min) / range) * 100
            const right = ((boundaries[i + 1] - min) / range) * 100
            return { color, left, width: right - left }
          })
        })()
      : null

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className,
        )}
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleChange}
        {...props}
      >
        {/* ── Track ──────────────────────────────────────────────────── */}
        <SliderPrimitive.Track
          className={cn(
            'relative h-[2px] w-full grow rounded-full overflow-hidden',
            // Inactive track — !important so Radix/browser cannot override
            '!bg-[var(--lyra-color-fg-secondary)]',
          )}
        >
          {segments ? (
            // Multi-range: one coloured div per segment
            segments.map((seg, i) => (
              <div
                key={i}
                className="absolute h-full"
                style={{
                  left: `${seg.left}%`,
                  width: `${seg.width}%`,
                  backgroundColor: seg.color,
                }}
              />
            ))
          ) : (
            // Single / Range: standard Radix Range fill
            <SliderPrimitive.Range
              className="absolute h-full !bg-[var(--lyra-color-fg-active-strong)]"
            />
          )}
        </SliderPrimitive.Track>

        {/* ── Thumbs ─────────────────────────────────────────────────── */}
        {Array.from({ length: thumbCount }).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              // 20 × 20 white disc, border = fg-default (rgba(0,0,0,0.8))
              'block h-5 w-5 rounded-full !bg-white',
              '!border !border-[var(--lyra-color-fg-default)]',
              'transition-colors',
              // Focus ring: ~4 px offset giving 28 × 28 ring
              'focus-visible:outline-none',
              'focus-visible:!ring-[4px] focus-visible:!ring-[var(--lyra-color-border-focus)]',
              'disabled:pointer-events-none disabled:!opacity-30',
            )}
          />
        ))}
      </SliderPrimitive.Root>
    )
  },
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
