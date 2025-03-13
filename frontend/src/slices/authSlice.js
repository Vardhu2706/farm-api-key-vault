import { createSlice } from "@reduxjs/toolkit";

// Check localStorage for stored user + token
let userInfoFromStorage = null;
try {
  const stored = localStorage.getItem("userInfo");
  userInfoFromStorage = stored ? JSON.parse(stored) : null;
} catch (err) {
  console.warn("Error parsing userInfo from localStorage:", err);
  localStorage.removeItem("userInfo");
}

const initialState = {
  userInfo: userInfoFromStorage,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.access_token;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.access_token);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
