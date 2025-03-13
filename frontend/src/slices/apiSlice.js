import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "YourKeys", "SharedKeys"],
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 0,
});

export default apiSlice.reducer;
