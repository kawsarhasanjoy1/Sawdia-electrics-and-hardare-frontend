import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        data,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "auth/logOut",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation({
      query: (data: { oldPassword: string; newPassword: string }) => ({
        url: "auth/change-password",
        method: "PATCH",
        data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data: { email: string }) => ({
        url: "auth/forget-password",
        method: "PATCH",
        data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { token: string; newPassword: string }) => ({
        url: "auth/reset-password",
        method: "PATCH",
        data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
