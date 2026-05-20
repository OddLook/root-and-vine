import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Topbar from './components/Topbar'
import ProductFeed from './components/ProductFeed'
import AdminRoute from './components/AdminRoute'
import { useAuth } from './hooks/useAuth'
import { useCart } from './hooks/useCart'

const CartDrawer  = lazy(() => import('./components/CartDrawer'))
const MenuDrawer  = lazy(() => import('./components/MenuDrawer'))
const AuthModal   = lazy(() => import('./components/AuthModal'))
const AdminDashboard = lazy(() => import('./pages/Admin'))

function MainLayout({ user, isAdmin, onCartOpen, onMenuOpen, onLoginOpen, onSignOut, cart, addToCart, removeFromCart, isCartOpen, closeCart, isMenuOpen, setIsMenuOpen, authModal, closeAuth, signIn, signUp }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Topbar
        cartCount={cart.length}
        onCartOpen={onCartOpen}
        onMenuOpen={onMenuOpen}
        user={user}
        isAdmin={isAdmin}
        onLoginOpen={onLoginOpen}
        onSignOut={onSignOut}
      />
      <ProductFeed onAddToCart={addToCart} onSignUpOpen={() => authModal.open === false && onLoginOpen('signup')} />
      <Suspense fallback={null}>
        <CartDrawer isOpen={isCartOpen} onClose={closeCart} cart={cart} onRemove={removeFromCart} />
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

export default function App() {
  const { user, isAdmin, loading, signIn, signUp, signOut } = useAuth()
  const { cart, addToCart, removeFromCart, isOpen: isCartOpen, openCart, closeCart } = useCart(user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signin' })

  function openAuth(mode) { setAuthModal({ open: true, mode }) }
  function closeAuth()    { setAuthModal({ open: false, mode: 'signin' }) }

  return (
    <Routes>
      <Route path="/" element={
        <MainLayout
          user={user} isAdmin={isAdmin}
          onCartOpen={openCart} onMenuOpen={() => setIsMenuOpen(true)}
          onLoginOpen={openAuth} onSignOut={signOut}
          cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
          isCartOpen={isCartOpen} closeCart={closeCart}
          isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}
          authModal={authModal} closeAuth={closeAuth}
          signIn={signIn} signUp={signUp}
        />
      } />
      <Route path="/admin" element={
        <AdminRoute user={user} isAdmin={isAdmin} loading={loading}>
          <Suspense fallback={null}>
            <AdminDashboard />
          </Suspense>
        </AdminRoute>
      } />
    </Routes>
  )
}
