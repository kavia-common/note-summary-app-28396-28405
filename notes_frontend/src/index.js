import Blits from '@lightningjs/blits'
import App from './App.js'

// Map common keyboard keys to navigation intents for dev preview.
// Note: Lightning runs via WebGL; these are not DOM listeners.
Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  debugLevel: 0,
  keys: {
    up: ['ArrowUp', 38],
    down: ['ArrowDown', 40],
    left: ['ArrowLeft', 37],
    right: ['ArrowRight', 39],
    enter: ['Enter', 13],
    back: ['Escape', 27]
  }
})
