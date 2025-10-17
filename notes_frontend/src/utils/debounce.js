/**
 * PUBLIC_INTERFACE
 * debounce(func, wait): function
 * 
 * Creates a debounced version of the provided function that delays execution
 * until after `wait` milliseconds have elapsed since the last invocation.
 * 
 * Useful for:
 * - Auto-saving notes after user stops typing
 * - Throttling expensive operations like summary generation
 * - Rate-limiting API calls
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds (default: 300)
 * @returns {Function} Debounced function
 * 
 * Example:
 * ```js
 * const debouncedSave = debounce(() => {
 *   store.updateNote(id, { content: currentContent })
 * }, 300)
 * 
 * // Call multiple times rapidly
 * debouncedSave() // Cancelled
 * debouncedSave() // Cancelled
 * debouncedSave() // Will execute after 300ms
 * ```
 */
export function debounce(func, wait = 300) {
  let timeout = null

  return function debounced(...args) {
    const context = this

    // Clear existing timeout
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    // Set new timeout
    timeout = setTimeout(() => {
      timeout = null
      func.apply(context, args)
    }, wait)
  }
}

/**
 * PUBLIC_INTERFACE
 * throttle(func, limit): function
 * 
 * Creates a throttled version of the provided function that only executes
 * at most once per `limit` milliseconds.
 * 
 * Unlike debounce, throttle ensures the function is called at regular intervals
 * during continuous invocations.
 * 
 * @param {Function} func - The function to throttle
 * @param {number} limit - The minimum time between executions in milliseconds (default: 200)
 * @returns {Function} Throttled function
 * 
 * Example:
 * ```js
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY)
 * }, 200)
 * 
 * window.addEventListener('scroll', throttledScroll)
 * ```
 */
export function throttle(func, limit = 200) {
  let inThrottle = false
  let lastResult

  return function throttled(...args) {
    const context = this

    if (!inThrottle) {
      inThrottle = true
      lastResult = func.apply(context, args)

      setTimeout(() => {
        inThrottle = false
      }, limit)
    }

    return lastResult
  }
}

/**
 * PUBLIC_INTERFACE
 * debounceImmediate(func, wait): function
 * 
 * Creates a debounced function that executes immediately on first call,
 * then debounces subsequent calls.
 * 
 * Useful when you want immediate feedback but want to prevent rapid repeated calls.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds (default: 300)
 * @returns {Function} Debounced function with immediate execution
 */
export function debounceImmediate(func, wait = 300) {
  let timeout = null
  let lastCallTime = 0

  return function debouncedImmediate(...args) {
    const context = this
    const now = Date.now()

    // Clear existing timeout
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    // Execute immediately if enough time has passed
    if (now - lastCallTime >= wait) {
      lastCallTime = now
      return func.apply(context, args)
    }

    // Otherwise, debounce
    timeout = setTimeout(() => {
      timeout = null
      lastCallTime = Date.now()
      func.apply(context, args)
    }, wait)
  }
}

export default debounce
