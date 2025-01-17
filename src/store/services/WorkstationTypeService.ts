import api from '../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkstationTypeInput } from './../../interface/input/WorkStationTypeInput';

export const getWorkstationTypeList = createAsyncThunk(
  `workstation-type`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Workstation Type?fields=["name", "description", "owner"]&order_by=creation%20desc`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWorkstationTypeInfo = createAsyncThunk(
  `info/workstation-type`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Workstation Type/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createWorkstationType = createAsyncThunk(
  `create/workstation-type`,
  async (payload: WorkstationTypeInput, { rejectWithValue }) => {
    try {
      const response = await api.post('resource/Workstation Type', payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteWorkstationType = createAsyncThunk(
  `delete/workstation-type`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Workstation Type/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateWorkstationType = createAsyncThunk(
  `update/workstation_type`,
  async (
    { name, payload }: { name: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`resource/Workstation Type/${name}`, payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
