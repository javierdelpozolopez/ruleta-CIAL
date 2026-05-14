export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button className="icon-button" type="button" onClick={onToggle} aria-label={enabled ? 'desactivar sonidos' : 'activar sonidos'}>
      {enabled ? '🔊' : '🔇'}
    </button>
  )
}
