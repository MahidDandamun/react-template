import { createSlice } from "@reduxjs/toolkit";
import { WorkReceiptState } from "../../interface/output/WorkReceipt/WorkReceiptState";
import { createWorkReceipt, deleteWorkReceipt, getWorkReceiptInfo, getWorkReceiptList, getUnreceivedWorkOrder, updateWorkReceipt } from "../services/WorkReceiptService";

const initialState: WorkReceiptState = {
    workReceiptList: [],
    isLoading: true,
    error: null,
    workReceiptInfo: null,
    unreceivedWorkOrders: []
}

const WorkReceiptSlice = createSlice({
    name: "workReceipt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWorkReceiptList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWorkReceiptList.fulfilled, (state, action) => {
                state.workReceiptList = action.payload;
                state.isLoading = false;
            })
            .addCase(getWorkReceiptList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching work receipt list';
            });
        builder
            .addCase(createWorkReceipt.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createWorkReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createWorkReceipt.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating work receipt list';
            });
        builder
            .addCase(getWorkReceiptInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWorkReceiptInfo.fulfilled, (state, action) => {
                state.workReceiptInfo = action.payload
                state.isLoading = false;
            })
            .addCase(getWorkReceiptInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching work receipt info';
            });
        builder
            .addCase(updateWorkReceipt.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateWorkReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateWorkReceipt.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating work receipt info';
            });
        builder
            .addCase(deleteWorkReceipt.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteWorkReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteWorkReceipt.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting work receipt info';
            });
        builder
            .addCase(getUnreceivedWorkOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUnreceivedWorkOrder.fulfilled, (state, action) => {
                state.unreceivedWorkOrders = action.payload;
                state.isLoading = false;
            })
            .addCase(getUnreceivedWorkOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching unreceived work order';
            });

    }
})

export default WorkReceiptSlice.reducer;