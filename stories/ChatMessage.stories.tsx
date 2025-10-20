import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatMessage } from '../src/components/ChatMessage'
import { MessageActions } from '../src/components/MessageActions'
import { ChatMessage as ChatMessageType } from '../src/types'

const meta: Meta<typeof ChatMessage> = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
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
  render: () => (
    <div style={{ maxWidth: '800px', padding: '2rem', background: '#0a0a0a' }}>
      <ChatMessage
        message={userMessage}
        showTimestamp={true}
      />
    </div>
  ),
}

export const AssistantMessage: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', padding: '2rem', background: '#0a0a0a' }}>
      <ChatMessage
        message={assistantMessage}
        showActions={true}
        showTimestamp={true}
      />
      <div style={{ marginTop: '0.5rem', marginLeft: '0' }}>
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
  ),
}

export const Conversation: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', padding: '2rem', background: '#0a0a0a', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
  ),
}
