import { createSlice } from "@reduxjs/toolkit";
import { deleteWarehouse, getWarehouseInfo, getWarehouseList, updateWarehouse } from "../services/WarehouseService";
import { WarehouseState } from "../../interface/output/Warehouse/WarehouseState";

const initialState: WarehouseState = {
    data: [],
    warehouse_info: {},
    isLoading: false,
    error: null,
};

const WarehouseSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWarehouseList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWarehouseList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getWarehouseList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(getWarehouseInfo.pending, (state) => {
                state.isLoading = true;
                state.warehouse_info = {};
                state.error = null;
            })
            .addCase(getWarehouseInfo.fulfilled, (state, action) => {
                state.warehouse_info = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getWarehouseInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(deleteWarehouse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteWarehouse.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteWarehouse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(updateWarehouse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateWarehouse.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateWarehouse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default WarehouseSlice.reducer;
