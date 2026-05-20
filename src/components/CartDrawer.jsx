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
            className="fixed right-0 top-0 h-full w-80 bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-xl font-bold">Your Cart</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm text-center mt-12">Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm leading-snug">{item.name}</p>
                      <p className="text-gray-400 text-sm mt-1">Qty: {item.qty}</p>
                      <p className="text-[#678649] font-semibold text-sm mt-1">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="font-display text-lg font-bold">${total.toFixed(2)}</span>
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
