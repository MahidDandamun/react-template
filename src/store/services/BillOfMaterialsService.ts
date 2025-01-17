import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { BillOfMaterialsInput } from '../../interface/input/BillOfMaterialsInput';

export const getBillOfMaterialsList = createAsyncThunk(
  `bill-of-materials`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/BOM?fields=["name","item","is_default","is_active","owner","total_cost","docstatus"]&order_by=creation%20desc`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getBillOFMaterialsInfo = createAsyncThunk(
  `info/bill-of-materials`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/BOM/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const createBillOfMaterials = createAsyncThunk(
  `create/bill-of-materials`,
  async (payload: BillOfMaterialsInput, { rejectWithValue }) => {
    try {
      const response = await api.post('resource/BOM', payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const deleteBillOfMaterials = createAsyncThunk(
  `delete/bill-of-materials`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/BOM/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateBillOfMaterials = createAsyncThunk(
  `update/bill-of-materials`,
  async (
    { name, payload }: { name: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`resource/BOM/${name}`, payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
