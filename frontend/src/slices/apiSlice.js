import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000", // ✅ FastAPI backend
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "YourKeys", "SharedKeys"],
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 0,
});

export default apiSlice.reducer;
