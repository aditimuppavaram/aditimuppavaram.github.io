import { motion } from 'motion/react'
import { site } from '../data/site'

/** Her cut-out photo in the hero, with a chat bubble that pops up beside her head. */
export function HeroMedia() {
  const { image, bubble } = site.hero
  if (!image) return null
  return (
    <div className="relative h-full w-fit">
      <img
        src={image}
        alt={site.name}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="block h-full w-auto max-w-full select-none object-contain object-bottom"
      />
      {bubble && (
        <motion.div
          // beside her head with some space from her hair; the square corner points towards her
          className="absolute left-[calc(70%+10px)] top-[1.5%] origin-bottom-left min-[360px]:left-[calc(78%+18px)] sm:left-[calc(78%+26px)] lg:left-[calc(76%+34px)]"
          initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1.5 }}
        >
          <div className="whitespace-nowrap rounded-2xl rounded-bl-sm bg-ink px-3.5 py-2 text-[13px] font-medium text-paper shadow-lg sm:px-4 sm:py-2.5 sm:text-sm">
            {bubble}
          </div>
        </motion.div>
      )}
    </div>
  )
}
