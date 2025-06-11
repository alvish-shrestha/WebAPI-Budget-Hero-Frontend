import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css'
import AppRouters from './routers/AppRouters.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouters />
  </StrictMode>,
)
