import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { useScrollTo } from '../lib/scroll'
import { ResumeLink } from '../components/ResumeLink'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Container, Copy, Reveal, SectionHeading } from '../components/ui'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const emailRef = useRef<HTMLSpanElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked: select the address so it can be copied by hand.
      const el = emailRef.current
      if (!el) return
      const range = document.createRange()
      range.selectNodeContents(el)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }

  return (
    <section id="contact" className="relative py-[clamp(96px,13vw,170px)]">
      <Container>
        <SectionHeading
          index="07"
          label="Contact"
          lead="Let's"
          accent="talk."
          sub="I'm open to Business Analyst, Data Analyst and Product Analyst roles. Email is the fastest way to reach me."
        />

        <Reveal className="mt-14 lg:mt-20">
          <div className="rounded-[32px] border border-line bg-surface p-6 sm:p-10 lg:p-14">
            <div className="eyebrow">Email</div>
            <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <span
                ref={emailRef}
                className="select-all font-display text-[clamp(1.45rem,5.2vw,4.4rem)] font-bold leading-none tracking-[-0.05em] [overflow-wrap:anywhere]"
              >
                {site.email}
              </span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-12 w-fit shrink-0 items-center gap-2.5 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                {copied ? <Check /> : <Copy />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-paper px-5 py-5 transition-colors hover:bg-wash"
              >
                <span>
                  <span className="eyebrow block text-[10px]">LinkedIn</span>
                  <span className="mt-1 block text-[15px] font-medium [overflow-wrap:anywhere]">{site.linkedinLabel}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <ResumeLink className="group flex items-center justify-between gap-3 bg-paper px-5 py-5 transition-colors hover:bg-wash">
                <span>
                  <span className="eyebrow block text-[10px]">Résumé</span>
                  <span className="mt-1 block text-[15px] font-medium">Download PDF</span>
                </span>
                <ArrowDown className="size-4 shrink-0 transition-transform group-hover:translate-y-0.5" />
              </ResumeLink>
              <Link
                to="/resume"
                className="group flex items-center justify-between gap-3 bg-paper px-5 py-5 transition-colors hover:bg-wash"
              >
                <span>
                  <span className="eyebrow block text-[10px]">Web résumé</span>
                  <span className="mt-1 block text-[15px] font-medium">Read it here</span>
                </span>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <div className="flex items-center justify-between gap-3 bg-paper px-5 py-5">
                <span>
                  <span className="eyebrow block text-[10px]">Based in</span>
                  <span className="mt-1 block text-[15px] font-medium">{site.location}</span>
                </span>
                <span className="live-dot size-2.5 shrink-0 rounded-full" aria-hidden />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function Footer() {
  const scrollTo = useScrollTo()
  return (
    <footer className="relative overflow-hidden border-t border-line pt-10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 28px)' }}>
      <Container>
        <div className="flex flex-col gap-4 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="flex items-center gap-5">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              LinkedIn
            </a>
            <Link to="/resume" className="transition-colors hover:text-ink">
              Resume
            </Link>
            <button type="button" onClick={() => scrollTo('top')} className="transition-colors hover:text-ink">
              Back to top ↑
            </button>
          </span>
        </div>
      </Container>
      <motion.div
        aria-hidden
        className="watermark pointer-events-none mt-8 select-none whitespace-nowrap text-center font-display text-[15.2vw] font-extrabold leading-[0.78] tracking-[-0.07em]"
        initial={{ y: '30%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {site.shortName.split(' ')[1] ?? site.first}
      </motion.div>
    </footer>
  )
}
