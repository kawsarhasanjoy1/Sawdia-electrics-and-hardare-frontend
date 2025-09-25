import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const PAYMENTS_BASE = "payment";

export const paymentsApi2 = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initPayment: build.mutation({
      query: (data) => ({
        url: `${PAYMENTS_BASE}/init`,
        method: "POST",
        data,
      }),
    }),

    ipnDebug: build.mutation({
      query: (data) => ({
        url: `${PAYMENTS_BASE}/ipn`,
        method: "POST",
        data,
      }),
    }),
    getPayments: build.query({
      query: (query: any) => {
        const filters = new URLSearchParams(query).toString();
        return {
          url: `${PAYMENTS_BASE}?${filters}`,
          method: "GET",
        };
      },
    }),
    getUserPayments: build.query({
      query: (query: any) => {
        const filters = new URLSearchParams(query).toString();
        return {
          url: `${PAYMENTS_BASE}/user-payment?${filters}`,
          method: "GET",
        };
      },
    }),

    updatePaymentStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `${PAYMENTS_BASE}/up-status/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
  overrideExisting: false,
});

export const {
  useInitPaymentMutation,
  useIpnDebugMutation,
  useGetPaymentsQuery,
  useUpdatePaymentStatusMutation,
  useGetUserPaymentsQuery,
} = paymentsApi2;
