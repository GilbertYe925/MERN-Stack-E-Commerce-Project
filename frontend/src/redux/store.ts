import { configureStore } from '@reduxjs/toolkit'
import { setupListeners} from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice'
import authReducer from './features/auth/authSlice'
import favoritesReducer from './features/favorites/favoriteSlice'
import cartReducer from './features/cart/cartSlice'
import {getFavoritesFromLocalStorage} from '../utils/localStorage'
import shopReducer from './features/shop/shopSlice'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartReducer,
        shop: shopReducer,
    },

    preloadedState: {
        favorites: {
            favorites: initialFavorites,
        },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;