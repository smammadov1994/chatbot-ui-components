import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ChatInput } from '../src/components/ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  render: (args, { viewMode }) => {
    const [value, setValue] = useState('')
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '300px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <ChatInput
            value={value}
            onChange={setValue}
            onSend={(content) => {
              console.log('Sent:', content)
              setValue('')
            }}
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithFileUpload: Story = {
  render: (args, { viewMode }) => {
    const [value, setValue] = useState('')
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '300px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <ChatInput
            value={value}
            onChange={setValue}
            onSend={(content) => {
              console.log('Sent:', content)
              setValue('')
            }}
            showFileUpload={true}
            onFileUpload={(files) => console.log('Files:', files)}
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const Disabled: Story = {
  render: (args, { viewMode }) => {
    const [value, setValue] = useState('This input is disabled')
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '300px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <ChatInput
            value={value}
            onChange={setValue}
            onSend={(content) => console.log('Sent:', content)}
            disabled={true}
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const CustomPlaceholder: Story = {
  render: (args, { viewMode }) => {
    const [value, setValue] = useState('')
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '300px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <ChatInput
            value={value}
            onChange={setValue}
            onSend={(content) => {
              console.log('Sent:', content)
              setValue('')
            }}
            placeholder="Ask me anything..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithMaxLength: Story = {
  render: (args, { viewMode }) => {
    const [value, setValue] = useState('')
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '300px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <ChatInput
            value={value}
            onChange={setValue}
            onSend={(content) => {
              console.log('Sent:', content)
              setValue('')
            }}
            maxLength={100}
            placeholder="Maximum 100 characters"
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithThemeToggle: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    
    return (
      <div 
        style={{ 
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          transition: 'background 0.3s ease',
          padding: '2rem'
        }}
        data-theme={theme}
      >
        <div style={{ width: '600px' }}>
          <ChatInput
            value={value}
            onChange={setValue}
            onSend={(content) => {
              console.log('Sent:', content)
              setValue('')
            }}
            showFileUpload={true}
            showThemeToggle={true}
            onThemeChange={setTheme}
            placeholder="Type a message with theme toggle..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}
