const BOOL_FILTERS = [
  { key: 'pet_friendly',  label: 'Pet Friendly' },
  { key: 'air_purifying', label: 'Air Purifying' },
  { key: 'outdoor',       label: 'Outdoor' },
  { key: 'rare',          label: 'Rare' },
  { key: 'sale',          label: 'On Sale' },
]

const DIFFICULTIES = ['Beginner', 'Easy', 'Intermediate', 'Advanced']

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 whitespace-nowrap"
      style={{
        padding: '0.38rem 1rem',
        borderRadius: '999px',
        border: active ? '1.5px solid #111' : '1px solid #c8c4be',
        background: active ? '#111' : '#fff',
        color: active ? '#fff' : '#555',
        fontSize: '0.8rem',
        fontWeight: active ? 600 : 400,
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </button>
  )
}

export default function FilterBar({ filters, onToggle, onDifficulty, onClear, total }) {
  const hasActive = Object.entries(filters).some(([, v]) => v !== false && v !== null)

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>

        {/* Boolean filter chips */}
        {BOOL_FILTERS.map(({ key, label }) => (
          <Chip key={key} active={filters[key]} onClick={() => onToggle(key)}>
            {label}
          </Chip>
        ))}

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: '#c8c4be', margin: '0 0.25rem', flexShrink: 0 }} />

        {/* Difficulty chips — mutually exclusive */}
        {DIFFICULTIES.map(d => (
          <Chip key={d} active={filters.difficulty === d} onClick={() => onDifficulty(d)}>
            {d}
          </Chip>
        ))}

        {/* Clear button */}
        {hasActive && (
          <button
            onClick={onClear}
            className="cursor-pointer transition-opacity hover:opacity-60"
            style={{
              background: 'none',
              border: 'none',
              color: '#678649',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginLeft: '0.25rem',
              padding: '0.38rem 0.5rem',
              letterSpacing: '0.01em',
            }}
          >
            Clear ×
          </button>
        )}
      </div>

      {/* Result count — only when filters are active */}
      {hasActive && (
        <p style={{ marginTop: '0.85rem', fontSize: '0.78rem', color: '#999', letterSpacing: '0.02em' }}>
          {total === 0
            ? 'No plants match your filters'
            : `${total} plant${total === 1 ? '' : 's'} found`}
        </p>
      )}
    </div>
  )
}
