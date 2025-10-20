import type { Meta, StoryObj } from '@storybook/react'
import { MessageActions } from '../src/components/MessageActions'

const meta: Meta<typeof MessageActions> = {
  title: 'Components/MessageActions',
  component: MessageActions,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' },
      ],
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
  args: {
    messageId: '1',
    content: sampleContent,
    onRegenerate: (id) => console.log('Regenerate:', id),
    onCopy: (content) => console.log('Copy:', content),
    onLove: (id) => console.log('Love:', id),
    onImprove: (id) => console.log('Improve:', id),
  },
}

export const RegenerateButton: Story = {
  args: {
    messageId: '2',
    content: sampleContent,
    actions: ['regenerate'],
    onRegenerate: (id) => console.log('Regenerate:', id),
  },
}

export const CopyButton: Story = {
  args: {
    messageId: '3',
    content: sampleContent,
    actions: ['copy'],
    onCopy: (content) => console.log('Copy:', content),
  },
}

export const LoveButton: Story = {
  args: {
    messageId: '4',
    content: sampleContent,
    actions: ['love'],
    onLove: (id) => console.log('Love:', id),
  },
}

export const ImproveButton: Story = {
  args: {
    messageId: '5',
    content: sampleContent,
    actions: ['improve'],
    onImprove: (id) => console.log('Improve:', id),
  },
}
