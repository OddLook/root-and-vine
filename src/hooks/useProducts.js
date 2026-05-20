import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setError(err)
        else setProducts(data ?? [])
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}
