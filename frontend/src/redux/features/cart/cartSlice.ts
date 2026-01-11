import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart";

const cartData = localStorage.getItem('cart');
const initialState = cartData ? JSON.parse(cartData) : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "Paypal",
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {user, rating, numReviews, reviews, ...item} = action.payload;
            const existingItem = state.cartItems.find((cartItem: any) => cartItem._id === action.payload._id);
            if (existingItem) {
                state.cartItems = state.cartItems.map((x: any) => x._id === existingItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item: any) => item._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
           localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
        resetCart: (state) => {
            return {
                cartItems: [],
                shippingAddress: {},
                paymentMethod: "Paypal",
            };
        },
    }
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;