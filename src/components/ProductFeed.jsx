import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import Hero from './Hero'
import Footer from './Footer'
import { products } from '../data/products'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function ProductFeed({ onAddToCart }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

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
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-[#76974a] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Our Collection
              </p>
              <h2 className="font-display text-4xl font-bold text-black leading-tight">Hand-picked plants</h2>
            </div>
            <span className="text-stone-400 text-sm font-light">{products.length} varieties</span>
          </motion.div>

          {/* Staggered bento grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease }}
                style={{ paddingBottom: '1.5rem' }}
              >
                <ProductCard product={product} onAddToCart={onAddToCart} isMobile={false} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
