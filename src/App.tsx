import { MotionConfig } from 'motion/react'
import { useEffect, useLayoutEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { SmoothScroll, useLenis } from './lib/scroll'
import { CaseStudy } from './pages/CaseStudy'
import { Home } from './pages/Home'
import { Resume } from './pages/Resume'
import { Footer } from './sections/Contact'

function ScrollReset() {
  const { pathname, state } = useLocation()
  const lenis = useLenis()
  useLayoutEffect(() => {
    if ((state as { section?: string } | null)?.section) return
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <SmoothScroll>
          <ScrollReset />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </SmoothScroll>
      </HashRouter>
    </MotionConfig>
  )
}
