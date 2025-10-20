import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PromptRefinementSidebar, PromptSuggestion } from '../src/components/PromptRefinementSidebar'

const meta: Meta<typeof PromptRefinementSidebar> = {
  title: 'Components/PromptRefinementSidebar',
  component: PromptRefinementSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PromptRefinementSidebar>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedPrompt, setSelectedPrompt] = useState('')

    const handlePromptSelect = (prompt: string) => {
      setSelectedPrompt(prompt)
      console.log('Selected prompt:', prompt)
      setIsOpen(false)
    }

    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: isOpen ? '400px' : '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'left 0.3s ease',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Sidebar
        </button>

        {selectedPrompt && (
          <div style={{
            position: 'absolute',
            top: '80px',
            left: isOpen ? '400px' : '20px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            color: 'white',
            maxWidth: '500px',
            transition: 'left 0.3s ease'
          }}>
            <strong>Selected Prompt:</strong>
            <p style={{ marginTop: '10px' }}>{selectedPrompt}</p>
          </div>
        )}

        <PromptRefinementSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPromptSelect={handlePromptSelect}
        />
      </div>
    )
  },
}

export const LightMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <div 
        style={{ 
          width: '100vw', 
          height: '100vh', 
          background: '#ffffff',
          position: 'relative'
        }}
        data-theme="light"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: isOpen ? '400px' : '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'left 0.3s ease',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Sidebar
        </button>

        <PromptRefinementSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPromptSelect={(prompt) => console.log('Selected:', prompt)}
        />
      </div>
    )
  },
}

export const CustomSuggestions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    const customSuggestions: PromptSuggestion[] = [
      {
        id: 1,
        title: "Technical Focus",
        preview: "Explain the technical architecture...",
        full: "Explain the technical architecture of our system, including microservices, API design, and scalability considerations"
      },
      {
        id: 2,
        title: "Business Value",
        preview: "Highlight the business benefits...",
        full: "Highlight the business benefits and ROI of our solution, with specific metrics and case studies"
      },
      {
        id: 3,
        title: "User Experience",
        preview: "Focus on the user journey...",
        full: "Focus on the user journey and how our product simplifies complex workflows with intuitive design"
      }
    ]

    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: isOpen ? '400px' : '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'left 0.3s ease',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Sidebar
        </button>

        <PromptRefinementSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPromptSelect={(prompt) => console.log('Selected:', prompt)}
          suggestions={customSuggestions}
        />
      </div>
    )
  },
}

export const WithChatInput: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handlePromptSelect = (prompt: string) => {
      setInputValue(prompt)
      setIsOpen(false)
    }

    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ width: '600px', position: 'relative' }}>
          <div style={{
            background: 'rgba(15, 15, 15, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your prompt..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: '16px',
                resize: 'none',
                minHeight: '48px',
                fontFamily: 'inherit'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  padding: '8px 16px',
                  background: isOpen ? 'rgba(79, 70, 229, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid ' + (isOpen ? 'rgba(79, 70, 229, 0.5)' : 'transparent'),
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                💬 Refine
              </button>
              <button
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ↑
              </button>
            </div>
          </div>
        </div>

        <PromptRefinementSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPromptSelect={handlePromptSelect}
        />
      </div>
    )
  },
}
