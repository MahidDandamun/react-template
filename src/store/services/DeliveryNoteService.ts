import api from '../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeliveryNoteInput } from '../../interface/input/DeliveryNoteInput';

export const getDeliveryNoteList = createAsyncThunk(
  `delivery-note`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Delivery Note?fields=["name","grand_total","status","per_installed","title","customer","customer_name","base_grand_total","per_billed","transporter_name","is_return","owner","posting_date"]&order_by=name%20desc`
      );

      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);

export const createDeliveryNote = createAsyncThunk(
  `create/delivery-note`,
  async (payload: DeliveryNoteInput, { rejectWithValue }) => {
    try {
      const response = await api.post('resource/Delivery Note', payload);

      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);

export const getUndeliveredSalesOrder = createAsyncThunk(
  `undelivered-sales-order`,
  async (customer_name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `method/inventory_system.endpoints.get_doctype.get_undelivered_sales_order_items?customer_name=${customer_name}`
      );

      return response.data.message.data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);

export const getDeliveryNoteInfo = createAsyncThunk(
  `delivery-note/info`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Delivery Note/${name}`);

      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);

export const updateDeliveryNoteInfo = createAsyncThunk(
  `update/customer`,
  async (
    { name, payload }: { name: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`resource/Delivery Note/${name}`, payload);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDeliveryNoteInfo = createAsyncThunk(
  `delete/delivery-note`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Delivery Note/${name}`);
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);
