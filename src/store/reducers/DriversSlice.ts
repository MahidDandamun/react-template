import { createSlice } from "@reduxjs/toolkit";
import { DriversState } from "../../interface/output/Drivers/DriversState";
import { createDriver, deleteDriver, getDriverInfo, getDriversList, getSuppliersList, updateDriver } from "../services/DriversService";

const initialState: DriversState = {
    driverList: [],
    supplier_list: [],
    driver_info: [],
    isLoading: false,
    error: null,
}

const DriversSlice = createSlice({
    name: "drivers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDriversList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDriversList.fulfilled, (state, action) => {
                state.driverList = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getDriversList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(getSuppliersList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSuppliersList.fulfilled, (state, action) => {
                state.supplier_list = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getSuppliersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(createDriver.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDriver.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createDriver.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(getDriverInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDriverInfo.fulfilled, (state, action) => {
                state.driver_info = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getDriverInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(updateDriver.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDriver.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateDriver.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
            })
        builder
            .addCase(deleteDriver.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDriver.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteDriver.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
            })
    }
});

export default DriversSlice.reducer;
