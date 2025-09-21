import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const parentCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createParentCategory: build.mutation({
      query: (data) => ({
        url: "parent-category/create-parent-category",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.parentC],
    }),
    getAllParentCategory: build.query({
      query: (query:any) => {
        const filter = new URLSearchParams(query).toString();
        return {
          url: `parent-category?${filter}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.parentC],
    }),
    deleteParentCategory: build.mutation({
      query: (id: string) => ({
        url: `parent-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.parentC],
    }),
    restoreParentCategory: build.mutation({
      query: (id: string) => ({
        url: `parent-category/restore/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.parentC],
    }),
  }),
});

export const {
  useCreateParentCategoryMutation,
  useGetAllParentCategoryQuery,
  useDeleteParentCategoryMutation,
  useRestoreParentCategoryMutation,
} = parentCategoryApi;
