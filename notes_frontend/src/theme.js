export const theme = {
  colors: {
    primary: '#2563EBFF',
    secondary: '#F59E0BFF',
    success: '#F59E0BFF',
    error: '#EF4444FF',
    background: '#f9fafbFF',  // Light gray background as per style guide
    surface: '#ffffffFF',      // White for panels
    text: '#111827FF',
    muted: '#6B7280FF',
    border: '#D1D5DBFF',
    tint: '#2563EB14'  // ~8% opacity
  },
  metrics: {
    radius: 12,
    smallRadius: 8,
    shadow: { alpha: 0.15 },
    spacing: 16
  },
  gradients: {
    header: [ 'rgba(37,99,235,0.08)', 'rgba(249,250,251,1)' ]
  }
}

/**
 * A few small helpers for styling common elements in Blits.
 * These are hints for colors and layout; actual geometry (w,h,x,y) is defined in components.
 */
export const styles = {
  card: {
    color: theme.colors.surface
  },
  elevated: {
    // Using alpha to simulate subtle shadow in Lightning (no CSS)
    alpha: 0.98
  },
  focus: {
    // Slight scale on focus to indicate selection
    scale: 1.02
  }
}

export default theme
