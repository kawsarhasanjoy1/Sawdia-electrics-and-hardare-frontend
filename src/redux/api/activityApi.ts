import { baseApi } from "./baseApi";

export const activityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRecentActivities: build.query({
      query: () => ({
        url: "recent-activity",
        method: "GET",  
      }),
    }),
  }),
});

export const { useGetRecentActivitiesQuery } = activityApi;
