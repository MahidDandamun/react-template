import api from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerInput } from "../../interface/input/CustomerInput";

export const getCustomersList = createAsyncThunk(
  `customers`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Customer?fields=["name","customer_name","customer_group","docstatus","owner","customer_type","territory","disabled"]`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createCustomer = createAsyncThunk(
  `create/customer`,
  async (payload: CustomerInput) => {
    try {
      const response = await api.post("resource/Customer", payload);

      return response.data;
    } catch (error: any) {
      return error;
    }
  }
);

export const updateCustomer = createAsyncThunk(
  `update/customer`,
  async ({ name, payload }: { name: string; payload: CustomerInput },{rejectWithValue}) => {
    try {
      const response = await api.put(`resource/Customer/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getCustomerGroup = createAsyncThunk(
  `customerGroup`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Customer Group`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getTerritory = createAsyncThunk(
  `territory`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Territory`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getCustomerInfo = createAsyncThunk(
  `customer/info`,
  async (name: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Customer/${name}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  `delete/customer`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Customer/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);