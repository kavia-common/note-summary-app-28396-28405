import Blits from '@lightningjs/blits'
import store from '../state/store.js'

/**
 * DevOverlay shows minimal diagnostic info to help
 * identify blank-screen issues in preview environments. It is lightweight and
 * gated behind a flag in App.js.
 */
export default Blits.Component('DevOverlay', {
  state() {
    return {
      lines: [],
      unsubscribe: null,
      visible: true,
    }
  },
  mounted() {
    const push = (msg) => {
      const ts = new Date().toISOString().split('T')[1].split('.')[0]
      this.lines = [ `[${ts}] ${msg}`, ...this.lines ].slice(0, 6)
    }
    // Initial logs
    push('DevOverlay mounted ✓')
    push('Blits app running ✓')
    try {
      const st = store.getState()
      push(`Notes: ${st.notes.length}, selected: ${st.selectedNoteId ? 'yes' : 'none'}`)
    } catch (e) {
      push(`Store error: ${e?.message}`)
    }
    this.unsubscribe = store.subscribe(() => {
      const st = store.getState()
      push(`Update: ${st.notes.length} notes`)
    })
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
  },
  template: `
    <Element :alpha="$alpha" x="1120" y="60" w="780" h="140" color="#000000">
      <Text :for="(line, idx) in $lines" :key="$idx" :content="$line" x="10" :y="$idx * 22 + 8" fontSize="18" color="#10B981" />
    </Element>
  `,
  computed: {
    $alpha() { return this.visible ? 0.85 : 0 },
    $lines() { return this.lines || [] }
  },
  input: {
    back() {
      // Toggle visibility to avoid obstructing UI
      this.visible = !this.visible
    }
  }
})
