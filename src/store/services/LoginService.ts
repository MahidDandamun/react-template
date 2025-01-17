import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { apiNoInterceptor } from "../../api/api";
import { environment } from "../../utils/environment";

const version = environment.API.version;

interface LoginCredentials {
  username: string;
  password: string;
}
export const login = createAsyncThunk(
  `api/${version}/login`,
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    return await apiNoInterceptor
      .post(`method/inventory_system.api.login`, credentials)
      .then((response) => {
        const data = response.data;
        const encodedString = data.message.data.token;
        localStorage.setItem("token", encodedString);
        localStorage.setItem("userData", JSON.stringify(data.message.data.user))
        // localStorage.setItem('tokenExpiration', String(Date.now() + 500 * 1000)); // Convert expiration to milliseconds in string

        if (data.message.success_key === 0) {
          return rejectWithValue(data.message.message);
        }
        return response.data;
      })
      .catch((error) => {
        const { response } = error;
        if (response) {
          const { request, ...errorObject } = response;
          return rejectWithValue(errorObject);
        } else {
          throw error;
        }
      });
  }
);

export const validateToken = createAsyncThunk(
  `api/${version}/validate/token`,
  async () => {
    const response = await api.get(`validate/token`);
    return response.data;
  }
);
