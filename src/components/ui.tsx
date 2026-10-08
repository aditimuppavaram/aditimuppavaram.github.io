import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Gentle rise-in when a block scrolls into view. Starts visible (never at opacity 0). */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.35, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** "02 —— SKILLS" eyebrow + bold sans headline with an italic serif tail. */
export function SectionHeading({
  index,
  label,
  lead,
  accent,
  sub,
  aside,
  stack = false,
}: {
  index: string
  label: string
  lead: string
  accent: string
  sub?: ReactNode
  aside?: ReactNode
  /** put the italic part on its own line ("Always / learning.") */
  stack?: boolean
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <Eyebrow index={index} label={label} />
        <Reveal>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.05em]">
            {lead}
            {stack ? <br /> : ' '}
            <Accent>{accent}</Accent>
          </h2>
        </Reveal>
        {sub && <p className="mt-5 max-w-[52ch] text-base text-ink-soft sm:text-lg">{sub}</p>}
      </div>
      {aside && <div className="min-w-0 lg:max-w-[34ch] lg:pb-3">{aside}</div>}
    </div>
  )
}

export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="eyebrow flex items-center gap-3">
      <span className="tabular">{index}</span>
      <span className="h-px w-10 bg-ink-soft/40" aria-hidden />
      <span>{label}</span>
    </div>
  )
}

/** The Instrument Serif italic tail used in every heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic tracking-[-0.01em] text-ink/70">{children}</em>
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>
}

/* ---------------------------------------------------------------- icons -- */

type IconProps = { className?: string }

export const ArrowRight = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowDown = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const ArrowLeft = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const Plus = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Sun = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const Moon = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
)

export const Copy = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
)

export const Check = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="m5 12 5 5 9-10" />
  </svg>
)

export const Sound = ({ on, className = 'size-4' }: IconProps & { on: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
    {on ? <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /> : <path d="m17 9 5 6M22 9l-5 6" />}
  </svg>
)
