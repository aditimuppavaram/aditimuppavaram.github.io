import { AnimatePresence, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { elements, families, type Element, type FamilyId } from '../data/site'
import { FamilyIcon } from '../components/icons'
import { useMedia } from '../hooks/useMedia'
import { Container, EASE, SectionHeading } from '../components/ui'

const familyLabel = Object.fromEntries(families.map((f) => [f.id, f.label])) as Record<FamilyId, string>
const COLS = 8

export function Skills() {
  const [family, setFamily] = useState<FamilyId | null>(null)
  const [focus, setFocus] = useState<Element | null>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const inView = useInView(tableRef, { once: true, amount: 0.2 })
  const [waveDone, setWaveDone] = useState(false)
  const hover = useMedia('(hover: hover)', true)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setWaveDone(true), 2000)
    return () => clearTimeout(t)
  }, [inView])

  const pick = (id: FamilyId) => {
    const next = family === id ? null : id
    setFamily(next)
    if (next) setFocus(elements.find((e) => e.family === next) ?? null)
  }

  return (
    <section id="skills" className="relative py-[clamp(96px,12vw,160px)]">
      <Container>
        <SectionHeading
          index="02"
          label="Skills"
          lead="The periodic table"
          accent="of my stack."
          sub={`${elements.length} elements in six families. ${hover ? 'Hover' : 'Tap'} a tile to see what it is, or pick a family to light it up.`}
        />

        <div className="mt-9 flex flex-wrap gap-2.5" role="group" aria-label="Light up a family">
          {families.map((f) => {
            const on = family === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => pick(f.id)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  on ? 'bg-ink text-paper' : 'bg-chip text-ink hover:bg-line'
                }`}
              >
                <span
                  className="size-3 rounded-[3px] border border-black/10"
                  style={{ background: f.id === 'ops' ? 'var(--fam-ops-swatch)' : `var(--fam-${f.id})` }}
                  aria-hidden
                />
                {f.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(250px,300px)] lg:gap-10 xl:gap-14">
          <div ref={tableRef} className="grid grid-cols-5 gap-1.5 min-[520px]:grid-cols-8 sm:gap-2.5">
            {elements.map((el, i) => (
              <Tile
                key={el.sym}
                el={el}
                lit={inView}
                delay={waveDone ? 0 : ((i % COLS) + Math.floor(i / COLS)) * 0.05}
                dim={family !== null && el.family !== family}
                active={focus?.sym === el.sym}
                onFocus={() => setFocus(el)}
              />
            ))}
          </div>
          <Inspector el={focus} hover={hover} />
        </div>
      </Container>
    </section>
  )
}

function Tile({
  el,
  lit,
  delay,
  dim,
  active,
  onFocus,
}: {
  el: Element
  lit: boolean
  delay: number
  dim: boolean
  active: boolean
  onFocus: () => void
}) {
  const style: CSSProperties = {
    background: lit ? `var(--fam-${el.family})` : 'var(--wash)',
    color: lit ? `var(--fam-${el.family}-fg)` : 'var(--ink-soft)',
    transitionDelay: `${delay}s`,
  }
  return (
    <motion.button
      type="button"
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onClick={onFocus}
      aria-label={`${el.name} (${familyLabel[el.family]})`}
      aria-pressed={active}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={style}
      className={`relative aspect-square min-w-0 rounded-[12px] text-left transition-[background-color,color,opacity,box-shadow] duration-500 sm:rounded-[14px] ${
        dim ? 'opacity-[0.18]' : 'opacity-100'
      } ${active ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper' : ''} ${
        el.family === 'ops' ? 'hover:bg-wash!' : ''
      }`}
    >
      <span className="tabular absolute left-2 top-1.5 font-mono text-[9px] opacity-70 sm:left-2.5 sm:top-2 sm:text-[10px]">
        {String(el.n).padStart(2, '0')}
      </span>
      <span className="absolute left-2 top-[34%] font-display text-[clamp(1.05rem,2.3vw,1.95rem)] font-bold leading-none tracking-[-0.04em] sm:left-2.5">
        {el.sym}
      </span>
      <span className="absolute inset-x-2 bottom-1.5 hidden truncate text-[9.5px] opacity-80 sm:block sm:inset-x-2.5 sm:bottom-2 lg:text-[10.5px]">
        {el.name}
      </span>
    </motion.button>
  )
}

/**
 * What the picked tile is. On phones it's a glass pane that sticks under the header,
 * so it stays in view while you scroll the table beneath it.
 */
function Inspector({ el, hover }: { el: Element | null; hover: boolean }) {
  return (
    <div
      className="glass sticky top-[calc(env(safe-area-inset-top,0px)+72px)] z-20 order-first flex min-h-[88px] items-center rounded-[26px] p-3.5 sm:p-5 lg:relative lg:top-auto lg:order-none lg:min-h-[340px] lg:justify-center lg:p-7"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {el ? (
          <motion.div
            key={el.sym}
            className="flex w-full items-center gap-4 sm:gap-5 lg:flex-col lg:text-center"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div
              className="grid size-14 shrink-0 place-items-center rounded-[18px] sm:size-20 sm:rounded-[22px] lg:size-28 lg:rounded-[28px]"
              style={{
                background: el.family === 'ops' ? 'var(--chip)' : `var(--fam-${el.family})`,
                color: `var(--fam-${el.family}-fg)`,
              }}
            >
              <FamilyIcon family={el.family} className="size-8 sm:size-10 lg:size-14" stroke={1.4} />
            </div>
            <div className="min-w-0">
              <div className="font-display text-[1.2rem] font-bold leading-tight tracking-[-0.03em] sm:text-[1.45rem] lg:text-[1.75rem]">{el.name}</div>
              <div className="eyebrow mt-1 text-[10px] sm:mt-1.5">{familyLabel[el.family]}</div>
              <p className="mt-1.5 text-[13px] leading-snug text-ink-soft sm:mt-3 sm:text-[13.5px] lg:mx-auto lg:max-w-[30ch]">{el.note}</p>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            className="w-full text-center text-sm text-ink-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {hover ? 'Hover' : 'Tap'} any element to see what it is.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
