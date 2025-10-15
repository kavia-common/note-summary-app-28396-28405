# Ocean Notes - Test Plan

This plan covers unit tests for core utilities and store behavior, and manual/integration tests for flows and persistence.

## Unit Tests

1) summary.summarize
- trims and normalizes whitespace
- extracts first sentence ending with `.`, `!`, or `?`
- falls back to first ~120 chars with ellipsis
- strips common markdown characters and links
- collapses spaces and preserves readability

2) summary.summarizePreview
- produces a shorter variant (50-90 chars) suitable for 1-2 lines
- respects ellipsis when truncating

3) store
- loadFromStorage/persistToStorage no-ops safely when storage is empty
- addNote creates note with summary, timestamps, and selects it
- updateNote updates title/content/summary/updatedAt
- deleteNote removes and updates selection appropriately
- selectNote changes selectedNoteId and persists
- getSelectedNote returns the correct note
- event emitter notifies subscribers on changes

## Manual / Integration Scenarios

A) First Run Empty State
- Launch app, verify EmptyState appears with "Create Note" button.
- Press Enter to create a note; editor and list appear.

B) Create and Edit Flow
- Create a note from TopNav or NotesList (+).
- Type a title and content (simulated), Save.
- Observe summary updates and timestamp changes in the list.

C) Regenerate Summary
- Update content, hit Regenerate, ensure summary pane reflects new content.

D) Delete Note
- Delete the current note.
- If other notes exist, ensure selection moves to the next newest note; otherwise, EmptyState returns.

E) Persistence
- Create multiple notes, refresh the page.
- Verify notes and selection persist.

F) Keyboard and Navigation
- Use Up/Down in the list to move selection; Enter selects (already selected when moved).
- Use Save shortcut (Ctrl/Cmd+S mapping depends on environment; in demo, Save button suffices).

G) Accessibility and Visuals
- Ensure buttons have clear labels and high-contrast text on buttons.
- Focus and visual feedback is present on selected list item.
