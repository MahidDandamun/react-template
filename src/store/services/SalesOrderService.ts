import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { SalesOrderInput } from '../../interface/input/SalesOrderInput';

export const getSalesOrderList = createAsyncThunk(
  `sales-order`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Sales Order?fields=["name","customer_name","status","delivery_date","grand_total","per_billed","per_delivered","owner","creation"]&order_by=name%20desc`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSalesOrderInfo = createAsyncThunk(
  `info/sales-order`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Sales Order/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSalesOrder = createAsyncThunk(
  `create/sales-order`,
  async (payload: SalesOrderInput, { rejectWithValue }) => {
    try {
      const response = await api.post('resource/Sales Order', payload);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSalesOrder = createAsyncThunk(
  `update/sales-order`,
  async (
    { name, payload }: { name: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`resource/Sales Order/${name}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitSalesOrder = async (
  salesOrderName: string,
  salesOrderData: any
) => {
  try {
    const response = await api.put(
      `resource/Sales Order/${salesOrderName}`,
      salesOrderData
    );
    return response.data.data;
  } catch (error) {
    console.error('error', error);
  }
};

export const deleteSalesOrder = createAsyncThunk(
  `delete/sales-order`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Sales Order/${name}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
