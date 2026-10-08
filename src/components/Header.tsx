import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navItems, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLenis, useScrollTo } from '../lib/scroll'
import { useTheme } from '../lib/theme'
import { ArrowUpRight, EASE, Moon, Sun } from './ui'

const sectionIds = ['top', ...navItems.map((n) => n.id)]

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const scrollTo = useScrollTo()
  const lenis = useLenis()
  const { theme, toggle } = useTheme()
  const isHome = location.pathname === '/'
  const active = useActiveSection(isHome ? sectionIds : [], location.pathname)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const [atTop, setAtTop] = useState(true)
  useMotionValueEvent(scrollY, 'change', (v) => setAtTop(v < 160))

  const go = (id: string) => {
    setOpen(false)
    lenis?.start()
    if (isHome) scrollTo(id)
    else navigate('/', { state: { section: id } })
  }

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
          <motion.button
            type="button"
            onClick={() => go('top')}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full py-1 pl-1 pr-1 sm:pr-4"
            aria-label={`${site.shortName}, back to top`}
          >
            <span
              className={`grid size-10 place-items-center rounded-full border font-display text-[13px] font-bold tracking-tight transition-colors duration-500 ${
                atTop ? 'border-ink/25 bg-paper/60 text-ink backdrop-blur' : 'border-ink bg-ink text-paper'
              }`}
            >
              {site.monogram}
            </span>
            <span
              className={`hidden text-[15px] tracking-tight transition-opacity duration-500 sm:inline ${atTop ? 'opacity-100' : 'opacity-0'}`}
            >
              {site.shortName}
            </span>
          </motion.button>

          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="pointer-events-auto flex items-center gap-2"
          >
            <nav
              aria-label="Sections"
              className="hidden items-center rounded-full border border-line bg-surface/80 p-1 shadow-[0_10px_30px_-18px_rgba(30,32,56,0.35)] backdrop-blur-md lg:flex"
            >
              {navItems.map((item) => {
                const on = active === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={on ? 'true' : undefined}
                    className="relative rounded-full px-4 py-2 text-[13px] font-medium"
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className={`relative transition-colors ${on ? 'text-paper' : 'text-ink-soft hover:text-ink'}`}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform hover:scale-105 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <Sun /> : <Moon />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 items-center gap-2 rounded-full border border-line bg-surface/75 px-4 text-[13px] font-medium backdrop-blur-md lg:hidden"
            >
              <span className="relative block h-2.5 w-4" aria-hidden>
                <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${open ? 'top-1 -rotate-45' : 'top-2'}`} />
              </span>
              {open ? 'Close' : 'Menu'}
            </button>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-4 sm:px-6 lg:hidden"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 96px)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 28px)',
            }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            data-lenis-prevent
          >
            <nav aria-label="Sections" className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  className="group flex items-baseline gap-4 border-b border-line py-3 text-left"
                >
                  <span className="eyebrow tabular w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[clamp(2.2rem,10vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] transition-transform group-hover:translate-x-2">
                    {item.label}
                    {active === item.id && <em className="ml-2 font-serif font-normal italic text-ink-soft">·</em>}
                  </span>
                </motion.button>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto flex flex-col gap-2 pt-8 text-sm"
            >
              <span className="select-all font-mono text-ink-soft">{site.email}</span>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium">
                LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
