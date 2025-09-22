import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCoupon: build.mutation({
      query: (formData) => ({
        url: "coupon/create-coupon",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    getCoupons: build.query({
      query: (filters) => {
        const query = new URLSearchParams(filters).toString();
        return {
          url: `coupon?${query}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.coupon],
    }),
    updateCoupon: build.mutation({
      query: ({ id, data }) => ({
        url: `coupon/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    applyCoupon: build.mutation({
      query: (payload) => ({
        url: "coupon/apply",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = couponApi;
