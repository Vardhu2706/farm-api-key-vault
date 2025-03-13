import { apiSlice } from "./apiSlice";

const USERS_URL = "/auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutations
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    getQRCode: builder.mutation({
      query: (email) => ({
        url: `${USERS_URL}/qrcode`,
        method: "POST",
        body: { email },
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetQRCodeMutation,
  useGetProfileQuery,
} = usersApiSlice;
