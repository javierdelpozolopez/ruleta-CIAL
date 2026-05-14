function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export default function ResultScreen({ status, elapsed, mistakes, maxMistakes, pairsFound, totalPairs, onRetry, onHome }) {
  const won = status === 'won'

  return (
    <section className="result-screen" aria-labelledby="result-title">
      {won && <div className="confetti" aria-hidden="true" />}
      <p className="eyebrow">{won ? 'misión cumplida' : 'nuevo intento'}</p>
      <h1 id="result-title">{won ? 'inocuidad dominada' : 'quedaste a un paso'}</h1>
      <p className="intro">
        {won
          ? 'Encontraste todos los pares antes del límite de fallos.'
          : 'Llegaste al máximo de fallos. Repasa conceptos y vuelve a jugar.'}
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
