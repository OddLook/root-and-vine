import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { MorphIcon } from 'morphicons/react'
import { Pencil, Trash2, Check } from 'lucide'
import { ImageOff, ArrowLeft, Plus, Save, X, Wrench } from 'lucide-react'

const BUCKET = 'product-images'

const EMPTY_FORM = {
  name: '', scientific_name: '', description: '', price: '',
  img_url: '', light: '', water: '', humidity: '', difficulty: 'Easy',
  indoor: false, outdoor: false, pet_friendly: false, air_purifying: false, rare: false, discount: 0,
}

// ── Toast ─────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([])
  const show = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(ts => [...ts, { id, message, type }])
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3500)
  }, [])
  return { toasts, show }
}

function ToastStack({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-[200] pointer-events-none" style={{ minWidth: 260 }}>
      {toasts.map(t => (
        <div
          key={t.id}
          className="px-4 py-3 rounded-lg text-sm font-medium shadow-xl text-white text-center"
          style={{ background: t.type === 'error' ? '#dc2626' : '#72a744' }}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ── Image upload helpers ──────────────────────────────────────────
async function uploadImage(file) {
  const ext = file.name.split('.').pop().toLowerCase()
  const path = `${Date.now()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// ── Product modal ─────────────────────────────────────────────────
function ProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product ? { ...product } : { ...EMPTY_FORM })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(product?.img_url || null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef()

  function set(key, value) { setForm(f => ({ ...f, [key]: value })) }

  function handleFileChange(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    set('img_url', '') // clear manual URL when a file is chosen
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      let img_url = form.img_url
      if (file) img_url = await uploadImage(file)

      const { id: _id, created_at: _ca, ...fields } = form
      const payload = {
        ...fields,
        img_url,
        price: parseFloat(form.price) || 0,
        discount: parseInt(form.discount) || 0,
      }

      if (product?.id) {
        const { data, error: err } = await supabase
          .from('products').update(payload).eq('id', product.id).select().single()
        if (err) throw err
        onSaved(data, 'updated')
      } else {
        const { data, error: err } = await supabase
          .from('products').insert(payload).select().single()
        if (err) throw err
        onSaved(data, 'created')
      }
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  const inputCls = "bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#72a744]"
  const labelCls = "flex flex-col gap-1 text-sm"
  const capCls   = "text-[rgba(255,255,255,0.45)] text-xs uppercase tracking-wider"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="bg-[#111] rounded-xl border border-[#72a744]/20 w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#72a744]/20 sticky top-0 bg-[#111] z-10">
          <h2 className="text-white font-semibold text-lg">{product?.id ? 'Edit Product' : 'New Product'}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-6">

          {/* Image section */}
          <div className="flex gap-4 items-start">
            <div
              className="w-24 h-24 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1a1a1a] flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-[#72a744] transition-colors"
              onClick={() => fileRef.current.click()}
              title="Click to upload image"
            >
              {preview
                ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                : <ImageOff size={24} strokeWidth={1.5} color="rgba(255,255,255,0.2)" />
              }
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="w-full px-3 py-2 rounded border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)] hover:text-white hover:border-[#72a744] text-sm transition-colors text-left"
              >
                {file ? file.name : 'Upload image…'}
              </button>
              <label className={labelCls}>
                <span className={capCls}>Or paste URL</span>
                <input
                  type="url"
                  value={form.img_url}
                  onChange={e => { set('img_url', e.target.value); if (e.target.value) { setFile(null); setPreview(e.target.value) } }}
                  placeholder="https://…"
                  className={inputCls}
                />
              </label>
            </div>
          </div>

          {/* Core fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={labelCls}>
              <span className={capCls}>Name *</span>
              <input type="text" value={form.name} onChange={e => set('name', e.target.value)} required className={inputCls} />
            </label>
            <label className={labelCls}>
              <span className={capCls}>Scientific Name</span>
              <input type="text" value={form.scientific_name} onChange={e => set('scientific_name', e.target.value)} className={inputCls} />
            </label>
            <label className={labelCls}>
              <span className={capCls}>Price ($)</span>
              <input type="number" step="0.01" min="0" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} />
            </label>
            <label className={labelCls}>
              <span className={capCls}>Discount</span>
              <select value={form.discount} onChange={e => set('discount', parseInt(e.target.value))} className={inputCls}>
                {[0, 10, 20, 30, 40, 50].map(d => (
                  <option key={d} value={d}>{d === 0 ? 'None' : `${d}%`}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              <span className={capCls}>Light</span>
              <input type="text" value={form.light} onChange={e => set('light', e.target.value)} className={inputCls} />
            </label>
            <label className={labelCls}>
              <span className={capCls}>Water</span>
              <input type="text" value={form.water} onChange={e => set('water', e.target.value)} className={inputCls} />
            </label>
            <label className={labelCls}>
              <span className={capCls}>Humidity</span>
              <input type="text" value={form.humidity} onChange={e => set('humidity', e.target.value)} className={inputCls} />
            </label>
            <label className={labelCls}>
              <span className={capCls}>Difficulty</span>
              <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)} className={inputCls}>
                {['Beginner', 'Easy', 'Intermediate', 'Advanced'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
          </div>

          <label className={labelCls}>
            <span className={capCls}>Description</span>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </label>

          {/* Boolean flags */}
          <div className="flex flex-wrap gap-5">
            {[
              ['indoor',       'Indoor'],
              ['outdoor',      'Outdoor'],
              ['pet_friendly', 'Pet Friendly'],
              ['air_purifying','Air Purifying'],
              ['rare',         'Rare'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!form[key]}
                  onChange={e => set(key, e.target.checked)}
                  className="accent-[#72a744] w-4 h-4"
                />
                <span className="text-white">{label}</span>
              </label>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end items-center gap-3 pt-5 border-t border-[rgba(255,255,255,0.08)]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cancel"
              title="Cancel"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[rgba(255,255,255,0.6)] hover:text-white border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.35)] transition-colors cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
            <button
              type="submit"
              disabled={saving}
              aria-label={product?.id ? 'Save changes' : 'Add product'}
              title={saving ? 'Saving…' : (product?.id ? 'Save changes' : 'Add product')}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#5c8d3f] text-white hover:bg-[#72a744] disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Save size={18} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────
const Flag = ({ on }) => (
  <span style={{ color: on ? '#72a744' : 'rgba(255,255,255,0.18)', fontSize: '0.85rem' }}>
    {on ? '✓' : '—'}
  </span>
)

// ── Admin Dashboard ───────────────────────────────────────────────
export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState(null)   // null | { product }
  const [deleting, setDeleting] = useState(null)
  const [feedback, setFeedback] = useState({ id: null, type: null }) // transient edit/delete click feedback
  const { toasts, show }        = useToast()

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function handleEditClick(product) {
    setFeedback({ id: product.id, type: 'edit' })
    setModal({ product })
    setTimeout(() => setFeedback({ id: null, type: null }), 700)
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setDeleting(product.id)
    setFeedback({ id: product.id, type: 'delete' })
    const { error } = await supabase.from('products').delete().eq('id', product.id)
    if (error) {
      setDeleting(null)
      setFeedback({ id: null, type: null })
      show('Failed to delete product', 'error')
      return
    }
    setTimeout(() => {
      setProducts(ps => ps.filter(p => p.id !== product.id))
      setDeleting(null)
      setFeedback({ id: null, type: null })
      show(`"${product.name}" deleted`)
    }, 500)
  }

  function handleSaved(savedProduct, action) {
    setModal(null)
    setProducts(ps =>
      action === 'updated'
        ? ps.map(p => p.id === savedProduct.id ? savedProduct : p)
        : [...ps, savedProduct]
    )
    show(action === 'updated' ? `"${savedProduct.name}" updated` : `"${savedProduct.name}" added`)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Header */}
      <header
        className="bg-black border-b border-[#72a744]/20 flex items-center justify-between"
        style={{
          paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
          paddingTop: '1.1rem',
          paddingBottom: '1.1rem',
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-[rgba(255,255,255,0.45)] hover:text-white text-sm flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Store
          </Link>
          <span className="text-[rgba(255,255,255,0.15)]">/</span>
          <span className="flex items-center gap-2 font-semibold text-[#72a744] text-base">
            <Wrench size={17} strokeWidth={2} />
            Admin Dashboard
          </span>
        </div>
        <button
          onClick={() => setModal({ product: null })}
          aria-label="Add product"
          title="Add product"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5c8d3f] hover:bg-[#72a744] text-white transition-colors cursor-pointer"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </header>

      {/* Content */}
      <div
        style={{
          paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <p className="text-[rgba(255,255,255,0.35)] text-sm mb-4">{products.length} products</p>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="text-[rgba(255,255,255,0.25)] text-sm tracking-widest">Loading…</span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#72a744]/20">
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
                      {p.img_url
                        ? <img src={p.img_url} alt={p.name} className="w-10 h-10 object-cover rounded" />
                        : <div className="w-10 h-10 bg-[rgba(255,255,255,0.05)] rounded flex items-center justify-center text-[rgba(255,255,255,0.15)] text-xs">?</div>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white font-medium leading-tight">{p.name}</p>
                      <p className="text-[rgba(255,255,255,0.3)] text-xs italic mt-0.5">{p.scientific_name}</p>
                    </td>
                    <td className="px-4 py-3 text-white">${Number(p.price).toFixed(2)}</td>
                    <td className="px-3 py-3 text-center"><Flag on={p.indoor} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.outdoor} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.pet_friendly} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.air_purifying} /></td>
                    <td className="px-3 py-3 text-center"><Flag on={p.rare} /></td>
                    <td className="px-3 py-3 text-center">
                      {p.discount > 0
                        ? <span className="text-[#72a744] font-semibold">{p.discount}%</span>
                        : <span className="text-[rgba(255,255,255,0.18)]">—</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleEditClick(p)}
                          aria-label={`Edit ${p.name}`}
                          title="Edit"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.7)] hover:text-white hover:border-[rgba(255,255,255,0.4)] transition-colors cursor-pointer"
                        >
                          <MorphIcon
                            icon={feedback.id === p.id && feedback.type === 'edit' ? Check : Pencil}
                            spring="smooth"
                            size={14}
                            strokeWidth={2.5}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          disabled={deleting === p.id}
                          aria-label={`Delete ${p.name}`}
                          title="Delete"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(220,60,60,0.3)] text-[rgba(220,100,100,0.8)] hover:text-[#f87171] hover:border-[rgba(220,60,60,0.6)] disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <MorphIcon
                            icon={feedback.id === p.id && feedback.type === 'delete' ? Check : Trash2}
                            spring="smooth"
                            size={14}
                            strokeWidth={2.5}
                          />
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

      <ToastStack toasts={toasts} />
    </div>
  )
}
