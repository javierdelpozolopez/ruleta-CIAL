import SoundToggle from './SoundToggle.jsx'

export default function HeaderBar({ config, soundEnabled, onToggleSound, onOpenAdmin }) {
  return (
    <header className="header-bar">
      <button className="brand-lockup" type="button" onClick={onOpenAdmin} aria-label="abrir panel admin">
        <img src={config.logo} alt={`logo ${config.clientName}`} />
        <span>{config.clientName}</span>
      </button>
      <nav className="header-actions" aria-label="controles del juego">
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
        <button className="icon-button" type="button" onClick={onOpenAdmin} aria-label="configurar cliente">
          ⚙
        </button>
      </nav>
    </header>
  )
}
