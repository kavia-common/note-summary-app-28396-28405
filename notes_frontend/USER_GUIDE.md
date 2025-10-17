# Ocean Notes - User Guide

## Quick Start

1. **Launch the app**: Run `npm run dev` and open the provided URL
2. **First time**: A welcome note is automatically created
3. **Create a note**: Click "+ New Note" in the top bar
4. **Edit**: Click on a note in the list, then press Enter on Title or Content fields
5. **Type**: Use your keyboard normally - all characters, backspace, and enter work
6. **Save**: Press Escape to exit edit mode, then click "Save" or press Ctrl+S (Cmd+S on Mac)

## Interface Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  Ocean Notes                                    [+ New Note]         │ ← Top Nav
├──────────────────────┬──────────────────────────────────────────────┤
│  Notes (3)        [+]│  Editor         [Save] [Regenerate] [Del]    │
├──────────────────────┤                                               │
│ ┌──────────────────┐ │  Title: My First Note                        │
│ │ Welcome Note     │ │                                               │
│ │ Start typing...  │ │  Content                                     │
│ │ 2m ago          │ │                                               │
│ └──────────────────┘ │  This is the content of my note. I can       │
│                      │  write multiple lines and paragraphs here.   │
│ ┌──────────────────┐ │  The summary will be generated automatically │
│ │ Shopping List    │ │  when I save.                                │
│ │ Buy groceries... │ │                                               │
│ │ 1h ago          │ │                                               │
│ └──────────────────┘ │  Summary                                     │
│                      │                                               │
│ ┌──────────────────┐ │  This is the content of my note.             │
│ │ Meeting Notes    │ │                                               │
│ │ Discussed the... │ │                                               │
│ │ 1d ago          │ │  Press Enter on Title or Content to edit...  │
│ └──────────────────┘ │                                               │
└──────────────────────┴──────────────────────────────────────────────┘
    Notes List              Editor Panel
