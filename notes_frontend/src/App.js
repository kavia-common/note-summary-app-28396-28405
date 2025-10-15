import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import { theme } from './theme.js'
import store from './state/store.js'

/**
 * Root Application with a single Home route.
 * Store is initialized synchronously on first import.
 */
export default Blits.Application({
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
      return theme.colors.background
    }
  }
})
