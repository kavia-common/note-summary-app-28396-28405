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
      unsubscribe: null,
      editMode: 'none', // 'none', 'title', 'content'
      cursorVisible: true,
      cursorTimer: null
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
      this._syncFromStore()
      this.editMode = 'none'
    },
    // PUBLIC_INTERFACE
    regenerateSummary() {
      this.summary = summarize(this.content || '')
      if (this.selectedId) {
        store.updateNote(this.selectedId, { title: this.title, content: this.content })
        this._syncFromStore()
      }
    },
    // PUBLIC_INTERFACE
    deleteNote() {
      if (!this.selectedId) return
      store.deleteNote(this.selectedId)
      this._syncFromStore()
      this.editMode = 'none'
    },
    // PUBLIC_INTERFACE
    editTitle() {
      this.editMode = 'title'
      this._startCursorBlink()
    },
    // PUBLIC_INTERFACE
    editContent() {
      this.editMode = 'content'
      this._startCursorBlink()
    },
    // PUBLIC_INTERFACE
    exitEdit() {
      this.editMode = 'none'
      this._stopCursorBlink()
    },
    _startCursorBlink() {
      this._stopCursorBlink()
      this.cursorVisible = true
      this.cursorTimer = this.$setInterval(() => {
        this.cursorVisible = !this.cursorVisible
      }, 500)
    },
    _stopCursorBlink() {
      if (this.cursorTimer) {
        this.$clearInterval(this.cursorTimer)
        this.cursorTimer = null
      }
      this.cursorVisible = false
    },
    _handleChar(char) {
      if (this.editMode === 'title') {
        this.title = (this.title || '') + char
      } else if (this.editMode === 'content') {
        this.content = (this.content || '') + char
      }
    },
    _handleBackspace() {
      if (this.editMode === 'title') {
        this.title = (this.title || '').slice(0, -1)
      } else if (this.editMode === 'content') {
        this.content = (this.content || '').slice(0, -1)
      }
    },
    _handleSpace() {
      if (this.editMode === 'title') {
        this.title = (this.title || '') + ' '
      } else if (this.editMode === 'content') {
        this.content = (this.content || '') + ' '
      }
    },
    _handleNewline() {
      if (this.editMode === 'content') {
        this.content = (this.content || '') + '\n'
      }
    }
  },
  mounted() {
    this.unsubscribe = store.subscribe(() => this._syncFromStore())
    // Listen for keyboard events on window for text input simulation
    if (typeof window !== 'undefined') {
      this._keyHandler = (e) => {
        if (this.editMode === 'none') return
        
        // Handle printable characters
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          this._handleChar(e.key)
        }
        // Handle backspace
        else if (e.key === 'Backspace') {
          e.preventDefault()
          this._handleBackspace()
        }
        // Handle space
        else if (e.key === ' ') {
          e.preventDefault()
          this._handleSpace()
        }
        // Handle enter in content mode
        else if (e.key === 'Enter' && this.editMode === 'content') {
          e.preventDefault()
          this._handleNewline()
        }
        // Handle save shortcut
        else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault()
          this.save()
        }
      }
      window.addEventListener('keydown', this._keyHandler)
    }
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe()
    this._stopCursorBlink()
    if (typeof window !== 'undefined' && this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler)
    }
  },
  template: `
    <Element :color="$panelBg" x="720" y="0" w="1180" h="930">
      <!-- Header with buttons -->
      <Element x="24" y="12" w="1132" h="48" :color="$headerBg">
        <Text :content="$headerTitle" x="12" y="10" fontSize="22" :color="$headerText" />
        <Element x="760" y="6" w="100" h="36" :color="$saveBg" @enter="save">
          <Text content="Save" x="18" y="6" fontSize="20" :color="$btnText" />
        </Element>
        <Element x="870" y="6" w="180" h="36" :color="$regenBg" @enter="regenerateSummary">
          <Text content="Regenerate" x="18" y="6" fontSize="20" :color="$btnText" />
        </Element>
        <Element x="1056" y="6" w="76" h="36" :color="$deleteBg" @enter="deleteNote">
          <Text content="Del" x="22" y="6" fontSize="20" :color="$btnText" />
        </Element>
      </Element>

      <!-- Title field -->
      <Element x="24" y="72" w="1132" h="80" :color="$titleFieldBg" @enter="editTitle">
        <Text :content="$titleDisplay" x="12" y="10" fontSize="22" :color="$label" />
        <Text :content="$titleCursor" x="$titleCursorX" y="10" fontSize="22" :color="$cursorColor" :alpha="$cursorAlpha" />
      </Element>

      <!-- Content field -->
      <Element x="24" y="160" w="1132" h="580" :color="$contentFieldBg" @enter="editContent">
        <Text :content="$contentDisplay" x="12" y="10" fontSize="20" :color="$text" />
      </Element>

      <!-- Summary field -->
      <Element x="24" y="752" w="1132" h="140" :color="$surface">
        <Text :content="$summaryDisplay" x="12" y="10" fontSize="20" :color="$muted" />
      </Element>

      <!-- Edit mode instructions -->
      <Element x="24" y="900" w="1132" h="30" :color="$panelBg">
        <Text :content="$instructions" x="12" y="6" fontSize="16" :color="$muted" />
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
    $cursorColor() { return theme.colors.primary },
    $titleFieldBg() { 
      return this.editMode === 'title' ? theme.colors.tint : theme.colors.surface 
    },
    $contentFieldBg() { 
      return this.editMode === 'content' ? theme.colors.tint : theme.colors.surface 
    },
    $headerTitle() {
      return this.selectedId ? 'Editor' : 'Editor (no note selected)'
    },
    $titleDisplay() {
      const prefix = 'Title: '
      const text = this.title || 'Untitled'
      return prefix + text
    },
    $titleCursorX() {
      // Approximate cursor position based on text length
      const prefix = 'Title: '
      const baseX = 12 + (prefix.length * 13)
      const textWidth = ((this.title || '').length * 13)
      return baseX + textWidth
    },
    $titleCursor() {
      return this.editMode === 'title' && this.cursorVisible ? '|' : ''
    },
    $cursorAlpha() {
      return this.editMode !== 'none' && this.cursorVisible ? 1 : 0
    },
    $contentDisplay() {
      const prefix = 'Content\n\n'
      const text = this.content || '(Start typing...)'
      return prefix + text
    },
    $summaryDisplay() {
      const prefix = 'Summary\n\n'
      const text = this.summary || '(Will generate from content)'
      return prefix + text
    },
    $instructions() {
      if (this.editMode === 'title') return 'Editing title - Type to add text, Backspace to delete, Esc to exit'
      if (this.editMode === 'content') return 'Editing content - Type to add text, Backspace to delete, Enter for new line, Esc to exit'
      return 'Press Enter on Title or Content to edit, use buttons to Save/Regenerate/Delete'
    }
  },
  input: {
    enter() {
      // Enter handled by @enter on specific fields
    },
    back() {
      if (this.editMode !== 'none') {
        this.exitEdit()
      }
    },
    right() {},
    left() {},
    up() {},
    down() {}
  }
})
