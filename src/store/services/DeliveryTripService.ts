import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { DeliveryTripInput } from "../../interface/input/DeliveryTripInput";


export const getDeliveryTripList = createAsyncThunk(
  'get/delivery-trip',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Delivery Trip?fields=["driver_name", "status","departure_time", "name"]`
      )
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getAddress = createAsyncThunk(
  'get/delivery-trip/address',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Address?fields=["name","links.link_doctype","links.link_name"]`)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createDeliveryTrip = createAsyncThunk(
  'create/delivery-trip',
  async (payload: DeliveryTripInput, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `resource/Delivery Trip`,
        payload
      )
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
);

export const getDeliveryTripInfo = createAsyncThunk(
  'get/delivery-trip/info',
  async (name: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`resource/Delivery Trip/${name}`)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateDeliveryTrip = createAsyncThunk(
  'update/delivery-trip',
  async ({ name, payload }: { name: string, payload: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`resource/Delivery Trip/${name}`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDeliveryTrip = createAsyncThunk(
  `delete/delivery-trip`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/Delivery Trip/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const paginateDeliveryTripList = createAsyncThunk(
  `get/delivery-trip/paginate`,
  async ({ page, search, sort, perPage }: { page: number, search: string, sort: string, perPage: number }, { rejectWithValue }) => {
    try {
      const response = await api.get("resource/Delivery Trip", {
        params: {
          fields: JSON.stringify(["driver_name", "status", "departure_time", "name", "owner", "creation"]),
          filters: JSON.stringify([["name", "like", `%${search}%`]]),
          limit: perPage,
          limit_start: page,
          order_by: sort,
        }
      });


      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const getDeliveryTripCount = createAsyncThunk(
  'get/delivery-trip/count',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `resource/Delivery Trip?fields=["count(name) as count"]`
      )
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);