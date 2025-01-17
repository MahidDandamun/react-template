import { createSlice } from "@reduxjs/toolkit";
import { PurchaseOrderState } from "../../interface/output/PurchaseOrder/PurchaseOrderState";
import { createPurchaseOrder, deletePurchaseOrder, getPurchaseOrderInfo, getPurchaseOrderList, updatePurchaseOrder } from "../services/PurchaseOrderService";

const initialState: PurchaseOrderState = {
    purchaseOrderList: [],
    isLoading: true,
    error: null,
    purchaseOrderInfo: null
}

const PurchaseOrderSlice = createSlice({
    name: "purchaseOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPurchaseOrderList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPurchaseOrderList.fulfilled, (state, action) => {
                state.purchaseOrderList = action.payload;
                state.isLoading = false;
            })
            .addCase(getPurchaseOrderList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching purchase order list';
            });
        builder
            .addCase(createPurchaseOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPurchaseOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createPurchaseOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating purchase order list';
            });
        builder
            .addCase(getPurchaseOrderInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPurchaseOrderInfo.fulfilled, (state, action) => {
                state.purchaseOrderInfo = action.payload
                state.isLoading = false;
            })
            .addCase(getPurchaseOrderInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching purchase order info';
            });
        builder
            .addCase(updatePurchaseOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePurchaseOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updatePurchaseOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating purchase order info';
            });
        builder
            .addCase(deletePurchaseOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deletePurchaseOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deletePurchaseOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting purchase order info';
            });

    }
})

export default PurchaseOrderSlice.reducer;