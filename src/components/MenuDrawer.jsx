import { motion, AnimatePresence } from 'framer-motion'

const primaryLinks = ['Gift Sets', 'Care Guides', 'Company', 'Sustainability', 'Careers', 'Contact']
const legalLinks = ['Shipping Info', 'Terms of Service', 'Privacy Policy']

export default function MenuDrawer({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
            onClick={onClose}
          />
          <motion.aside
            key="menu-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full z-50 flex flex-col shadow-2xl"
            style={{ width: '368px', backgroundColor: '#000' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-center border-b border-white/10"
              style={{ position: 'relative', paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
              <button
                style={{ position: 'absolute', right: '1.25rem' }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '2rem', paddingBottom: '1.5rem' }}>
              <ul className="flex flex-col" style={{ gap: '0.25rem' }}>
                {primaryLinks.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={onClose}
                      className="block text-white font-display font-semibold hover:text-[#76974a] transition-colors cursor-pointer"
                      style={{ fontSize: '1.15rem', paddingTop: '0.65rem', paddingBottom: '0.65rem' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10" style={{ marginTop: '2rem', paddingTop: '1.75rem' }}>
                <ul className="flex flex-col" style={{ gap: '0.25rem' }}>
                  {legalLinks.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        onClick={onClose}
                        className="block text-white/45 hover:text-white/80 transition-colors cursor-pointer text-sm"
                        style={{ paddingTop: '0.45rem', paddingBottom: '0.45rem' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Social icons footer */}
            <div
              className="border-t border-white/10 flex items-center"
              style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '1.25rem', paddingBottom: '1.75rem', gap: '1.5rem' }}
            >
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="hover:opacity-70 transition-opacity cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="hover:opacity-70 transition-opacity cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.36 1.27-5.36s-.32-.65-.32-1.6c0-1.5.87-2.63 1.95-2.63.92 0 1.37.69 1.37 1.52 0 .93-.59 2.31-.9 3.59-.25 1.07.54 1.95 1.59 1.95 1.91 0 3.19-2.45 3.19-5.35 0-2.21-1.49-3.76-3.62-3.76-2.47 0-3.92 1.85-3.92 3.77 0 .75.29 1.55.64 1.99a.26.26 0 0 1 .06.24c-.07.27-.21.87-.24.99-.04.16-.13.2-.29.12-1.09-.51-1.77-2.09-1.77-3.37 0-2.74 1.99-5.26 5.74-5.26 3.01 0 5.35 2.15 5.35 5.01 0 2.99-1.88 5.39-4.49 5.39-.88 0-1.7-.46-1.98-.99l-.54 2.01c-.19.75-.72 1.68-1.08 2.25.81.25 1.67.39 2.56.39 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
