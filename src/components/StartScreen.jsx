export default function StartScreen({ config, onStart }) {
  return (
    <section className="start-screen" aria-labelledby="game-title">
      <div className="start-copy">
        <p className="eyebrow">capacitación lúdica</p>
        <h1 id="game-title">
          memorice de
          <br />
          inocuidad
          <br />
          alimentaria
        </h1>
        <p className="intro">{config.intro}</p>
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
        <div className="hero-card hero-card--one">BPM</div>
        <div className="hero-card hero-card--two">HACCP</div>
        <div className="hero-card hero-card--three">3</div>
      </div>
    </section>
  )
}
