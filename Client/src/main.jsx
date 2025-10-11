import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routing/routeTree.js'
import { queryClient, store } from './client.js'
import { Provider } from 'react-redux'
import React, { Suspense } from 'react';
import Loader from './components/Loader';

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader text="Loading page..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </Provider>
)