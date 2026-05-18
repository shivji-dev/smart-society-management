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
  'http://https://smart-society-backend-yrq0.onrender.com0'
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