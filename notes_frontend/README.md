# Ocean Notes - LightningJS Notes Application

A modern notes application built with LightningJS Blits framework. Users can create, edit, and delete notes with automatic summary generation and persistent local storage.

![Ocean Professional Theme](https://img.shields.io/badge/theme-Ocean%20Professional-2563EB)
![Lightning 3](https://img.shields.io/badge/Lightning-3.0-orange)

## Features

### Core Functionality
- ✅ **Create Notes**: Add new notes from the top navigation or notes list panel
- ✅ **Edit Notes**: Click on title or content fields to edit with full keyboard input
- ✅ **Delete Notes**: Remove notes with a single button click
- ✅ **Auto-Summary**: Automatically generates concise 1-2 sentence summaries from note content
- ✅ **Persistent Storage**: All notes saved to browser localStorage with automatic sync
- ✅ **Real-time Updates**: UI updates immediately across all panels when changes occur

### User Interface
- **Top Navigation Bar**: App title and quick "New Note" button
- **Left Panel**: Scrollable list of all notes with titles, summaries, and timestamps
- **Right Panel**: Editor with title field, content area, summary display, and action buttons
- **Empty State**: Friendly onboarding when no notes exist

### Design & Theme
- **Ocean Professional Theme**: Clean blue (#2563EB) and amber (#F59E0B) accents
- **Modern Layout**: Rounded corners, subtle shadows, and responsive design
- **Visual Feedback**: Selected note highlighting, edit mode indication, button hover states
- **Accessibility**: High contrast text, clear focus indicators, keyboard navigation

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

This starts Vite dev server with hot reloading. Visit `http://localhost:3000` (or the provided URL) in your browser.

### Production Build

```bash
npm run build
```

Creates an optimized build in the `dist/` folder.

### Linting

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

## Usage Guide

### Creating a Note
1. Click the **"+ New Note"** button in the top navigation bar, OR
2. Click the **"+"** button in the notes list header
3. A new blank note is created and automatically selected

### Editing a Note
1. Select a note from the list (click or use keyboard navigation)
2. In the editor panel, press **Enter** on the **Title** field to edit the title
3. Press **Enter** on the **Content** field to edit the content
4. Type normally - all standard keyboard characters work
5. Press **Backspace** to delete characters
6. Press **Enter** while editing content to add new lines
7. Press **Escape** to exit edit mode
8. Click **Save** button or press **Ctrl+S** (Cmd+S on Mac) to save changes

### Deleting a Note
1. Select the note you want to delete
2. Click the **"Del"** button in the editor panel
3. The note is immediately removed and the next note is selected

### Summary Generation
- Summaries are **automatically generated** when you save a note
- Click **"Regenerate"** button to manually refresh the summary
- Summary algorithm extracts the first 1-2 sentences (max ~120 characters)
- Displayed below each note in the list and in the editor's summary section

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Arrow Up/Down** | Navigate notes list |
| **Enter** | Select note / Enter edit mode on focused field |
| **Escape** | Exit edit mode / Go back |
| **Ctrl+S / Cmd+S** | Save current note (when editing) |
| **Backspace** | Delete character (when editing) |
| **Any letter/number** | Type character (when editing) |

## Project Structure

```
src/
├── index.js                 # Application entry point with Blits.Launch
├── App.js                   # Root application component with routing
├── theme.js                 # Theme colors, metrics, and style helpers
│
├── pages/
│   └── Home.js             # Main page layout with notes list and editor
│
├── components/
│   ├── TopNav.js           # Top navigation bar with "New Note" button
│   ├── NotesList.js        # Left panel: scrollable list of notes
│   ├── NoteListItem.js     # Individual note card with title, summary, timestamp
│   ├── EditorPanel.js      # Right panel: title/content editing, actions
│   ├── EmptyState.js       # Shown when no notes exist
│   ├── ErrorBoundary.js    # Error handling wrapper (optional)
│   ├── Loader.js           # Loading spinner component (optional)
│   └── Button.js           # Generic button component (optional)
│
├── state/
│   └── store.js            # Centralized state management with localStorage
│
└── utils/
    └── summary.js          # Summary generation utilities
```

## Technical Details

### State Management
- **Custom Store**: Lightweight event emitter pattern for reactive state
- **Persistence**: Automatic localStorage sync on every state change
- **Key**: `notes-app:v1`
- **Note Model**: `{ id, title, content, summary, createdAt, updatedAt }`

### Summary Algorithm
1. Strip markdown-like characters (`#`, `*`, `_`, etc.)
2. Normalize whitespace (collapse multiple spaces)
3. Extract first sentence using punctuation detection (`.`, `?`, `!`)
4. Fallback to first ~120 characters if no sentence boundary found
5. Add ellipsis (`…`) if truncated

### LightningJS Specifics
- **WebGL Rendering**: Lightning renders via WebGL, not DOM
- **No HTML/CSS**: Uses Lightning XML-style templates with `<Element>` and `<Text>`
- **Keyboard Input**: Custom keyboard handler for text editing (window event listener)
- **Reactive State**: Computed properties automatically update when state changes
- **Component Lifecycle**: `mounted()` and `destroyed()` hooks for setup/cleanup

### Browser Compatibility
- Modern browsers with localStorage and ES6+ support
- Tested on Chrome, Firefox, Safari, Edge

## Data Persistence

### localStorage Structure
```json
{
  "notes": [
    {
      "id": "uuid-v4",
      "title": "My Note Title",
      "content": "Full note content here...",
      "summary": "Auto-generated summary",
      "createdAt": 1704067200000,
      "updatedAt": 1704153600000
    }
  ],
  "selectedNoteId": "uuid-v4"
}
```

### Seed Data
On first launch (no existing notes), a welcome note is automatically created to demonstrate the UI.

## Styling & Theming

### Color Palette
- **Primary**: `#2563EB` (Blue) - buttons, accents, borders
- **Secondary**: `#F59E0B` (Amber) - success states, regenerate button
- **Error**: `#EF4444` (Red) - delete button
- **Background**: `#f9fafb` (Light gray) - app background
- **Surface**: `#ffffff` (White) - panels and cards
- **Text**: `#111827` (Dark gray) - primary text
- **Muted**: `#6B7280` (Medium gray) - secondary text, timestamps

### Layout Metrics
- **Navigation Height**: 100px
- **Notes List Width**: 680px
- **Editor Panel Width**: 1180px
- **Total Canvas**: 1920x1080 (Lightning standard)

## Development Notes

### Adding New Features
1. Create new component in `src/components/`
2. Import and register in parent component's `components` object
3. Add to template using XML-style tag: `<YourComponent />`
4. Use props for passing data down, emit events or call store methods for actions

### Debugging
- Set `debugLevel: 1` or higher in `src/index.js` Blits.Launch config
- Use browser DevTools console for logging
- Check localStorage in Application tab for state inspection

### Common Pitfalls
- ⚠️ Don't use React/JSX/HTML - Lightning is NOT DOM-based
- ⚠️ Always use `:key` with `:for` loops
- ⚠️ Images require both `w` and `h` attributes to render
- ⚠️ Use `$` prefix for loop variables: `$item`, `$index`
- ⚠️ Reactive bindings use `:prop="expr"` syntax

## Resources

- [LightningJS Official Docs](https://lightningjs.io/v3-docs/blits/getting_started/intro.html)
- [Blits Example App](https://blits-demo.lightningjs.io/?source=true)
- [Blits Components Library](https://lightningjs.io/blits-components.html)
- [Blits VS Code Extension](https://marketplace.visualstudio.com/items?itemName=LightningJS.lightning-blits)

## License

MIT

## Contributing

This is a demo application. For production use, consider:
- Adding user authentication
- Backend API integration
- Rich text editing support
- Search and filtering
- Categories/tags system
- Export/import functionality
- Cloud sync capabilities
