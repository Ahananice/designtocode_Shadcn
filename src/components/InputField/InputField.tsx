import * as React from 'react'
import { Eye, EyeOff, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import styles from './InputField.module.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string
  label: string
}

export type InputFieldType =
  | 'text'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'
  | 'select'

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> {
  /** Label displayed above the control */
  label?: string
  /** Renders a red `*` after the label */
  required?: boolean
  /** Helper text shown below the control when there is no error */
  helperText?: string
  /** Error message shown below the control; also sets aria-invalid */
  error?: string
  /** Wrapping div className */
  containerClassName?: string
  /** Control type. Defaults to `"text"`. Use `"select"` to render a dropdown. */
  type?: InputFieldType
  /** Icon (or any node) rendered inside the left edge of the control */
  leadingIcon?: React.ReactNode
  /**
   * Icon (or any node) rendered inside the right edge of the control.
   * Overrides the auto-generated icon for `password`, `date`, and `time` types.
   */
  trailingIcon?: React.ReactNode
  /** Short text rendered flush against the left edge inside the control (e.g. `"$"`, `"https://"`) */
  prefix?: string
  /** Short text rendered flush against the right edge inside the control (e.g. `".com"`, `"kg"`) */
  suffix?: string
  // ── Select-specific props (ignored for all other types) ──────────────────
  /** Option list — required when type="select" */
  options?: SelectOption[]
  /** Controlled value callback for type="select" */
  onValueChange?: (value: string) => void
}

// ─── Shared state-class builder ───────────────────────────────────────────────

interface StateOpts {
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
  leadingIcon?: boolean
  hasTrailing?: boolean
}

function fieldClasses({ disabled, readOnly, error, leadingIcon, hasTrailing }: StateOpts) {
  return cn(
    // Base
    'h-control-xl w-full rounded-md border px-3',
    'text-lyra-sm',
    '!border-[var(--lyra-color-border-medium)]',
    '!bg-[var(--lyra-color-bg-field)]',
    '!text-[var(--lyra-color-fg-default)]',
    'placeholder:!text-[var(--lyra-color-fg-secondary)]',
    'transition-colors duration-150',
    'focus-visible:outline-none',

    // ── Normal interactive ──────────────────────────────────────────────────
    !disabled && !readOnly && [
      'hover:!border-[var(--lyra-color-border-strong)]',
      'focus-visible:!border-[var(--lyra-color-border-active)]',
      'focus-visible:!ring-2',
      'focus-visible:!ring-[var(--lyra-color-border-focus)]',
      'focus-visible:!ring-offset-1',
    ],

    // ── Error (only when interactive) ──────────────────────────────────────
    !disabled && !readOnly && error && [
      '!border-[var(--lyra-color-status-critical-strong)]',
      'hover:!border-[var(--lyra-color-status-critical-strong)]',
      'focus-visible:!border-[var(--lyra-color-status-critical-strong)]',
      'focus-visible:!ring-[var(--lyra-color-status-critical-strong)]',
    ],

    // ── Read-only ───────────────────────────────────────────────────────────
    readOnly && [
      'cursor-default',
      '!bg-[var(--lyra-color-bg-disabled)]',
      '!border-[var(--lyra-color-border-disabled)]',
      '!text-[var(--lyra-color-fg-secondary)]',
    ],

    // ── Disabled ────────────────────────────────────────────────────────────
    disabled && [
      'cursor-not-allowed',
      '!opacity-100',
      '!bg-[var(--lyra-color-bg-disabled)]',
      '!border-[var(--lyra-color-border-disabled)]',
      '!text-[var(--lyra-color-fg-disabled)]',
    ],

    // ── Icon padding ────────────────────────────────────────────────────────
    leadingIcon && 'pl-9',
    hasTrailing && 'pr-9',
  )
}

// ─── Wrapper-input (prefix / suffix) ─────────────────────────────────────────

interface WrapperInputProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  inputRef: React.Ref<HTMLInputElement>
  prefix?: string
  suffix?: string
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
}

