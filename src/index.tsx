import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

const rootElement = document.getElementById('root')

if (rootElement != null) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <App />
        </ThemeProvider>,
      </BrowserRouter>
    </StrictMode>
  )
} else {
  console.error('Element with id "root" not found')
}
