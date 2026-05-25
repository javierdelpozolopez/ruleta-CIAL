import logoCial from '../assets/images/logo-cial-transparent.png'

export const DEFAULT_CLIENT_CONFIG = {
  clientName: 'CIAL',
  logo: logoCial,
  gameTitle: 'Memorice',
  intro:
    'Te presentamos los conceptos de inocuidad alimentaria.',
  rules: ['12 tarjetas', '6 conceptos al azar', '60 segundos', 'máximo 3 errores'],
  theme: {
    primary: '#00843D',
    primaryDark: '#046A38',
    orange: '#FF8200',
    red: '#DA291C',
    magenta: '#A51890',
    yellow: '#FEC72C',
    gold: '#BFA976',
    blue: '#8BB8E8',
    royalBlue: '#003DA5',
    soft: '#F6EDD0',
    ink: '#1F2B22',
    muted: '#5D675F',
    surface: '#FFFDF7',
    cardBack: '#FFFDF7',
    cardFront: '#FFFDF7',
    cardAccent: '#FF8200',
    iconCircleGreen: '#00843D',
    iconCircleDarkGreen: '#046A38',
    iconCircleOrange: '#FF8200',
    iconCircleRed: '#DA291C',
    iconCircleYellow: '#FEC72C',
    iconCircleGold: '#BFA976',
    iconCircleMagenta: '#A51890',
    iconCircleRoyalBlue: '#003DA5',
    iconCircleBlue: '#8BB8E8',
    iconCircleCream: '#F6EDD0',
    iconCircleMix: '64%',
  },
  cardStyle: {
    radius: 18,
    shadow: '0 18px 42px rgba(15, 74, 38, 0.16)',
    backPattern: 'leaf',
  },
}

const STORAGE_KEY = 'memorice-cial-client-config-v3'

export function loadClientConfig() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_CLIENT_CONFIG
    const parsed = JSON.parse(saved)
    return {
      ...DEFAULT_CLIENT_CONFIG,
      ...parsed,
      rules: DEFAULT_CLIENT_CONFIG.rules,
      theme: { ...DEFAULT_CLIENT_CONFIG.theme, ...parsed.theme },
      cardStyle: { ...DEFAULT_CLIENT_CONFIG.cardStyle, ...parsed.cardStyle },
      logo: parsed.logo || DEFAULT_CLIENT_CONFIG.logo,
    }
  } catch {
    return DEFAULT_CLIENT_CONFIG
  }
}

export function saveClientConfig(config) {
  const configToStore = { ...config, logo: config.logo === logoCial ? '' : config.logo }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(configToStore))
}

export function resetClientConfig() {
  window.localStorage.removeItem(STORAGE_KEY)
}
