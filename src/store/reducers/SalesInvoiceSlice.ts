import { createSlice } from "@reduxjs/toolkit";
import { SalesInvoiceState } from "../../interface/output/SalesInvoice/SalesInvoiceState";
import { createSalesInvoice, deleteSalesInvoice, getSalesInvoiceInfo, getSalesInvoiceList, updateSalesInvoice } from "../services/SalesInvoiceService";

const initialState: SalesInvoiceState = {
    salesInvoiceList: [],
    isLoading: true,
    error: null,
    salesInvoiceInfo: null
}

const SalesInvoiceSlice = createSlice({
    name: "salesInvoice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSalesInvoiceList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSalesInvoiceList.fulfilled, (state, action) => {
                state.salesInvoiceList = action.payload;
                state.isLoading = false;
            })
            .addCase(getSalesInvoiceList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching sales invoice list';
            });
        builder
            .addCase(getSalesInvoiceInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSalesInvoiceInfo.fulfilled, (state, action) => {
                state.salesInvoiceInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(getSalesInvoiceInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching sales invoice info';
            });
        builder
            .addCase(createSalesInvoice.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSalesInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createSalesInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating sales invoice';
            });
        builder
            .addCase(updateSalesInvoice.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateSalesInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateSalesInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating sales invoice info';
            });
        builder
            .addCase(deleteSalesInvoice.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSalesInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteSalesInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting sales invoice';
            });
        
        }
})

export default SalesInvoiceSlice.reducer;