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
    // eslint-disable-next-line no-console
    console.log('[Home] mounted - UI should now be visible')
    this._sync()
    this.unsubscribe = store.subscribe(() => this._sync())
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    _sync() {
      try {
        const st = store.getState()
        this.notesCount = Array.isArray(st.notes) ? st.notes.length : 0
        // eslint-disable-next-line no-console
        console.log('[Home] sync notesCount =', this.notesCount)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Home: sync failed', e)
        this.notesCount = 0
      }
    }
  },
  template: `
    <Element :color="$bg" w="1920" h="1080">
      <!-- TopNav at top -->
      <Element x="0" y="0">
        <TopNav />
      </Element>

      <!-- Main content area below TopNav -->
      <Element w="1920" h="930" x="0" y="100" :color="$bg">
        <!-- Empty state when no notes -->
        <Element x="0" y="0" :alpha="$showEmpty">
          <EmptyState />
        </Element>
        
        <!-- NotesList on left, EditorPanel on right -->
        <Element x="0" y="0" :alpha="$showContent">
          <NotesList />
          <EditorPanel />
        </Element>
      </Element>
    </Element>
  `,
  computed: {
    $bg() { return theme.colors.background },
    $showEmpty() { return this.notesCount === 0 ? 1 : 0 },
    $showContent() { return this.notesCount > 0 ? 1 : 0 }
  }
})
