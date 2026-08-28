import { motion } from 'framer-motion'
import heroImg from '../assets/hero-plants.jpg'

const ease = [0.25, 0.46, 0.45, 0.94]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
})

export default function Hero({ onSignUpOpen }) {
  function scrollToGrid() {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="grain relative w-full min-h-[88vh] flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Bright living room filled with hanging and potted houseplants"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Directional gradient — just enough for text legibility over the left third */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full py-28 md:py-36" style={{ paddingLeft: 'clamp(1.25rem, 5vw, 5rem)', paddingRight: 'clamp(1.25rem, 5vw, 5rem)' }}>
        <div className="flex flex-col gap-6 max-w-lg">

          <motion.span {...fadeUp(0.1)} className="text-[#72a744] text-sm font-semibold tracking-[0.25em] uppercase">
            Premium Plant Nursery
          </motion.span>

          <motion.h1 {...fadeUp(0.25)} className="font-sans text-white text-6xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Where every home<br />
            <em className="not-italic text-[#72a744]">becomes a garden.</em>
          </motion.h1>

          <motion.p {...fadeUp(0.4)} className="text-white/65 text-lg leading-relaxed font-light">
            Hand-selected plants and expert care guides, delivered in days.
            Everything you need to start growing.
          </motion.p>

          <motion.div {...fadeUp(0.52)} className="flex gap-4 mt-2">
            <button
              onClick={scrollToGrid}
              className="bg-[#5c8d3f] hover:bg-[#72a744] text-white font-semibold rounded-full transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#5c8d3f]/30"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1rem', minWidth: '11rem' }}
            >
              Shop Now
            </button>
            <button
              onClick={onSignUpOpen}
              className="border border-white/25 hover:border-white/60 hover:bg-white/5 text-white rounded-full transition-all duration-300 cursor-pointer"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1rem', minWidth: '11rem' }}
            >
              Sign Up
            </button>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="flex gap-10 mt-4 pt-6 border-t border-white/10">
            {[['200+', 'Plant varieties'], ['4.9★', 'Customer rating'], ['2–5 days', 'Delivery']].map(([val, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-sans text-white font-bold text-2xl">{val}</span>
                <span className="text-white/45 text-xs tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Organic wave transition to shop section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full block">
          <path d="M0,72 C280,72 360,38 720,38 C1080,38 1160,72 1440,72 L1440,72 L0,72 Z" fill="#f5f2ed" />
        </svg>
      </div>
    </section>
  )
}
