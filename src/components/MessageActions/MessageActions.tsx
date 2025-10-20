import React, { useCallback } from 'react'
import { RefreshCw, Copy, Heart, Edit } from 'lucide-react'
import { MessageActionsProps, MessageActionType } from '../../types'
import { copyToClipboard } from '../../utils'
import styles from './MessageActions.module.css'

/**
 * MessageActions component displays interactive action buttons for messages
 */
export const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  content,
  onRegenerate,
  onCopy,
  onLove,
  onImprove,
  className = '',
  actions = ['regenerate', 'copy', 'love', 'improve'],
  iconSize = 20
}) => {
  const handleRegenerate = useCallback(() => {
    if (onRegenerate) {
      onRegenerate(messageId)
    } else {
      console.log('Regenerate clicked for message:', messageId)
    }
  }, [messageId, onRegenerate])

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(content)
    if (onCopy) {
      onCopy(content)
    } else if (success) {
      console.log('Content copied to clipboard')
    } else {
      console.error('Failed to copy content')
    }
  }, [content, onCopy])

  const handleLove = useCallback(() => {
    if (onLove) {
      onLove(messageId)
    } else {
      console.log('Love clicked for message:', messageId)
    }
  }, [messageId, onLove])

  const handleImprove = useCallback(() => {
    if (onImprove) {
      onImprove(messageId)
    } else {
      console.log('Improve clicked for message:', messageId)
    }
  }, [messageId, onImprove])

  const actionConfig: Record<MessageActionType, {
    icon: React.ReactNode
    label: string
    handler: () => void
  }> = {
    regenerate: {
      icon: <RefreshCw size={iconSize} />,
      label: 'Regenerate response',
      handler: handleRegenerate
    },
    copy: {
      icon: <Copy size={iconSize} />,
      label: 'Copy response',
      handler: handleCopy
    },
    love: {
      icon: <Heart size={iconSize} />,
      label: 'Love this response',
      handler: handleLove
    },
    improve: {
      icon: <Edit size={iconSize} />,
      label: 'Need improvement',
      handler: handleImprove
    }
  }

  return (
    <div className={`${styles.responseIcons} ${className}`}>
      {actions.map((action) => {
        const config = actionConfig[action]
        return (
          <button
            key={action}
            className={styles.iconButton}
            onClick={config.handler}
            aria-label={config.label}
            title={config.label}
            type="button"
          >
            {config.icon}
          </button>
        )
      })}
    </div>
  )
}
