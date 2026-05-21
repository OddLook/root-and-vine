import { Navigate } from 'react-router-dom'

const Spinner = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>Loading…</span>
  </div>
)

export default function AdminRoute({ children, user, isAdmin, loading, adminReady }) {
  if (loading) return <Spinner />
  if (user && !adminReady) return <Spinner />
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return children
}
