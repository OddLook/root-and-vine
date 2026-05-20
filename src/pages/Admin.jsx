import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const EMPTY_FORM = {
  name: '', scientific_name: '', description: '', price: '',
  img_url: '', light: '', water: '', humidity: '', difficulty: 'Easy',
  indoor: false, outdoor: false, pet_friendly: false, air_purifying: false, rare: false, discount: 0,
}

function ProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product ? { ...product } : { ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function set(key, value) { setForm(f => ({ ...f, [key]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      ...form,
      price: parseFloat(form.price) || 0,
      discount: parseInt(form.discount) || 0,
    }
    let err
    if (product?.id) {
      ;({ error: err } = await supabase.from('products').update(payload).eq('id', product.id))
    } else {
      const { id: _id, created_at: _ca, ...insert } = payload
      ;({ error: err } = await supabase.from('products').insert(insert))
    }
    setSaving(false)
    if (err) { setError(err.message); return }
    onSaved()
  }

  const field = (label, key, type = 'text', extra = {}) => (
    <label key={key} className="flex flex-col gap-1 text-sm">
      <span className="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wider">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={e => set(key, type === 'number' ? e.target.value : e.target.value)}
        className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#76974a]"
        {...extra}
      />
    </label>
  )

  const toggle = (label, key) => (
    <label key={key} className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        checked={!!form[key]}
        onChange={e => set(key, e.target.checked)}
        className="accent-[#76974a] w-4 h-4"
      />
      <span className="text-white">{label}</span>
    </label>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="bg-[#111] rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.08)]">
          <h2 className="text-white font-semibold">{product?.id ? 'Edit Product' : 'New Product'}</h2>
          <button onClick={onClose} className="text-[rgba(255,255,255,0.4)] hover:text-white text-xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('Name', 'name', 'text', { required: true })}
            {field('Scientific Name', 'scientific_name')}
            {field('Price ($)', 'price', 'number', { step: '0.01', min: '0' })}
            {field('Image URL', 'img_url')}
            {field('Light', 'light')}
            {field('Water', 'water')}
            {field('Humidity', 'humidity')}
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wider">Difficulty</span>
              <select
                value={form.difficulty}
                onChange={e => set('difficulty', e.target.value)}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#76974a]"
              >
                {['Beginner', 'Easy', 'Intermediate', 'Advanced'].map(d => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wider">Discount (%)</span>
              <select
                value={form.discount}
                onChange={e => set('discount', parseInt(e.target.value))}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#76974a]"
              >
                {[0, 10, 20, 30, 40, 50].map(d => <option key={d} value={d}>{d === 0 ? 'None' : `${d}%`}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wider">Description</span>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#76974a] resize-none"
            />
          </label>
          <div className="flex flex-wrap gap-4 pt-1">
            {toggle('Indoor', 'indoor')}
            {toggle('Outdoor', 'outdoor')}
            {toggle('Pet Friendly', 'pet_friendly')}
            {toggle('Air Purifying', 'air_purifying')}
            {toggle('Rare', 'rare')}
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded text-sm text-[rgba(255,255,255,0.6)] hover:text-white border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.3)] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-5 py-2 rounded text-sm bg-[#76974a] text-white hover:bg-[#678649] disabled:opacity-50 transition-colors">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Flag = ({ on }) => (
  <span style={{ color: on ? '#76974a' : 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>
    {on ? '✓' : '—'}
  </span>
)

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | { product } (product=null for new)
  const [deleting, setDeleting] = useState(null)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    setDeleting(id)
    await supabase.from('products').delete().eq('id', id)
    setDeleting(null)
    setProducts(ps => ps.filter(p => p.id !== id))
  }

  function handleSaved() {
    setModal(null)
    load()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-black border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[rgba(255,255,255,0.45)] hover:text-white text-sm flex items-center gap-1.5 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back to Store
          </Link>
          <span className="text-[rgba(255,255,255,0.15)]">/</span>
          <span className="font-semibold text-[#76974a]">Admin Dashboard</span>
        </div>
        <button
          onClick={() => setModal({ product: null })}
          className="flex items-center gap-2 px-4 py-2 bg-[#76974a] hover:bg-[#678649] text-white text-sm rounded transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Add Product
        </button>
      </header>

      {/* Table */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[rgba(255,255,255,0.4)] text-sm">{products.length} products</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="text-[rgba(255,255,255,0.3)] text-sm tracking-widest">Loading…</span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.08)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)] text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium w-12"></th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Price</th>
                  <th className="text-center px-3 py-3 font-medium">In</th>
                  <th className="text-center px-3 py-3 font-medium">Out</th>
                  <th className="text-center px-3 py-3 font-medium">Pet</th>
                  <th className="text-center px-3 py-3 font-medium">Air</th>
                  <th className="text-center px-3 py-3 font-medium">Rare</th>
                  <th className="text-center px-3 py-3 font-medium">Sale</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
                  >
                    <td className="px-4 py-3">
                      {p.img_url ? (
                        <img src={p.img_url} alt={p.name} className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-[rgba(255,255,255,0.05)] rounded flex items-center justify-center text-[rgba(255,255,255,0.2)] text-xs">?</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white font-medium leading-tight">{p.name}</p>
                      <p className="text-[rgba(255,255,255,0.35)] text-xs italic mt-0.5">{p.scientific_name}</p>
                    </td>
                    <td className="px-4 py-3 text-white">${Number(p.price).toFixed(2)}</td>
                    <td className="px-3 py-3 text-center"><Flag on={p.indoor} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.outdoor} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.pet_friendly} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.air_purifying} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.rare} /></td>
                    <td className="px-3 py-3 text-center">
                      {p.discount > 0 ? (
                        <span className="text-[#76974a] font-semibold">{p.discount}%</span>
                      ) : (
                        <span className="text-[rgba(255,255,255,0.2)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setModal({ product: p })}
                          className="px-3 py-1.5 rounded text-xs border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.7)] hover:text-white hover:border-[rgba(255,255,255,0.4)] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="px-3 py-1.5 rounded text-xs border border-[rgba(220,60,60,0.3)] text-[rgba(220,100,100,0.8)] hover:text-[#f87171] hover:border-[rgba(220,60,60,0.6)] disabled:opacity-40 transition-colors"
                        >
                          {deleting === p.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <ProductModal
          product={modal.product}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
