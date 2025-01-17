import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { WorkReceiptInput } from "../../interface/input/WorkOrderReceipt";


export const getWorkReceiptList = createAsyncThunk(
  `work-receipt`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Work Receipt?fields=["name","grand_total","status","posting_date","title","owner","creation"]&order_by=name%20desc`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    } 
  }
);

export const createWorkReceipt = createAsyncThunk(
  `create/work-receipt`,
  async (payload: WorkReceiptInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Work Receipt", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getWorkReceiptInfo = createAsyncThunk(
  `info/work-receipt`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Work Receipt/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateWorkReceipt = createAsyncThunk(
  `update/work-receipt`,
  async ({ name, payload }: { name: string; payload: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Work Receipt/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteWorkReceipt = createAsyncThunk(
  `delete/work-receipt`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Work Receipt/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUnreceivedWorkOrder = createAsyncThunk(
  `get/unreceived-work-order`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`method/inventory_system.endpoints.get_doctype.get_unreceived_work_order_items`);
      return response.data.message.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);