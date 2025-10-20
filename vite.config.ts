import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// 👇 Define whether we're building Storybook (we'll set this via an env variable)
const isStorybook = process.env.STORYBOOK === 'true'

// 🧱 Vite configuration
export default defineConfig({
  plugins: [
    react(),
    // 👇 Only include the TypeScript declaration plugin if NOT building Storybook
    !isStorybook && dts({
      include: ['src'],
      rollupTypes: true
    }),
  ].filter(Boolean), // removes "false" or undefined items from the array
  
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ChatComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-markdown', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-markdown': 'ReactMarkdown',
          'lucide-react': 'LucideReact'
        }
      }
    },
    cssCodeSplit: false
  }
})
