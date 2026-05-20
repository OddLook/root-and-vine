import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCart(user) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from DB when user is available; clear on logout
  useEffect(() => {
    if (!user?.id) {
      setCart([])
      return
    }
    supabase
      .from('cart_items')
      .select('id, quantity, products(*)')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) {
          setCart(data.map(row => ({
            ...row.products,
            qty: row.quantity,
            cartItemId: row.id,
          })))
        }
      })
  }, [user?.id])

  async function addToCart(product) {
    if (user) {
      const existing = cart.find(i => i.id === product.id)
      if (existing) {
        setCart(prev => prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        ))
        await supabase.from('cart_items')
          .update({ quantity: existing.qty + 1 })
          .eq('id', existing.cartItemId)
      } else {
        setCart(prev => [...prev, { ...product, qty: 1, cartItemId: null }])
        const { data } = await supabase.from('cart_items')
          .insert({ user_id: user.id, product_id: product.id, quantity: 1 })
          .select('id')
          .single()
        if (data) {
          setCart(prev => prev.map(i =>
            i.id === product.id ? { ...i, cartItemId: data.id } : i
          ))
        }
      }
    } else {
      setCart(prev => {
        const existing = prev.find(i => i.id === product.id)
        if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        return [...prev, { ...product, qty: 1 }]
      })
    }
    setIsOpen(true)
  }

  async function removeFromCart(productId) {
    setCart(prev => prev.filter(i => i.id !== productId))
    if (user) {
      await supabase.from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
    }
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    isOpen,
    openCart:  () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }
}
