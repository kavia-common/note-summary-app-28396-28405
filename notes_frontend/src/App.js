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
    <Element color="#00FF00FF" w="1920" h="1080">
      <Text content="APP ROOT VISIBLE" x="800" y="500" fontSize="48" color="#FF0000FF" />
      <Element :color="$bg" w="1920" h="1080">
        <RouterView />
      </Element>
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
