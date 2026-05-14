import logoCial from '../assets/images/logo-cial.jpg'

export const DEFAULT_CLIENT_CONFIG = {
  clientName: 'CIAL',
  logo: logoCial,
  gameTitle: 'memorice de inocuidad alimentaria',
  intro:
    'Encuentra los pares conectados por concepto: palabra con definición, práctica con significado o imagen con idea clave.',
  rules: ['10 tarjetas por partida', '5 pares al azar', 'máximo 3 fallos'],
  theme: {
    primary: '#00843D',
    primaryDark: '#046A38',
    orange: '#FF8200',
    red: '#DA291C',
    magenta: '#A51890',
    yellow: '#FEC72C',
    gold: '#BFA976',
    blue: '#8BB8E8',
    soft: '#F6EDD0',
    ink: '#1F2B22',
    muted: '#5D675F',
    surface: '#FFFDF7',
    cardBack: '#00843D',
    cardFront: '#FFFDF7',
    cardAccent: '#FF8200',
  },
  cardStyle: {
    radius: 18,
    shadow: '0 18px 42px rgba(15, 74, 38, 0.16)',
    backPattern: 'leaf',
  },
}

const STORAGE_KEY = 'memorice-client-config'

export function loadClientConfig() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_CLIENT_CONFIG
    const parsed = JSON.parse(saved)
    return {
      ...DEFAULT_CLIENT_CONFIG,
      ...parsed,
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
