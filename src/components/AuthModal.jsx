import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onSignIn, onSignUp }) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Sync mode and reset form whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setEmail('')
      setPassword('')
      setError(null)
      setSuccess(false)
    }
  }, [isOpen, initialMode])

  function switchMode(next) {
    setMode(next)
    setError(null)
    setSuccess(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mode === 'signup') {
      const err = await onSignUp(email, password)
      setLoading(false)
      if (err) {
        setError(err.message)
      } else {
        setSuccess(true)
      }
    } else {
      const err = await onSignIn(email, password)
      setLoading(false)
      if (err) {
        setError(err.message)
      } else {
        onClose()
      }
    }
  }

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '0.65rem 0.875rem' : '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.07)',
    color: '#fff',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    outline: 'none',
  }

  const modalStyle = isMobile
    ? {
        maxWidth: '310px',
        width: 'calc(100% - 2.5rem)',
        padding: '1.75rem 1.5rem 1.5rem',
        borderRadius: '1rem',
      }
    : {
        maxWidth: '420px',
        width: '100%',
        padding: '2.5rem 2.25rem 2rem',
        borderRadius: '1.25rem',
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.72)',
              zIndex: 200,
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              background: '#111',
              border: '1px solid rgba(255,255,255,0.10)',
              color: '#fff',
              ...modalStyle,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Brand */}
            <p style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: isMobile ? '1.05rem' : '1.2rem',
              fontWeight: 700,
              marginBottom: isMobile ? '1.25rem' : '1.75rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>
              Root &amp; Vine
            </p>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              marginBottom: isMobile ? '1.25rem' : '2rem',
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
                    padding: isMobile ? '0.45rem 0' : '0.55rem 0',
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

            {success ? (
              <div style={{ textAlign: 'center', padding: isMobile ? '1rem 0' : '1.5rem 0' }}>
                <div style={{ fontSize: isMobile ? '1.6rem' : '2rem', marginBottom: '0.75rem' }}>🌱</div>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: isMobile ? '0.95rem' : '1rem' }}>Check your email</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  We sent a confirmation link to<br />
                  <span style={{ color: '#fff' }}>{email}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.75rem' : '1rem' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  style={inputStyle}
                />

                {error && (
                  <p style={{ color: '#f87171', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: isMobile ? '0.25rem' : '0.5rem',
                    padding: isMobile ? '0.75rem' : '1rem',
                    background: loading ? 'rgba(103,134,73,0.6)' : '#678649',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {loading ? '…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
                </button>
              </form>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: isMobile ? '0.85rem' : '1.1rem',
                right: isMobile ? '0.85rem' : '1.1rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.45)', padding: '4px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
