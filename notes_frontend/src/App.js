import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import { theme } from './theme.js'

/**
 * Root Application with a single Home route and themed background.
 */
export default Blits.Application({
  template: `
    <Element :color="$bg">
      <RouterView />
    </Element>
  `,
  routes: [
    { path: '/', component: Home, options: { reuse: true } }
  ],
  computed: {
    $bg() { return theme.colors.background }
  }
})
