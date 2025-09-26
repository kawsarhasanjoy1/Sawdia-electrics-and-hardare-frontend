import { axiosBaseQuery } from "@/halpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TagTypeList } from "../tagTypes";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://sawdia-electrics-and-hardare-backend.onrender.com/" }),
  endpoints: () => ({}),
  tagTypes: TagTypeList
});
