import { createSlice } from "@reduxjs/toolkit"
import { productApiSlice } from "../../api/productApiSlice"

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
    },
    reducers: {
        addToFavorites: (state: any, action: any) => {
            if (!state.favorites.some((product: any) => product._id === action.payload._id)) {
                state.favorites.push(action.payload)
            }
        },
        removeFromFavorites: (state: any, action: any) => {
            state.favorites = state.favorites.filter((product: any) => product._id !== action.payload._id)
        },
        setFavorites: (state: any, action: any) => {
            state.favorites = action.payload
        },
    },
})

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions
export const selectFavoriteProduct = (state: any) => state.favorites.favorites
export default favoriteSlice.reducer