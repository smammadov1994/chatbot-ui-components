import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SidebarNav } from '../src/components/SidebarNav'

const meta: Meta<typeof SidebarNav> = {
  title: 'Components/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarNav>

export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('chats')

    return (
      <div style={{ height: '100vh', background: '#0a0a0a', position: 'relative' }}>
        <SidebarNav
          activeItemId={activeId}
          onItemClick={(id) => {
            setActiveId(id)
            console.log('Clicked:', id)
          }}
          userName="John Doe"
        />
        <div style={{ marginLeft: '80px', padding: '2rem', color: 'white' }}>
          <h2>Hover over the sidebar to expand it</h2>
          <p>Active item: {activeId}</p>
        </div>
      </div>
    )
  },
}

export const WithAvatar: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('new')

    return (
      <div style={{ height: '100vh', background: '#0a0a0a', position: 'relative' }}>
        <SidebarNav
          activeItemId={activeId}
          onItemClick={(id) => {
            setActiveId(id)
            console.log('Clicked:', id)
          }}
          userName="Jane Smith"
          userAvatar="https://i.pravatar.cc/150?img=5"
        />
        <div style={{ marginLeft: '80px', padding: '2rem', color: 'white' }}>
          <h2>Sidebar with User Avatar</h2>
          <p>Active item: {activeId}</p>
        </div>
      </div>
    )
  },
}

export const LightMode: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('settings')

    return (
      <div style={{ height: '100vh', background: '#ffffff', position: 'relative' }} data-theme="light">
        <SidebarNav
          activeItemId={activeId}
          onItemClick={(id) => {
            setActiveId(id)
            console.log('Clicked:', id)
          }}
          userName="Alex Johnson"
          userAvatar="https://i.pravatar.cc/150?img=8"
        />
        <div style={{ marginLeft: '80px', padding: '2rem', color: '#1a1a1a' }}>
          <h2>Light Mode Sidebar</h2>
          <p>Active item: {activeId}</p>
        </div>
      </div>
    )
  },
}

export const CustomItems: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('chats')

    const customItems = [
      { id: 'new', label: 'Start New', icon: 'new' as const },
      { id: 'chats', label: 'My Chats', icon: 'chats' as const },
      { id: 'settings', label: 'Preferences', icon: 'settings' as const },
      { id: 'account', label: 'Profile', icon: 'user' as const },
    ]

    return (
      <div style={{ height: '100vh', background: '#0a0a0a', position: 'relative' }}>
        <SidebarNav
          items={customItems}
          activeItemId={activeId}
          onItemClick={(id) => {
            setActiveId(id)
            console.log('Clicked:', id)
          }}
          userName="Custom User"
        />
        <div style={{ marginLeft: '80px', padding: '2rem', color: 'white' }}>
          <h2>Custom Navigation Items</h2>
          <p>Active item: {activeId}</p>
        </div>
      </div>
    )
  },
}
