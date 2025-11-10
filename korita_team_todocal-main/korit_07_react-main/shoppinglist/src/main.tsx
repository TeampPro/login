import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = `${import.meta.env.VITE_COOGLE_CLIENT_ID}`;

if (!googleClientId)
  console.log('Google Client ID가 설정되지 않았습니다.');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
