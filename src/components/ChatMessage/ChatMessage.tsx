import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { ChatMessageProps } from '../../types'
import { formatTime, isOldMessage } from '../../utils'
import styles from './ChatMessage.module.css'

/**
 * ChatMessage component displays individual messages with role-based styling
 */
export const ChatMessage = React.memo<ChatMessageProps>(({
  message,
  onAction,
  showActions = true,
  showTimestamp = true,
  className = '',
  customRenderer,
  isOld: isOldProp
}) => {
  const formattedTime = useMemo(() => 
    formatTime(message.timestamp), 
    [message.timestamp]
  )
  
  const isOld = useMemo(() => 
    isOldProp !== undefined ? isOldProp : isOldMessage(message.timestamp), 
    [message.timestamp, isOldProp]
  )

  const messageClasses = `${styles.message} ${styles[message.role]} ${isOld ? styles.old : ''} ${className}`

  // Custom markdown components for assistant messages
  const markdownComponents = {
    p: ({ children }: any) => <p className={styles.markdownParagraph}>{children}</p>,
    strong: ({ children }: any) => <strong className={styles.markdownBold}>{children}</strong>,
    code: ({ children }: any) => <code className={styles.markdownCode}>{children}</code>,
    pre: ({ children }: any) => <pre className={styles.markdownCodeBlock}>{children}</pre>,
    h1: ({ children }: any) => <h1 className={styles.markdownH1}>{children}</h1>,
    h2: ({ children }: any) => <h2 className={styles.markdownH2}>{children}</h2>,
    h3: ({ children }: any) => <h3 className={styles.markdownH3}>{children}</h3>,
    ul: ({ children }: any) => <ul className={styles.markdownUnorderedList}>{children}</ul>,
    ol: ({ children }: any) => <ol className={styles.markdownOrderedList}>{children}</ol>,
    li: ({ children }: any) => <li className={styles.markdownListItem}>{children}</li>,
  }

  const renderContent = () => {
    if (customRenderer) {
      return customRenderer(message.content)
    }

    if (message.role === 'assistant') {
      return (
        <div className={styles.markdown}>
          <ReactMarkdown components={markdownComponents}>
            {message.content}
          </ReactMarkdown>
        </div>
      )
    }

    return message.content
  }

  return (
    <div className={messageClasses}>
      <div className={`${styles.messageContent} ${styles[message.role]}`}>
        {renderContent()}
      </div>
      
      {showTimestamp && (
        <div className={styles.messageTimestamp}>
          {formattedTime}
        </div>
      )}
    </div>
  )
})

ChatMessage.displayName = 'ChatMessage'
