# Ocean Notes - LightningJS Blits

A modern notes application built with LightningJS Blits. Users can create, edit, and delete notes with automatic summary generation and persistent local storage.

## Getting started

Follow the steps below to get your Lightning 3 Blits App up and running in no time.

### IDE setup

It is highly recommended to install the Blits [VS-code extension](https://marketplace.visualstudio.com/items?itemName=LightningJS.lightning-blits) which will give you template highlighting and improved autocompletion.

### Project setup

Run the following command to install the dependencies of your App:

```sh
npm install
```

### Build and run in development mode

Run your App in development mode:

```sh
npm run dev
```

This command uses Vite to fire up a local server, with Hot Reloading support. Visit the provided link in your web browser to see the App in action.

### Build the App for production

Create an optimized and minified version of your App:

```sh
npm run build
```

This will create a production version of the app in the `dist` folder.

## Acceptance Criteria

- Create/Edit/Delete
  - Users can create a new note from the top nav or notes list.
  - Users can edit the note title and content, then save.
  - Users can delete the selected note.
- Auto Summary
  - When saving, the app regenerates a concise summary derived from the content (first sentence or fallback to ~120 chars).
- Persistence
  - Notes state persists across reloads via localStorage under key `notes-app:v1`.
- Theme and Layout
  - App uses the Ocean Professional theme with a top navigation bar, left notes list, and right editor panel.
  - Subtle shadows, rounded corners, and gentle blue accents present.
- Keyboard Shortcuts
  - Editor supports save via a keyboard shortcut (Ctrl/Cmd+S mapped to Save behavior).
  - Notes list supports Up/Down to navigate and Enter to select.
- Accessibility
  - Buttons include intent-driven labels; focus and hover affordances are present visually.

## Development Notes

- Code lives under `src/` with modular components.
- State management implemented via a lightweight store with an event emitter and localStorage persistence.
- Summary utility is a pure function for unit testability.

### Resources

- [Blits documentation](https://lightningjs.io/v3-docs/blits/getting_started/intro.html) - official documentation
- [Blits Example App](https://blits-demo.lightningjs.io/?source=true) - a great reference to learn by example
- [Blits Components](https://lightningjs.io/blits-components.html) - off-the-shelf, basic and performant reference components
