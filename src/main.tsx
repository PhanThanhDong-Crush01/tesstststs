import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider, focusManager } from 'react-query'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()
focusManager.setFocused(true)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
)
