/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import { AuthProvider } from './component/Context/LogInContext.tsx'

/* createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      
        <App />
      
    </StrictMode>
  </BrowserRouter>
  ,
) */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>,
)
