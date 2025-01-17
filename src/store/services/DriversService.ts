import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { DriverInfoInput, DriverInput } from "../../interface/input/DriverInput";

export const getDriversList = createAsyncThunk(
    'driver',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `resource/Driver?fields=["full_name","status","employee","name", "address","owner"]`
            );
            return response.data
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const createDriver = createAsyncThunk(
    `create/driver`,
    async (payload: DriverInput,{rejectWithValue}) => {
      try {
        const response = await api.post("resource/Driver", payload);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
);

export const getDriverInfo = createAsyncThunk(
  'driver/info',
  async (name: any, {rejectWithValue}) => {
    try {
      const response = await api.get(`resource/Driver/${name}`)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateDriver = createAsyncThunk(
  'update/driver',
  async({name, payload}: {name: any, payload: DriverInfoInput},{rejectWithValue}) => {
    try {
      const response = await api.put(`resource/Driver/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// REMOVE WHEN SUPPLIER MODULE IS MERGED 
// TEMPORARY FETCHING FROM HERE ONLY
export const getSuppliersList = createAsyncThunk(
    'supplier',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `resource/Supplier?fields=["supplier_name"]`
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const deleteDriver = createAsyncThunk(
  `delete/driver`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Driver/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);