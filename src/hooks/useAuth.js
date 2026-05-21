import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const INACTIVITY_MS = 30 * 60 * 1000

async function fetchIsAdmin(userId) {
  if (!userId) return false
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  return data?.role === 'admin'
}

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Resolve session + admin role before clearing loading,
    // preventing AdminRoute from redirecting admins on initial load.
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      setIsAdmin(await fetchIsAdmin(u?.id))
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      setIsAdmin(await fetchIsAdmin(u?.id))
    })

    return () => subscription.unsubscribe()
  }, [])

  // Auto sign-out after 30 min of inactivity
  useEffect(() => {
    if (!user) return
    let timer = setTimeout(() => supabase.auth.signOut(), INACTIVITY_MS)
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => supabase.auth.signOut(), INACTIVITY_MS) }
    const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart']
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))
    return () => { clearTimeout(timer); events.forEach(e => window.removeEventListener(e, reset)) }
  }, [user])

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return error
  }

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, isAdmin, loading, signUp, signIn, signOut }
}
