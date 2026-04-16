interface ComponentHeaderProps {
  /** Full story title e.g. "Components/Button" — last segment is used as the display name */
  title: string
}

/**
 * ComponentHeader
 *
 * Dark-navy branded header that appears at the top of every component's
 * Storybook page. Extracts the component name from the story title path.
 *
 * Design: LYRA label (blue, uppercase) + component name (white, bold) +
 * decorative quote mark (top-right corner).
 */
export function ComponentHeader({ title }: ComponentHeaderProps) {
  // "Components/Button" → "Button"
  const componentName = title.split('/').pop() ?? title

  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-[#1C2B3A] px-6 py-5">
      {/* Brand label */}
      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4DA3E4]">
        LYRA
      </span>

      {/* Component name */}
      <h1 className="mt-1 text-[1.75rem] font-bold leading-tight text-white">
        {componentName}
      </h1>

      {/* Decorative quote mark — top-right */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-3 select-none font-serif text-[2.5rem] leading-none text-white/20"
      >
        "
      </span>
    </div>
  )
}
