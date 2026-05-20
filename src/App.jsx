import { lazy, Suspense, useState } from 'react'
import './index.css'
import Topbar from './components/Topbar'
import ProductFeed from './components/ProductFeed'
import { useCart } from './hooks/useCart'

const CartDrawer = lazy(() => import('./components/CartDrawer'))
const MenuDrawer = lazy(() => import('./components/MenuDrawer'))

export default function App() {
  const { cart, addToCart, removeFromCart, isOpen, openCart, closeCart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Topbar
        cartCount={cart.length}
        onCartOpen={openCart}
        onMenuOpen={() => setIsMenuOpen(true)}
      />
      <ProductFeed onAddToCart={addToCart} />
      <Suspense fallback={null}>
        <CartDrawer
          isOpen={isOpen}
          onClose={closeCart}
          cart={cart}
          onRemove={removeFromCart}
        />
      </Suspense>
      <Suspense fallback={null}>
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </Suspense>
    </div>
  )
}
