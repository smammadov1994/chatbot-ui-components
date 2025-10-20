import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChatInterface } from '../src/components/ChatInterface'
import { ChatMessage } from '../src/types'

const meta: Meta<typeof ChatInterface> = {
  title: 'Components/ChatInterface',
  component: ChatInterface,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatInterface>

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hello! Can you help me understand how this chat component works?',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Of course! This is a **beautiful chat component library** with:\n\n- Liquid glass aesthetics\n- Dark and light themes\n- Markdown support\n- Progressive thinking animations\n\nWhat would you like to know more about?',
    timestamp: new Date(Date.now() - 240000),
    thoughtTime: 2,
  },
  {
    id: '3',
    role: 'user',
    content: 'That sounds amazing! Show me the markdown features.',
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: '4',
    role: 'assistant',
    content: '# Markdown Features\n\nHere are some examples:\n\n## Text Formatting\n- **Bold text**\n- *Italic text*\n- `Inline code`\n\n## Lists\n1. Ordered lists\n2. Work great\n3. For steps\n\n## Code Blocks\n```javascript\nconst greeting = "Hello World";\nconsole.log(greeting);\n```\n\nPretty cool, right?',
    timestamp: new Date(Date.now() - 120000),
    thoughtTime: 3,
  },
  {
    id: '5',
    role: 'user',
    content: 'Wow! Can you show me how the action buttons work?',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '6',
    role: 'assistant',
    content: 'Absolutely! Each assistant message has action buttons below it:\n\n- **Heart** - Mark as favorite\n- **Copy** - Copy message to clipboard\n- **Regenerate** - Generate a new response\n- **Improve** - Refine the response\n\nTry hovering over this message to see them in action!',
    timestamp: new Date(Date.now() - 30000),
    thoughtTime: 1,
  },
]

export const Default: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = (content: string) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])

      // Simulate AI response
      setIsLoading(true)
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `You said: "${content}"\n\nThis is a simulated response to demonstrate the chat interface. The thinking indicator appeared while this message was being "generated".`,
          timestamp: new Date(),
          thoughtTime: 2,
        }
        setMessages(prev => [...prev, aiMessage])
        setIsLoading(false)
      }, 2000)
    }

    return (
      <div style={{ height: '100vh', display: 'flex', padding: '2rem', background: '#0a0a0a' }}>
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSend}
          theme="dark"
        />
      </div>
    )
  },
}

export const LightTheme: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)

    const handleSend = (content: string) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
    }

    return (
      <div style={{ height: '100vh', display: 'flex', padding: '2rem', background: '#ffffff' }}>
        <ChatInterface
          messages={messages}
          onSendMessage={handleSend}
          theme="light"
        />
      </div>
    )
  },
}

export const Loading: Story = {
  render: () => {
    const loadingMessages: ChatMessage[] = [
      {
        id: '1',
        role: 'user',
        content: 'Can you explain how the thinking indicator works?',
        timestamp: new Date(Date.now() - 5000),
      },
    ]

    return (
      <div style={{ height: '100vh', display: 'flex', padding: '2rem', background: '#0a0a0a' }}>
        <ChatInterface
          messages={loadingMessages}
          isLoading={true}
          theme="dark"
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>([])

    const handleSend = (content: string) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
    }

    return (
      <div style={{ height: '100vh', display: 'flex', padding: '2rem', background: '#0a0a0a' }}>
        <ChatInterface
          messages={messages}
          onSendMessage={handleSend}
          theme="dark"
        />
      </div>
    )
  },
}
