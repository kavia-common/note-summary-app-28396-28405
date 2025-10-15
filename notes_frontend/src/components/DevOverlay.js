import Blits from '@lightningjs/blits'
import store from '../state/store.js'

/**
 * DevOverlay shows minimal diagnostic info in the bottom-left corner to help
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
      this.lines = [ `[${ts}] ${msg}`, ...this.lines ].slice(0, 8)
    }
    // Initial logs
    push('DevOverlay mounted')
    try {
      const st = store.getState()
      push(`Notes: ${st.notes.length}, selected: ${st.selectedNoteId || 'none'}`)
    } catch (e) {
      push(`Store error: ${e?.message}`)
    }
    this.unsubscribe = store.subscribe(() => {
      const st = store.getState()
      push(`Store update -> notes: ${st.notes.length}, selected: ${st.selectedNoteId || 'none'}`)
    })
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
  },
  template: `
    <Element :alpha="$alpha" x="24" y="980" w="800" h="96" color="rgba(0,0,0,0.55)">
      <Text :for="(line, idx) in $lines" :key="$idx" :content="$line" x="10" :y="$idx * 22 + 8" fontSize="18" color="#e5e7eb" />
    </Element>
  `,
  computed: {
    $alpha() { return this.visible ? 1 : 0 },
    $lines() { return this.lines || [] }
  },
  input: {
    back() {
      // Toggle visibility to avoid obstructing UI
      this.visible = !this.visible
    }
  }
})
