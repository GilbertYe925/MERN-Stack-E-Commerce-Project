import { apiSlice } from "../api/apiSlice"
import { CATEGORIES_URL } from "../constants"


export const categoryApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: (builder) => ({
            fetchCategories: builder.query({
                query: () => `${CATEGORIES_URL}/categories`,
                providesTags: ['Category'],
            }),
            getCategory: builder.query({
                query: (categoryId) => `${CATEGORIES_URL}/${categoryId}`,
                providesTags: ['Category'],
            }),
            createCategory: builder.mutation({
                query: (category) => ({
                    url: `${CATEGORIES_URL}`,
                    method: 'POST',
                    body: category,
                }),
                invalidatesTags: ['Category'],
            }),
            updateCategory: builder.mutation({
                query: ({categoryId, updatedCategory}) => ({
                    url: `${CATEGORIES_URL}/${categoryId}`,
                    method: 'PUT',
                    body: updatedCategory,
                }),
                invalidatesTags: ['Category'],
            }),
            deleteCategory: builder.mutation({
                query: (categoryId) => ({
                    url: `${CATEGORIES_URL}/${categoryId}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Category'],
            }),
        }),
    })
export const { 
    useFetchCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation 
} = categoryApiSlice;