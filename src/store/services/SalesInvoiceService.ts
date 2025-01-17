import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { SalesInvoiceInput } from "../../interface/input/SalesInvoiceInput";

export const getSalesInvoiceList = createAsyncThunk(
  `sales-invoice`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Sales Invoice?order_by=name%20desc`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getSalesInvoiceInfo = createAsyncThunk(
  `info/sales-invoice`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Sales Invoice/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createSalesInvoice = createAsyncThunk(
  `create/sales-invoice`,
  async (payload: SalesInvoiceInput,{rejectWithValue}) => {
    try {
      const response = await api.post("resource/Sales Invoice", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateSalesInvoice = createAsyncThunk(
  `update/sales-invoice`,
  async ({ name, payload}: { name: string; payload: any },{rejectWithValue}) => {
    try {
      const response = await api.put(`resource/Sales Invoice/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update sales order');
    }
  }
);

export const submitSalesInvoice = async (
  SalesInvoiceName: string,
  SalesInvoiceData: any
) => {
  try {
    const response = await api.put(
      `resource/Sales Invoice/${SalesInvoiceName}`,
      SalesInvoiceData
    );
    return response.data.data;
  } catch (error) {
    console.error("error", error);
  }
};

export const deleteSalesInvoice = createAsyncThunk(
  `delete/sales-invoice`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Sales Invoice/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);