import cleanQuery from "@/utils/cleanQuery";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (product) => ({
        url: "product/create-product",
        method: "POST",
        data: product,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    getAllProduct: build.query({
      query: (query: any) => {
        const cleanQry = cleanQuery(query);
        const params = new URLSearchParams(cleanQry).toString();

        return {
          url: `product?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.product],
    }),
    getSingleProduct: build.query({
      query: (id) => {
        return {
          url: `product/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.product],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `product/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    deletedProduct: build.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
    restoreProduct: build.mutation({
      query: (id) => ({
        url: `product/restore/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),

    saveFavouriteProduct: build.mutation({
      query: (id) => ({
        url: `favourite`,
        method: "POST",
        data: { productId: id },
      }),
      invalidatesTags: [tagTypes.favourite],
    }),
    getSaveFavouriteProduct: build.query({
      query: () => ({
        url: `favourite`,
        method: "GET",
      }),
      providesTags: [tagTypes.favourite],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useSaveFavouriteProductMutation,
  useDeletedProductMutation,
  useRestoreProductMutation,
  useGetSaveFavouriteProductQuery,
  useUpdateProductMutation,
} = productsApi;
