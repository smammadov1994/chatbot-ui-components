import React, { useState, useEffect, useRef } from 'react'
import { ThinkingIndicatorProps } from '../../types'
import styles from './ThinkingIndicator.module.css'

const DEFAULT_PHRASES = [
  "Conjuring creative visuals...",
  "Weaving narrative threads...",
  "Sculpting digital frames...",
  "Infusing motion with magic...",
  "Orchestrating visual symphony...",
  "Breathing life into pixels...",
  "Crafting cinematic moments...",
  "Harmonizing elements in time...",
  "Painting with light and shadow...",
  "Composing visual poetry...",
  "Dancing with creative energy...",
  "Shaping dreams into reality...",
  "Channeling artistic inspiration...",
  "Blending colors of imagination...",
  "Weaving stories in motion..."
]

/**
 * ThinkingIndicator component displays progressive AI thinking animations
 */
export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  phrases = DEFAULT_PHRASES,
  duration = 3000,
  onComplete,
  className = '',
  showAnimation = true,
  customAnimation
}) => {
  const [currentPhrase, setCurrentPhrase] = useState('')
  const [thoughtTime, setThoughtTime] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    startTimeRef.current = Date.now()
    
    // Show first phrase immediately
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    setCurrentPhrase(randomPhrase)

    // Update phrase periodically
    intervalRef.current = setInterval(() => {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      setCurrentPhrase(randomPhrase)
    }, 800)

    // Track elapsed time
    const timeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setThoughtTime(elapsed)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      clearInterval(timeInterval)
      
      if (onComplete) {
        const totalTime = Math.floor((Date.now() - startTimeRef.current) / 1000)
        onComplete(totalTime)
      }
    }
  }, [phrases, onComplete])

  const CosmicAnimation = () => (
    <svg 
      className={styles.thinkingSvg} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        fill="none" 
        stroke="#4F46E5" 
        strokeWidth="2" 
        className={styles.pulseCore} 
      />
      <line 
        x1="12" 
        y1="12" 
        x2="12" 
        y2="4" 
        stroke="#4F46E5" 
        strokeWidth="1.5" 
        className={`${styles.radiateLine} ${styles.radiate1}`} 
      />
      <line 
        x1="12" 
        y1="12" 
        x2="20" 
        y2="12" 
        stroke="#4F46E5" 
        strokeWidth="1.5" 
        className={`${styles.radiateLine} ${styles.radiate2}`} 
      />
      <line 
        x1="12" 
        y1="12" 
        x2="12" 
        y2="20" 
        stroke="#4F46E5" 
        strokeWidth="1.5" 
        className={`${styles.radiateLine} ${styles.radiate3}`} 
      />
      <line 
        x1="12" 
        y1="12" 
        x2="4" 
        y2="12" 
        stroke="#4F46E5" 
        strokeWidth="1.5" 
        className={`${styles.radiateLine} ${styles.radiate4}`} 
      />
    </svg>
  )

  return (
    <div 
      className={`${styles.thinkingStep} liquid-glass-thinking ${className}`}
      role="status"
      aria-live="polite"
      aria-label="AI is thinking"
    >
      {showAnimation && (customAnimation || <CosmicAnimation />)}
      <span>{currentPhrase}</span>
    </div>
  )
}
