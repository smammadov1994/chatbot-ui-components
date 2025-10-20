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
      padding: '2rem', 
      maxWidth: '800px', 
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.6'
    }}>
      <h1>🚀 Getting Started</h1>
      <p>Check the <strong>Docs</strong> tab above for installation and usage instructions.</p>
      <p>Browse the sidebar to explore all available components and their stories.</p>
    </div>
  ),
}