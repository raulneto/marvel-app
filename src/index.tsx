import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.scss'
import { AppComponent } from './components/app.component'

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <AppComponent />
    </QueryClientProvider>, 
    document.getElementById('root')
);
