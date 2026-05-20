import { useEffect, useRef, useState } from 'react'
import { createNewGame } from './game/gameLogic.js'
import { useSound } from './hooks/useSound.js'
import { DEFAULT_CLIENT_CONFIG, loadClientConfig, resetClientConfig, saveClientConfig } from './config/clientConfig.js'
import StartScreen from './components/StartScreen.jsx'
import GameBoard from './components/GameBoard.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import HeaderBar from './components/HeaderBar.jsx'
import AdminPanel from './components/AdminPanel.jsx'

const EVALUATION_DELAY = 780

function applyTheme(config) {
  const root = document.documentElement
  Object.entries(config.theme).forEach(([key, value]) => {
    const token = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    root.style.setProperty(`--${token}`, value)
  })
  root.style.setProperty('--card-radius', `${config.cardStyle.radius}px`)
  root.style.setProperty('--card-shadow', config.cardStyle.shadow)
}

export default function App() {
  const [screen, setScreen] = useState('start')
  const [game, setGame] = useState(() => createNewGame())
  const lockedRef = useRef(false)
  const [recentFailIds, setRecentFailIds] = useState([])
  const [elapsed, setElapsed] = useState(0)
  const [adminOpen, setAdminOpen] = useState(() => new URLSearchParams(window.location.search).get('admin') === '1')
  const [config, setConfig] = useState(loadClientConfig)
  const sound = useSound()

  useEffect(() => applyTheme(config), [config])

  useEffect(() => {
    if (screen !== 'game' || game.status !== 'playing') return undefined
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - game.startedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [game.startedAt, game.status, screen])

  const pairsFound = game.matchedPairIds.length

  const startGame = () => {
    const nextGame = createNewGame()
    setGame(nextGame)
    setElapsed(0)
    setRecentFailIds([])
    lockedRef.current = false
    setScreen('game')
  }

  const finishGame = (nextGame, status) => {
    const finished = { ...nextGame, status, endedAt: Date.now() }
    setGame(finished)
    setElapsed(Math.floor((Date.now() - nextGame.startedAt) / 1000))
    setScreen('result')
    if (status === 'won') sound.playVictory()
  }

  const handleCardSelect = (cardId) => {
    if (lockedRef.current || game.status !== 'playing') return
    const selectedCard = game.deck.find((card) => card.id === cardId)
    if (!selectedCard || selectedCard.isMatched || selectedCard.isSelected) return

    sound.playClick()

    const selectedCardIds = [...game.selectedCardIds, cardId]
    const deck = game.deck.map((card) => (card.id === cardId ? { ...card, isSelected: true } : card))
    const nextGame = { ...game, deck, selectedCardIds }
    setGame(nextGame)

    if (selectedCardIds.length < 2) return

    lockedRef.current = true
    const [firstId, secondId] = selectedCardIds
    const first = deck.find((card) => card.id === firstId)
    const second = deck.find((card) => card.id === secondId)
    const isMatch = first.pairId === second.pairId && first.id !== second.id

    window.setTimeout(() => {
      if (isMatch) {
        const matchedPairIds = [...nextGame.matchedPairIds, first.pairId]
        const matchedDeck = deck.map((card) =>
          card.pairId === first.pairId ? { ...card, isMatched: true, isSelected: false } : card,
        )
        const updatedGame = { ...nextGame, deck: matchedDeck, matchedPairIds, selectedCardIds: [] }
        sound.playSuccess()
        lockedRef.current = false
        if (matchedPairIds.length === nextGame.selectedPairs.length) {
          finishGame(updatedGame, 'won')
        } else {
          setGame(updatedGame)
        }
        return
      }

      const mistakes = nextGame.mistakes + 1
      const failedDeck = deck.map((card) => (selectedCardIds.includes(card.id) ? { ...card, isSelected: false } : card))
      const updatedGame = { ...nextGame, deck: failedDeck, mistakes, selectedCardIds: [] }
      setRecentFailIds(selectedCardIds)
      sound.playError()
      window.setTimeout(() => setRecentFailIds([]), 520)
      lockedRef.current = false

      if (mistakes >= nextGame.maxMistakes) {
        finishGame(updatedGame, 'lost')
      } else {
        setGame(updatedGame)
      }
    }, EVALUATION_DELAY)
  }

  const updateConfig = (nextConfig) => {
    setConfig(nextConfig)
    saveClientConfig(nextConfig)
  }

  const restoreConfig = () => {
    resetClientConfig()
    setConfig(DEFAULT_CLIENT_CONFIG)
  }

  return (
    <div className={`app app--${screen}`}>
      <HeaderBar
        config={config}
        soundEnabled={sound.enabled}
        onToggleSound={sound.toggleSound}
        screen={screen}
        elapsed={elapsed}
        mistakes={game.mistakes}
        maxMistakes={game.maxMistakes}
        pairsFound={pairsFound}
        totalPairs={game.selectedPairs.length}
      />

      <main className="app-shell">
        {screen === 'start' && <StartScreen config={config} onStart={startGame} />}
        {screen === 'game' && (
          <GameBoard
            cards={game.deck}
            elapsed={elapsed}
            mistakes={game.mistakes}
            maxMistakes={game.maxMistakes}
            pairsFound={pairsFound}
            totalPairs={game.selectedPairs.length}
            recentFailIds={recentFailIds}
            onCardSelect={handleCardSelect}
          />
        )}
        {screen === 'result' && (
          <ResultScreen
            status={game.status}
            elapsed={elapsed}
            mistakes={game.mistakes}
            maxMistakes={game.maxMistakes}
            pairsFound={pairsFound}
            totalPairs={game.selectedPairs.length}
            onRetry={startGame}
            onHome={() => setScreen('start')}
          />
        )}
      </main>

      {adminOpen && <AdminPanel config={config} onChange={updateConfig} onReset={restoreConfig} onClose={() => setAdminOpen(false)} />}
    </div>
  )
}
