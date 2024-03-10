import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'
import { Theme } from './theme.ts'
import App from './App.tsx'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <BrowserRouter><App /></BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>,
)
