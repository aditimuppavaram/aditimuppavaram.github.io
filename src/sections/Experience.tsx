import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { timeline, type Milestone } from '../data/site'
import { Container, EASE, SectionHeading } from '../components/ui'

/** The "Education & experience." timeline: a centre line, big years, cards alternating sides. */
export function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="relative py-[clamp(96px,12vw,160px)]">
      <Container>
        <SectionHeading
          index="05"
          label="Experience"
          lead="Education &"
          accent="experience."
          aside={
            <p className="text-[15px] text-ink-soft">
              From biology to bioinformatics to three years on CMS programs at Tria Federal.
            </p>
          }
        />

        <div ref={listRef} className="relative mt-16 lg:mt-24">
          {/* the line: left on phones, centre on desktop */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line lg:left-1/2" aria-hidden />
          <motion.div
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-ink lg:left-1/2"
            style={{ scaleY: progress }}
            aria-hidden
          />

          <div className="flex flex-col gap-12 lg:gap-6">
            {timeline.map((m, i) => (
              <Row key={m.title} m={m} left={i % 2 === 0} showYear={i === 0 || timeline[i - 1].year !== m.year} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Row({ m, left, showYear }: { m: Milestone; left: boolean; showYear: boolean }) {
  const year = (
    <div className={`flex items-center ${left ? 'lg:justify-start' : 'lg:justify-end'}`}>
      {showYear && (
        <motion.span
          className="font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-extrabold leading-none tracking-[-0.06em] text-ink"
          initial={{ opacity: 0.3, x: left ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {m.year}
        </motion.span>
      )}
    </div>
  )

  const card = (
    <motion.article
      className="card-shadow rounded-[22px] border border-line bg-surface p-6 sm:p-7"
      initial={{ opacity: 0.35, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-md bg-chip px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{m.kind}</span>
        <span className="tabular font-mono text-[11px] text-ink-soft">{m.period}</span>
      </div>
      <h3 className="mt-5 font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-bold leading-[1.1] tracking-[-0.035em]">{m.title}</h3>
      <p className="mt-1.5 text-[14.5px] text-ink-soft">{m.org}</p>
      <div className="mt-5">
        {m.current ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-paper">
            <span className="live-dot size-1.5 rounded-full" aria-hidden /> {m.badge}
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-chip px-3.5 py-1.5 text-[12px] font-medium">{m.badge}</span>
        )}
      </div>
    </motion.article>
  )

  return (
    <div className="relative grid gap-4 pl-10 lg:grid-cols-2 lg:gap-x-20 lg:pl-0">
      {/* dot on the line */}
      <span
        className={`absolute left-0 top-3 size-[15px] rounded-full border-2 border-ink lg:left-1/2 lg:top-8 lg:-translate-x-1/2 ${
          m.current ? 'bg-ink' : 'bg-paper'
        }`}
        aria-hidden
      />
      {left ? (
        <>
          <div className="order-2 lg:order-1">{card}</div>
          <div className="order-1 lg:order-2 lg:pt-3">{year}</div>
        </>
      ) : (
        <>
          <div className="order-1 lg:pt-3">{year}</div>
          <div className="order-2">{card}</div>
        </>
      )}
    </div>
  )
}
