import React, { useState } from 'react'
import { User, Settings, MessageSquare, Plus, History, LogOut } from 'lucide-react'
import styles from './SidebarNav.module.css'

export interface SidebarNavItem {
  id: string
  label: string
  icon: 'user' | 'settings' | 'chats' | 'history' | 'logout' | 'new'
  onClick?: () => void
}

export interface SidebarNavProps {
  /** Navigation items */
  items?: SidebarNavItem[]
  /** Callback when item is clicked */
  onItemClick?: (itemId: string) => void
  /** Currently active item ID */
  activeItemId?: string
  /** Additional CSS class name */
  className?: string
  /** User name to display */
  userName?: string
  /** User avatar URL */
  userAvatar?: string
}

const iconMap = {
  user: User,
  settings: Settings,
  chats: MessageSquare,
  history: History,
  logout: LogOut,
  new: Plus,
}

const defaultItems: SidebarNavItem[] = [
  { id: 'new', label: 'New Chat', icon: 'new' },
  { id: 'chats', label: 'Chat History', icon: 'chats' },
  { id: 'history', label: 'Recent', icon: 'history' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'account', label: 'Account', icon: 'user' },
  { id: 'logout', label: 'Logout', icon: 'logout' },
]

/**
 * SidebarNav component - Collapsible sidebar navigation that expands on hover
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({
  items = defaultItems,
  onItemClick,
  activeItemId,
  className = '',
  userName = 'User',
  userAvatar,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleItemClick = (item: SidebarNavItem) => {
    if (item.onClick) {
      item.onClick()
    }
    if (onItemClick) {
      onItemClick(item.id)
    }
  }

  return (
    <nav
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''} ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.sidebarContent}>
        {/* User Section */}
        <div className={styles.userSection}>
          <div className={styles.userAvatar}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className={styles.avatarImage} />
            ) : (
              <User size={20} />
            )}
          </div>
          {isExpanded && (
            <div className={styles.userName}>
              {userName}
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className={styles.navItems}>
          {items.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = activeItemId === item.id

            return (
              <button
                key={item.id}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => handleItemClick(item)}
                title={!isExpanded ? item.label : undefined}
                aria-label={item.label}
              >
                <div className={styles.navIcon}>
                  <Icon size={20} />
                </div>
                {isExpanded && (
                  <span className={styles.navLabel}>{item.label}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
