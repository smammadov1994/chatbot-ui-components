import { useState } from 'react'
import { ChatInterface, ChatMessage } from '../src'
import '../src/styles/index.css'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(content),
        timestamp: new Date(),
        thoughtTime: Math.floor(Math.random() * 3) + 1,
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files)
    const fileNames = files.map(f => f.name).join(', ')
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: `📎 Uploaded ${files.length} file(s): ${fileNames}`,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
  }

  const generateResponse = (userInput: string): string => {
    const responses = [
      `You said: "${userInput}"\n\nThat's interesting! Let me help you with that.`,
      `Great question about "${userInput}"!\n\nHere's what I think:\n- Point 1\n- Point 2\n- Point 3`,
      `I understand you're asking about **${userInput}**.\n\nLet me break this down:\n\n1. First consideration\n2. Second consideration\n3. Final thoughts`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--background-primary)',
      padding: '2rem'
    }}>
      <h1 style={{
        color: 'var(--text-primary)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Chat Component Library Example
      </h1>
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSend}
        onFileUpload={handleFileUpload}
        theme="dark"
      />
    </div>
  )
}

export default App
