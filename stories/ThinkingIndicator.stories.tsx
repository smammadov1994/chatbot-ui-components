import type { Meta, StoryObj } from '@storybook/react'
import { ThinkingIndicator } from '../src/components/ThinkingIndicator'

const meta: Meta<typeof ThinkingIndicator> = {
  title: 'Components/ThinkingIndicator',
  component: ThinkingIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ThinkingIndicator>

export const Default: Story = {
  args: {
    showAnimation: true,
  },
}

export const CustomPhrases: Story = {
  args: {
    phrases: [
      'Processing your request...',
      'Analyzing data...',
      'Generating response...',
    ],
    showAnimation: true,
  },
}

export const WithoutAnimation: Story = {
  args: {
    phrases: ['Thinking...'],
    showAnimation: false,
  },
}

export const LongDuration: Story = {
  args: {
    duration: 5000,
    showAnimation: true,
    onComplete: (time) => console.log('Completed in', time, 'seconds'),
  },
}
