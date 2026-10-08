import type { ReactElement } from 'react'
import type { FamilyId, IconName } from '../data/site'

/** Plain line icons drawn for this site (no brand logos). */
const paths: Record<string, ReactElement> = {
  code: <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 5l-3 14" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6M5 12v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-6" />
    </>
  ),
  chart: <path d="M4 20h16M7 16.5v-5M12 16.5V7M17 16.5v-7.5" />,
  nodes: (
    <>
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <circle cx="12" cy="17.5" r="2.2" />
      <path d="M7.2 9 10.9 15.6M16.8 9l-3.7 6.6M8.2 7h7.6" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 15h5M10 18h3" />
    </>
  ),
  kanban: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M9.5 4v16M15 4v16M5.6 8h2M11.3 8h2M11.3 11h2M16.9 8h2" />
    </>
  ),
  report: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 16v-3M12 16V9M15 16v-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  hourglass: <path d="M7 3h10M7 21h10M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9" />,
  shield: (
    <>
      <path d="M12 3 19 6v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 3M16 6h3a3 3 0 0 1-3 3M12 13v4M9 20h6M10 17h4" />,
  bug: (
    <>
      <rect x="8" y="7" width="8" height="12" rx="4" />
      <path d="M12 7V5M9.6 5.6 8 4M14.4 5.6 16 4M8 11H4.5M8 15H4.5M16 11h3.5M16 15h3.5M12 11v8" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.6 14.2A4.6 4.6 0 0 1 21 18.6" />
    </>
  ),
}

const familyIcon: Record<FamilyId, string> = {
  lang: 'code',
  db: 'database',
  bi: 'chart',
  ml: 'nodes',
  prod: 'document',
  ops: 'kanban',
}

export function Icon({ name, className = 'size-6', stroke = 1.6 }: { name: IconName | string; className?: string; stroke?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.chart}
    </svg>
  )
}

export function FamilyIcon({ family, className, stroke }: { family: FamilyId; className?: string; stroke?: number }) {
  return <Icon name={familyIcon[family]} className={className} stroke={stroke} />
}
