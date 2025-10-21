/**
 * Storage utilities for Ocean Notes
 * Handles localStorage operations with error handling and fallbacks
 */

const STORAGE_KEY = 'notes-app:v1'

/**
 * PUBLIC_INTERFACE
 * loadNotes(): object | null
 * 
 * Loads notes data from localStorage.
 * Returns parsed data or null if unavailable/invalid.
 */
export function loadNotes() {
  try {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('[Storage] Failed to load notes:', e)
    return null
  }
}

/**
 * PUBLIC_INTERFACE
 * saveNotes(data): boolean
 * 
 * Saves notes data to localStorage.
 * Returns true if successful, false otherwise.
 */
export function saveNotes(data) {
  try {
    if (typeof window === 'undefined') return false
    const serialized = JSON.stringify(data)
    window.localStorage.setItem(STORAGE_KEY, serialized)
    return true
  } catch (e) {
    console.warn('[Storage] Failed to save notes:', e)
    return false
  }
}

/**
 * PUBLIC_INTERFACE
 * clearNotes(): boolean
 * 
 * Removes all notes data from localStorage.
 * Returns true if successful, false otherwise.
 */
export function clearNotes() {
  try {
    if (typeof window === 'undefined') return false
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.warn('[Storage] Failed to clear notes:', e)
    return false
  }
}

/**
 * PUBLIC_INTERFACE
 * exportNotesAsJSON(): string
 * 
 * Exports all notes as a JSON string for backup purposes.
 * Returns formatted JSON string or empty string on error.
 */
export function exportNotesAsJSON() {
  try {
    const data = loadNotes()
    if (!data) return ''
    return JSON.stringify(data, null, 2)
  } catch (e) {
    console.warn('[Storage] Failed to export notes:', e)
    return ''
  }
}

/**
 * PUBLIC_INTERFACE
 * importNotesFromJSON(jsonString): boolean
 * 
 * Imports notes from a JSON string.
 * Returns true if successful, false otherwise.
 * Warning: This will overwrite existing notes!
 */
export function importNotesFromJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString)
    if (!data || !Array.isArray(data.notes)) {
      throw new Error('Invalid notes data format')
    }
    return saveNotes(data)
  } catch (e) {
    console.warn('[Storage] Failed to import notes:', e)
    return false
  }
}

/**
 * PUBLIC_INTERFACE
 * getStorageSize(): number
 * 
 * Returns the approximate size of stored notes data in bytes.
 * Returns 0 if unavailable.
 */
export function getStorageSize() {
  try {
    if (typeof window === 'undefined') return 0
    const data = window.localStorage.getItem(STORAGE_KEY)
    return data ? new Blob([data]).size : 0
  } catch (e) {
    console.warn('[Storage] Failed to get storage size:', e)
    return 0
  }
}

/**
 * PUBLIC_INTERFACE
 * isStorageAvailable(): boolean
 * 
 * Tests if localStorage is available and writable.
 * Some browsers disable localStorage in private mode.
 */
export function isStorageAvailable() {
  try {
    if (typeof window === 'undefined') return false
    const testKey = '__storage_test__'
    window.localStorage.setItem(testKey, 'test')
    window.localStorage.removeItem(testKey)
    return true
  } catch (err) {
    console.warn('[Storage] isStorageAvailable check failed:', err)
    return false
  }
}

/**
 * PUBLIC_INTERFACE
 * generateId(): string
 * 
 * Generates a unique ID for a new note.
 * Uses UUID v4 format.
 */
export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * PUBLIC_INTERFACE
 * createBackup(): object | null
 * 
 * Creates a complete backup of notes with metadata.
 * Returns backup object or null on error.
 */
export function createBackup() {
  try {
    const data = loadNotes()
    if (!data) return null
    
    return {
      version: '1.0',
      timestamp: Date.now(),
      notesCount: data.notes?.length || 0,
      data: data
    }
  } catch (_e) {
    console.warn('[Storage] Failed to create backup:', _e)
    return null
  }
}

/**
 * PUBLIC_INTERFACE
 * restoreBackup(backup): boolean
 * 
 * Restores notes from a backup object.
 * Returns true if successful, false otherwise.
 */
export function restoreBackup(backup) {
  try {
    if (!backup || !backup.data) {
      throw new Error('Invalid backup format')
    }
    return saveNotes(backup.data)
  } catch (e) {
    console.warn('[Storage] Failed to restore backup:', e)
    return false
  }
}

export default {
  loadNotes,
  saveNotes,
  clearNotes,
  exportNotesAsJSON,
  importNotesFromJSON,
  getStorageSize,
  isStorageAvailable,
  generateId,
  createBackup,
  restoreBackup,
  STORAGE_KEY
}