function WrapperInput({
  inputProps,
  inputRef,
  prefix,
  suffix,
  disabled,
  readOnly,
  error,
}: WrapperInputProps) {
  return (
    <div
      className={cn(
        // Shape identical to fieldClasses (without icon padding or focus-visible)
        'flex h-control-xl w-full items-center rounded-md border',
        'transition-colors duration-150',
        '!border-[var(--lyra-color-border-medium)]',
        '!bg-[var(--lyra-color-bg-field)]',

        !disabled && !readOnly && [
          'hover:!border-[var(--lyra-color-border-strong)]',
          'focus-within:!border-[var(--lyra-color-border-active)]',
          'focus-within:!ring-2',
          'focus-within:!ring-[var(--lyra-color-border-focus)]',
          'focus-within:!ring-offset-1',
        ],
        !disabled && !readOnly && error && [
          '!border-[var(--lyra-color-status-critical-strong)]',
          'hover:!border-[var(--lyra-color-status-critical-strong)]',
          'focus-within:!border-[var(--lyra-color-status-critical-strong)]',
          'focus-within:!ring-[var(--lyra-color-status-critical-strong)]',
        ],
        readOnly && [
          '!bg-[var(--lyra-color-bg-disabled)]',
          '!border-[var(--lyra-color-border-disabled)]',
        ],
        disabled && [
          '!opacity-100',
          '!bg-[var(--lyra-color-bg-disabled)]',
          '!border-[var(--lyra-color-border-disabled)]',
        ],
      )}
    >
      {prefix && (
        <span
          className={cn(
            'shrink-0 pl-3 text-lyra-sm select-none whitespace-nowrap',
            disabled
              ? '!text-[var(--lyra-color-fg-disabled)]'
              : '!text-[var(--lyra-color-fg-secondary)]',
          )}
        >
          {prefix}
        </span>
      )}

      <input
        ref={inputRef}
        {...inputProps}
        className={cn(
          'min-w-0 flex-1 bg-transparent px-3 text-lyra-sm outline-none border-none',
          '!text-[var(--lyra-color-fg-default)]',
          'placeholder:!text-[var(--lyra-color-fg-secondary)]',
          disabled && 'cursor-not-allowed !text-[var(--lyra-color-fg-disabled)]',
          readOnly && 'cursor-default !text-[var(--lyra-color-fg-secondary)]',
        )}
      />

      {suffix && (
        <span
          className={cn(
            'shrink-0 pr-3 text-lyra-sm select-none whitespace-nowrap',
            disabled
              ? '!text-[var(--lyra-color-fg-disabled)]'
              : '!text-[var(--lyra-color-fg-secondary)]',
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ErrorMessage({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className={cn(styles.errorMessage, 'flex items-center gap-1 text-lyra-xs !text-[var(--lyra-color-status-critical-strong)]')}
    >
      <span
        aria-hidden
        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full !bg-[var(--lyra-color-status-critical-strong)] text-[9px] font-bold leading-none !text-white"
      >
        !
      </span>
      {message}
    </p>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * InputField
 *
 * Design-system labelled form control.
 * All colours use Lyra design tokens from `src/tokens/lyra-tokens.css`.
 *
 * States rendered:
 * - Default / Hover / Focus
 * - Read-only
 * - Disabled
 * - Error (with message)
 *
 * Variants:
 * - text / password / number / date / time / email / tel / url / search / select
 * - Leading icon
 * - Trailing icon
 * - Prefix / Suffix text
 * - Required indicator
 * - Helper text
 *
 * @example
 * <InputField label="Email" type="email" placeholder="you@example.com" />
 * <InputField label="Amount" prefix="$" suffix="USD" type="number" />
 * <InputField label="Search" leadingIcon={<Search className="h-4 w-4" />} />
 * <InputField label="Country" type="select" options={[...]} />
 * <InputField label="Name" required error="Required" />
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      required: requiredProp,
      error,
      helperText,
      className,
      containerClassName,
      id,
      type = 'text',
      disabled,
      readOnly,
      leadingIcon,
      trailingIcon,
      prefix,
      suffix,
      options = [],
      onValueChange,
      value,
      defaultValue,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = !error && helperText ? `${inputId}-helper` : undefined
    const descById = errorId ?? helperId

    const [showPw, setShowPw] = React.useState(false)

    // ── Label row ────────────────────────────────────────────────────────────
    const labelEl = label && (
      <div className="flex items-center gap-0.5">
        <label
          htmlFor={inputId}
          className={cn(
            'text-lyra-xs font-medium leading-none select-none',
            disabled
              ? '!text-[var(--lyra-color-fg-disabled)]'
              : '!text-[var(--lyra-color-fg-default)]',
          )}
        >
          {label}
        </label>
        {requiredProp && (
          <span
            className="text-lyra-xs leading-none !text-[var(--lyra-color-status-critical-strong)]"
            aria-hidden
          >
            *
          </span>
        )}
      </div>
    )

    // ── Footer row (error or helper) ─────────────────────────────────────────
    const footerEl = (
      <>
        {error && <ErrorMessage id={errorId!} message={error} />}
        {!error && helperText && (
          <p id={helperId} className="text-lyra-xs !text-[var(--lyra-color-fg-secondary)]">
            {helperText}
          </p>
        )}
      </>
    )

    // ── Auto-trailing icon by type ────────────────────────────────────────────
    const iconColor = disabled
      ? 'var(--lyra-color-fg-disabled)'
      : 'var(--lyra-color-fg-secondary)'

    const autoTrailing = (() => {
      if (type === 'password') {
        return (
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            onClick={() => setShowPw((v) => !v)}
            className={cn(
              'transition-colors',
              disabled
                ? 'cursor-not-allowed !text-[var(--lyra-color-fg-disabled)]'
                : '!text-[var(--lyra-color-fg-secondary)] hover:!text-[var(--lyra-color-fg-default)]',
            )}
          >
            {showPw ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        )
      }
      if (type === 'date') {
        return (
          <Calendar
            className="h-4 w-4 pointer-events-none"
            style={{ color: iconColor }}
            aria-hidden
          />
        )
      }
      if (type === 'time') {
        return (
          <Clock
            className="h-4 w-4 pointer-events-none"
            style={{ color: iconColor }}
            aria-hidden
          />
        )
      }
      return null
    })()

    const trailing = trailingIcon ?? autoTrailing
    const hasTrailing = !!trailing

    // ── SELECT ────────────────────────────────────────────────────────────────
    if (type === 'select') {
      return (
        <div className={cn(styles.root, 'flex flex-col gap-1.5', containerClassName)}>
          {labelEl}

          <Select
            disabled={disabled}
            value={value as string | undefined}
            defaultValue={defaultValue as string | undefined}
            onValueChange={readOnly ? undefined : onValueChange}
          >
            <SelectTrigger
              id={inputId}
              aria-invalid={!!error}
              aria-describedby={descById}
              className={cn(
                'h-control-xl w-full text-lyra-sm',
                // Base
                '!border-[var(--lyra-color-border-medium)]',
                '!bg-[var(--lyra-color-bg-field)]',
                '!text-[var(--lyra-color-fg-default)]',
                '[&>span]:!text-[var(--lyra-color-fg-secondary)]',
                'transition-colors duration-150',
                // Hover + Focus
                !disabled && !readOnly && [
                  'hover:!border-[var(--lyra-color-border-strong)]',
                  'focus:!border-[var(--lyra-color-border-active)]',
                  'focus:!ring-2',
                  'focus:!ring-[var(--lyra-color-border-focus)]',
                  'focus:!ring-offset-1',
                ],
                // Error
                !disabled && !readOnly && error && [
                  '!border-[var(--lyra-color-status-critical-strong)]',
                  'hover:!border-[var(--lyra-color-status-critical-strong)]',
                  'focus:!border-[var(--lyra-color-status-critical-strong)]',
                  'focus:!ring-[var(--lyra-color-status-critical-strong)]',
                ],
                // Read-only
                readOnly && [
                  'pointer-events-none cursor-default',
                  '!bg-[var(--lyra-color-bg-disabled)]',
                  '!border-[var(--lyra-color-border-disabled)]',
                  '!text-[var(--lyra-color-fg-secondary)]',
                ],
                // Disabled
                disabled && [
                  '!opacity-100',
                  'disabled:!bg-[var(--lyra-color-bg-disabled)]',
                  'disabled:!border-[var(--lyra-color-border-disabled)]',
                  'disabled:!text-[var(--lyra-color-fg-disabled)]',
                ],
                className,
              )}
            >
              <SelectValue placeholder={placeholder ?? 'Select…'} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {footerEl}
        </div>
      )
    }

    // ── Shared input props (for both Input and WrapperInput) ──────────────────
    const sharedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      id: inputId,
      type: type === 'password' ? (showPw ? 'text' : 'password') : type,
      disabled,
      readOnly,
      value,
      defaultValue,
      placeholder,
      'aria-invalid': !!error,
      'aria-describedby': descById,
      ...rest,
    }

    // ── Determine which control to render ─────────────────────────────────────
    const controlEl =
      prefix || suffix ? (
        <WrapperInput
          inputRef={ref}
          inputProps={sharedInputProps}
          prefix={prefix}
          suffix={suffix}
          disabled={disabled}
          readOnly={readOnly}
          error={!!error}
        />
      ) : (
        <Input
          ref={ref}
          {...sharedInputProps}
          className={cn(
            styles.input,
            fieldClasses({ disabled, readOnly, error: !!error, leadingIcon: !!leadingIcon, hasTrailing }),
            className,
          )}
        />
      )

    return (
      <div className={cn(styles.root, 'flex flex-col gap-1.5', containerClassName)}>
        {labelEl}

        {/* ── Input area with optional flanking icons ─────────────────────── */}
        <div className="relative flex items-center">
          {/* Leading icon */}
          {leadingIcon && (
            <div
              className="pointer-events-none absolute left-3 flex items-center"
              style={{ color: iconColor }}
              aria-hidden
            >
              {leadingIcon}
            </div>
          )}

          {controlEl}

          {/* Trailing area */}
          {hasTrailing && (
            <div className="absolute right-3 flex items-center [&_button]:pointer-events-auto pointer-events-none">
              {trailing}
            </div>
          )}
        </div>

        {footerEl}
      </div>
    )
  },
)
InputField.displayName = 'InputField'

export default InputField
