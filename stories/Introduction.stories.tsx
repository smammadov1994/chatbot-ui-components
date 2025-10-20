import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Getting Started',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Chat Component Library

Welcome to the Chat Component Library - Beautiful, accessible chat UI components for React applications with liquid glass aesthetics.

## Installation

\`\`\`bash
npm install @pumpads/chat-component-library
\`\`\`

## Basic Usage

\`\`\`tsx
import { ChatInterface } from '@pumpads/chat-component-library'
import '@pumpads/chat-component-library/styles'

function App() {
  const [messages, setMessages] = useState([])

  const handleSend = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
  }

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSend}
      theme="dark"
    />
  )
}
\`\`\`

## Features

- 🎨 Beautiful liquid glass design
- 🌙 Dark/Light theme support
- ♿ Fully accessible
- 📱 Responsive design
- 🔤 Markdown support
- ⚡ TypeScript support
- 🎭 Loading states
- 🎯 Message actions
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Introduction: Story = {
  render: () => (
    <div style={{ 
      padding: '3rem', 
      maxWidth: '900px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.7',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🚀 Chat Component Library
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#b8c5d6', 
          margin: 0,
          fontWeight: '300'
        }}>
          Beautiful, accessible chat UI components with liquid glass aesthetics
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ 
            color: '#ffffff', 
            margin: '0 0 1rem 0',
            fontSize: '1.3rem'
          }}>📦 Installation</h3>
          <code style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            display: 'block',
            color: '#a8e6cf',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '0.9rem'
          }}>
            npm install @pumpads/chat-component-library
          </code>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ 
            color: '#ffffff', 
            margin: '0 0 1rem 0',
            fontSize: '1.3rem'
          }}>✨ Features</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.8rem',
            color: '#d1d9e6'
          }}>
            <div>🎨 Liquid glass design</div>
            <div>🌙 Dark/Light themes</div>
            <div>♿ Fully accessible</div>
            <div>📱 Responsive design</div>
            <div>🔤 Markdown support</div>
            <div>⚡ TypeScript ready</div>
          </div>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center',
        padding: '1.5rem',
        background: 'rgba(103, 126, 234, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(103, 126, 234, 0.2)'
      }}>
        <p style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#ffffff',
          fontSize: '1.1rem'
        }}>
          👈 <strong>Explore the sidebar</strong> to see all components and their stories
        </p>
        <p style={{ 
          margin: 0, 
          color: '#b8c5d6',
          fontSize: '0.95rem'
        }}>
          Check the <strong>Docs</strong> tab for detailed usage instructions
        </p>
      </div>
    </div>
  ),
}