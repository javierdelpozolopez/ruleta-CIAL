import { CARD_PAIRS } from '../data/cardsData.js'
import { ConceptIcon } from './Card.jsx'

const HERO_CARDS = ['higiene-manos', 'contaminacion-cruzada', 'desinfeccion', 'crudo-cocido', 'cadena-frio']
  .map((id) => CARD_PAIRS.find((pair) => pair.id === id))
  .filter(Boolean)

export default function StartScreen({ config, onStart }) {
  return (
    <section className="start-screen" aria-labelledby="game-title">
      <div className="start-copy">
        <p className="eyebrow">Calidad e inocuidad</p>
        <h1 id="game-title">{config.gameTitle}</h1>
        <p className="intro">{config.intro}</p>
        <p className="pair-callout">Junta los pares</p>
        <ul className="rule-list" aria-label="reglas principales">
          {config.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <button className="primary-button" type="button" onClick={onStart}>
          comenzar
        </button>
      </div>
      <div className="start-visual" aria-hidden="true">
        {HERO_CARDS.map((pair, index) => (
          <div key={pair.id} className={`hero-card hero-card--${index + 1}`} style={{ '--concept-color': pair.color }}>
            <ConceptIcon card={{ ...pair.card, pairId: pair.id }} />
            <span className="hero-card-label">{pair.card.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
