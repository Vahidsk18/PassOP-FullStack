import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context_api/ThemeContext.jsx'
import { AuthProvider } from './context_api/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <AuthProvider>
            <BrowserRouter>

                <App />
                <SpeedInsights />
                <Analytics />

            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>

)
