import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'aam-theme'

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

const PAPER: Record<Theme, string> = { light: '#f4f3ef', dark: '#0e0f1c' }

/** The browser bar colour (phones) follows the theme picked on the site, not just the system one. */
function syncThemeColor(t: Theme | null) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    const media = m.getAttribute('media') || ''
    m.content = t ? PAPER[t] : media.includes('dark') ? PAPER.dark : PAPER.light
  })
}

/** Apply a saved choice before React renders, so there is no flash. */
export function applyStoredTheme() {
  const t = readStoredTheme()
  if (t) document.documentElement.setAttribute('data-theme', t)
  syncThemeColor(t)
}

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(currentTheme)

  useEffect(() => {
    const sync = () => setThemeState(currentTheme())
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', sync)
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      mq.removeEventListener('change', sync)
      mo.disconnect()
    }
  }, [])

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    syncThemeColor(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage can be blocked; the toggle still works for this visit */
    }
  }

  return { theme, toggle }
}
