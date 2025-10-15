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
    console.log('[Home] mounted')
    try {
      store.loadFromStorage()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Home: store.loadFromStorage failed', e)
    }
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
      <!-- TEMPORARY DEBUG BANNER - BRIGHT ORANGE TO CONFIRM RENDERING -->
      <Element w="1920" h="50" x="0" y="0" color="#FF6600">
        <Text content="🔥 RENDER WORKING - Ocean Notes App 🔥" x="600" y="10" fontSize="28" color="#FFFFFF" />
      </Element>

      <!-- TopNav moved down to make room for debug banner -->
      <Element y="50">
        <TopNav />
      </Element>

      <!-- Main content area - FIXED: y=0 relative to this container, which is at y=150 -->
      <Element w="1920" h="930" x="0" y="150" :color="$bg">
        <Element :alpha="$showEmpty">
          <EmptyState />
        </Element>
        <!-- CRITICAL FIX: Remove y=100 positioning - these should be at y=0 relative to parent -->
        <NotesList />
        <EditorPanel />
      </Element>
    </Element>
  `,
  computed: {
    $bg() { return theme.colors.background },
    $showEmpty() { return this.notesCount === 0 ? 1 : 0 }
  }
})
