import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Fragment, useRef } from 'react'
import { site } from '../data/site'
import { useMedia } from '../hooks/useMedia'
import { useScrollTo } from '../lib/scroll'
import { ResumeLink } from '../components/ResumeLink'
import { HeroMedia } from '../components/HeroMedia'
import { ArrowDown, ArrowRight, EASE } from '../components/ui'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const wmY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const wmFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const figY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  // Phones and tablets skip the scroll-linked drift and the blur-in: native scrolling stays
  // smooth when the page isn't moving things on every frame.
  const touch = useMedia('(pointer: coarse)')

  // Full name on two lines: "ADITI ANAND" over "MUPPAVARAM", each stretched edge to edge.
  const words = site.name.toUpperCase().split(' ')
  const nameLines = [words.slice(0, -1).join(' '), words[words.length - 1]]

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex flex-col overflow-hidden lg:block"
      style={{ minHeight: 'min(100svh, 1000px)' }}
    >
      {/* the faded full name behind the figure */}
      <motion.div
        style={touch ? undefined : { y: wmY, opacity: wmFade }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[92px] -z-10 mx-auto select-none px-3 sm:top-[100px] sm:px-5 lg:top-[10%] lg:px-[2.2vw] min-[2000px]:max-w-[1900px]"
      >
        <motion.div
          className="watermark"
          initial={touch ? { opacity: 0, y: 24 } : { opacity: 0, y: 24, filter: 'blur(14px)' }}
          animate={touch ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
        >
          <svg viewBox="0 0 1000 292" className="block h-auto w-full overflow-visible font-display font-extrabold">
            {nameLines.map((line, i) => (
              <motion.text
                key={line}
                x="0"
                y={i === 0 ? 128 : 272}
                fontSize="150"
                textLength="1000"
                lengthAdjust="spacing"
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.2 + i * 0.25 }}
              >
                {line}
              </motion.text>
            ))}
          </svg>
        </motion.div>
      </motion.div>

      {/* figure: her cut-out photo, with the chat bubble */}
      <motion.div
        style={touch ? undefined : { y: figY }}
        className="relative z-0 mx-auto mt-[112px] flex h-[min(56svh,500px)] w-full justify-center sm:mt-[128px] lg:absolute lg:bottom-0 lg:left-[57%] lg:mt-0 lg:h-[min(86svh,880px)] lg:w-auto lg:-translate-x-1/2"
      >
        <motion.div
          className="h-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
        >
          <HeroMedia />
        </motion.div>
      </motion.div>

      {/* bottom-left: name, title, tagline */}
      <motion.div
        style={touch ? undefined : { y: textY, opacity: fade }}
        className="relative z-20 px-4 pt-6 sm:px-6 lg:absolute lg:bottom-[clamp(36px,8vh,84px)] lg:left-[max(40px,calc((100vw-1440px)/2+40px))] lg:px-0 lg:pt-0"
      >
        <motion.div
          className="eyebrow flex items-center gap-3"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          {site.name}
        </motion.div>
        <h1 className="mt-4 font-display text-[clamp(3.1rem,7.2vw,7.4rem)] font-bold leading-[0.9] tracking-[-0.055em] text-ink lg:text-[clamp(3.1rem,min(7.2vw,11.5vh),7.4rem)]">
          {site.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.07em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.1 }}
              >
                {line}
                {i === site.headline.length - 1 && (
                  <span
                    className="ml-[0.06em] inline-block size-[0.13em] translate-y-[-0.02em] rounded-full align-baseline"
                    style={{ background: 'var(--accent-dot)' }}
                    aria-hidden
                  />
                )}
              </motion.span>
            </span>
          ))}
        </h1>
        <SpokenIntro text={site.intro} soft={!touch} />
      </motion.div>

      {/* bottom-right: actions */}
      <motion.div
        style={touch ? undefined : { opacity: fade }}
        className="relative z-20 flex flex-wrap items-center gap-3 px-4 pb-12 pt-8 sm:px-6 lg:absolute lg:bottom-[clamp(36px,8vh,84px)] lg:right-[max(40px,calc((100vw-1440px)/2+40px))] lg:flex-col lg:items-end lg:p-0 wideshort:flex-row wideshort:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
      >
        <button
          type="button"
          onClick={() => scrollTo('work')}
          className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-sm font-medium text-paper shadow-[0_12px_30px_-12px_rgba(30,32,56,0.6)] transition-transform hover:-translate-y-0.5"
        >
          Explore work <ArrowRight className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="glass glass-press inline-flex h-10 items-center rounded-full px-5 text-sm font-medium"
          >
            Let&rsquo;s talk
          </button>
          <ResumeLink className="glass glass-press inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-medium">
            Resume <ArrowDown className="size-3.5" />
          </ResumeLink>
        </div>
      </motion.div>

      <RotatingBadge onClick={() => scrollTo('contact')} />
    </section>
  )
}

/**
 * Her intro line. It shows faint and soft first, then each word clears in turn,
 * as if she's saying it. (On phones the words just fade in: blurring 30 words at
 * once is heavy for a phone right when people start scrolling.)
 */
function SpokenIntro({ text, soft }: { text: string; soft: boolean }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    // on wide screens it stops short of her figure (which is centred at 57% and ~0.36x as wide as tall)
    <p className="mt-5 max-w-[38rem] text-[15.5px] leading-[1.6] text-ink/80 sm:text-[16.5px] lg:max-w-[min(38rem,calc(57vw-min(15.3svh,157px)-max(64px,calc((100vw-1440px)/2+64px))))]">
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden
            className="inline-block"
            initial={reduce ? false : soft ? { opacity: 0.14, filter: 'blur(5px)', y: 3 } : { opacity: 0.14, y: 3 }}
            animate={soft ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 1.1 + i * 0.075 }}
          >
            {w}
          </motion.span>{' '}
        </Fragment>
      ))}
    </p>
  )
}

/** The spinning "Open to …" badge. Click it to jump to Contact. */
function RotatingBadge({ onClick }: { onClick: () => void }) {
  const text = `${site.openTo} · ${site.location} · `
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${site.openTo}. Go to contact`}
      // Phones/tablets: beside her, below the name. Wide screens: just under the second line of
      // the faded name (which sits 10% down and is about 26vw tall, capped on very wide screens).
      className="absolute right-4 top-[calc(112px+32svh)] z-20 size-24 sm:right-6 sm:top-[calc(128px+30svh)] sm:size-28 lg:right-[max(40px,calc((100vw-1440px)/2+40px))] lg:top-[calc(10%+min(26vw,485px)+20px)] lg:size-[clamp(88px,14vh,128px)]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
      whileHover={{ scale: 1.06 }}
    >
      {/* the spin is on a wrapper, not the SVG, so the curved text is drawn once and just rotated */}
      <span className="spin-slow absolute inset-0" aria-hidden>
        <svg viewBox="0 0 120 120" className="block h-full w-full">
          <defs>
            <path id="badge-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
          </defs>
          <text className="fill-ink font-mono text-[8px] uppercase" letterSpacing="0.9">
            <textPath href="#badge-circle">{text.toUpperCase()}</textPath>
          </text>
        </svg>
      </span>
      <span className="glass absolute inset-[30%] grid place-items-center rounded-full">
        <span className="live-dot size-3 rounded-full" />
      </span>
    </motion.button>
  )
}
