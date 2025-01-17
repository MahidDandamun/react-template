import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { CreateItemInput } from "../../interface/input/ItemInput";

export const getItemList = createAsyncThunk(
  `get/items`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Item?fields=[ "name", "owner", "creation", "docstatus", "item_group", "item_name", "disabled", "valuation_rate"]`)
      return response.data.data;

    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getItemGroup = createAsyncThunk(
  `get/item-group`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("resource/Item Group")
      return response.data.data;

    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const getUOM = createAsyncThunk(
  `get/UOM`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("resource/UOM")
      return response.data.data;

    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const createItem = createAsyncThunk(
  `create/Item`,
  async (payload: CreateItemInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Item", payload);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getItemInfo = createAsyncThunk(
  `get/iteminfo`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Item/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateItem = createAsyncThunk(
  `create/Item`,
  async ({ name, payload }: { name: string, payload: CreateItemInput }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/resource/Item/${name}`, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  `delete/item`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Item/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
