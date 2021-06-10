import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { getComics, useComics } from './useComics';
import { QueryClient, QueryClientProvider } from 'react-query';
import nock from 'nock';
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks'

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return ({ children }: any) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

axios.defaults.adapter = require('axios/lib/adapters/http');

nock('http://gateway.marvel.com')
        .filteringPath(path => '/test')
        .get('/test')
        .reply(200, {
            data: {
                total: 1
            }
        })

test("useComics", async () => {
    const { result, waitFor } = renderHook(() => useComics(), {
        wrapper: createWrapper()
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current).toBeDefined();
});
