function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export default function ResultScreen({ status, endReason, elapsed, mistakes, maxMistakes, pairsFound, totalPairs, onRetry, onHome }) {
  const won = status === 'won'
  const lostMessage =
    endReason === 'timeout'
      ? 'Se terminaron los 60 segundos. Repasa conceptos y vuelve a jugar.'
      : 'Llegaste al máximo de errores. Repasa conceptos y vuelve a jugar.'

  return (
    <section className={`result-screen${won ? ' result-screen--won' : ''}`} aria-labelledby="result-title">
      {won && <div className="confetti" aria-hidden="true" />}
      <p className="eyebrow">{won ? 'misión cumplida' : 'nuevo intento'}</p>
      <h1 id="result-title">{won ? '¡FELICIDADES!' : 'quedaste a un paso'}</h1>
      <p className="intro">
        {won
          ? 'Lograste dominar la inocuidad'
          : lostMessage}
      </p>
      <div className="result-stats">
        <div><span>fallos</span><strong>{mistakes}/{maxMistakes}</strong></div>
        <div><span>pares</span><strong>{pairsFound}/{totalPairs}</strong></div>
        <div><span>tiempo</span><strong>{formatTime(elapsed)}</strong></div>
      </div>
      <div className="result-actions">
        <button className="primary-button" type="button" onClick={onRetry}>volver a jugar</button>
        <button className="secondary-button" type="button" onClick={onHome}>inicio</button>
      </div>
    </section>
  )
}
