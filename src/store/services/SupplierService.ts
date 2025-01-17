import api from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SupplierInput } from "../../interface/input/SupplierInput";

export const getSuppliersList = createAsyncThunk(
  `get/suppliers`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Supplier?fields=["name","supplier_name","supplier_group","supplier_type","disabled","owner","creation"]`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getSupplierGroup = createAsyncThunk(
  `get/supplier-group`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Supplier Group`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createSupplier = createAsyncThunk(
  `create/supplier`,
  async (payload: SupplierInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Supplier", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
);

export const getSupplierInfo = createAsyncThunk(
  `info/supplier`,
  async (name: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Supplier/${name}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  `update/supplier`,
  async ({ name, payload }: { name: string; payload: SupplierInput }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Supplier/${name}`, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  `delete/supplier`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Supplier/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
