import { createSlice } from "@reduxjs/toolkit";
import { DeliveryNoteState } from "../../interface/output/DeliveryNote/DeliveryNoteState";
import { createDeliveryNote, deleteDeliveryNoteInfo, getDeliveryNoteInfo, getDeliveryNoteList, getUndeliveredSalesOrder, updateDeliveryNoteInfo } from "../services/DeliveryNoteService";

const initialState: DeliveryNoteState = {
    deliveryNoteList: [],
    isLoading: true,
    error: null,
    undeliveredSalesOrder: [],
    deliveryNoteInfo: null
}

const DeliveryNoteSlice = createSlice({
    name: "deliveryNote",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDeliveryNoteList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDeliveryNoteList.fulfilled, (state, action) => {
                state.deliveryNoteList = action.payload;
                state.isLoading = false;
            })
            .addCase(getDeliveryNoteList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching delivery note list';
            });
        builder
            .addCase(createDeliveryNote.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDeliveryNote.fulfilled, (state, action) => {
                // state.customersList.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createDeliveryNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "error creating delivery note";
            });
        builder
            .addCase(getUndeliveredSalesOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUndeliveredSalesOrder.fulfilled, (state, action) => {
                state.undeliveredSalesOrder = action.payload;
                state.isLoading = false;
            })
            .addCase(getUndeliveredSalesOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching delivery note list';
            });
        builder
            .addCase(getDeliveryNoteInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDeliveryNoteInfo.fulfilled, (state, action) => {
                state.deliveryNoteInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(getDeliveryNoteInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching delivery note info';
            });
        builder
            .addCase(updateDeliveryNoteInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDeliveryNoteInfo.fulfilled, (state, action) => {
                // state.deliveryNoteInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(updateDeliveryNoteInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating delivery note info';
            });
        builder
            .addCase(deleteDeliveryNoteInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDeliveryNoteInfo.fulfilled, (state, action) => {
                // state.deliveryNoteInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteDeliveryNoteInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting delivery note info';
            });

            }
})

export default DeliveryNoteSlice.reducer;