import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addPayment: build.mutation({
      query: (data) => ({
        url: "payment/order-payment",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    successPayment: build.mutation({
      query: (id) => ({
        url: `payment/payment-success/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    updatePaymentStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `payment/update-status/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    failPayment: build.mutation({
      query: (id) => ({
        url: `payment/payment-fail/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    getOrders: build.query({
      query: (query: any) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `payment?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.payment],
    }),
    getUserOrders: build.query({
      query: (query: any) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `payment/my-order?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.payment],
    }),
    getStats: build.query({
      query: () => ({
        url: `payment/stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    getMonthlySales: build.query({
      query: () => ({
        url: `payment/monthly-sales`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),

    getUserStats: build.query({
      query: () => ({
        url: `payment/user-stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    getUserYearlyBuy: build.query({
      query: () => ({
        url: `payment/user-yearly-buy`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    softDeletedOrder: build.mutation({
      query: (id) => ({
        url: `payment/delete-my-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    restoreOrder: build.mutation({
      query: (id) => ({
        url: `payment/restored-my-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  useAddPaymentMutation,
  useSuccessPaymentMutation,
  useFailPaymentMutation,
  useGetStatsQuery,
  useGetMonthlySalesQuery,
  useGetOrdersQuery,
  useUpdatePaymentStatusMutation,
  useGetUserStatsQuery,
  useGetUserYearlyBuyQuery,
  useGetUserOrdersQuery,
  useSoftDeletedOrderMutation,
  useRestoreOrderMutation,
} = orderApi;
