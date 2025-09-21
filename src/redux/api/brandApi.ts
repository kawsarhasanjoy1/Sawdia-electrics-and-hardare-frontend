import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBrand: build.mutation({
      query: (data) => ({
        url: "brand/create-brand",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),
    getAllBrand: build.query({
      query: (query: Record<string, any> | undefined) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `brand?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.brand],
    }),
    deletedBrand: build.mutation({
      query: (id) => ({
        url: `brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
    restoreBrand: build.mutation({
      query: (id) => ({
        url: `brand/restore/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandQuery,
  useDeletedBrandMutation,
  useRestoreBrandMutation,
} = brandApi;
