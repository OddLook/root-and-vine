import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, X } from 'lucide-react'

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onSignIn, onSignUp, onResetPassword }) {
  const [mode, setMode]         = useState(initialMode)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [success, setSuccess]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setEmail('')
      setPassword('')
      setError(null)
      setSuccess(false)
    }
  }, [isOpen, initialMode])

  function switchMode(next) { setMode(next); setError(null); setSuccess(false) }

  async function handleDemo() {
    setDemoLoading(true)
    setError(null)
    const err = await onSignIn('demo@rootandvine.com', 'Demo1234!')
    setDemoLoading(false)
    if (err) setError(err.message)
    else onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (mode === 'signup') {
      const err = await onSignUp(email, password)
      setLoading(false)
      if (err) setError(err.message)
      else setSuccess(true)
    } else if (mode === 'forgot') {
      const err = await onResetPassword(email)
      setLoading(false)
      if (err) setError(err.message)
      else setSuccess(true)
    } else {
      const err = await onSignIn(email, password)
      setLoading(false)
      if (err) setError(err.message)
      else onClose()
    }
  }

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '0.65rem 0.875rem' : '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.07)',
    color: '#fff',
    fontSize: '1rem', // ≥16px prevents iOS auto-zoom on focus
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        /* Backdrop is the flex centering container.
           Avoids top:50%+translate which goes off-screen when the
           soft keyboard shrinks the mobile viewport. */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '1.5rem',
            boxSizing: 'border-box',
            overflowY: 'auto',
          }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.10)',
              color: '#fff',
              borderRadius: isMobile ? '0.875rem' : '1.25rem',
              padding: isMobile ? '1.5rem 1.25rem 1.25rem' : '2.5rem 2.25rem 2rem',
              width: '100%',
              maxWidth: isMobile ? '340px' : '420px',
              maxHeight: 'calc(100dvh - 2rem)',
              overflowY: 'auto',
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            {/* Brand */}
            <p style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: isMobile ? '1rem' : '1.2rem',
              fontWeight: 700,
              marginBottom: isMobile ? '1.1rem' : '1.75rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>
              Root &amp; Vine
            </p>

            {/* Tabs — hidden in forgot mode */}
            {mode !== 'forgot' && (
              <div style={{
                display: 'flex',
                marginBottom: isMobile ? '1.1rem' : '2rem',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '0.6rem',
                padding: '3px',
              }}>
                {[['signin', 'Sign In'], ['signup', 'Create Account']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => switchMode(key)}
                    style={{
                      flex: 1,
                      padding: isMobile ? '0.4rem 0' : '0.55rem 0',
                      borderRadius: '0.45rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.18s ease',
                      background: mode === key ? '#fff' : 'transparent',
                      color: mode === key ? '#111' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Forgot header — back button + title */}
            {mode === 'forgot' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: isMobile ? '1.25rem' : '1.75rem' }}>
                <button
                  onClick={() => switchMode('signin')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', padding: '4px' }}
                  aria-label="Back to sign in"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                <p style={{ fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1rem', margin: 0 }}>Reset password</p>
              </div>
            )}

            {success ? (
              <div style={{ textAlign: 'center', padding: isMobile ? '0.75rem 0' : '1.5rem 0' }}>
                <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.75rem' }}>
                  {mode === 'forgot' ? '📬' : '🌱'}
                </div>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  {mode === 'forgot' ? 'Check your email' : 'Check your email'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                  {mode === 'forgot' ? (
                    <>We sent a password reset link to<br /><span style={{ color: '#fff' }}>{email}</span></>
                  ) : (
                    <>We sent a confirmation link to<br /><span style={{ color: '#fff' }}>{email}</span></>
                  )}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.65rem' : '1rem' }}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={inputStyle}
                />

                {mode !== 'forgot' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      style={inputStyle}
                    />
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', textAlign: 'right', padding: '0 0.125rem' }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                )}

                {error && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: isMobile ? '0.15rem' : '0.5rem',
                    padding: isMobile ? '0.7rem' : '1rem',
                    background: loading ? 'rgba(92,141,63,0.6)' : '#5c8d3f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease',
                    width: '100%',
                  }}
                >
                  {loading ? '…' : mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send reset link' : 'Sign In'}
                </button>
              </form>
            )}

            {/* Demo button — only in signin/signup, not forgot */}
            {mode !== 'forgot' && !success && (
              <div style={{ marginTop: isMobile ? '0.75rem' : '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: isMobile ? '0.75rem' : '1rem' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>o</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                </div>
                <button
                  type="button"
                  onClick={handleDemo}
                  disabled={demoLoading || loading}
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.7rem' : '0.875rem',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: demoLoading ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: demoLoading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {demoLoading ? '…' : 'View demo'}
                </button>
              </div>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: isMobile ? '0.75rem' : '1.1rem',
                right: isMobile ? '0.75rem' : '1.1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.45)',
                padding: '4px',
                lineHeight: 0,
              }}
            >
              <X size={16} strokeWidth={2} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
