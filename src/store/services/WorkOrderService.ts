import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { WorkOrderInput } from "../../interface/input/WorkOrderinput";


export const getWorkOrderList = createAsyncThunk(
  `work-order`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Work Order?fields=["production_item", "status", "name", "owner"]&order_by=name%20desc`
      );


      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createWorkOrder = createAsyncThunk(
  `create/work-order`,
  async (payload: WorkOrderInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/Work Order", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getWorkOrderInfo = createAsyncThunk(
  `info/work-order`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Work Order/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateWorkOrder = createAsyncThunk(
  `update/work-order`,
  async ({ name, payload }: { name: string; payload: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Work Order/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteWorkOrder = createAsyncThunk(
  `delete/work-order`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Work Order/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);


// export const getWorkOrderList = async () => {
//   try {
//     const response = await api.get(
//       "method/inventory_system.endpoints.get_doctype.get_work_order"
//     );
//     return response.data.message;
//   } catch (error) {
//     console.error("Error fetching work order list", error);
//   }
// };

// export const getWorkOrder = async (workOrderName: string) => {
//   try {
//     const response = await api.get(
//       `resource/Work Order/${workOrderName}`
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching work order", error);
//   }
// };

// export const updateWorkOrder = async ({
//   workOrderName,
//   workOrderData,
// }: {
//   workOrderName: string;
//   workOrderData: any;
// }) => {
//   try {
//     const response = await api.put(
//       `resource/Work Order/${workOrderName}`,
//       workOrderData
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error updating workorder");
//   }
// };


// export const createWorkOrder = async (workOrderData: {
//   supplier: string;
//   transaction_date: string;
//   schedule_date: string;
//   items: { item_code: string; qty: number; rate: number }[];
// }) => {
//   try {
//     const response = await api.post(
//       "resource/Work Order/",
//       workOrderData
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error creating work order");
//   }
// };
