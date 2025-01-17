import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { WarehouseDetails } from '../../interface/input/WarehouseInput';
import { WarehouseList } from '../../interface/output/Warehouse/WarehouseList';

export const getWarehouseList = createAsyncThunk(
  `warehouse`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Warehouse?fields=["name","warehouse_name","disabled","is_group","company","owner"]`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createWarehouse = createAsyncThunk(
  `create/warehouse`,
  async (payload: WarehouseDetails, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Warehouse", payload);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
);

export const getWarehouseInfo = createAsyncThunk(
  'warehouse/info',
  async (name: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Warehouse/${name}`)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateWarehouse = createAsyncThunk(
  'update/warehouse',
  async ({ name, payload }: { name: string, payload: WarehouseList }) => {
    try {
      const response = await api.put(`resource/Warehouse/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return error;
    }
  }
);

export const deleteWarehouse = createAsyncThunk(
  `delete/warehouse`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Warehouse/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

