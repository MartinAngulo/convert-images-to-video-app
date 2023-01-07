import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

axios.defaults.baseURL = 'http://localhost:3001'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
