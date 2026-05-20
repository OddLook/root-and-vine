import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import Hero from './Hero'
import Footer from './Footer'
import { products } from '../data/products'

const ease = [0.25, 0.46, 0.45, 0.94]

const INITIAL_COUNT = 8
const ITEMS_PER_ROW = 4

const cardVariants = {
  enter: (dir) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function ProductFeed({ onAddToCart, onSignUpOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isMobile) {
    const goNext = () => {
      setDirection(1)
      setCurrentIndex(i => (i + 1) % products.length)
    }
    const goPrev = () => {
      setDirection(-1)
      setCurrentIndex(i => (i - 1 + products.length) % products.length)
    }

    return (
      <main className="flex-1 relative overflow-hidden bg-black">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={products[currentIndex].id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <ProductCard product={products[currentIndex]} onAddToCart={onAddToCart} isMobile />
          </motion.div>
        </AnimatePresence>

        {/* Vertical navigation buttons */}
        <div className="absolute right-4 z-50 flex flex-col gap-3" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
            aria-label="Previous plant"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
            aria-label="Next plant"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <Hero onSignUpOpen={onSignUpOpen} />

      <section id="shop" style={{ background: '#f5f2ed', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
            style={{ marginBottom: '4rem' }}
          >
            <p className="text-[#76974a] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Collection
            </p>
            <h2 className="font-display text-4xl font-bold text-black leading-tight">Hand-picked plants</h2>
          </motion.div>

          {/* Staggered bento grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, visibleCount).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease }}
                style={{ paddingBottom: '1.5rem' }}
              >
                <ProductCard product={product} onAddToCart={onAddToCart} isMobile={false} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
          >
            {visibleCount < products.length ? (
              <button
                onClick={() => setVisibleCount(c => Math.min(c + ITEMS_PER_ROW, products.length))}
                className="border border-[#678649] text-[#678649] hover:bg-[#678649] hover:text-white transition-colors font-semibold rounded-full cursor-pointer"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '0.9rem' }}
              >
                See More
              </button>
            ) : visibleCount > INITIAL_COUNT ? (
              <p className="text-stone-400 text-sm font-light tracking-wide">End of the catalogue</p>
            ) : null}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
