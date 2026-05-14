# Memorice de Inocuidad Alimentaria

WebApp/PWA React + Vite para juego de memorice por conceptos, personalizado para CIAL.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Personalización

- Marca, colores, textos y estilos: `src/config/clientConfig.js`
- Conceptos y tarjetas: `src/game/cardsData.js`
- Logo e imágenes: `src/assets/images/`
- PWA: `public/manifest.webmanifest` y `public/service-worker.js`

No usa backend ni base de datos. El panel admin local guarda cambios en `localStorage`, útil para prototipar otros clientes antes de mover la configuración a archivos o backend.
