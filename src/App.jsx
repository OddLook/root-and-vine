import { lazy, Suspense } from 'react'
import './index.css'
import Topbar from './components/Topbar'
import ProductFeed from './components/ProductFeed'
import { useCart } from './hooks/useCart'

const CartDrawer = lazy(() => import('./components/CartDrawer'))

export default function App() {
  const { cart, addToCart, removeFromCart, isOpen, openCart, closeCart } = useCart()

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Topbar cartCount={cart.length} onCartOpen={openCart} />
      <ProductFeed onAddToCart={addToCart} />
      <Suspense fallback={null}>
        <CartDrawer
          isOpen={isOpen}
          onClose={closeCart}
          cart={cart}
          onRemove={removeFromCart}
        />
      </Suspense>
    </div>
  )
}
