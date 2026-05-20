import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
})

export default function Hero() {
  function scrollToGrid() {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="grain relative w-full min-h-[88vh] bg-black flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
        alt=""
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />

      {/* Directional gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full py-28 md:py-36" style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
        <div className="flex flex-col gap-6 max-w-lg">

          <motion.span {...fadeUp(0.1)} className="text-[#76974a] text-sm font-semibold tracking-[0.25em] uppercase">
            Premium Plant Nursery
          </motion.span>

          <motion.h1 {...fadeUp(0.25)} className="font-display text-white text-6xl font-bold leading-[1.08] tracking-tight">
            Where every home<br />
            <em className="not-italic text-[#76974a]">becomes a garden.</em>
          </motion.h1>

          <motion.p {...fadeUp(0.4)} className="text-white/65 text-lg leading-relaxed font-light">
            Hand-selected plants, expert care guides, and same-week delivery.
            Build the living space you've always wanted.
          </motion.p>

          <motion.div {...fadeUp(0.52)} className="flex gap-4 mt-2">
            <button
              onClick={scrollToGrid}
              className="bg-[#678649] hover:bg-[#76974a] text-white font-semibold rounded-full transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#678649]/30"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1rem', minWidth: '11rem' }}
            >
              Shop Now
            </button>
            <button
              className="border border-white/25 hover:border-white/60 hover:bg-white/5 text-white rounded-full transition-all duration-300 cursor-pointer"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1rem', minWidth: '11rem' }}
            >
              Sign Up
            </button>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="flex gap-10 mt-4 pt-6 border-t border-white/10">
            {[['200+', 'Plant varieties'], ['4.9★', 'Customer rating'], ['2–5 days', 'Delivery']].map(([val, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-display text-white font-bold text-2xl">{val}</span>
                <span className="text-white/45 text-xs tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Organic wave transition to shop section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full block">
          <path d="M0,36 C320,72 640,0 960,36 C1120,54 1280,18 1440,36 L1440,72 L0,72 Z" fill="#f5f2ed" />
        </svg>
      </div>
    </section>
  )
}
