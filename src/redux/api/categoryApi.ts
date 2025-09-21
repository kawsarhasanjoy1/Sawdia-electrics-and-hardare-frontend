import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: "category/create-category",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getAllCategory: build.query({
      query: (query: Record<string, any> | undefined) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `category?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),
    deletedCategory: build.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
    restoreCategory: build.mutation({
      query: (id) => ({
        url: `category/restore/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeletedCategoryMutation,
  useRestoreCategoryMutation,
} = categoryApi;
