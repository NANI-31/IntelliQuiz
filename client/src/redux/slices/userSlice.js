import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token") || null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: !!tokenFromStorage,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateUser: (state, action) => {
      if (state.user && Array.isArray(state.user.quizzes)) {
        state.user.quizzes.push(action.payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    clearUsersData: (state) => {
      state.usersData = [];
    },
  },
});

export const { login, setToken, logout, clearUsersData, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
