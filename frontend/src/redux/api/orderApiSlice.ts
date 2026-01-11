import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: order,
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                method: "GET",
            }),
        }),
        payOrder: builder.mutation({
            query: ({ id, details }: { id: string; details: any }) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                method: "PUT",
                body: details,
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                method: "GET",
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (id: string) => ({
                url: `${ORDERS_URL}/${id}/deliver`,
                method: "PUT",
            }),
        }),
        getTotalOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/total-orders`,
                method: "GET",
            }),
        }),
        getTotalSales: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/total-sales`,
                method: "GET",
            }),
        }),
        getTotalSalesByDate: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/total-sales-by-date`,
                method: "GET",
            }),
        }),
    }),
});

export const { 
    useCreateOrderMutation, 
    useGetOrderDetailsQuery, 
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery
} = orderApiSlice;