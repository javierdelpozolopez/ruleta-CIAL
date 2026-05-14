import { CARD_PAIRS } from '../data/cardsData.js'

const DEFAULT_PAIR_COUNT = 5
const DEFAULT_MAX_MISTAKES = 3

export function shuffleArray(array, random = Math.random) {
  const shuffled = [...array]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

export function pickRandomPairs(pairs = CARD_PAIRS, count = DEFAULT_PAIR_COUNT, random = Math.random) {
  if (!Array.isArray(pairs)) throw new TypeError('pairs must be an array')
  if (count < 1) throw new RangeError('count must be greater than 0')
  if (pairs.length < count) throw new RangeError('not enough pairs available')
  return shuffleArray(pairs, random).slice(0, count)
}

function normalizeCard(pair, side, card) {
  return {
    id: `${pair.id}-${side}`,
    pairId: pair.id,
    side,
    type: pair.type,
    kind: card.kind,
    label: card.label,
    src: card.src || '',
    alt: card.alt || card.label,
    isMatched: false,
    isFlipped: false,
  }
}

export function buildDeck(selectedPairs, random = Math.random) {
  if (!Array.isArray(selectedPairs)) throw new TypeError('selectedPairs must be an array')

  const cards = selectedPairs.flatMap((pair) => {
    if (!pair?.id || !pair?.cardA?.label || !pair?.cardB?.label) {
      throw new TypeError('each pair must include id, cardA and cardB')
    }
    return [normalizeCard(pair, 'A', pair.cardA), normalizeCard(pair, 'B', pair.cardB)]
  })

  return shuffleArray(cards, random)
}

export function createNewGame(options = {}) {
  const { pairs = CARD_PAIRS, pairCount = DEFAULT_PAIR_COUNT, maxMistakes = DEFAULT_MAX_MISTAKES, random = Math.random } = options
  const selectedPairs = pickRandomPairs(pairs, pairCount, random)
  return {
    deck: buildDeck(selectedPairs, random),
    selectedPairs,
    maxMistakes,
    mistakes: 0,
    matchedPairIds: [],
    flippedCardIds: [],
    startedAt: Date.now(),
    endedAt: null,
    status: 'playing',
  }
}
