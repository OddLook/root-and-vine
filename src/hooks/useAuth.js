import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const INACTIVITY_MS = 30 * 60 * 1000

export function useAuth() {
  const [user, setUser]             = useState(null)
  const [isAdmin, setIsAdmin]       = useState(false)
  const [loading, setLoading]       = useState(true)
  const [adminReady, setAdminReady] = useState(false)

  // Session — reads from localStorage, resolves fast, never hangs
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => setUser(session?.user ?? null))
      .catch(() => {})
      .finally(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Admin role — separate effect, never blocks main loading
  useEffect(() => {
    if (!user?.id) {
      setIsAdmin(false)
      setAdminReady(true)
      return
    }
    setAdminReady(false)
    supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      .then(({ data }) => setIsAdmin(data?.role === 'admin'))
      .catch(() => setIsAdmin(false))
      .finally(() => setAdminReady(true))
  }, [user?.id])

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
    return () => { clearTimeout(timer); events.forEach(e => window.removeEventListener(e, reset)) }
  }, [user])

  const signUp  = async (email, password) => (await supabase.auth.signUp({ email, password })).error
  const signIn  = async (email, password) => (await supabase.auth.signInWithPassword({ email, password })).error
  const signOut = async () => supabase.auth.signOut()

  return { user, isAdmin, loading, adminReady, signUp, signIn, signOut }
}
