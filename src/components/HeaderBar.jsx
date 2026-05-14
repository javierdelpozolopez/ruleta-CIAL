import SoundToggle from './SoundToggle.jsx'

export default function HeaderBar({ config, soundEnabled, onToggleSound }) {
  return (
    <header className="header-bar">
      <div className="brand-lockup" aria-label={`marca ${config.clientName}`}>
        <img src={config.logo} alt={`logo ${config.clientName}`} />
      </div>
      <nav className="header-actions" aria-label="controles del juego">
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </nav>
    </header>
  )
}
