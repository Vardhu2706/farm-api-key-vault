// Importing Reducers
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
