import { useId } from 'react'

/** The Allay mark, the same drawing as public/favicon.svg. */
export function Logo({ className }: { className?: string }) {
  // Gradient ids must be unique on the page, and the same in the prerender and
  // the hydrated tree, which useId guarantees.
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fe1ff" />
          <stop offset="1" stopColor="#2a86f0" />
        </linearGradient>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6f8ff" />
          <stop offset="1" stopColor="#8fd0ff" />
        </linearGradient>
      </defs>
      <path d="M29 31C18 14 3 17 5 29c2 10 16 10 24 6Z" fill={`url(#${id}w)`} opacity=".92" />
      <path d="M35 31c11-17 26-14 24-2-2 10-16 10-24 6Z" fill={`url(#${id}w)`} opacity=".92" />
      <path d="M24 37h16l-3 15a3 3 0 0 1-3 2.4h-4A3 3 0 0 1 27 52Z" fill={`url(#${id}b)`} />
      <rect x="19" y="14" width="26" height="24" rx="9" fill={`url(#${id}b)`} />
      <rect x="25" y="23" width="4.5" height="7" rx="2" fill="#0b2a4a" />
      <rect x="34.5" y="23" width="4.5" height="7" rx="2" fill="#0b2a4a" />
      <path d="m53 3 2 5.2 5.2 2-5.2 2L53 17.4l-2-5.2-5.2-2 5.2-2Z" fill="#ffd25e" />
    </svg>
  )
}
