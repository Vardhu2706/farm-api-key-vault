import { apiSlice } from "./apiSlice";

const KEYS_URL = "/api/keys";

export const keysApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['YourKeys', 'SharedKeys'],
  endpoints: (builder) => ({
    // Mutations
    createKey: builder.mutation({
      query: (data) => ({
        url: KEYS_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateKey: builder.mutation({
      query: ({ keyId, ...data }) => ({
        url: `${KEYS_URL}/key/${keyId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteKey: builder.mutation({
      query: ({ keyId }) => ({
        url: `${KEYS_URL}/key/${keyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['YourKeys'],
    }),
    shareKey: builder.mutation({
      query: (data) => ({
        url: `${KEYS_URL}/share`,
        method: "POST",
        body: data,
      }),
    }),
    removeSharedKey: builder.mutation({
      query: ({ keyId, userIdToRemove }) => ({
        url: `${KEYS_URL}/key/${keyId}/unshare/${userIdToRemove}`,
        method: "DELETE",
      }),
    }),

    // Queries
    getKeys: builder.query({
      query: () => `${KEYS_URL}/user`,
      providesTags: ['YourKeys'],
    }),
    getSharedKeys: builder.query({
      query: () => `${KEYS_URL}/shared`,
      providesTags: ['SharedKeys'],
    }),
  }),
  keepUnusedDataFor: 0,
});

export const {
  useCreateKeyMutation,
  useGetKeysQuery,
  useUpdateKeyMutation,
  useDeleteKeyMutation,
  useShareKeyMutation,
  useGetSharedKeysQuery,
  useRemoveSharedKeyMutation,
} = keysApiSlice;
