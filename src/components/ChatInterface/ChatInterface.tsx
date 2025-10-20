import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ChatInterfaceProps } from '../../types'
import { ChatMessage } from '../ChatMessage'
import { ChatInput } from '../ChatInput'
import { ThinkingIndicator } from '../ThinkingIndicator'
import { MessageActions } from '../MessageActions'
import styles from './ChatInterface.module.css'

/**
 * ChatInterface is the main container component that orchestrates the chat experience
 */
export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading = false,
  onSendMessage,
  onFileUpload,
  onMessageAction,
  className = '',
  theme = 'dark',
  maxWidth = '800px',
  enableVirtualization = false,
  thinkingPhrases,
  customComponents
}) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const MessageComponent = customComponents?.message || ChatMessage
  const InputComponent = customComponents?.input || ChatInput
  const ThinkingComponent = customComponents?.thinking || ThinkingIndicator

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  // Apply theme
  useEffect(() => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const handleSend = useCallback((content: string) => {
    if (onSendMessage) {
      onSendMessage(content)
      setInputValue('')
    }
  }, [onSendMessage])

  const handleMessageAction = useCallback((messageId: string, actionType: string) => {
    if (onMessageAction) {
      onMessageAction(
        {
          type: actionType as any,
          messageId,
          timestamp: new Date()
        },
        messageId
      )
    }
  }, [onMessageAction])

  return (
    <div 
      className={`${styles.chatInterface} ${className}`}
      style={{ maxWidth }}
    >
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={message.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <MessageComponent
              message={message}
              showActions={message.role === 'assistant'}
              showTimestamp
            />
            {message.role === 'assistant' && (
              <div className={styles.messageFooter}>
                <MessageActions
                  messageId={message.id}
                  content={message.content}
                  onRegenerate={(id) => handleMessageAction(id, 'regenerate')}
                  onCopy={() => {}}
                  onLove={(id) => handleMessageAction(id, 'love')}
                  onImprove={(id) => handleMessageAction(id, 'improve')}
                />
                {message.thoughtTime && message.thoughtTime > 0 && (
                  <div className={styles.thoughtSummary}>
                    Thought for {message.thoughtTime} second{message.thoughtTime !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className={styles.loadingContainer}>
            <ThinkingComponent phrases={thinkingPhrases} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <InputComponent
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onFileUpload={onFileUpload}
          disabled={isLoading}
          autoFocus
        />
      </div>
    </div>
  )
}
