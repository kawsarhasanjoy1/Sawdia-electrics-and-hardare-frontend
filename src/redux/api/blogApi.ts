import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: "blog",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getBlog: build.query({
      query: (query: any) => {
        const params = new URLSearchParams(query).toString();
        return {
          url: `blog?${params}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.blog],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    restoreBlog: build.mutation({
      query: (id) => ({
        url: `blog/restore/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    togglePublish: build.mutation({
      query: (id: string) => ({
        url: `blog/toggle-publish/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogQuery,
  useDeleteBlogMutation,
  useTogglePublishMutation,
} = blogApi;
