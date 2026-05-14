export default function ProgressBar({ value, max }) {
  const progress = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="progress" aria-label={`progreso ${value} de ${max}`}>
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}
