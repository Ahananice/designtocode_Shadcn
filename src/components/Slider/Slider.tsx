import * as React from 'react'
import { HelpCircle } from 'lucide-react'
import { Slider as SliderBase } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import styles from './Slider.module.css'

// ─── Multi-range default colours ──────────────────────────────────────────────
// 6 segments (N+1 for 5 default thumbs) mapped to Lyra tokens.
// The palette runs from critical-red (left) → neutral → brand-blue (right),
// matching the Figma "Lyra Foundations – Beta" multi-range design.
const MULTI_RANGE_SEGMENT_COLORS = [
  'var(--lyra-color-status-critical-strong)',   // #bf2323  deep red
  'var(--lyra-color-accent-red-strong)',         // #e12f2f  medium red
  'var(--lyra-color-status-critical-medium)',    // #ffbdbd  light pink-red
  'var(--lyra-color-accent-red-subtle)',         // #ffebeb  very light pink
  'var(--lyra-color-accent-blue-soft)',          // #d6e4ff  light blue
  'var(--lyra-color-bg-primary)',               // #126bce  brand blue
] as const

// Default thumb positions for multi-range (0-10 scale)
const MULTI_RANGE_DEFAULT_VALUES = [1, 2, 3, 6, 9]

// ─── Types ────────────────────────────────────────────────────────────────────

export type SliderType = 'single' | 'range' | 'multiRange'

export interface SliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderBase>,
    'segmentColors' | 'children'
  > {
  /**
   * `single`     — one thumb, fill from track start to thumb (default)
   * `range`      — two thumbs, fill between them
   * `multiRange` — five thumbs with a red-to-blue Lyra segment palette
   */
  type?: SliderType
  /** Field label shown above the track */
  label?: string
  /** Renders a red `*` after the label */
  required?: boolean
  /** Shows a help icon next to the label */
  showHelp?: boolean
  /** Accessible label for the help icon */
  helpText?: string
  /**
   * Render tick marks below the track.
   * When `markLabels` is given, marks are placed at those label positions.
   * Otherwise falls back to `markCount` evenly spaced marks.
   */
  showMarks?: boolean
  /**
   * Labels rendered beneath each mark (e.g. `['0','','5','','10']`).
   * Length determines mark count when `showMarks` is true.
   */
  markLabels?: string[]
  /**
   * Number of evenly spaced marks when `showMarks` is true and
   * `markLabels` is not provided.
   * @default 11
   */
  markCount?: number
  /**
   * Custom segment colours for `type='multiRange'`.
   * Must have length == (thumbCount + 1).
   * Defaults to the built-in Lyra red→blue palette.
   */
  segmentColors?: string[]
}

// ─── Arrow SVG helper ─────────────────────────────────────────────────────────

function TrackArrow({
  direction,
  color,
}: {
  direction: 'left' | 'right'
  color: string
}) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      aria-hidden
      className={cn(
        'absolute top-1/2 -translate-y-1/2 shrink-0',
        direction === 'left' ? 'right-full mr-0.5' : 'left-full ml-0.5',
      )}
    >
      {direction === 'left' ? (
        <polygon points="8,0 8,8 0,4" fill={color} />
      ) : (
        <polygon points="0,0 0,8 8,4" fill={color} />
      )}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Slider
 *
 * Design-system slider with three variants:
 * - `single`     — one thumb, fill from 0 to thumb
 * - `range`      — two thumbs, fill between them
 * - `multiRange` — five thumbs, Lyra red→blue segment palette + end arrows
 *
 * Built on Shadcn/ui `Slider` primitive (`@radix-ui/react-slider`).
 * All colours use Lyra design tokens from `src/tokens/lyra-tokens.css`.
 *
 * @example
 * <Slider type="single" label="Volume" defaultValue={[40]} min={0} max={100} />
 * <Slider type="range"  label="Price"  defaultValue={[20,80]} />
 * <Slider type="multiRange" label="Quality" />
 */
const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderBase>,
  SliderProps
