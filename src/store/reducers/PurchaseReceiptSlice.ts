import { createSlice } from "@reduxjs/toolkit";
import { PurchaseReceiptState } from "../../interface/output/PurchaseReceipt/PurchaseReceiptState";
import { createPurchaseReceipt, deletePurchaseReceipt, getPurchaseReceiptInfo, getPurchaseReceiptList, getUnreceivedPurchaseOrder, updatePurchaseReceipt } from "../services/PurchaseReceiptService";

const initialState: PurchaseReceiptState = {
    purchaseReceiptList: [],
    isLoading: true,
    error: null,
    purchaseReceiptInfo: null,
    unreceivedPurchaseOrders: []
}

const PurchaseReceiptSlice = createSlice({
    name: "purchaseReceipt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPurchaseReceiptList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPurchaseReceiptList.fulfilled, (state, action) => {
                state.purchaseReceiptList = action.payload;
                state.isLoading = false;
            })
            .addCase(getPurchaseReceiptList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching purchase receipt list';
            });
        builder
            .addCase(createPurchaseReceipt.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPurchaseReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createPurchaseReceipt.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating purchase receipt list';
            });
        builder
            .addCase(getPurchaseReceiptInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPurchaseReceiptInfo.fulfilled, (state, action) => {
                state.purchaseReceiptInfo = action.payload
                state.isLoading = false;
            })
            .addCase(getPurchaseReceiptInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching purchase receipt info';
            });
        builder
            .addCase(updatePurchaseReceipt.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePurchaseReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updatePurchaseReceipt.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating purchase receipt info';
            });
        builder
            .addCase(deletePurchaseReceipt.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deletePurchaseReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deletePurchaseReceipt.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting purchase receipt info';
            });
        builder
            .addCase(getUnreceivedPurchaseOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUnreceivedPurchaseOrder.fulfilled, (state, action) => {
                state.unreceivedPurchaseOrders = action.payload;
                state.isLoading = false;
            })
            .addCase(getUnreceivedPurchaseOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching unreceived purchase order';
            });

    }
})

export default PurchaseReceiptSlice.reducer;