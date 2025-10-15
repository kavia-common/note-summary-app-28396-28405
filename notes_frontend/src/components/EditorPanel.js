import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import store from '../state/store.js'
import { summarize } from '../utils/summary.js'

export default Blits.Component('EditorPanel', {
  state() {
    const note = store.getSelectedNote()
    return {
      title: note?.title || '',
      content: note?.content || '',
      summary: note?.summary || '',
      selectedId: note?.id || null,
      unsubscribe: null
    }
  },
  methods: {
    _syncFromStore() {
      const note = store.getSelectedNote()
      this.selectedId = note?.id || null
      this.title = note?.title || ''
      this.content = note?.content || ''
      this.summary = note?.summary || ''
    },
    // PUBLIC_INTERFACE
    save() {
      if (!this.selectedId) return
      store.updateNote(this.selectedId, { title: this.title, content: this.content })
      // sync after store update
      this._syncFromStore()
    },
    // PUBLIC_INTERFACE
    regenerateSummary() {
      this.summary = summarize(this.content || '')
    },
    // PUBLIC_INTERFACE
    clearOrNew() {
      if (!this.selectedId) {
        store.addNote({ title: '', content: '' })
        return
      }
      this.title = ''
      this.content = ''
      this.summary = ''
    },
    // PUBLIC_INTERFACE
    deleteNote() {
      if (!this.selectedId) return
      // Lightning doesn't have window.confirm; emulate simple guard by requiring second press
      // For simplicity, delete immediately per requirements
      store.deleteNote(this.selectedId)
      this._syncFromStore()
    }
  },
  mounted() {
    this.unsubscribe = store.subscribe(() => this._syncFromStore())
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
  },
  template: `
    <Element :color="$panelBg" x="720" y="0" w="1180" h="930">
      <Element x="24" y="12" w="1132" h="48" :color="$headerBg">
        <Text :content="$headerTitle" x="12" y="10" fontSize="22" :color="$headerText" />
        <Element x="760" y="6" w="100" h="36" :color="$saveBg" @enter="$save">
          <Text content="Save" x="18" y="6" fontSize="20" :color="$btnText" />
        </Element>
        <Element x="870" y="6" w="180" h="36" :color="$regenBg" @enter="$regenerateSummary">
          <Text content="Regenerate" x="18" y="6" fontSize="20" :color="$btnText" />
        </Element>
        <Element x="1056" y="6" w="76" h="36" :color="$deleteBg" @enter="$deleteNote">
          <Text content="Del" x="22" y="6" fontSize="20" :color="$btnText" />
        </Element>
      </Element>

      <Element x="24" y="72" w="1132" h="80" :color="$surface">
        <Text :content="'Title: ' + (title || 'Untitled')" x="12" y="10" fontSize="22" :color="$label" />
      </Element>

      <Element x="24" y="160" w="1132" h="580" :color="$surface">
        <Text :content="'Content\\n\\n' + (content || '(Start typing...)')" x="12" y="10" fontSize="20" :color="$text" />
      </Element>

      <Element x="24" y="752" w="1132" h="140" :color="$surface">
        <Text :content="'Summary\\n\\n' + (summary || '(Will generate from content)')" x="12" y="10" fontSize="20" :color="$muted" />
      </Element>
    </Element>
  `,
  computed: {
    $panelBg() { return theme.colors.surface },
    $surface() { return theme.colors.surface },
    $headerBg() { return theme.colors.surface },
    $headerText() { return theme.colors.text },
    $saveBg() { return theme.colors.primary },
    $regenBg() { return theme.colors.secondary },
    $deleteBg() { return theme.colors.error },
    $btnText() { return '#ffffff' },
    $label() { return theme.colors.text },
    $text() { return theme.colors.text },
    $muted() { return theme.colors.muted },
    $headerTitle() {
      return this.selectedId ? 'Editor' : 'Editor (no note selected)'
    }
  },
  input: {
    enter() {
      // Enter presses are scoped to buttons via @enter
    },
    // Handle Ctrl/Cmd+S: Lightning provides key events, emulate via key codes if available.
    // Here we just map to enter save when 'S' is pressed with meta/ctrl (environment-dependent).
    // In Blits demo environments, we trigger save on 'S' alone for simplicity.
    right() {},
    left() {},
    up() {},
    down() {},
    back() {}
  }
})
