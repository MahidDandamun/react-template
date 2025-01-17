import { createSlice } from "@reduxjs/toolkit";
import { SuppliersState } from "../../interface/output/Suppliers/SuppliersState";
import { createSupplier, deleteSupplier, getSupplierGroup, getSupplierInfo, getSuppliersList, updateSupplier } from "../services/SupplierService";

const initialState: SuppliersState = {
    suppliersList: [],
    isLoading: true,
    error: null,
    supplierGroup: [],
    supplierInfo: null
}

const SupplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSuppliersList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSuppliersList.fulfilled, (state, action) => {
                state.suppliersList = action.payload;
                state.isLoading = false;
            })
            .addCase(getSuppliersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed fetching suppliers list";
            })
        builder
            .addCase(getSupplierGroup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSupplierGroup.fulfilled, (state, action) => {
                state.supplierGroup = action.payload;
                state.isLoading = false;
            })
            .addCase(getSupplierGroup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed fetching supplier group";
            });
        builder
            .addCase(createSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed creating supplier group";
            });
        builder
            .addCase(getSupplierInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSupplierInfo.fulfilled, (state, action) => {
                state.supplierInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(getSupplierInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed fetching supplier info";
            });
        builder
            .addCase(updateSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed updating supplier info";
            });
        builder
            .addCase(deleteSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed deleting supplier info";
            });
    }
})

export default SupplierSlice.reducer