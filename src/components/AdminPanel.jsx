const COLOR_FIELDS = [
  ['primary', 'verde principal'],
  ['primaryDark', 'verde oscuro'],
  ['orange', 'naranjo'],
  ['red', 'rojo error'],
  ['magenta', 'magenta'],
  ['yellow', 'amarillo'],
  ['gold', 'dorado'],
  ['blue', 'azul apoyo'],
  ['royalBlue', 'azul corporativo'],
  ['soft', 'fondo suave'],
  ['cardBack', 'lomo tarjeta'],
  ['cardFront', 'frente tarjeta'],
]

export default function AdminPanel({ config, onChange, onReset, onClose }) {
  const update = (path, value) => {
    const [group, key] = path
    onChange({ ...config, [group]: { ...config[group], [key]: value } })
  }

  const updateText = (key, value) => onChange({ ...config, [key]: value })

  return (
    <aside className="admin-panel" aria-label="panel admin">
      <div className="admin-card">
        <div className="admin-head">
          <div>
            <p className="eyebrow">admin local</p>
            <h2>personalización</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="cerrar panel">×</button>
        </div>

        <label>
          cliente
          <input aria-label="cliente" value={config.clientName} onChange={(event) => updateText('clientName', event.target.value)} />
        </label>
        <label>
          título
          <input aria-label="título" value={config.gameTitle} onChange={(event) => updateText('gameTitle', event.target.value)} />
        </label>
        <label>
          texto inicio
          <textarea aria-label="texto inicio" rows="3" value={config.intro} onChange={(event) => updateText('intro', event.target.value)} />
        </label>

        <div className="color-grid">
          {COLOR_FIELDS.map(([key, label]) => (
            <label key={key}>
              {label}
              <input aria-label={label} type="color" value={config.theme[key]} onChange={(event) => update(['theme', key], event.target.value)} />
            </label>
          ))}
        </div>

        <label>
          radio tarjetas
          <input
            type="range"
            aria-label="radio tarjetas"
            min="8"
            max="32"
            value={config.cardStyle.radius}
            onChange={(event) => update(['cardStyle', 'radius'], Number(event.target.value))}
          />
        </label>

        <div className="admin-actions">
          <button className="secondary-button" type="button" onClick={onReset}>restaurar CIAL</button>
          <button className="primary-button" type="button" onClick={onClose}>listo</button>
        </div>
      </div>
    </aside>
  )
}
