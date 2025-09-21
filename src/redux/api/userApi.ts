import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createAdmin: build.mutation({
      query: (data) => (console.log(data),{
        url: "user/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getUser: build.query({
      query: (query: any) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `user?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: "user/update-user",
        method: "PATCH",
        data,
      }),
    }),
    getMe: build.query({
      query: () => {
        return {
          url: `user/get-me`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    userStatusUp: build.mutation({
      query: ({ id, status }) => ({
        url: `user/status/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    restoreUser: build.mutation({
      query: (id) => ({
        url: `user/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUserStatusUpMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useCreateAdminMutation,
} = userApi;
