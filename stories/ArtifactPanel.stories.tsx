import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ArtifactPanel, ImageOption, VideoOption, PromptOption } from '../src/components/ArtifactPanel'

const meta: Meta<typeof ArtifactPanel> = {
  title: 'Components/ArtifactPanel',
  component: ArtifactPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ArtifactPanel>

const sampleImages: ImageOption[] = [
  {
    id: 'img-1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
    title: 'Mountain Vista',
    description: 'Majestic snow-capped peaks at sunrise'
  },
  {
    id: 'img-2',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop',
    title: 'Forest Path',
    description: 'Serene woodland trail through ancient trees'
  },
  {
    id: 'img-3',
    imageUrl: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=1000&fit=crop',
    title: 'Ocean Waves',
    description: 'Pristine coastline with turquoise waters'
  }
]

const sampleVideos: VideoOption[] = [
  {
    id: 'vid-1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
    title: 'Mountain Timelapse',
    description: 'Stunning mountain vista timelapse',
    duration: '0:45'
  },
  {
    id: 'vid-2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1000&fit=crop',
    title: 'Ocean Waves',
    description: 'Calming ocean waves at sunset',
    duration: '1:20'
  },
  {
    id: 'vid-3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=1000&fit=crop',
    title: 'Forest Stream',
    description: 'Peaceful forest stream flowing',
    duration: '0:30'
  }
]

export const Empty: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Panel
        </button>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2>Empty Artifact Panel</h2>
          <p>Click the button to toggle the panel</p>
        </div>

        <ArtifactPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode="empty"
        />
      </div>
    )
  },
}

export const ImageSelection: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const handleImageSelect = (imageId: string, image: ImageOption) => {
      setSelectedImage(image.title)
      console.log('Selected image:', imageId, image)
    }

    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Panel
        </button>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2>Image Selection</h2>
          <p>Select one of the images from the panel below</p>
          {selectedImage && (
            <p style={{ marginTop: '20px', fontSize: '18px', color: '#4F46E5' }}>
              Selected: {selectedImage}
            </p>
          )}
        </div>

        <ArtifactPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode="images"
          imageOptions={sampleImages}
          onImageSelect={handleImageSelect}
        />
      </div>
    )
  },
}

export const VideoSelection: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

    const handleVideoSelect = (videoId: string, video: VideoOption) => {
      setSelectedVideo(video.title)
      console.log('Selected video:', videoId, video)
    }

    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Panel
        </button>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2>Video Selection</h2>
          <p>Select one of the videos from the panel below</p>
          {selectedVideo && (
            <p style={{ marginTop: '20px', fontSize: '18px', color: '#4F46E5' }}>
              Selected: {selectedVideo}
            </p>
          )}
        </div>

        <ArtifactPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode="videos"
          videoOptions={sampleVideos}
          onVideoSelect={handleVideoSelect}
        />
      </div>
    )
  },
}

export const TextWithTypewriter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    const sampleText = `// Welcome to the Artifact Panel!

function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to our chat component library.\`;
}

const features = [
  'Typewriter effect',
  'Liquid glass aesthetics',
  'Dark and light themes',
  'Fully responsive design'
];

// This text appears with a typewriter effect
greet('Developer');`

    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Panel
        </button>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2>Text with Typewriter Effect</h2>
          <p>Watch the text appear character by character</p>
        </div>

        <ArtifactPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode="text"
          textContent={sampleText}
          typewriterSpeed={30}
        />
      </div>
    )
  },
}

export const PromptSelection: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

    const samplePrompts = [
      {
        id: 'prompt-1',
        text: 'A breathtaking mountain landscape at golden hour with snow-capped peaks reflecting in a crystal-clear alpine lake, surrounded by dense pine forests'
      },
      {
        id: 'prompt-2',
        text: 'A minimalist modern office workspace with clean lines, natural light streaming through floor-to-ceiling windows, and contemporary furniture'
      },
      {
        id: 'prompt-3',
        text: 'A vibrant sunset over rolling hills with wildflowers in the foreground and soft clouds painting the sky in warm colors'
      }
    ]

    const handlePromptSelect = (promptId: string, prompt: any) => {
      setSelectedPrompt(prompt.text)
      console.log('Selected prompt:', promptId, prompt)
    }

    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Panel
        </button>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          maxWidth: '600px'
        }}>
          <h2>Prompt Selection with Typewriter</h2>
          <p>Watch the prompts appear with a typewriter effect, then select one</p>
          {selectedPrompt && (
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#4F46E5', fontStyle: 'italic' }}>
              Selected: {selectedPrompt.substring(0, 50)}...
            </p>
          )}
        </div>

        <ArtifactPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode="prompts"
          promptOptions={samplePrompts}
          onPromptSelect={handlePromptSelect}
          typewriterSpeed={20}
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
          width: '100%', 
          height: '100vh', 
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
        data-theme="light"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          {isOpen ? 'Close' : 'Open'} Panel
        </button>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#1a1a1a'
        }}>
          <h2>Light Mode</h2>
          <p>Artifact panel in light theme</p>
        </div>

        <ArtifactPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode="images"
          imageOptions={sampleImages}
          onImageSelect={(id, img) => console.log('Selected:', id, img)}
        />
      </div>
    )
  },
}
