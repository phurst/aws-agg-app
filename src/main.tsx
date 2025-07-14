import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

const rootElement: HTMLElement | null = document.getElementById('root');
if(!rootElement) {
  throw Error("Can't find the root element");
}
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
