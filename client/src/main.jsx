import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import querryClientProvider from './QuerryClientProvider.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={querryClientProvider}>
    <App />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>,
)
