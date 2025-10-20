import React from 'react'
import { X } from 'lucide-react'
import styles from './PromptRefinementSidebar.module.css'

export interface PromptSuggestion {
  id: string | number
  title: string
  preview: string
  full: string
}

export interface PromptRefinementSidebarProps {
  /** Whether the sidebar is open */
  isOpen: boolean
  /** Callback when sidebar should close */
  onClose: () => void
  /** Callback when a prompt is selected */
  onPromptSelect: (prompt: string) => void
  /** Array of prompt suggestions */
  suggestions?: PromptSuggestion[]
  /** Additional CSS class name */
  className?: string
}

const DEFAULT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: 1,
    title: "More Specific",
    preview: "Create a professional video ad...",
    full: "Create a professional video advertisement for a tech startup, focusing on innovation and user experience, with modern transitions and upbeat background music"
  },
  {
    id: 2,
    title: "Add Context",
    preview: "Generate a video showcasing...",
    full: "Generate a video showcasing our product's key features with clear explanations, customer testimonials, and a strong call-to-action at the end"
  },
  {
    id: 3,
    title: "More Creative",
    preview: "Design an engaging video...",
    full: "Design an engaging video that tells a story about how our product solves real problems, using dynamic visuals, emotional music, and relatable scenarios"
  },
  {
    id: 4,
    title: "Simpler Version",
    preview: "Make a short video ad...",
    full: "Make a short video ad highlighting our main product benefit in 30 seconds with bold text overlays and energetic music"
  }
]

/**
 * PromptRefinementSidebar component displays prompt suggestions in a sidebar
 */
export const PromptRefinementSidebar: React.FC<PromptRefinementSidebarProps> = ({
  isOpen,
  onClose,
  onPromptSelect,
  suggestions = DEFAULT_SUGGESTIONS,
  className = ''
}) => {
  if (!isOpen) return null

  return (
    <div className={`${styles.promptRefinementSidebar} ${className}`}>
      <div className={styles.sidebarHeader}>
        <h3>Prompt Suggestions</h3>
        <button 
          onClick={onClose} 
          className={styles.closeButton}
          aria-label="Close sidebar"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>
      <div className={styles.promptList}>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            className={styles.promptItem}
            onClick={() => onPromptSelect(suggestion.full)}
            title={suggestion.full}
          >
            <div className={styles.promptTitle}>{suggestion.title}</div>
            <div className={styles.promptPreview}>{suggestion.preview}</div>
            <div className={styles.promptTooltip}>
              {suggestion.full}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
