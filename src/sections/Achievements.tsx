import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { achievements, type Achievement } from '../data/site'
import { useMedia } from '../hooks/useMedia'
import { Icon } from '../components/icons'
import { ArrowRight, Container, SectionHeading } from '../components/ui'

const heading = (
  <SectionHeading
    index="06"
    label="Achievements"
    lead="Proud"
    accent="moments."
    aside={<p className="text-[15px] text-ink-soft">Results from CMS programs and Job Ring, exactly as they appear on my resume.</p>}
  />
)

export function Achievements() {
  const reduce = useReducedMotion()
  const wide = useMedia('(min-width: 768px)', true)
  return wide && !reduce ? <PinnedTrack /> : <SwipeTrack />
}

/** Desktop: the section pins and scrolling down slides the cards sideways. */
function PinnedTrack() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const distMV = useMotionValue(0)

  useLayoutEffect(() => {
    const measure = () => {
      const t = trackRef.current
      if (!t) return
      const d = Math.max(0, t.scrollWidth - document.documentElement.clientWidth)
      setDist(d)
      distMV.set(d)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [distMV])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(() => -scrollYProgress.get() * distMV.get())

  return (
    <section id="achievements" ref={sectionRef} className="relative" style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden py-16 lg:gap-14">
        <Container>{heading}</Container>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-6 px-[max(24px,calc((100vw-1440px)/2+40px))] py-4"
        >
          {achievements.map((a, i) => (
            <Card key={a.title} a={a} i={i} />
          ))}
          <EndNote />
        </motion.div>

        <Container>
          <div className="flex items-center gap-5">
            <div className="relative h-px flex-1 bg-line">
              <motion.div className="absolute inset-0 origin-left bg-ink" style={{ scaleX: scrollYProgress }} />
            </div>
            <span className="eyebrow inline-flex items-center gap-2">
              Keep scrolling <ArrowRight className="size-3" />
            </span>
          </div>
        </Container>
      </div>
    </section>
  )
}

/** Phones (and reduced motion): a native swipeable row. */
function SwipeTrack() {
  return (
    <section id="achievements" className="relative py-[clamp(96px,13vw,170px)]">
      <Container>{heading}</Container>
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 pt-2 sm:scroll-px-6 sm:px-6">
        {achievements.map((a, i) => (
          <Card key={a.title} a={a} i={i} />
        ))}
        <EndNote />
      </div>
      <Container>
        <p className="eyebrow mt-2 inline-flex items-center gap-2">
          Swipe <ArrowRight className="size-3" />
        </p>
      </Container>
    </section>
  )
}

function Card({ a, i }: { a: Achievement; i: number }) {
  return (
    <article className="card-shadow relative flex h-[min(300px,46svh)] min-h-[260px] w-[min(84vw,440px)] shrink-0 snap-start flex-col justify-between rounded-[26px] border border-line bg-surface p-6 sm:p-7 lg:w-[460px]">
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl border border-line bg-paper shadow-[0_8px_20px_-14px_rgba(30,32,56,0.5)]">
          <Icon name={a.icon} className="size-7" stroke={1.5} />
        </span>
        <span className="eyebrow tabular text-[10.5px]">
          {String(i + 1).padStart(2, '0')} / {String(achievements.length).padStart(2, '0')}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0 pb-1">
          <div className="font-display text-[1.15rem] font-bold leading-tight tracking-[-0.025em] sm:text-[1.25rem]">{a.title}</div>
          <div className="eyebrow mt-1.5 text-[10px]">{a.source}</div>
          <div className="mt-2 text-[13px] leading-snug text-ink-soft">{a.detail}</div>
        </div>
        <div className="shrink-0 font-display text-[clamp(3.6rem,6.5vw,5.6rem)] font-bold leading-[0.8] tracking-[-0.065em]">
          <CountUp value={a.value} />
          <span className="text-ink/25">{a.suffix}</span>
        </div>
      </div>
    </article>
  )
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  const [n, setN] = useState(value)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular">
      {n}
    </span>
  )
}

function EndNote() {
  return (
    <div className="flex w-[260px] shrink-0 snap-start items-center gap-4 pr-6" aria-hidden>
      <span className="h-px w-16 bg-ink/40" />
      <span className="font-serif text-[2.4rem] italic leading-none text-ink/60">and counting.</span>
    </div>
  )
}
