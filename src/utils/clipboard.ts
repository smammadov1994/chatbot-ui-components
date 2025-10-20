/**
 * Copy text to clipboard with fallback for older browsers
 * @param text - The text to copy
 * @returns Promise that resolves to true if successful
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Modern clipboard API
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    } catch (fallbackError) {
      console.error('Failed to copy text:', fallbackError)
      return false
    }
  }
}
