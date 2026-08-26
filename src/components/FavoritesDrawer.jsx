import { motion, AnimatePresence } from 'framer-motion'

export default function FavoritesDrawer({ isOpen, onClose, favoritedProducts, onToggle, onAddToCart }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-50 flex flex-col shadow-2xl"
            style={{ width: 'min(368px, 85vw)', backgroundColor: '#000' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-center border-b border-white/10"
              style={{ position: 'relative', paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#678649" stroke="#678649" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <button
                style={{ position: 'absolute', right: '1.25rem' }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close favorites"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              {favoritedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 gap-3">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <p className="text-white/30 text-sm text-center">No favorites yet.<br />Tap the heart on any plant.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {favoritedProducts.map(product => (
                    <div key={product.id} className="flex gap-4 items-center">
                      <img
                        src={product.img_url}
                        alt={product.name}
                        className="object-cover shrink-0"
                        style={{ width: '52px', height: '52px', borderRadius: '50%' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm leading-snug text-white truncate">{product.name}</p>
                        <p className="text-[#76974a] font-semibold text-sm mt-0.5">${product.price}</p>
                      </div>
                      <button
                        onClick={() => { onAddToCart(product); }}
                        className="shrink-0 text-xs font-semibold rounded-full border border-[#678649] text-[#678649] hover:bg-[#678649] hover:text-white transition-colors cursor-pointer"
                        style={{ padding: '0.4rem 0.9rem' }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => onToggle(product)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                        style={{ color: '#e05c6a' }}
                        aria-label={`Remove ${product.name} from favorites`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