>(
  (
    {
      type = 'single',
      label,
      required,
      showHelp,
      helpText = 'More information',
      showMarks,
      markLabels,
      markCount = 11,
      segmentColors,
      disabled,
      className,
      min = 0,
      max = 100,
      step = 1,
      defaultValue,
      value,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const id = React.useId()

    // ── Resolve defaults per type ──────────────────────────────────────
    const resolvedDefault = React.useMemo(() => {
      if (defaultValue) return defaultValue
      if (type === 'range') return [25, 75]
      if (type === 'multiRange') return MULTI_RANGE_DEFAULT_VALUES
      return [0]
    }, [type, defaultValue])

    const resolvedMin = type === 'multiRange' && min === 0 ? 0 : min
    const resolvedMax = type === 'multiRange' && max === 100 ? 10 : max

    const resolvedSegmentColors =
      type === 'multiRange'
        ? (segmentColors ?? [...MULTI_RANGE_SEGMENT_COLORS])
        : undefined

    // ── Mark generation ────────────────────────────────────────────────
    interface Mark { pct: number; label: string }
    const marks: Mark[] = React.useMemo(() => {
      if (!showMarks) return []
      const lo = resolvedMin
      const hi = resolvedMax
      if (markLabels) {
        return markLabels.map((lbl, i) => ({
          pct: (i / (markLabels.length - 1)) * 100,
          label: lbl,
        }))
      }
      const n = markCount > 1 ? markCount : 2
      return Array.from({ length: n }, (_, i) => ({
        pct: (i / (n - 1)) * 100,
        label: String(Math.round(lo + (i / (n - 1)) * (hi - lo))),
      }))
    }, [showMarks, resolvedMin, resolvedMax, markLabels, markCount])

    const showArrows = type === 'multiRange'
    const leftArrowColor = resolvedSegmentColors?.[0] ?? 'currentColor'
    const rightArrowColor =
      resolvedSegmentColors?.[resolvedSegmentColors.length - 1] ?? 'currentColor'

    return (
      <div className={cn(styles.root, 'flex flex-col gap-2', className)}>
        {/* ── Label row ──────────────────────────────────────────────── */}
        {label && (
          <div className="flex items-center gap-1">
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none text-lyra-fg-default select-none"
            >
              {label}
            </label>
            {required && (
              <span
                className="text-lyra-status-critical-strong text-sm leading-none"
                aria-hidden
              >
                *
              </span>
            )}
            {showHelp && (
              <button
                type="button"
                aria-label={helpText}
                className={cn(
                  'text-lyra-fg-secondary hover:!text-lyra-fg-default transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lyra-border-focus rounded',
                )}
              >
                <HelpCircle className="h-3 w-3" aria-hidden />
              </button>
            )}
          </div>
        )}

        {/* ── Slider track area ───────────────────────────────────────── */}
        <div
          className={cn(
            'relative',
            showArrows && 'px-4',   // room for the end arrows
          )}
        >
          {showArrows && (
            <TrackArrow direction="left" color={leftArrowColor} />
          )}

          <SliderBase
            ref={ref}
            id={id}
            min={resolvedMin}
            max={resolvedMax}
            step={step}
            disabled={disabled}
            defaultValue={resolvedDefault}
            value={value}
            onValueChange={onValueChange}
            segmentColors={resolvedSegmentColors}
            className={cn(
              disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
            )}
            {...props}
          />

          {showArrows && (
            <TrackArrow direction="right" color={rightArrowColor} />
          )}
        </div>

        {/* ── Tick marks ──────────────────────────────────────────────── */}
        {showMarks && marks.length > 0 && (
          <div
            className={cn('relative h-1', showArrows && 'px-4')}
            aria-hidden
          >
            {marks.map((m, i) => (
              <div
                key={i}
                className={styles.mark}
                style={{ left: `${m.pct}%`, transform: 'translateX(-50%)' }}
              />
            ))}
          </div>
        )}

        {/* ── Mark labels ─────────────────────────────────────────────── */}
        {showMarks && marks.some(m => m.label) && (
          <div
            className={cn('relative h-3', showArrows && 'px-4')}
            aria-hidden
          >
            {marks.map((m, i) => (
              <span
                key={i}
                className="absolute text-[11px] font-normal leading-none text-lyra-fg-default"
                style={{
                  left: `${m.pct}%`,
                  transform:
                    i === 0
                      ? 'translateX(0)'
                      : i === marks.length - 1
                        ? 'translateX(-100%)'
                        : 'translateX(-50%)',
                }}
              >
                {m.label}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
)
Slider.displayName = 'Slider'

export { Slider }
export default Slider
