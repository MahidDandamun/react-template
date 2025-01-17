import api from '../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
 
import { OperationInput } from './../../interface/input/OperationInput';

export const getOperationList = createAsyncThunk(
  `operation`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Operation?fields=["name","workstation", "owner", "description"]&order_by=creation%20desc`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOperationInfo = createAsyncThunk(
  `info/operation`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Operation/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createOperation = createAsyncThunk(
  `create/operation`,
  async (payload: OperationInput, { rejectWithValue }) => {
    try {
      const response = await api.post('resource/Operation', payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteOperation = createAsyncThunk(
  `delete/operation`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Operation/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOperation = createAsyncThunk(
  `update/operation`,
  async (
    { name, payload }: { name: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`resource/Operation/${name}`, payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
