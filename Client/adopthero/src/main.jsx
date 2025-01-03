import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "toastify-js/src/toastify.css"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './app/store'
import { Provider } from 'react-redux'
// import 'dotenv/config'
// const clientId = process.env.CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId="909351711597-siu1i691i645icj35erlsjhs4bv15b62.apps.googleusercontent.com" redirectUri="http://localhost:5173">
     <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
