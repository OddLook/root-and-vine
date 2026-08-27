import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

const FILTERS = [
  { key: 'indoor',       label: 'Indoor' },
  { key: 'pet_friendly', label: 'Pet Friendly' },
  { key: 'air_purifying',label: 'Air Purifying' },
  { key: 'outdoor',      label: 'Outdoor' },
  { key: 'rare',         label: 'Rare' },
]

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 whitespace-nowrap"
      style={{
        padding: '0.4rem 1.1rem',
        borderRadius: '999px',
        border: active ? '1.5px solid #111' : '1px solid #c8c4be',
        background: active ? '#111' : '#fff',
        color: active ? '#fff' : '#555',
        fontSize: '0.8rem',
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </button>
  )
}

function SaleChip({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 whitespace-nowrap"
      style={{
        padding: '0.4rem 1.1rem',
        borderRadius: '999px',
        border: '1.5px solid #5c8d3f',
        background: active ? '#5c8d3f' : 'transparent',
        color: active ? '#fff' : '#5c8d3f',
        fontSize: '0.8rem',
        fontWeight: 600,
      }}
    >
      On Sale
    </button>
  )
}

export default function FilterBar({ filters, onToggle, onClear, total }) {
  const [isOpen, setIsOpen] = useState(false)

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => k !== 'difficulty' && v !== false && v !== null
  ).length

  const hasActive = activeCount > 0

  return (
    <div style={{ marginBottom: '2.5rem' }}>

      {/* Trigger button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => setIsOpen(o => !o)}
          className="cursor-pointer transition-all duration-150"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            borderRadius: '999px',
            border: isOpen || hasActive ? '1.5px solid #111' : '1px solid #c8c4be',
            background: isOpen || hasActive ? '#111' : '#fff',
            color: isOpen || hasActive ? '#fff' : '#555',
            fontSize: '0.8rem',
            fontWeight: 500,
          }}
        >
          <SlidersHorizontal size={13} strokeWidth={2.5} />
          Filter
          {hasActive && (
            <span style={{
              background: '#5c8d3f',
              color: '#fff',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '0.05rem 0.45rem',
              lineHeight: 1.6,
            }}>
              {activeCount}
            </span>
          )}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronDown size={11} strokeWidth={2.5} />
          </motion.span>
        </button>

        {/* Inline clear when closed and filters active */}
        {hasActive && !isOpen && (
          <button
            onClick={onClear}
            className="cursor-pointer hover:opacity-60 transition-opacity"
            style={{ background: 'none', border: 'none', color: '#5c8d3f', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}
          >
            Clear ×
          </button>
        )}

        {hasActive && (
          <span style={{ color: '#999', fontSize: '0.78rem' }}>
            {total} plant{total === 1 ? '' : 's'}
          </span>
        )}
      </div>

      {/* Expandable chip row */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chips"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', paddingTop: '0.85rem' }}>
              {FILTERS.map(({ key, label }) => (
                <Chip key={key} active={filters[key]} onClick={() => onToggle(key)}>
                  {label}
                </Chip>
              ))}
              <SaleChip active={filters.sale} onClick={() => onToggle('sale')} />

              {hasActive && (
                <button
                  onClick={onClear}
                  className="cursor-pointer hover:opacity-60 transition-opacity"
                  style={{ background: 'none', border: 'none', color: '#5c8d3f', fontSize: '0.8rem', fontWeight: 600, padding: '0.4rem 0.5rem' }}
                >
                  Clear ×
                </button>
              )}
            </div>

            {total === 0 && hasActive && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#999' }}>
                No plants match your filters
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
