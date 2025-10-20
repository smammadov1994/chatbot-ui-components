import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { ThemeMode, ThemeContextValue } from '../types'

// Create theme context
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Hook to access and manage theme
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

/**
 * Hook to create theme state and methods
 */
export const useThemeState = (defaultTheme: ThemeMode = 'dark'): ThemeContextValue => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // Check localStorage for saved theme
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat-theme') as ThemeMode
      if (saved === 'light' || saved === 'dark') {
        return saved
      }
    }
    return defaultTheme
  })

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-theme', theme)
    }
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('chat-theme')
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, setTheme, toggleTheme }
}
