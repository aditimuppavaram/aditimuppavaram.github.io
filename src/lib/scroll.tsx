import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const LenisContext = createContext<Lenis | null>(null)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Buttery smooth scrolling (Lenis). Turned off for people who ask for reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    setLenis(instance)
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

/** Scroll to a section id (or 'top'). Uses Lenis when it is running. */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (id: string, opts: { immediate?: boolean } = {}) => {
      const target: HTMLElement | number = id === 'top' ? 0 : document.getElementById(id) ?? 0
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.4,
          immediate: opts.immediate,
          force: true,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
        return
      }
      const behavior: ScrollBehavior = opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth'
      if (typeof target === 'number') window.scrollTo({ top: target, behavior })
      else target.scrollIntoView({ behavior, block: 'start' })
    },
    [lenis],
  )
}
