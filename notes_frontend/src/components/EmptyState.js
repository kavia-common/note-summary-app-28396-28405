import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import store from '../state/store.js'

export default Blits.Component('EmptyState', {
  methods: {
    // PUBLIC_INTERFACE
    createFirst() {
      store.addNote({ title: '', content: '' })
    }
  },
  template: `
    <Element :color="$bg" w="1920" h="980" x="0" y="100">
      <Text content="No notes yet" x="760" y="360" fontSize="36" :color="$text" />
      <Element x="860" y="420" w="200" h="60" :color="$btnBg" @enter="$createFirst">
        <Text content="Create Note" x="26" y="16" fontSize="24" :color="$btnText" />
      </Element>
    </Element>
  `,
  computed: {
    $bg() { return theme.colors.background },
    $text() { return theme.colors.muted },
    $btnBg() { return theme.colors.primary },
    $btnText() { return '#ffffff' }
  }
})
