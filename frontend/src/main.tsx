import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './utils/Context/ChatProvider.tsx'

createRoot(document.getElementById('root')!).render(
<ChatProvider>
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
  </ChatProvider>
  ,
)
