import { useRef } from 'react'
import { about, site } from '../data/site'
import { IdCard } from '../components/IdCard'
import { ResumeLink } from '../components/ResumeLink'
import { Accent, ArrowDown, ArrowUpRight, Container, Eyebrow, Reveal } from '../components/ui'

/** About: the hanging ID card on the left, "Hi, I'm …" in the middle, quick facts on the right. */
export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={sectionRef} className="relative py-[clamp(96px,11vw,150px)]">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.08fr)_minmax(0,0.98fr)] lg:gap-10 xl:gap-14">
          {/* hello (first on phones; the middle column on wide screens) */}
          <div className="relative z-10 min-w-0 lg:pt-24">
            <Eyebrow index="01" label="About" />
            <Reveal>
              <h2 className="mt-5 font-display text-[clamp(2.8rem,5.4vw,4.9rem)] font-bold leading-[0.95] tracking-[-0.05em]">
                Hi, I&rsquo;m <Accent>{about.hello}</Accent>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-7 text-[clamp(1.08rem,1.45vw,1.28rem)] leading-[1.55] text-ink/80">{about.lead}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15.5px] text-ink-soft">{about.more}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ResumeLink className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper shadow-[0_12px_30px_-12px_rgba(30,32,56,0.6)] transition-transform hover:-translate-y-0.5">
                  Résumé <ArrowDown className="size-4" />
                </ResumeLink>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-1.5 rounded-full border border-line bg-surface/70 px-6 text-sm font-medium transition-colors hover:border-ink"
                >
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* the lanyard card: left column on wide screens (its strap is drawn across the whole section) */}
          <div className="min-w-0 lg:order-first">
            <IdCard sectionRef={sectionRef} />
          </div>

          {/* right: quick facts */}
          <div className="relative z-10 min-w-0 lg:pt-24">
            <div className="eyebrow">Quick facts</div>
            <dl className="mt-4">
              {about.facts.map((f, i) => (
                <Reveal key={f.k} delay={0.05 * i} y={12}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                    <dt className="shrink-0 text-[14px] text-ink-soft">{f.k}</dt>
                    <dd className="text-right text-[14.5px] font-medium">{f.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.2}>
              <p className="mt-8 font-serif text-[clamp(1.6rem,2.3vw,2.1rem)] italic leading-[1.15] text-ink/70">
                &ldquo;{about.quote}&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
