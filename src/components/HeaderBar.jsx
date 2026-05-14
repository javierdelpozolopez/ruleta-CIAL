import SoundToggle from './SoundToggle.jsx'

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

const IconX = () => (
  <svg className="stat-icon" width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
    <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

const IconTrophy = () => (
  <svg className="stat-icon" width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3.5 1.5h5v4a2.5 2.5 0 0 1-5 0v-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3.5 3.5H2a1.5 1.5 0 0 0 0 3h1.5M8.5 3.5H10a1.5 1.5 0 0 1 0 3H8.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="6" y1="8" x2="6" y2="10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="4" y1="10.5" x2="8" y2="10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export default function HeaderBar({ config, soundEnabled, onToggleSound, screen, elapsed, mistakes, maxMistakes, pairsFound, totalPairs, memorizing }) {
  return (
    <header className="header-bar">
      <div className="brand-lockup" aria-label={`marca ${config.clientName}`}>
        <img src={config.logo} alt={`logo ${config.clientName}`} />
      </div>
      {screen === 'game' && (
        <div className="header-stats" aria-label="estado del juego">
          <div className={`header-stat header-stat--error${mistakes > 0 ? ' is-active' : ''}`}>
            <span><IconX />fallos</span>
            <strong>{mistakes}/{maxMistakes}</strong>
          </div>
          <div className={`header-stat header-stat--success${pairsFound > 0 ? ' is-active' : ''}`}>
            <span><IconTrophy />pares</span>
            <strong>{pairsFound}/{totalPairs}</strong>
          </div>
          <div className="header-stat">
            <span>{memorizing ? 'memoriza' : 'tiempo'}</span>
            <strong>{memorizing ? '...' : formatTime(elapsed)}</strong>
          </div>
        </div>
      )}
      <nav className="header-actions" aria-label="controles del juego">
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </nav>
    </header>
  )
}
