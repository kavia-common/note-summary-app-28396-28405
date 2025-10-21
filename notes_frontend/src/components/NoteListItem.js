import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import store from '../state/store.js'
import { summarizePreview } from '../utils/summary.js'

function timeAgo(ts) {
  const diff = Date.now() - ts
  const s = Math.floor(diff / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export default Blits.Component('NoteListItem', {
  props: ['note', 'selected'],
  methods: {
    // PUBLIC_INTERFACE
    select() {
      store.selectNote(this.note.id)
    }
  },
  template: `
    <Element
      :color="$bgColor"
      :w="$w"
      h="96"
      :x="$x"
      :y="$y"
      :alpha="$alpha"
      @enter="select"
    >
      <Element w="6" h="96" :color="$leftBorder" />
      <Text :content="$title" x="20" y="12" fontSize="22" :color="$titleColor" />
      <Text :content="$preview" x="20" y="46" fontSize="18" :color="$previewColor" />
      <Text :content="$when" x="560" y="16" fontSize="16" :color="$previewColor" />
    </Element>
  `,
  computed: {
    $w() {
      return 640
    },
    $x() {
      return 0
    },
    $y() {
      return 0
    },
    $alpha() {
      return this.selected ? 1 : 0.96
    },
    $bgColor() {
      return this.selected ? theme.colors.tint : theme.colors.surface
    },
    $leftBorder() {
      return this.selected ? theme.colors.primary : theme.colors.surface
    },
    $title() {
      return (this.note.title || '').trim() || 'Untitled'
    },
    $preview() {
      return summarizePreview(this.note.content || '')
    },
    $when() {
      return timeAgo(this.note.updatedAt || this.note.createdAt || Date.now())
    },
    $titleColor() {
      return theme.colors.text
    },
    $previewColor() {
      return theme.colors.muted
    }
  }
})
