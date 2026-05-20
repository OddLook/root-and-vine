import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useProducts({ pet_friendly, air_purifying, outdoor, rare, sale, difficulty } = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (isFirstLoad.current) setLoading(true)

    let query = supabase.from('products').select('*')
    if (pet_friendly)  query = query.eq('pet_friendly', true)
    if (air_purifying) query = query.eq('air_purifying', true)
    if (outdoor)       query = query.eq('outdoor', true)
    if (rare)          query = query.eq('rare', true)
    if (sale)          query = query.gt('discount', 0)
    if (difficulty)    query = query.eq('difficulty', difficulty)
    query = query.order('created_at', { ascending: true })

    query.then(({ data }) => {
      setProducts(data ?? [])
      setLoading(false)
      isFirstLoad.current = false
    })
  }, [pet_friendly, air_purifying, outdoor, rare, sale, difficulty])

  return { products, loading }
}
