import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import ContextCart from './Context/ContextCart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextCart>
    <App />
    </ContextCart>
  </StrictMode>,
)
