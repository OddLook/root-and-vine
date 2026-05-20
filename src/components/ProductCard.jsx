import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CareDetail({ label, value }) {
  return (
    <div className="flex flex-col gap-1 items-center text-center">
      <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-white text-sm font-medium leading-snug">{value}</span>
    </div>
  )
}

export default function ProductCard({ product, onAddToCart, isMobile }) {
  const [flipped, setFlipped] = useState(false)

  if (isMobile) {
    return (
      <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => setFlipped(f => !f)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-end items-center text-center gap-3"
              style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2.5rem' }}
            >
              <h2 className="font-display text-white text-3xl font-bold leading-tight">{product.name}</h2>
              <p className="text-white/80 text-base leading-relaxed">{product.description}</p>
              <span className="font-display text-white text-2xl font-bold mt-2">${product.price}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
                className="w-full min-h-[44px] rounded-full bg-[#678649] text-white text-sm font-semibold hover:bg-[#76974a] transition-colors cursor-pointer mt-1"
                style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.625rem', paddingBottom: '0.625rem' }}
              >
                Add to Cart
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-end items-center text-center gap-5"
              style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2.5rem' }}
            >
              <h2 className="font-display text-white text-2xl font-bold">{product.name} — Care Guide</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                <CareDetail label="Light" value={product.care.light} />
                <CareDetail label="Water" value={product.care.water} />
                <CareDetail label="Humidity" value={product.care.humidity} />
                <CareDetail label="Difficulty" value={product.care.difficulty} />
              </div>
              <p className="text-white/50 text-xs">Tap card to go back</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Desktop bento card
  return (
    <div onClick={() => setFlipped(f => !f)} className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4] group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <AnimatePresence mode="wait">
        {!flipped ? (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-end items-center text-center p-8 gap-2"
            style={{ paddingBottom: '3rem' }}
          >
            <h3 className="font-display text-white text-xl font-bold leading-tight">{product.name}</h3>
            <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{product.description}</p>
            <span className="font-display text-white font-bold text-2xl mt-1">${product.price}</span>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="min-h-[44px] rounded-full bg-[#678649] text-white text-sm font-semibold hover:bg-[#76974a] transition-colors cursor-pointer"
                style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-end items-center text-center p-8 gap-4 bg-black/65"
            style={{ paddingBottom: '3rem' }}
          >
            <h3 className="font-display text-white font-bold text-lg">Care Guide</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              <CareDetail label="Light" value={product.care.light} />
              <CareDetail label="Water" value={product.care.water} />
              <CareDetail label="Humidity" value={product.care.humidity} />
              <CareDetail label="Difficulty" value={product.care.difficulty} />
            </div>
            <p className="text-white/60 text-xs">Click card to go back</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
