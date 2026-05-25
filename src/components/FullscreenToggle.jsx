import { useEffect, useState } from 'react'

export default function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [])

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await document.documentElement.requestFullscreen()
  }

  return (
    <button
      className="icon-button icon-button--fullscreen"
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'salir de pantalla completa' : 'ver en pantalla completa'}
      title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
    >
      <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        {isFullscreen ? (
          <>
            <path d="M7.5 3.5v4h-4M12.5 3.5v4h4M7.5 16.5v-4h-4M12.5 16.5v-4h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <path d="M7.5 3.5h-4v4M12.5 3.5h4v4M7.5 16.5h-4v-4M12.5 16.5h4v-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </button>
  )
}
