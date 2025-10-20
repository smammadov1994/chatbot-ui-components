import React, { useCallback, useRef, useEffect, useState } from 'react'
import { Paperclip, Sun, Moon, X, FileText } from 'lucide-react'
import { ChatInputProps } from '../../types'
import styles from './ChatInput.module.css'

interface FilePreview {
  file: File
  preview: string
  type: 'image' | 'pdf'
}

const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
const ACCEPTED_EXTENSIONS = ['.png', '.jpeg', '.jpg', '.pdf']

/**
 * ChatInput component provides the input area for sending messages
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onFileUpload,
  placeholder = 'Type a message...',
  disabled = false,
  maxLength,
  className = '',
  showFileUpload = true,
  showThemeToggle = false,
  onThemeChange,
  customControls,
  autoFocus = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  // Auto-focus if requested
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSend(value)
      }
    }
  }, [value, onSend, disabled])

  const handleSendClick = useCallback(() => {
    if (value.trim() && !disabled) {
      onSend(value)
    }
  }, [value, onSend, disabled])

  const handleFileUploadClick = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = ACCEPTED_EXTENSIONS.join(',')
    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      const validFiles = files.filter(file => ACCEPTED_FILE_TYPES.includes(file.type))
      
      if (validFiles.length > 0) {
        const previews: FilePreview[] = await Promise.all(
          validFiles.map(async (file) => {
            const isImage = file.type.startsWith('image/')
            const preview = isImage ? URL.createObjectURL(file) : ''
            return {
              file,
              preview,
              type: isImage ? 'image' : 'pdf'
            }
          })
        )
        
        setFilePreviews(prev => [...prev, ...previews])
        
        if (onFileUpload) {
          onFileUpload(validFiles)
        }
      }
    }
    input.click()
  }, [onFileUpload])

  const handleRemoveFile = useCallback((index: number) => {
    setFilePreviews(prev => {
      const newPreviews = [...prev]
      const removed = newPreviews.splice(index, 1)[0]
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview)
      }
      return newPreviews
    })
  }, [])

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      filePreviews.forEach(fp => {
        if (fp.preview) {
          URL.revokeObjectURL(fp.preview)
        }
      })
    }
  }, [filePreviews])

  const handleThemeToggle = useCallback(() => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setCurrentTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    if (onThemeChange) {
      onThemeChange(newTheme)
    }
  }, [currentTheme, onThemeChange])

  return (
    <div className={`${styles.inputWrapper} liquid-glass ${className}`}>
      {filePreviews.length > 0 && (
        <div className={styles.filePreviewContainer}>
          {filePreviews.map((filePreview, index) => (
            <div key={index} className={styles.filePreview}>
              {filePreview.type === 'image' ? (
                <img 
                  src={filePreview.preview} 
                  alt={filePreview.file.name}
                  className={styles.previewImage}
                />
              ) : (
                <div className={styles.pdfPreview}>
                  <FileText size={24} />
                  <span className={styles.pdfLabel}>PDF</span>
                </div>
              )}
              <button
                className={styles.removeFileButton}
                onClick={() => handleRemoveFile(index)}
                aria-label="Remove file"
                type="button"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <textarea
        ref={textareaRef}
        className={styles.chatInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={1}
        aria-label="Chat input"
        aria-describedby="input-help"
      />
      
      <div className={styles.inputControls}>
        <div className={styles.leftControls}>
          {showFileUpload && (
            <button
              className={styles.uploadButton}
              onClick={handleFileUploadClick}
              disabled={disabled}
              aria-label="Upload file"
              title="Upload file"
              type="button"
            >
              <Paperclip size={16} />
            </button>
          )}
          {showThemeToggle && (
            <button
              className={`${styles.toggleButton} ${currentTheme === 'light' ? styles.active : ''}`}
              onClick={handleThemeToggle}
              disabled={disabled}
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
              type="button"
            >
              {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          )}
          {customControls}
        </div>
        
        <button
          className={styles.sendButton}
          onClick={handleSendClick}
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          title="Send message"
          type="button"
        >
          ↑
        </button>
      </div>
    </div>
  )
}
