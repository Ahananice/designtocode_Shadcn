/**
 * TextArea
 * Labelled multi-line input with character count, all interaction states,
 * and an optional AI footer (thumbs up/down + action buttons).
 *
 * Built on:
 *   - Textarea from @/components/ui/textarea
 *   - Label   from @/components/ui/label
 *   - Button  from @/components/ui/button
 *
 * @example
 * <TextArea label="Notes" maxLength={100} placeholder="Placeholder" />
 * <TextArea label="Notes" error="Required" />
 * <TextArea label="Notes" variant="ai"
 *   actions={[{ label: 'Action 1' }, { label: 'Action 2' }]} />
 */

import * as React from 'react'
import { Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import styles from './TextArea.module.css'

export interface TextAreaAction {
  label: string
  onClick?: () => void
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label shown above the textarea */
  label?: string
  /** Error message — red border + pink bg + message below; hides char count */
  error?: string
  /** Show current / max character count when set (hidden in error state) */
  maxLength?: number
  /** Wrapping div className */
  containerClassName?: string
  /** "ai" renders a footer with AI controls inside the textarea border */
  variant?: 'default' | 'ai'
  /** Action buttons in the AI footer (right side) */
  actions?: TextAreaAction[]
  /** Called when the AI sparkle button is clicked */
  onAiClick?: () => void
  /** Called when thumbs-up is clicked (AI variant) */
  onThumbsUp?: () => void
  /** Called when thumbs-down is clicked (AI variant) */
  onThumbsDown?: () => void
}

// ── Shared helpers ──────────────────────────────────────────────────────────

function ErrorMessage({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1 text-xs text-[#DC2626] dark:text-red-400"
    >
      <span
        aria-hidden="true"
        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-[9px] font-bold leading-none text-white"
      >
        !
      </span>
      {message}
    </p>
  )
}

// ── State class strings ─────────────────────────────────────────────────────
//
// Backgrounds (error / read-only / disabled) are applied via CSS module classes
// (styles.errorBg etc.) NOT via Tailwind utilities.  Reason: CSS module rules
// are non-layered, so they sit above @layer utilities in the cascade and
// reliably override Shadcn's bg-background without needing !important.

const baseTextarea = [
  'border-gray-300',
  'hover:border-gray-400',
  // Override Shadcn's ring-2 + ring-offset-2 with a tighter, no-gap ring
  'focus-visible:border-[#2563EB]',
  'focus-visible:ring-1',
  'focus-visible:ring-[#2563EB]/25',
  'focus-visible:ring-offset-0',
].join(' ')

// NOTE: backgrounds are applied via CSS module classes (styles.readOnlyBg etc.)
// rather than Tailwind utilities, because CSS module rules are non-layered and
// therefore sit above @layer utilities in the cascade — guaranteeing they
// override Shadcn's bg-background without needing !important.

const readOnlyTextarea = [
  'cursor-default',
  'resize-none',
  'hover:border-gray-300',
  'focus-visible:border-gray-300',
  'focus-visible:ring-0',
].join(' ')

const disabledTextarea = '' // background + opacity handled by styles.disabledBg

const errorTextarea = [
  'border-[#DC2626]',
  'hover:border-[#DC2626]',
  'focus-visible:border-[#DC2626]',
  'focus-visible:ring-1',
  'focus-visible:ring-[#DC2626]/25',
  'focus-visible:ring-offset-0',
].join(' ')

// ── Main component ──────────────────────────────────────────────────────────

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      maxLength,
      containerClassName,
      variant = 'default',
      actions = [],
      onAiClick,
      onThumbsUp,
      onThumbsDown,
      className,
      id,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const errorId = error ? `${inputId}-error` : undefined

    // Track character count for both controlled and uncontrolled usage
    const [internalLength, setInternalLength] = React.useState(
      (defaultValue as string | undefined)?.length ?? 0,
    )
    const currentLength =
      value !== undefined ? String(value).length : internalLength

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalLength(e.target.value.length)
      onChange?.(e)
    }

    const showCharCount = maxLength !== undefined && !error

    // Header row — label (left) + char count (right)
    const headerRow = (label || showCharCount) && (
      <div className="flex items-center justify-between gap-2">
        {label ? (
          <Label
            htmlFor={inputId}
            className={cn(
              'text-xs font-medium text-gray-700 dark:text-gray-300',
              disabled && 'text-gray-400 dark:text-gray-500',
            )}
          >
            {label}
          </Label>
        ) : (
          <span />
        )}
        {showCharCount && (
          <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    )

    // ── AI variant ─────────────────────────────────────────────────────────
    if (variant === 'ai') {
      return (
        <div
          className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}
        >
          {headerRow}

          {/* Single border wraps textarea + footer */}
          <div
            className={cn(
              'overflow-hidden rounded-md border border-gray-300 bg-white',
              'transition-colors duration-150',
              'focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/25',
              error && ['border-[#DC2626]', styles.errorBg],
              disabled && ['border-gray-200', styles.disabledBg],
              'dark:bg-gray-900 dark:border-gray-600',
            )}
          >
            <Textarea
              ref={ref}
              id={inputId}
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              maxLength={maxLength}
              aria-invalid={!!error}
              aria-describedby={errorId}
              className={cn(
                'resize-none rounded-none border-0 bg-transparent shadow-none',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                readOnly && 'cursor-default',
                className,
              )}
              {...rest}
            />

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-2 py-1.5 dark:border-gray-700">
              <div className="flex items-center gap-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-500 hover:text-gray-800 dark:text-gray-400"
                  onClick={onAiClick}
                  aria-label="AI assist"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-500 hover:text-green-600 dark:text-gray-400"
                  onClick={onThumbsUp}
                  aria-label="Thumbs up"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-500 hover:text-red-600 dark:text-gray-400"
                  onClick={onThumbsDown}
                  aria-label="Thumbs down"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
              </div>

              {actions.length > 0 && (
                <div className="flex items-center gap-1">
                  {actions.map((action) => (
                    <Button
                      key={action.label}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300"
                      onClick={action.onClick}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && <ErrorMessage id={errorId!} message={error} />}
        </div>
      )
    }

    // ── Default / all other states ──────────────────────────────────────────
    return (
      <div
        className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}
      >
        {headerRow}

        <Textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            baseTextarea,
            readOnly && [readOnlyTextarea, styles.readOnlyBg],
            disabled && [disabledTextarea, styles.disabledBg],
            error && [errorTextarea, styles.errorBg],
            className,
          )}
          {...rest}
        />

        {error && <ErrorMessage id={errorId!} message={error} />}
      </div>
    )
  },
)
TextArea.displayName = 'TextArea'

export default TextArea
