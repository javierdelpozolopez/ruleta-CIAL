import Card from './Card.jsx'
import ProgressBar from './ProgressBar.jsx'

export default function GameBoard({ cards, recentFailIds, logo, isPreview, onCardSelect, pairsFound, totalPairs }) {
  return (
    <section className="game-screen" aria-label="tablero memorice">
      <p className={`preview-message${isPreview ? '' : ' is-hidden'}`}>memoriza las cartas</p>
      <ProgressBar value={pairsFound} max={totalPairs} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} logo={logo} isPreview={isPreview} failed={recentFailIds.includes(card.id)} onSelect={onCardSelect} />
        ))}
      </div>
    </section>
  )
}
