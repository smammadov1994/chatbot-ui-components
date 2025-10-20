import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThinkingIndicator } from '../src/components/ThinkingIndicator'

const meta: Meta<typeof ThinkingIndicator> = {
  title: 'Components/ThinkingIndicator',
  component: ThinkingIndicator,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ThinkingIndicator>

export const Default: Story = {
  render: () => (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '2rem'
      }}
      data-theme="dark"
    >
      <ThinkingIndicator showAnimation={true} />
    </div>
  ),
}

export const CustomPhrases: Story = {
  render: () => (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '2rem'
      }}
      data-theme="dark"
    >
      <ThinkingIndicator 
        phrases={[
          'Processing your request...',
          'Analyzing data...',
          'Generating response...',
        ]}
        showAnimation={true}
      />
    </div>
  ),
}

export const WithoutAnimation: Story = {
  render: () => (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '2rem'
      }}
      data-theme="dark"
    >
      <ThinkingIndicator 
        phrases={['Thinking...']}
        showAnimation={false}
      />
    </div>
  ),
}

export const LongDuration: Story = {
  render: () => (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '2rem'
      }}
      data-theme="dark"
    >
      <ThinkingIndicator 
        duration={5000}
        showAnimation={true}
        onComplete={(time) => console.log('Completed in', time, 'seconds')}
      />
    </div>
  ),
}
