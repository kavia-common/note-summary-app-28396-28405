import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import store from '../state/store.js'

export default Blits.Component('TopNav', {
  state() {
    return {}
  },
  methods: {
    // PUBLIC_INTERFACE
    newNote() {
      const note = store.addNote({ title: '', content: '' })
      if (note && this.$router) {
        // Optionally could update query, for now stay on route
      }
    }
  },
  template: `
    <Element
      w="1920"
      h="100"
      :color="$bg"
    >
      <Element
        x="40"
        y="24"
        w="1840"
        h="52"
        :color="$bg"
      >
        <Text
          content="Ocean Notes"
          x="0"
          y="6"
          :color="$text"
          fontSize="28"
        />
        <Element
          x="1600"
          y="0"
          w="200"
          h="52"
          :color="$buttonColor"
          @enter="$newNote"
          :alpha="$btnAlpha"
        >
          <Text content="+ New Note" x="20" y="12" fontSize="22" :color="$btnText" />
        </Element>
      </Element>
    </Element>
  `,
  computed: {
    $bg() {
      // Simulate gradient by using surface tint
      return theme.colors.surface
    },
    $text() {
      return theme.colors.text
    },
    $buttonColor() {
      return theme.colors.primary
    },
    $btnText() {
      return '#ffffff'
    },
    $btnAlpha() {
      return 0.95
    }
  },
  input: {
    enter() {
      // When focused on button area, handled by @enter
    }
  }
})
