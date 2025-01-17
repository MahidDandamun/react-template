import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { RoutingInput } from "../../interface/input/RoutingInput";

export const getRoutingList = createAsyncThunk(
  `routing`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Routing?fields=["name","creation", "owner", "disabled"]&order_by=creation%20desc`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createRouting = createAsyncThunk(
  `create/routing`,
  async (payload: RoutingInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Routing", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getRoutingInfo = createAsyncThunk(
  `info/routing`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Routing/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateRouting = createAsyncThunk(
  `update/routing`,
  async ({ name, payload }: { name: string; payload: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Routing/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRouting = createAsyncThunk(
  `delete/routing`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Routing/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
