export default function Topbar({ cartCount, onCartOpen }) {
  return (
    <header className="bg-black text-white shrink-0 z-50 border-b border-[#76974a]/20">
      <div className="flex items-center justify-between" style={{ paddingLeft: '5rem', paddingRight: '5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
        <span className="font-display text-xl font-bold tracking-wide">Root & Vine</span>
        <button
          onClick={onCartOpen}
          className="relative p-3 hover:opacity-75 transition-opacity cursor-pointer"
          aria-label="Open cart"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-[#76974a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
