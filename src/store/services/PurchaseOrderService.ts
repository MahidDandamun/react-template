import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { PurchaseOrderInput } from "../../interface/input/PurchaseOrderInput";

export const getPurchaseOrderList = createAsyncThunk(
  `purchase-order`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Purchase Order?fields=["name","grand_total","status","transaction_date","supplier_name","per_billed","per_received","owner","creation"]&order_by=name%20desc`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createPurchaseOrder = createAsyncThunk(
  `create/purchase-order`,
  async (payload: PurchaseOrderInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Purchase Order", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getPurchaseOrderInfo = createAsyncThunk(
  `info/purchase-order`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Purchase Order/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updatePurchaseOrder = createAsyncThunk(
  `update/purchase-order`,
  async ({ name, payload }: { name: string; payload: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Purchase Order/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deletePurchaseOrder = createAsyncThunk(
  `delete/purchase-order`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Purchase Order/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);


// export const getPurchaseOrderList = async () => {
//   try {
//     const response = await api.get(
//       "method/inventory_system.endpoints.get_doctype.get_purchase_order"
//     );
//     return response.data.message;
//   } catch (error) {
//     console.error("Error fetching purchase order list", error);
//   }
// };

// export const getPurchaseOrder = async (purchaseOrderName: string) => {
//   try {
//     const response = await api.get(
//       `resource/Purchase Order/${purchaseOrderName}`
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching purchase order", error);
//   }
// };

// export const updatePurchaseOrder = async ({
//   purchaseOrderName,
//   purchaseOrderData,
// }: {
//   purchaseOrderName: string;
//   purchaseOrderData: any;
// }) => {
//   try {
//     const response = await api.put(
//       `resource/Purchase Order/${purchaseOrderName}`,
//       purchaseOrderData
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error updating purchase order");
//   }
// };


// export const createPurchaseOrder = async (purchaseOrderData: {
//   supplier: string;
//   transaction_date: string;
//   schedule_date: string;
//   items: { item_code: string; qty: number; rate: number }[];
// }) => {
//   try {
//     const response = await api.post(
//       "resource/Purchase Order/",
//       purchaseOrderData
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error creating purchase order");
//   }
// };
