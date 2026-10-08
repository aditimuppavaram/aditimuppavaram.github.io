import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent, type RefObject } from 'react'
import { about, site } from '../data/site'
import { useMedia } from '../hooks/useMedia'

const CLIP = 34 // the metal clip sits this far above the card's top edge

/**
 * The lanyard ID card. A single strap hangs from the top of the About
 * section; drag the card anywhere in the section and the strap follows it,
 * let go and it swings back. Tap (or press Enter) to flip it.
 */
export function IdCard({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const slotRef = useRef<HTMLDivElement>(null)
  const wide = useMedia('(min-width: 1024px)')

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const swing = useMotionValue(0)
  const anchorX = useMotionValue(0)
  const anchorY = useMotionValue(0)
  const restTop = useMotionValue(0)
  const [ready, setReady] = useState(false)

  // The card leans along the strap, plus a little idle sway.
  const rotate = useTransform(() => {
    const dx = x.get()
    const dy = restTop.get() - CLIP - anchorY.get() + y.get()
    return ((-Math.atan2(dx, Math.max(40, dy)) * 180) / Math.PI) * 0.9 + swing.get()
  })
  const strap = useTransform(
    () => `M ${anchorX.get()} ${anchorY.get()} L ${anchorX.get() + x.get()} ${restTop.get() - CLIP + 6 + y.get()}`,
  )

  useLayoutEffect(() => {
    const measure = () => {
      const s = sectionRef.current?.getBoundingClientRect()
      const c = slotRef.current?.getBoundingClientRect()
      if (!s || !c) return
      // measure the resting slot, not the (possibly dragged) card
      const top = c.top - s.top
      anchorX.set(c.left - s.left + c.width / 2)
      restTop.set(top)
      // On wide screens the strap starts at the very top of the section.
      // On phones the card sits under the text, so it hangs from a short strap instead.
      anchorY.set(wide ? 0 : Math.max(0, top - CLIP - 110))
      setReady(true)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (sectionRef.current) ro.observe(sectionRef.current)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [sectionRef, wide, anchorX, anchorY, restTop])

  // Swing in when the section scrolls into view, then sway gently.
  const inView = useInView(slotRef, { once: true, amount: 0.3 })
  const dragging = useRef(false)
  useEffect(() => {
    if (!inView) return
    let idle: ReturnType<typeof animate> | undefined
    const intro = animate(swing, [0, -11, 8, -5, 3, -1.5, 0], { duration: 2.8, ease: 'easeOut' })
    intro.then(() => {
      if (!dragging.current) idle = animate(swing, [0, 1.6, -1.6, 0], { duration: 6, repeat: Infinity, ease: 'easeInOut' })
    })
    return () => {
      intro.stop()
      idle?.stop()
    }
  }, [inView, swing])

  const [flipped, setFlipped] = useState(false)
  const down = useRef({ x: 0, y: 0 })
  const onPointerDown = (e: PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY }
  }
  const onClick = (e: MouseEvent) => {
    if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) < 6) setFlipped((f) => !f)
  }

  return (
    <>
      <Strap d={strap} visible={ready} />

      <div className="relative flex flex-col items-center" style={{ paddingTop: wide ? 64 : 150 }}>
        <div ref={slotRef} className="relative w-[min(280px,76vw)]">
          <motion.div
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`ID card for ${site.name}. Drag it, or press to flip.`}
            onPointerDown={onPointerDown}
            onClick={onClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setFlipped((f) => !f)
              }
            }}
            drag
            dragConstraints={sectionRef}
            dragElastic={0.12}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 190, bounceDamping: 8 }}
            onDragStart={() => {
              dragging.current = true
              swing.stop()
              animate(swing, 0, { duration: 0.2 })
            }}
            onDragEnd={() => {
              dragging.current = false
            }}
            whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
            style={{ x, y, rotate, transformOrigin: `50% -${CLIP}px`, perspective: 1400 }}
            className="relative z-30 w-full cursor-grab touch-none select-none"
          >
            <Clip />
            <motion.div
              className="preserve-3d relative aspect-[5/8] w-full"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 110, damping: 15 }}
            >
              <CardFront />
              <CardBack />
            </motion.div>
          </motion.div>
        </div>
        <p className="eyebrow mt-6 text-center text-[10px]">Drag the card · tap to flip</p>
      </div>
    </>
  )
}

