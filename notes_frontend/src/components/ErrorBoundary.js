import Blits from '@lightningjs/blits'

/**
 * ErrorBoundary component for Blits.
 * Catches errors thrown by child rendering/methods and surfaces them on-screen to avoid blank UI.
 */
export default Blits.Component('ErrorBoundary', {
  components: {},
  /**
   * PUBLIC_INTERFACE
   * Props:
   * - render: a function (component template composition) to render children; invoked within try/catch
   */
  props: ['render'],
  state() {
    return {
      hasError: false,
      message: '',
      stack: '',
    }
  },
  methods: {
    // PUBLIC_INTERFACE
    reset() {
      this.hasError = false
      this.message = ''
      this.stack = ''
    },
    _renderChildrenSafe() {
      try {
        // invoke provided renderer; must return valid template fragment string
        if (typeof this.render === 'function') {
          return this.render()
        }
        return '<Element />'
      } catch (e) {
        this.hasError = true
        this.message = e?.message || 'Unknown error'
        this.stack = (e?.stack || '').toString()
        // Also log to console to aid debugging
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary caught error:', e)
        return '<Element />'
      }
    }
  },
  template: `
    <Element w="1920" h="1080">
      <Element :alpha="$showChild">
        <Element :contentTemplate="$childTemplate" />
      </Element>

      <Element :alpha="$showError" w="1920" h="1080" :color="$overlay">
        <Text content="An error occurred" x="80" y="80" fontSize="36" color="#ffffff" />
        <Text :content="$msg" x="80" y="140" fontSize="22" color="#ffffff" />
        <Text :content="$stk" x="80" y="180" fontSize="18" color="#e5e7eb" />
      </Element>
    </Element>
  `,
  computed: {
    $showError() { return this.hasError ? 1 : 0 },
    $showChild() { return this.hasError ? 0 : 1 },
    $overlay() { return 'rgba(0,0,0,0.6)' },
    $msg() { return this.message || '' },
    $stk() { return (this.stack || '').slice(0, 1500) },
    $childTemplate() {
      // Produce a child template segment as string
      return this._renderChildrenSafe()
    }
  }
})
