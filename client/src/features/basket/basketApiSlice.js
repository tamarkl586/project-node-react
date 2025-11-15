import apiSlice from "../../app/apiSlice"

const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUserBasketById: build.query({
            query: () => ({
                url: '/api/basket',
                method: "GET"
            }),
            providesTags: ["basket"]
        }),

        addProductToBasket: build.mutation({
            query: (item) => ({
                url: '/api/basket',
                method: "POST",
                body: item
            }),
            invalidatesTags: ["basket"]
        }),

        deleteBasketProduct: build.mutation({
            query: (productId) => ({
                url: '/api/basket',
                method: "DELETE",
                body: productId
            }),
            invalidatesTags: ["basket"]
        })
    })
})

export const {useGetUserBasketByIdQuery, useAddProductToBasketMutation, useDeleteBasketProductMutation} = basketApiSlice