import { motion } from 'motion/react'
import { learning } from '../data/site'
import { Accent, Container, EASE, Eyebrow, Reveal } from '../components/ui'

/** The "Always learning." list: her coursework. */
export function Learning() {
  return (
    <section id="learning" className="relative py-[clamp(96px,12vw,160px)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow index="04" label="Coursework" />
            <Reveal>
              <h2 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.05em]">
                Always
                <br />
                <Accent>learning.</Accent>
              </h2>
            </Reveal>
            <p className="mt-6 max-w-[34ch] text-base text-ink-soft sm:text-lg">{learning.sub}</p>
          </div>

          <ol className="flex min-w-0 flex-col gap-1.5">
            {learning.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0.35, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.04 * i }}
                className="group grid cursor-default grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-6 sm:py-5"
              >
                  <span className="tabular font-mono text-[11px] text-ink-soft transition-colors group-hover:text-paper/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[clamp(1.15rem,2vw,1.55rem)] font-semibold leading-tight tracking-[-0.025em]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[13px] text-ink-soft transition-colors group-hover:text-paper/70">{item.from}</span>
                  </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
