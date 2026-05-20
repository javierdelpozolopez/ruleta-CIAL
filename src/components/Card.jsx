const ICON_TYPE = {
  'higiene-manos': 'hands',
  'contaminacion-cruzada': 'cross',
  'crudo-cocido': 'separate',
  epp: 'worker',
  bpm: 'checklist',
  limpieza: 'sparkle',
  desinfeccion: 'spray',
  sanitizante: 'bottle',
  listeria: 'microbe',
  'cadena-frio': 'cold',
  'cuerpo-extrano': 'search',
  trazabilidad: 'trace',
  haccp: 'shield',
  auditoria: 'audit',
  'lavado-botas': 'boot',
  'uso-cofia': 'hairnet',
  'lavado-utensilios': 'utensils',
  'producto-no-conforme': 'box',
  alergenos: 'allergen',
  'control-temperatura': 'thermo',
  'inocuidad-alimentaria': 'food',
}

function IconDrawing({ type }) {
  switch (type) {
    case 'hands':
      return (
        <>
          <path className="icon-line" d="M30 58c8-11 15-13 24-7l10 7M32 67c10 5 27 5 38-4" />
          <path className="icon-accent-line" d="M62 28c4 5 7 9 7 13a7 7 0 0 1-14 0c0-4 3-8 7-13Z" />
        </>
      )
    case 'cross':
      return (
        <>
          <path className="icon-line" d="M28 32h28l-7-7M56 32l-7 7M68 64H40l7 7M40 64l7-7" />
          <path className="icon-accent-line" d="M28 64c9-20 26-24 40-32" />
        </>
      )
    case 'separate':
      return (
        <>
          <rect className="icon-line" x="22" y="34" width="22" height="30" rx="4" />
          <rect className="icon-line" x="52" y="34" width="22" height="30" rx="4" />
          <path className="icon-accent-line" d="M48 29v40" />
        </>
      )
    case 'worker':
      return (
        <>
          <circle className="icon-line" cx="48" cy="29" r="10" />
          <path className="icon-accent-line" d="M33 32c5-13 25-13 30 0" />
          <path className="icon-line" d="M31 72c3-16 8-25 17-25s14 9 17 25" />
        </>
      )
    case 'checklist':
      return (
        <>
          <rect className="icon-line" x="30" y="22" width="38" height="52" rx="4" />
          <path className="icon-accent-line" d="m36 40 5 5 10-11M36 58l5 5 10-11" />
          <path className="icon-line" d="M55 43h7M55 61h7" />
        </>
      )
    case 'sparkle':
      return (
        <>
          <path className="icon-line" d="M25 60h36c7 0 11-5 11-11H35c-7 0-10 4-10 11Z" />
          <path className="icon-accent-line" d="M64 25v18M55 34h18M34 26l4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z" />
        </>
      )
    case 'spray':
      return (
        <>
          <path className="icon-line" d="M29 36h22l10 12v26H33V49l-4-4V36Z" />
          <path className="icon-accent-line" d="M58 28h15M65 38h13M66 50h10" />
        </>
      )
    case 'bottle':
      return (
        <>
          <path className="icon-line" d="M40 23h16v14l8 10v27H32V47l8-10V23Z" />
          <path className="icon-accent-line" d="M39 56h18M42 31h12" />
        </>
      )
    case 'microbe':
      return (
        <>
          <circle className="icon-line" cx="48" cy="48" r="18" />
          <path className="icon-accent-line" d="M48 24v-8M48 80v-8M24 48h-8M80 48h-8M33 33l-6-6M63 63l6 6M63 33l6-6M33 63l-6 6" />
          <path className="icon-line" d="M42 45h.1M54 51h.1" />
        </>
      )
    case 'cold':
      return (
        <>
          <path className="icon-line" d="M48 24v48M31 34l34 28M65 34 31 62" />
          <path className="icon-accent-line" d="M36 24v14H22M60 24v14h14M36 72V58H22M60 72V58h14" />
        </>
      )
    case 'search':
      return (
        <>
          <circle className="icon-line" cx="42" cy="43" r="17" />
          <path className="icon-line" d="m55 56 17 17" />
          <path className="icon-accent-line" d="M39 42h14M46 35v14" />
        </>
      )
    case 'trace':
      return (
        <>
          <rect className="icon-line" x="24" y="28" width="24" height="18" rx="3" />
          <rect className="icon-line" x="52" y="52" width="24" height="18" rx="3" />
          <path className="icon-accent-line" d="M48 37c15 0 20 6 20 15m0 0-6-6m6 6 6-6" />
        </>
      )
    case 'shield':
      return (
        <>
          <path className="icon-line" d="M48 20 68 28v16c0 14-8 24-20 30-12-6-20-16-20-30V28l20-8Z" />
          <path className="icon-accent-line" d="M39 48h18M48 39v18" />
        </>
      )
    case 'audit':
      return (
        <>
          <rect className="icon-line" x="30" y="24" width="35" height="48" rx="4" />
          <path className="icon-line" d="M38 40h18M38 52h14" />
          <path className="icon-accent-line" d="m37 63 5 5 10-12M59 62l11 11" />
          <circle className="icon-accent-line" cx="54" cy="57" r="10" />
        </>
      )
    case 'boot':
      return (
        <>
          <path className="icon-line" d="M33 24h20v28l14 8c5 3 3 12-3 12H31V58h12V24" />
          <path className="icon-accent-line" d="M56 32h16M58 42h14M28 78h40" />
        </>
      )
    case 'hairnet':
      return (
        <>
          <circle className="icon-line" cx="48" cy="45" r="18" />
          <path className="icon-accent-line" d="M29 44c4-22 34-22 38 0M34 39h28M35 50h26" />
          <path className="icon-line" d="M38 66c5 6 15 6 20 0" />
        </>
      )
    case 'utensils':
      return (
        <>
          <path className="icon-line" d="M32 22v52M26 22v18c0 7 12 7 12 0V22M58 22v52M58 22c12 9 12 24 0 32" />
          <path className="icon-accent-line" d="M42 68c9-13 17-18 29-23" />
        </>
      )
    case 'box':
      return (
        <>
          <path className="icon-line" d="M26 38h44v32H26zM26 38l10-12h24l10 12" />
          <path className="icon-accent-line" d="M48 46v12M48 65h.1" />
        </>
      )
    case 'allergen':
      return (
        <>
          <path className="icon-line" d="M48 24c12 10 18 20 18 31a18 18 0 0 1-36 0c0-11 6-21 18-31Z" />
          <path className="icon-line" d="M38 48c7 3 13 3 20 0" />
          <path className="icon-accent-line" d="M69 25 25 69" />
        </>
      )
    case 'thermo':
      return (
        <>
          <path className="icon-line" d="M43 24a8 8 0 0 1 16 0v29a16 16 0 1 1-16 0V24Z" />
          <path className="icon-accent-line" d="M51 32v29M68 33h8M68 43h6M68 53h8" />
        </>
      )
    case 'food':
      return (
        <>
          <path className="icon-line" d="M24 56h48c0 12-10 20-24 20S24 68 24 56ZM34 48c0-10 7-17 14-17s14 7 14 17" />
          <path className="icon-accent-line" d="M48 20 61 26v10c0 9-5 15-13 19-8-4-13-10-13-19V26l13-6Z" />
        </>
      )
    default:
      return (
        <>
          <rect className="icon-line" x="28" y="28" width="40" height="40" rx="6" />
          <path className="icon-accent-line" d="m37 50 8 8 16-19" />
        </>
      )
  }
}