/** The strap is drawn across the whole section, so it follows the card anywhere. */
function Strap({ d, visible }: { d: MotionValue<string>; visible: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <motion.path id="lanyard-strap" d={d} fill="none" strokeWidth="18" strokeLinecap="butt" style={{ stroke: 'var(--ink)' }} />
      <text fontSize="7.5" letterSpacing="2.4" dominantBaseline="middle" className="font-mono uppercase" style={{ fill: 'var(--paper)', opacity: 0.75 }}>
        <textPath href="#lanyard-strap" startOffset="8%">
          {`${site.first} · analyst · ${site.first} · analyst · ${site.first} · analyst · ${site.first} · analyst`}
        </textPath>
      </text>
    </svg>
  )
}

function Clip() {
  return (
    <div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ top: -CLIP }} aria-hidden>
      <div className="relative h-[40px] w-[30px] rounded-[9px] border border-black/10 bg-clip shadow-[0_4px_10px_-4px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-x-[7px] top-[6px] h-[8px] rounded-full bg-black/15" />
        <div className="absolute inset-x-[9px] bottom-[5px] h-[5px] rounded-full bg-black/25" />
      </div>
    </div>
  )
}

function CardFront() {
  const fields = [
    { k: 'ID no', v: about.card.idNo },
    { k: 'Dept', v: about.card.dept },
    { k: 'Since', v: about.card.since },
  ]
  return (
    <div className="backface-hidden absolute inset-0 flex flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white text-[#1e2038] shadow-[0_30px_60px_-30px_rgba(20,22,40,0.55)]">
      <div className="flex items-center gap-3 bg-[#1e2038] px-4 py-3.5 text-white">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white font-display text-[12px] font-bold text-[#1e2038]">
          {site.monogram}
        </span>
        <div className="min-w-0 leading-tight">
          <div className="font-display text-[13px] font-bold uppercase tracking-[0.14em]">{about.card.title}</div>
          <div className="mt-0.5 text-[10px] opacity-70">{about.card.sub}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-5 pt-5">
        <div className="grid aspect-[4/5] w-[52%] place-items-center overflow-hidden rounded-[14px] border-2 border-[#1e2038] bg-[#ebe9e2]">
          {site.photo ? (
            <img src={site.photo} alt="" className="h-full w-full object-cover" draggable={false} />
          ) : (
            <span className="font-serif text-[3.4rem] italic leading-none text-[#1e2038]">{site.monogram}</span>
          )}
        </div>
        <div className="mt-4 text-center font-display text-[16px] font-bold uppercase leading-[1.1] tracking-[0.02em]">
          Aditi Anand
          <br />
          Muppavaram
        </div>
        <div className="mt-1 text-[11px] text-[#6a6b7e]">{site.role}</div>

        <dl className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
          {fields.map((f) => (
            <div key={f.k} className="min-w-0">
              <dt className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#6a6b7e]">{f.k}</dt>
              <dd className="mt-0.5 truncate text-[11.5px] font-semibold">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex w-full items-end justify-between pb-4 pt-3">
          <Barcode seed={about.card.idNo + site.name} />
          <span
            className="size-9 rounded-full border border-black/10"
            style={{ background: 'conic-gradient(from 40deg, #d9d3ff, #c9f1e8, #f7e6b9, #f6c9de, #d9d3ff)' }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}

function CardBack() {
  const rows = [
    { k: 'Email', v: site.email },
    { k: 'LinkedIn', v: site.linkedinLabel },
    { k: 'Based in', v: site.location },
  ]
  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-[20px] bg-[#1e2038] p-6 text-white shadow-[0_30px_60px_-30px_rgba(20,22,40,0.55)]"
      style={{ transform: 'rotateY(180deg)' }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">If found, please return to</div>
      <div className="mt-3 font-display text-[1.6rem] font-bold leading-[1.05] tracking-[-0.03em]">{site.name}</div>
      <dl className="mt-6 flex flex-col">
        {rows.map((r) => (
          <div key={r.k} className="border-t border-white/15 py-2.5">
            <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-60">{r.k}</dt>
            <dd className="mt-0.5 text-[13px] [overflow-wrap:anywhere]">{r.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px]">
          <span className="live-dot size-1.5 rounded-full" aria-hidden />
          {site.openTo}
        </span>
        <div className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-50">Tap to flip back</div>
      </div>
    </div>
  )
}

function Barcode({ seed }: { seed: string }) {
  const bars = useMemo(() => {
    const out: { x: number; w: number }[] = []
    let x = 0
    for (let i = 0; i < seed.length && x < 96; i++) {
      const c = seed.charCodeAt(i)
      const w = 1 + (c % 3)
      out.push({ x, w })
      x += w + 1 + ((c >> 2) % 3)
    }
    return out
  }, [seed])
  return (
    <svg viewBox="0 0 100 26" className="h-[26px] w-[100px] shrink-0" aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="26" fill="#1e2038" />
      ))}
    </svg>
  )
}
