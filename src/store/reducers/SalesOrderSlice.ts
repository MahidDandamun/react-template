import { createSlice } from "@reduxjs/toolkit";
import { SalesOrderState } from "../../interface/output/SalesOrder/SalesOrderState";
import { createSalesOrder, deleteSalesOrder, getSalesOrderInfo, getSalesOrderList, updateSalesOrder } from "../services/SalesOrderService";

const initialState: SalesOrderState = {
    salesOrderList: [],
    isLoading: true,
    error: null,
    salesOrderInfo: null
}

const SalesOrderSlice = createSlice({
    name: "salesOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSalesOrderList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSalesOrderList.fulfilled, (state, action) => {
                state.salesOrderList = action.payload;
                state.isLoading = false;
            })
            .addCase(getSalesOrderList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching sales order list';
            });
        builder
            .addCase(getSalesOrderInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSalesOrderInfo.fulfilled, (state, action) => {
                state.salesOrderInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(getSalesOrderInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching sales order info';
            });
        builder
            .addCase(createSalesOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSalesOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createSalesOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating sales order';
            });
        builder
            .addCase(updateSalesOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateSalesOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateSalesOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating sales order info';
            });
        builder
            .addCase(deleteSalesOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSalesOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteSalesOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting sales order';
            });
        
        }
})

export default SalesOrderSlice.reducer;