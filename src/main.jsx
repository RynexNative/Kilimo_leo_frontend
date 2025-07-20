import { StrictMode } from 'react'
import { AuthProvider } from './context/authContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="215603538898-tucljistpuqifiv882pcqfp0cgu8f3ib.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>

    </GoogleOAuthProvider>
  </StrictMode>,
)
