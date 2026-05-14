import logoCial from '../assets/images/logo-cial-transparent.png'

const KIND_LABELS = {
  word: 'concepto',
  definition: 'definición',
  practice: 'práctica',
  meaning: 'significado',
  image: 'imagen',
}

export default function Card({ card, failed, onSelect }) {
  const visible = card.isFlipped || card.isMatched
  const classes = ['memory-card', visible ? 'is-flipped' : '', card.isMatched ? 'is-matched' : '', failed ? 'is-failed' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      type="button"
      onClick={() => onSelect(card.id)}
      disabled={card.isMatched}
      aria-label={visible ? `${KIND_LABELS[card.kind] || 'tarjeta'}: ${card.label}` : 'tarjeta oculta'}
      aria-pressed={visible}
    >
      <span className="card-inner">
        <span className="card-face card-back" aria-hidden="true">
          <img className="card-logo" src={logoCial} alt="" draggable="false" />
        </span>
        <span className="card-face card-front">
          <span className="card-kind">{KIND_LABELS[card.kind] || card.kind}</span>
          {card.kind === 'image' && card.src ? <img src={card.src} alt={card.alt} /> : <span className="card-label">{card.label}</span>}
        </span>
      </span>
    </button>
  )
}
