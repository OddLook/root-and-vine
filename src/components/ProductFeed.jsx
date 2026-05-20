import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import Hero from './Hero'
import Footer from './Footer'
import { products } from '../data/products'

const ease = [0.25, 0.46, 0.45, 0.94]

const INITIAL_COUNT = 8
const ITEMS_PER_ROW = 4

export default function ProductFeed({ onAddToCart }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isMobile) {
    return (
      <main className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {products.map(product => (
          <div key={product.id} className="h-[calc(100svh-52px)] snap-start shrink-0">
            <ProductCard product={product} onAddToCart={onAddToCart} isMobile />
          </div>
        ))}
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <Hero />

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
