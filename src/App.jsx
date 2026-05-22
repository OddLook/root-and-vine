import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Topbar from './components/Topbar'
import ProductFeed from './components/ProductFeed'
import AdminRoute from './components/AdminRoute'
import { useAuth } from './hooks/useAuth'
import { useCart } from './hooks/useCart'
import { useFavorites } from './hooks/useFavorites'
import { supabase } from './lib/supabaseClient'

const CartDrawer       = lazy(() => import('./components/CartDrawer'))
const FavoritesDrawer  = lazy(() => import('./components/FavoritesDrawer'))
const MenuDrawer       = lazy(() => import('./components/MenuDrawer'))
const AuthModal        = lazy(() => import('./components/AuthModal'))
const AdminDashboard   = lazy(() => import('./pages/Admin'))
const ResetPassword    = lazy(() => import('./pages/ResetPassword'))
const CheckoutSuccess  = lazy(() => import('./pages/CheckoutSuccess'))
const CheckoutCancel   = lazy(() => import('./pages/CheckoutCancel'))

function MainLayout({ user, isAdmin, onCartOpen, onMenuOpen, onLoginOpen, onSignOut, cart, addToCart, removeFromCart, isCartOpen, closeCart, isMenuOpen, setIsMenuOpen, authModal, closeAuth, signIn, signUp, onResetPassword, favCount, onFavOpen, isFavOpen, closeFav, favorites, favoritedProducts, onToggleFavorite, onCheckout, checkoutLoading }) {
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
        favCount={favCount}
        onFavOpen={onFavOpen}
      />
      <ProductFeed onAddToCart={addToCart} onSignUpOpen={() => authModal.open === false && onLoginOpen('signup')} favorites={favorites} onToggleFavorite={onToggleFavorite} />
      <Suspense fallback={null}>
        <CartDrawer isOpen={isCartOpen} onClose={closeCart} cart={cart} onRemove={removeFromCart} onCheckout={onCheckout} checkoutLoading={checkoutLoading} />
      </Suspense>
      <Suspense fallback={null}>
        <FavoritesDrawer isOpen={isFavOpen} onClose={closeFav} favoritedProducts={favoritedProducts} onToggle={onToggleFavorite} onAddToCart={addToCart} />
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
          onResetPassword={onResetPassword}
        />
      </Suspense>
    </div>
  )
}

export default function App() {
  const { user, isAdmin, loading, adminReady, signIn, signUp, signOut, resetPassword } = useAuth()
  const { cart, addToCart, removeFromCart, clearCart, isOpen: isCartOpen, openCart, closeCart } = useCart(user)
  const { favorites, favoritedProducts, toggle: toggleFavorite, count: favCount } = useFavorites(user)
  const [isMenuOpen, setIsMenuOpen]         = useState(false)
  const [isFavOpen, setIsFavOpen]           = useState(false)
  const [authModal, setAuthModal]           = useState({ open: false, mode: 'signin' })
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  function openAuth(mode) { setAuthModal({ open: true, mode }) }
  function closeAuth()    { setAuthModal({ open: false, mode: 'signin' }) }

  async function handleCheckout() {
    if (!user) { openAuth('signin'); return }
    setCheckoutLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { cart },
      })
      if (error) throw error
      if (data?.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setCheckoutLoading(false)
    }
  }

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
          signIn={signIn} signUp={signUp} onResetPassword={resetPassword}
          favCount={favCount} onFavOpen={() => setIsFavOpen(true)}
          isFavOpen={isFavOpen} closeFav={() => setIsFavOpen(false)}
          favorites={favorites} favoritedProducts={favoritedProducts}
          onToggleFavorite={toggleFavorite}
          onCheckout={handleCheckout} checkoutLoading={checkoutLoading}
        />
      } />
      <Route path="/reset-password" element={
        <Suspense fallback={null}>
          <ResetPassword />
        </Suspense>
      } />
      <Route path="/checkout/success" element={
        <Suspense fallback={null}>
          <CheckoutSuccess onClearCart={clearCart} />
        </Suspense>
      } />
      <Route path="/checkout/cancel" element={
        <Suspense fallback={null}>
          <CheckoutCancel />
        </Suspense>
      } />
      <Route path="/admin" element={
        <AdminRoute user={user} isAdmin={isAdmin} loading={loading} adminReady={adminReady}>
          <Suspense fallback={null}>
            <AdminDashboard />
          </Suspense>
        </AdminRoute>
      } />
    </Routes>
  )
}
