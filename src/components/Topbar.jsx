import { Link } from 'react-router-dom'

export default function Topbar({ cartCount, onCartOpen, onMenuOpen, user, isAdmin, onLoginOpen, onSignOut }) {
  return (
    <header className="bg-black text-white shrink-0 z-50 border-b border-[#76974a]/20">
      <div
        className="flex items-center justify-between"
        style={{
          paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={onMenuOpen}
            className="md:hidden p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link to="/" className="font-display text-xl font-bold tracking-wide hover:opacity-80 transition-opacity">Root & Vine</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Admin dashboard icon — only for admins */}
          {isAdmin && (
            <Link
              to="/admin"
              className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Admin dashboard"
              title="Admin dashboard"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#678649" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </Link>
          )}

          {/* Search — all screens */}
          <button
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Search"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Login / User — all screens */}
          <button
            onClick={user ? onSignOut : onLoginOpen}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label={user ? 'Sign out' : 'Login'}
            title={user ? `Signed in as ${user.email} — click to sign out` : 'Sign in'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={user ? '#678649' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>

          {/* Cart — all screens */}
          <button
            onClick={onCartOpen}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Open cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#76974a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  )
}
