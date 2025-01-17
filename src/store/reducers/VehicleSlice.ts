import { createSlice } from "@reduxjs/toolkit";
import { VehicleState } from "../../interface/output/Vehicle/VehicleState";
import { getVehicleList } from "../services/VehicleService";

const initialState: VehicleState = {
    vehicleList: [],
    isLoading: false,
    error: null,
}

const VehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(getVehicleList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVehicleList.fulfilled, (state, action) => {
        state.vehicleList = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getVehicleList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    }
})

export default VehicleSlice.reducer;
