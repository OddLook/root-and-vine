import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const INACTIVITY_MS = 30 * 60 * 1000 // 30 minutes

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Auto sign-out after 30 min of inactivity
  useEffect(() => {
    if (!user) return

    let timer = setTimeout(() => supabase.auth.signOut(), INACTIVITY_MS)

    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => supabase.auth.signOut(), INACTIVITY_MS)
    }

    const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart']
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))

    return () => {
      clearTimeout(timer)
      events.forEach(e => window.removeEventListener(e, reset))
    }
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

  return { user, loading, signUp, signIn, signOut }
}
