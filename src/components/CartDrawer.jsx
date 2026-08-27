import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, Trash2 } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onCheckout, checkoutLoading, checkoutError }) {
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
            style={{ width: 'min(368px, 85vw)', backgroundColor: '#000' }}
          >
            <div
              className="flex items-center justify-center border-b border-white/10"
              style={{ position: 'relative', paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            >
              <ShoppingBag size={30} strokeWidth={2} color="#fff" />
              <button
                style={{ position: 'absolute', right: '1.25rem' }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              {cart.length === 0 ? (
                <p className="text-white/40 text-sm text-center mt-12">Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.img_url}
                      alt={item.name}
                      className="object-cover shrink-0"
                      style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-bold text-sm leading-snug text-white">{item.name}</p>
                      <p className="text-white/50 text-xs mt-0.5">Qty: {item.qty}</p>
                      <p className="text-[#72a744] font-semibold text-sm mt-0.5">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={15} strokeWidth={2} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 space-y-4" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.25rem', paddingBottom: '2.5rem' }}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/50">Total</span>
                  <span className="font-sans text-lg font-bold text-white">${total.toFixed(2)}</span>
                </div>
                {checkoutError && (
                  <p style={{ color: '#f87171', fontSize: '0.78rem', textAlign: 'center', lineHeight: 1.4 }}>
                    {checkoutError}
                  </p>
                )}
                <button
                  onClick={onCheckout}
                  disabled={checkoutLoading}
                  className="w-full py-3.5 text-white font-semibold rounded-xl transition-colors cursor-pointer text-sm"
                  style={{
                    background: checkoutLoading ? 'rgba(92,141,63,0.6)' : '#5c8d3f',
                    cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {checkoutLoading ? 'Redirecting…' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
