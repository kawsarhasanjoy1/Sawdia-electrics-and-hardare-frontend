import { axiosBaseQuery } from "@/halpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TagTypeList } from "../tagTypes";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: () => ({}),
  tagTypes: TagTypeList
});
