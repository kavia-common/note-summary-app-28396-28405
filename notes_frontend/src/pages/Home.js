import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import store from '../state/store.js'
import NotesList from '../components/NotesList.js'
import EditorPanel from '../components/EditorPanel.js'
import EmptyState from '../components/EmptyState.js'
import TopNav from '../components/TopNav.js'

export default Blits.Component('Home', {
  components: { NotesList, EditorPanel, EmptyState, TopNav },
  state() {
    return {
      notesCount: 0,
      unsubscribe: null
    }
  },
  mounted() {
    store.loadFromStorage()
    this._sync()
    this.unsubscribe = store.subscribe(() => this._sync())
    // If nothing loaded, start empty state
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    _sync() {
      this.notesCount = store.getState().notes.length
    }
  },
  template: `
    <Element :color="$bg" w="1920" h="1080">
      <TopNav />
      <Element w="1920" h="980" x="0" y="100" :color="$bg">
        <Element :alpha="$showEmpty">
          <EmptyState />
        </Element>
        <Element :alpha="$showApp">
          <NotesList />
          <EditorPanel />
        </Element>
      </Element>
    </Element>
  `,
  computed: {
    $bg() { return theme.colors.background },
    $showEmpty() { return this.notesCount === 0 ? 1 : 0 },
    $showApp() { return this.notesCount > 0 ? 1 : 0 }
  }
})
