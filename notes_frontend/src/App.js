import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import { theme } from './theme.js'
import store from './state/store.js'

/**
 * Root Application with a single Home route.
 * Store is initialized synchronously on first import.
 */
export default Blits.Application({
  mounted() {
    // eslint-disable-next-line no-console
    console.log('[App] mounted, store already initialized:', store._initialized)
  },
  template: `
    <Element :color="$bg" w="1920" h="1080">
      <RouterView />
    </Element>
  `,
  routes: [
    { path: '/', component: Home, options: { reuse: true } }
  ],
  computed: {
    $bg() { 
      const bg = theme.colors.background
      // eslint-disable-next-line no-console
      console.log('[App] background color:', bg)
      return bg
    }
  }
})
