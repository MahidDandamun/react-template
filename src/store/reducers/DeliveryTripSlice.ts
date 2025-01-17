import { createSlice } from "@reduxjs/toolkit";
import { DeliveryTripState } from "../../interface/output/DeliveryTrip/DeliveryTripState";
import { createDeliveryTrip, deleteDeliveryTrip, getAddress, getDeliveryTripCount, getDeliveryTripInfo, getDeliveryTripList, paginateDeliveryTripList, updateDeliveryTrip } from "../services/DeliveryTripService";

const initialState: DeliveryTripState = {
    deliveryTripList: [],
    deliveryTripInfo: [],
    deliveryTripCount: 0,
    addressList: [],
    isLoading: false,
    error: null,
};

const DeliveryTripSlice = createSlice({
    name: "deliveryTrip",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDeliveryTripList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDeliveryTripList.fulfilled, (state, action) => {
                state.deliveryTripList = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getDeliveryTripList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(createDeliveryTrip.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDeliveryTrip.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createDeliveryTrip.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(getDeliveryTripInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDeliveryTripInfo.fulfilled, (state, action) => {
                state.deliveryTripInfo = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getDeliveryTripInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(updateDeliveryTrip.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDeliveryTrip.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateDeliveryTrip.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(getAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.addressList = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(deleteDeliveryTrip.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDeliveryTrip.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteDeliveryTrip.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(paginateDeliveryTripList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(paginateDeliveryTripList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deliveryTripList = action.payload;
            })
            .addCase(paginateDeliveryTripList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(getDeliveryTripCount.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDeliveryTripCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deliveryTripCount = action.payload[0].count;
            })
            .addCase(getDeliveryTripCount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
});

export default DeliveryTripSlice.reducer;
