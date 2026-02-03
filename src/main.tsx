import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🚀 FrameCraftAI starting...')

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  console.log('✅ Root element found')

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  console.log('✅ App rendered successfully')
} catch (error) {
  console.error('❌ Failed to initialize app:', error)
  document.body.innerHTML = `
    <div style="padding: 40px; font-family: system-ui; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #e11d48;">Application Error</h1>
      <p>Failed to initialize FrameCraftAI</p>
      <pre style="background: #f3f4f6; padding: 20px; border-radius: 8px; overflow: auto;">${error}</pre>
      <p style="margin-top: 20px;">Please check:</p>
      <ul>
        <li>Environment variables in .env file</li>
        <li>Browser console for detailed errors (F12)</li>
      </ul>
    </div>
  `
}
