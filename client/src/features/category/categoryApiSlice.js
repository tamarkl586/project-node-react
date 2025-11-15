import apiSlice from "../../app/apiSlice"

const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllCategoreis: build.query({
            query: () => ({
                url: '/api/category',
                method: "GET"
            }),
            providesTags: ["category"]
        }),

        addCategory: build.mutation({
            query: (name) => ({
                url: '/api/category',
                method: "POST",
                body: name
            }),
            invalidatesTags: ["category"]
        }),

        updateCategory: build.mutation({
            query: (item) => ({
                url: `/api/category/${item.id}`,
                method: "PUT",
                body: item
            }),
            invalidatesTags: ["category"]
        }),

        deleteCategory: build.mutation({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["category"]
        })
        
    })
})

export const {useGetAllCategoreisQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation} = categoryApiSlice