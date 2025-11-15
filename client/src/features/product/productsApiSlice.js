import apiSlice from "../../app/apiSlice"

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: '/api/product',
                method: "GET"
            }),
            providesTags: ["product"]
        }),

        getProductById: build.query({
            query: (id) => ({
                url: `api/product/${id}`,
                method: "GET"
            }),
            providesTags: ["product"]
        }),

        addProduct: build.mutation({
            query: (newItem) => ({
                url: "/api/product",
                method: "POST",
                body: newItem
            }),
            invalidatesTags: ["product"]
        }),

        updateProduct: build.mutation({
            query: (item) => ({
                url: `/api/product/${item.id}`,
                method: "PUT",
                body: item
            }),
            invalidatesTags: ["product"]
        }),
        
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["product"]
        })
    }),
})
export const {useGetAllProductsQuery, useGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApiSlice