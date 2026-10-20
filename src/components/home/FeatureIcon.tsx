import type { IconName } from '../../i18n/types.ts'

// One line drawing per feature, on a 24-unit grid in the current text color.
const paths: Record<IconName, string> = {
  eye: 'M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z M15.3 15.3 20 20',
  trail: 'M5 19c3-1 3-5 6-6s4 1 6-1 1-5 3-6 M4 19.5h.01 M8.5 15h.01 M13 12.6h.01 M17.6 11.4h.01',
  agent:
    'M12 3v2.5 M6.5 8h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z M9.5 12.5v1 M14.5 12.5v1 M2.5 12v3 M21.5 12v3',
  grid: 'M4 4h6v6H4Z M14 4h6v6h-6Z M4 14h6v6H4Z M14 14h6v6h-6Z',
  window: 'M3.5 5.5h17v13h-17Z M3.5 9h17 M9 9v9.5',
  redstone: 'M12 3.5v4 M12 16.5v4 M3.5 12h4 M16.5 12h4 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  note: 'M6 3.5h9l3.5 3.5v13.5H6Z M14.5 3.5V7.5h4 M9 12h6.5 M9 15.5h6.5',
  globe:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M3 12h18 M12 3c2.6 2.6 3.6 5.6 3.6 9s-1 6.4-3.6 9c-2.6-2.6-3.6-5.6-3.6-9S9.4 5.6 12 3Z',
  brain:
    'M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.3A3 3 0 0 0 7 18a3 3 0 0 0 5 1V5.7A3 3 0 0 0 9 4.5Z M15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.3A3 3 0 0 1 17 18a3 3 0 0 1-5 1',
  shield: 'M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6Z M9 12l2.2 2.2L15.5 10',
  calc: 'M6 3.5h12v17H6Z M8.5 6.5h7v3h-7Z M9 13h.01 M12 13h.01 M15 13h.01 M9 16.5h.01 M12 16.5h.01 M15 16.5h.01',
}

export function FeatureIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
