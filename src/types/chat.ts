import { ReactNode } from 'react'

/**
 * Represents a single chat message
 */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string
  /** Role of the message sender */
  role: 'user' | 'assistant' | 'system'
  /** Content of the message (supports markdown for assistant messages) */
  content: string
  /** Timestamp when the message was created */
  timestamp: Date
  /** Optional: Time in seconds the AI spent thinking before responding */
  thoughtTime?: number
  /** Optional: Additional metadata for the message */
  metadata?: Record<string, any>
}

/**
 * Types of actions that can be performed on messages
 */
export type MessageActionType = 'regenerate' | 'copy' | 'love' | 'improve'

/**
 * Represents an action performed on a message
 */
export interface MessageAction {
  /** Type of action performed */
  type: MessageActionType
  /** ID of the message the action was performed on */
  messageId: string
  /** Timestamp when the action was performed */
  timestamp: Date
}

/**
 * Props for the ChatInterface component
 */
export interface ChatInterfaceProps {
  /** Array of messages to display */
  messages: ChatMessage[]
  /** Whether the chat is currently loading/processing */
  isLoading?: boolean
  /** Callback when user sends a message */
  onSendMessage?: (content: string) => void
  /** Callback when files are uploaded */
  onFileUpload?: (files: File[]) => void
  /** Callback when an action is performed on a message */
  onMessageAction?: (action: MessageAction, messageId: string) => void
  /** Additional CSS class name */
  className?: string
  /** Theme mode */
  theme?: 'light' | 'dark' | 'auto'
  /** Maximum width of the chat interface */
  maxWidth?: string
  /** Enable virtualization for long message lists */
  enableVirtualization?: boolean
  /** Custom thinking phrases for AI loading state */
  thinkingPhrases?: string[]
  /** Custom component overrides */
  customComponents?: {
    message?: React.ComponentType<ChatMessageProps>
    input?: React.ComponentType<ChatInputProps>
    thinking?: React.ComponentType<ThinkingIndicatorProps>
  }
}

/**
 * Props for the ChatMessage component
 */
export interface ChatMessageProps {
  /** The message to display */
  message: ChatMessage
  /** Callback when an action is performed */
  onAction?: (action: MessageActionType) => void
  /** Whether to show action buttons */
  showActions?: boolean
  /** Whether to show timestamp */
  showTimestamp?: boolean
  /** Additional CSS class name */
  className?: string
  /** Custom renderer for message content */
  customRenderer?: (content: string) => ReactNode
  /** Whether this is an old message (for fading effect) */
  isOld?: boolean
}

/**
 * Props for the ChatInput component
 */
export interface ChatInputProps {
  /** Current input value */
  value: string
  /** Callback when input value changes */
  onChange: (value: string) => void
  /** Callback when user sends a message */
  onSend: (value: string) => void
  /** Callback when files are uploaded */
  onFileUpload?: (files: File[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Maximum length of input */
  maxLength?: number
  /** Additional CSS class name */
  className?: string
  /** Whether to show file upload button */
  showFileUpload?: boolean
  /** Whether to show theme toggle button */
  showThemeToggle?: boolean
  /** Callback when theme is toggled */
  onThemeChange?: (theme: 'light' | 'dark') => void
  /** Custom controls to render */
  customControls?: ReactNode
  /** Whether to auto-focus the input */
  autoFocus?: boolean
}

/**
 * Props for the ThinkingIndicator component
 */
export interface ThinkingIndicatorProps {
  /** Custom thinking phrases to display */
  phrases?: string[]
  /** Duration of thinking animation in milliseconds */
  duration?: number
  /** Callback when thinking completes */
  onComplete?: (totalTime: number) => void
  /** Additional CSS class name */
  className?: string
  /** Whether to show the animation */
  showAnimation?: boolean
  /** Custom animation component */
  customAnimation?: ReactNode
}

/**
 * Props for the MessageActions component
 */
export interface MessageActionsProps {
  /** ID of the message these actions belong to */
  messageId: string
  /** Content of the message (for copy action) */
  content: string
  /** Callback when regenerate is clicked */
  onRegenerate?: (messageId: string) => void
  /** Callback when copy is clicked */
  onCopy?: (content: string) => void
  /** Callback when love is clicked */
  onLove?: (messageId: string) => void
  /** Callback when improve is clicked */
  onImprove?: (messageId: string) => void
  /** Additional CSS class name */
  className?: string
  /** Which actions to show */
  actions?: MessageActionType[]
  /** Size of the action icons */
  iconSize?: number
}
