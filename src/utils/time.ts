/**
 * Format a Date object to a readable time string
 * @param date - The date to format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/**
 * Check if a message is old (older than 5 minutes)
 * @param timestamp - The message timestamp
 * @returns True if the message is older than 5 minutes
 */
export const isOldMessage = (timestamp: Date): boolean => {
  const messageTime = new Date(timestamp)
  const now = new Date()
  return (now.getTime() - messageTime.getTime()) > 5 * 60 * 1000
}

/**
 * Get relative time string (e.g., "2 minutes ago")
 * @param date - The date to format
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
}
