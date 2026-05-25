import { CARD_PAIRS } from '../data/cardsData.js'

const DEFAULT_PAIR_COUNT = 6
const DEFAULT_MAX_MISTAKES = 3
const DEFAULT_TIME_LIMIT = 60
const DEFAULT_PREVIEW_SECONDS = 8

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
    kind: card.kind,
    label: card.label,
    src: card.src || '',
    alt: card.alt || card.label,
    color: pair.color || 'var(--primary)',
    isMatched: false,
    isSelected: false,
  }
}

export function buildDeck(selectedPairs, random = Math.random) {
  if (!Array.isArray(selectedPairs)) throw new TypeError('selectedPairs must be an array')

  const cards = selectedPairs.flatMap((pair) => {
    if (!pair?.id || !pair?.card?.label) {
      throw new TypeError('each pair must include id and card')
    }
    return [normalizeCard(pair, 'A', pair.card), normalizeCard(pair, 'B', pair.card)]
  })

  return shuffleArray(cards, random)
}

export function createNewGame(options = {}) {
  const {
    pairs = CARD_PAIRS,
    pairCount = DEFAULT_PAIR_COUNT,
    maxMistakes = DEFAULT_MAX_MISTAKES,
    timeLimit = DEFAULT_TIME_LIMIT,
    previewSeconds = DEFAULT_PREVIEW_SECONDS,
    random = Math.random,
  } = options
  const selectedPairs = pickRandomPairs(pairs, pairCount, random)
  const createdAt = Date.now()
  const previewDuration = previewSeconds * 1000

  return {
    deck: buildDeck(selectedPairs, random),
    selectedPairs,
    maxMistakes,
    timeLimit,
    previewSeconds,
    previewEndsAt: createdAt + previewDuration,
    mistakes: 0,
    matchedPairIds: [],
    selectedCardIds: [],
    startedAt: createdAt + previewDuration,
    endedAt: null,
    endReason: '',
    status: 'preview',
  }
}
