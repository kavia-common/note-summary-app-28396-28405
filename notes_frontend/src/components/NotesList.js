import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import store from '../state/store.js'
import NoteListItem from './NoteListItem.js'

export default Blits.Component('NotesList', {
  components: { NoteListItem },
  state() {
    return {
      notes: [],
      selectedId: null,
      unsubscribe: null,
      focusedIndex: 0
    }
  },
  methods: {
    _syncFromStore() {
      const st = store.getState()
      const notes = [...st.notes].sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt))
      this.notes = notes
      this.selectedId = st.selectedNoteId
      const idx = notes.findIndex(n => n.id === this.selectedId)
      this.focusedIndex = idx >= 0 ? idx : 0
    },
    // PUBLIC_INTERFACE
    createNote() {
      store.addNote({ title: '', content: '' })
    },
    _moveSelection(delta) {
      if (!this.notes.length) return
      let idx = this.notes.findIndex(n => n.id === this.selectedId)
      if (idx < 0) idx = 0
      idx = Math.max(0, Math.min(this.notes.length - 1, idx + delta))
      const note = this.notes[idx]
      if (note) {
        store.selectNote(note.id)
      }
    }
  },
  mounted() {
    this._syncFromStore()
    this.unsubscribe = store.subscribe(() => this._syncFromStore())
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
  },
  template: `
    <Element :color="$panelBg" w="680" h="930" x="20" y="0">
      <Element x="16" y="12" w="648" h="48" :color="$headerBg">
        <Text :content="$headerTitle" x="12" y="10" fontSize="22" :color="$headerText" />
        <Element x="560" y="6" w="72" h="36" :color="$addBg" @enter="$createNote">
          <Text content="+" x="26" y="2" fontSize="28" :color="$addText" />
        </Element>
      </Element>
      <Element x="16" y="72" w="648" h="842" :color="$listBg">
        <Element
          :for="(item, idx) in $items"
          :key="$item.id"
          :y="$idx * 98"
          w="648"
          h="96"
        >
          <NoteListItem :note="$item" :selected="$isSelected($item)" />
        </Element>
      </Element>
    </Element>
  `,
  computed: {
    $panelBg() { return theme.colors.surface },
    $headerBg() { return theme.colors.surface },
    $headerText() { return theme.colors.text },
    $addBg() { return theme.colors.primary },
    $addText() { return '#ffffff' },
    $listBg() { return theme.colors.surface },
    $items() { return this.notes || [] },
    $headerTitle() {
      const count = this.notes.length
      return `Notes (${count})`
    },
    $isSelected() {
      return (n) => n.id === this.selectedId
    }
  },
  input: {
    up() { this._moveSelection(-1) },
    down() { this._moveSelection(1) },
    enter() {
      // noop - handled per item
    },
    back() {
      // no-op
    }
  }
})
