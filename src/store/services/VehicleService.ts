import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getVehicleList = createAsyncThunk(
    'vehicle',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `resource/Vehicle?fields=["name", "model"]`
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);
