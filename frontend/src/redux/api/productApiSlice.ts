import {PRODUCTS_URL, UPLOADS_URL} from '../constants'
import {apiSlice} from './apiSlice'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword, pageNumber}) => ({
                url: PRODUCTS_URL,
                params: keyword ? {keyword, pageNumber} : {pageNumber},
            }),
        }),
        getProductById: builder.query({
            query: ({productId}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: (result: any, error: any, {productId}) => [{type: 'Product', id: productId}],
        }),
        allProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/allproducts`,
            }),
        }),

        getProductDetails: builder.query({
            query: ({productId}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: (result: any, error: any, {productId}) => [{type: 'Product', id: productId}],
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: (productData: FormData) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({productId, formData}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        deleteProduct: builder.mutation({
            query: ({productId}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: ({data}) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result: any, error: any, {data}) => [{type: 'Product', id: data.productId}],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        }),
        getNewProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/new`,
            }),
            keepUnusedDataFor: 5,
        }),
        uploadProductImage: builder.mutation({
            query: (data: FormData) => ({
                url: UPLOADS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        getFilteredProducts: builder.query({
            query: ({checked, radio}) => ({
                url: `${PRODUCTS_URL}/filtered-products`,
                method: 'POST',
                body: {checked, radio},
            }),
        }),
    })
})

export const {
    useGetProductsQuery, 
    useGetProductByIdQuery, 
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation, 
    useUpdateProductMutation, 
    useDeleteProductMutation, 
    useCreateReviewMutation, 
    useGetTopProductsQuery, 
    useGetNewProductsQuery,
    useUploadProductImageMutation, 
    useGetFilteredProductsQuery,
} = productApiSlice;