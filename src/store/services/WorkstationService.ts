import api from '../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkstationInput } from './../../interface/input/WorkStationInput';

export const getWorkstationList = createAsyncThunk(
  `workstation`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Workstation?fields=["name","workstation_name", "description", "owner","workstation_type"]&order_by=creation%20desc`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWorkstationInfo = createAsyncThunk( 
  `info/workstation`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Workstation/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createWorkstation = createAsyncThunk(
  `create/workstation`,
  async (payload: WorkstationInput, { rejectWithValue }) => {
    try {
      const response = await api.post('resource/Workstation', payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteWorkstation = createAsyncThunk(
  `delete/workstation`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Workstation/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateWorkstation = createAsyncThunk(
  `update/workstation`,
  async (
    { name, payload }: { name: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`resource/Workstation/${name}`, payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
