import { lazy, Suspense, useState } from 'react'
import './index.css'
import Topbar from './components/Topbar'
import ProductFeed from './components/ProductFeed'
import { useAuth } from './hooks/useAuth'
import { useCart } from './hooks/useCart'

const CartDrawer = lazy(() => import('./components/CartDrawer'))
const MenuDrawer = lazy(() => import('./components/MenuDrawer'))
const AuthModal  = lazy(() => import('./components/AuthModal'))

export default function App() {
  const { user, signIn, signUp, signOut } = useAuth()
  const { cart, addToCart, removeFromCart, isOpen, openCart, closeCart } = useCart(user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signin' })

  function openAuth(mode) { setAuthModal({ open: true, mode }) }
  function closeAuth()    { setAuthModal({ open: false, mode: 'signin' }) }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Topbar
        cartCount={cart.length}
        onCartOpen={openCart}
        onMenuOpen={() => setIsMenuOpen(true)}
        user={user}
        onLoginOpen={() => openAuth('signin')}
        onSignOut={signOut}
      />
      <ProductFeed onAddToCart={addToCart} onSignUpOpen={() => openAuth('signup')} />
      <Suspense fallback={null}>
        <CartDrawer isOpen={isOpen} onClose={closeCart} cart={cart} onRemove={removeFromCart} />
      </Suspense>
      <Suspense fallback={null}>
        <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </Suspense>
      <Suspense fallback={null}>
        <AuthModal
          isOpen={authModal.open}
          onClose={closeAuth}
          initialMode={authModal.mode}
          onSignIn={signIn}
          onSignUp={signUp}
        />
      </Suspense>
    </div>
  )
}
