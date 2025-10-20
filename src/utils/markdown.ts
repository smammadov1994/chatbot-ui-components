/**
 * Utility functions for markdown processing
 */

/**
 * Strip markdown formatting from text
 * @param markdown - The markdown text
 * @returns Plain text without markdown formatting
 */
export const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/!\[(.+?)\]\(.+?\)/g, '$1') // Remove images
    .trim()
}

/**
 * Truncate text to a maximum length
 * @param text - The text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength - 3) + '...'
}

/**
 * Count words in text
 * @param text - The text to count words in
 * @returns Number of words
 */
export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).length
}
