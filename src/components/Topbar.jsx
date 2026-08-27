import { Link } from 'react-router-dom'
import { MorphIcon } from 'morphicons/react'
import { Menu, X, LogIn, LogOut } from 'lucide'
import { Wrench, Heart, ShoppingBag } from 'lucide-react'

export default function Topbar({ cartCount, onCartOpen, onMenuOpen, isMenuOpen, user, isAdmin, onLoginOpen, onSignOut, favCount, onFavOpen }) {
  return (
    <header className="bg-black text-white shrink-0 z-50 border-b border-[#72a744]/20">
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
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <MorphIcon icon={isMenuOpen ? X : Menu} spring="smooth" size={22} strokeWidth={2.5} />
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
              <Wrench size={20} strokeWidth={2} color="#5c8d3f" />
            </Link>
          )}

          {/* Favorites — all screens */}
          <button
            onClick={onFavOpen}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Favorites"
          >
            <Heart size={22} strokeWidth={2} color={favCount > 0 ? '#5c8d3f' : 'currentColor'} fill={favCount > 0 ? '#5c8d3f' : 'none'} />
            {favCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#72a744] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none">
                {favCount}
              </span>
            )}
          </button>

          {/* Login / User — all screens */}
          <button
            onClick={user ? onSignOut : onLoginOpen}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label={user ? 'Sign out' : 'Login'}
            title={user ? `Signed in as ${user.email} — click to sign out` : 'Sign in'}
          >
            <MorphIcon icon={user ? LogOut : LogIn} spring="smooth" size={22} strokeWidth={2.5} color={user ? '#5c8d3f' : 'currentColor'} />
          </button>

          {/* Cart — all screens */}
          <button
            onClick={onCartOpen}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#72a744] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  )
}
