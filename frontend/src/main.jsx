import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#14532d',
            color: '#fff',
            fontFamily: 'DM Sans, sans-serif',
            borderRadius: '10px',
            padding: '12px 16px',
          },
          success: { iconTheme: { primary: '#d4a017', secondary: '#fff' } },
          error: { style: { background: '#7f1d1d' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)