import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateOrderStatus: build.mutation({
      query: ({ transactionId, status }) => ({
        url: `order/up-status/${transactionId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    getOrders: build.query({
      query: (query: any) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `order?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.order],
    }),
    getUserOrders: build.query({
      query: (query: any) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `order/my-order?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.order],
    }),
    getStats: build.query({
      query: () => ({
        url: `order/stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    getMonthlySales: build.query({
      query: () => ({
        url: `order/monthly-sales`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    getUserStats: build.query({
      query: () => ({
        url: `order/user-stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    getUserYearlyBuy: build.query({
      query: () => ({
        url: `order/user-yearly-buy`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    softDeletedOrder: build.mutation({
      query: (id) => ({
        url: `order/delete-my-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
    restoreOrder: build.mutation({
      query: (id) => ({
        url: `order/restored-my-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetMonthlySalesQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetUserStatsQuery,
  useGetUserYearlyBuyQuery,
  useGetUserOrdersQuery,
  useSoftDeletedOrderMutation,
  useRestoreOrderMutation,
} = orderApi;
