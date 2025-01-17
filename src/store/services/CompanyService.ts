import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getCompanyList = createAsyncThunk(
    `company`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await api.get(
          `resource/Company?fields=["name"]`
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
);