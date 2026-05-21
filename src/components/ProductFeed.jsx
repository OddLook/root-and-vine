import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import Hero from './Hero'
import Footer from './Footer'
import FilterBar from './FilterBar'
import { useProducts } from '../hooks/useProducts'

const ease = [0.25, 0.46, 0.45, 0.94]

const INITIAL_COUNT = 8
const ITEMS_PER_ROW = 4

const EMPTY_FILTERS = {
  indoor: false,
  pet_friendly: false,
  air_purifying: false,
  outdoor: false,
  rare: false,
  sale: false,
  difficulty: null,
}

const cardVariants = {
  enter: (dir) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function ProductFeed({ onAddToCart, onSignUpOpen, favorites, onToggleFavorite }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const { products, loading } = useProducts(filters)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Reset pagination and clamp index when filtered results change
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT)
    setCurrentIndex(i => (products.length > 0 ? Math.min(i, products.length - 1) : 0))
  }, [products.length])

  function toggleFilter(key) {
    setFilters(f => ({ ...f, [key]: !f[key] }))
  }

  function setDifficulty(val) {
    setFilters(f => ({ ...f, difficulty: f.difficulty === val ? null : val }))
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS)
  }

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-black">
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>Loading…</span>
      </main>
    )
  }

  if (isMobile) {
    const activeCount = Object.entries(filters).filter(([k, v]) => k !== 'difficulty' && v !== false && v !== null).length

    const goNext = () => {
      if (products.length === 0) return
      setDirection(1)
      setCurrentIndex(i => (i + 1) % products.length)
    }
    const goPrev = () => {
      if (products.length === 0) return
      setDirection(-1)
      setCurrentIndex(i => (i - 1 + products.length) % products.length)
    }

    const MOBILE_FILTERS = [
      { key: 'indoor',        label: 'Indoor' },
      { key: 'outdoor',       label: 'Outdoor' },
      { key: 'pet_friendly',  label: 'Pet Friendly' },
      { key: 'air_purifying', label: 'Air Purifying' },
      { key: 'rare',          label: 'Rare' },
      { key: 'sale',          label: 'On Sale' },
    ]

    return (
      <main className="flex-1 relative overflow-hidden bg-black">
        {/* Card */}
        <AnimatePresence custom={direction} mode="wait">
          {products.length > 0 ? (
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
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>No plants match your filters</p>
              <button onClick={clearFilters} style={{ color: '#678649', background: 'none', border: '1px solid #678649', borderRadius: '999px', padding: '0.5rem 1.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top overlay row: filter (left) · position (center) · heart (right) */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between" style={{ pointerEvents: 'none' }}>

          {/* Filter pill — left */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 cursor-pointer"
            style={{
              pointerEvents: 'auto',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              border: activeCount > 0 ? '1.5px solid #678649' : '1px solid rgba(255,255,255,0.3)',
              background: activeCount > 0 ? 'rgba(103,134,73,0.18)' : 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              color: activeCount > 0 ? '#90b85e' : 'rgba(255,255,255,0.85)',
              fontSize: '0.78rem',
              fontWeight: 500,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filter
            {activeCount > 0 && (
              <span style={{ background: '#678649', color: '#fff', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, padding: '0.05rem 0.4rem' }}>
                {activeCount}
              </span>
            )}
          </button>

          {/* Position indicator — center */}
          {products.length > 0 && (
            <span style={{
              pointerEvents: 'none',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              borderRadius: '999px',
              padding: '0.3rem 0.75rem',
            }}>
              {currentIndex + 1} / {products.length}
            </span>
          )}

          {/* Heart — right */}
          <button
            onClick={() => products.length > 0 && onToggleFavorite?.(products[currentIndex])}
            aria-label="Toggle favorite"
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              borderRadius: '999px',
              width: '2.25rem',
              height: '2.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {(() => {
              const isFav = products.length > 0 && favorites?.has(products[currentIndex].id)
              return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? '#e05c6a' : 'none'} stroke={isFav ? '#e05c6a' : 'rgba(255,255,255,0.85)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )
            })()}
          </button>
        </div>

        {/* Prev / Next */}
        <div className="absolute right-4 z-30 flex flex-col gap-3" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <button onClick={goPrev} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer" style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }} aria-label="Previous plant">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
          </button>
          <button onClick={goNext} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer" style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }} aria-label="Next plant">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>

        {/* Filter bottom sheet */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div
                key="sheet-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="absolute inset-0 z-40"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              />
              <motion.div
                key="sheet"
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 320 }}
                className="absolute bottom-0 left-0 right-0 z-50"
                style={{ background: '#111', borderRadius: '1.25rem 1.25rem 0 0', padding: '1.25rem 1.5rem 2.5rem' }}
              >
                {/* Handle */}
                <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)', margin: '0 auto 1.25rem' }} />

                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Filter plants
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {MOBILE_FILTERS.map(({ key, label }) => {
                    const active = filters[key]
                    const isSale = key === 'sale'
                    return (
                      <button
                        key={key}
                        onClick={() => toggleFilter(key)}
                        style={{
                          padding: '0.55rem 1.15rem',
                          borderRadius: '999px',
                          border: isSale
                            ? `1.5px solid ${active ? '#678649' : '#678649'}`
                            : `1px solid ${active ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                          background: isSale
                            ? (active ? '#678649' : 'transparent')
                            : (active ? '#fff' : 'transparent'),
                          color: isSale
                            ? (active ? '#fff' : '#90b85e')
                            : (active ? '#111' : 'rgba(255,255,255,0.7)'),
                          fontSize: '0.85rem',
                          fontWeight: active ? 600 : 400,
                          cursor: 'pointer',
                          minHeight: '44px',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {activeCount > 0 && (
                    <button
                      onClick={() => { clearFilters(); setIsFilterOpen(false) }}
                      style={{ flex: 1, padding: '0.875rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' }}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    style={{ flex: 2, padding: '0.875rem', borderRadius: '999px', background: '#678649', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {activeCount > 0 ? `Show ${products.length} plant${products.length === 1 ? '' : 's'}` : 'Done'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    )
  }

  const visibleProducts = products.slice(0, visibleCount)

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
            style={{ marginBottom: '2rem' }}
          >
            <p className="text-[#76974a] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Collection
            </p>
            <h2 className="font-display text-4xl font-bold text-black leading-tight">Hand-picked plants</h2>
          </motion.div>

          {/* Filter bar */}
          <FilterBar
            filters={filters}
            onToggle={toggleFilter}
            onClear={clearFilters}
            total={products.length}
          />

          {/* Empty state */}
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{ color: '#999', fontSize: '1rem', marginBottom: '1.25rem' }}>
                No plants match your current filters.
              </p>
              <button
                onClick={clearFilters}
                className="cursor-pointer hover:opacity-75 transition-opacity"
                style={{
                  background: 'none',
                  border: '1px solid #678649',
                  color: '#678649',
                  borderRadius: '999px',
                  padding: '0.6rem 1.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Bento grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {visibleProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease }}
                    style={{ paddingBottom: '1.5rem' }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      isMobile={false}
                      isFav={favorites?.has(product.id) ?? false}
                      onToggleFavorite={() => onToggleFavorite?.(product)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
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
                ) : products.length > INITIAL_COUNT ? (
                  <p className="text-stone-400 text-sm font-light tracking-wide">End of the catalogue</p>
                ) : null}
              </motion.div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
