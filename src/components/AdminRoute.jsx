import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children, user, isAdmin, loading }) {
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>Loading…</span>
      </div>
    )
  }
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return children
}
