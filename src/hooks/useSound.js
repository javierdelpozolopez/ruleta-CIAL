import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SOUND_KEY = 'memorice-sound-enabled'

function createTone(audioContext, frequency, duration, type = 'sine', gain = 0.08) {
  const oscillator = audioContext.createOscillator()
  const volume = audioContext.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  volume.gain.setValueAtTime(0.001, audioContext.currentTime)
  volume.gain.exponentialRampToValueAtTime(gain, audioContext.currentTime + 0.02)
  volume.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
  oscillator.connect(volume)
  volume.connect(audioContext.destination)
  oscillator.start()
  oscillator.stop(audioContext.currentTime + duration + 0.02)
}

export function useSound() {
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(() => {
    const saved = window.localStorage.getItem(SOUND_KEY)
    return saved ? saved === 'true' : true
  })

  useEffect(() => {
    window.localStorage.setItem(SOUND_KEY, String(enabled))
  }, [enabled])

  const ensureAudio = useCallback(() => {
    if (!enabled) return null
    if (!audioRef.current) {
      audioRef.current = new AudioContext()
    }
    if (audioRef.current.state === 'suspended') {
      audioRef.current.resume()
    }
    return audioRef.current
  }, [enabled])

  const playClick = useCallback(() => {
    const audio = ensureAudio()
    if (audio) createTone(audio, 380, 0.08, 'triangle', 0.045)
  }, [ensureAudio])

  const playSuccess = useCallback(() => {
    const audio = ensureAudio()
    if (!audio) return
    createTone(audio, 520, 0.11, 'sine', 0.055)
    window.setTimeout(() => createTone(audio, 720, 0.14, 'sine', 0.05), 80)
  }, [ensureAudio])

  const playError = useCallback(() => {
    const audio = ensureAudio()
    if (audio) createTone(audio, 180, 0.16, 'sawtooth', 0.035)
  }, [ensureAudio])

  const playVictory = useCallback(() => {
    const audio = ensureAudio()
    if (!audio) return
    ;[523, 659, 784, 1046].forEach((frequency, index) => {
      window.setTimeout(() => createTone(audio, frequency, 0.18, 'triangle', 0.06), index * 110)
    })
  }, [ensureAudio])

  return useMemo(
    () => ({
      enabled,
      toggleSound: () => setEnabled((value) => !value),
      playClick,
      playSuccess,
      playError,
      playVictory,
    }),
    [enabled, playClick, playError, playSuccess, playVictory],
  )
}
