import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFavorites(user) {
  const [favorites, setFavorites] = useState(new Set())
  const [favoritedProducts, setFavoritedProducts] = useState([])

  useEffect(() => {
    if (!user?.id) {
      setFavorites(new Set())
      setFavoritedProducts([])
      return
    }
    supabase
      .from('favorites')
      .select('product_id, products(*)')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setFavorites(new Set((data ?? []).map(r => r.product_id)))
        setFavoritedProducts((data ?? []).map(r => r.products).filter(Boolean))
      })
      .catch(() => {})
  }, [user?.id])

  async function toggle(product) {
    if (!user?.id) return
    const isFav = favorites.has(product.id)
    if (isFav) {
      setFavorites(prev => { const next = new Set(prev); next.delete(product.id); return next })
      setFavoritedProducts(prev => prev.filter(p => p.id !== product.id))
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', product.id)
    } else {
      setFavorites(prev => new Set([...prev, product.id]))
      setFavoritedProducts(prev => [...prev, product])
      await supabase.from('favorites').insert({ user_id: user.id, product_id: product.id })
    }
  }

  return { favorites, favoritedProducts, toggle, count: favorites.size }
}
