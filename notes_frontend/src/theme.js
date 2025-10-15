export const theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#E5E7EB',  // Changed to more visible gray
    surface: '#FFFFFF',      // Keep white for panels
    text: '#111827',
    muted: '#6B7280',
    border: '#D1D5DB',       // Darker border for visibility
    tint: 'rgba(37,99,235,0.08)'
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
