import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

import { AuthProvider }
from './context/AuthContext'

import { io }
from 'socket.io-client'

// Socket Connection

export const socket = io(
 import.meta.env.VITE_API_URL.replace("/api", "")
)
 

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <AuthProvider>

      <App />

    </AuthProvider>

  </React.StrictMode>
)