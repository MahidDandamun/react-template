import { createSlice } from "@reduxjs/toolkit";
import LoginState from "../../interface/output/LoginState";
import { login, validateToken } from "../services/LoginService";

const initialState: LoginState = {
  username: "",
  password: "",
  isLoading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  tokenExpiration: localStorage.getItem("tokenExpiration") || null,
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") as string)
    : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {

        // const encodedString = Buffer.from('your string here').toString('base64');
        state.token = action.payload.message.token;
        state.userData = action.payload.message.user;
        state.tokenExpiration = String(Date.now() + 500 * 1000);
        state.isLoading = false;
        state.isLoggedIn = true;
        state.username = action.payload.message.data.user.full_name;
        state.userData = action.payload.message.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(validateToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;

      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Invalid token';

      });
  },

});

export const { setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
