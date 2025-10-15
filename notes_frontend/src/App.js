import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import { theme } from './theme.js'
import DevOverlay from './components/DevOverlay.js'

/**
 * Root Application with a single Home route and optional dev overlay.
 * Render RouterView directly per Blits Router STRICT RULES.
 */
export default Blits.Application({
  components: { DevOverlay },
  state() {
    return {
      debug: true, // set to false to hide on-screen diagnostics
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log('[App] mounted')
    // Ensure store is hydrated before routing renders pages
    import('./state/store.js').then(({ default: store }) => {
      try {
        store.loadFromStorage()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[App] store.loadFromStorage failed', e)
      }
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error('[App] failed to import store', e)
    })
  },
  template: `
    <Element :color="$bg" w="1920" h="1080">
      <RouterView />
      <Element :alpha="$debugAlpha">
        <DevOverlay />
      </Element>
    </Element>
  `,
  routes: [
    { path: '/', component: Home, options: { reuse: true } }
  ],
  computed: {
    $bg() { return theme.colors.background },
    $debugAlpha() { return this.debug ? 1 : 0 }
  }
})
