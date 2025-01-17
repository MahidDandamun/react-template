import { createSlice } from "@reduxjs/toolkit";
import { WorkOrderState } from "../../interface/output/WorkOrder/WorkOrderState";
import { createWorkOrder, deleteWorkOrder, getWorkOrderInfo, getWorkOrderList, updateWorkOrder } from "../services/WorkOrderService";

const initialState: WorkOrderState = {
    workOrderList: [],
    isLoading: true,
    error: null,
    workOrderInfo: null
}

const WorkOrderSlice = createSlice({
    name: "workOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWorkOrderList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWorkOrderList.fulfilled, (state, action) => {
                state.workOrderList = action.payload;
                state.isLoading = false;
            })
            .addCase(getWorkOrderList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching work order list';
            });
        builder
            .addCase(createWorkOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createWorkOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createWorkOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating work order list';
            });
        builder
            .addCase(getWorkOrderInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWorkOrderInfo.fulfilled, (state, action) => {
                state.workOrderInfo = action.payload
                state.isLoading = false;
            })
            .addCase(getWorkOrderInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching work order info';
            });
        builder
            .addCase(updateWorkOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateWorkOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateWorkOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating work order info';
            });
        builder
            .addCase(deleteWorkOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteWorkOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteWorkOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting work order info';
            });

    }
})

export default WorkOrderSlice.reducer;