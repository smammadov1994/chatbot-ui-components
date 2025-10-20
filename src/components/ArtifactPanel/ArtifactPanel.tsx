import React, { useEffect, useCallback, useRef, useState } from 'react'
import { X } from 'lucide-react'
import styles from './ArtifactPanel.module.css'

export interface ImageOption {
  id: string
  imageUrl: string
  title: string
  description?: string
}

export interface VideoOption {
  id: string
  videoUrl: string
  thumbnailUrl: string
  title: string
  description?: string
  duration?: string
}

export interface PromptOption {
  id: string
  text: string
}

export interface ArtifactPanelProps {
  /** Whether the panel is open */
  isOpen: boolean
  /** Callback when panel should close */
  onClose: () => void
  /** Panel mode */
  mode?: 'empty' | 'images' | 'videos' | 'text' | 'prompts'
  /** Image options for image selection mode */
  imageOptions?: ImageOption[]
  /** Video options for video selection mode */
  videoOptions?: VideoOption[]
  /** Prompt options for prompt selection mode */
  promptOptions?: PromptOption[]
  /** Text content for text mode */
  textContent?: string
  /** Typewriter speed in milliseconds (default: 30) */
  typewriterSpeed?: number
  /** Callback when an image is selected */
  onImageSelect?: (imageId: string, image: ImageOption) => void
  /** Callback when a video is selected */
  onVideoSelect?: (videoId: string, video: VideoOption) => void
  /** Callback when a prompt is selected */
  onPromptSelect?: (promptId: string, prompt: PromptOption) => void
  /** Additional CSS class name */
  className?: string
}

/**
 * ArtifactPanel component displays content in a side panel
 */
