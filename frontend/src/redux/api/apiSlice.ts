import { fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

// Debug: Log BASE_URL to verify it's set correctly (remove in production)
if (typeof window !== 'undefined') {
  console.log('API BASE_URL:', BASE_URL || 'NOT SET - Using relative paths');
}

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: () => ({}),
})
