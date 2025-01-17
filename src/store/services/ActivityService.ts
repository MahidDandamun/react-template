import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getActivityLogs = createAsyncThunk(
    `get/activity-logs/list`,
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`resource/Comment`, {
                params: {
                    fields: JSON.stringify(["*"]),
                    filters: JSON.stringify([["reference_name", "=", name]]),
                    order_by: "creation desc"
                }
            }
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error); 
        }
    }
);

export const addComment = createAsyncThunk(
    `activity-logs/add-comment`,
    async (payload:any, { rejectWithValue }) => {
        try {
            const response = await api.post(`method/frappe.desk.form.utils.add_comment`, payload);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);