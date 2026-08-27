import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MorphIcon } from 'morphicons/react'
import { ShoppingBag, Check, Heart } from 'lucide'

function CareDetail({ label, value }) {
  return (
    <div className="flex flex-col gap-1 items-center text-center">
      <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-white text-sm font-medium leading-snug">{value}</span>
    </div>
  )
}

export default function ProductCard({ product, onAddToCart, isMobile, isFav = false, onToggleFavorite }) {
  const [flipped, setFlipped] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [justFaved, setJustFaved] = useState(false)
  const addedTimeout = useRef(null)
  const favedTimeout = useRef(null)

  function handleAdd(e) {
    e.stopPropagation()
    onAddToCart(product)
    setJustAdded(true)
    clearTimeout(addedTimeout.current)
    addedTimeout.current = setTimeout(() => setJustAdded(false), 1200)
  }

  function handleToggleFav(e) {
    e.stopPropagation()
    onToggleFavorite()
    setJustFaved(true)
    clearTimeout(favedTimeout.current)
    favedTimeout.current = setTimeout(() => setJustFaved(false), 1000)
  }

  if (isMobile) {
    return (
      <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => setFlipped(f => !f)}>
        <img
          src={product.img_url}
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
              <h2 className="font-sans text-white text-3xl font-bold leading-tight">{product.name}</h2>
              <p className="text-white/80 text-base leading-relaxed">{product.description}</p>
              <span className="font-sans text-white text-2xl font-bold mt-2">${product.price}</span>
              <button
                onClick={handleAdd}
                className="w-full min-h-[44px] rounded-full bg-[#5c8d3f] text-white text-sm font-semibold hover:bg-[#72a744] transition-colors cursor-pointer mt-1 flex items-center justify-center gap-2"
                style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.625rem', paddingBottom: '0.625rem' }}
              >
                <MorphIcon icon={justAdded ? Check : ShoppingBag} spring="smooth" size={16} strokeWidth={2.5} />
                {justAdded ? 'Added!' : 'Add to Cart'}
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
              <h2 className="font-sans text-white text-2xl font-bold">{product.name} — Care Guide</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                <CareDetail label="Light" value={product.light} />
                <CareDetail label="Water" value={product.water} />
                <CareDetail label="Humidity" value={product.humidity} />
                <CareDetail label="Difficulty" value={product.difficulty} />
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
      {/* Heart button — top right, visible on hover */}
      {onToggleFavorite && (
        <button
          onClick={handleToggleFav}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
        >
          <MorphIcon
            icon={justFaved ? Check : Heart}
            spring="smooth"
            size={16}
            strokeWidth={2.5}
            color={justFaved ? '#e05c6a' : (isFav ? '#e05c6a' : 'rgba(255,255,255,0.85)')}
            fill={!justFaved && isFav ? '#e05c6a' : 'none'}
          />
        </button>
      )}
      <img
        src={product.img_url}
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
            <h3 className="font-sans text-white text-xl font-bold leading-tight">{product.name}</h3>
            <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{product.description}</p>
            <span className="font-sans text-white font-bold text-2xl mt-1">${product.price}</span>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
              <button
                onClick={handleAdd}
                className="min-h-[44px] rounded-full bg-[#5c8d3f] text-white text-sm font-semibold hover:bg-[#72a744] transition-colors cursor-pointer flex items-center justify-center gap-2"
                style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
              >
                <MorphIcon icon={justAdded ? Check : ShoppingBag} spring="smooth" size={16} strokeWidth={2.5} />
                {justAdded ? 'Added!' : 'Add to Cart'}
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
            <h3 className="font-sans text-white font-bold text-lg">Care Guide</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              <CareDetail label="Light" value={product.light} />
              <CareDetail label="Water" value={product.water} />
              <CareDetail label="Humidity" value={product.humidity} />
              <CareDetail label="Difficulty" value={product.difficulty} />
            </div>
            <p className="text-white/60 text-xs">Click card to go back</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