function resolveIconSrc(src) {
  if (!src) return ''
  if (!src.startsWith('/concept-icons/') || src.includes('?')) return src
  return `${src}?v=3`
}

function ConceptIcon({ card }) {
  if (card.src) {
    return (
      <span className="card-illustration" aria-hidden="true">
        <img className="card-icon-image" src={resolveIconSrc(card.src)} alt="" draggable="false" />
      </span>
    )
  }

  return (
    <span className="card-illustration" aria-hidden="true">
      <svg viewBox="0 0 96 96" role="img" focusable="false">
        <circle className="icon-soft" cx="48" cy="48" r="33" />
        <IconDrawing type={ICON_TYPE[card.pairId]} />
      </svg>
    </span>
  )
}

export default function Card({ card, failed, onSelect }) {
  const classes = ['memory-card', card.isSelected ? 'is-selected' : '', card.isMatched ? 'is-matched' : '', failed ? 'is-failed' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      type="button"
      onClick={() => onSelect(card.id)}
      disabled={card.isMatched}
      aria-label={`tarjeta: ${card.label}`}
      aria-pressed={card.isSelected || card.isMatched}
    >
      <span className="card-inner">
        <span className="card-face card-front">
          <ConceptIcon card={card} />
          {card.kind === 'image' && card.src ? <img src={card.src} alt={card.alt} /> : <span className="card-label">{card.label}</span>}
        </span>
      </span>
    </button>
  )
}