```

## Step-by-Step Workflows

### Creating Your First Note

1. Click **"+ New Note"** in the top navigation bar
2. A blank note appears and is automatically selected
3. The editor panel on the right shows empty fields
4. Press **Enter** while focused on "Title" field
5. Type your note title (e.g., "My Task List")
6. Press **Escape** to exit title editing
7. Press **Enter** while focused on "Content" field
8. Type your note content (press Enter for new lines)
9. Press **Escape** to exit content editing
10. Click **"Save"** button or press **Ctrl+S**
11. Your note is saved and a summary is generated!

### Editing an Existing Note

1. Click on any note in the left list (or use Up/Down arrows)
2. The note appears in the editor panel on the right
3. Press **Enter** on the Title field to edit it
4. Make your changes, press **Escape** when done
5. Press **Enter** on the Content field to edit it
6. Make your changes, press **Escape** when done
7. Click **"Save"** to persist your changes
8. The summary updates automatically

### Organizing Notes

- **Most Recent First**: Notes are sorted by last updated time
- **Timestamps**: Each note shows how long ago it was modified (2m, 1h, 3d, etc.)
- **Summaries**: Quick preview of note content shown under each title
- **Selection**: Selected note has a blue left border and light blue background

### Using the Summary Feature

**Automatic Generation**
- Summary is created when you save a note
- Extracts the first 1-2 sentences (or ~120 characters)
- Removes markdown formatting for clean text

**Manual Regeneration**
- Click **"Regenerate"** button in the editor
- Useful if you edited content and want to see new summary immediately
- Saves the note automatically

**How It Works**
1. Strips markdown symbols (#, *, _, etc.)
2. Finds first sentence using punctuation (. ? !)
3. Truncates to ~120 characters if needed
4. Adds ellipsis (…) if truncated

### Deleting Notes

1. Select the note you want to delete
2. Click **"Del"** button in the editor panel
3. The note is immediately removed
4. The next available note is automatically selected
5. If no notes remain, you see the empty state screen

## Keyboard Reference

### Navigation
- **Arrow Up**: Move to previous note in list
- **Arrow Down**: Move to next note in list
- **Enter**: Select note / Enter edit mode on focused field

### Editing
- **Any letter/number/symbol**: Type that character
- **Space**: Add a space
- **Backspace**: Delete previous character
- **Enter** (in content mode): Add new line
- **Escape**: Exit edit mode

### Shortcuts
- **Ctrl+S** (Windows/Linux) or **Cmd+S** (Mac): Save current note
- **Escape**: Exit edit mode / Cancel

## Tips & Tricks

### Efficient Note-Taking
1. Use the **"+ New Note"** button for quick access
2. Edit title first to organize, then add content
3. Press **Ctrl+S** frequently to auto-save
4. Let summaries help you quickly scan notes

### Content Formatting
- Use natural sentences for best summaries
- Start with the most important information
- Use paragraph breaks (press Enter twice) for readability
- Summaries work best with clear, concise content

### Keyboard-First Workflow
1. **Alt+Tab** to app window
2. **Arrow Up/Down** to navigate notes
3. **Enter** to select and edit
4. **Type** your content
5. **Escape** then **Ctrl+S** to save
6. **Arrow Down** to next note

### Data Persistence
- All notes saved automatically to browser localStorage
- Data persists across browser sessions
- Survives page refreshes and app restarts
- Clearing browser data will erase notes (export/backup not yet implemented)

### Edit Mode Indicators
- **Title field**: Light blue background when editing
- **Content field**: Light blue background when editing
- **Cursor**: Blinking vertical bar shows where text appears
- **Instructions**: Bottom of editor shows current mode and available actions

## Troubleshooting

### Note not saving?
- Make sure you clicked "Save" or pressed Ctrl+S
- Check that you exited edit mode (press Escape first)
- Verify browser localStorage is enabled

### Can't type in editor?
- Press **Enter** on the Title or Content field first to enter edit mode
- Look for blue background indicating edit mode is active
- Check bottom instruction text for current state

### Summary not updating?
- Summary regenerates automatically when you save
- Click "Regenerate" button to force update
- Make sure content field has actual text (not empty)

### Notes disappeared?
- Check browser localStorage wasn't cleared
- Try refreshing the page (F5)
- Notes are stored per-browser/per-domain

### App looks different?
- Ensure you're viewing at proper resolution (designed for 1920x1080)
- Try zooming to 100% in browser
- LightningJS renders via WebGL - some browser extensions may interfere

## Advanced Features

### Starter Note
- On first launch, a "Welcome to Ocean Notes" note is created
- Feel free to edit or delete this note
- Helps new users understand the interface immediately

### State Management
- Uses custom event emitter for reactive updates
- All components sync automatically when store changes
- Unsubscribes on component destruction to prevent memory leaks

### Error Handling
- ErrorBoundary component catches rendering errors
- Graceful degradation if localStorage unavailable
- Console warnings for debugging (check DevTools)

## Accessibility

- **High Contrast**: Dark text on light backgrounds
- **Clear Focus**: Selected items have visual indicators
- **Keyboard Navigation**: Full app usable without mouse
- **Readable Text**: 18-22px font sizes for readability
- **Color Blind Safe**: Not relying solely on color for information

## Data Format

Your notes are stored in localStorage with this structure:

```json
{
  "notes": [
    {
      "id": "unique-uuid",
      "title": "Note Title",
      "content": "Full content here...",
      "summary": "Auto-generated summary",
      "createdAt": 1704067200000,
      "updatedAt": 1704153600000
    }
  ],
  "selectedNoteId": "unique-uuid"
}
```

Access in browser DevTools: **Application → Local Storage → notes-app:v1**

## FAQ

**Q: Can I export my notes?**  
A: Not yet implemented. Future versions may include export to JSON/Markdown.

**Q: Is there a mobile version?**  
A: Currently optimized for desktop (1920x1080). Mobile support planned.

**Q: Can I sync notes across devices?**  
A: Not yet. Currently localStorage only (device-specific). Cloud sync may be added later.

**Q: What's the note limit?**  
A: Limited only by browser localStorage (typically 5-10MB). Thousands of notes supported.

**Q: Can I add images or attachments?**  
A: Not in current version. Text-only for now.

**Q: How do I back up my notes?**  
A: Use browser DevTools to copy localStorage data, or export as JSON (feature coming soon).

## Getting Help

- **Issues**: Check browser console for error messages
- **Documentation**: See README.md for technical details
- **Resources**: [LightningJS Docs](https://lightningjs.io/v3-docs/blits/)

---

**Version**: 1.0  
**Last Updated**: 2024  
**Framework**: LightningJS Blits 1.29.2
