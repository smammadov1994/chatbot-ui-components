import { useState, useCallback } from 'react'
import { ChatMessage } from '../types'

/**
 * Hook to manage chat messages state
 */
export const useChatMessages = (initialMessages: ChatMessage[] = []) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message])
  }, [])

  const removeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
  }, [])

  const updateMessage = useCallback((messageId: string, updates: Partial<ChatMessage>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, ...updates } : msg
    ))
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const getMessageById = useCallback((messageId: string) => {
    return messages.find(msg => msg.id === messageId)
  }, [messages])

  return {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    clearMessages,
    getMessageById,
    setMessages
  }
}
