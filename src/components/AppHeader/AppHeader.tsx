import * as React from 'react'
import { Bell, Settings, HelpCircle, Search, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AppHeaderProps {
  /** Application / product name */
  appName?: string
  /** Current page title shown as breadcrumb */
  pageTitle?: string
  /** User initials shown in the avatar */
  userInitials?: string
  /** Full user display name (tooltip / aria-label) */
  userName?: string
  /** Unread notification count */
  notificationCount?: number
  /** Called when notification bell is clicked */
  onNotificationsClick?: () => void
  /** Called when settings icon is clicked */
  onSettingsClick?: () => void
  /** Called when avatar is clicked */
  onAvatarClick?: () => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AppHeader
 *
 * Top application bar for the NICE CXone shell.
 * Dark inverse-surface background with white icons and text.
 * Height: `--lyra-bar-md` (48 px).
 */
const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    {
      appName = 'NICE CXone',
      pageTitle,
      userInitials = 'AG',
      userName = 'Ahana Ganguly',
      notificationCount = 3,
      onNotificationsClick,
      onSettingsClick,
      onAvatarClick,
      className,
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          'flex h-bar-md shrink-0 items-center justify-between px-4',
          '!bg-[var(--lyra-color-bg-surface-inverse)]',
          'border-b !border-white/10',
          className,
        )}
      >
        {/* ── Left: logo + app name ─────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Grid / app-switcher icon */}
          <button
            type="button"
            aria-label="App switcher"
            className="flex h-7 w-7 items-center justify-center rounded !text-[rgba(255,255,255,0.6)] hover:!text-white hover:!bg-white/10 transition-colors"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>

          {/* NICE logo mark */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded !bg-[var(--lyra-color-bg-primary)]">
              <span className="text-[10px] font-bold !text-white leading-none tracking-wide select-none">N</span>
            </div>
            <span className="text-sm font-semibold !text-[var(--lyra-color-fg-inverse)] tracking-wide select-none">
              {appName}
            </span>
          </div>

          {/* Divider + page title */}
          {pageTitle && (
            <>
              <span className="h-4 w-px !bg-white/20" aria-hidden />
              <span className="text-sm !text-[rgba(255,255,255,0.7)] select-none">
                {pageTitle}
              </span>
            </>
          )}
        </div>

        {/* ── Right: action icons + avatar ─────────────────────────────── */}
        <div className="flex items-center gap-0.5">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="flex h-8 w-8 items-center justify-center rounded !text-[rgba(255,255,255,0.6)] hover:!text-white hover:!bg-white/10 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label={`Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`}
            onClick={onNotificationsClick}
            className="relative flex h-8 w-8 items-center justify-center rounded !text-[rgba(255,255,255,0.6)] hover:!text-white hover:!bg-white/10 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {!!notificationCount && (
              <span
                className="absolute right-1 top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full !bg-[var(--lyra-color-status-critical-strong)] px-[3px] text-[9px] font-bold !text-white leading-none"
                aria-hidden
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* Help */}
          <button
            type="button"
            aria-label="Help"
            className="flex h-8 w-8 items-center justify-center rounded !text-[rgba(255,255,255,0.6)] hover:!text-white hover:!bg-white/10 transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Settings */}
          <button
            type="button"
            aria-label="Settings"
            onClick={onSettingsClick}
            className="flex h-8 w-8 items-center justify-center rounded !text-[rgba(255,255,255,0.6)] hover:!text-white hover:!bg-white/10 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* User avatar */}
          <button
            type="button"
            aria-label={userName}
            onClick={onAvatarClick}
            className="ml-2 flex h-7 w-7 items-center justify-center rounded-full !bg-[var(--lyra-color-bg-active-moderate)] !text-[var(--lyra-color-fg-inverse)] text-[11px] font-semibold select-none hover:opacity-85 transition-opacity"
          >
            {userInitials}
          </button>
        </div>
      </header>
    )
  },
)
AppHeader.displayName = 'AppHeader'

export { AppHeader }
export default AppHeader
