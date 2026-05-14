import Card from './Card.jsx'
import ProgressBar from './ProgressBar.jsx'

export default function GameBoard({ cards, recentFailIds, onCardSelect, pairsFound, totalPairs }) {
  return (
    <section className="game-screen" aria-label="tablero de memorice">
      <ProgressBar value={pairsFound} max={totalPairs} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} failed={recentFailIds.includes(card.id)} onSelect={onCardSelect} />
        ))}
      </div>
    </section>
  )
}
