import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer({ isOpen, onClose, cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

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
            style={{ width: '368px', backgroundColor: '#000' }}
          >
            <div
              className="flex items-center justify-center border-b border-white/10"
              style={{ position: 'relative', paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <button
                style={{ position: 'absolute', right: '1.25rem' }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              {cart.length === 0 ? (
                <p className="text-white/40 text-sm text-center mt-12">Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover shrink-0"
                      style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm leading-snug text-white">{item.name}</p>
                      <p className="text-white/50 text-xs mt-0.5">Qty: {item.qty}</p>
                      <p className="text-[#76974a] font-semibold text-sm mt-0.5">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 space-y-4" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.25rem', paddingBottom: '2.5rem' }}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/50">Total</span>
                  <span className="font-display text-lg font-bold text-white">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-3.5 bg-[#678649] hover:bg-[#76974a] text-white font-semibold rounded-xl transition-colors cursor-pointer text-sm">
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
