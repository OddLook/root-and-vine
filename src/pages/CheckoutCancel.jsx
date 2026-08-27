import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

export default function CheckoutCancel() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#111', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '1.25rem', padding: '2.5rem 2.25rem 2rem', boxSizing: 'border-box', textAlign: 'center' }}>

        <p style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em', marginBottom: '2rem' }}>
          Root &amp; Vine
        </p>

        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <X size={26} strokeWidth={2.5} color="rgba(255,255,255,0.4)" />
        </div>

        <p style={{ fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
          Payment cancelled
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '2rem' }}>
          No charge was made. Your cart is still saved — head back whenever you're ready.
        </p>

        <Link
          to="/"
          style={{ display: 'inline-block', padding: '0.875rem 2.5rem', background: '#5c8d3f', color: '#fff', borderRadius: '999px', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}
        >
          Back to shop
        </Link>
      </div>
    </div>
  )
}
