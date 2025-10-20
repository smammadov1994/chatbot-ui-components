/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Color palette for a theme
 */
export interface ThemeColors {
  background: {
    primary: string
    secondary: string
    hover: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
    placeholder: string
  }
  accent: {
    primary: string
    hover: string
    gradient: {
      start: string
      end: string
    }
  }
  border: {
    subtle: string
    focus: string
    hover: string
  }
  surface: {
    primary: string
    secondary: string
    hover: string
  }
  liquidGlass: {
    translucency: string
    border: string
    shadow: string
    reflection: string
  }
}

/**
 * Spacing scale for a theme
 */
export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

/**
 * Typography settings for a theme
 */
export interface ThemeTypography {
  fontFamily: string
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

/**
 * Animation settings for a theme
 */
export interface ThemeAnimations {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    ease: string
    easeIn: string
    easeOut: string
    easeInOut: string
  }
}

/**
 * Complete theme configuration
 */
export interface Theme {
  mode: ThemeMode
  colors: ThemeColors
  spacing: ThemeSpacing
  typography: ThemeTypography
  animations: ThemeAnimations
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}
