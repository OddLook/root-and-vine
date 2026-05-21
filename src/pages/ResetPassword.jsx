import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.07)',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
}

export default function ResetPassword() {
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState(null)
  const [success, setSuccess]     = useState(false)
  const [loading, setLoading]     = useState(false)
  const [validSession, setValidSession] = useState(false)

  useEffect(() => {
    // Supabase processes the recovery token from the URL hash automatically.
    // PASSWORD_RECOVERY fires once the session is established.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setValidSession(true)
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setValidSession(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) setError(error.message)
    else { setSuccess(true); supabase.auth.signOut() }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#111', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '1.25rem', padding: '2.5rem 2.25rem 2rem', boxSizing: 'border-box' }}>

        <p style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.2rem', fontWeight: 700, textAlign: 'center', color: '#fff', letterSpacing: '0.02em', marginBottom: '2rem' }}>
          Root &amp; Vine
        </p>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}>Password updated</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              You can now sign in with your new password.
            </p>
            <Link
              to="/"
              style={{ display: 'inline-block', padding: '0.75rem 2rem', background: '#678649', color: '#fff', borderRadius: '999px', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Go to shop
            </Link>
          </div>
        ) : !validSession ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This link is invalid or has expired.<br />Please request a new one.
            </p>
            <Link
              to="/"
              style={{ color: '#678649', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 600 }}
            >
              ← Back to shop
            </Link>
          </div>
        ) : (
          <>
            <p style={{ fontWeight: 600, color: '#fff', fontSize: '1rem', marginBottom: '0.35rem' }}>Set new password</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Choose a new password for your account.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                style={inputStyle}
              />

              {error && (
                <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ marginTop: '0.25rem', padding: '0.875rem', background: loading ? 'rgba(103,134,73,0.6)' : '#678649', color: '#fff', border: 'none', borderRadius: '999px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s ease', width: '100%' }}
              >
                {loading ? '…' : 'Update password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
