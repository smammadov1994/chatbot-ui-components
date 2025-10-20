import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatMessage } from '../src/components/ChatMessage'
import { MessageActions } from '../src/components/MessageActions'
import { ChatMessage as ChatMessageType } from '../src/types'

const meta: Meta<typeof ChatMessage> = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
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
type Story = StoryObj<typeof ChatMessage>

const userMessage: ChatMessageType = {
  id: '1',
  role: 'user',
  content: 'Can you help me create a beautiful landing page for my startup?',
  timestamp: new Date(),
}

const assistantMessage: ChatMessageType = {
  id: '2',
  role: 'assistant',
  content: 'Of course! I\'d be happy to help you create a beautiful landing page. Here are some key elements we should include:\n\n**Essential Components:**\n- Hero section with compelling headline\n- Clear value proposition\n- Social proof (testimonials, logos)\n- Call-to-action buttons\n- Feature highlights\n\nWhat industry is your startup in?',
  timestamp: new Date(),
  thoughtTime: 2,
}

export const UserMessage: Story = {
  render: (args, { viewMode }) => {
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
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <ChatMessage
            message={userMessage}
            showTimestamp={true}
          />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const AssistantMessage: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '400px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <ChatMessage
            message={assistantMessage}
            showActions={true}
            showTimestamp={true}
          />
          <div style={{ marginTop: '0.5rem' }}>
            <MessageActions
              messageId={assistantMessage.id}
              content={assistantMessage.content}
              onRegenerate={(id) => console.log('Regenerate:', id)}
              onCopy={() => console.log('Copied!')}
              onLove={(id) => console.log('Loved:', id)}
              onImprove={(id) => console.log('Improve:', id)}
            />
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const Conversation: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '500px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ChatMessage
            message={userMessage}
            showTimestamp={true}
          />
          <div>
            <ChatMessage
              message={assistantMessage}
              showActions={true}
              showTimestamp={true}
            />
            <div style={{ marginTop: '0.5rem' }}>
              <MessageActions
                messageId={assistantMessage.id}
                content={assistantMessage.content}
                onRegenerate={(id) => console.log('Regenerate:', id)}
                onCopy={() => console.log('Copied!')}
                onLove={(id) => console.log('Loved:', id)}
                onImprove={(id) => console.log('Improve:', id)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}
