import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    categories: [],
    checked : [],
    radio: [],
    brandCheckboxes: {},
    checkedBrands: {},
    selectedBrand: null
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        setCategories: (state, action) => {
            state.categories = action.payload;
        },

        setChecked: (state, action) => {
            state.checked = action.payload;
        },

        setRadio: (state, action) => {
            state.radio = action.payload;
        },

        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
        },

        resetFilters: (state) => {
            state.checked = [];
            state.radio = [];
            state.selectedBrand = null;
        },
    },  
});

export const { setProducts, setCategories, setChecked, setRadio, setSelectedBrand, resetFilters } = shopSlice.actions;
export default shopSlice.reducer;