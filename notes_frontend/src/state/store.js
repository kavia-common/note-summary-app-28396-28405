import { summarize } from '../utils/summary.js'

/**
 * Simple event emitter for store changes.
 * Components can subscribe to store events to re-render appropriately.
 */
class Emitter {
  constructor() {
    this.listeners = new Set()
  }
  on(fn) {
    this.listeners.add(fn)
    return () => this.off(fn)
  }
  off(fn) {
    this.listeners.delete(fn)
  }
  emit(payload) {
    for (const fn of this.listeners) {
      try {
        fn(payload)
      } catch (e) {
        console.error('Store listener error', e)
      }
    }
  }
}

/**
 * Note model:
 * { id: string, title: string, content: string, summary: string, createdAt: number, updatedAt: number }
 */

const STORAGE_KEY = 'notes-app:v1'

/**
 * PUBLIC_INTERFACE
 * Store singleton handling notes state and persistence.
 * Provides:
 * - subscribe(fn): unsubscribe -> listen to state updates
 * - getState(): shallow copy of state
 * - loadFromStorage(): load notes from localStorage with safe fallbacks
 * - persistToStorage(): persist state to localStorage
 * - addNote({title, content}), updateNote(id, {title, content}), deleteNote(id)
 * - selectNote(id), getSelectedNote()
 */
export const store = {
  /** Internal reactive state */
  _state: {
    notes: [],
    selectedNoteId: null
  },

  /** Emitter for state changes */
  _emitter: new Emitter(),

  /** Track if initialization has completed */
  _initialized: false,

  /**
   * Subscribe to store updates.
   * Returns unsubscribe function.
   * PUBLIC_INTERFACE
   */
  subscribe(fn) {
    return this._emitter.on(fn)
  },

  /** Notify subscribers */
  _notify() {
    this._emitter.emit(this.getState())
  },

  /** PUBLIC_INTERFACE */
  getState() {
    // Return a shallow clone to prevent accidental mutations
    return { ...this._state, notes: [...this._state.notes] }
  },

  /** PUBLIC_INTERFACE */
  // PUBLIC_INTERFACE
  loadFromStorage() {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && Array.isArray(parsed.notes)) {
          this._state.notes = parsed.notes
          this._state.selectedNoteId = parsed.selectedNoteId || null
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load notes from storage', e)
    }

    // If no notes exist (first run), create a starter note so the UI doesn't look blank.
    if (!this._state.notes || this._state.notes.length === 0) {
      try {
        const starter = this.addNote({
          title: 'Welcome to Ocean Notes',
          content:
            'Start typing your first note here. This app automatically generates a short summary from the content. Have fun!'
        })
        // addNote already persists and notifies, but ensure selected id
        this._state.selectedNoteId = starter?.id || null
        this.persistToStorage()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[Store] Starter note creation failed', e)
      }
    } else {
      this._notify()
    }
  },

  /** PUBLIC_INTERFACE */
  persistToStorage() {
    try {
      if (typeof window !== 'undefined') {
        const payload = JSON.stringify(this._state)
        window.localStorage.setItem(STORAGE_KEY, payload)
      }
    } catch (e) {
      console.warn('Failed to persist notes to storage', e)
    }
  },

  _now() {
    return Date.now()
  },

  _uuid() {
    // Simple pseudo-UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  /** PUBLIC_INTERFACE */
  addNote({ title = '', content = '' } = {}) {
    const id = this._uuid()
    const ts = this._now()
    const note = {
      id,
      title: (title || '').trim(),
      content: (content || '').trim(),
      summary: summarize(content || ''),
      createdAt: ts,
      updatedAt: ts
    }
    this._state.notes = [note, ...this._state.notes]
    this._state.selectedNoteId = id
    this.persistToStorage()
    this._notify()
    return note
  },

  /** PUBLIC_INTERFACE */
  updateNote(id, { title, content }) {
    let updated = false
    const notes = this._state.notes.map((n) => {
      if (n.id === id) {
        const newTitle = typeof title === 'string' ? title : n.title
        const newContent = typeof content === 'string' ? content : n.content
        updated = true
        return {
          ...n,
          title: newTitle,
          content: newContent,
          summary: summarize(newContent),
          updatedAt: this._now()
        }
      }
      return n
    })
    if (updated) {
      this._state.notes = notes
      this.persistToStorage()
      this._notify()
    }
  },

  /** PUBLIC_INTERFACE */
  deleteNote(id) {
    const before = this._state.notes.length
    this._state.notes = this._state.notes.filter((n) => n.id !== id)
    if (this._state.selectedNoteId === id) {
      this._state.selectedNoteId = this._state.notes[0]?.id || null
    }
    if (this._state.notes.length !== before) {
      this.persistToStorage()
      this._notify()
    }
  },

  /** PUBLIC_INTERFACE */
  selectNote(id) {
    this._state.selectedNoteId = id
    this.persistToStorage()
    this._notify()
  },

  /** PUBLIC_INTERFACE */
  getSelectedNote() {
    return this._state.notes.find((n) => n.id === this._state.selectedNoteId) || null
  }
}

// Initialize store synchronously when module loads
// This ensures data is ready before any components mount
try {
  store.loadFromStorage()
  store._initialized = true
} catch (e) {
  console.error('[Store] Failed to initialize', e)
}

export default store
