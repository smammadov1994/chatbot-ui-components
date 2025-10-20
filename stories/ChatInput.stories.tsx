import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ChatInput } from '../src/components/ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div 
        style={{ 
          width: '600px',
          padding: '2rem',
          background: '#0a0a0a',
          borderRadius: '12px'
        }}
        data-theme="dark"
      >
        <ChatInput
          value={value}
          onChange={setValue}
          onSend={(content) => {
            console.log('Sent:', content)
            setValue('')
          }}
        />
      </div>
    )
  },
}

export const WithFileUpload: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div 
        style={{ 
          width: '600px',
          padding: '2rem',
          background: '#0a0a0a',
          borderRadius: '12px'
        }}
        data-theme="dark"
      >
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
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('This input is disabled')
    return (
      <div 
        style={{ 
          width: '600px',
          padding: '2rem',
          background: '#0a0a0a',
          borderRadius: '12px'
        }}
        data-theme="dark"
      >
        <ChatInput
          value={value}
          onChange={setValue}
          onSend={(content) => console.log('Sent:', content)}
          disabled={true}
        />
      </div>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div 
        style={{ 
          width: '600px',
          padding: '2rem',
          background: '#0a0a0a',
          borderRadius: '12px'
        }}
        data-theme="dark"
      >
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
    )
  },
}

export const WithMaxLength: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div 
        style={{ 
          width: '600px',
          padding: '2rem',
          background: '#0a0a0a',
          borderRadius: '12px'
        }}
        data-theme="dark"
      >
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
    )
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
