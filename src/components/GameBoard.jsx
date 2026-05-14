import Card from './Card.jsx'
import ProgressBar from './ProgressBar.jsx'

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export default function GameBoard({ cards, elapsed, mistakes, maxMistakes, pairsFound, totalPairs, memorizing, recentFailIds, onCardSelect }) {
  return (
    <section className="game-screen" aria-label="tablero de memorice">
      <div className="score-strip">
        <div>
          <span>fallos</span>
          <strong>{mistakes}/{maxMistakes}</strong>
        </div>
        <div>
          <span>pares</span>
          <strong>{pairsFound}/{totalPairs}</strong>
        </div>
        <div>
          <span>{memorizing ? 'memoriza' : 'tiempo'}</span>
          <strong>{memorizing ? '...' : formatTime(elapsed)}</strong>
        </div>
      </div>
      <ProgressBar value={pairsFound} max={totalPairs} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} failed={recentFailIds.includes(card.id)} onSelect={onCardSelect} />
        ))}
      </div>
    </section>
  )
}
