import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { PurchaseReceiptInput } from "../../interface/input/PurchaseReceiptInput";

export const getPurchaseReceiptList = createAsyncThunk(
  `purchase-receipt`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Purchase Receipt?fields=["name","grand_total","status","posting_date","title","owner","creation"]&order_by=name%20desc`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createPurchaseReceipt = createAsyncThunk(
  `create/purchase-receipt`,
  async (payload: PurchaseReceiptInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Purchase Receipt", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getPurchaseReceiptInfo = createAsyncThunk(
  `info/purchase-receipt`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Purchase Receipt/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updatePurchaseReceipt = createAsyncThunk(
  `update/purchase-receipt`,
  async ({ name, payload }: { name: string; payload: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Purchase Receipt/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deletePurchaseReceipt = createAsyncThunk(
  `delete/purchase-receipt`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Purchase Receipt/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUnreceivedPurchaseOrder = createAsyncThunk(
  `get/unreceived-purchase-order`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`method/inventory_system.endpoints.get_doctype.get_unreceived_purchase_order_items`);
      return response.data.message.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);