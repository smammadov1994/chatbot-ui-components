import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageActions } from '../src/components/MessageActions'

const meta: Meta<typeof MessageActions> = {
  title: 'Components/MessageActions',
  component: MessageActions,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconColor: {
      control: 'color',
      description: 'Color of the action icons',
    },
  },
}

export default meta
type Story = StoryObj<typeof MessageActions>

const sampleContent = 'This is a sample AI response with markdown support and multiple lines of text.'

export const Default: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '150px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <MessageActions
          messageId="1"
          content={sampleContent}
          onRegenerate={(id) => console.log('Regenerate:', id)}
          onCopy={(content) => console.log('Copy:', content)}
          onLove={(id) => console.log('Love:', id)}
          onImprove={(id) => console.log('Improve:', id)}
        />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const RegenerateButton: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '150px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <MessageActions
          messageId="2"
          content={sampleContent}
          actions={['regenerate']}
          onRegenerate={(id) => console.log('Regenerate:', id)}
        />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const CopyButton: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '150px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <MessageActions
          messageId="3"
          content={sampleContent}
          actions={['copy']}
          onCopy={(content) => console.log('Copy:', content)}
        />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const LoveButton: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '150px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <MessageActions
          messageId="4"
          content={sampleContent}
          actions={['love']}
          onLove={(id) => console.log('Love:', id)}
        />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ImproveButton: Story = {
  render: (args, { viewMode }) => {
    const isDocsMode = viewMode === 'docs'
    
    return (
      <div 
        style={{ 
          width: isDocsMode ? '100%' : '100vw',
          height: isDocsMode ? '150px' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        data-theme="dark"
      >
        <MessageActions
          messageId="5"
          content={sampleContent}
          actions={['improve']}
          onImprove={(id) => console.log('Improve:', id)}
        />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}
