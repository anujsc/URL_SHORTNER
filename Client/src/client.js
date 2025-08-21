import { QueryClient } from '@tanstack/react-query'
import store from './store/store.js'

export const queryClient = new QueryClient()
export { store }