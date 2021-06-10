import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.scss'
import { AppComponent } from './components/app.component'

const queryClient = new QueryClient();

ReactDOM.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <AppComponent />
        </QueryClientProvider>
    </Router>, 
    document.getElementById('root')
);
