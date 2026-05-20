import { useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }
}
