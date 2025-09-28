import { axiosBaseQuery } from "@/halpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TagTypeList } from "../tagTypes";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://mazza-rastourent-backend-1.onrender.com/api/v1/" }),
  endpoints: () => ({}),
  tagTypes: TagTypeList
});
