import Blits from '@lightningjs/blits'
import App from './App.js'

// Minimal startup log for debugging preview issues
// eslint-disable-next-line no-console
console.log('[Blits] Launching app...')

// Ensure target element exists
const mountEl = document.getElementById('app')
// eslint-disable-next-line no-console
console.log('[Blits] Mount target', mountEl ? 'found' : 'NOT FOUND')

// Map common keyboard keys to navigation intents for dev preview.
// Note: Lightning runs via WebGL; these are not DOM listeners.
Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  debugLevel: 1,
  keys: {
    up: ['ArrowUp', 38],
    down: ['ArrowDown', 40],
    left: ['ArrowLeft', 37],
    right: ['ArrowRight', 39],
    enter: ['Enter', 13],
    back: ['Escape', 27]
  }
})
