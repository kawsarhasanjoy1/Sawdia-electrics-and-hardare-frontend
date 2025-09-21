import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (review) => ({
        url: "review/create-Review",
        method: "POST",
        data: review,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    getAllReview: build.query({
      query: () => ({
        url: "review",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    getUserReview: build.query({
      query: () => ({
        url: "review/user-review",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetAllReviewQuery, useCreateReviewMutation, useGetUserReviewQuery } = reviewApi;