export const ArtifactPanel: React.FC<ArtifactPanelProps> = ({
  isOpen,
  onClose,
  mode = 'empty',
  imageOptions = [],
  videoOptions = [],
  promptOptions = [],
  textContent = '',
  typewriterSpeed = 30,
  onImageSelect,
  onVideoSelect,
  onPromptSelect,
  className = ''
}) => {
  const [panelState, setPanelState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [displayedText, setDisplayedText] = useState('')
  const [promptTexts, setPromptTexts] = useState<Record<string, string>>({})
  const backdropRef = useRef<HTMLDivElement>(null)

  // Handle panel open/close animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isOpen && (panelState === 'closed' || panelState === 'closing')) {
      setPanelState('opening')
      timeoutId = setTimeout(() => {
        setPanelState('open')
      }, 600)
    } else if (!isOpen && (panelState === 'open' || panelState === 'opening')) {
      setPanelState('closing')
      timeoutId = setTimeout(() => {
        setPanelState('closed')
      }, 600)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isOpen, panelState])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Handle backdrop click
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === backdropRef.current) {
      onClose()
    }
  }, [onClose])

  // Handle image selection
  const handleImageSelect = useCallback((imageId: string) => {
    setSelectedId(imageId)
    const image = imageOptions.find(img => img.id === imageId)
    if (image && onImageSelect) {
      onImageSelect(imageId, image)
      setTimeout(() => {
        onClose()
      }, 800)
    }
  }, [imageOptions, onImageSelect, onClose])

  // Handle video selection
  const handleVideoSelect = useCallback((videoId: string) => {
    setSelectedId(videoId)
    const video = videoOptions.find(vid => vid.id === videoId)
    if (video && onVideoSelect) {
      onVideoSelect(videoId, video)
      setTimeout(() => {
        onClose()
      }, 800)
    }
  }, [videoOptions, onVideoSelect, onClose])

  // Handle prompt selection
  const handlePromptSelect = useCallback((promptId: string) => {
    setSelectedId(promptId)
    const prompt = promptOptions.find(p => p.id === promptId)
    if (prompt && onPromptSelect) {
      onPromptSelect(promptId, prompt)
      setTimeout(() => {
        onClose()
      }, 800)
    }
  }, [promptOptions, onPromptSelect, onClose])

  // Typewriter effect for text mode
  useEffect(() => {
    if (mode === 'text' && textContent && panelState === 'open') {
      setDisplayedText('')
      let currentIndex = 0

      const intervalId = setInterval(() => {
        if (currentIndex < textContent.length) {
          setDisplayedText(textContent.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
        }
      }, typewriterSpeed)

      return () => clearInterval(intervalId)
    } else if (mode !== 'text') {
      setDisplayedText('')
    }
  }, [mode, textContent, typewriterSpeed, panelState])

  // Typewriter effect for prompts mode
  useEffect(() => {
    if (mode === 'prompts' && promptOptions.length > 0 && (panelState === 'open' || panelState === 'opening')) {
      // Reset all prompt texts
      setPromptTexts({})

      const intervals: NodeJS.Timeout[] = []
      const timeouts: NodeJS.Timeout[] = []

      // Wait a bit for the panel to start opening
      const startDelay = setTimeout(() => {
        promptOptions.forEach((prompt, index) => {
          let currentIndex = 0
          const staggerDelay = index * 150 // Stagger the start of each prompt

          const timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
              if (currentIndex <= prompt.text.length) {
                const textToShow = prompt.text.substring(0, currentIndex)
                setPromptTexts(prev => ({
                  ...prev,
                  [prompt.id]: textToShow
                }))
                currentIndex++
              } else {
                clearInterval(intervalId)
              }
            }, typewriterSpeed)
            intervals.push(intervalId)
          }, staggerDelay)
          timeouts.push(timeoutId)
        })
      }, 300) // Wait 300ms for panel animation

      return () => {
        clearTimeout(startDelay)
        intervals.forEach(id => clearInterval(id))
        timeouts.forEach(id => clearTimeout(id))
      }
    } else if (mode !== 'prompts') {
      setPromptTexts({})
    }
  }, [mode, promptOptions, typewriterSpeed, panelState])

  // Don't render if closed
  if (panelState === 'closed' && !isOpen) {
    return null
  }

  const panelClassName = `${styles.artifactPanel} ${styles[panelState]} ${className}`
  const backdropClassName = `${styles.backdrop} ${(panelState === 'open' || panelState === 'opening') ? styles.visible : ''}`

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={backdropClassName}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-label="Artifact panel"
      >
        {/* Close button */}
        <button
          className={styles.floatingCloseButton}
          onClick={onClose}
          title="Close panel"
          aria-label="Close artifact panel"
        >
          <X size={14} />
        </button>

        {/* Content */}
        <div className={styles.content}>
          {mode === 'empty' && (
            <div className={styles.emptyContainer}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21,15 16,10 5,21"></polyline>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>Ready for Content</h3>
              <p className={styles.emptyText}>Your artifacts will appear here</p>
            </div>
          )}

          {mode === 'images' && (
            <div className={styles.selectionContainer}>
              <div className={styles.pillarGrid}>
                {imageOptions.map((image) => (
                  <div key={image.id} className={styles.floatingWrapper}>
                    <div
                      className={`${styles.floatingCard} ${selectedId === image.id ? styles.selected : ''}`}
                      onClick={() => handleImageSelect(image.id)}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className={styles.floatingImage}
                      />
                      {selectedId === image.id && (
                        <div className={styles.selectedCheckmark}>✓</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.selectionSubtext}>
                Select one of the images above to continue
              </div>
            </div>
          )}

          {mode === 'videos' && (
            <div className={styles.selectionContainer}>
              <div className={styles.pillarGrid}>
                {videoOptions.map((video) => (
                  <div key={video.id} className={styles.floatingWrapper}>
                    <div
                      className={`${styles.floatingCard} ${selectedId === video.id ? styles.selected : ''}`}
                      onClick={() => handleVideoSelect(video.id)}
                    >
                      <video
                        src={video.videoUrl}
                        poster={video.thumbnailUrl}
                        className={styles.floatingImage}
                        muted
                        preload="metadata"
                      />
                      {selectedId === video.id && (
                        <div className={styles.selectedCheckmark}>✓</div>
                      )}
                      {video.duration && (
                        <div className={styles.videoDurationOverlay}>
                          {video.duration}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.selectionSubtext}>
                Select one of the videos above to continue
              </div>
            </div>
          )}

          {mode === 'text' && (
            <div className={styles.textContainer}>
              <div className={styles.textContent}>
                {displayedText}
                <span className={styles.cursor}>|</span>
              </div>
            </div>
          )}

          {mode === 'prompts' && (
            <div className={styles.selectionContainer}>
              <div className={styles.promptGrid}>
                {promptOptions.map((prompt) => {
                  const displayText = promptTexts[prompt.id] !== undefined ? promptTexts[prompt.id] : prompt.text
                  const showCursor = promptTexts[prompt.id] !== undefined && promptTexts[prompt.id].length < prompt.text.length

                  return (
                    <div
                      key={prompt.id}
                      className={`${styles.promptCard} ${selectedId === prompt.id ? styles.selected : ''}`}
                      onClick={() => handlePromptSelect(prompt.id)}
                    >
                      <div className={styles.promptText}>
                        {displayText}
                        {showCursor && (
                          <span className={styles.cursor}>|</span>
                        )}
                      </div>
                      {selectedId === prompt.id && (
                        <div className={styles.selectedCheckmark}>✓</div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className={styles.selectionSubtext}>
                Select one of the prompts above to continue
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
