function normalizeWhitespace(str) {
  return (str || '').replace(/\s+/g, ' ').trim()
}

function stripMarkdown(str) {
  // remove common markdown like decorations
  return (str || '').replace(/[#*>_`~-]+/g, '').replace(/\[(.*?)\]\((.*?)\)/g, '$1')
}

function firstSentence(str) {
  const m = /(.+?[.!?])(\s|$)/.exec(str)
  return m ? m[1] : ''
}

function truncateTo(str, max = 120) {
  if (str.length <= max) return str
  return str.slice(0, Math.max(0, max - 1)).trimEnd() + '…'
}

/**
 * PUBLIC_INTERFACE
 * summarize(content: string): string
 * - trims, normalizes whitespace
 * - extracts first sentence by punctuation [.?!]
 * - fallback to first 120 chars
 * - strips markdown-like characters
 * - collapses spaces and ensures ~120 char limit with ellipsis
 */
export function summarize(content) {
  const cleaned = normalizeWhitespace(stripMarkdown((content || '').trim()))
  if (!cleaned) return ''
  const sent = firstSentence(cleaned)
  const base = sent || cleaned
  return truncateTo(normalizeWhitespace(base), 120)
}

/**
 * PUBLIC_INTERFACE
 * summarizePreview(content: string, lines = 2): string
 * A shorter preview for list items; aims for 1-2 line brevity (~90 chars).
 */
export function summarizePreview(content, lines = 2) {
  const s = summarize(content)
  const max = Math.max(50, Math.min(90, lines * 70))
  return truncateTo(s, max)
}
