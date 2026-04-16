/**
 * InputField
 * Labelled form control supporting text, password, number, date, time, email,
 * tel, url, search, and select — with default, focused, read-only, disabled,
 * and error states.
 *
 * Built on:
 *   - Input   from @/components/ui/input
 *   - Label   from @/components/ui/label
 *   - Select* from @/components/ui/select  (when type="select")
 *
 * @example
 * <InputField label="Name" type="text" placeholder="Text" />
 * <InputField label="Password" type="password" />
 * <InputField label="Birth date" type="date" />
 * <InputField label="Start time" type="time" />
 * <InputField label="Quantity" type="number" />
 * <InputField label="Country" type="select"
 *   options={[{ value: 'us', label: 'United States' }]}
 *   onValueChange={(v) => console.log(v)} />
 * <InputField label="Email" error="Required" />
 */

import * as React from 'react'
import { Eye, EyeOff, Calendar, Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import styles from './InputField.module.css'

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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label displayed above the control */
  label?: string
  /** Error message shown below the control; also sets aria-invalid */
  error?: string
  /** Wrapping div className */
  containerClassName?: string
  /** Control type. Defaults to "text". Use "select" to render a Shadcn Select. */
  type?: InputFieldType
  // ── Select-specific props (ignored for all other types) ──────────────────
  /** Option list — required when type="select" */
  options?: SelectOption[]
  /** Controlled value callback for type="select" */
  onValueChange?: (value: string) => void
}

// Shared input class tokens ─────────────────────────────────────────────────

const baseInput =
  'border-gray-300 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20'

const readOnlyInput =
  'cursor-default bg-gray-100 text-gray-500 focus-visible:ring-0 dark:bg-gray-800'

const errorInput =
  'border-[#DC2626] bg-white focus-visible:border-[#DC2626] focus-visible:ring-[#DC2626]/20 dark:bg-gray-900'

// ── Sub-components ──────────────────────────────────────────────────────────

/** Wraps an Input with a trailing element (icon or button) */
function InputWithTrailing({
  children,
  trailing,
}: {
  children: React.ReactNode
  trailing: React.ReactNode
}) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 [&_button]:pointer-events-auto">
        {trailing}
      </div>
    </div>
  )
}

/** Error message row */
function ErrorMessage({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        styles.errorMessage,
        'flex items-center gap-1 text-xs text-[#DC2626] dark:text-red-400',
      )}
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

// ── Main component ──────────────────────────────────────────────────────────

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      className,
      containerClassName,
      id,
      type = 'text',
      disabled,
      readOnly,
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

    // Password visibility toggle state
    const [showPassword, setShowPassword] = React.useState(false)

    // Shared label element
    const labelEl = label && (
      <Label
        htmlFor={inputId}
        className={cn(
          'text-xs font-medium text-gray-700 dark:text-gray-300',
          disabled && 'text-gray-400 dark:text-gray-500',
        )}
      >
        {label}
      </Label>
    )

    // ── SELECT ────────────────────────────────────────────────────────────
    if (type === 'select') {
      return (
        <div className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}>
          {labelEl}

          <Select
            disabled={disabled}
            value={value as string | undefined}
            defaultValue={defaultValue as string | undefined}
            onValueChange={onValueChange}
          >
            <SelectTrigger
              id={inputId}
              aria-invalid={!!error}
              aria-describedby={errorId}
              className={cn(
                baseInput,
                'focus:border-[#2563EB] focus:ring-[#2563EB]/20',
                error && errorInput,
                className,
              )}
            >
              <SelectValue placeholder={placeholder ?? 'Select...'} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <ErrorMessage id={errorId!} message={error} />}
        </div>
      )
    }

    // ── PASSWORD ──────────────────────────────────────────────────────────
    if (type === 'password') {
      const Toggle = (
        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((v) => !v)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      )

      return (
        <div className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}>
          {labelEl}
          <InputWithTrailing trailing={Toggle}>
            <Input
              ref={ref}
              id={inputId}
              type={showPassword ? 'text' : 'password'}
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              aria-invalid={!!error}
              aria-describedby={errorId}
              className={cn(
                baseInput,
                'pr-10',
                readOnly && readOnlyInput,
                error && errorInput,
                className,
              )}
              {...rest}
            />
          </InputWithTrailing>
          {error && <ErrorMessage id={errorId!} message={error} />}
        </div>
      )
    }

    // ── DATE ──────────────────────────────────────────────────────────────
    if (type === 'date') {
      return (
        <div className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}>
          {labelEl}
          <InputWithTrailing
            trailing={
              <Calendar
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            }
          >
            <Input
              ref={ref}
              id={inputId}
              type="date"
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              aria-invalid={!!error}
              aria-describedby={errorId}
              className={cn(
                baseInput,
                'pr-10',
                readOnly && readOnlyInput,
                error && errorInput,
                className,
              )}
              {...rest}
            />
          </InputWithTrailing>
          {error && <ErrorMessage id={errorId!} message={error} />}
        </div>
      )
    }

    // ── TIME ──────────────────────────────────────────────────────────────
    if (type === 'time') {
      return (
        <div className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}>
          {labelEl}
          <InputWithTrailing
            trailing={
              <Clock
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            }
          >
            <Input
              ref={ref}
              id={inputId}
              type="time"
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              aria-invalid={!!error}
              aria-describedby={errorId}
              className={cn(
                baseInput,
                'pr-10',
                readOnly && readOnlyInput,
                error && errorInput,
                className,
              )}
              {...rest}
            />
          </InputWithTrailing>
          {error && <ErrorMessage id={errorId!} message={error} />}
        </div>
      )
    }

    // ── TEXT / NUMBER / EMAIL / TEL / URL / SEARCH (and any other native type)
    return (
      <div className={cn(styles.root, 'flex flex-col gap-1', containerClassName)}>
        {labelEl}
        <Input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            baseInput,
            readOnly && readOnlyInput,
            error && errorInput,
            className,
          )}
          {...rest}
        />
        {error && <ErrorMessage id={errorId!} message={error} />}
      </div>
    )
  },
)
InputField.displayName = 'InputField'

export default InputField
