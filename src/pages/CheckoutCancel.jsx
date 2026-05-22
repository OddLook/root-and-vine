import { Link } from 'react-router-dom'

export default function CheckoutCancel() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#111', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '1.25rem', padding: '2.5rem 2.25rem 2rem', boxSizing: 'border-box', textAlign: 'center' }}>

        <p style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em', marginBottom: '2rem' }}>
          Root &amp; Vine
        </p>

        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <p style={{ fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
          Payment cancelled
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '2rem' }}>
          No charge was made. Your cart is still saved — head back whenever you're ready.
        </p>

        <Link
          to="/"
          style={{ display: 'inline-block', padding: '0.875rem 2.5rem', background: '#678649', color: '#fff', borderRadius: '999px', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}
        >
          Back to shop
        </Link>
      </div>
    </div>
  )
}
